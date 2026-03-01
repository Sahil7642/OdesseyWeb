import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Navigation, Sparkles, Compass, Palmtree, Mountain, Building2, 
  Coffee, Camera, Footprints, ShoppingBag, Waves, Sun, Calendar, Clock, ArrowRight, 
  Loader2, CheckCircle2, ChevronLeft, User, Heart, Users, Home, Leaf, Droplets, Binoculars 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || ""; 

// --- EXPANDED SMART DESTINATION DATABASE (25 Destinations) ---
const destinationDB = [
  { id: 1, name: "Goa", state: "Goa", companions: ["Friends", "Couple", "Solo"], vibes: ["Relaxing", "Party"], landscape: "Beaches", activities: ["Water Sports", "Food & Drinks", "Sightseeing"], img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "India's pocket-sized paradise. Pristine beaches, vibrant nightlife, and Portuguese heritage." },
  { id: 2, name: "Manali", state: "Himachal Pradesh", companions: ["Friends", "Couple", "Family"], vibes: ["Adventure", "Nature"], landscape: "Mountains", activities: ["Trekking", "Sightseeing", "Photography"], img: "https://images.unsplash.com/photo-1605649487212-4d43bf8d7904?auto=format&fit=crop&w=800&q=80", desc: "A high-altitude Himalayan resort town known for its cool climate and snow-capped peaks." },
  { id: 3, name: "Udaipur", state: "Rajasthan", companions: ["Couple", "Family"], vibes: ["Cultural", "Relaxing"], landscape: "City/Heritage", activities: ["Sightseeing", "Food & Drinks", "Shopping"], img: "https://images.unsplash.com/photo-1615836245337-f839dffdbac3?auto=format&fit=crop&w=800&q=80", desc: "The City of Lakes. Majestic palaces, romantic boat rides, and rich royal history." },
  { id: 4, name: "Rishikesh", state: "Uttarakhand", companions: ["Solo", "Friends"], vibes: ["Adventure", "Spiritual"], landscape: "Mountains", activities: ["Water Sports", "Trekking", "Sightseeing"], img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80", desc: "The Yoga Capital of the World, sitting on the banks of the holy Ganges river." },
  { id: 5, name: "Munnar", state: "Kerala", companions: ["Couple", "Family"], vibes: ["Nature", "Relaxing"], landscape: "Mountains", activities: ["Sightseeing", "Trekking", "Wildlife"], img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", desc: "Endless expanses of tea plantations, pristine valleys, and exotic flora and fauna." },
  { id: 6, name: "Varanasi", state: "Uttar Pradesh", companions: ["Solo", "Family"], vibes: ["Cultural", "Spiritual"], landscape: "City/Heritage", activities: ["Sightseeing", "Photography", "Food & Drinks"], img: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80", desc: "One of the world's oldest continually inhabited cities. A deeply spiritual and chaotic marvel." },
  { id: 7, name: "Andaman Islands", state: "Andaman & Nicobar", companions: ["Couple", "Family"], vibes: ["Relaxing", "Adventure"], landscape: "Beaches", activities: ["Water Sports", "Sightseeing", "Photography"], img: "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?auto=format&fit=crop&w=800&q=80", desc: "Crystal clear waters, white sandy beaches, and world-class scuba diving." },
  { id: 8, name: "Jaipur", state: "Rajasthan", companions: ["Family", "Friends", "Couple"], vibes: ["Cultural", "Party"], landscape: "City/Heritage", activities: ["Sightseeing", "Shopping", "Food & Drinks"], img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", desc: "The Pink City. A vibrant blend of old-world charm, massive forts, and bustling markets." },
  { id: 9, name: "Leh Ladakh", state: "Ladakh", companions: ["Friends", "Solo"], vibes: ["Adventure", "Nature"], landscape: "Mountains", activities: ["Trekking", "Photography", "Sightseeing"], img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80", desc: "A rugged, barren, and beautiful high-altitude desert with stunning monasteries." },
  { id: 10, name: "Coorg", state: "Karnataka", companions: ["Couple", "Friends"], vibes: ["Nature", "Relaxing"], landscape: "Forests/Jungles", activities: ["Trekking", "Food & Drinks", "Wildlife"], img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80", desc: "The Scotland of India. Misty hills, lush forests, and acres of coffee plantations." },
  { id: 11, name: "Jaisalmer", state: "Rajasthan", companions: ["Friends", "Couple"], vibes: ["Cultural", "Adventure"], landscape: "Desert", activities: ["Sightseeing", "Photography", "Shopping"], img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80", desc: "The Golden City. Famous for its yellow sandstone architecture and vast sand dunes." },
  { id: 12, name: "Gokarna", state: "Karnataka", companions: ["Solo", "Friends"], vibes: ["Relaxing", "Spiritual"], landscape: "Beaches", activities: ["Trekking", "Water Sports", "Food & Drinks"], img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80", desc: "A more laid-back, spiritual alternative to Goa with stunning cliff-side beaches." },
  { id: 13, name: "Shillong", state: "Meghalaya", companions: ["Friends", "Solo", "Couple"], vibes: ["Nature", "Cultural"], landscape: "Mountains", activities: ["Sightseeing", "Trekking", "Photography"], img: "https://images.unsplash.com/photo-1571536802807-3cabae663a8a?auto=format&fit=crop&w=800&q=80", desc: "The abode of clouds. Known for its living root bridges, waterfalls, and rock music culture." },
  { id: 14, name: "Wayanad", state: "Kerala", companions: ["Family", "Couple"], vibes: ["Nature", "Relaxing"], landscape: "Forests/Jungles", activities: ["Wildlife", "Trekking", "Sightseeing"], img: "https://images.unsplash.com/photo-1621213038659-4d6cb35d0af9?auto=format&fit=crop&w=800&q=80", desc: "A lush, green district famous for its wildlife sanctuaries, spice plantations, and waterfalls." },
  { id: 15, name: "Hampi", state: "Karnataka", companions: ["Solo", "Friends"], vibes: ["Cultural", "Adventure"], landscape: "City/Heritage", activities: ["Sightseeing", "Photography", "Trekking"], img: "https://images.unsplash.com/photo-1600011689032-8b638b080967?auto=format&fit=crop&w=800&q=80", desc: "An ancient village filled with ruined temple complexes from the Vijayanagara Empire." },
  { id: 16, name: "Alleppey", state: "Kerala", companions: ["Couple", "Family"], vibes: ["Relaxing", "Nature"], landscape: "Beaches", activities: ["Water Sports", "Food & Drinks", "Photography"], img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", desc: "Famous for its serene backwaters, houseboat cruises, and tranquil village life." },
  { id: 17, name: "Darjeeling", state: "West Bengal", companions: ["Family", "Couple"], vibes: ["Nature", "Cultural"], landscape: "Mountains", activities: ["Sightseeing", "Food & Drinks", "Shopping"], img: "https://images.unsplash.com/photo-1544634076-a90160ddf44a?auto=format&fit=crop&w=800&q=80", desc: "Famed for its sweeping tea estates and the iconic toy train with views of Kanchenjunga." },
  { id: 18, name: "Spiti Valley", state: "Himachal Pradesh", companions: ["Friends", "Solo"], vibes: ["Adventure", "Nature"], landscape: "Mountains", activities: ["Trekking", "Photography", "Sightseeing"], img: "https://images.unsplash.com/photo-1616422285623-14c12ff31404?auto=format&fit=crop&w=800&q=80", desc: "A cold desert mountain valley known for its extreme landscapes and ancient Buddhist culture." },
  { id: 19, name: "Pondicherry", state: "Puducherry", companions: ["Couple", "Friends", "Solo"], vibes: ["Relaxing", "Cultural"], landscape: "Beaches", activities: ["Food & Drinks", "Sightseeing", "Shopping"], img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", desc: "A charming coastal town blending traditional Indian sensibilities with French colonial heritage." },
  { id: 20, name: "Jim Corbett", state: "Uttarakhand", companions: ["Family", "Friends"], vibes: ["Adventure", "Nature"], landscape: "Forests/Jungles", activities: ["Wildlife", "Photography", "Sightseeing"], img: "https://images.unsplash.com/photo-1589552317376-7cb4fc8f79f5?auto=format&fit=crop&w=800&q=80", desc: "India's oldest national park, famous for its thrilling jeep safaris and wild Bengal tigers." },
  { id: 21, name: "Pushkar", state: "Rajasthan", companions: ["Solo", "Friends"], vibes: ["Spiritual", "Cultural"], landscape: "Desert", activities: ["Sightseeing", "Shopping", "Food & Drinks"], img: "https://images.unsplash.com/photo-1598440075586-2713f4124317?auto=format&fit=crop&w=800&q=80", desc: "A holy town wrapping around a sacred lake, known for its vibrant camel fair and ghats." },
  { id: 22, name: "Varkala", state: "Kerala", companions: ["Solo", "Friends", "Couple"], vibes: ["Relaxing", "Spiritual"], landscape: "Beaches", activities: ["Water Sports", "Food & Drinks", "Photography"], img: "https://images.unsplash.com/photo-1599818814781-a6750df1d8da?auto=format&fit=crop&w=800&q=80", desc: "Famous for its stunning red laterite cliffs adjacent to the Arabian Sea." },
  { id: 23, name: "Tawang", state: "Arunachal Pradesh", companions: ["Friends", "Solo"], vibes: ["Cultural", "Nature"], landscape: "Mountains", activities: ["Sightseeing", "Trekking", "Photography"], img: "https://images.unsplash.com/photo-1626025219962-d9614213d2f9?auto=format&fit=crop&w=800&q=80", desc: "A high-altitude haven known for its massive monastery, glacial lakes, and profound peace." },
  { id: 24, name: "Ooty", state: "Tamil Nadu", companions: ["Family", "Couple"], vibes: ["Nature", "Relaxing"], landscape: "Mountains", activities: ["Sightseeing", "Photography", "Shopping"], img: "https://images.unsplash.com/photo-1596781033282-1eecbc754eb2?auto=format&fit=crop&w=800&q=80", desc: "The Queen of Hill Stations, featuring rolling hills, botanical gardens, and colonial architecture." },
  { id: 25, name: "Kutch", state: "Gujarat", companions: ["Family", "Friends"], vibes: ["Cultural", "Nature"], landscape: "Desert", activities: ["Sightseeing", "Photography", "Shopping"], img: "https://images.unsplash.com/photo-1628169389591-1c5c4e8f1754?auto=format&fit=crop&w=800&q=80", desc: "Home to the massive white salt desert (Rann of Kutch), rich in handicrafts and vibrant culture." }
];

// --- AUTOCOMPLETE ENGINE ---
const SearchAutocomplete = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!value || value.length < 2) { setSuggestions([]); return; }
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (OLA_MAPS_API_KEY) {
          const res = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(value)}&api_key=${OLA_MAPS_API_KEY}`);
          const data = await res.json();
          if (data?.predictions) { setSuggestions(data.predictions.map(p => p.description)); return; }
        }
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`);
        const data = await res.json();
        if (data?.features) {
          const parsed = data.features.filter(f => f.properties.country === 'India' || f.properties.countrycode === 'IN')
            .map(f => [f.properties.name, f.properties.state].filter(Boolean).join(', '));
          setSuggestions([...new Set(parsed)]);
        }
      } catch(e) {}
    }, 400); 
    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: '100%', position: 'relative' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <MapPin size={22} color="#0284c7" style={{ position: 'absolute', left: '20px' }} />
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => { onChange(e.target.value); setShowDropdown(true); }} onFocus={() => { if(suggestions.length > 0) setShowDropdown(true); }} style={{ width: '100%', padding: '20px 20px 20px 55px', borderRadius: '16px', border: '2px solid #e5e7eb', outline: 'none', fontSize: '18px', fontWeight: 'bold', color: '#111827', backgroundColor: '#f9fafb', transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }} />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', listStyle: 'none', margin: '8px 0 0 0', padding: '5px 0', zIndex: 50, border: '1px solid #e5e7eb' }}>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => { onChange(s); setShowDropdown(false); }} style={{ padding: '15px 20px', cursor: 'pointer', borderBottom: i === suggestions.length - 1 ? 'none' : '1px solid #f3f4f6', fontSize: '15px', color: '#374151', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
              <Navigation size={16} color="#16a34a" /> {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TripDiscovererPage = () => {
  const navigate = useNavigate();

  // --- QUIZ STATE ---
  const [step, setStep] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  
  const [quizData, setQuizData] = useState({
    origin: '',
    companions: '',
    vibe: '',
    landscape: '',
    activities: [],
    duration: ''
  });

  // --- OPTIONS DATA ---
  const companions = [
    { label: 'Solo', icon: User, desc: "Just me and my backpack" },
    { label: 'Couple', icon: Heart, desc: "A romantic or duo trip" },
    { label: 'Family', icon: Home, desc: "Traveling with kids or parents" },
    { label: 'Friends', icon: Users, desc: "A group of buddies" }
  ];

  const vibes = [
    { label: 'Nature & Wildlife', icon: Palmtree, color: '#15803d', bg: '#dcfce7' },
    { label: 'Adventure', icon: Mountain, color: '#b91c1c', bg: '#fee2e2' },
    { label: 'Relaxing', icon: Sun, color: '#ea580c', bg: '#ffedd5' },
    { label: 'Cultural', icon: Building2, color: '#6d28d9', bg: '#f3e8ff' },
    { label: 'Party', icon: Sparkles, color: '#be185d', bg: '#fce7f3' },
    { label: 'Spiritual', icon: Compass, color: '#0284c7', bg: '#e0f2fe' }
  ];

  const landscapes = [
    { label: 'Mountains', icon: Mountain },
    { label: 'Beaches', icon: Waves },
    { label: 'Desert', icon: Sun },
    { label: 'Forests/Jungles', icon: Leaf },
    { label: 'City/Heritage', icon: Building2 }
  ];

  const activities = [
    { label: 'Sightseeing', icon: Camera },
    { label: 'Trekking', icon: Footprints },
    { label: 'Food & Drinks', icon: Coffee },
    { label: 'Water Sports', icon: Droplets },
    { label: 'Shopping', icon: ShoppingBag },
    { label: 'Wildlife', icon: Binoculars }
  ];

  const durations = [
    { label: 'Quick Getaway', sub: '1-3 Days', icon: Clock },
    { label: 'Standard Trip', sub: '4-7 Days', icon: Calendar },
    { label: 'Long Vacation', sub: '1+ Week', icon: Compass }
  ];

  // --- ENGINE LOGIC ---
  const handleCalculate = () => {
    setStep(7); // Loading Screen
    setIsCalculating(true);

    setTimeout(() => {
      // SMART SCORING ALGORITHM
      let scoredDestinations = destinationDB.map(dest => {
        let score = 0;
        
        // 1. Companion Match (+2)
        if (dest.companions.includes(quizData.companions)) score += 2;
        
        // 2. Vibe Match (+3)
        if (dest.vibes.includes(quizData.vibe)) score += 3; 
        
        // 3. Landscape Match (+3)
        if (dest.landscape === quizData.landscape) score += 3;

        // 4. Activities Match (+1 per activity)
        quizData.activities.forEach(act => {
          if (dest.activities.includes(act)) score += 1.5;
        });

        // 5. Dynamic Tie-breaker
        score += Math.random() * 0.5;

        return { ...dest, matchScore: score };
      });

      // Sort by highest score, take top 3
      scoredDestinations.sort((a, b) => b.matchScore - a.matchScore);
      setRecommendations(scoredDestinations.slice(0, 3));
      
      setIsCalculating(false);
      setStep(8); // Results Screen
    }, 2500); 
  };

  const handleSelectDestination = (dest) => {
    navigate('/plan', { 
      state: { 
        prefillPackage: { 
          title: `${quizData.vibe} trip to ${dest.name}`, 
          location: `${quizData.origin.split(',')[0]} to ${dest.name}`,
          description: `A ${quizData.duration} ${quizData.companions.toLowerCase()} trip focusing on ${quizData.activities.join(', ')}.`
        } 
      } 
    });
  };

  const toggleActivity = (act) => {
    setQuizData(prev => {
      if (prev.activities.includes(act)) return { ...prev, activities: prev.activities.filter(a => a !== act) };
      if (prev.activities.length >= 3) return prev; 
      return { ...prev, activities: [...prev.activities, act] };
    });
  };

  // --- RENDER STEPS ---
  const renderStepContent = () => {
    switch(step) {
      case 0: // Landing
        return (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <Sparkles size={40} color="#0284c7" />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '15px' }}>Find Your Perfect Trip</h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 40px auto' }}>
              Answer 6 quick questions about your travel style, and our smart engine will scan 100+ destinations to find your ultimate getaway.
            </p>
            <button onClick={() => setStep(1)} style={{ padding: '16px 40px', borderRadius: '50px', backgroundColor: '#111827', color: 'white', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Start the Quiz <ArrowRight size={20} />
            </button>
          </div>
        );

      case 1: // Origin
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Where are you starting from?</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>We need to know your origin to suggest realistic routes.</p>
            
            <SearchAutocomplete 
              value={quizData.origin} 
              onChange={(val) => setQuizData({...quizData, origin: val})} 
              placeholder="e.g., New Delhi, India" 
            />

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} disabled={quizData.origin.length < 3} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: quizData.origin.length < 3 ? '#e5e7eb' : '#0284c7', color: quizData.origin.length < 3 ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: quizData.origin.length < 3 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 2: // Companions
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Who are you traveling with?</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>This helps us recommend places with the right amenities.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {companions.map((comp, idx) => {
                const isSel = quizData.companions === comp.label;
                return (
                  <button key={idx} onClick={() => setQuizData({...quizData, companions: comp.label})} style={{ padding: '20px', borderRadius: '20px', border: isSel ? `2px solid #0284c7` : '2px solid transparent', backgroundColor: isSel ? '#e0f2fe' : '#f3f4f6', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', transition: 'all 0.2s', textAlign: 'left' }}>
                    <comp.icon size={28} color={isSel ? '#0284c7' : '#6b7280'} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: isSel ? '#0369a1' : '#1f2937' }}>{comp.label}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{comp.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> Back</button>
              <button onClick={() => setStep(3)} disabled={!quizData.companions} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: !quizData.companions ? '#e5e7eb' : '#0284c7', color: !quizData.companions ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: !quizData.companions ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 3: // Vibe
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>What kind of vibe do you want?</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>Select the primary theme of your trip.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {vibes.map((v, idx) => {
                const isSel = quizData.vibe === v.label;
                return (
                  <button key={idx} onClick={() => setQuizData({...quizData, vibe: v.label})} style={{ padding: '20px', borderRadius: '20px', border: isSel ? `2px solid ${v.color}` : '2px solid transparent', backgroundColor: isSel ? v.bg : '#f3f4f6', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', transition: 'all 0.2s', boxShadow: isSel ? `0 10px 20px ${v.bg}` : 'none' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      <v.icon size={24} color={v.color} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: isSel ? v.color : '#4b5563' }}>{v.label}</span>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> Back</button>
              <button onClick={() => setStep(4)} disabled={!quizData.vibe} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: !quizData.vibe ? '#e5e7eb' : '#0284c7', color: !quizData.vibe ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: !quizData.vibe ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 4: // Landscape
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Choose your landscape</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>What environment do you want to wake up to?</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
              {landscapes.map((l, idx) => {
                const isSel = quizData.landscape === l.label;
                return (
                  <button key={idx} onClick={() => setQuizData({...quizData, landscape: l.label})} style={{ padding: '15px', borderRadius: '16px', border: isSel ? `2px solid #16a34a` : '2px solid #e5e7eb', backgroundColor: isSel ? '#f0fdf4' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}>
                    <l.icon size={22} color={isSel ? '#16a34a' : '#9ca3af'} />
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: isSel ? '#15803d' : '#4b5563' }}>{l.label}</span>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> Back</button>
              <button onClick={() => setStep(5)} disabled={!quizData.landscape} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: !quizData.landscape ? '#e5e7eb' : '#0284c7', color: !quizData.landscape ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: !quizData.landscape ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 5: // Activities
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>What do you want to do?</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>Select up to 3 activities you enjoy.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {activities.map((act, idx) => {
                const isSel = quizData.activities.includes(act.label);
                return (
                  <button key={idx} onClick={() => toggleActivity(act.label)} style={{ padding: '15px 25px', borderRadius: '50px', border: isSel ? `2px solid #0284c7` : '2px solid #e5e7eb', backgroundColor: isSel ? '#e0f2fe' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }}>
                    <act.icon size={20} color={isSel ? '#0284c7' : '#9ca3af'} />
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: isSel ? '#0369a1' : '#4b5563' }}>{act.label}</span>
                    {isSel && <CheckCircle2 size={16} color="#0284c7" style={{ marginLeft: '5px' }}/>}
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(4)} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> Back</button>
              <button onClick={() => setStep(6)} disabled={quizData.activities.length === 0} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: quizData.activities.length === 0 ? '#e5e7eb' : '#0284c7', color: quizData.activities.length === 0 ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: quizData.activities.length === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 6: // Duration
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>How much time do you have?</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px' }}>This helps us finalize the itinerary density.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {durations.map((dur, idx) => {
                const isSel = quizData.duration === dur.label;
                return (
                  <button key={idx} onClick={() => setQuizData({...quizData, duration: dur.label})} style={{ padding: '20px', borderRadius: '20px', border: isSel ? `2px solid #16a34a` : '2px solid transparent', backgroundColor: isSel ? '#f0fdf4' : '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.2s', textAlign: 'left' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: isSel ? '#16a34a' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <dur.icon size={24} color={isSel ? 'white' : '#6b7280'} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: isSel ? '#15803d' : '#111827', margin: '0 0 5px 0' }}>{dur.label}</h4>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{dur.sub}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(5)} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><ChevronLeft size={18}/> Back</button>
              
              <button onClick={handleCalculate} disabled={!quizData.duration} style={{ padding: '14px 30px', borderRadius: '12px', backgroundColor: !quizData.duration ? '#e5e7eb' : '#111827', color: !quizData.duration ? '#9ca3af' : 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: !quizData.duration ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Find My Destination <Sparkles size={18} />
              </button>
            </div>
          </div>
        );

      case 7: // Loading Screen
        return (
          <div style={{ textAlign: 'center', padding: '60px 0', animation: 'fadeIn 0.5s ease-out' }}>
            <Loader2 size={60} color="#0284c7" className="animate-spin" style={{ margin: '0 auto 30px auto' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Analyzing destinations...</h2>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>Matching your {quizData.vibe} vibe and {quizData.landscape} preference.</p>
          </div>
        );

      case 8: // Results Screen
        return (
          <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ecfdf5', color: '#15803d', padding: '8px 16px', borderRadius: '50px', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>
                <CheckCircle2 size={18} /> Matches Found
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', marginBottom: '10px' }}>Your Perfect Getaways</h2>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>Based on your origin in {quizData.origin.split(',')[0]}, here are the best options for your {quizData.companions.toLowerCase()} trip.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {recommendations.map((dest, idx) => (
                <div key={dest.id} style={{ display: 'flex', backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb', flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
                  
                  {/* Image Side */}
                  <div style={{ position: 'relative', width: window.innerWidth < 600 ? '100%' : '280px', height: window.innerWidth < 600 ? '200px' : 'auto', flexShrink: 0 }}>
                    <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="#38bdf8" /> {dest.state}
                    </div>
                    {/* Top Match Badge */}
                    {idx === 0 && (
                      <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#f59e0b', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 10px rgba(245,158,11,0.4)' }}>
                        <Sparkles size={14} /> #1 Match
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '4px 10px', borderRadius: '6px' }}>{dest.landscape}</span>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6d28d9', backgroundColor: '#f3e8ff', padding: '4px 10px', borderRadius: '6px' }}>{quizData.vibe}</span>
                      {dest.activities.includes(quizData.activities[0]) && (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#15803d', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>Great for {quizData.activities[0]}</span>
                      )}
                    </div>
                    
                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: '0 0 10px 0' }}>{dest.name}</h3>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 20px 0' }}>{dest.desc}</p>
                    
                    <button onClick={() => handleSelectDestination(dest)} style={{ alignSelf: 'flex-start', padding: '12px 24px', borderRadius: '10px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#374151'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#111827'}>
                      Select & Plan Itinerary <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <button onClick={() => { setStep(0); setQuizData({ origin:'', companions:'', vibe:'', landscape:'', activities:[], duration:'' }); }} style={{ background: 'none', border: 'none', color: '#6b7280', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                Start Over
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  // Calculate progress bar width (6 steps total)
  const progressPercentage = step === 0 ? 0 : step >= 7 ? 100 : ((step) / 6) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', paddingTop: '100px' }}>
      
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Dynamic Progress Bar (Hidden on landing and results) */}
        {step > 0 && step < 7 && (
          <div style={{ marginBottom: '40px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', fontWeight: 'bold', color: '#6b7280' }}>
              <span>Step {step} of 6</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: '#0284c7', transition: 'width 0.4s ease-out' }} />
            </div>
          </div>
        )}

        {/* Main Card Container */}
        <div style={{ backgroundColor: 'white', borderRadius: '30px', padding: step === 0 ? '60px 40px' : '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
          
          {/* Decorative background element */}
          {step < 7 && (
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', backgroundColor: '#f0f9ff', borderRadius: '50%', zIndex: 0, opacity: 0.6 }} />
          )}

          {/* Content Wrapper */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {renderStepContent()}
          </div>
        </div>

      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default TripDiscovererPage;