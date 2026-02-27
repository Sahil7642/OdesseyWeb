import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Plus, Trash2, ArrowRight, Clock, Map as MapIcon, CheckCircle2, Search, Loader2, GripVertical, Camera, Layers, CloudSun, AlertTriangle, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || ""; 
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ""; 

const getWeatherBackground = (condition = "") => {
  const lowerCond = condition.toLowerCase();
  if (lowerCond.includes('rain') || lowerCond.includes('drizzle') || lowerCond.includes('shower')) return 'url(https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('thunder') || lowerCond.includes('storm')) return 'url(https://images.unsplash.com/photo-1605727216801-e27ce1d0ce5c?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('snow') || lowerCond.includes('ice') || lowerCond.includes('blizzard')) return 'url(https://images.unsplash.com/photo-1517299321609-52687d1bc9e2?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('fog') || lowerCond.includes('mist')) return 'url(https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('cloud') || lowerCond.includes('overcast')) return 'url(https://images.unsplash.com/photo-1534088568595-a066f410cbda?auto=format&fit=crop&w=400&q=80)';
  if (lowerCond.includes('sun') || lowerCond.includes('clear')) return 'url(https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=400&q=80)';
  return 'url(https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=400&q=80)'; 
};

const RoutePlannerPage = () => {
  const navigate = useNavigate();

  // --- CORE STATE ---
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false); 
  const [loadingText, setLoadingText] = useState('');
  
  const [itineraryStops, setItineraryStops] = useState([]);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [routeCoords, setRouteCoords] = useState({ start: null, end: null });
  
  // --- ALTERNATIVE ROUTES STATE ---
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeLegs, setRouteLegs] = useState([]);
  
  const [customStopName, setCustomStopName] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  // --- WEATHER STATE ---
  const [weatherData, setWeatherData] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // --- MAP STYLES & LAYOUT STATE ---
  const [currentMapStyle, setCurrentMapStyle] = useState('street');

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

  // --- ROBUST GEOCODING HELPER ---
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
        const osmRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
        const osmData = await osmRes.json();
        if (osmData && osmData.length > 0) {
          lat = parseFloat(osmData[0].lat); lng = parseFloat(osmData[0].lon); name = osmData[0].name || placeName; defaultAddress = osmData[0].display_name || "";
        }
      }
      if (!lat || !lng) return null;

      let wikiDesc = defaultAddress || "Coordinates acquired. Information currently unavailable.";
      try {
        const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(name)}&gsrlimit=1&prop=extracts&exintro=1&explaintext=1&exchars=180&format=json&origin=*`);
        const wikiData = await wikiRes.json();
        if (wikiData?.query?.pages) {
          const pages = Object.values(wikiData.query.pages);
          if (pages.length > 0 && pages[0].extract) { wikiDesc = pages[0].extract.trim() + (pages[0].extract.endsWith('.') ? '' : '...'); }
        }
      } catch (e) { console.error("Wikipedia text fetch failed:", e); }
      return { lat, lng, name, desc: wikiDesc };
    } catch (e) { console.error("Geocoding failed:", e); }
    return null;
  };

  // --- 1. INITIAL SEARCH ---
  const handleSearchRoutes = async (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    setIsLoading(true); setIsSearching(false); setItineraryStops([]);

    try {
      setLoadingText('Locating Origin...'); const startLoc = await getCoordinates(origin);
      setLoadingText('Locating Destination...'); const endLoc = await getCoordinates(destination);

      if (!startLoc || !endLoc) {
        alert("Could not find exact coordinates for those cities. Try adding a state name.");
        setIsLoading(false); return;
      }
      setRouteCoords({ start: startLoc, end: endLoc });
      setIsSearching(true);
    } catch (error) { console.error("Search Error:", error); alert("Error generating route."); } 
    finally { setIsLoading(false); }
  };

  // --- 2. FETCH OSRM ROUTES ---
  // Retrieves the actual road geometry for the map and calculations
  useEffect(() => {
    if (!routeCoords.start || !routeCoords.end) return;

    const fetchRoutes = async () => {
      const waypoints = [routeCoords.start, ...itineraryStops, routeCoords.end];
      const coordsString = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson&alternatives=3`);
        const data = await res.json();
        
        if (data.routes && data.routes.length > 0) {
          setRouteOptions(data.routes);
          setSelectedRouteIndex(0); 
          setRouteLegs(data.routes[0].legs || []);
        }
      } catch (error) { console.error("Error fetching OSRM routes:", error); }
    };

    fetchRoutes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCoords.start?.lat, routeCoords.start?.lng, routeCoords.end?.lat, routeCoords.end?.lng, itineraryStops]);


  // --- 3. DYNAMIC ROUTE SCANNER (ALONG ACTUAL HIGHWAYS) ---
  // We wait for the road coordinates (routeOptions) to generate accurate points
  useEffect(() => {
    if (routeOptions.length === 0 || !routeOptions[selectedRouteIndex]) return;

    const fetchDynamicSuggestions = async () => {
      setIsSuggesting(true);
      try {
        const currentRoute = routeOptions[selectedRouteIndex];
        const coords = currentRoute.geometry.coordinates; // Array of [lng, lat] along the road

        // Sample 12 points evenly spaced across the entire route length
        const searchCoords = [];
        const numSamples = 12;
        const step = Math.max(1, Math.floor(coords.length / numSamples));

        for (let i = 0; i < coords.length; i += step) {
          searchCoords.push({ lat: coords[i][1], lng: coords[i][0] });
        }
        // Ensure final destination is checked
        searchCoords.push({ lat: coords[coords.length - 1][1], lng: coords[coords.length - 1][0] });

        const fetchWiki = async ({lat, lng}) => {
          try {
            // Wikipedia has a 10km radius limit, but because we sample points directly on the highway,
            // this effectively blankets the entire physical route in 10km search zones!
            const url = `https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&ggsradius=10000&ggslimit=3&ggscoord=${lat}|${lng}&prop=coordinates|pageimages|extracts&exintro=1&explaintext=1&exchars=120&piprop=thumbnail&pithumbsize=400&format=json&origin=*`;
            const res = await fetch(url); const data = await res.json();
            if (data?.query?.pages) return Object.values(data.query.pages);
            return [];
          } catch (e) { return []; }
        };

        const resultsArray = await Promise.all(searchCoords.map(fetchWiki));
        
        // Filter out duplicates and places already in the itinerary
        const uniquePlaces = new Map();
        resultsArray.flat().forEach(page => {
          const isAdded = itineraryStops.some(s => s.id === page.pageid || s.name === page.title);
          if (!isAdded && !uniquePlaces.has(page.pageid)) uniquePlaces.set(page.pageid, page);
        });

        const dynamicPlaces = Array.from(uniquePlaces.values()).slice(0, 15).map((page, idx) => ({
          id: page.pageid, name: page.title, lat: page.coordinates?.[0]?.lat || 0, lng: page.coordinates?.[0]?.lon || 0, type: "Landmark", time: "1-2 Hours", icon: Camera,
          desc: page.extract ? page.extract.trim() + (page.extract.endsWith('.') ? '' : '...') : `A notable landmark located right along your driving route.`,
          img: page.thumbnail?.source || placeholderImages[idx % placeholderImages.length]
        }));
        
        setSuggestedPlaces(dynamicPlaces);
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
          const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${pt.lat},${pt.lng}&days=1&alerts=yes`);
          const data = await res.json();
          return { ptType: pt.type, name: pt.displayName, temp: data.current?.temp_c, condition: data.current?.condition?.text || "Clear", icon: data.current?.condition?.icon, alerts: data.alerts?.alert || [] };
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
      } catch (error) { console.error("Error fetching weather:", error); } finally { setIsWeatherLoading(false); }
    };
    const debounceWeather = setTimeout(() => { fetchWeather(); }, 800);
    return () => clearTimeout(debounceWeather);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCoords.start?.lat, routeCoords.start?.lng, routeCoords.end?.lat, routeCoords.end?.lng, itineraryStops]);

  // --- 5. INITIALIZE MAPLIBRE SAFELY ---
  useEffect(() => {
    if (!isSearching || !mapContainerRef.current) return;

    const initMap = () => {
      if (mapInstance.current) return; 
      
      const map = new window.maplibregl.Map({
        container: mapContainerRef.current,
        style: mapLayouts[currentMapStyle], 
        center: [routeCoords.start.lng, routeCoords.start.lat],
        zoom: 5, attributionControl: false
      });

      map.addControl(new window.maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      
      map.on('load', () => { 
        mapInstance.current = map; 
      });
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

  // --- 6. HANDLE MAP STYLE SWITCHING ---
  useEffect(() => {
    if (mapInstance.current && window.maplibregl) {
      mapInstance.current.setStyle(mapLayouts[currentMapStyle]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMapStyle]);

  // --- 7. DRAW MAP ENTITIES (MARKERS & MULTIPLE ROUTES) ---
  // This cleanly handles the data drawn ON TOP of the map style
  const updateMapEntities = useCallback(() => {
    const map = mapInstance.current;
    if (!map || !map.isStyleLoaded() || !routeCoords.start || !routeCoords.end || !window.maplibregl) return;

    // Draw Markers
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

    // Draw Routes & Alternatives
    if (routeOptions.length > 0) {
      const features = routeOptions.map((route, idx) => ({
        type: 'Feature',
        properties: { routeIndex: idx, isSelected: idx === selectedRouteIndex },
        geometry: route.geometry
      }));

      features.sort((a, b) => (a.properties.isSelected ? 1 : -1));
      const geojson = { type: 'FeatureCollection', features };

      if (!map.getSource('routes-source')) {
        map.addSource('routes-source', { type: 'geojson', data: geojson });
        
        map.addLayer({
          id: 'route-casing', type: 'line', source: 'routes-source',
          filter: ['==', 'isSelected', true],
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#0284c7', 'line-width': 8, 'line-opacity': 0.3 }
        });

        map.addLayer({
          id: 'route-lines', type: 'line', source: 'routes-source',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': ['case', ['==', ['get', 'isSelected'], true], '#3b82f6', '#9ca3af'],
            'line-width': ['case', ['==', ['get', 'isSelected'], true], 5, 4],
            'line-opacity': ['case', ['==', ['get', 'isSelected'], true], 1.0, 0.6]
          }
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

      // Fit map to selected route bounds
      const bounds = new window.maplibregl.LngLatBounds();
      routeOptions[selectedRouteIndex].geometry.coordinates.forEach(coord => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 80, maxZoom: 12 });
    }

  }, [routeOptions, selectedRouteIndex, currentMapStyle, origin, destination, itineraryStops, routeCoords]);

  // Wait for style loads to trigger the drawing function safely
  useEffect(() => {
    const map = mapInstance.current;
    if (map) {
      if (map.isStyleLoaded()) { updateMapEntities(); }
      else { map.once('styledata', updateMapEntities); }
    }
  }, [updateMapEntities, currentMapStyle]);

  // --- EXACT COORDINATE CUSTOM SEARCH ---
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
          desc: locationData.desc || "A personalized location added by you.",
          img: placeholderImages[0]
        };
        setItineraryStops([...itineraryStops, customStop]);
        setCustomStopName(''); 
      } else { alert(`Could not find "${customStopName}". Try adding a city name (e.g. "Juhu Beach, Mumbai").`); }
    } catch (error) { console.error("Error:", error); } finally { setIsFindingLocation(false); }
  };

  // --- DRAG AND DROP ---
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

  // ETAs
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
            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <Navigation size={20} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Start (e.g. Delhi)" value={origin} onChange={(e)=>setOrigin(e.target.value)} required disabled={isLoading} style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 45px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', color: 'white' }}><ArrowRight size={20} /></div>
            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <MapPin size={20} color="#16a34a" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="End (e.g. Ahmedabad)" value={destination} onChange={(e)=>setDestination(e.target.value)} required disabled={isLoading} style={{ width: '100%', boxSizing: 'border-box', padding: '16px 16px 16px 45px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 'bold' }} />
            </div>
            <button type="submit" disabled={isLoading} style={{ flex: '0 1 auto', padding: '0 30px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', height: '54px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isLoading ? <><Loader2 size={18} className="animate-spin" /> {loadingText}</> : 'Map Route'}
            </button>
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

              <button onClick={handleFinalize} disabled={itineraryStops.length === 0} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: itineraryStops.length > 0 ? '#111827' : '#e5e7eb', color: itineraryStops.length > 0 ? 'white' : '#9ca3af', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: itineraryStops.length > 0 ? 'pointer' : 'not-allowed', marginTop: '30px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Finalize Trip Details <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} color="#0284c7" /> Add a Custom Stop
              </h3>
              <form onSubmit={handleAddCustomStop} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Search exact place..." value={customStopName} onChange={(e) => setCustomStopName(e.target.value)} disabled={isFindingLocation} style={{ flex: 1, padding: '12px 15px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', minWidth: '0' }} />
                <button type="submit" disabled={isFindingLocation} style={{ padding: '0 15px', borderRadius: '10px', backgroundColor: '#0284c7', color: 'white', fontWeight: 'bold', border: 'none', cursor: isFindingLocation ? 'not-allowed' : 'pointer' }}>
                  {isFindingLocation ? <Loader2 size={16} className="animate-spin" /> : 'Add'}
                </button>
              </form>
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

            {/* Places Overview (With Wikipedia Extracts) */}
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

          {/* COLUMN 3: WEATHER & RECOMMENDATIONS */}
          <div style={{ overflowY: 'auto', paddingRight: '10px' }} className="hide-scrollbar">
            
            {/* DYNAMIC WEATHER WIDGET WITH PHOTO BACKGROUNDS */}
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
                    {weatherData.map((w, idx) => (
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
                      </div>
                    ))}
                  </div>
                )}

                {/* CLIMATE & TRAVEL ALERTS DASHBOARD */}
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

            {/* Existing Route Suggestions */}
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '5px' }}>Route Suggestions</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              {isSuggesting ? (
                <><Loader2 size={16} color="#0284c7" className="animate-spin" /><span style={{ fontSize: '14px', color: '#0284c7', fontWeight: '600' }}>Scanning your entire route...</span></>
              ) : (
                <span style={{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' }}>Found {suggestedPlaces.length} attractions along your route.</span>
              )}
            </div>

            {/* Standard 1-Column Horizontal Capsules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {suggestedPlaces.length > 0 ? suggestedPlaces.map((rec) => {
                const isAdded = itineraryStops.find(s => s.id === rec.id);
                return (
                  <div key={rec.id} style={{ 
                    backgroundColor: 'white', borderRadius: '50px', padding: '10px', display: 'flex', alignItems: 'center', gap: '15px', border: isAdded ? '2px solid #16a34a' : '1px solid #e5e7eb', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'all 0.2s', opacity: isSuggesting ? 0.5 : 1
                  }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #f3f4f6' }}>
                      <img src={rec.img} alt={rec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  No automatic suggestions found. Use the search box!
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Global Styles */}
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