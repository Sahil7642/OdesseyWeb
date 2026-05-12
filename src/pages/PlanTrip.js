import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, Sparkles, ArrowRight, Sun, Map, Clock, Plus, Minus, Tag, Mail, MessageCircle, CheckCircle, PhoneCall, X, ListChecks, PlaneTakeoff, Loader2, Activity, CheckCircle2, Bot, Trash2, ShoppingBag } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Import from master data
import { itineraries as importedItineraries } from './ItinerariesPage'; 
import { experiences as importedExperiences } from './ExperiencesPage'; 

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || "";
const AGENCY_WHATSAPP_NUMBER = "919353520020"; 
const AGENCY_EMAIL_ADDRESS = "hello@odessey.in"; 

// --- DYNAMIC IMAGE FETCHER ---
const fetchWikiImage = async (title) => {
  if (!title) return null;
  try {
    const sParams = `origin=*&action=query&list=search&srsearch=${encodeURIComponent(title + ' India')}&srlimit=1&format=json`;
    const sRes = await fetch(`https://en.wikipedia.org/w/api.php?${sParams}`).then(r => r.json());
    if (sRes.query?.search?.length > 0) {
      const actualTitle = sRes.query.search[0].title;
      const params = `origin=*&action=query&format=json&prop=pageimages&pithumbsize=800&titles=${encodeURIComponent(actualTitle)}`;
      const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`).then(r => r.json());
      const pages = res.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].thumbnail?.source) {
          const src = pages[pageId].thumbnail.source;
          return src.startsWith('//') ? 'https:' + src : src;
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

const PlanTrip = () => {
  const location = useLocation();

  // --- TRIP DATA STATE ---
  const [formData, setFormData] = useState({
    origin: '', destination: '', startDate: '', endDate: '', groupType: '', pax: 1, children: 0, interests: ''
  });

  // --- ROUTE TIMELINE STATE ---
  const [routeStops, setRouteStops] = useState([]); 

  // --- TRIP CART STATE ---
  const [cartItems, setCartItems] = useState([]);

  // --- AUTOCOMPLETE STATE ---
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [isLoadingPlaces, setIsLoadingPlaces] = useState({ origin: false, dest: false });
  const originTimer = useRef(null);
  const destTimer = useRef(null);

  // --- FULL DATA OBJECT STATE ---
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [itemType, setItemType] = useState(null); 
  const [previewItin, setPreviewItin] = useState(null); 
  const [previewExp, setPreviewExp] = useState(null); 

  // --- MODAL & CONTACT STATE ---
  const [modalState, setModalState] = useState('none'); 
  const [contactMethod, setContactMethod] = useState('whatsapp'); 
  const [contactValue, setContactValue] = useState('');

  // --- OLLAMA AI STATE ---
  const [aiGeneratedItinerary, setAiGeneratedItinerary] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [currentCalcDuration, setCurrentCalcDuration] = useState("4 Days / 3 Nights"); 

  // --- DATA ARRAYS ---
  const masterItineraries = importedItineraries || [];
  const masterExperiences = importedExperiences || [];

  // --- LOAD CART ON MOUNT ---
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('odessey_cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('odessey_cart', JSON.stringify(updated));
  };

  // --- DETECT INCOMING ITEMS & CONTEXT ---
  useEffect(() => {
    if (location.state) {
      const stateData = location.state;
      let incomingDest = '';

      if (stateData.prefillPackage) {
        const pkg = stateData.prefillPackage;
        const fullDetails = masterItineraries.find(i => i.title === pkg.title) || pkg;
        setSelectedPlanDetails(fullDetails);
        setItemType('Template');
        incomingDest = fullDetails.dest || fullDetails.location;
      } else if (stateData.prefillLodge) {
        setSelectedPlanDetails(stateData.prefillLodge);
        setItemType('Lodge');
        incomingDest = stateData.prefillLodge.location;
      } else if (stateData.prefillExperience) {
        const exp = stateData.prefillExperience;
        setSelectedPlanDetails({ title: exp.title, dest: exp.location, days: exp.duration, description: exp.fullDesc, highlights: exp.inclusions?.join(', ') || exp.desc });
        setItemType('Experience');
        incomingDest = exp.location.split(',')[0];
      }

      if (stateData.routeStops) {
        setRouteStops(stateData.routeStops);
      }

      setFormData(prev => ({
        ...prev,
        origin: stateData.origin || stateData.from || prev.origin,
        destination: stateData.presetDestination || incomingDest || stateData.destination || stateData.to || prev.destination,
        startDate: stateData.startDate || stateData.date || prev.startDate,
        endDate: stateData.endDate || prev.endDate,
        pax: stateData.passengers || stateData.pax || prev.pax,
        children: stateData.children || prev.children,
        interests: stateData.interests || prev.interests,
      }));
      window.history.replaceState({}, document.title);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // --- DYNAMIC FILTERING & OLLAMA GENERATION FOR DESTINATION ---
  const searchTarget = formData.destination.toLowerCase().trim();
  
  const filteredItineraries = searchTarget
    ? masterItineraries.filter(itin => 
        (itin.dest && itin.dest.toLowerCase().includes(searchTarget)) || 
        (itin.location && itin.location.toLowerCase().includes(searchTarget)) || 
        (itin.title && itin.title.toLowerCase().includes(searchTarget))
      )
    : masterItineraries;

  const filteredExperiences = searchTarget
    ? masterExperiences.filter(exp => 
        (exp.location && exp.location.toLowerCase().includes(searchTarget)) || 
        (exp.title && exp.title.toLowerCase().includes(searchTarget))
      )
    : masterExperiences;

  useEffect(() => {
    if (searchTarget && filteredItineraries.length === 0) {
      setAiGeneratedItinerary(null);
      setIsGeneratingAI(true);

      let numDays = 4;
      let durationString = "4 Days / 3 Nights";
      
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        
        const diffTime = end.getTime() - start.getTime();
        if (diffTime >= 0) {
          numDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
          const nights = Math.max(0, numDays - 1);
          durationString = `${numDays} Days / ${nights} Nights`;
        }
      }
      
      setCurrentCalcDuration(durationString); 

      const timer = setTimeout(async () => {
        try {
          const planTemplate = Array.from({ length: numDays }, (_, i) => 
            `{ "day": ${i + 1}, "title": "Main activity for Day ${i + 1}", "desc": "Detailed description for Day ${i + 1}" }`
          ).join(",\n              ");

          const prompt = `You are an expert Indian travel planner. The user wants an itinerary for "${formData.destination}" lasting EXACTLY ${numDays} days (${durationString}).
          Return ONLY a valid JSON object. Do not include markdown formatting or backticks. The structure MUST match this exact format:
          {
            "title": "A catchy title for this trip",
            "dest": "${formData.destination}",
            "days": "${durationString}",
            "description": "A compelling 2-sentence overview of what this trip offers.",
            "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
            "plan": [
              ${planTemplate}
            ]
          }`;

          const response = await fetch('http://localhost:5051/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'qwen2.5:0.5b', 
              messages: [{ role: 'user', content: prompt }],
              stream: false
            })
          });

          if (response.ok) {
            const data = await response.json();
            
            // 👇 FIX: Use RegExp constructor to avoid ESLint parsing errors
            const jsonStartRegex = new RegExp('^```json\\s*', 'i');
            const backtickEndRegex = new RegExp('```\\s*$', 'i');
            let cleanJSON = data.message.content.trim().replace(jsonStartRegex, '').replace(backtickEndRegex, '');
            
            const parsedItinerary = JSON.parse(cleanJSON);
            parsedItinerary.isAiGenerated = true;
            setAiGeneratedItinerary(parsedItinerary);
          }
        } catch (error) {
          console.error("Ollama Generation Failed:", error);
        } finally {
          setIsGeneratingAI(false);
        }
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsGeneratingAI(false);
      setAiGeneratedItinerary(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTarget, filteredItineraries.length, formData.startDate, formData.endDate]);


  // --- DYNAMIC AI SEASONAL SUGGESTIONS ---
  const [seasonalPicks, setSeasonalPicks] = useState([]);
  const [isLoadingSeasonal, setIsLoadingSeasonal] = useState(true);
  
  const referenceDate = formData.startDate ? new Date(formData.startDate) : new Date();
  const safeDate = !isNaN(referenceDate.getTime()) ? referenceDate : new Date();
  const currentMonthNameDisplay = safeDate.toLocaleString('default', { month: 'long' });

  useEffect(() => {
    const fetchSeasonalPicks = async () => {
      setIsLoadingSeasonal(true);
      try {
        const prompt = `You are an expert Indian travel planner. Suggest exactly 4 destinations in India that are absolutely perfect to visit in the month of ${currentMonthNameDisplay} due to weather, landscapes, or festivals.
        Return ONLY a valid JSON array of exactly 4 objects. Do not include markdown formatting or backticks.
        Structure MUST match exactly:
        [
          {
            "name": "Destination Name",
            "desc": "A compelling 1-sentence description of why it's great in ${currentMonthNameDisplay}."
          }
        ]`;

        const response = await fetch('http://localhost:5051/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen2.5:0.5b',
            messages: [{ role: 'user', content: prompt }],
            stream: false
          })
        });

        if (!response.ok) throw new Error("Network response failed");

        const data = await response.json();
        
        // 👇 FIX: Use RegExp constructor to avoid ESLint parsing errors
        const jsonStartRegex = new RegExp('^```json\\s*', 'i');
        const backtickEndRegex = new RegExp('```\\s*$', 'i');
        let cleanJSON = data.message.content.trim().replace(jsonStartRegex, '').replace(backtickEndRegex, '');
        
        const aiPicks = JSON.parse(cleanJSON);

        const withImages = await Promise.all(aiPicks.map(async (pick) => {
          let img = await fetchWikiImage(pick.name);
          return {
            ...pick,
            img: img || "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=600&q=80" 
          };
        }));

        setSeasonalPicks(withImages);
      } catch (error) {
        console.error("Seasonal Picks AI Generation failed:", error);
        setSeasonalPicks([
          { name: "Manali", desc: "Snow-capped mountains with perfect seasonal relief.", img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=600&q=80" },
          { name: "Goa", desc: "Vibrant coastal energy and stunning sunsets.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
          { name: "Munnar", desc: "Lush tea plantations and misty mornings.", img: "https://images.unsplash.com/photo-1593693397690-36280732625f?auto=format&fit=crop&w=600&q=80" },
          { name: "Udaipur", desc: "Romantic lakes and royal heritage.", img: "https://images.unsplash.com/photo-1615861228075-1b42787383cb?auto=format&fit=crop&w=600&q=80" }
        ]);
      } finally {
        setIsLoadingSeasonal(false);
      }
    };

    fetchSeasonalPicks();
  }, [currentMonthNameDisplay]);


  // --- OLA MAPS AUTOCOMPLETE LOGIC ---
  const fetchPlaces = async (input, type) => {
    if (!input || input.length < 2) {
      type === 'origin' ? setOriginSuggestions([]) : setDestSuggestions([]);
      return;
    }
    setIsLoadingPlaces(prev => ({ ...prev, [type]: true }));

    if (OLA_MAPS_API_KEY) {
      try {
        const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${OLA_MAPS_API_KEY}`);
        const data = await response.json();
        if (data && data.predictions) {
          const results = data.predictions.map(p => p.description);
          type === 'origin' ? setOriginSuggestions(results) : setDestSuggestions(results);
        }
      } catch (error) { console.error("Ola Maps API Error:", error); }
    } else {
      const offlineCities = ["Ahmedabad, Gujarat", "Agra, Uttar Pradesh", "Amritsar, Punjab", "Bangalore, Karnataka", "Bhopal, Madhya Pradesh", "Chennai, Tamil Nadu", "Chandigarh", "Coimbatore, Tamil Nadu", "Dehradun, Uttarakhand", "Delhi", "Goa", "Guwahati, Assam", "Hyderabad, Telangana", "Indore, Madhya Pradesh", "Jaipur, Rajasthan", "Jodhpur, Rajasthan", "Kochi, Kerala", "Kolkata, West Bengal", "Lucknow, Uttar Pradesh", "Madurai, Tamil Nadu", "Manali, Himachal Pradesh", "Mumbai, Maharashtra", "Mysore, Karnataka", "Nagpur, Maharashtra", "New Delhi", "Pune, Maharashtra", "Rishikesh, Uttarakhand", "Shimla, Himachal Pradesh", "Surat, Gujarat", "Thiruvananthapuram, Kerala", "Udaipur, Rajasthan", "Varanasi, Uttar Pradesh", "Visakhapatnam, Andhra Pradesh"];
      const filtered = offlineCities.filter(c => c.toLowerCase().includes(input.toLowerCase())).slice(0, 5);
      type === 'origin' ? setOriginSuggestions(filtered) : setDestSuggestions(filtered);
    }
    setIsLoadingPlaces(prev => ({ ...prev, [type]: false }));
  };

  const handlePlaceInputChange = (e, type) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [type]: value }));
    setActiveDropdown(type);
    const timer = type === 'origin' ? originTimer : destTimer;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchPlaces(value, type === 'origin' ? 'origin' : 'dest'), 300);
  };

  const selectPlace = (place, type) => {
    setFormData(prev => ({ ...prev, [type]: place }));
    setActiveDropdown(null);
    type === 'origin' ? setOriginSuggestions([]) : setDestSuggestions([]);
  };

  // --- FORM HANDLERS ---
  const handleTagClick = (tag) => {
    setFormData(prev => {
      let tagsArray = prev.interests.split(',').map(t => t.trim()).filter(t => t);
      if (tagsArray.includes(tag)) tagsArray = tagsArray.filter(t => t !== tag);
      else tagsArray.push(tag);
      return { ...prev, interests: tagsArray.join(', ') };
    });
  };

  const handleStartPlanning = (e) => {
    e.preventDefault();
    setModalState('contact');
  };

  const handleTemplateConfirm = (itin) => {
    setSelectedPlanDetails(itin);
    setItemType('Template');
    setFormData(prev => ({ ...prev, destination: prev.destination || itin.dest || itin.location || '' }));
    setModalState('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceConfirm = (exp) => {
    setSelectedPlanDetails({ title: exp.title, dest: exp.location, days: exp.duration, description: exp.fullDesc, highlights: exp.inclusions?.join(', ') || exp.desc });
    setItemType('Experience');
    setFormData(prev => ({ ...prev, destination: prev.destination || exp.location.split(',')[0] }));
    setModalState('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setModalState('none');
    setPreviewItin(null);
    setPreviewExp(null);
  };

  const handleGlobalClick = () => {
    if (activeDropdown) setActiveDropdown(null);
  };

  // --- SENDING LOGIC ---
  const handleSubmitRequest = (e) => {
    e.preventDefault(); 
    
    const cartSummary = cartItems.length > 0 
      ? `\n\n*Selected Experiences from Cart:* \n${cartItems.map((item, i) => `${i+1}. ${item.title} (${item.location})`).join('\n')}`
      : '';

    const routeSummary = routeStops.length > 0 
      ? `\n\n*Custom Route Stops:* \n${routeStops.map((stop, i) => `${i+1}. ${stop.name}`).join('\n')}`
      : '';

    const messageDetails = `*New Trip Inquiry!* ✈️
*From:* ${formData.origin}
*To:* ${formData.destination}
*Dates:* ${formData.startDate} to ${formData.endDate}
*Travelers:* ${formData.pax} Adults, ${formData.children} Children
*Interests:* ${formData.interests || 'None'}
*Target Plan:* ${selectedPlanDetails ? selectedPlanDetails.title : 'Custom Trip'}${routeSummary}${cartSummary}
*Customer Info:* ${contactValue}`;

    if (contactMethod === 'whatsapp') {
      const waLink = `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageDetails)}`;
      window.open(waLink, '_blank');
    } else {
      const subject = `New Trip Inquiry - ${formData.destination || 'Custom Journey'}`;
      const mailLink = `mailto:${AGENCY_EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageDetails)}`;
      window.open(mailLink, '_blank');
    }

    setModalState('success'); 
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px', fontFamily: 'system-ui, -apple-system, sans-serif' }} onClick={handleGlobalClick}>
      
      {/* 1. HERO */}
      <div style={{ position: 'relative', height: '40vh', backgroundImage: 'url(https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.8))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: 'white' }}>Refine Your Journey</h1>
        </div>
      </div>

      {/* 2. FORM AREA */}
      <div style={{ maxWidth: '1000px', margin: '-60px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          
          {/* --- ROUTE TIMELINE PREVIEW (From Route Planner) --- */}
          {routeStops.length > 0 && formData.origin && formData.destination && (
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', marginBottom: '35px', animation: 'slideDown 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Map color="#0284c7" size={20} /> Your Custom Route
                </h3>
                <button 
                  onClick={() => setRouteStops([])} 
                  style={{ background: '#f1f5f9', border: 'none', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#ef4444' }}
                >
                  Clear Route
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', paddingLeft: '15px', borderLeft: '2px dashed #cbd5e1', marginLeft: '10px' }}>
                
                {/* Origin Point */}
                <div style={{ position: 'relative' }}>
                   <div style={{ position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid white' }} />
                   <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{formData.origin}</h4>
                   <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Starting Point</p>
                </div>

                {/* Waypoints */}
                {routeStops.map((stop, idx) => (
                   <div key={idx} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-22px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', border: '2px solid white' }} />
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#334155', margin: 0 }}>{stop.name}</h4>
                   </div>
                ))}

                {/* Destination Point */}
                <div style={{ position: 'relative' }}>
                   <div style={{ position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ea580c', border: '2px solid white' }} />
                   <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{formData.destination}</h4>
                   <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Final Destination</p>
                </div>

              </div>
            </div>
          )}

          {/* --- DATA PREVIEW CARDS (Single Item OR Cart) --- */}
          {(selectedPlanDetails || cartItems.length > 0) && (
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', marginBottom: '35px', animation: 'slideDown 0.4s ease-out' }}>
              
              {/* Single Main Plan Detail */}
              {selectedPlanDetails && (
                <div style={{ marginBottom: cartItems.length > 0 ? '25px' : '0', paddingBottom: cartItems.length > 0 ? '25px' : '0', borderBottom: cartItems.length > 0 ? '1px dashed #cbd5e1' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px', borderRadius: '10px' }}>
                        {itemType === 'Experience' ? <Activity size={20}/> : <ListChecks size={20}/>}
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                        {selectedPlanDetails.title || selectedPlanDetails.name}
                        {selectedPlanDetails.isAiGenerated && <span style={{ marginLeft: '10px', fontSize: '11px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 8px', borderRadius: '50px', verticalAlign: 'middle' }}>✨ AI Generated</span>}
                      </h3>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPlanDetails(null); 
                        setItemType(null);
                        setFormData(prev => ({ ...prev, destination: '' }));
                      }} 
                      style={{ background: '#f1f5f9', border: 'none', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#64748b' }}
                    >
                      Change Plan
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Duration</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '600' }}><Clock size={14} style={{display:'inline', marginRight:'5px'}}/> {selectedPlanDetails.days || 'Flexible'}</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Location</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '600' }}><MapPin size={14} style={{display:'inline', marginRight:'5px'}}/> {selectedPlanDetails.dest || selectedPlanDetails.location}</p>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Key Highlights</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                        {Array.isArray(selectedPlanDetails.highlights) 
                          ? selectedPlanDetails.highlights.join(', ') 
                          : (selectedPlanDetails.highlights || "Customizable activities based on your interests.")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Trip Cart Section */}
              {cartItems.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={18} color="#0284c7" /> Included from your Trip Cart ({cartItems.length})
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '12px', backgroundColor: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', position: 'relative' }}>
                        <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 0 2px 0' }}>{item.title}</h4>
                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}><MapPin size={10} style={{display:'inline'}}/> {item.location}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} title="Remove" style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '5px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          <form onSubmit={handleStartPlanning}>
            
            {/* --- RESPONSIVE CSS GRID APPLIED HERE --- */}
            <div className="form-grid">
              
              {/* Origin Autocomplete (Span 2) */}
              <div className="col-span-2" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Origin</label>
                <div style={{ position: 'relative' }}>
                  <PlaneTakeoff size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" required value={formData.origin} onChange={(e) => handlePlaceInputChange(e, 'origin')} 
                    onFocus={() => setActiveDropdown('origin')} placeholder="Starting city" 
                    style={{ width: '100%', boxSizing:'border-box', height: '48px', padding: '0 14px 0 42px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155', fontSize: '14px' }} 
                  />
                  {isLoadingPlaces.origin && <Loader2 size={16} color="#94a3b8" className="animate-spin" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />}
                </div>
                {activeDropdown === 'origin' && originSuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 50, overflow: 'hidden' }}>
                    {originSuggestions.map((place, i) => (
                      <div key={i} onClick={() => selectPlace(place, 'origin')} style={{ padding: '12px 16px', fontSize: '14px', color: '#334155', cursor: 'pointer', borderBottom: i === originSuggestions.length -1 ? 'none' : '1px solid #f1f5f9' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f8fafc'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='transparent'}>
                        <MapPin size={14} color="#94a3b8" style={{ display: 'inline', marginRight: '8px' }} /> {place}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination Autocomplete (Span 2) */}
              <div className="col-span-2" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Destination</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" required value={formData.destination} onChange={(e) => handlePlaceInputChange(e, 'destination')} 
                    onFocus={() => setActiveDropdown('destination')} placeholder="Going to" 
                    style={{ width: '100%', boxSizing:'border-box', height: '48px', padding: '0 14px 0 42px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155', fontSize: '14px' }} 
                  />
                  {isLoadingPlaces.dest && <Loader2 size={16} color="#94a3b8" className="animate-spin" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />}
                </div>
                {activeDropdown === 'destination' && destSuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 50, overflow: 'hidden' }}>
                    {destSuggestions.map((place, i) => (
                      <div key={i} onClick={() => selectPlace(place, 'destination')} style={{ padding: '12px 16px', fontSize: '14px', color: '#334155', cursor: 'pointer', borderBottom: i === destSuggestions.length -1 ? 'none' : '1px solid #f1f5f9' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f8fafc'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='transparent'}>
                        <MapPin size={14} color="#94a3b8" style={{ display: 'inline', marginRight: '8px' }} /> {place}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Start Date</label>
                <input type="date" name="startDate" required value={formData.startDate} onChange={(e)=>setFormData({...formData, startDate: e.target.value})} style={{ width: '100%', boxSizing:'border-box', height: '48px', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155', fontSize: '14px' }} />
              </div>
              
              {/* End Date */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>End Date</label>
                <input type="date" name="endDate" min={formData.startDate} required value={formData.endDate} onChange={(e)=>setFormData({...formData, endDate: e.target.value})} style={{ width: '100%', boxSizing:'border-box', height: '48px', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155', fontSize: '14px' }} />
              </div>
              
              {/* Adults Input */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Adults</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', height: '48px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="#94a3b8" />
                    <span style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>{formData.pax}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button type="button" onClick={() => setFormData(p => ({...p, pax: Math.max(1, p.pax-1)}))} style={{ border:'none', background: formData.pax <= 1 ? '#f8fafc' : '#f1f5f9', width:'28px', height:'28px', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: formData.pax <= 1 ? 'not-allowed' : 'pointer', color: formData.pax <= 1 ? '#cbd5e1' : '#64748b', transition: 'all 0.2s' }} onMouseEnter={(e)=>{if(formData.pax > 1) { e.currentTarget.style.backgroundColor='#e2e8f0'; e.currentTarget.style.color='#0f172a'; }}} onMouseLeave={(e)=>{if(formData.pax > 1) { e.currentTarget.style.backgroundColor='#f1f5f9'; e.currentTarget.style.color='#64748b'; }}}><Minus size={14}/></button>
                    <button type="button" onClick={() => setFormData(p => ({...p, pax: p.pax+1}))} style={{ border:'none', background: '#f0fdf4', width:'28px', height:'28px', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor:'pointer', color: '#16a34a', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.backgroundColor='#dcfce7'; e.currentTarget.style.color='#15803d';}} onMouseLeave={(e)=>{e.currentTarget.style.backgroundColor='#f0fdf4'; e.currentTarget.style.color='#16a34a';}}><Plus size={14}/></button>
                  </div>
                </div>
              </div>

              {/* Children Input */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Children</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', height: '48px', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="#94a3b8" />
                    <span style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>{formData.children}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button type="button" onClick={() => setFormData(p => ({...p, children: Math.max(0, p.children-1)}))} style={{ border:'none', background: formData.children <= 0 ? '#f8fafc' : '#f1f5f9', width:'28px', height:'28px', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: formData.children <= 0 ? 'not-allowed' : 'pointer', color: formData.children <= 0 ? '#cbd5e1' : '#64748b', transition: 'all 0.2s' }} onMouseEnter={(e)=>{if(formData.children > 0) { e.currentTarget.style.backgroundColor='#e2e8f0'; e.currentTarget.style.color='#0f172a'; }}} onMouseLeave={(e)=>{if(formData.children > 0) { e.currentTarget.style.backgroundColor='#f1f5f9'; e.currentTarget.style.color='#64748b'; }}}><Minus size={14}/></button>
                    <button type="button" onClick={() => setFormData(p => ({...p, children: p.children+1}))} style={{ border:'none', background: '#f0fdf4', width:'28px', height:'28px', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor:'pointer', color: '#16a34a', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.backgroundColor='#dcfce7'; e.currentTarget.style.color='#15803d';}} onMouseLeave={(e)=>{e.currentTarget.style.backgroundColor='#f0fdf4'; e.currentTarget.style.color='#16a34a';}}><Plus size={14}/></button>
                  </div>
                </div>
              </div>

            </div>

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Custom Requests / Interests</label>
            <textarea rows="4" value={formData.interests} onChange={(e)=>setFormData({...formData, interests: e.target.value})} placeholder="Tell us if you want to change hotels, add extra days, or have specific interests..." style={{ width: '100%', boxSizing:'border-box', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '15px', fontFamily: 'inherit', color: '#334155' }} />

            {/* --- INTERACTIVE TAG TOGGLES --- */}
            <div style={{ marginBottom: '35px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>
                <Tag size={14} /> Quick Select:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {["🏔️ Mountains", "🏖️ Beaches", "🏛️ Heritage", "🍛 Local Food", "🐅 Safari", "🧘‍♀️ Wellness", "📸 Photography", "🎒 Trekking"].map((tag, idx) => {
                  const isActive = formData.interests.includes(tag);
                  return (
                    <button type="button" key={idx} onClick={() => handleTagClick(tag)} style={{ padding: '8px 14px', borderRadius: '50px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', border: isActive ? '1px solid #16a34a' : '1px solid #e2e8f0', backgroundColor: isActive ? '#f0fdf4' : '#f8fafc', color: isActive ? '#16a34a' : '#64748b' }}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '18px', borderRadius: '14px', backgroundColor: '#16a34a', color: 'white', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(22,163,74,0.2)' }}>
              {selectedPlanDetails || cartItems.length > 0 || routeStops.length > 0 ? `Confirm & Request Customization` : "Build My Itinerary"}
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 3. DYNAMIC AI SEASONAL SUGGESTIONS */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <div style={{ padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '12px' }}><Bot size={24} color="#0284c7" /></div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>AI Picks for {currentMonthNameDisplay}</h2>
          </div>
          
          {isLoadingSeasonal ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
              <Loader2 size={30} color="#0284c7" className="animate-spin" style={{ marginBottom: '15px' }} />
              <p style={{ color: '#475569', fontWeight: '500' }}>Our AI is finding the perfect weather spots for {currentMonthNameDisplay}...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {seasonalPicks.map((pick, idx) => (
                <div 
                  key={idx} onClick={() => handleTemplateConfirm({ title: pick.name, dest: pick.name, days: "Custom Duration", highlights: pick.desc, description: "AI seasonal recommendation." })}
                  style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={pick.img} alt={pick.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
                    <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(2, 132, 199, 0.9)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '10px', fontWeight: 'bold' }}>AI PICK</div>
                  </div>
                  <div style={{ padding: '25px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{pick.name}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{pick.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. DYNAMIC ITINERARIES */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
             <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
               {searchTarget ? `Itineraries for ${formData.destination}` : "Ready-to-Go Itineraries"}
             </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {/* Show Pre-Built Matches */}
            {filteredItineraries.length > 0 && filteredItineraries.map((itin, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{itin.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>{itin.description || itin.overview}</p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#475569', marginBottom: '20px', fontWeight: '600' }}>
                  <span><Clock size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {itin.days}</span>
                  <span><MapPin size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {(itin.dest || itin.location || '').split(',')[0]}</span>
                </div>
                <button 
                  onClick={() => { setPreviewItin(itin); setModalState('previewItin'); }} 
                  style={{ marginTop: 'auto', padding: '12px', borderRadius: '10px', backgroundColor: 'transparent', color: '#0284c7', border: '1px solid #0284c7', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} 
                  onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#e0f2fe'}} 
                  onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'}}
                >
                  View Details
                </button>
              </div>
            ))}

            {/* Ollama Loading State */}
            {isGeneratingAI && (
              <div style={{ backgroundColor: '#f0fdf4', border: '1px dashed #16a34a', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Loader2 size={30} color="#16a34a" className="animate-spin" style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d', margin: '0 0 8px 0' }}>Asking our AI Expert...</h4>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Crafting a {currentCalcDuration} itinerary for {formData.destination} right now.</p>
              </div>
            )}

            {/* Render AI Generated Itinerary */}
            {!isGeneratingAI && aiGeneratedItinerary && (
              <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Bot size={12} /> AI Custom Built
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{aiGeneratedItinerary.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>{aiGeneratedItinerary.description}</p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#475569', marginBottom: '20px', fontWeight: '600' }}>
                  <span><Clock size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {aiGeneratedItinerary.days}</span>
                  <span><MapPin size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {aiGeneratedItinerary.dest}</span>
                </div>
                <button 
                  onClick={() => { setPreviewItin(aiGeneratedItinerary); setModalState('previewItin'); }} 
                  style={{ marginTop: 'auto', padding: '12px', borderRadius: '10px', backgroundColor: '#0284c7', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} 
                  onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#0369a1'}} 
                  onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#0284c7'}}
                >
                  View AI Itinerary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 5. CURATED LOCAL EXPERIENCES */}
        {filteredExperiences.length > 0 ? (
          <div style={{ marginBottom: '70px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
               <div style={{ padding: '10px', backgroundColor: '#dcfce7', borderRadius: '12px' }}><Activity size={24} color="#16a34a" /></div>
               <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Curated Local Experiences</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
              {filteredExperiences.map((exp) => (
                <div 
                  key={exp.id} 
                  style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ height: '220px', position: 'relative' }}>
                    <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#16a34a', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <Sparkles size={14} /> {exp.category}
                    </div>
                  </div>
                  <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>
                        <MapPin size={14} /> {exp.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4b5563', fontSize: '13px', fontWeight: '600', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '6px' }}>
                        <Clock size={12} /> {exp.duration}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', lineHeight: '1.3' }}>{exp.title}</h3>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{exp.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => { setPreviewExp(exp); setModalState('previewExp'); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: 'transparent', color: '#16a34a', border: '2px solid #16a34a', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.backgroundColor='#16a34a'; e.currentTarget.style.color='white';}} onMouseLeave={(e)=>{e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#16a34a';}}>
                        Details
                      </button>
                      <button onClick={() => handleExperienceConfirm(exp)} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}>
                        Add to Plan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchTarget ? (
          <div style={{ marginBottom: '70px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '20px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <Activity size={30} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#334155' }}>No curated experiences loaded for {formData.destination} yet.</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Don't worry! If you submit your plan, our experts will build custom activities for you.</p>
          </div>
        ) : null}
      </div>

      {/* --- OVERLAY MODALS --- */}
      {modalState !== 'none' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          
          {/* 1. ITINERARY PREVIEW MODAL */}
          {modalState === 'previewItin' && previewItin && (
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease-out forwards', maxHeight: '90vh', overflowY: 'auto' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              
              <div style={{ backgroundColor: previewItin.isAiGenerated ? '#e0f2fe' : '#f0fdf4', color: previewItin.isAiGenerated ? '#0284c7' : '#16a34a', display: 'inline-block', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>
                {previewItin.isAiGenerated ? "✨ AI Generated Preview" : "Itinerary Preview"}
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 10px 0' }}>{previewItin.title}</h2>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '25px', fontWeight: '600', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                <span><Clock size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewItin.days}</span>
                <span><MapPin size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewItin.dest || previewItin.location}</span>
              </div>
              
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '10px' }}>Overview</h4>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '25px' }}>{previewItin.description || previewItin.overview}</p>
              
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '10px' }}>Key Highlights</h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
                {(Array.isArray(previewItin.highlights) 
                  ? previewItin.highlights 
                  : (previewItin.highlights || "Customizable highlights based on your preferences.").split(', ')
                ).map((hl, i) => <li key={i} style={{ marginBottom: '8px' }}>{hl}</li>)}
              </ul>

              {previewItin.plan && previewItin.plan.length > 0 && (
                <>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '15px' }}>Suggested Flow</h4>
                  <div style={{ borderLeft: '2px solid #e2e8f0', marginLeft: '10px', paddingLeft: '20px', marginBottom: '35px' }}>
                    {previewItin.plan.map((day, idx) => (
                      <div key={idx} style={{ position: 'relative', marginBottom: '15px' }}>
                        <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: previewItin.isAiGenerated ? '#0284c7' : '#16a34a' }} />
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 4px 0' }}>Day {day.day}: {day.title}</h5>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{day.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button onClick={() => handleTemplateConfirm(previewItin)} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: previewItin.isAiGenerated ? '#0284c7' : '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0, 0.15)' }}>
                Add this to my Planner
              </button>
            </div>
          )}

          {/* 2. EXPERIENCE PREVIEW MODAL */}
          {modalState === 'previewExp' && previewExp && (
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '800px', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease-out forwards', maxHeight: '90vh', overflowY: 'auto' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              
              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', display: 'inline-block', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>Experience Details</div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 10px 0' }}>{previewExp.title}</h2>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '25px', fontWeight: '600', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                <span><Clock size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewExp.duration}</span>
                <span><MapPin size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewExp.location}</span>
              </div>
              
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>What to Expect</h4>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '30px' }}>{previewExp.fullDesc}</p>
              
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>What's Included</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginBottom: '35px' }}>
                {previewExp.inclusions.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                    <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#4b5563', fontSize: '14px', fontWeight: '600' }}>{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => handleExperienceConfirm(previewExp)} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}>
                Add this to my Planner
              </button>
            </div>
          )}

          {/* 3. SUCCESS MODAL */}
          {modalState === 'success' && (
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', maxWidth: '400px' }}>
              <CheckCircle size={60} color="#16a34a" style={{ margin: '0 auto 20px' }} />
              <h2>Request Prepared!</h2>
              <p>Your WhatsApp or Email should have opened automatically to send your request to our travel team!</p>
              <button onClick={closeModal} style={{ padding: '12px 30px', borderRadius: '50px', backgroundColor: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Done</button>
            </div>
          )}

          {/* 4. CONTACT MODAL */}
          {modalState === 'contact' && (
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '500px', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease-out forwards' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              
              <form onSubmit={handleSubmitRequest}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><Map size={30} /></div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>Where should we send your request?</h2>
                <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>Our travel experts are reviewing your request for <strong>{formData.destination || 'your destination'}</strong>. Choose how you'd like to receive the details.</p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button type="button" onClick={() => { setContactMethod('whatsapp'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'whatsapp' ? '2px solid #25D366' : '1px solid #e2e8f0', backgroundColor: contactMethod === 'whatsapp' ? '#f0fdf4' : 'white', color: contactMethod === 'whatsapp' ? '#16a348' : '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><MessageCircle size={18} /> WhatsApp</button>
                  <button type="button" onClick={() => { setContactMethod('email'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'email' ? '2px solid #16a34a' : '1px solid #e2e8f0', backgroundColor: contactMethod === 'email' ? '#f0fdf4' : 'white', color: contactMethod === 'email' ? '#15803d' : '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><Mail size={18} /> Email</button>
                </div>

                <input 
                  type={contactMethod === 'email' ? 'email' : 'tel'} 
                  placeholder={contactMethod === 'email' ? 'Your email address' : 'Your WhatsApp number (e.g. 9876543210)'}
                  value={contactValue} onChange={(e) => setContactValue(e.target.value)} required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', marginBottom: '30px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Send Request via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Injecting CSS directly to handle the precise responsive grid layout for the form */}
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }
        
        @media (min-width: 640px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .form-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .col-span-2 {
            grid-column: span 2;
          }
        }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default PlanTrip;