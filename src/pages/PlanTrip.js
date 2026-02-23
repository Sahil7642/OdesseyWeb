import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Sparkles, ArrowRight, Compass, Sun, Map, Clock, Plus, Minus, Tag, Mail, MessageCircle, CheckCircle, PhoneCall, X, Edit3, Home, Activity } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PlanTrip = () => {
  const location = useLocation();

  // --- TRIP DATA STATE ---
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    groupType: '',
    pax: 1, 
    interests: ''
  });

  // --- NEW: DYNAMIC CUSTOMIZATION STATE ---
  const [baseItemName, setBaseItemName] = useState(null);
  const [itemType, setItemType] = useState(null); // Will be 'Template', 'Lodge', or 'Experience'

  // --- MODAL & CONTACT STATE ---
  const [modalState, setModalState] = useState('none'); // 'none' | 'contact' | 'success'
  const [contactMethod, setContactMethod] = useState('email'); // 'email' | 'whatsapp'
  const [contactValue, setContactValue] = useState('');

  // --- DETECT INCOMING ITEMS (Itinerary, Lodge, or Experience) ---
  useEffect(() => {
    if (location.state) {
      if (location.state.prefillPackage) {
        const pkg = location.state.prefillPackage;
        setBaseItemName(pkg.title);
        setItemType('Template');
        setFormData(prev => ({ ...prev, destination: pkg.location }));
      } 
      else if (location.state.prefillLodge) {
        const lodge = location.state.prefillLodge;
        setBaseItemName(lodge.name);
        setItemType('Lodge');
        setFormData(prev => ({ ...prev, destination: lodge.location }));
      }
      else if (location.state.prefillExperience) {
        const exp = location.state.prefillExperience;
        setBaseItemName(exp.title);
        setItemType('Experience');
        setFormData(prev => ({ ...prev, destination: exp.location }));
      }
      // Clear state so it doesn't loop on manual page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaxChange = (action) => {
    setFormData(prev => ({
      ...prev,
      pax: action === 'inc' ? prev.pax + 1 : (prev.pax > 1 ? prev.pax - 1 : 1)
    }));
  };

  const handleTagClick = (tag) => {
    setFormData(prev => {
      const currentInterests = prev.interests.trim();
      if (currentInterests.includes(tag)) return prev;
      
      const newInterests = currentInterests 
        ? `${currentInterests}, ${tag}` 
        : tag;
      return { ...prev, interests: newInterests };
    });
  };

  // --- SUBMISSION HANDLERS ---
  const handleStartPlanning = (e) => {
    e.preventDefault();
    setModalState('contact');
  };

  const handleTemplateClick = (templateDestination, templateInterests) => {
    setFormData(prev => ({ ...prev, destination: templateDestination, interests: templateInterests }));
    setModalState('contact');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactValue.trim()) return;

    // --- OWNER DETAILS (UPDATE THESE) ---
    const ownerWhatsAppNumber = "919876543210"; 
    const web3FormsAccessKey = "YOUR_WEB3FORMS_ACCESS_KEY_HERE"; 
    
    // Dynamic message based on what they are booking
    const messageDetails = `
      *New Trip Inquiry!* ✈️
      ${baseItemName ? `*Selected ${itemType}:* ${baseItemName}` : ''}
      *Destination:* ${formData.destination}
      *Date:* ${formData.date || 'Not specified'}
      *Style:* ${formData.groupType || 'Not specified'}
      *Travelers:* ${formData.pax}
      *${baseItemName ? 'Specific Requests:' : 'Interests:'}* ${formData.interests}
      
      *User Contact Info:* Method: ${contactMethod}, Value: ${contactValue}
    `;

    try {
      if (contactMethod === 'whatsapp') {
        const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodeURIComponent(messageDetails)}`;
        window.open(whatsappUrl, '_blank');
        setModalState('success');
      } else if (contactMethod === 'email') {
        e.target.querySelector('button[type="submit"]').innerHTML = 'Sending...';
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: web3FormsAccessKey,
            subject: `New Trip Inquiry for ${formData.destination}`,
            from_name: "Your Travel Website",
            message: messageDetails, 
            replyto: contactMethod === 'email' ? contactValue : "" 
          })
        });
        const result = await response.json();
        if (result.success) setModalState('success');
        else { alert("Failed to send. Try again."); e.target.querySelector('button[type="submit"]').innerHTML = 'Send My Request'; }
      }
    } catch (error) { alert("Submission failed. Check connection."); }
  };

  const closeModal = () => {
    setModalState('none');
    setContactValue('');
  };

  // --- UI HELPERS ---
  const getBannerIcon = () => {
    if (itemType === 'Lodge') return <Home size={18} />;
    if (itemType === 'Experience') return <Activity size={18} />;
    return <Edit3 size={18} />;
  };

  const getDynamicPlaceholder = () => {
    if (itemType === 'Template') return `e.g. 'I want to add an extra day', 'Change hotel to 5-star...'`;
    if (itemType === 'Lodge') return `e.g. 'I want to book this for 3 nights', 'Include meals...'`;
    if (itemType === 'Experience') return `e.g. 'I want to add this to my Rajasthan trip', 'What time does it start?'`;
    return `e.g. 'I want a relaxing trip with good food', or 'Looking for trekking...'`;
  };

  // --- STATIC DATA ---
  const interestTags = ["🏔️ Mountains", "🏖️ Beaches", "🏛️ Heritage & History", "🍛 Local Food", "🐅 Wildlife Safari", "🧘‍♀️ Wellness", "📸 Photography", "🎒 Trekking"];

  const seasonalPicks = [
    { name: "Jaipur, Rajasthan", desc: "Perfect spring weather and vibrant culture.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80" },
    { name: "Rishikesh, Uttarakhand", desc: "Ideal for river rafting and yoga retreats.", img: "https://images.unsplash.com/photo-1605640840469-60d8050e3ce4?auto=format&fit=crop&w=600&q=80" },
    { name: "Shillong, Meghalaya", desc: "Blooming cherry blossoms and pleasant valleys.", img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=600&q=80" }
  ];

  const itineraries = [
    { title: "Golden Triangle Highlights", dest: "Delhi, Agra, Jaipur", days: "5 Days / 4 Nights", tags: ["History", "Culture", "Monuments"] },
    { title: "Kerala Backwaters & Tea Estates", dest: "Munnar, Alleppey", days: "7 Days / 6 Nights", tags: ["Nature", "Relaxation", "Houseboat"] },
    { title: "Himalayan Adventure", dest: "Manali, Kasol", days: "6 Days / 5 Nights", tags: ["Mountains", "Trekking", "Snow"] }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingBottom: '80px', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{ 
        position: 'relative', height: '45vh', minHeight: '380px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.8))' }} />
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '15px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '-0.5px' }}>
            Plan Your Custom Trip
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto', fontWeight: '400' }}>
            Tell us what you love, and we'll craft an itinerary tailored just for you.
          </p>
        </div>
      </div>

      {/* 2. MAIN FORM CARD */}
      <div style={{ maxWidth: '1000px', margin: '-80px auto 50px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <form 
          onSubmit={handleStartPlanning}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)',
            borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
            border: '1px solid rgba(255,255,255,0.5)', boxSizing: 'border-box'
          }}
        >
          {/* --- DYNAMIC CUSTOMIZATION BANNER --- */}
          {baseItemName && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '15px 20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: '#16a34a', padding: '8px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                {getBannerIcon()}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#166534', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {itemType === 'Template' ? 'Customizing Template:' : itemType === 'Lodge' ? 'Booking Lodge:' : 'Adding Experience:'}
                </p>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#15803d', fontWeight: 'bold' }}>{baseItemName}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => { setBaseItemName(null); setItemType(null); setFormData(p => ({...p, destination: ''})) }} 
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#166534', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
              >
                Clear
              </button>
            </div>
          )}

          {/* Top Row: Location, Date, Group, Travelers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Where to?</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={20} color="#6b7280" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" name="destination" placeholder="e.g. Kerala, Jaipur..."
                  value={formData.destination} onChange={handleChange} required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', transition: 'all 0.2s', backgroundColor: 'white' }}
                  onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>When?</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={20} color="#6b7280" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="date" name="date" value={formData.date} onChange={handleChange}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '15px 16px 15px 48px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', color: '#4b5563', fontFamily: 'inherit', transition: 'all 0.2s', backgroundColor: 'white' }}
                  onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trip Style</label>
              <div style={{ position: 'relative' }}>
                <Compass size={20} color="#6b7280" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <select 
                  name="groupType" value={formData.groupType} onChange={handleChange}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', color: '#4b5563', backgroundColor: 'white', appearance: 'none', transition: 'all 0.2s' }}
                  onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                >
                  <option value="" disabled>Select style</option>
                  <option value="solo">Solo</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="business">Business Trip</option>
                  <option value="group">Group</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Travelers</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '12px', border: '1px solid #d1d5db', backgroundColor: 'white', height: '54px', boxSizing: 'border-box' }}>
                <button type="button" onClick={() => handlePaxChange('dec')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#e5e7eb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#f3f4f6'}><Minus size={16} /></button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                  <Users size={18} color="#6b7280" /> {formData.pax}
                </div>
                <button type="button" onClick={() => handlePaxChange('inc')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#16a34a', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#dcfce7'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#f0fdf4'}><Plus size={16} /></button>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {baseItemName ? `Any specific requests regarding this ${itemType.toLowerCase()}?` : `What do you want to experience?`}
            </label>
            <div style={{ position: 'relative' }}>
              <Sparkles size={20} color="#6b7280" style={{ position: 'absolute', left: '16px', top: '18px' }} />
              <textarea 
                name="interests" rows="3" 
                placeholder={getDynamicPlaceholder()}
                value={formData.interests} onChange={handleChange} required
                style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'all 0.2s', backgroundColor: 'white', lineHeight: '1.5' }}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280', marginBottom: '10px', fontWeight: '500' }}>
              <Tag size={14} /> Quick add:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {interestTags.map((tag, idx) => (
                <button 
                  type="button" key={idx} onClick={() => handleTagClick(tag)}
                  style={{ padding: '8px 14px', borderRadius: '50px', border: '1px solid #e5e7eb', backgroundColor: 'white', fontSize: '13px', color: '#4b5563', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.backgroundColor = '#f0fdf4'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.backgroundColor = 'white'; }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '18px', borderRadius: '14px', backgroundColor: '#16a34a', color: 'white', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s', boxShadow: '0 8px 20px rgba(22, 163, 74, 0.25)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#15803d'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(22, 163, 74, 0.35)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(22, 163, 74, 0.25)'; }}
          >
            {baseItemName ? `Request this ${itemType}` : "Start Building My Itinerary"} <ArrowRight size={22} />
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 3. SEASONAL SUGGESTIONS */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <div style={{ padding: '10px', backgroundColor: '#fef08a', borderRadius: '12px' }}><Sun size={24} color="#ca8a04" /></div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>Perfect for this Season</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {seasonalPicks.map((pick, idx) => (
              <div 
                key={idx} 
                onClick={() => handleTemplateClick(pick.name, pick.desc)}
                style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={pick.img} alt={pick.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
                <div style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{pick.name}</h4>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>{pick.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. READY-MADE ITINERARIES */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <div style={{ padding: '10px', backgroundColor: '#f3e8ff', borderRadius: '12px' }}><Map size={24} color="#9333ea" /></div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>Ready-To-Go Itineraries</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {itineraries.map((itin, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', padding: '35px', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>{itin.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '15px', marginBottom: '25px', fontWeight: '500' }}>
                  <Clock size={18} color="#9ca3af" /> {itin.days}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px', flex: 1 }}>
                  {itin.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '13px', padding: '6px 14px', borderRadius: '50px', fontWeight: '600' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => handleTemplateClick(itin.dest, `Interested in ${itin.tags.join(', ')}`)}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                >
                  Use this template
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- OVERLAY MODALS (CONTACT & SUCCESS) --- */}
      {modalState !== 'none' && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{ 
            backgroundColor: 'white', width: '100%', maxWidth: '500px', borderRadius: '24px', 
            padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            animation: 'slideUp 0.3s ease-out forwards'
          }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
              <X size={20} />
            </button>

            {/* MODAL 1: CONTACT INFO */}
            {modalState === 'contact' && (
              <form onSubmit={handleContactSubmit}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Map size={30} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Where should we send your request?</h2>
                <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>
                  Our travel experts are reviewing your request for <strong>{formData.destination || 'your destination'}</strong>. Choose how you'd like to receive the details.
                </p>

                {/* Toggle Email vs WhatsApp */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button type="button" onClick={() => { setContactMethod('email'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'email' ? '2px solid #16a34a' : '1px solid #d1d5db', backgroundColor: contactMethod === 'email' ? '#f0fdf4' : 'white', color: contactMethod === 'email' ? '#15803d' : '#4b5563', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Mail size={18} /> Email
                  </button>
                  <button type="button" onClick={() => { setContactMethod('whatsapp'); setContactValue(''); }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: contactMethod === 'whatsapp' ? '2px solid #25D366' : '1px solid #d1d5db', backgroundColor: contactMethod === 'whatsapp' ? '#f0fdf4' : 'white', color: contactMethod === 'whatsapp' ? '#16a348' : '#4b5563', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <MessageCircle size={18} /> WhatsApp
                  </button>
                </div>

                {/* Input Field */}
                <input 
                  type={contactMethod === 'email' ? 'email' : 'tel'} 
                  placeholder={contactMethod === 'email' ? 'Enter your email address' : 'Enter your WhatsApp number'}
                  value={contactValue} onChange={(e) => setContactValue(e.target.value)} required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '16px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', marginBottom: '30px', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = contactMethod === 'email' ? '#16a34a' : '#25D366'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />

                <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}>
                  Send Request
                </button>
              </form>
            )}

            {/* MODAL 2: SUCCESS / THANK YOU */}
            {modalState === 'success' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={40} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>Request Sent!</h2>
                <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                  Your request has been received. Our experts are reviewing it and will reach out to <strong style={{ color: '#111827' }}>{contactValue}</strong> shortly.
                </p>
                
                <div style={{ backgroundColor: '#f3f4f6', borderRadius: '16px', padding: '25px', marginBottom: '30px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px', fontWeight: '500' }}>Need immediate assistance?</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#111827', fontWeight: 'bold', fontSize: '18px' }}>
                    <PhoneCall size={20} color="#16a34a" /> +91 98765 43210
                  </div>
                </div>

                <button onClick={closeModal} style={{ padding: '14px 30px', borderRadius: '50px', backgroundColor: 'white', border: '1px solid #d1d5db', color: '#374151', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  Close & Continue Exploring
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simple inline animation for the modal */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PlanTrip;