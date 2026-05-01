import React, { useState, useEffect } from 'react';
import { Plane, Train, Bus, Car, Bike, MapPin, Calendar, Users, ArrowRight, ShieldCheck, Clock, Fuel, Map, ExternalLink, ArrowUpDown, Filter, ArrowRightLeft, Loader2 } from 'lucide-react';

// --- OFFICIAL LOGOS & LINKS ---
const AIRLINE_DATA = {
  'IndiGo': { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/IndiGo_Airlines_logo.svg', link: 'https://www.goindigo.in/', code: '6E' },
  'Air India': { logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Air_India_Logo.svg', link: 'https://www.airindia.com/', code: 'AI' },
  'Vistara': { logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Vistara_Logo.svg', link: 'https://www.airvistara.com/', code: 'UK' },
  'Akasa Air': { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Akasa_Air_logo.svg', link: 'https://www.akasaair.com/', code: 'QP' },
  'SpiceJet': { logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/SpiceJet_Logo.svg', link: 'https://www.spicejet.com/', code: 'SG' },
  'Air India Express': { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Air_India_Express_Logo.svg', link: 'https://www.airindiaexpress.com/', code: 'IX' }
};

const TRAIN_DATA = {
  'IRCTC': { logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/IRCTC_Logo.svg', link: 'https://www.irctc.co.in/' }
};

// Helper: Format minutes into "2h 15m"
const formatDuration = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

// Helper: Convert "06:30 PM" to minutes for sorting
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (hours === 12) hours = 0;
  if (modifier === 'PM') hours += 12;
  return hours * 60 + minutes;
};

// Helper: Format minutes back to "06:30 PM"
const formatTime = (totalMinutes) => {
  let h = Math.floor(totalMinutes / 60);
  let m = totalMinutes % 60;
  let ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; 
  m = m < 10 ? '0' + m : m;
  return `${h}:${m} ${ampm}`;
};

// --- DYNAMIC DATA GENERATOR ---
// Generates a realistic schedule of flights between any two cities
const generateDynamicFlights = (from, to, passengers) => {
  const airlines = Object.keys(AIRLINE_DATA);
  const flights = [];
  const numFlights = Math.floor(Math.random() * 15) + 15; // Generate 15-30 flights

  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const isDirect = Math.random() > 0.3; // 70% chance of direct flight
    
    const departureMinutes = Math.floor(Math.random() * 1440); // Random time in 24h
    const baseDuration = Math.floor(Math.random() * 60) + 120; // 2h to 3h
    const duration = isDirect ? baseDuration : baseDuration + Math.floor(Math.random() * 180) + 60; // Add 1-3 hours for layover
    
    let arrivalMinutes = departureMinutes + duration;
    let nextDay = false;
    if (arrivalMinutes >= 1440) {
      arrivalMinutes -= 1440;
      nextDay = true;
    }

    const basePrice = isDirect ? 4000 + Math.floor(Math.random() * 4000) : 3500 + Math.floor(Math.random() * 3000);
    
    flights.push({
      id: `FL-${Date.now()}-${i}`,
      provider: airline,
      flightNumber: `${AIRLINE_DATA[airline].code}-${Math.floor(Math.random() * 900) + 100}`,
      fromCity: from.substring(0, 3).toUpperCase(),
      toCity: to.substring(0, 3).toUpperCase(),
      fromTime: formatTime(departureMinutes),
      toTime: formatTime(arrivalMinutes) + (nextDay ? ' (+1d)' : ''),
      departureMinutes: departureMinutes, // For filtering
      durationMinutes: duration,
      price: basePrice * passengers,
      isDirect: isDirect,
      link: AIRLINE_DATA[airline].link
    });
  }
  return flights.sort((a, b) => a.departureMinutes - b.departureMinutes);
};

const generateDynamicTrains = (from, to, passengers) => {
  const trainTypes = ['Vande Bharat Exp', 'Shatabdi Exp', 'Rajdhani Exp', 'Duronto Exp', 'Garib Rath', 'Superfast Exp'];
  const trains = [];
  const numTrains = Math.floor(Math.random() * 8) + 5; 

  for (let i = 0; i < numTrains; i++) {
    const type = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    const departureMinutes = Math.floor(Math.random() * 1440); 
    const duration = Math.floor(Math.random() * 600) + 300; // 5h to 15h
    
    let arrivalMinutes = departureMinutes + duration;
    let nextDay = false;
    if (arrivalMinutes >= 1440) { arrivalMinutes -= 1440; nextDay = true; }

    trains.push({
      id: `TR-${Date.now()}-${i}`,
      provider: `${type} (${Math.floor(Math.random() * 90000) + 10000})`,
      fromCity: from.substring(0, 3).toUpperCase(),
      toCity: to.substring(0, 3).toUpperCase(),
      fromTime: formatTime(departureMinutes),
      toTime: formatTime(arrivalMinutes) + (nextDay ? ' (+1d)' : ''),
      departureMinutes: departureMinutes,
      durationMinutes: duration,
      price: (Math.floor(Math.random() * 2000) + 800) * passengers,
      isDirect: true,
      link: TRAIN_DATA['IRCTC'].link
    });
  }
  return trains.sort((a, b) => a.departureMinutes - b.departureMinutes);
};


const VehicleOptions = () => {
  const [activeTab, setActiveTab] = useState('plane');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- SEARCH FORM STATE ---
  const [searchParams, setSearchParams] = useState({
    from: '', to: '', date: '', passengers: 1
  });

  // --- RESULTS & FILTER STATE ---
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [rawResults, setRawResults] = useState([]);
  const [sortType, setSortType] = useState('price'); // 'price', 'duration', 'departure'
  
  // Filters
  const [filterStops, setFilterStops] = useState('all'); // 'all', 'direct', '1stop'
  const [filterTime, setFilterTime] = useState('all'); // 'all', 'morning', 'afternoon', 'evening'
  const [filterAirlines, setFilterAirlines] = useState([]); // Array of airline names

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: 'plane', label: 'Flights', icon: Plane },
    { id: 'train', label: 'Trains', icon: Train },
    { id: 'bus', label: 'Buses', icon: Bus },
    { id: 'car', label: 'Cars & Taxis', icon: Car },
    { id: 'bike', label: 'Bike Rentals', icon: Bike }
  ];

  // Handle Search Execution
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchParams.from || !searchParams.to) {
      alert("Please enter both origin and destination!");
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API Network Delay
    setTimeout(() => {
      let results = [];
      if (activeTab === 'plane') {
        results = generateDynamicFlights(searchParams.from, searchParams.to, searchParams.passengers);
      } else if (activeTab === 'train') {
        results = generateDynamicTrains(searchParams.from, searchParams.to, searchParams.passengers);
      }
      setRawResults(results);
      // Reset filters on new search
      setFilterStops('all'); setFilterTime('all'); setFilterAirlines([]); setSortType('price');
      setIsSearching(false);
    }, 1200);
  };

  // Modify Search (Go back)
  const resetSearch = () => {
    setHasSearched(false);
    setRawResults([]);
  };

  // Toggle Airline Filter
  const handleAirlineFilter = (airline) => {
    setFilterAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  // Apply Filters & Sorting
  const getProcessedResults = () => {
    let filtered = [...rawResults];

    // 1. Filter Stops
    if (filterStops === 'direct') filtered = filtered.filter(r => r.isDirect);
    if (filterStops === '1stop') filtered = filtered.filter(r => !r.isDirect);

    // 2. Filter Time
    if (filterTime === 'morning') filtered = filtered.filter(r => r.departureMinutes >= 360 && r.departureMinutes < 720); // 6 AM - 12 PM
    if (filterTime === 'afternoon') filtered = filtered.filter(r => r.departureMinutes >= 720 && r.departureMinutes < 1080); // 12 PM - 6 PM
    if (filterTime === 'evening') filtered = filtered.filter(r => r.departureMinutes >= 1080 || r.departureMinutes < 360); // After 6 PM

    // 3. Filter Airlines
    if (filterAirlines.length > 0) filtered = filtered.filter(r => filterAirlines.includes(r.provider));

    // 4. Sort
    return filtered.sort((a, b) => {
      if (sortType === 'price') return a.price - b.price;
      if (sortType === 'duration') return a.durationMinutes - b.durationMinutes;
      if (sortType === 'departure') return a.departureMinutes - b.departureMinutes;
      return 0;
    });
  };

  const processedResults = getProcessedResults();
  
  // Extract unique airlines for the filter sidebar
  const availableAirlines = [...new Set(rawResults.map(r => r.provider))];

  // --- REUSABLE SEARCH COMPONENT ---
  const renderSearchForm = () => (
    <form onSubmit={handleSearch} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', marginTop: '20px', position: 'relative', zIndex: 10 }}>
      <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
        <MapPin size={18} color="#6b7280" />
        <input type="text" required placeholder="From (e.g. Delhi)" value={searchParams.from} onChange={(e) => setSearchParams({...searchParams, from: e.target.value})} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
      </div>
      
      <div style={{ padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '50%', color: '#9ca3af', display: 'flex' }}><ArrowRightLeft size={16}/></div>

      <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
        <MapPin size={18} color="#0284c7" />
        <input type="text" required placeholder="To (e.g. Mumbai)" value={searchParams.to} onChange={(e) => setSearchParams({...searchParams, to: e.target.value})} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
      </div>
      
      <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
        <Calendar size={18} color="#6b7280" />
        <input type="date" required value={searchParams.date} onChange={(e) => setSearchParams({...searchParams, date: e.target.value})} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px', color: '#4b5563', fontWeight: 'bold' }} />
      </div>

      <div style={{ flex: '0 1 120px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
        <Users size={18} color="#6b7280" />
        <select value={searchParams.passengers} onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
          {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} Pax</option>)}
        </select>
      </div>

      <button type="submit" style={{ padding: '14px 30px', backgroundColor: activeTab === 'plane' ? '#0284c7' : '#ea580c', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', flex: '1 1 150px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
        Search <ArrowRight size={16} />
      </button>
    </form>
  );

  // --- REUSABLE RESULT CARD ---
  const renderResultCard = (item) => (
    <div key={item.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', marginBottom: '15px', gap: '20px', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
      
      {/* Provider Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1 1 180px' }}>
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
          {activeTab === 'plane' ? (
            <img src={AIRLINE_DATA[item.provider]?.logo} alt={item.provider} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          ) : (
            <img src={TRAIN_DATA['IRCTC'].logo} alt="IRCTC" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          )}
        </div>
        <div>
          <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#111827', margin: 0 }}>{item.provider}</h4>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.flightNumber || 'Indian Railways'}</span>
        </div>
      </div>

      {/* Timings & Routing */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '2 1 300px' }}>
        <div style={{ textAlign: 'right', flex: 1 }}>
          <div style={{ fontWeight: '900', fontSize: '20px', color: '#111827' }}>{item.fromTime}</div>
          <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 'bold' }}>{item.fromCity || searchParams.from}</div>
        </div>
        
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}>{formatDuration(item.durationMinutes)}</span>
          <div style={{ width: '100%', height: '2px', backgroundColor: item.isDirect ? '#16a34a' : '#d97706', position: 'relative', borderRadius: '2px' }}>
            <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.isDirect ? '#16a34a' : '#d97706', border: '2px solid white' }}></div>
          </div>
          <span style={{ fontSize: '11px', color: item.isDirect ? '#16a34a' : '#d97706', marginTop: '4px', fontWeight: 'bold' }}>{item.isDirect ? 'Non-stop' : '1 Stop'}</span>
        </div>
        
        <div style={{ textAlign: 'left', flex: 1 }}>
          <div style={{ fontWeight: '900', fontSize: '20px', color: '#111827' }}>{item.toTime.split(' ')[0]} <span style={{fontSize:'12px', color:'#ef4444'}}>{item.toTime.includes('+1d') ? '+1d' : ''}</span></div>
          <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 'bold' }}>{item.toCity || searchParams.to}</div>
        </div>
      </div>

      {/* Price & Booking Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 180px', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#111827' }}>₹{item.price.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Total for {searchParams.passengers} Pax</div>
        </div>
        <button onClick={() => window.open(item.link, '_blank')} style={{ padding: '12px 18px', backgroundColor: activeTab === 'plane' ? '#111827' : '#ea580c', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#374151'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=activeTab === 'plane' ? '#111827' : '#ea580c'}>
          Book <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', paddingTop: '100px' }}>
      
      {/* DYNAMIC TOP BANNER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '30px' }}>
        {!hasSearched ? (
           <div style={{ textAlign: 'center', marginBottom: '40px', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
             <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#111827', marginBottom: '15px' }}>How do you want to <span style={{ color: '#16a34a' }}>travel?</span></h1>
             <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>Compare, filter, and sort your options below. We'll send you directly to the official provider to securely complete your booking.</p>
           </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111827', color: 'white', padding: '20px 30px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {searchParams.from} <ArrowRight size={20} color="#4ade80"/> {searchParams.to}
              </h2>
              <div style={{ display: 'flex', gap: '15px', marginTop: '8px', fontSize: '14px', color: '#9ca3af', fontWeight: '500' }}>
                <span><Calendar size={14} style={{ display:'inline', marginRight:'4px'}}/> {searchParams.date || 'Open Date'}</span>
                <span><Users size={14} style={{ display:'inline', marginRight:'4px'}}/> {searchParams.passengers} Traveler{searchParams.passengers > 1 ? 's' : ''}</span>
              </div>
            </div>
            <button onClick={resetSearch} style={{ padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.2)'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.1)'}>
              Modify Search
            </button>
          </div>
        )}
      </div>

      {/* TABS (Only show if not currently viewing results to keep UI clean, or show always?) */}
      {!hasSearched && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', overflowX: 'auto', backgroundColor: 'white', padding: '8px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', gap: '8px' }} className="hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: '1', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px',
                  transition: 'all 0.3s ease', backgroundColor: activeTab === tab.id ? '#16a34a' : 'transparent', color: activeTab === tab.id ? 'white' : '#4b5563'
                }}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* --- FLIGHTS & TRAINS AGGREGATOR VIEW --- */}
        {(activeTab === 'plane' || activeTab === 'train') && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            
            {!hasSearched ? (
              // INITIAL SEARCH VIEW
              <>
                <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '350px', marginBottom: '-50px' }}>
                  <img src={activeTab === 'plane' ? "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80" : "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=1200&q=80"} alt="Travel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,24,39,0.9), rgba(17,24,39,0.2))', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>{activeTab === 'plane' ? 'Take to the Skies' : 'The Great Indian Railway'}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', maxWidth: '400px' }}>Compare options and book directly on official platforms for the best price.</p>
                  </div>
                </div>
                {renderSearchForm()}
              </>
            ) : (
              // SEARCH RESULTS VIEW
              isSearching ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
                  <Loader2 className="animate-spin" size={60} color={activeTab === 'plane' ? '#0284c7' : '#ea580c'} />
                  <h3 style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>Searching the best {activeTab === 'plane' ? 'flights' : 'trains'}...</h3>
                  <p style={{ color: '#6b7280' }}>Connecting directly to official schedules.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 900 ? '1fr' : '280px 1fr', gap: '30px' }}>
                  
                  {/* SIDEBAR FILTERS */}
                  <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: 'fit-content', position: 'sticky', top: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                      <Filter size={20} color="#111827"/> <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Filters</h3>
                    </div>

                    {/* Filter: Stops */}
                    <div style={{ marginBottom: '25px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Stops</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {['all', 'direct', '1stop'].map(type => (
                          <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4b5563', cursor: 'pointer' }}>
                            <input type="radio" name="stops" checked={filterStops === type} onChange={() => setFilterStops(type)} style={{ accentColor: '#16a34a', width: '16px', height: '16px' }} />
                            {type === 'all' ? 'All Options' : type === 'direct' ? 'Non-Stop Only' : '1 Stop'}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filter: Departure Time */}
                    <div style={{ marginBottom: '25px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Departure Time</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[{id: 'all', l: 'Any'}, {id: 'morning', l: '6AM - 12PM'}, {id: 'afternoon', l: '12PM - 6PM'}, {id: 'evening', l: 'After 6PM'}].map(t => (
                          <button key={t.id} onClick={() => setFilterTime(t.id)} style={{ padding: '8px', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', border: filterTime === t.id ? '2px solid #16a34a' : '1px solid #e5e7eb', backgroundColor: filterTime === t.id ? '#f0fdf4' : 'white', color: filterTime === t.id ? '#166534' : '#6b7280', cursor: 'pointer' }}>{t.l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Filter: Airlines (Only for Flights) */}
                    {activeTab === 'plane' && availableAirlines.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>Airlines</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {availableAirlines.map(airline => (
                            <label key={airline} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4b5563', cursor: 'pointer' }}>
                              <input type="checkbox" checked={filterAirlines.includes(airline)} onChange={() => handleAirlineFilter(airline)} style={{ accentColor: '#16a34a', width: '16px', height: '16px' }} />
                              {airline}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RESULTS LIST */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Showing {processedResults.length} Results</h3>
                      
                      {/* Sorting Dropdown */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', padding: '8px 16px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                        <ArrowUpDown size={16} color="#6b7280"/>
                        <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: 'bold' }}>Sort:</span>
                        <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#111827', fontWeight: '600', cursor: 'pointer' }}>
                          <option value="price">Cheapest First</option>
                          <option value="duration">Fastest First</option>
                          <option value="departure">Earliest Departure</option>
                        </select>
                      </div>
                    </div>

                    {/* Render Results */}
                    {processedResults.length > 0 ? (
                      processedResults.map(item => renderResultCard(item))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '20px', border: '1px dashed #e5e7eb' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>No options match your filters.</h3>
                        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Try clearing some filters on the left to see more options.</p>
                        <button onClick={() => {setFilterStops('all'); setFilterTime('all'); setFilterAirlines([]);}} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#111827', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Clear All Filters</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* --- CARS & TAXIS (SPLIT VIEW) --- */}
        {activeTab === 'car' && !hasSearched && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {/* Option 1: Taxi */}
              <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80" alt="Chauffeur Taxi" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', alignSelf: 'flex-start' }}>Relax & Enjoy</div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Book a Taxi / Cab</h2>
                  <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>Hire a verified local driver for airport transfers, city tours, or outstation trips.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', color: '#374151', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#16a34a"/> Verified, professional drivers</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Map size={16} color="#16a34a"/> Local route expertise</li>
                  </ul>
                  <button style={{ marginTop: 'auto', width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Search Cabs</button>
                </div>
              </div>

              {/* Option 2: Self Drive */}
              <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80" alt="Self Drive Car" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'inline-block', backgroundColor: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', alignSelf: 'flex-start' }}>Ultimate Freedom</div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Self-Drive Rentals</h2>
                  <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>Take the wheel and travel at your own pace. Perfect for road trips.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', color: '#374151', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="#d97706"/> Flexible pick-up & drop-off</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} color="#d97706"/> Total privacy for your group</li>
                  </ul>
                  <button style={{ marginTop: 'auto', width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>View Rental Cars</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BIKES --- */}
        {activeTab === 'bike' && !hasSearched && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '30px', alignItems: 'center', backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>Two-Wheeler Adventures</div>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>Rent a Bike or Scooter</h2>
                <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>Perfect for exploring the narrow lanes of Goa, navigating city traffic, or embarking on an epic Himalayan road trip to Ladakh.</p>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, backgroundColor: '#f9fafb', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <h4 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>Scooters</h4>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>Best for beach hopping.</p>
                  </div>
                  <div style={{ flex: 1, backgroundColor: '#f9fafb', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <h4 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>Cruisers</h4>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>Best for long highways.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
                    <MapPin size={18} color="#16a34a" /><input type="text" placeholder="City for rental?" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px' }} />
                  </div>
                  <button style={{ padding: '14px 30px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Find Bikes</button>
                </div>
              </div>
              <div style={{ height: '100%', minHeight: '300px' }}>
                <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" alt="Bike Rental" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default VehicleOptions;