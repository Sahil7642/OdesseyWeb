import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, Sparkles, ArrowRight, Sun, Map, Clock, Plus, Minus, Tag, Mail, MessageCircle, CheckCircle, PhoneCall, X, ListChecks, PlaneTakeoff, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Import from ItinerariesPage
import { itineraries as importedItineraries } from './ItinerariesPage'; 

// Ola Maps API Key (Add this to your .env file: REACT_APP_OLA_MAPS_API_KEY="your_key_here")
const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || "";

const PlanTrip = () => {
  const location = useLocation();

  // --- TRIP DATA STATE ---
  const [formData, setFormData] = useState({
    origin: '', destination: '', startDate: '', endDate: '', groupType: '', pax: 1, interests: ''
  });

  // --- AUTOCOMPLETE STATE ---
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'origin' | 'destination' | null
  const [isLoadingPlaces, setIsLoadingPlaces] = useState({ origin: false, dest: false });
  
  const originTimer = useRef(null);
  const destTimer = useRef(null);

  // --- FULL DATA OBJECT STATE ---
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [itemType, setItemType] = useState(null); 
  const [previewItin, setPreviewItin] = useState(null); 

  // --- MODAL & CONTACT STATE ---
  const [modalState, setModalState] = useState('none'); 
  const [contactMethod, setContactMethod] = useState('email'); 
  const [contactValue, setContactValue] = useState('');

  // --- SEASONAL PICKS STATE ---
  const [seasonalPicks, setSeasonalPicks] = useState([]);
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  // --- FAILSAFE DATA LOAD ---
  const masterItineraries = importedItineraries || [
    { 
      title: "Golden Triangle Highlights", dest: "Delhi, Agra, Jaipur", days: "5 Days / 4 Nights", tags: ["History", "Culture", "Monuments"],
      highlights: "Sunrise at Taj Mahal, Elephant ride at Amer Fort, Rickshaw tour in Old Delhi.",
      description: "A classic introduction to India's royal heritage and architectural wonders."
    },
    { 
      title: "Kerala Backwaters & Tea", dest: "Kochi, Munnar, Alleppey", days: "7 Days / 6 Nights", tags: ["Nature", "Relaxation", "Houseboat"],
      highlights: "Overnight luxury Houseboat cruise, guided tea plantation trekking.",
      description: "A lush, tropical journey through the serene backwaters of South India."
    }
  ];

  // --- DETECT INCOMING ITEMS & CONTEXT ---
  useEffect(() => {
    if (location.state) {
      const stateData = location.state;
      
      if (stateData.prefillPackage) {
        const pkg = stateData.prefillPackage;
        const fullDetails = masterItineraries.find(i => i.title === pkg.title) || pkg;
        setSelectedPlanDetails(fullDetails);
        setItemType('Template');
        setFormData(prev => ({ ...prev, destination: fullDetails.dest || fullDetails.location }));
      } 
      else if (stateData.prefillLodge) {
        setSelectedPlanDetails(stateData.prefillLodge);
        setItemType('Lodge');
        setFormData(prev => ({ ...prev, destination: stateData.prefillLodge.location }));
      }
      else if (stateData.prefillExperience) {
        setSelectedPlanDetails(stateData.prefillExperience);
        setItemType('Experience');
        setFormData(prev => ({ ...prev, destination: stateData.prefillExperience.location }));
      }

      setFormData(prev => ({
        ...prev,
        origin: stateData.origin || stateData.from || prev.origin,
        destination: stateData.destination || stateData.to || prev.destination,
        startDate: stateData.startDate || stateData.date || prev.startDate,
        endDate: stateData.endDate || prev.endDate,
        pax: stateData.passengers || stateData.pax || prev.pax,
        interests: stateData.interests || prev.interests,
      }));

      window.history.replaceState({}, document.title);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // --- DYNAMIC SEASON ENGINE ---
  useEffect(() => {
    const month = new Date().getMonth(); 
    let basePicks = [];
    
    if (month >= 2 && month <= 4) {
      basePicks = [
        { name: "Ladakh", desc: "Clear blue skies and epic mountain passes opening up.", img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80" },
        { name: "Rishikesh", desc: "Perfect river rafting and yoga retreats before the heavy rains.", img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=600&q=80" },
        { name: "Munnar", desc: "Escape the summer heat in lush, misty tea estates.", img: "https://images.unsplash.com/photo-1593693397690-36280732625f?auto=format&fit=crop&w=600&q=80" }
      ];
    } else if (month >= 5 && month <= 8) {
      basePicks = [
        { name: "Valley of Flowers", desc: "Witness the Himalayas bloom in spectacular color.", img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=600&q=80" },
        { name: "Udaipur", desc: "Romantic, rain-washed palaces and brimming lakes.", img: "https://images.unsplash.com/photo-1615861228075-1b42787383cb?auto=format&fit=crop&w=600&q=80" },
        { name: "Shillong", desc: "The Scotland of the East in its lush, green glory.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" }
      ];
    } else {
      basePicks = [
        { name: "Jaipur", desc: "Perfect cool weather for exploring royal heritage.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80" },
        { name: "Goa", desc: "Sunny beaches, festive vibes, and perfect coastlines.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
        { name: "Gulmarg", desc: "A winter wonderland perfect for skiing and snow.", img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=600&q=80" }
      ];
    }
    setSeasonalPicks(basePicks);
  }, []);

  // --- OLA MAPS AUTOCOMPLETE LOGIC ---
  const fetchPlaces = async (input, type) => {
    if (!input || input.length < 2) {
      if (type === 'origin') setOriginSuggestions([]);
      if (type === 'dest') setDestSuggestions([]);
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
      } catch (error) {
        console.error("Ola Maps API Error:", error);
      }
    } else {
      // Offline Indian City Fallback
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
    setFormData(prev => ({ ...prev, destination: itin.dest || itin.location || '' }));
    setModalState('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setModalState('none');
    setPreviewItin(null);
  };

  // Close dropdowns if clicked outside
  const handleGlobalClick = () => {
    if (activeDropdown) setActiveDropdown(null);
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
          
          {/* --- FULL DATA PREVIEW CARD --- */}
          {selectedPlanDetails && (
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', marginBottom: '35px', animation: 'slideDown 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px', borderRadius: '10px' }}><ListChecks size={20}/></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{selectedPlanDetails.title || selectedPlanDetails.name}</h3>
                </div>
                <button onClick={() => {setSelectedPlanDetails(null); setItemType(null);}} style={{ background: '#f1f5f9', border: 'none', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#64748b' }}>Change Plan</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Duration</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '600' }}><Clock size={14} style={{display:'inline', marginRight:'5px'}}/> {selectedPlanDetails.days || 'Flexible'}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Route</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '600' }}><MapPin size={14} style={{display:'inline', marginRight:'5px'}}/> {selectedPlanDetails.dest || selectedPlanDetails.location}</p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Key Highlights</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>{selectedPlanDetails.highlights || "Customizable activities based on your interests."}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleStartPlanning}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              
              {/* Origin Autocomplete */}
              <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Origin</label>
                <div style={{ position: 'relative' }}>
                  <PlaneTakeoff size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" value={formData.origin} onChange={(e) => handlePlaceInputChange(e, 'origin')} 
                    onFocus={() => setActiveDropdown('origin')} placeholder="Starting city" 
                    style={{ width: '100%', boxSizing:'border-box', padding: '14px 14px 14px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
                  />
                  {isLoadingPlaces.origin && <Loader2 size={16} color="#94a3b8" className="animate-spin" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />}
                </div>
                {/* Dropdown */}
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

              {/* Destination Autocomplete */}
              <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Destination</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" value={formData.destination} onChange={(e) => handlePlaceInputChange(e, 'destination')} 
                    onFocus={() => setActiveDropdown('destination')} placeholder="Going to" 
                    style={{ width: '100%', boxSizing:'border-box', padding: '14px 14px 14px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
                  />
                  {isLoadingPlaces.dest && <Loader2 size={16} color="#94a3b8" className="animate-spin" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />}
                </div>
                {/* Dropdown */}
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

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={(e)=>setFormData({...formData, startDate: e.target.value})} style={{ width: '100%', boxSizing:'border-box', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>End Date</label>
                <input type="date" name="endDate" min={formData.startDate} value={formData.endDate} onChange={(e)=>setFormData({...formData, endDate: e.target.value})} style={{ width: '100%', boxSizing:'border-box', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', color: '#334155' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Travelers</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <button type="button" onClick={() => setFormData(p => ({...p, pax: Math.max(1, p.pax-1)}))} style={{ border:'none', background:'#f1f5f9', width:'30px', height:'30px', borderRadius:'6px', cursor:'pointer' }}><Minus size={14}/></button>
                  <span style={{ fontWeight: 'bold', color: '#334155' }}>{formData.pax} Pax</span>
                  <button type="button" onClick={() => setFormData(p => ({...p, pax: p.pax+1}))} style={{ border:'none', background:'#f1f5f9', width:'30px', height:'30px', borderRadius:'6px', cursor:'pointer' }}><Plus size={14}/></button>
                </div>
              </div>
            </div>

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Custom Requests / Interests</label>
            <textarea rows="3" value={formData.interests} onChange={(e)=>setFormData({...formData, interests: e.target.value})} placeholder="Tell us if you want to change hotels, add extra days, or have specific interests..." style={{ width: '100%', boxSizing:'border-box', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', marginBottom: '15px', fontFamily: 'inherit', color: '#334155' }} />

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
              {selectedPlanDetails ? `Confirm & Request Customization` : "Build My Itinerary"}
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 3. DYNAMIC SEASONAL SUGGESTIONS */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <div style={{ padding: '10px', backgroundColor: '#fef08a', borderRadius: '12px' }}><Sun size={24} color="#ca8a04" /></div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Perfect for {currentMonthName}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {seasonalPicks.map((pick, idx) => (
              <div 
                key={idx} onClick={() => handleTemplateConfirm({ title: pick.name, dest: pick.name, days: "Custom Duration", highlights: pick.desc, description: "Seasonal special recommendation based on the current month." })}
                style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={pick.img} alt={pick.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
                <div style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{pick.name}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{pick.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. DYNAMIC ITINERARIES (LOADED FROM SHARED DATA) */}
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Ready-to-Go Itineraries</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {masterItineraries.map((itin, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{itin.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>{itin.description}</p>
              <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#475569', marginBottom: '20px', fontWeight: '600' }}>
                <span><Clock size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {itin.days}</span>
                <span><MapPin size={14} style={{display:'inline', marginRight:'4px', color: '#94a3b8'}}/> {(itin.dest || itin.location || '').split(',')[0]}</span>
              </div>
              <button 
                onClick={() => { setPreviewItin(itin); setModalState('preview'); }} 
                style={{ marginTop: 'auto', padding: '12px', borderRadius: '10px', backgroundColor: 'transparent', color: '#0284c7', border: '1px solid #0284c7', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} 
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#e0f2fe'}} 
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'}}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- OVERLAY MODALS --- */}
      {modalState !== 'none' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          
          {/* ITINERARY PREVIEW MODAL */}
          {modalState === 'preview' && previewItin && (
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease-out forwards', maxHeight: '90vh', overflowY: 'auto' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              
              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', display: 'inline-block', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>
                Itinerary Preview
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 10px 0' }}>{previewItin.title}</h2>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '25px', fontWeight: '600', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                <span><Clock size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewItin.days}</span>
                <span><MapPin size={16} style={{display:'inline', marginRight:'6px', verticalAlign:'text-bottom'}}/> {previewItin.dest || previewItin.location}</span>
              </div>
              
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '10px' }}>Overview</h4>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '25px' }}>{previewItin.description}</p>
              
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '10px' }}>Key Highlights</h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '35px' }}>
                {(previewItin.highlights || "Customizable highlights based on your preferences.").split(', ').map((hl, i) => <li key={i} style={{ marginBottom: '8px' }}>{hl}</li>)}
              </ul>

              <button onClick={() => handleTemplateConfirm(previewItin)} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}>
                Add this to my Planner
              </button>
            </div>
          )}

          {/* SUCCESS MODAL */}
          {modalState === 'success' && (
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', maxWidth: '400px' }}>
              <CheckCircle size={60} color="#16a34a" style={{ margin: '0 auto 20px' }} />
              <h2>Request Received!</h2>
              <p>Our experts are now crafting your custom version of the <strong>{selectedPlanDetails?.title || formData.destination}</strong> journey.</p>
              <button onClick={closeModal} style={{ padding: '12px 30px', borderRadius: '50px', backgroundColor: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Done</button>
            </div>
          )}

          {/* CONTACT MODAL */}
          {modalState === 'contact' && (
            <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '500px', borderRadius: '24px', padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease-out forwards' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              <form onSubmit={(e) => { e.preventDefault(); setModalState('success'); }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><Map size={30} /></div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>Where should we send your request?</h2>
                <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>Our travel experts are reviewing your request for <strong>{formData.destination || 'your destination'}</strong>. Choose how you'd like to receive the details.</p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button type="button" onClick={() => { setContactMethod('email'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'email' ? '2px solid #16a34a' : '1px solid #e2e8f0', backgroundColor: contactMethod === 'email' ? '#f0fdf4' : 'white', color: contactMethod === 'email' ? '#15803d' : '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><Mail size={18} /> Email</button>
                  <button type="button" onClick={() => { setContactMethod('whatsapp'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'whatsapp' ? '2px solid #25D366' : '1px solid #e2e8f0', backgroundColor: contactMethod === 'whatsapp' ? '#f0fdf4' : 'white', color: contactMethod === 'whatsapp' ? '#16a348' : '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}><MessageCircle size={18} /> WhatsApp</button>
                </div>

                <input 
                  type={contactMethod === 'email' ? 'email' : 'tel'} 
                  placeholder={contactMethod === 'email' ? 'Enter your email address' : 'Enter your WhatsApp number'}
                  value={contactValue} onChange={(e) => setContactValue(e.target.value)} required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', marginBottom: '30px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Send Request</button>
              </form>
            </div>
          )}
        </div>
      )}

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default PlanTrip;