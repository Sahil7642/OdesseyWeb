import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Plus, Trash2, ArrowRight, Clock, Camera, Leaf, Coffee, Compass, GripVertical, Map as MapIcon, CheckCircle2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 👇 READS SECURELY FROM YOUR .env FILE
// Note: If using Vite, change this to: import.meta.env.VITE_OLA_MAPS_API_KEY
const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY;

const RoutePlannerPage = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [itineraryStops, setItineraryStops] = useState([]);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [routeCoords, setRouteCoords] = useState({ start: null, end: null });
  
  // Custom Stop State
  const [customStopName, setCustomStopName] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  // --- MAP & DRAG/DROP REFS ---
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const olaMapsInstance = useRef(null);
  const markersRef = useRef([]); 
  const dragItem = useRef();
  const dragOverItem = useRef();

  // --- DATABASE: MAJOR CITIES ---
  const cityCoords = {
    "delhi": { lat: 28.6139, lng: 77.2090 },
    "jaipur": { lat: 26.9124, lng: 75.7873 },
    "mumbai": { lat: 19.0760, lng: 72.8777 },
    "bangalore": { lat: 12.9716, lng: 77.5946 },
    "chennai": { lat: 13.0827, lng: 80.2707 },
    "kolkata": { lat: 22.5726, lng: 88.3639 },
    "ahmedabad": { lat: 23.0225, lng: 72.5714 },
    "pune": { lat: 18.5204, lng: 73.8567 },
    "agra": { lat: 27.1767, lng: 78.0081 },
    "manali": { lat: 32.2396, lng: 77.1887 },
    "goa": { lat: 15.2993, lng: 74.1240 },
    "kochi": { lat: 9.9312, lng: 76.2673 },
    "udaipur": { lat: 24.5854, lng: 73.7125 },
    "chandigarh": { lat: 30.7333, lng: 76.7794 }
  };

  // --- EXPANDED DATABASE: REAL INDIAN PLACES ---
  const placesDatabase = [
    { id: 1, name: "Neemrana Fort", lat: 27.99, lng: 76.38, type: "Heritage", time: "2 Hours", icon: Camera, img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80", desc: "15th-century heritage palace perfect for a royal lunch stop." },
    { id: 2, name: "Amrik Sukhdev Dhaba", lat: 29.03, lng: 77.07, type: "Food", time: "1 Hour", icon: Coffee, img: "https://images.unsplash.com/photo-1605814545086-455b8beffca2?auto=format&fit=crop&w=400&q=80", desc: "Legendary highway stop famous for hot tandoori parathas." },
    { id: 3, name: "Sanchi Stupa", lat: 23.48, lng: 77.73, type: "Heritage", time: "2 Hours", icon: Compass, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", desc: "Ancient Buddhist complex commissioned by Emperor Ashoka." },
    { id: 4, name: "Lonavala Viewpoint", lat: 18.74, lng: 73.40, type: "Nature", time: "1.5 Hours", icon: Leaf, img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80", desc: "Misty valleys and cascading waterfalls along the expressway." },
    { id: 5, name: "Athirappilly Falls", lat: 10.28, lng: 76.56, type: "Nature", time: "2.5 Hours", icon: Leaf, img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80", desc: "The 'Niagara of India'. A spectacular 80-foot waterfall." },
    { id: 6, name: "Ajanta Caves", lat: 20.55, lng: 75.70, type: "Heritage", time: "3 Hours", icon: Camera, img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80", desc: "Ancient rock-cut Buddhist cave monuments." },
    { id: 7, name: "Mysore Palace", lat: 12.30, lng: 76.65, type: "Heritage", time: "2 Hours", icon: Camera, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", desc: "A magnificent royal palace known for its intricate architecture." },
    { id: 8, name: "Karnala Bird Sanctuary", lat: 18.88, lng: 73.11, type: "Wildlife", time: "2 Hours", icon: Leaf, img: "https://images.unsplash.com/photo-1550155416-8316dfa99f18?auto=format&fit=crop&w=400&q=80", desc: "Home to over 150 species of birds. A peaceful shaded trek." },
    { id: 9, name: "Kumbhalgarh Fort", lat: 25.14, lng: 73.58, type: "Heritage", time: "2.5 Hours", icon: Compass, img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80", desc: "Features the second longest continuous wall in the world." },
    { id: 10, name: "Bhimbetka Rock Shelters", lat: 22.93, lng: 77.61, type: "Culture", time: "1.5 Hours", icon: Camera, img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80", desc: "Prehistoric rock paintings dating back 30,000 years." },
    { id: 11, name: "Hampi Ruins", lat: 15.33, lng: 76.46, type: "Heritage", time: "4 Hours", icon: Compass, img: "https://images.unsplash.com/photo-1600676435306-03fcb59ba5b1?auto=format&fit=crop&w=400&q=80", desc: "Explore the captivating ruins of the Vijayanagara Empire." },
    { id: 12, name: "Taj Mahal Viewpoint", lat: 27.17, lng: 78.04, type: "Heritage", time: "2 Hours", icon: Camera, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", desc: "Iconic monument of love. A must-stop on the Northern circuit." }
  ];

  // --- INITIALIZE OLA MAPS ---
  useEffect(() => {
    if (!isSearching) return;

    if (!OLA_MAPS_API_KEY) {
      console.error("Missing API Key: Please ensure REACT_APP_OLA_MAPS_API_KEY is set in your .env file.");
    }

    const loadOlaMap = () => {
      if (!mapRef.current || mapInstance.current) return;
      
      try {
        const olaMaps = new window.OlaMapsWebSDK.OlaMaps({ apiKey: OLA_MAPS_API_KEY || '' });
        olaMapsInstance.current = olaMaps;
        
        const map = olaMaps.init({
          style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          container: mapRef.current,
          center: [78.9629, 20.5937], 
          zoom: 4
        });
        
        mapInstance.current = map;

        map.on('load', () => {
          updateMapEntities();
        });

      } catch (error) {
        console.error("Error loading Ola Maps:", error);
      }
    };

    if (!window.OlaMapsWebSDK) {
      const link = document.createElement('link');
      link.href = "https://olamaps.github.io/olamaps-web-sdk/ola-maps-web-sdk.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = "https://olamaps.github.io/olamaps-web-sdk/ola-maps-web-sdk.umd.js";
      script.async = true;
      script.onload = loadOlaMap;
      document.head.appendChild(script);
    } else {
      loadOlaMap();
    }
  }, [isSearching]);

  // --- UPDATE MAP PINS & ROUTE ---
  useEffect(() => {
    if (mapInstance.current && mapInstance.current.isStyleLoaded()) {
      updateMapEntities();
    }
  }, [routeCoords, itineraryStops]);

  const updateMapEntities = () => {
    const map = mapInstance.current;
    const olaMaps = olaMapsInstance.current;
    if (!map || !olaMaps || !routeCoords.start || !routeCoords.end) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const waypoints = []; 

    const createMarkerElement = (name, color) => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
          <div style="width: 14px; height: 14px; background-color: ${color}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 2;"></div>
          <div style="position: absolute; left: 20px; white-space: nowrap; font-family: system-ui; font-size: 13px; font-weight: 700; color: #111827; text-shadow: 1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white; z-index: 1;">
            ${name}
          </div>
        </div>
      `;
      return el;
    };

    const startCoordArr = [routeCoords.start.lng, routeCoords.start.lat];
    waypoints.push(startCoordArr);
    const startMarker = olaMaps.addMarker({ element: createMarkerElement(origin.toUpperCase(), '#111827') })
      .setLngLat(startCoordArr)
      .addTo(map);
    markersRef.current.push(startMarker);

    itineraryStops.forEach((stop) => {
      const stopCoordArr = [stop.lng, stop.lat];
      waypoints.push(stopCoordArr);
      const stopMarker = olaMaps.addMarker({ element: createMarkerElement(stop.name, '#16a34a') })
        .setLngLat(stopCoordArr)
        .addTo(map);
      markersRef.current.push(stopMarker);
    });

    const endCoordArr = [routeCoords.end.lng, routeCoords.end.lat];
    waypoints.push(endCoordArr);
    const endMarker = olaMaps.addMarker({ element: createMarkerElement(destination.toUpperCase(), '#ea580c') })
      .setLngLat(endCoordArr)
      .addTo(map);
    markersRef.current.push(endMarker);

    if (map.getSource('route')) {
      map.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: waypoints }
      });
    } else {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: waypoints }
        }
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#16a34a',
          'line-width': 4,
          'line-dasharray': [2, 2] 
        }
      });
    }

    if (window.OlaMapsWebSDK) {
      const bounds = waypoints.reduce((b, coord) => {
        return b.extend(coord);
      }, new window.OlaMapsWebSDK.LngLatBounds(waypoints[0], waypoints[0]));
      
      map.fitBounds(bounds, { padding: 80, maxZoom: 12 });
    }
  };


  // --- DYNAMIC SEARCH LOGIC ---
  const handleSearchRoutes = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;

    const startKey = origin.toLowerCase().trim();
    const endKey = destination.toLowerCase().trim();

    const startCoord = cityCoords[startKey] || { lat: 28.61, lng: 77.20 }; 
    const endCoord = cityCoords[endKey] || { lat: 19.07, lng: 72.87 };
    setRouteCoords({ start: startCoord, end: endCoord });

    const midLat = (startCoord.lat + endCoord.lat) / 2;
    const midLng = (startCoord.lng + endCoord.lng) / 2;

    const sortedPlaces = [...placesDatabase].sort((a, b) => {
      const distA = Math.hypot(a.lat - midLat, a.lng - midLng);
      const distB = Math.hypot(b.lat - midLat, b.lng - midLng);
      return distA - distB;
    });

    setSuggestedPlaces(sortedPlaces.slice(0, 5));
    setItineraryStops([]); 
    setIsSearching(true);
  };

  const addStop = (stop) => {
    if (!itineraryStops.find(s => s.id === stop.id)) {
      setItineraryStops([...itineraryStops, stop]);
    }
  };

  const removeStop = (id) => {
    setItineraryStops(itineraryStops.filter(s => s.id !== id));
  };

  // --- OLA MAPS EXACT COORDINATE GEOCODING ---
  const handleAddCustomStop = async (e) => {
    e.preventDefault();
    if (!customStopName.trim()) return;

    if (!OLA_MAPS_API_KEY) {
      alert("Error: Missing OLA_MAPS_API_KEY. Please add it to your .env file.");
      return;
    }

    setIsFindingLocation(true);

    try {
      const response = await fetch(`https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(customStopName + ", India")}&api_key=${OLA_MAPS_API_KEY}`);
      const data = await response.json();

      if (data?.geocodingResults && data.geocodingResults.length > 0) {
        const exactLocation = data.geocodingResults[0];
        const exactLat = exactLocation.geometry.location.lat;
        const exactLng = exactLocation.geometry.location.lng;
        const officialName = exactLocation.name || customStopName; 

        const customStop = {
          id: Date.now(), 
          name: officialName, 
          lat: exactLat,    
          lng: exactLng,     
          type: "Custom Stop",
          time: "Flexible",
          icon: MapPin,
          desc: "A personalized location added via search.",
          img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80"
        };

        setItineraryStops([...itineraryStops, customStop]);
        setCustomStopName(''); 
      } else {
        alert(`We couldn't find exact coordinates for "${customStopName}". Try adding a city name (e.g. "Taj Mahal, Agra").`);
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      alert("There was an error connecting to the map servers.");
    } finally {
      setIsFindingLocation(false);
    }
  };

  // --- DRAG AND DROP NATIVE HTML5 ---
  const handleDragStart = (e, position) => {
    dragItem.current = position;
    e.target.style.opacity = 0.5;
  };
  const handleDragEnter = (e, position) => {
    e.preventDefault();
    dragOverItem.current = position;
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const copyListItems = [...itineraryStops];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    setItineraryStops(copyListItems);
    dragItem.current = null;
    dragOverItem.current = null;
    e.target.style.opacity = 1;
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = 1;
  };

  const handleFinalize = () => {
    navigate('/plan', { 
      state: { 
        prefillPackage: { 
          title: `Custom Drive: ${origin} to ${destination}`,
          location: `${origin} to ${destination}` 
        } 
      } 
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO & SEARCH SECTION */}
      <div style={{ position: 'relative', height: isSearching ? '25vh' : '50vh', minHeight: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'all 0.5s ease-in-out' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.95))' }} />
        
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '900px', padding: '0 20px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: isSearching ? '32px' : '48px', fontWeight: '800', color: 'white', marginBottom: '15px', textAlign: 'center', transition: 'all 0.3s' }}>
            Interactive Route Planner
          </h1>
          {!isSearching && (
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '40px' }}>
              Enter your starting point and destination. We'll plot the route and dynamically find hidden gems along the way.
            </p>
          )}

          <form onSubmit={handleSearchRoutes} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', marginTop: isSearching ? '10px' : '0' }}>
            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <Navigation size={20} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Start (e.g. Delhi)" value={origin} onChange={(e)=>setOrigin(e.target.value)} required style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 45px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', color: 'white' }}><ArrowRight size={20} /></div>

            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <MapPin size={20} color="#16a34a" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="End (e.g. Ahmedabad)" value={destination} onChange={(e)=>setDestination(e.target.value)} required style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 45px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
            </div>

            <button type="submit" style={{ flex: '0 1 auto', padding: '0 30px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'background 0.2s', height: '54px' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#16a34a'}>
              Map Route
            </button>
          </form>
        </div>
      </div>

      {/* 2. THREE-COLUMN DASHBOARD */}
      {isSearching && (
        <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'minmax(300px, 1.1fr) minmax(300px, 1fr) minmax(350px, 1.1fr)', gap: '30px', animation: 'fadeIn 0.5s ease-out' }}>
          
          {/* COLUMN 1: TIMELINE & CUSTOM SEARCH */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px', height: 'fit-content' }}>
            
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock color="#16a34a" /> Route Timeline
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '30px', fontStyle: 'italic' }}>Drag and drop stops to reorder your trip.</p>

              <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '3px dashed #d1d5db', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#111827', border: '3px solid white' }} />
                  <h4 style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' }}>Start</h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' }}>{origin}</p>
                </div>

                {itineraryStops.map((stop, index) => (
                  <div 
                    key={stop.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
                    style={{ position: 'relative', backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'grab' }}
                  >
                    <div style={{ position: 'absolute', left: '-28px', top: '15px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid white' }} />
                    <div style={{ cursor: 'grab', color: '#9ca3af' }}><GripVertical size={20} /></div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '11px', color: '#15803d', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Stop {index + 1}</h4>
                      <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '2px', lineHeight: '1.2' }}>{stop.name}</p>
                    </div>
                    <button onClick={() => removeStop(stop.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={18} /></button>
                  </div>
                ))}

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ea580c', border: '3px solid white' }} />
                  <h4 style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' }}>End</h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' }}>{destination}</p>
                </div>

              </div>

              <button onClick={handleFinalize} disabled={itineraryStops.length === 0} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: itineraryStops.length > 0 ? '#111827' : '#e5e7eb', color: itineraryStops.length > 0 ? 'white' : '#9ca3af', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: itineraryStops.length > 0 ? 'pointer' : 'not-allowed', marginTop: '40px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Finalize Trip Details <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} color="#0284c7" /> Search Exact Location
              </h3>
              <form onSubmit={handleAddCustomStop} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="E.g. Juhu Beach..." 
                  value={customStopName} 
                  onChange={(e) => setCustomStopName(e.target.value)} 
                  disabled={isFindingLocation}
                  style={{ flex: 1, padding: '12px 15px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', minWidth: '0' }}
                />
                <button type="submit" disabled={isFindingLocation} style={{ padding: '0 15px', borderRadius: '10px', backgroundColor: '#0284c7', color: 'white', fontWeight: 'bold', border: 'none', cursor: isFindingLocation ? 'not-allowed' : 'pointer' }}>
                  {isFindingLocation ? 'Locating...' : 'Plot on Map'}
                </button>
              </form>
              {!OLA_MAPS_API_KEY && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px' }}>*API Key missing in .env file.</p>
              )}
            </div>

          </div>

          {/* COLUMN 2: OLA MAP WIDGET */}
          <div style={{ backgroundColor: '#e0f2fe', borderRadius: '24px', overflow: 'hidden', position: 'sticky', top: '100px', height: 'calc(100vh - 150px)', minHeight: '500px', border: '1px solid #bae6fd', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05)' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
              {!OLA_MAPS_API_KEY && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ef4444', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>No API Key Provided.<br/>Please add REACT_APP_OLA_MAPS_API_KEY to your .env file.</div>}
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(5px)', padding: '10px 15px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#1f2937', zIndex: 30 }}>
              <MapIcon size={18} color="#0284c7" /> Powered by Ola Maps
            </div>
          </div>

          {/* COLUMN 3: CIRCULAR / PILL RECOMMENDATIONS */}
          <div style={{ overflowY: 'auto', paddingRight: '10px' }} className="hide-scrollbar">
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '5px' }}>Route Suggestions</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '25px', textTransform: 'capitalize' }}>
              Found {suggestedPlaces.length} places near {origin} & {destination}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {suggestedPlaces.map((rec) => {
                const isAdded = itineraryStops.find(s => s.id === rec.id);
                return (
                  <div 
                    key={rec.id} 
                    style={{ 
                      backgroundColor: 'white', borderRadius: '50px', padding: '10px', 
                      display: 'flex', alignItems: 'center', gap: '15px', 
                      border: isAdded ? '2px solid #16a34a' : '1px solid #e5e7eb', 
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'all 0.2s', 
                      position: 'relative' 
                    }}
                  >
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #f3f4f6' }}>
                      <img src={rec.img} alt={rec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                        <rec.icon size={12} /> {rec.type}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {rec.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {rec.desc}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => isAdded ? removeStop(rec.id) : addStop(rec)} 
                      title={isAdded ? "Remove from Route" : "Add to Route"}
                      style={{ 
                        width: '45px', height: '45px', borderRadius: '50%', flexShrink: 0, 
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        transition: 'all 0.2s', marginRight: '5px',
                        backgroundColor: isAdded ? '#f0fdf4' : '#f3f4f6', 
                        color: isAdded ? '#15803d' : '#374151' 
                      }}
                    >
                      {isAdded ? <CheckCircle2 size={22} /> : <Plus size={22} />}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default RoutePlannerPage;