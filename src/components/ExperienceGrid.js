import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowRight, ArrowLeft, MapPin, Mountain, Coffee, Map, Landmark, Compass, User, Smile, Globe, Home, Users, Calendar, Wallet, Loader2, Utensils, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperienceGrid = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [cardScrollIndex, setCardScrollIndex] = useState(0); 
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); 
  
  // Modal & Data States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dynamicDestinations, setDynamicDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  
  // Cache and Refs
  const cache = useRef(new Map());
  const searchTimeoutRef = useRef(null);

  // --- 1. ENHANCED SEARCH QUERY MAPPING ---
  // Using more specific Wikipedia categories and search terms for better relevance
  const queryMap = {
    "Mountains / Hills": { term: "Hill station", category: "Hill_stations_in_India", keywords: ["hill station", "mountain", "altitude", "scenic"] },
    "Beaches / Coastline": { term: "Beach", category: "Beaches_of_India", keywords: ["beach", "coast", "sea", "shore", "ocean"] },
    "Forests / Jungles": { term: "National park", category: "National_parks_of_India", keywords: ["forest", "jungle", "wildlife", "sanctuary", "national park"] },
    "Deserts": { term: "Desert", category: "Deserts_of_India", keywords: ["desert", "sand", "dunes", "arid"] },
    "Lakes & Rivers": { term: "Lake", category: "Lakes_of_India", keywords: ["lake", "river", "water", "reservoir"] },
    "Snow / Glaciers": { term: "Snow", category: "Ski_areas_and_resorts_in_India", keywords: ["snow", "ski", "glacier", "winter", "himalaya"] },
    "Valleys & Meadows": { term: "Valley", category: "Valleys_of_India", keywords: ["valley", "meadow", "grassland"] },
    "Islands": { term: "Island", category: "Islands_of_India", keywords: ["island", "archipelago"] },
    "Metro City": { term: "Metropolitan city", category: "Metropolitan_cities_in_India", keywords: ["city", "metropolitan", "urban", "capital"] },
    "Heritage City": { term: "Heritage city", category: "Historic_sites_in_India", keywords: ["heritage", "historic", "ancient", "old city"] },
    "Small Town": { term: "Town", category: "Towns_in_India", keywords: ["town", "small city", "municipality"] },
    "Village Life": { term: "Village", category: "Villages_in_India", keywords: ["village", "rural", "countryside"] },
    "Historical Monuments": { term: "Monument", category: "Monuments_and_memorials_in_India", keywords: ["monument", "memorial", "fort", "palace"] },
    "Temples / Spiritual Sites": { term: "Temple", category: "Hindu_temples_in_India", keywords: ["temple", "shrine", "spiritual", "pilgrimage"] },
    "Trekking / Hiking": { term: "Trekking", category: "Hiking_trails_in_India", keywords: ["trek", "hiking", "trail", "climb"] },
    "Rafting / Kayaking": { term: "River rafting", category: "Rivers_of_India", keywords: ["rafting", "kayaking", "water sports", "rapids"] },
    "Yoga & Meditation": { term: "Yoga", category: "Yoga", keywords: ["yoga", "meditation", "ashram", "spiritual"] },
    "Street Food": { term: "Street food", category: "Indian_street_food", keywords: ["street food", "snack", "chaat", "vendor"] },
    "Local Cuisine": { term: "Indian cuisine", category: "Indian_cuisine", keywords: ["cuisine", "dish", "food", "recipe", "traditional"] },
    "Seafood": { term: "Seafood", category: "Indian_seafood_dishes", keywords: ["seafood", "fish", "prawn", "crab", "coastal"] },
    "Vegetarian / Vegan Friendly": { term: "Vegetarian food", category: "Indian_vegetarian_dishes", keywords: ["vegetarian", "vegan", "plant-based", "dal", "paneer"] }
  };
  
  // --- SUGGESTED SEARCH TERMS ---
  const getSuggestedTerms = (subCat, isFood) => {
    const suggestions = {
      "Mountains / Hills": ["Shimla", "Manali", "Ooty", "Darjeeling", "Munnar"],
      "Beaches / Coastline": ["Goa", "Kerala", "Andaman", "Gokarna", "Puri"],
      "Forests / Jungles": ["Jim Corbett", "Ranthambore", "Bandhavgarh", "Kaziranga"],
      "Temples / Spiritual Sites": ["Varanasi", "Tirupati", "Golden Temple", "Madurai"],
      "Street Food": ["Chaat", "Vada Pav", "Pani Puri", "Samosa"],
      "Local Cuisine": ["Biryani", "Thali", "Dosa", "Butter Chicken"]
    };
    return suggestions[subCat] || (isFood ? ["Paneer", "Curry", "Naan"] : ["Mumbai", "Delhi", "Jaipur"]);
  };

  // --- 2. RELEVANCE SCORING FUNCTION ---
  const calculateRelevance = (item, searchTerm, queryConfig) => {
    let score = 0;
    const title = item.title.toLowerCase();
    const text = item.extract.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    // Exact title match (highest priority)
    if (search && title === search) score += 100;
    if (search && title.includes(search)) score += 50;
    
    // Keyword matching
    if (queryConfig && queryConfig.keywords) {
      const matches = queryConfig.keywords.filter(kw => text.includes(kw) || title.includes(kw));
      score += matches.length * 10;
    }
    
    // Length penalty (prefer concise, specific articles)
    if (text.length < 500) score += 5;
    if (text.length > 2000) score -= 5;
    
    // Title length (prefer shorter, specific titles)
    if (title.split(' ').length <= 3) score += 5;
    
    return score;
  };

  // --- 3. ENHANCED FETCH FUNCTION WITH RETRY & CACHING ---
  const performWikiSearch = async (subCat, userSearch = "", attempt = 0) => {
    const MAX_RETRIES = 2;
    const isFood = selectedCategory?.title.includes("Food");
    
    // Check cache first
    const cacheKey = `${subCat}-${userSearch}-${isFood}`;
    if (cache.current.has(cacheKey)) {
      setDynamicDestinations(cache.current.get(cacheKey));
      setLoading(false);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setDynamicDestinations([]);

    const queryConfig = queryMap[subCat] || { term: subCat, keywords: [] };
    const coreTerm = queryConfig.term || subCat;

    try {
      let url;
      
      if (userSearch) {
        // USER SEARCH: Enhanced query with location context
        const searchQuery = `${userSearch} ${coreTerm} India tourism travel`;
        const exclusions = "-person -biography -film -actor -actress -party -politics -ministry";
        const apiQuery = `${searchQuery} ${exclusions}`;
        url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(apiQuery)}&gsrlimit=30&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
      } else {
        // AUTO LOAD: Try category-based search first, fallback to text search
        if (queryConfig.category) {
          // Use Wikipedia category for precise results
          url = `https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:${queryConfig.category}&gcmlimit=30&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
        } else {
          // Fallback to enhanced search
          const searchQuery = isFood 
            ? `${coreTerm} Indian dish cuisine recipe`
            : `${coreTerm} India tourist destination place`;
          const exclusions = "-person -biography -film -actor";
          url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchQuery + ' ' + exclusions)}&gsrlimit=30&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
        }
      }
      
      const response = await fetch(url, { 
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();

      if (data.query && data.query.pages) {
        let results = Object.values(data.query.pages);

        // ENHANCED FILTERING
        results = results.filter(item => {
          if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;

          const title = item.title.toLowerCase();
          const text = item.extract.toLowerCase();
          
          // Block meta/overview articles
          const badTitles = ["culture of", "history of", "politics of", "economy of", "timeline", "list of", "demographics", "climate of", "outline of", "index of"];
          if (badTitles.some(t => title.includes(t))) return false;

          // Block non-India content (except for user search)
          if (!userSearch) {
            const foreignCountries = ["pakistan", "china", "nepal", "bangladesh", "sri lanka", "myanmar"];
            if (foreignCountries.some(c => title.includes(c) && !title.includes("india"))) return false;
          }

          // Block people/organizations
          const personIndicators = ["born", "died", "actress", "actor", "politician", "biography", "cricketer", "footballer"];
          if (personIndicators.some(p => text.includes(" " + p + " "))) return false;

          // Context validation
          const indianKeywords = ["india", "indian", "pradesh", "state", "city", "town", "village"];
          const contextKeywords = isFood 
            ? ["dish", "food", "cuisine", "curry", "snack", "sweet", "recipe", "prepared", "served"]
            : ["located", "situated", "district", "region", "tourist", "destination", "place", "known for"];

          const hasIndiaContext = indianKeywords.some(kw => text.includes(kw) || title.includes(kw));
          const hasRelevantContext = contextKeywords.some(kw => text.includes(kw));

          return hasIndiaContext || hasRelevantContext;
        });

        // RELEVANCE SCORING & SORTING
        const scored = results.map(item => ({
          name: item.title,
          desc: item.extract,
          img: item.thumbnail.source,
          isFood: isFood,
          relevanceScore: calculateRelevance(item, userSearch, queryConfig)
        }));

        // Sort by relevance (keep Wikipedia's order if no user search)
        const sorted = userSearch 
          ? scored.sort((a, b) => b.relevanceScore - a.relevanceScore)
          : scored;
        
        const finalResults = sorted.slice(0, 24); // Top 24 results
        
        // Cache the results
        cache.current.set(cacheKey, finalResults);
        setDynamicDestinations(finalResults);
        setError(null);
        setRetryCount(0);
        
      } else {
        // No results found
        setDynamicDestinations([]);
        setError(null);
      }
    } catch (error) {
      console.error("Wiki Fetch Error:", error);
      
      // RETRY LOGIC
      if (attempt < MAX_RETRIES) {
        setRetryCount(attempt + 1);
        setTimeout(() => performWikiSearch(subCat, userSearch, attempt + 1), 1000 * (attempt + 1));
        return;
      }
      
      // Show user-friendly error
      setError({
        message: "Unable to load destinations. Please check your connection and try again.",
        retry: () => performWikiSearch(subCat, userSearch, 0)
      });
    } finally {
      if (attempt >= MAX_RETRIES || error === null) {
        setLoading(false);
      }
    }
  };

  // --- 4. EFFECTS & HANDLERS ---

  // Auto-load when entering a sub-category
  useEffect(() => {
    if (selectedSubCategory) {
      setSearchTerm(""); // Reset search bar
      performWikiSearch(selectedSubCategory, "");
    }
  }, [selectedSubCategory]);

  // Debounced search handler
  const debouncedSearch = useCallback((term) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (term.trim()) {
        performWikiSearch(selectedSubCategory, term);
      }
    }, 600); // 600ms delay
  }, [selectedSubCategory]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Auto-search as user types (debounced)
    if (value.length >= 3) {
      debouncedSearch(value);
    } else if (value.length === 0) {
      // Reset to default results when search is cleared
      performWikiSearch(selectedSubCategory, "");
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (searchTerm.trim()) {
      performWikiSearch(selectedSubCategory, searchTerm);
    }
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // --- 5. LOADING SKELETON COMPONENT ---
  const LoadingSkeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ height: '160px', backgroundColor: '#e5e7eb', animation: 'pulse 2s infinite' }} />
          <div style={{ padding: '15px' }}>
            <div style={{ height: '16px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 2s infinite' }} />
            <div style={{ height: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px', width: '60%', animation: 'pulse 2s infinite' }} />
          </div>
        </div>
      ))}
    </div>
  );

  // --- 6. DATA: CATEGORIES LIST ---
  const categories = [
    {
      id: 1, title: "Nature & Landscape", icon: Mountain,
      subtitle: "What the place looks and feels like", color: "#dcfce7", textColor: "#166534",
      items: ["Mountains / Hills", "Beaches / Coastline", "Forests / Jungles", "Deserts", "Lakes & Rivers", "Snow / Glaciers", "Valleys & Meadows", "Islands"],
      images: ["https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 2, title: "Food & Culinary", icon: Coffee,
      subtitle: "What you eat & drink there", color: "#fef9c3", textColor: "#854d0e",
      items: ["Street Food", "Local Cuisine", "Cafés & Coffee Culture", "Seafood", "Vegetarian / Vegan Friendly", "Wine / Brewery Towns", "Food Trails & Experiences"],
      images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 3, title: "Urban vs Rural", icon: Map,
      subtitle: "Pace & vibe", color: "#dbeafe", textColor: "#1e40af",
      items: ["Metro City", "Heritage City", "Small Town", "Village Life", "Remote / Off-grid"],
      images: ["https://images.unsplash.com/photo-1449824913929-49aa711563b1?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1518182170546-0766ce6fec56?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 4, title: "Culture & Heritage", icon: Landmark,
      subtitle: "Stories, people, history", color: "#ffedd5", textColor: "#9a3412",
      items: ["Historical Monuments", "Temples / Spiritual Sites", "Art & Craft Hubs", "Tribal / Indigenous Culture", "Music & Dance Traditions", "Museums & Architecture", "UNESCO Sites"],
      images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 5, title: "Adventure Level", icon: Compass,
      subtitle: "What you do there", color: "#fee2e2", textColor: "#991b1b",
      items: ["Trekking / Hiking", "Rafting / Kayaking", "Scuba / Snorkeling", "Paragliding", "Skiing / Snowboarding", "Cycling Routes", "Safaris & Wildlife"],
      images: ["https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544551763-46a8723ba3f9?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 6, title: "Wellness & Slow Travel", icon: Smile,
      subtitle: "How it makes you feel", color: "#f3e8ff", textColor: "#6b21a8",
      items: ["Yoga & Meditation", "Ayurveda / Healing", "Digital Detox", "Silent Retreats", "Nature Immersion", "Mindfulness Stays"],
      images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1599447421405-0c174ac2526e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 7, title: "Social & Festive", icon: Users,
      subtitle: "Energy & crowd", color: "#fce7f3", textColor: "#9d174d",
      items: ["Party Destination", "Festival Town", "Nightlife", "Cultural Events", "Quiet & Peaceful", "Romantic Escapes"],
      images: ["https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 8, title: "Sustainability", icon: Globe,
      subtitle: "Impact-driven travel", color: "#ecfccb", textColor: "#3f6212",
      items: ["Eco-Friendly", "Community-Based Tourism", "Farm Stays", "Local-Owned Experiences", "Low-Impact Travel", "Conservation Areas"],
      images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 9, title: "Stay Experience", icon: Home,
      subtitle: "Where & how you live", color: "#e0e7ff", textColor: "#3730a3",
      items: ["Luxury Resorts", "Boutique Hotels", "Homestays", "Eco Lodges", "Camping / Glamping", "Hostels"],
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 10, title: "Travel Style", icon: User,
      subtitle: "Who it’s best for", color: "#ccfbf1", textColor: "#115e59",
      items: ["Solo Travelers", "Couples", "Families", "Group Trips", "Backpackers", "Digital Nomads", "Senior-Friendly"],
      images: ["https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 11, title: "Time & Seasonality", icon: Calendar,
      subtitle: "When to go", color: "#ffedd5", textColor: "#9a3412",
      items: ["All-Season Destination", "Monsoon Magic", "Winter Wonderland", "Summer Escape", "Weekend Getaway", "Long-Stay Friendly"],
      images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 12, title: "Budget & Accessibility", icon: Wallet,
      subtitle: "Practical filters", color: "#f1f5f9", textColor: "#334155",
      items: ["Budget-Friendly", "Mid-Range", "Luxury", "Easy to Reach", "Offbeat / Requires Effort", "Road Trip Friendly"],
      images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=800&q=80"]
    }
  ];

  // --- 7. HELPERS & HANDLERS ---
  const getSafeIndex = (index, length) => ((index % length) + length) % length;
  const visibleCards = [categories[getSafeIndex(cardScrollIndex, categories.length)], categories[getSafeIndex(cardScrollIndex + 1, categories.length)], categories[getSafeIndex(cardScrollIndex + 2, categories.length)]];
  const activeCategory = categories[getSafeIndex(activeCategoryIndex, categories.length)];
  const currentHeroImage = activeCategory.images[getSafeIndex(currentSlideIndex, activeCategory.images.length)]; 

  const scrollCardsLeft = () => setCardScrollIndex(prev => prev - 1);
  const scrollCardsRight = () => setCardScrollIndex(prev => prev + 1);
  const scrollSlideLeft = () => setCurrentSlideIndex(prev => prev - 1);
  const scrollSlideRight = () => setCurrentSlideIndex(prev => prev + 1);
  const handleDestinationClick = (destName) => navigate(`/place/${destName}`);

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#111827' }}>
          Curated <span style={{ color: '#16a34a' }}>Experiences</span>
        </h2>

        {/* --- MAIN GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', alignItems: 'stretch' }}>
          {/* Left: Card List */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '15px' }}>
              <button onClick={scrollCardsLeft} style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e5e7eb', cursor: 'pointer', backgroundColor: 'white' }}><ChevronLeft size={20} color="#374151" /></button>
              <button onClick={scrollCardsRight} style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e5e7eb', cursor: 'pointer', backgroundColor: 'white' }}><ChevronRight size={20} color="#374151" /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              {visibleCards.map((cat) => (
                <div 
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setSelectedSubCategory(null); }}
                  onMouseEnter={() => { setActiveCategoryIndex(categories.indexOf(cat)); setCurrentSlideIndex(0); }}
                  style={{
                    backgroundColor: cat.color, borderRadius: '24px', padding: '25px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                    border: cat.id === activeCategory.id ? `2px solid ${cat.textColor}` : '2px solid transparent',
                    transform: cat.id === activeCategory.id ? 'scale(1.02)' : 'scale(1)',
                    minHeight: '320px'
                  }}
                >
                  <div style={{ marginBottom: '20px', color: cat.textColor }}><cat.icon size={40} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: cat.textColor, marginBottom: '10px', lineHeight: '1.3' }}>{cat.title}</h3>
                  <p style={{ fontSize: '13px', color: cat.textColor, opacity: 0.9, lineHeight: '1.5' }}>{cat.subtitle}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '600', color: cat.textColor }}>Explore <ArrowRight size={14} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image Preview */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: '400px' }}>
            <img src={currentHeroImage} alt={activeCategory.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>{activeCategory.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Discover the best of {activeCategory.title}</p>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 20px', zIndex: 10 }}>
              <button onClick={scrollSlideLeft} style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}><ChevronLeft size={24} color="#1f2937" /></button>
              <button onClick={scrollSlideRight} style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}><ChevronRight size={24} color="#1f2937" /></button>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {activeCategory.images.map((_, idx) => (
                <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getSafeIndex(currentSlideIndex, activeCategory.images.length) === idx ? 'white' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedCategory && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', width: '100%', maxWidth: '900px', borderRadius: '24px', overflow: 'hidden', 
            position: 'relative', height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            
            {!selectedSubCategory ? (
              // SUB-CATEGORY LIST VIEW
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
            ) : (
              // SEARCH & RESULTS VIEW
              <>
                <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <button onClick={() => { setSelectedSubCategory(null); setSearchTerm(""); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={24} color="#374151" /></button>
                      <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{selectedSubCategory}</h2>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>{selectedCategory.title.includes("Food") ? "Famous Indian dishes" : "Curated destinations in India"}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedCategory(null)} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
                  </div>
                  
                  {/* SEARCH BAR */}
                  <form onSubmit={handleManualSearch} style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder={`Search in ${selectedSubCategory}... (e.g. "${selectedCategory.title.includes('Food') ? 'Paneer' : 'Vadodara'}")`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#f9fafb' }}
                    />
                    <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                  </form>
                </div>

                <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }}>
                  {/* ERROR STATE */}
                  {error && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', padding: '20px' }}>
                      <AlertCircle size={48} color="#dc2626" style={{ marginBottom: '15px' }} />
                      <p style={{ color: '#374151', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Oops! Something went wrong</p>
                      <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginBottom: '20px', maxWidth: '400px' }}>{error.message}</p>
                      <button onClick={error.retry} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#16a34a', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                        <RefreshCw size={16} /> Try Again
                      </button>
                    </div>
                  )}
                  
                  {/* LOADING STATE */}
                  {loading && !error && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', padding: '20px' }}>
                        <Loader2 className="animate-spin" size={32} color="#16a34a" style={{ marginRight: '10px' }} />
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>Discovering amazing places{retryCount > 0 ? ` (Retry ${retryCount}/${2})` : ''}...</p>
                      </div>
                      <LoadingSkeleton />
                    </div>
                  )}
                  
                  {/* RESULTS */}
                  {!loading && !error && dynamicDestinations.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                      {dynamicDestinations.map((dest, idx) => (
                        <div key={idx} onClick={() => handleDestinationClick(dest.name)} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                          <div style={{ height: '160px', overflow: 'hidden', backgroundColor: '#e5e7eb', position: 'relative' }}>
                            <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <div style={{ padding: '15px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dest.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6b7280' }}>{dest.isFood ? <Utensils size={12} /> : <MapPin size={12} />} {dest.isFood ? "Indian Dish" : "India"}</div>
                            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dest.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EMPTY STATE WITH SUGGESTIONS */}
                  {!loading && !error && dynamicDestinations.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                      <Search size={48} color="#d1d5db" style={{ marginBottom: '15px', display: 'inline-block' }} />
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>No results found</p>
                      <p style={{ fontSize: '14px', marginBottom: '20px' }}>We couldn't find any matches for "{searchTerm || selectedSubCategory}"</p>
                      <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '10px' }}>Try searching for:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                          {getSuggestedTerms(selectedSubCategory, selectedCategory?.title.includes('Food')).map((term, i) => (
                            <button key={i} onClick={() => { setSearchTerm(term); performWikiSearch(selectedSubCategory, term); }} style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = selectedCategory.color; e.target.style.borderColor = 'transparent'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.borderColor = '#e5e7eb'; }}>
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExperienceGrid;
