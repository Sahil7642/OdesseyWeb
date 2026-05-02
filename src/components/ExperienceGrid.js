/*import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Trees, Building2 } from 'lucide-react';

const ExperienceGrid = () => {
  // --- CAROUSEL DATA (Right Side) ---
  const carouselImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", // India Fort
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80", // Kerala Boat
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=800&q=80", // Mumbai City
    "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=80"  // Indian Food
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // --- CATEGORY DATA (Left Side) ---
  const categories = [
    {
      title: "Food",
      icon: Utensils,
      color: "#fef3c7", // Light yellow bg
      textColor: "#d97706", // Dark yellow text
      desc: "Taste the authentic spices and flavors of local cuisines."
    },
    {
      title: "Nature",
      icon: Trees,
      color: "#dcfce7", // Light green bg
      textColor: "#16a34a", // Dark green text
      desc: "Connect with the wild, from lush forests to calm rivers."
    },
    {
      title: "Cities",
      icon: Building2,
      color: "#e0f2fe", // Light blue bg
      textColor: "#0284c7", // Dark blue text
      desc: "Explore the heritage and vibrant life of ancient cities."
    }
  ];

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Main Heading *}
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '40px', textAlign: 'center' }}>
          Curated <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Experiences</span>
        </h2>

        {/* --- MAIN FLEX CONTAINER --- *}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', // Wraps on mobile
          gap: '30px', 
          height: 'auto',
          minHeight: '500px' // Ensures consistent height
        }}>

          {/* === LEFT SIDE: CATEGORIES (60%) === *}
          <div style={{ 
            flex: '3', // Takes up 3 parts of space
            minWidth: '300px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'space-between'
          }}>
            {categories.map((cat, index) => (
              <div key={index} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px' 
              }}>
                
                {/* 1. TOP BOX (The Card) *}
                <div style={{
                  flex: '1', // Fills available height
                  backgroundColor: cat.color,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cat.textColor,
                  minHeight: '200px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <cat.icon size={48} style={{ marginBottom: '15px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{cat.title}</h3>
                </div>

                {/* 2. BOTTOM BOX (The Text) *}
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  height: '120px', // Fixed height for alignment
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cat.desc}
                </div>

              </div>
            ))}
          </div>

          {/* === RIGHT SIDE: CAROUSEL (40%) === *}
          <div style={{ 
            flex: '2', // Takes up 2 parts of space
            minWidth: '300px',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            
            {/* The Image *}
            <img 
              src={carouselImages[currentIndex]} 
              alt="Experience Gallery"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0, 
                left: 0,
                transition: 'opacity 0.5s ease-in-out'
              }} 
            />

            {/* Overlay Gradient *}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>

            {/* Left Arrow *}
            <button 
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px', 
                height: '40px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronLeft size={24} color="#1f2937" />
            </button>

            {/* Right Arrow *}
            <button 
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px', 
                height: '40px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronRight size={24} color="#1f2937" />
            </button>

            {/* Dots Indicator *}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px'
            }}>
              {carouselImages.map((_, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    transition: 'background 0.3s'
                  }}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceGrid;
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowRight, ArrowLeft, MapPin, Mountain, Coffee, Map as MapIcon, Landmark, Compass, User, Smile, Globe, Home, Users, Calendar, Wallet, Loader2, Utensils, Search, Navigation, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OLA_MAPS_API_KEY = process.env.REACT_APP_OLA_MAPS_API_KEY || ""; 

const getRestaurantImage = (idx) => {
  const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1590846406792-0adc7f928f1e?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1466978913421-bac2e20c64a3?auto=format&fit=crop&w=500&q=60"
  ];
  return images[idx % images.length];
};

const ExperienceGrid = () => {
  const navigate = useNavigate();

  // --- 1. CATEGORY PAGINATION STATE ---
  const [catPage, setCatPage] = useState(0); 
  const CATS_PER_PAGE = 3;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); 
  
  // --- 2. MODAL & RESULTS STATE ---
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dynamicDestinations, setDynamicDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [destPage, setDestPage] = useState(0);
  const DEST_PER_PAGE = 8; 

  // --- 3. DISH & RESTAURANT DEEP-VIEW STATE ---
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  // --- QUERY MAPPING ---
  const queryMap = {
    "Mountains / Hills": "Hill stations", "Beaches / Coastline": "Beaches", "Forests / Jungles": "National parks",
    "Deserts": "Desert tourist places", "Lakes & Rivers": "Lakes", "Snow / Glaciers": "Ski resorts",
    "Valleys & Meadows": "Valleys", "Islands": "Islands", "Metro City": "Tourist places",
    "Heritage City": "Heritage sites", "Small Town": "Scenic towns", "Village Life": "Rural tourism",
    "Historical Monuments": "Monuments", "Temples / Spiritual Sites": "Temples", "Trekking / Hiking": "Trekking trails",
    "Rafting / Kayaking": "River rafting", "Yoga & Meditation": "Yoga centers", "Street Food": "Street food",
    "Local Cuisine": "Traditional cuisine", "Seafood": "Seafood", "Vegetarian / Vegan Friendly": "Vegetarian",
    "Wine / Brewery Towns": "Breweries", "Cafés & Coffee Culture": "Cafe",
    "Eco-Friendly": "Ecotourism", "Community-Based Tourism": "Community tourism", "Farm Stays": "Farm stays",
    "Party Destination": "Party destinations", "Festival Town": "Cultural festivals", "Nightlife": "Nightlife",
    "Luxury Resorts": "Luxury resorts", "Camping / Glamping": "Camping", "Backpackers": "Backpacking",
    "Monsoon Magic": "Monsoon destinations", "Winter Wonderland": "Winter destinations"
  };

  // --- HYBRID FETCH FUNCTION (MIXED GRID) ---
  const performSearch = async (subCat, userSearch = "") => {
    setLoading(true);
    setDynamicDestinations([]);
    setDestPage(0); 
    setSelectedRestaurant(null);
    setSelectedDish(null);

    const isFood = selectedCategory?.title.includes("Food");
    const coreTerm = queryMap[subCat] || subCat;

    try {
      if (isFood) {
        let dishes = [];
        let restaurants = [];

        // 1. Fetch Dishes Overview
        let mealUrl = userSearch ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(userSearch)}` : (subCat.includes('Seafood') ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood' : subCat.includes('Vegetarian') ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian' : 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        try {
          const mealRes = await fetch(mealUrl);
          const mealData = await mealRes.json();
          if (mealData.meals) {
            dishes = mealData.meals.map(m => ({
              id: m.idMeal, name: m.strMeal,
              desc: `Click to view authentic recipe & local restaurants serving this.`,
              img: m.strMealThumb, isFood: true, isDish: true
            }));
            if (userSearch && mealUrl.includes('filter')) dishes = dishes.filter(d => d.name.toLowerCase().includes(userSearch.toLowerCase()));
          }
        } catch(e) {}

        // 2. Fetch Restaurants Overview
        try {
          const restQuery = userSearch ? `${userSearch} restaurant India` : `${coreTerm} restaurant India`;
          if (OLA_MAPS_API_KEY) {
            const oRes = await fetch(`https://api.olamaps.io/places/v1/textsearch?query=${encodeURIComponent(restQuery)}&api_key=${OLA_MAPS_API_KEY}`);
            const oData = await oRes.json();
            if (oData?.results) {
              restaurants = oData.results.map((r, idx) => ({
                id: r.place_id, name: r.name, desc: r.formatted_address || "Local Restaurant",
                img: getRestaurantImage(idx), isFood: true, isRestaurant: true, lat: r.geometry?.location?.lat, lng: r.geometry?.location?.lng
              }));
            }
          } 
          if (restaurants.length === 0) {
            const restRes = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(restQuery)}&limit=15`);
            const restData = await restRes.json();
            if (restData.features) {
              restaurants = restData.features.filter(f => f.properties.countrycode === 'IN' && f.properties.name).map((f, idx) => ({
                  id: f.properties.osm_id, name: f.properties.name,
                  desc: [f.properties.street, f.properties.city, f.properties.state].filter(Boolean).join(', ') || "Local Eatery",
                  img: getRestaurantImage(idx + 3), isFood: true, isRestaurant: true, lat: f.geometry?.coordinates[1], lng: f.geometry?.coordinates[0]
                }));
            }
          }
        } catch(e) {}

        // Combine and Shuffle
        let combined = [];
        const maxLength = Math.max(dishes.length, restaurants.length);
        for(let i=0; i<maxLength; i++) {
          if (dishes[i]) combined.push(dishes[i]);
          if (restaurants[i]) combined.push(restaurants[i]);
        }
        setDynamicDestinations(combined);

      } else {
        // 🏔️ WIKIPEDIA ENGINE FOR PLACES
        let finalQuery = userSearch ? `${userSearch} ${coreTerm} India` : `${coreTerm} in India`;
        const exclusions = "-person -biography -film -actor -actress -party -politics -ministry -organization -company -limited -corporation -association";
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(finalQuery + " " + exclusions)}&gsrlimit=50&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.query && data.query.pages) {
          let results = Object.values(data.query.pages);
          results = results.filter(item => {
            if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;
            const title = item.title.toLowerCase(); const text = item.extract.toLowerCase();
            const badTitles = ["culture of", "history of", "politics of", "economy of", "timeline", "list of"];
            if (badTitles.some(t => title.includes(t))) return false;
            if (text.includes("born") || text.includes("died") || text.includes("politician")) return false;
            return ["india", "state", "pradesh", "kerala", "goa", "delhi", "mumbai"].some(kw => text.includes(kw) || title.includes(kw));
          });
          const formatted = results.map(item => ({ id: item.pageid, name: item.title, desc: item.extract, img: item.thumbnail.source, isFood: false }));
          setDynamicDestinations(userSearch ? formatted : formatted.sort(() => 0.5 - Math.random()));
        }
      }
    } catch (error) { console.error("Fetch Error:", error); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (selectedSubCategory) { setSearchTerm(""); performSearch(selectedSubCategory, ""); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubCategory]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) performSearch(selectedSubCategory, searchTerm);
  };

  // --- DISH DEEP-DIVE HANDLER (FETCHES RECIPE & RESTAURANTS) ---
  const handleDishClick = async (dish) => {
    setSelectedDish(dish); // Load UI shell immediately
    setLoading(true);
    setDynamicDestinations([]); // Clear generic grid, replace with restaurants
    setDestPage(0);

    try {
      // 1. Fetch Deep Recipe
      const mealRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dish.id}`);
      const mealData = await mealRes.json();
      if (mealData.meals && mealData.meals.length > 0) {
        setSelectedDish(prev => ({ ...prev, recipe: mealData.meals[0].strInstructions }));
      }

      // 2. Fetch Restaurants specifically for this dish
      const restQuery = `${dish.name} restaurant India`;
      let restaurants = [];
      if (OLA_MAPS_API_KEY) {
        const oRes = await fetch(`https://api.olamaps.io/places/v1/textsearch?query=${encodeURIComponent(restQuery)}&api_key=${OLA_MAPS_API_KEY}`);
        const oData = await oRes.json();
        if (oData?.results) {
          restaurants = oData.results.map((r, idx) => ({
            id: r.place_id, name: r.name, desc: r.formatted_address || "Famous for this dish!",
            img: getRestaurantImage(idx), isFood: true, isRestaurant: true, lat: r.geometry?.location?.lat, lng: r.geometry?.location?.lng
          }));
        }
      }
      if (restaurants.length === 0) {
        const restRes = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(restQuery)}&limit=15`);
        const restData = await restRes.json();
        if (restData.features) {
          restaurants = restData.features.filter(f => f.properties.countrycode === 'IN' && f.properties.name).map((f, idx) => ({
            id: f.properties.osm_id, name: f.properties.name,
            desc: [f.properties.street, f.properties.city, f.properties.state].filter(Boolean).join(', ') || "Famous for this dish!",
            img: getRestaurantImage(idx + 2), isFood: true, isRestaurant: true, lat: f.geometry?.coordinates[1], lng: f.geometry?.coordinates[0]
          }));
        }
      }
      setDynamicDestinations(restaurants);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // --- INTERACTIVE ROUTER ---
  const handleCardClick = (dest) => {
    if (dest.isDish) {
      handleDishClick(dest);
    } else if (dest.isRestaurant && dest.lat && dest.lng) {
      setSelectedRestaurant(dest);
    } else {
      navigate(`/place/${dest.name}`);
    }
  };

  // --- RESTAURANT MAP INITIALIZATION ---
  useEffect(() => {
    if (selectedRestaurant && mapContainerRef.current) {
      const initMap = () => {
        if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
        const mapLayout = { version: 8, sources: { 'osm-tiles': { type: 'raster', tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256 } }, layers: [{ id: 'osm-tiles-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }] };
        const map = new window.maplibregl.Map({
          container: mapContainerRef.current, style: mapLayout, center: [selectedRestaurant.lng, selectedRestaurant.lat],
          zoom: 15, attributionControl: false
        });
        map.addControl(new window.maplibregl.NavigationControl(), 'top-right');
        const el = document.createElement('div');
        el.innerHTML = `<div style="background-color: #ea580c; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`;
        new window.maplibregl.Marker(el).setLngLat([selectedRestaurant.lng, selectedRestaurant.lat]).addTo(map);
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
  }, [selectedRestaurant]);

  // --- DATA WITH ALL 12 CATEGORIES ---
  const categories = [
    {
      id: 1, title: "Nature & Landscape", icon: Mountain, subtitle: "What the place looks and feels like", color: "#dcfce7", textColor: "#166534",
      items: ["Mountains / Hills", "Beaches / Coastline", "Forests / Jungles", "Deserts", "Lakes & Rivers", "Snow / Glaciers", "Valleys & Meadows", "Islands"],
      images: ["https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 2, title: "Food & Culinary", icon: Coffee, subtitle: "Authentic recipes & restaurants", color: "#fef9c3", textColor: "#854d0e",
      items: ["Street Food", "Local Cuisine", "Cafés & Coffee Culture", "Seafood", "Vegetarian / Vegan Friendly", "Wine / Brewery Towns"],
      images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 3, title: "Urban vs Rural", icon: MapIcon, subtitle: "Pace & vibe", color: "#dbeafe", textColor: "#1e40af",
      items: ["Metro City", "Heritage City", "Small Town", "Village Life", "Remote / Off-grid"],
      images: ["https://www.asiapathways-adbi.org/wp-content/uploads/2022/10/sustainable-urban-development-in-india-emerging-issues-and-the-way-forward.jpg", "https://www.orfonline.org/public/uploads/posts/image/bombay-building-city.jpg", "https://i.guim.co.uk/img/media/d5fbb6afdf7a70f80c9fd5f08498de23ec03c460/0_157_3353_2012/master/3353.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=c2343c467b49d2aae916df87bd47a775"]
    },
    {
      id: 4, title: "Culture & Heritage", icon: Landmark, subtitle: "Stories, people, history", color: "#ffedd5", textColor: "#9a3412",
      items: ["Historical Monuments", "Temples / Spiritual Sites", "Art & Craft Hubs", "Tribal / Indigenous Culture", "Music & Dance Traditions", "Museums & Architecture", "UNESCO Sites"],
      images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 5, title: "Adventure Level", icon: Compass, subtitle: "What you do there", color: "#fee2e2", textColor: "#991b1b",
      items: ["Trekking / Hiking", "Rafting / Kayaking", "Scuba / Snorkeling", "Paragliding", "Skiing / Snowboarding", "Cycling Routes", "Safaris & Wildlife"],
      images: ["https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544551763-46a8723ba3f9?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 6, title: "Wellness & Slow Travel", icon: Smile, subtitle: "How it makes you feel", color: "#f3e8ff", textColor: "#6b21a8",
      items: ["Yoga & Meditation", "Ayurveda / Healing", "Digital Detox", "Silent Retreats", "Nature Immersion", "Mindfulness Stays"],
      images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1599447421405-0c174ac2526e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 7, title: "Social & Festive", icon: Users, subtitle: "Energy & crowd", color: "#fce7f3", textColor: "#9d174d",
      items: ["Party Destination", "Festival Town", "Nightlife", "Cultural Events", "Quiet & Peaceful", "Romantic Escapes"],
      images: ["https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 8, title: "Sustainability", icon: Globe, subtitle: "Impact-driven travel", color: "#ecfccb", textColor: "#3f6212",
      items: ["Eco-Friendly", "Community-Based Tourism", "Farm Stays", "Local-Owned Experiences", "Low-Impact Travel", "Conservation Areas"],
      images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 9, title: "Stay Experience", icon: Home, subtitle: "Where & how you live", color: "#e0e7ff", textColor: "#3730a3",
      items: ["Luxury Resorts", "Boutique Hotels", "Homestays", "Eco Lodges", "Camping / Glamping", "Hostels"],
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 10, title: "Travel Style", icon: User, subtitle: "Who it’s best for", color: "#ccfbf1", textColor: "#115e59",
      items: ["Solo Travelers", "Couples", "Families", "Group Trips", "Backpackers", "Digital Nomads", "Senior-Friendly"],
      images: ["https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 11, title: "Time & Seasonality", icon: Calendar, subtitle: "When to go", color: "#ffedd5", textColor: "#9a3412",
      items: ["All-Season Destination", "Monsoon Magic", "Winter Wonderland", "Summer Escape", "Weekend Getaway", "Long-Stay Friendly"],
      images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 12, title: "Budget & Accessibility", icon: Wallet, subtitle: "Practical filters", color: "#f1f5f9", textColor: "#334155",
      items: ["Budget-Friendly", "Mid-Range", "Luxury", "Easy to Reach", "Offbeat / Requires Effort", "Road Trip Friendly"],
      images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=800&q=80"]
    }
  ];

  // --- PAGINATION CALCULATIONS ---
  const totalCatPages = Math.ceil(categories.length / CATS_PER_PAGE);
  const visibleCards = categories.slice(catPage * CATS_PER_PAGE, (catPage + 1) * CATS_PER_PAGE);
  
  const totalDestPages = Math.ceil(dynamicDestinations.length / DEST_PER_PAGE);
  const visibleDestinations = dynamicDestinations.slice(destPage * DEST_PER_PAGE, (destPage + 1) * DEST_PER_PAGE);

  const activeCategory = categories[activeCategoryIndex] || categories[0];
  const currentHeroImage = activeCategory.images[currentSlideIndex % activeCategory.images.length]; 

  const scrollSlideLeft = () => setCurrentSlideIndex(prev => (prev === 0 ? activeCategory.images.length - 1 : prev - 1));
  const scrollSlideRight = () => setCurrentSlideIndex(prev => (prev + 1) % activeCategory.images.length);

  // Reusable Restaurant Card Component for both Grid and Dish views
  const renderCard = (dest, idx) => (
    <div key={idx} onClick={() => handleCardClick(dest)} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ height: '140px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}><img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dest.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {dest.isDish && <><Utensils size={12} color="#ea580c" /> Indian Dish</>}
          {dest.isRestaurant && <><Coffee size={12} color="#0284c7" /> Restaurant</>}
          {!dest.isFood && <><MapIcon size={12} color="#16a34a" /> Destination</>}
        </div>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '5px', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dest.desc}</p>
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: dest.isDish ? '#ea580c' : dest.isRestaurant ? '#0284c7' : '#16a34a', fontSize: '12px', fontWeight: 'bold' }}>
          {dest.isDish ? ( <><span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><BookOpen size={14} /> View Recipe</span> <ArrowRight size={14}/></> ) : 
           dest.isRestaurant ? ( <><span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><MapPin size={14} /> View on Map</span> <ArrowRight size={14}/></> ) : 
           ( <><span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Compass size={14} /> Explore Destination</span> <ArrowRight size={14}/></> )}
        </div>
      </div>
    </div>
  );

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#111827' }}>
          Curated <span style={{ color: '#16a34a' }}>Experiences</span>
        </h2>

        {/* --- MAIN PAGE CONTENT --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', alignItems: 'stretch' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280' }}>Page {catPage + 1} of {totalCatPages}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setCatPage(p => Math.max(0, p - 1))} disabled={catPage === 0} style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e5e7eb', cursor: catPage === 0 ? 'not-allowed' : 'pointer', backgroundColor: 'white', opacity: catPage === 0 ? 0.5 : 1 }}><ChevronLeft size={20} color="#374151" /></button>
                <button onClick={() => setCatPage(p => Math.min(totalCatPages - 1, p + 1))} disabled={catPage === totalCatPages - 1} style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e5e7eb', cursor: catPage === totalCatPages - 1 ? 'not-allowed' : 'pointer', backgroundColor: 'white', opacity: catPage === totalCatPages - 1 ? 0.5 : 1 }}><ChevronRight size={20} color="#374151" /></button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              {visibleCards.map((cat) => (
                <div 
                  key={cat.id} onClick={() => { setSelectedCategory(cat); setSelectedSubCategory(null); }}
                  onMouseEnter={() => { setActiveCategoryIndex(categories.indexOf(cat)); setCurrentSlideIndex(0); }}
                  style={{ backgroundColor: cat.color, borderRadius: '24px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.3s ease', border: cat.id === activeCategory?.id ? `2px solid ${cat.textColor}` : '2px solid transparent', transform: cat.id === activeCategory?.id ? 'scale(1.02)' : 'scale(1)', minHeight: '320px' }}
                >
                  <div style={{ marginBottom: '20px', color: cat.textColor }}><cat.icon size={40} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: cat.textColor, marginBottom: '10px', lineHeight: '1.3' }}>{cat.title}</h3>
                  <p style={{ fontSize: '13px', color: cat.textColor, opacity: 0.9, lineHeight: '1.5' }}>{cat.subtitle}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '600', color: cat.textColor }}>Explore <ArrowRight size={14} /></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: '400px' }}>
            <img src={currentHeroImage} alt={activeCategory?.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>{activeCategory?.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Discover the best of {activeCategory?.title}</p>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 20px', zIndex: 10 }}>
              <button onClick={scrollSlideLeft} style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}><ChevronLeft size={24} color="#1f2937" /></button>
              <button onClick={scrollSlideRight} style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}><ChevronRight size={24} color="#1f2937" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* --- NESTED MODAL SYSTEM --- */}
      {selectedCategory && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '900px', borderRadius: '24px', overflow: 'hidden', position: 'relative', height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            
            {/* VIEW 4: RESTAURANT MAP ROUTING */}
            {selectedRestaurant ? (
              <>
                <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={() => setSelectedRestaurant(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={24} color="#374151" /></button>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{selectedRestaurant.name}</h2>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Restaurant View & Routing</p>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedRestaurant(null); setSelectedDish(null); setSelectedCategory(null); }} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
                </div>
                
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                  <div style={{ width: window.innerWidth < 768 ? '100%' : '40%', padding: '30px', backgroundColor: '#f9fafb', overflowY: 'auto', borderRight: '1px solid #e5e7eb' }}>
                    <img src={selectedRestaurant.img} alt={selectedRestaurant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }} />
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}><Coffee size={14} /> Local Restaurant</div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>{selectedRestaurant.name}</h3>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '30px' }}><MapPin size={14} style={{ display: 'inline', marginRight: '5px' }}/> {selectedRestaurant.desc}</p>
                    
                    <button onClick={() => navigate('/plan', { state: { prefillPackage: { title: `Dining at ${selectedRestaurant.name}`, location: selectedRestaurant.name, description: selectedRestaurant.desc } } })} style={{ width: '100%', padding: '16px', backgroundColor: '#16a34a', color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#16a34a'}>
                      <Navigation size={18} /> Plan Route to Here
                    </button>
                  </div>
                  <div style={{ flex: 1, position: 'relative', minHeight: '300px' }}>
                    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
                  </div>
                </div>
              </>
            ) : 
            
            /* VIEW 3: DISH RECIPE & RESTAURANTS LIST */
            selectedDish ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={() => { setSelectedDish(null); performSearch(selectedSubCategory, ""); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={24} color="#374151" /></button>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{selectedDish.name}</h2>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Recipe & Locations</p>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedDish(null); setSelectedCategory(null); }} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
                </div>

                <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }} className="hide-scrollbar">
                  {/* Dish Recipe Header */}
                  <div style={{ display: 'flex', gap: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                    <img src={selectedDish.img} alt={selectedDish.name} style={{ width: window.innerWidth < 768 ? '100%' : '300px', height: '300px', objectFit: 'cover', borderRadius: '16px', flexShrink: 0 }} />
                    <div style={{ flex: 1, overflowY: 'auto', maxHeight: '300px', paddingRight: '10px' }} className="hide-scrollbar">
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#fff7ed', color: '#ea580c', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>
                        <Utensils size={14} /> Authentic Recipe
                      </div>
                      <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', marginBottom: '15px' }}>{selectedDish.name}</h3>
                      {loading && !selectedDish.recipe ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280' }}><Loader2 className="animate-spin" size={18}/> Loading recipe details...</div>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{selectedDish.recipe || "Detailed recipe instructions are not available for this specific dish."}</p>
                      )}
                    </div>
                  </div>

                  {/* Restaurants List */}
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin color="#0284c7" /> Find it at these Restaurants</h3>
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin" size={40} color="#16a34a" /></div>
                  ) : visibleDestinations.length > 0 ? (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {visibleDestinations.map((dest, idx) => renderCard(dest, idx))}
                      </div>
                      {totalDestPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: 'white', borderRadius: '50px', border: '1px solid #e5e7eb', marginTop: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                          <button onClick={() => setDestPage(p => Math.max(0, p - 1))} disabled={destPage === 0} style={{ background: 'none', border: 'none', cursor: destPage === 0 ? 'not-allowed' : 'pointer', color: destPage === 0 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}><ChevronLeft size={18} /> Prev</button>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Page {destPage + 1} of {totalDestPages}</span>
                          <button onClick={() => setDestPage(p => Math.min(totalDestPages - 1, p + 1))} disabled={destPage === totalDestPages - 1} style={{ background: 'none', border: 'none', cursor: destPage === totalDestPages - 1 ? 'not-allowed' : 'pointer', color: destPage === totalDestPages - 1 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}>Next <ChevronRight size={18} /></button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p style={{ color: '#6b7280' }}>No specific restaurants found. Try exploring locally!</p>
                  )}
                </div>
              </div>
            ) : 
            
            /* VIEW 2: STANDARD SEARCH & RESULTS GRID */
            selectedSubCategory ? (
              <>
                <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <button onClick={() => { setSelectedSubCategory(null); setSearchTerm(""); setDestPage(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={24} color="#374151" /></button>
                      <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{selectedSubCategory}</h2>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>{selectedCategory.title.includes("Food") ? "Dishes & Restaurants" : "Curated destinations in India"}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedCategory(null)} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
                  </div>
                  
                  <form onSubmit={handleManualSearch} style={{ position: 'relative' }}>
                    <input type="text" placeholder={selectedCategory.title.includes('Food') ? "Search for a dish or location (e.g. 'Mumbai' or 'Chicken')" : "Search destinations..."} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#f9fafb' }} />
                    <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                  </form>
                </div>

                <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {loading && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}><Loader2 className="animate-spin" size={40} color="#16a34a" /><p style={{ marginTop: '10px', color: '#6b7280' }}>Exploring...</p></div>}
                  
                  {!loading && visibleDestinations.length > 0 && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', flex: 1, alignContent: 'start' }}>
                        {visibleDestinations.map((dest, idx) => renderCard(dest, idx))}
                      </div>

                      {totalDestPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: 'white', borderRadius: '50px', border: '1px solid #e5e7eb', marginTop: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                          <button onClick={() => setDestPage(p => Math.max(0, p - 1))} disabled={destPage === 0} style={{ background: 'none', border: 'none', cursor: destPage === 0 ? 'not-allowed' : 'pointer', color: destPage === 0 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}><ChevronLeft size={18} /> Prev</button>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Page {destPage + 1} of {totalDestPages}</span>
                          <button onClick={() => setDestPage(p => Math.min(totalDestPages - 1, p + 1))} disabled={destPage === totalDestPages - 1} style={{ background: 'none', border: 'none', cursor: destPage === totalDestPages - 1 ? 'not-allowed' : 'pointer', color: destPage === totalDestPages - 1 ? '#d1d5db' : '#0284c7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '13px', padding: 0 }}>Next <ChevronRight size={18} /></button>
                        </div>
                      )}
                    </>
                  )}
                  {!loading && dynamicDestinations.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}><p>No results found for "{searchTerm || selectedSubCategory}". Try a different search!</p></div>}
                </div>
              </>
            ) : 
            
            /* VIEW 1: SUB-CATEGORY LIST */
            (
              <>
                <div style={{ padding: '30px', backgroundColor: selectedCategory.color }}>
                  <button onClick={() => setSelectedCategory(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
                  <div style={{ color: selectedCategory.textColor, marginBottom: '15px' }}><selectedCategory.icon size={48} /></div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: selectedCategory.textColor, marginBottom: '5px' }}>{selectedCategory.title}</h2>
                  <p style={{ fontSize: '16px', color: selectedCategory.textColor, opacity: 0.9 }}>Select a specific interest to explore</p>
                </div>
                <div style={{ padding: '30px', overflowY: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                    {selectedCategory.items.map((item, idx) => (
                      <div key={idx} onClick={() => setSelectedSubCategory(item)} style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', color: '#374151' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = selectedCategory.color; e.currentTarget.style.borderColor = 'transparent'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                        {item} <ArrowRight size={18} color={selectedCategory.textColor} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default ExperienceGrid;