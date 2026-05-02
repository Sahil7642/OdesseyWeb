import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, ShieldAlert, MapPin, Navigation } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || "";

const HoverChatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // In-Chat Map State
  const [mapData, setMapData] = useState(null);

  // UI Messages - Now starts in pure English!
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hey there! 👋 I'm Omi. Your personal travel guide, food finder, and trip planner. What's on your mind today?" 
    }
  ]);

  // Hidden conversation history for Ollama context memory
  const [chatHistory, setChatHistory] = useState([]);

  // --- DYNAMIC CONTEXT ---
  const [userLocation, setUserLocation] = useState("India");
  const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening';
  
  // Fetch Live Location on Mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            let locationName = "";
            
            // 1. Try Ola Maps Reverse Geocoding
            if (OLA_MAPS_API_KEY) {
              const res = await fetch(`https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${OLA_MAPS_API_KEY}`);
              const data = await res.json();
              if (data?.results && data.results.length > 0) {
                // Grab the city/locality from Ola Maps response
                locationName = data.results[0].formatted_address;
              }
            }

            // 2. Free Fallback (OpenStreetMap Nominatim) if Ola API is missing/fails
            if (!locationName) {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const data = await res.json();
              const address = data.address || {};
              const city = address.city || address.town || address.county || "";
              const state = address.state || "";
              locationName = city ? `${city}, ${state}, India` : data.display_name;
            }

            if (locationName) {
              setUserLocation(locationName);
            }
          } catch (error) {
            console.error("Error converting coordinates to city:", error);
          }
        },
        (error) => {
          console.warn("User denied geolocation or it failed:", error.message);
          // It will just fall back to "India" gracefully
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    }
  }, []);

  // --- THE OMI BRAIN (SYSTEM PROMPT) ---
  const systemPrompt = {
    role: 'system',
    content: `You are 'Omi' (Odessey Messaging Interface), a highly intelligent, proactive travel concierge.

    YOUR PERSONALITY & LANGUAGE:
    - Friendly, slightly witty with a Gen-Z touch. Supportive, never rude.
    - Start all conversations in English. 
    - ONLY switch to 'Hinglish' (a mix of Hindi and English, e.g., "Kya plan hai?", "Mast jagah hai!") IF the user speaks to you in Hindi or Hinglish first. Mirror the user's language choice.

    YOUR CAPABILITIES & BEHAVIOR:
    1. Guide, don't just list: When asked for suggestions, give the 2 BEST options, ask smart follow-ups to narrow it down.
    2. Be Proactive: The user is currently in ${userLocation}. The time is ${currentTime} (${timeOfDay}). Suggest things based on this time!
    
    ACTION TRIGGERS (CRITICAL):
    You can DO things. To perform an action, include one of these EXACT tags in your response. DO NOT use these tags unless specifically requested by the user.
    - [NAV_PLAN] : If the user wants to build an itinerary or plan a trip.
    - [NAV_ARCADE] : If the user wants to play games or earn rewards.
    - [NAV_EXPERIENCE] : If the user wants to browse destinations.
    - [MAPS: Location Name] : ONLY use this if the user explicitly asks where something is, asks to see it on a map, or asks for directions. Example: "Here is the map! [MAPS: Manek Chowk, Ahmedabad]"
    - [FOOD: Dish Name] : ONLY use this if the user is hungry or asks to order food. Example: "I got you! [FOOD: Pizza]"

    FORMATTING:
    - NEVER use markdown formatting like **bold**, *italics*, or ### headers. Keep it clean and conversational.`
  };

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, mapData]);

  // --- IN-CHAT MAP INITIALIZATION (OLA MAPS / MAPLIBRE) ---
  useEffect(() => {
    if (mapData && mapContainerRef.current) {
      const initMap = () => {
        if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
        const mapLayout = { 
          version: 8, 
          sources: { 'osm-tiles': { type: 'raster', tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256 } }, 
          layers: [{ id: 'osm-tiles-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }] 
        };
        const map = new window.maplibregl.Map({
          container: mapContainerRef.current, style: mapLayout, center: [mapData.lng, mapData.lat],
          zoom: 14, attributionControl: false
        });
        map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), 'top-right');
        
        // Custom Marker
        const el = document.createElement('div');
        el.innerHTML = `<div style="background-color: #16a34a; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`;
        new window.maplibregl.Marker(el).setLngLat([mapData.lng, mapData.lat]).addTo(map);
        mapInstance.current = map;
      };

      if (!window.maplibregl) {
        if (!document.getElementById('maplibre-css')) {
          const link = document.createElement('link'); link.id = 'maplibre-css'; link.href = 'https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.css'; link.rel = 'stylesheet'; document.head.appendChild(link);
        }
        let script = document.getElementById('maplibre-js');
        if (!script) {
          script = document.createElement('script'); script.id = 'maplibre-js'; script.src = 'https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js'; script.async = true; script.onload = initMap; document.head.appendChild(script);
        } else { script.addEventListener('load', initMap); }
      } else { initMap(); }
    }
  }, [mapData]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage = { id: Date.now(), sender: 'user', text: userText };
    
    setMessages(prev => [...prev, userMessage]);
    const newContext = [...chatHistory, { role: 'user', content: userText }];
    setChatHistory(newContext);
    
    setInput("");
    setIsTyping(true);
    setMapData(null); // Clear previous map if any

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3', // Change if using mistral/phi3
          messages: [systemPrompt, ...newContext],
          stream: false
        })
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      let botRawText = data.message.content;

      // --- ACTION PARSER ---
      let routeAction = null;
      let mapsTarget = null;
      let foodTarget = null;

      if (botRawText.includes('[NAV_PLAN]')) routeAction = '/plan';
      else if (botRawText.includes('[NAV_ARCADE]')) routeAction = '/arcade';
      else if (botRawText.includes('[NAV_EXPERIENCE]')) routeAction = '/experience';

      const mapsMatch = botRawText.match(/\[MAPS:\s*([^\]]+)\]/i);
      if (mapsMatch) mapsTarget = mapsMatch[1].trim();

      const foodMatch = botRawText.match(/\[FOOD:\s*([^\]]+)\]/i);
      if (foodMatch) foodTarget = foodMatch[1].trim();

      // Clean tags and accidental markdown
      let cleanText = botRawText
        .replace(/\[NAV_[A-Z]+\]/g, '') 
        .replace(/\[MAPS:[^\]]+\]/gi, '') 
        .replace(/\[FOOD:[^\]]+\]/gi, '') 
        .replace(/\*\*/g, '') 
        .replace(/\*/g, '')   
        .replace(/#/g, '')    
        .trim();

      const botMessage = { id: Date.now() + 1, sender: 'bot', text: cleanText };
      setMessages(prev => [...prev, botMessage]);
      setChatHistory([...newContext, { role: 'assistant', content: cleanText }]);

      // --- EXECUTE ACTIONS ---
      if (routeAction) {
        setTimeout(() => navigate(routeAction), 1500); 
      }
      
      if (foodTarget) {
        setTimeout(() => {
          window.open(`https://www.zomato.com/india?search=${encodeURIComponent(foodTarget)}`, '_blank');
        }, 1000);
      }

      // 🗺️ SECURE IN-APP OLA MAPS FETCH
      if (mapsTarget) {
        setIsTyping(true);
        let foundLocation = null;
        try {
          if (OLA_MAPS_API_KEY) {
            const oRes = await fetch(`https://api.olamaps.io/places/v1/textsearch?query=${encodeURIComponent(mapsTarget)}&api_key=${OLA_MAPS_API_KEY}`);
            const oData = await oRes.json();
            if (oData?.results && oData.results.length > 0) {
              const loc = oData.results[0];
              foundLocation = { lat: loc.geometry?.location?.lat, lng: loc.geometry?.location?.lng, name: loc.name, address: loc.formatted_address };
            }
          }

          if (foundLocation) {
            setMapData(foundLocation);
          } else {
            setMessages(prev => [...prev, { id: Date.now() + 2, sender: 'bot', text: `Sorry, I couldn't fetch the exact map coordinates for ${mapsTarget} using Ola Maps right now.` }]);
          }
        } catch (e) {
          console.error("Map fetch error:", e);
          setMessages(prev => [...prev, { id: Date.now() + 2, sender: 'bot', text: `Sorry, an error occurred while trying to load the map for ${mapsTarget}.` }]);
        }
        setIsTyping(false);
      }

    } catch (error) {
      console.error("Ollama connection error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: "Oops, my AI brain is taking a nap! 😴 Make sure Ollama is running locally on port 11434 with CORS enabled.",
        isWarning: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      
      {/* --- THE CHAT WINDOW --- */}
      {isOpen && (
        <div style={{ 
          position: 'absolute', bottom: '70px', right: '0', 
          width: window.innerWidth < 400 ? 'calc(100vw - 60px)' : '380px', 
          height: '550px', backgroundColor: 'white', borderRadius: '24px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatFadeIn 0.3s ease-out'
        }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#111827', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ backgroundColor: '#16a34a', padding: '8px', borderRadius: '50%' }}><Bot size={20} color="white" /></div>
              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Omi</h3>
                <span style={{ color: '#4ade80', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span> Online & Ready
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }} className="hide-scrollbar">
            
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '8px' }}>
                {msg.sender === 'bot' && <div style={{ width: '28px', height: '28px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Bot size={14} color="white" /></div>}
                
                <div style={{ 
                  backgroundColor: msg.sender === 'user' ? '#16a34a' : msg.isWarning ? '#fee2e2' : 'white', 
                  color: msg.sender === 'user' ? 'white' : msg.isWarning ? '#991b1b' : '#374151', 
                  padding: '12px 16px', borderRadius: '16px', 
                  borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                  maxWidth: '85%', fontSize: '14px', lineHeight: '1.5',
                  boxShadow: msg.sender === 'bot' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                  border: msg.sender === 'bot' && !msg.isWarning ? '1px solid #e5e7eb' : 'none',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.isWarning && <ShieldAlert size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/>}
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={14} color="white" /></div>
                <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', border: '1px solid #e5e7eb', display: 'flex', gap: '4px' }}>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%' }}></div>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%', animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* IN-CHAT MAP OVERLAY */}
            {mapData && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginTop: '10px', animation: 'chatFadeIn 0.3s ease-out' }}>
                <div style={{ padding: '12px 15px', backgroundColor: '#f0fdf4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} color="#16a34a" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#166534', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>{mapData.name}</h4>
                      <p style={{ margin: 0, fontSize: '11px', color: '#15803d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>{mapData.address}</p>
                    </div>
                  </div>
                  <button onClick={() => setMapData(null)} style={{ border: 'none', background: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><X size={14} color="#166534"/></button>
                </div>
                <div ref={mapContainerRef} style={{ width: '100%', height: '180px' }}></div>
                <button onClick={() => navigate('/plan', { state: { prefillPackage: { title: `Trip to ${mapData.name}`, location: mapData.name } } })} style={{ width: '100%', padding: '10px', backgroundColor: '#111827', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Navigation size={14}/> Plan a route here
                </button>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ padding: '15px', backgroundColor: 'white', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px', zIndex: 20 }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask Omi about destinations..." 
              style={{ flex: 1, padding: '12px 15px', borderRadius: '50px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#f9fafb' }}
            />
            <button type="submit" disabled={!input.trim() || isTyping} style={{ backgroundColor: input.trim() && !isTyping ? '#16a34a' : '#e5e7eb', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
              <Send size={18} style={{ marginLeft: '2px' }} />
            </button>
          </form>
        </div>
      )}

      {/* --- THE FLOATING ACTION BUTTON (FAB) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          backgroundColor: '#111827', color: 'white', border: 'none', 
          width: '60px', height: '60px', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          cursor: 'pointer', boxShadow: '0 10px 25px rgba(17, 24, 39, 0.4)',
          transition: 'transform 0.2s ease', transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .typing-dot {
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default HoverChatbot;