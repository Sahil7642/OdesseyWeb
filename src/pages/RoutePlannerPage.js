import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Plus, Trash2, ArrowRight, Clock, Map as MapIcon, CheckCircle2, Search, Loader2, GripVertical, Camera, Layers, CloudSun, AlertTriangle, Route, ChevronLeft, ChevronRight, RotateCcw, Bed, Utensils, Fuel, Landmark, Compass, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || ""; 
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ""; 

// --- HELPER: Polyline Decoder for Ola Maps Routing API ---
const decodePolyline = (str, precision = 5) => {
  let index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, latitude_change, longitude_change, factor = Math.pow(10, precision);
  while (index < str.length) {
    byte = null; shift = 0; result = 0;
    do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    shift = result = 0;
    do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += latitude_change; lng += longitude_change;
    coordinates.push([lng / factor, lat / factor]); // [lng, lat] for GeoJSON compatibility
  }
  return coordinates;
};

const getWeatherBackground = (condition = "") => {
  const lowerCond = condition.toLowerCase();
  if (lowerCond.includes('rain') || lowerCond.includes('drizzle')) return 'url(https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('storm')) return 'url(https://images.unsplash.com/photo-1605727216801-e27ce1d0ce5c?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('snow') || lowerCond.includes('ice')) return 'url(https://images.unsplash.com/photo-1517299321609-52687d1bc9e2?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('fog') || lowerCond.includes('mist')) return 'url(https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('cloud') || lowerCond.includes('overcast')) return 'url(https://images.unsplash.com/photo-1534088568595-a066f410cbda?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('sun') || lowerCond.includes('clear')) return 'url(https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=400&q=80)';
  return 'url(https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=400&q=80)'; 
};

const getAQIDetails = (index) => {
  switch(index) {
    case 1: return { text: 'Good', color: '#4ade80' }; 
    case 2: return { text: 'Moderate', color: '#facc15' }; 
    case 3: return { text: 'Unhealthy (Sens.)', color: '#fb923c' }; 
    case 4: return { text: 'Unhealthy', color: '#f87171' }; 
    case 5: return { text: 'Very Unhealthy', color: '#a855f7' }; 
    case 6: return { text: 'Hazardous', color: '#9f1239' }; 
    default: return { text: 'N/A', color: '#9ca3af' }; 
  }
};

const getIconForCategory = (cat) => {
  switch(cat) {
    case 'Stays': return Bed;
    case 'Food': return Utensils;
    case 'Amenities': return Fuel;
    case 'Monuments': return Landmark;
    case 'Cities': return Building2;
    case 'Hidden Gems': return Compass;
    default: return Camera;
  }
};

// --- STRICT INDIA AUTOCOMPLETE ---
const SearchAutocomplete = ({ value, onChange, placeholder, Icon, iconColor, disabled, inputStyle }) => {
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
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=15`);
        const data = await res.json();
        if (data?.features) {
          const parsed = data.features.filter(f => f.properties.country === 'India' || f.properties.countrycode === 'IN')
            .map(f => [f.properties.name, f.properties.state, f.properties.country].filter(Boolean).join(', '));
          setSuggestions([...new Set(parsed)].slice(0, 5));
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
    <div ref={wrapperRef} style={{ flex: '1 1 250px', position: 'relative' }}>
      {Icon && <Icon size={20} color={iconColor || "#9ca3af"} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} />}
      <input type="text" placeholder={placeholder} value={value} onChange={(e) => { onChange(e.target.value); setShowDropdown(true); }} onFocus={() => { if(suggestions.length > 0) setShowDropdown(true); }} disabled={disabled} style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 45px', borderRadius: '12px', outline: 'none', fontSize: '15px', fontWeight: 'bold', ...inputStyle }} />
      {showDropdown && suggestions.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', listStyle: 'none', margin: '8px 0 0 0', padding: '5px 0', zIndex: 50, maxHeight: '220px', overflowY: 'auto', border: '1px solid #e5e7eb' }}>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => { onChange(s); setShowDropdown(false); }} style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: i === suggestions.length - 1 ? 'none' : '1px solid #f3f4f6', fontSize: '14px', color: '#374151', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
              <MapPin size={16} color="#16a34a" style={{ flexShrink: 0 }} /> <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const RoutePlannerPage = () => {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false); 
  const [loadingText, setLoadingText] = useState('');
  
  const [itineraryStops, setItineraryStops] = useState([]);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [routeCoords, setRouteCoords] = useState({ start: null, end: null });
  
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeLegs, setRouteLegs] = useState([]);
  
  const [customStopName, setCustomStopName] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const [weatherData, setWeatherData] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState('All');
  const [recPage, setRecPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const categories = ['All', 'Cities', 'Monuments', 'Hidden Gems', 'Stays', 'Food', 'Amenities'];

  const [currentMapStyle, setCurrentMapStyle] = useState('street');
  const [mapRenderTrigger, setMapRenderTrigger] = useState(0); 

  const mapLayouts = {
    street: { version: 8, sources: { 'osm-tiles': { type: 'raster', tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenStreetMap' } }, layers: [{ id: 'osm-tiles-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }] },
    satellite: { version: 8, sources: { 'esri-sat': { type: 'raster', tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize: 256, attribution: '© Esri World Imagery' } }, layers: [{ id: 'esri-sat-layer', type: 'raster', source: 'esri-sat', minzoom: 0, maxzoom: 19 }] },
    terrain: { version: 8, sources: { 'topo-tiles': { type: 'raster', tiles: ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenTopoMap' } }, layers: [{ id: 'topo-tiles-layer', type: 'raster', source: 'topo-tiles', minzoom: 0, maxzoom: 17 }] }
  };

  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); 
  const dragItem = useRef();
  const dragOverItem = useRef();

  const placeholderImages = [
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1550155416-8316dfa99f18?auto=format&fit=crop&w=400&q=80"
  ];

  const addStop = (stop) => { if (!itineraryStops.find(s => s.id === stop.id)) setItineraryStops([...itineraryStops, stop]); };
  const removeStop = (id) => setItineraryStops(itineraryStops.filter(s => s.id !== id));

  const handleReset = () => {
    setOrigin(''); setDestination(''); setIsSearching(false); setItineraryStops([]); setSuggestedPlaces([]);
    setRouteCoords({ start: null, end: null }); setRouteOptions([]); setRouteLegs([]); setWeatherData([]);
    setWeatherAlerts([]); setCustomStopName(''); setActiveCategory('All'); setRecPage(0);
    if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
  };

  const getCoordinates = async (placeName) => {
    try {
      let lat = null, lng = null, name = placeName, defaultAddress = "";
      if (OLA_MAPS_API_KEY) {
        const res = await fetch(`https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(placeName)}&api_key=${OLA_MAPS_API_KEY}`);
        const data = await res.json();
        if (data?.geocodingResults?.[0]?.geometry?.location) {
          const result = data.geocodingResults[0];
          lat = result.geometry.location.lat; lng = result.geometry.location.lng; name = result.name || placeName; defaultAddress = result.formatted_address || "";
        }
      }
      if (!lat || !lng) {
        const osmRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName + ", India")}&countrycodes=in`);
        const osmData = await osmRes.json();
        if (osmData && osmData.length > 0) {
          lat = parseFloat(osmData[0].lat); lng = parseFloat(osmData[0].lon); name = osmData[0].name || placeName; defaultAddress = osmData[0].display_name || "";
        }
      }
      if (!lat || !lng) return null;
      return { lat, lng, name, desc: defaultAddress || "Coordinates acquired." };
    } catch (e) { console.error("Geocoding failed:", e); }
    return null;
  };

  const handleSearchRoutes = async (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    setIsLoading(true); setIsSearching(false); setItineraryStops([]); setActiveCategory('All'); setRecPage(0);

    try {
      setLoadingText('Locating Origin...'); const startLoc = await getCoordinates(origin);
      setLoadingText('Locating Destination...'); const endLoc = await getCoordinates(destination);

      if (!startLoc || !endLoc) { alert("Could not find exact coordinates for those cities."); setIsLoading(false); return; }
      setRouteCoords({ start: startLoc, end: endLoc });
      setIsSearching(true);
    } catch (error) { alert("Error generating route."); } finally { setIsLoading(false); }
  };

  // --- 2. FETCH OLA MAPS ROUTING API (TRAFFIC ENABLED) ---
  useEffect(() => {
    if (!routeCoords.start || !routeCoords.end) return;
    
    const fetchRoutes = async () => {
      try {
        let routeData = null;
        const originStr = `${routeCoords.start.lat},${routeCoords.start.lng}`;
        const destStr = `${routeCoords.end.lat},${routeCoords.end.lng}`;
        
        // Use Ola Maps Directions API if key exists
        if (OLA_MAPS_API_KEY) {
          let url = `https://api.olamaps.io/routing/v1/directions?origin=${originStr}&destination=${destStr}&api_key=${OLA_MAPS_API_KEY}&alternatives=true&overview=full&traffic_metadata=true`;
          if (itineraryStops.length > 0) {
             url += `&waypoints=${itineraryStops.map(s => `${s.lat},${s.lng}`).join('|')}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          if (data.routes && data.routes.length > 0) routeData = data;
        }

        // Fallback to OSRM if Ola Routing fails or key missing
        if (!routeData) {
          const waypoints = [routeCoords.start, ...itineraryStops, routeCoords.end];
          const coordsString = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson&alternatives=3`);
          routeData = await res.json();
        }

        if (routeData && routeData.routes) {
          // Normalize geometry from either API
          const parsedRoutes = routeData.routes.map(r => {
            let geom = r.geometry;
            if (typeof geom === 'string') geom = { type: 'LineString', coordinates: decodePolyline(geom) };
            else if (r.overview_polyline) geom = { type: 'LineString', coordinates: decodePolyline(r.overview_polyline) };
            
            // Normalize legs array
            const legs = r.legs || [{ distance: r.summary?.distance || r.distance || 0, duration: r.summary?.duration || r.duration || 0 }];
            return { ...r, geometry: geom, legs: legs };
          });
          
          setRouteOptions(parsedRoutes); 
          setSelectedRouteIndex(0); 
          setRouteLegs(parsedRoutes[0].legs);
        }
      } catch (error) { console.error("Routing error:", error); }
    };
    
    fetchRoutes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCoords.start?.lat, routeCoords.start?.lng, routeCoords.end?.lat, routeCoords.end?.lng, itineraryStops]);

  // --- 3. DYNAMIC ROUTE SCANNER: OLA PLACES API (STRICT 100KM RADIUS) ---
  useEffect(() => {
    if (routeOptions.length === 0 || !routeOptions[selectedRouteIndex]) return;

    const fetchDynamicSuggestions = async () => {
      setIsSuggesting(true);
      try {
        const currentRoute = routeOptions[selectedRouteIndex];
        const coords = currentRoute.geometry.coordinates;

        // Sample 4 points along the route
        const searchCoords = [];
        const numSamples = 4; 
        const step = Math.max(1, Math.floor(coords.length / numSamples));
        for (let i = 0; i < coords.length; i += step) searchCoords.push({ lat: coords[i][1], lng: coords[i][0] });
        searchCoords.push({ lat: coords[coords.length - 1][1], lng: coords[coords.length - 1][0] });

        // Targeted queries using strict bounds and rankBy distance/popular
        const targetedQueries = [
          { q: "restaurant", cat: "Food", rankBy: "popular" },
          { q: "hotel", cat: "Stays", rankBy: "popular" },
          { q: "gas station", cat: "Amenities", rankBy: "distance" },
          { q: "monument", cat: "Monuments", rankBy: "popular" },
          { q: "city", cat: "Cities", rankBy: "popular" },
          { q: "waterfall", cat: "Hidden Gems", rankBy: "distance" },
          { q: "viewpoint", cat: "Hidden Gems", rankBy: "distance" }
        ];

        const fetchPointData = async (lat, lng) => {
          const promises = targetedQueries.map(async ({ q, cat, rankBy }) => {
            let fetched = [];
            try {
              if (OLA_MAPS_API_KEY) {
                // 👇 NEW: Strict bounds & 100km radius integrated exactly as requested
                const url = `https://api.olamaps.io/places/v1/textsearch?query=${encodeURIComponent(q)}&location=${lat},${lng}&radius=100000&strictbounds=true&rankBy=${rankBy}&api_key=${OLA_MAPS_API_KEY}`;
                const oRes = await fetch(url);
                const oData = await oRes.json();
                if (oData?.results && oData.results.length > 0) {
                  fetched = oData.results.slice(0, 5).map(r => ({
                    id: r.place_id, name: r.name, lat: r.geometry?.location?.lat, lng: r.geometry?.location?.lng,
                    _forcedCategory: cat, vicinity: r.formatted_address
                  }));
                }
              }
              // Strict India Fallback
              if (fetched.length === 0) {
                const pRes = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lat=${lat}&lon=${lng}&limit=5`);
                const pData = await pRes.json();
                if (pData?.features) {
                  fetched = pData.features.filter(f => f.properties.country === 'India' || f.properties.countrycode === 'IN')
                    .map(f => ({
                      id: f.properties.osm_id || Math.random(), name: f.properties.name,
                      lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0],
                      _forcedCategory: cat, vicinity: [f.properties.street, f.properties.city, f.properties.state].filter(Boolean).join(', ')
                    })).filter(p => p.name);
                }
              }
            } catch(e) {}
            return fetched;
          });
          const cResults = await Promise.all(promises);
          return cResults.flat();
        };

        const allDataPromises = searchCoords.map(c => fetchPointData(c.lat, c.lng));
        const allResultsArray = await Promise.all(allDataPromises);
        const flatResults = allResultsArray.flat();
        
        const uniquePlaces = new Map();
        
        flatResults.forEach(place => {
          if (!place.name) return;
          const id = place.id || place.name;
          const isAdded = itineraryStops.some(s => s.id === id || s.name === place.name);
          if (!isAdded && !uniquePlaces.has(id)) uniquePlaces.set(id, place);
        });

        const dynamicPlaces = Array.from(uniquePlaces.values()).map((place, idx) => {
          const cat = place._forcedCategory || "Hidden Gems";
          const DynIcon = getIconForCategory(cat);
          return {
            id: place.id, name: place.name, lat: place.lat, lng: place.lng, 
            type: cat, category: cat, time: "Route Stop", icon: DynIcon,
            desc: place.vicinity || `A beautiful ${cat.toLowerCase()} located natively along your route.`,
            img: placeholderImages[idx % placeholderImages.length]
          }
        });
        
        // Sort so the 'All' tab prioritizes high-value stops
        dynamicPlaces.sort((a, b) => {
          const rank = { 'Cities': 1, 'Monuments': 2, 'Hidden Gems': 3, 'Food': 4, 'Stays': 5, 'Amenities': 6 };
          return rank[a.category] - rank[b.category];
        });

        setSuggestedPlaces(dynamicPlaces);
        setRecPage(0); 
      } catch (error) { console.error("Suggestion Error:", error); } finally { setIsSuggesting(false); }
    };
    
    const debounceTimer = setTimeout(() => { fetchDynamicSuggestions(); }, 800);
    return () => clearTimeout(debounceTimer);
  }, [routeOptions, selectedRouteIndex, itineraryStops]);

  // --- 4. DYNAMIC WEATHER ENGINE ---
  useEffect(() => {
    if (!routeCoords.start || !routeCoords.end) return;
    const fetchWeather = async () => {
      if (!WEATHER_API_KEY) return;
      setIsWeatherLoading(true);
      const pointsToFetch = [
        { ...routeCoords.start, type: 'Start', displayName: origin },
        ...itineraryStops.map((stop, i) => ({ ...stop, type: `Stop ${i + 1}`, displayName: stop.name })),
        { ...routeCoords.end, type: 'End', displayName: destination }
      ];
      try {
        const weatherPromises = pointsToFetch.map(async (pt) => {
          const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${pt.lat},${pt.lng}&days=1&alerts=yes&aqi=yes`);
          const data = await res.json();
          return { 
            ptType: pt.type, name: pt.displayName, temp: data.current?.temp_c, condition: data.current?.condition?.text || "Clear", 
            icon: data.current?.condition?.icon, aqiIndex: data.current?.air_quality?.['us-epa-index'], alerts: data.alerts?.alert || [] 
          };
        });
        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
        
        const allAlerts = [];
        results.forEach(res => {
          if (res.alerts && res.alerts.length > 0) {
            res.alerts.forEach(alert => { if (!allAlerts.find(a => a.event === alert.event && a.location === res.name)) allAlerts.push({ location: res.name, ...alert }); });
          }
        });
        setWeatherAlerts(allAlerts);
      } catch (error) {} finally { setIsWeatherLoading(false); }
    };
    const debounceWeather = setTimeout(() => { fetchWeather(); }, 800);
    return () => clearTimeout(debounceWeather);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCoords.start?.lat, routeCoords.start?.lng, routeCoords.end?.lat, routeCoords.end?.lng, itineraryStops]);

  // INITIALIZE MAPLIBRE SAFELY
  useEffect(() => {
    if (!isSearching || !mapContainerRef.current) return;

    const initMap = () => {
      if (mapInstance.current) return; 
      const map = new window.maplibregl.Map({
        container: mapContainerRef.current, style: mapLayouts[currentMapStyle], center: [routeCoords.start.lng, routeCoords.start.lat],
        zoom: 5, attributionControl: false
      });
      map.addControl(new window.maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.on('load', () => { mapInstance.current = map; setMapRenderTrigger(prev => prev + 1); });
    };

    if (!window.maplibregl) {
      if (!document.getElementById('maplibre-css')) {
        const link = document.createElement('link'); link.id = 'maplibre-css'; link.href = 'https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.css'; link.rel = 'stylesheet'; document.head.appendChild(link);
      }
      if (!document.getElementById('maplibre-js')) {
        const script = document.createElement('script'); script.id = 'maplibre-js'; script.src = 'https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js'; script.async = true; script.onload = initMap; document.head.appendChild(script);
      } else {
        document.getElementById('maplibre-js').addEventListener('load', initMap);
      }
    } else { initMap(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  useEffect(() => {
    if (mapInstance.current && window.maplibregl) {
      mapInstance.current.setStyle(mapLayouts[currentMapStyle]);
      mapInstance.current.once('styledata', () => setMapRenderTrigger(prev => prev + 1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMapStyle]);

  const updateMapEntities = useCallback(() => {
    const map = mapInstance.current;
    if (!map || !map.isStyleLoaded() || !routeCoords.start || !routeCoords.end || !window.maplibregl) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createMarkerEl = (name, color) => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer;">
          <div style="width: 16px; height: 16px; background-color: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.4); z-index: 2;"></div>
          <div style="position: absolute; left: 22px; white-space: nowrap; font-family: system-ui; font-size: 13px; font-weight: 800; color: ${currentMapStyle === 'satellite' ? 'white' : '#111827'}; text-shadow: ${currentMapStyle === 'satellite' ? '1px 1px 4px black' : '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white'}; z-index: 1;">
            ${name}
          </div>
        </div>`;
      return el;
    };

    markersRef.current.push(new window.maplibregl.Marker({ element: createMarkerEl(origin.toUpperCase(), '#111827') }).setLngLat([routeCoords.start.lng, routeCoords.start.lat]).addTo(map));
    itineraryStops.forEach(stop => markersRef.current.push(new window.maplibregl.Marker({ element: createMarkerEl(stop.name, '#16a34a') }).setLngLat([stop.lng, stop.lat]).addTo(map)));
    markersRef.current.push(new window.maplibregl.Marker({ element: createMarkerEl(destination.toUpperCase(), '#ea580c') }).setLngLat([routeCoords.end.lng, routeCoords.end.lat]).addTo(map));

    if (routeOptions.length > 0) {
      const features = routeOptions.map((route, idx) => ({
        type: 'Feature', properties: { routeIndex: idx, isSelected: idx === selectedRouteIndex }, geometry: route.geometry
      }));

      features.sort((a, b) => (a.properties.isSelected ? 1 : -1));
      const geojson = { type: 'FeatureCollection', features };

      if (!map.getSource('routes-source')) {
        map.addSource('routes-source', { type: 'geojson', data: geojson });
        map.addLayer({ id: 'route-casing', type: 'line', source: 'routes-source', filter: ['==', 'isSelected', true], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#0284c7', 'line-width': 8, 'line-opacity': 0.3 } });
        map.addLayer({
          id: 'route-lines', type: 'line', source: 'routes-source', layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': ['case', ['==', ['get', 'isSelected'], true], '#3b82f6', '#9ca3af'], 'line-width': ['case', ['==', ['get', 'isSelected'], true], 5, 4], 'line-opacity': ['case', ['==', ['get', 'isSelected'], true], 1.0, 0.6] }
        });

        if (!map.hasRouteClickListener) {
          map.on('click', 'route-lines', (e) => {
            if (e.features.length > 0) {
              const clickedIdx = e.features[0].properties.routeIndex;
              setSelectedRouteIndex(clickedIdx);
            }
          });
          map.on('mouseenter', 'route-lines', () => map.getCanvas().style.cursor = 'pointer');
          map.on('mouseleave', 'route-lines', () => map.getCanvas().style.cursor = '');
          map.hasRouteClickListener = true;
        }
      } else {
        map.getSource('routes-source').setData(geojson);
      }

      setRouteLegs(routeOptions[selectedRouteIndex].legs || []);
      const bounds = new window.maplibregl.LngLatBounds();
      routeOptions[selectedRouteIndex].geometry.coordinates.forEach(coord => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 80, maxZoom: 12 });
    }
  }, [routeOptions, selectedRouteIndex, mapRenderTrigger, currentMapStyle, origin, destination, itineraryStops, routeCoords]);

  useEffect(() => {
    const map = mapInstance.current;
    if (map) {
      if (map.isStyleLoaded()) { updateMapEntities(); }
      else { map.once('styledata', updateMapEntities); }
    }
  }, [updateMapEntities, currentMapStyle]);

  const handleAddCustomStop = async (e) => {
    e.preventDefault();
    if (!customStopName.trim()) return;

    setIsFindingLocation(true);
    try {
      const locationData = await getCoordinates(customStopName);
      if (locationData) {
        const customStop = {
          id: Date.now(), name: locationData.name, lat: locationData.lat, lng: locationData.lng,     
          type: "Custom Stop", time: "Flexible", icon: MapPin,
          desc: locationData.desc || "A personalized location added by you.", img: placeholderImages[0]
        };
        setItineraryStops([...itineraryStops, customStop]);
        setCustomStopName(''); 
      } else { alert(`Could not find "${customStopName}". Try adding a city name (e.g. "Juhu Beach, Mumbai").`); }
    } catch (error) { console.error("Error:", error); } finally { setIsFindingLocation(false); }
  };

  const handleDragStart = (e, position) => { dragItem.current = position; e.target.style.opacity = 0.5; };
  const handleDragEnter = (e, position) => { e.preventDefault(); dragOverItem.current = position; };
  const handleDrop = (e) => {
    e.preventDefault();
    const copyListItems = [...itineraryStops];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    setItineraryStops(copyListItems);
    dragItem.current = null; dragOverItem.current = null; e.target.style.opacity = 1;
  };
  const handleDragEnd = (e) => { e.target.style.opacity = 1; };

  const handleFinalize = () => { navigate('/plan', { state: { prefillPackage: { title: `Custom Drive: ${origin} to ${destination}`, location: `${origin} to ${destination}` } } }); };

  const totalDistMeters = routeLegs.reduce((sum, leg) => sum + leg.distance, 0);
  const totalDurSeconds = routeLegs.reduce((sum, leg) => sum + leg.duration, 0);
  const totalDistKm = (totalDistMeters / 1000).toFixed(1);
  const totalHrs = Math.floor(totalDurSeconds / 3600);
  const totalMins = Math.floor((totalDurSeconds % 3600) / 60);
  const totalTimeStr = totalHrs > 0 ? `${totalHrs}h ${totalMins}m` : `${totalMins}m`;

  const renderLegInfo = (index) => {
    if (!routeLegs[index]) return null;
    const leg = routeLegs[index];
    const dist = (leg.distance / 1000).toFixed(1);
    const hrs = Math.floor(leg.duration / 3600);
    const mins = Math.floor((leg.duration % 3600) / 60);
    const time = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0' }}>
        <div style={{ backgroundColor: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #e5e7eb', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
          <Navigation size={12} color="#0284c7" /> {dist} km
        </div>
        <div style={{ backgroundColor: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #e5e7eb', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
          <Clock size={12} color="#ea580c" /> {time} drive
        </div>
      </div>
    );
  };

  const filteredPlaces = activeCategory === 'All' ? suggestedPlaces : suggestedPlaces.filter(p => p.category === activeCategory);
  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const currentDisplayedRecs = filteredPlaces.slice(recPage * ITEMS_PER_PAGE, (recPage + 1) * ITEMS_PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO & SEARCH */}
      <div style={{ position: 'relative', height: isSearching ? '25vh' : '50vh', minHeight: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'all 0.5s ease-in-out' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.95))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '900px', padding: '0 20px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: isSearching ? '32px' : '48px', fontWeight: '800', color: 'white', marginBottom: '15px', textAlign: 'center', transition: 'all 0.3s' }}>
            Interactive Route Planner
          </h1>
          {!isSearching && (
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '40px' }}>
              Enter your starting point and destination. We'll plot the actual road route and dynamically find real landmarks along the way.
            </p>
          )}

          <form onSubmit={handleSearchRoutes} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', marginTop: isSearching ? '10px' : '0' }}>
            
            <SearchAutocomplete 
              value={origin} 
              onChange={setOrigin} 
              placeholder="Start (e.g. Delhi)" 
              Icon={Navigation} 
              iconColor="#9ca3af" 
              disabled={isLoading}
              inputStyle={{ border: 'none' }}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', color: 'white' }}><ArrowRight size={20} /></div>
            
            <SearchAutocomplete 
              value={destination} 
              onChange={setDestination} 
              placeholder="End (e.g. Ahmedabad)" 
              Icon={MapPin} 
              iconColor="#16a34a" 
              disabled={isLoading}
              inputStyle={{ border: 'none' }}
            />
            
            <div style={{ display: 'flex', gap: '10px', flex: '0 1 auto' }}>
              <button type="submit" disabled={isLoading} style={{ flex: '1', padding: '0 30px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {isLoading ? <><Loader2 size={18} className="animate-spin" /> {loadingText}</> : 'Map Route'}
              </button>
              
              {(isSearching || origin || destination) && (
                <button type="button" onClick={handleReset} style={{ flex: '0 0 auto', padding: '0 20px', borderRadius: '12px', backgroundColor: 'transparent', color: 'white', fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', backdropFilter: 'blur(5px)' }}>
                  <RotateCcw size={18} /> Reset
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 2. THREE-COLUMN DASHBOARD */}
      {isSearching && (
        <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '30px', animation: 'fadeIn 0.5s ease-out' }}>
          
          {/* COLUMN 1: TIMELINE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock color="#16a34a" /> Route Timeline
                </h2>
                {routeLegs.length > 0 && (
                  <div style={{ backgroundColor: '#16a34a', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', gap: '5px' }}>
                    {totalDistKm} km • {totalTimeStr}
                  </div>
                )}
              </div>
              
              {/* Alternative Routes UI Buttons */}
              {routeOptions.length > 1 && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Select Route Preference:</p>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }} className="hide-scrollbar">
                    {routeOptions.map((opt, idx) => {
                      const hrs = Math.floor(opt.duration / 3600);
                      const mins = Math.floor((opt.duration % 3600) / 60);
                      const isSel = idx === selectedRouteIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedRouteIndex(idx)}
                          style={{
                            padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                            border: isSel ? '2px solid #0284c7' : '1px solid #d1d5db',
                            backgroundColor: isSel ? '#e0f2fe' : 'white',
                            color: isSel ? '#0369a1' : '#4b5563',
                            fontWeight: isSel ? 'bold' : '600', fontSize: '13px'
                          }}
                        >
                          <Route size={14} /> Route {idx + 1} ({hrs}h {mins}m)
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '25px', fontStyle: 'italic' }}>Drag and drop stops to reorder your trip.</p>

              <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '3px dashed #d1d5db', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#111827', border: '3px solid white' }} />
                  <h4 style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' }}>Start</h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' }}>{origin}</p>
                </div>

                {renderLegInfo(0)}

                {itineraryStops.map((stop, index) => (
                  <React.Fragment key={stop.id}>
                    <div draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} style={{ position: 'relative', backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'grab' }}>
                      <div style={{ position: 'absolute', left: '-28px', top: '15px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid white' }} />
                      <div style={{ cursor: 'grab', color: '#9ca3af' }}><GripVertical size={20} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '11px', color: '#15803d', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Stop {index + 1}</h4>
                        <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '2px', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{stop.name}</p>
                      </div>
                      <button onClick={() => removeStop(stop.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={18} /></button>
                    </div>
                    {renderLegInfo(index + 1)}
                  </React.Fragment>
                ))}

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ea580c', border: '3px solid white' }} />
                  <h4 style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' }}>End</h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' }}>{destination}</p>
                </div>
              </div>

              <button onClick={handleFinalize} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '30px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Finalize Trip Details <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} color="#0284c7" /> Add a Custom Stop
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <SearchAutocomplete 
                  value={customStopName} 
                  onChange={setCustomStopName} 
                  placeholder="Search exact place..." 
                  disabled={isFindingLocation}
                  inputStyle={{ border: '1px solid #d1d5db', padding: '12px 15px', fontSize: '14px' }}
                />
                <button onClick={handleAddCustomStop} disabled={isFindingLocation || !customStopName} style={{ padding: '0 20px', borderRadius: '10px', backgroundColor: '#0284c7', color: 'white', fontWeight: 'bold', border: 'none', cursor: isFindingLocation || !customStopName ? 'not-allowed' : 'pointer' }}>
                  {isFindingLocation ? <Loader2 size={16} className="animate-spin" /> : 'Add'}
                </button>
              </div>
            </div>
          </div>

          {/* COLUMN 2: MAP WIDGET & PLACES OVERVIEW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px', height: 'calc(100vh - 150px)' }}>
            
            <div style={{ flex: 1, backgroundColor: '#e0f2fe', borderRadius: '24px', overflow: 'hidden', position: 'relative', border: '1px solid #bae6fd', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
              <div style={{ backgroundColor: 'white', padding: '12px 20px', borderBottom: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>
                  <Layers size={18} color="#0284c7" /> Map Layout
                </div>
                <select 
                  value={currentMapStyle} 
                  onChange={(e) => setCurrentMapStyle(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13px', fontWeight: '600', backgroundColor: '#f9fafb', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="street">Street View (Standard)</option>
                  <option value="satellite">Satellite Imagery</option>
                  <option value="terrain">Topographic / Terrain</option>
                </select>
              </div>

              <div ref={mapContainerRef} style={{ width: '100%', flex: 1, position: 'relative' }}>
                {!window.maplibregl && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#0284c7', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>Loading Map Engine...</div>}
              </div>
              
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(5px)', padding: '10px 15px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', color: '#1f2937', zIndex: 30, pointerEvents: 'none' }}>
                <MapIcon size={18} color="#0284c7" /> Click routes to change paths!
              </div>
            </div>

            {/* Places Overview */}
            <div style={{ flex: '0 0 auto', maxHeight: '35%', backgroundColor: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', overflowY: 'auto' }} className="hide-scrollbar">
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#0284c7" /> Places Overview
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {routeCoords.start && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{origin} <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '12px' }}>(Start)</span></h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.4' }}>{routeCoords.start.desc}</p>
                  </div>
                )}
                {itineraryStops.map((stop, i) => (
                  <div key={stop.id}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{stop.name} <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '12px' }}>(Stop {i + 1})</span></h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.4' }}>{stop.desc}</p>
                  </div>
                ))}
                {routeCoords.end && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{destination} <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '12px' }}>(End)</span></h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.4' }}>{routeCoords.end.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 3: WEATHER & CATEGORIZED RECOMMENDATIONS */}
          <div style={{ overflowY: 'auto', paddingRight: '10px' }} className="hide-scrollbar">
            
            {/* DYNAMIC WEATHER WIDGET */}
            {weatherData.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CloudSun color="#0284c7" /> Live Weather
                </h2>
                
                {isWeatherLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontSize: '14px' }}>
                    <Loader2 size={16} className="animate-spin" /> Fetching latest forecasts...
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }} className="hide-scrollbar">
                    {weatherData.map((w, idx) => {
                      const aqiInfo = getAQIDetails(w.aqiIndex);

                      return (
                        <div key={idx} style={{ 
                          minWidth: '130px', borderRadius: '16px', padding: '15px', border: '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center', flexShrink: 0,
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.75)), ${getWeatherBackground(w.condition)}`,
                          backgroundSize: 'cover', backgroundPosition: 'center', color: 'white'
                        }}>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0' }}>{w.ptType}</p>
                          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'white', margin: '0 0 5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.name}</h4>
                          {w.icon ? (
                            <img src={w.icon} alt={w.condition} style={{ width: '48px', height: '48px', margin: '0 auto', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
                          ) : (
                            <CloudSun size={32} color="white" style={{ margin: '8px auto' }} />
                          )}
                          <div style={{ fontSize: '22px', fontWeight: '900', color: 'white', textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}>{w.temp}°C</div>
                          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', margin: '2px 0 0 0', lineHeight: '1.2', fontWeight: '500' }}>{w.condition}</p>
                          
                          {w.aqiIndex && (
                            <div style={{ marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: '12px' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: aqiInfo.color, boxShadow: `0 0 4px ${aqiInfo.color}` }}></div>
                              <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>AQI: {aqiInfo.text}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* CLIMATE ALERTS */}
                {weatherAlerts.length > 0 && !isWeatherLoading && (
                  <div style={{ marginTop: '15px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={16} /> Active Travel Advisories
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {weatherAlerts.map((alert, idx) => (
                        <div key={idx} style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '12px 15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(239, 68, 68, 0.1)' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b', margin: '0 0 4px 0' }}>{alert.location}: {alert.event}</h4>
                          <p style={{ fontSize: '12px', color: '#b91c1c', margin: 0, lineHeight: '1.4' }}>{alert.headline || alert.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ROUTE SUGGESTIONS WITH CATEGORIES & PAGINATION */}
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Route Suggestions</h2>
            
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '15px', paddingBottom: '5px' }} className="hide-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setRecPage(0); }}
                  style={{
                    padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                    backgroundColor: activeCategory === cat ? '#0284c7' : '#f3f4f6',
                    color: activeCategory === cat ? 'white' : '#4b5563',
                    boxShadow: activeCategory === cat ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              {isSuggesting ? (
                <><Loader2 size={16} color="#0284c7" className="animate-spin" /><span style={{ fontSize: '14px', color: '#0284c7', fontWeight: '600' }}>Hunting for amazing places...</span></>
              ) : (
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Showing {filteredPlaces.length} locations.</span>
              )}
            </div>

            {/* Paginated List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {currentDisplayedRecs.length > 0 ? currentDisplayedRecs.map((rec) => {
                const isAdded = itineraryStops.find(s => s.id === rec.id);
                return (
                  <div key={rec.id} style={{ 
                    backgroundColor: 'white', borderRadius: '50px', padding: '10px', display: 'flex', alignItems: 'center', gap: '15px', border: isAdded ? '2px solid #16a34a' : '1px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'all 0.2s', opacity: isSuggesting ? 0.5 : 1
                  }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f2fe' }}>
                      {rec.img && rec.img.includes('unsplash') ? (
                        <img src={rec.img} alt={rec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <rec.icon size={32} color="#0284c7" />
                      )}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
                        <rec.icon size={12} /> {rec.type}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {rec.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{rec.desc}</p>
                    </div>
                    <button onClick={() => isAdded ? removeStop(rec.id) : addStop(rec)} title={isAdded ? "Remove" : "Add"} style={{ 
                      width: '45px', height: '45px', borderRadius: '50%', flexShrink: 0, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s', marginRight: '5px', backgroundColor: isAdded ? '#f0fdf4' : '#f3f4f6', color: isAdded ? '#15803d' : '#374151'
                    }}>
                      {isAdded ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                )
              }) : !isSuggesting && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', backgroundColor: 'white', borderRadius: '20px', border: '1px dashed #d1d5db' }}>
                  No places found in this category along the route.
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && !isSuggesting && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: 'white', borderRadius: '50px', border: '1px solid #e5e7eb', marginTop: '5px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <button 
                    onClick={() => setRecPage(p => Math.max(0, p - 1))} 
                    disabled={recPage === 0} 
                    style={{ background: 'none', border: 'none', cursor: recPage === 0 ? 'not-allowed' : 'pointer', color: recPage === 0 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}
                  >
                    <ChevronLeft size={18} /> Prev
                  </button>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>
                    Page {recPage + 1} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setRecPage(p => Math.min(totalPages - 1, p + 1))} 
                    disabled={recPage === totalPages - 1} 
                    style={{ background: 'none', border: 'none', cursor: recPage === totalPages - 1 ? 'not-allowed' : 'pointer', color: recPage === totalPages - 1 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default RoutePlannerPage;