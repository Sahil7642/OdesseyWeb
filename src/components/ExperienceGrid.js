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

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowRight, ArrowLeft, MapPin, Mountain, Coffee, Map, Landmark, Compass, User, Smile, Globe, Home, Users, Calendar, Wallet, Loader2, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperienceGrid = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [cardScrollIndex, setCardScrollIndex] = useState(0); 
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dynamicDestinations, setDynamicDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. CATEGORIZED FOOD DATABASE (Strictly Separated) ---
  const foodDatabase = {
    "Vegetarian / Vegan Friendly": [
      "Dhokla", "Khandvi", "Undhiyu", "Puran Poli", "Misal Pav", "Pav Bhaji", "Vada Pav", 
      "Masala Dosa", "Idli", "Appam", "Puttu", "Bisi Bele Bath", "Pongal", "Avial",
      "Chole Bhature", "Aloo Tikki", "Dal Makhani", "Paneer Tikka", "Sarson Ka Saag", "Makki Di Roti",
      "Litti Chokha", "Thepla", "Dal Baati Churma", "Ker Sangri", "Gatte Ki Sabzi",
      "Kachori", "Samosa", "Bhel Puri", "Pani Puri", "Sev Puri", "Dahi Vada", "Sabudana Khichdi",
      "Khichdi", "Rajma", "Kadhi", "Modak", "Shrikhand", "Poha", "Upma", "Medu Vada"
    ],
    "Seafood": [
      "Goan Fish Curry", "Prawn Balchao", "Fish Recheado", "Crab Xec Xec", "Bebinca",
      "Machher Jhol", "Chingri Malai Curry", "Ilish Bhapa", "Sorse Ilish",
      "Meen Curry", "Karimeen Pollichathu", "Fish Molee", "Chemmeen Roast",
      "Mangalorean Fish Curry", "Kori Rotti", "Neer Dosa", "Kane Rava Fry",
      "Bombil Fry", "Kolambi Bhaat", "Tisrya Masala", "Surmai Fry"
    ],
    "Street Food": [
      "Vada Pav", "Pani Puri", "Pav Bhaji", "Aloo Tikki", "Chole Bhature", "Kathi Roll",
      "Dabeli", "Sev Puri", "Bhel Puri", "Momos", "Chowmein", "Egg Roll",
      "Litti Chokha", "Kachori", "Samosa", "Mirchi Bajji", "Paddu", "Poha Jalebi",
      "Ram Ladoo", "Daulat Ki Chaat", "Tunday Kabab", "Haleem", "Falooda"
    ],
    "Local Cuisine": [
      "Roganh Josh", "Yakhni", "Wazwan", "Gustaba", // Kashmir
      "Laal Maas", "Dal Baati Churma", "Ghevar", // Rajasthan
      "Litti Chokha", "Thekua", // Bihar
      "Dhokla", "Undhiyu", "Thepla", // Gujarat
      "Hyderabadi Biryani", "Mirchi Ka Salan", // Telangana
      "Mysore Pak", "Bisi Bele Bath", // Karnataka
      "Vindaloo", "Xacuti", "Sorpotel" // Goa
    ],
    "Sweets & Desserts": [ // Fallback for Cafe/Others if needed
      "Gulab Jamun", "Rasgulla", "Rasmalai", "Jalebi", "Kaju Katli", "Mysore Pak",
      "Sandesh", "Mishti Doi", "Gajar Ka Halwa", "Kheer", "Payasam", "Bebinca"
    ]
  };

  // --- 2. SEARCH QUERY MAPPING (For Places) ---
  const queryMap = {
    // Nature
    "Mountains / Hills": "Hill stations tourist places India",
    "Beaches / Coastline": "Famous beaches tourism India",
    "Forests / Jungles": "National parks wildlife sanctuaries India",
    "Deserts": "Desert tourist places Rajasthan Gujarat India",
    "Lakes & Rivers": "Famous lakes tourist places India",
    "Snow / Glaciers": "Snowfall tourist destinations India",
    "Valleys & Meadows": "Beautiful valleys tourist places India",
    "Islands": "Island tourist destinations India",
    
    // Urban vs Rural
    "Metro City": "Tourist attractions in Mumbai Delhi Bangalore Kolkata",
    "Heritage City": "Heritage cities Jaipur Varanasi Udaipur India",
    "Small Town": "Beautiful small towns tourist places India",
    "Village Life": "Cleanest villages rural tourism India",
    "Remote / Off-grid": "Remote offbeat tourist places India",

    // Culture
    "Historical Monuments": "Monuments of National Importance India",
    "Temples / Spiritual Sites": "Famous temples pilgrimage sites India",
    "Art & Craft Hubs": "Handicraft villages art hubs India",
    "Tribal / Indigenous Culture": "Tribal tourism villages India",
    "Music & Dance Traditions": "Cultural centers classical dance India",
    "Museums & Architecture": "Famous museums architectural wonders India",
    "UNESCO Sites": "UNESCO World Heritage Sites tourist places India",
    
    // Adventure
    "Trekking / Hiking": "Trekking peaks Himalayas India",
    "Rafting / Kayaking": "River rafting destinations Rishikesh India",
    "Scuba / Snorkeling": "Scuba diving sites Andaman India",
    "Paragliding": "Paragliding spots Bir Billing India",
    "Skiing / Snowboarding": "Skiing resorts Auli Gulmarg India",
    "Cycling Routes": "Cycling holidays scenic routes India",
    "Safaris & Wildlife": "Tiger safari national parks India",

    // Wellness
    "Yoga & Meditation": "Yoga ashrams Rishikesh India",
    "Ayurveda / Healing": "Ayurveda resorts Kerala India",
    "Digital Detox": "Digital detox destinations India",
    "Silent Retreats": "Vipassana meditation centers India",
    "Nature Immersion": "Nature resorts eco stays India",
    
    // Social
    "Party Destination": "Nightlife destinations Goa Mumbai India",
    "Festival Town": "Cities famous for festivals India",
    "Nightlife": "Best nightlife districts India",
    "Cultural Events": "Cultural festivals fairs India",
    "Quiet & Peaceful": "Peaceful quiet tourist places India",
    "Romantic Escapes": "Honeymoon destinations romantic places India",

    // Sustainability
    "Eco-Friendly": "Eco tourism destinations sustainable travel India",
    "Community-Based Tourism": "Community tourism village projects India",
    "Farm Stays": "Best farm stays agritourism India",
    "Conservation Areas": "Wildlife conservation reserves India",

    // Stay Experience
    "Luxury Resorts": "Luxury heritage palace hotels India",
    "Boutique Hotels": "Best boutique heritage hotels India",
    "Homestays": "Famous homestays local experience India",
    "Eco Lodges": "Eco friendly jungle lodges India",
    "Camping / Glamping": "Best camping sites glamping India",
    "Hostels": "Backpacker hostels tourist places India",

    // Travel Style
    "Solo Travelers": "Safe solo travel destinations India",
    "Couples": "Romantic honeymoon places India",
    "Families": "Family holiday destinations India",
    "Group Trips": "Group trip destinations friends India",
    "Backpackers": "Backpacking budget travel India",
    
    // Time & Seasonality
    "All-Season Destination": "Year round tourist places India",
    "Monsoon Magic": "Best places to visit in monsoon India",
    "Winter Wonderland": "Winter snow tourist places India",
    "Summer Escape": "Summer hill stations holiday India",
    
    // Budget
    "Budget-Friendly": "Budget tourist places cheap travel India",
    "Mid-Range": "Affordable tourist destinations India",
    "Luxury": "Luxury travel destinations 5 star India",
    "Easy to Reach": "Well connected tourist cities India airports",
    "Offbeat / Requires Effort": "Hidden offbeat gems hard to reach India",
    "Road Trip Friendly": "Best road trip routes India",

    "default": "Tourist places in India"
  };

  // --- 3. FETCH FUNCTIONS ---

  // A. FETCH FOOD (Controlled List)
  const fetchFoodFromWiki = async (subCategory) => {
    setLoading(true);
    setDynamicDestinations([]);

    // 1. Select the correct array based on sub-category
    let selectedFoods = [];
    
    if (subCategory.includes("Vegetarian")) {
      selectedFoods = foodDatabase["Vegetarian / Vegan Friendly"];
    } else if (subCategory.includes("Seafood")) {
      selectedFoods = foodDatabase["Seafood"];
    } else if (subCategory.includes("Street")) {
      selectedFoods = foodDatabase["Street Food"];
    } else {
      // Default / Mixed
      selectedFoods = foodDatabase["Local Cuisine"];
    }

    // 2. Shuffle and Pick 15 items
    const shuffled = [...selectedFoods].sort(() => 0.5 - Math.random()).slice(0, 15);
    const titlesQuery = shuffled.join('|');
    
    try {
      // 3. Query Wikipedia for these Exact Titles
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesQuery)}&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.pages) {
        const results = Object.values(data.query.pages);
        
        const formatted = results
          .filter(item => item.thumbnail && item.thumbnail.source) 
          .map(item => ({
            name: item.title,
            desc: item.extract, // Description will say "Vada Pav is a vegetarian fast food dish native to the state of Maharashtra."
            img: item.thumbnail.source,
            isFood: true 
          }));

        setDynamicDestinations(formatted);
      }
    } catch (e) {
      console.error("Food Fetch Error", e);
    } finally {
      setLoading(false);
    }
  };

  // B. FETCH PLACES (Strict Geo-Fencing)
  const fetchDestinationsFromWiki = async (subCategory) => {
    setLoading(true);
    setDynamicDestinations([]); 

    let baseQuery = queryMap[subCategory] || subCategory;
    if (!baseQuery.toLowerCase().includes("india")) {
      baseQuery += " India";
    }
    
    // 1. STRICT EXCLUSIONS in the search query
    const safeQuery = `${baseQuery} -pakistan -lahore -nepal -bangladesh -mexico -china -person -biography -film -actor -actress -party -politics`;

    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(safeQuery)}&gsrlimit=40&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exsentences=2&format=json&origin=*`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.pages) {
        let results = Object.values(data.query.pages);

        // 2. AGGRESSIVE POST-FILTERING
        results = results.filter(item => {
          if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;

          const text = (item.extract + " " + item.title).toLowerCase();
          
          // BLOCK NEIGHBORING COUNTRIES & MISLEADING TERMS
          const badWords = [
            "pakistan", "lahore", "karachi", "islamabad", "rawalpindi", "punjab, pakistan",
            "mexico", "antojito", "spanish",
            "nepal", "kathmandu", "bangladesh", "dhaka",
            "china", "beijing", "usa", "united states", "london", 
            "political party", "ministry", "association", "bjp", "congress", "corporation"
          ];
          
          if (badWords.some(kw => text.includes(kw))) return false;

          // REQUIRE INDIAN CONTEXT
          const indianKeywords = ["india", "state", "pradesh", "kerala", "goa", "delhi", "mumbai", "rajasthan", "himalaya", "bengal", "punjab, india", "gujarat", "tamil", "karnataka", "maharashtra", "temple", "fort", "lake", "river"];
          const isLocationContext = indianKeywords.some(keyword => text.includes(keyword));
          
          // BLOCK PEOPLE
          const isPersonContext = text.includes("born") || text.includes("died") || text.includes("actress") || text.includes("politician");

          return isLocationContext && !isPersonContext;
        });

        const formatted = results.map(item => ({
          name: item.title,
          desc: item.extract,
          img: item.thumbnail.source,
          isFood: false
        }));

        setDynamicDestinations(formatted.sort(() => 0.5 - Math.random()).slice(0, 20));
      }
    } catch (error) {
      console.error("Wiki Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 4. EFFECT ROUTER ---
  useEffect(() => {
    if (selectedSubCategory && selectedCategory) {
      // IF FOOD SECTION -> Use Food Fetcher
      if (selectedCategory.title.includes("Food")) {
        fetchFoodFromWiki(selectedSubCategory);
      } else {
        // ELSE -> Use Place Fetcher
        fetchDestinationsFromWiki(selectedSubCategory);
      }
    }
  }, [selectedSubCategory, selectedCategory]);


  // --- DATA: CATEGORIES LIST ---
  const categories = [
    {
      id: 1, title: "Nature & Landscape", icon: Mountain,
      subtitle: "What the place looks and feels like", color: "#dcfce7", textColor: "#166534",
      items: ["Mountains / Hills", "Beaches / Coastline", "Forests / Jungles", "Deserts", "Lakes & Rivers", "Snow / Glaciers", "Valleys & Meadows", "Islands"],
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2, title: "Food & Culinary", icon: Coffee,
      subtitle: "What you eat & drink there", color: "#fef9c3", textColor: "#854d0e",
      items: ["Street Food", "Local Cuisine", "Cafés & Coffee Culture", "Seafood", "Vegetarian / Vegan Friendly", "Wine / Brewery Towns", "Food Trails & Experiences"],
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3, title: "Urban vs Rural", icon: Map,
      subtitle: "Pace & vibe", color: "#dbeafe", textColor: "#1e40af",
      items: ["Metro City", "Heritage City", "Small Town", "Village Life", "Remote / Off-grid"],
      image: "https://images.unsplash.com/photo-1449824913929-49aa711563b1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4, title: "Culture & Heritage", icon: Landmark,
      subtitle: "Stories, people, history", color: "#ffedd5", textColor: "#9a3412",
      items: ["Historical Monuments", "Temples / Spiritual Sites", "Art & Craft Hubs", "Tribal / Indigenous Culture", "Music & Dance Traditions", "Museums & Architecture", "UNESCO Sites"],
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5, title: "Adventure Level", icon: Compass,
      subtitle: "What you do there", color: "#fee2e2", textColor: "#991b1b",
      items: ["Trekking / Hiking", "Rafting / Kayaking", "Scuba / Snorkeling", "Paragliding", "Skiing / Snowboarding", "Cycling Routes", "Safaris & Wildlife"],
      image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6, title: "Wellness & Slow Travel", icon: Smile,
      subtitle: "How it makes you feel", color: "#f3e8ff", textColor: "#6b21a8",
      items: ["Yoga & Meditation", "Ayurveda / Healing", "Digital Detox", "Silent Retreats", "Nature Immersion", "Mindfulness Stays"],
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7, title: "Social & Festive", icon: Users,
      subtitle: "Energy & crowd", color: "#fce7f3", textColor: "#9d174d",
      items: ["Party Destination", "Festival Town", "Nightlife", "Cultural Events", "Quiet & Peaceful", "Romantic Escapes"],
      image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8, title: "Sustainability", icon: Globe,
      subtitle: "Impact-driven travel", color: "#ecfccb", textColor: "#3f6212",
      items: ["Eco-Friendly", "Community-Based Tourism", "Farm Stays", "Local-Owned Experiences", "Low-Impact Travel", "Conservation Areas"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9, title: "Stay Experience", icon: Home,
      subtitle: "Where & how you live", color: "#e0e7ff", textColor: "#3730a3",
      items: ["Luxury Resorts", "Boutique Hotels", "Homestays", "Eco Lodges", "Camping / Glamping", "Hostels"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10, title: "Travel Style", icon: User,
      subtitle: "Who it’s best for", color: "#ccfbf1", textColor: "#115e59",
      items: ["Solo Travelers", "Couples", "Families", "Group Trips", "Backpackers", "Digital Nomads", "Senior-Friendly"],
      image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 11, title: "Time & Seasonality", icon: Calendar,
      subtitle: "When to go", color: "#ffedd5", textColor: "#9a3412",
      items: ["All-Season Destination", "Monsoon Magic", "Winter Wonderland", "Summer Escape", "Weekend Getaway", "Long-Stay Friendly"],
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12, title: "Budget & Accessibility", icon: Wallet,
      subtitle: "Practical filters", color: "#f1f5f9", textColor: "#334155",
      items: ["Budget-Friendly", "Mid-Range", "Luxury", "Easy to Reach", "Offbeat / Requires Effort", "Road Trip Friendly"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // --- HELPERS ---
  const getSafeIndex = (index, length) => ((index % length) + length) % length;

  const visibleCards = [
    categories[getSafeIndex(cardScrollIndex, categories.length)],
    categories[getSafeIndex(cardScrollIndex + 1, categories.length)],
    categories[getSafeIndex(cardScrollIndex + 2, categories.length)],
  ];

  const activeCategory = categories[getSafeIndex(activeCategoryIndex, categories.length)];
  const currentHeroImage = activeCategory.image; 

  // --- HANDLERS ---
  const scrollCardsLeft = () => setCardScrollIndex(prev => prev - 1);
  const scrollCardsRight = () => setCardScrollIndex(prev => prev + 1);

  const handleSubCategoryClick = (subItem) => {
    setSelectedSubCategory(subItem); 
  };

  const handleDestinationClick = (destName) => {
    navigate(`/place/${destName}`);
  };

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#111827' }}>
          Curated <span style={{ color: '#16a34a' }}>Experiences</span>
        </h2>

        {/* --- MAIN GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', alignItems: 'stretch' }}>
          
          {/* LEFT: CARD LIST */}
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
                  <div>
                    <div style={{ marginBottom: '20px', color: cat.textColor }}><cat.icon size={40} /></div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: cat.textColor, marginBottom: '10px', lineHeight: '1.3' }}>{cat.title}</h3>
                    <p style={{ fontSize: '13px', color: cat.textColor, opacity: 0.9, lineHeight: '1.5' }}>{cat.subtitle}</p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '600', color: cat.textColor }}>
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE PREVIEW */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: '400px' }}>
            <img src={currentHeroImage} alt={activeCategory.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>{activeCategory.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Discover the best of {activeCategory.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedCategory && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', width: '100%', maxWidth: '900px',
            borderRadius: '24px', overflow: 'hidden', position: 'relative',
            height: '85vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            
            {/* 1. VIEW: LIST OF SUB-CATEGORIES */}
            {!selectedSubCategory ? (
              <>
                <div style={{ padding: '30px', backgroundColor: selectedCategory.color }}>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  >
                    <X size={20} color="#374151" />
                  </button>
                  <div style={{ color: selectedCategory.textColor, marginBottom: '15px' }}><selectedCategory.icon size={48} /></div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: selectedCategory.textColor, marginBottom: '5px' }}>{selectedCategory.title}</h2>
                  <p style={{ fontSize: '16px', color: selectedCategory.textColor, opacity: 0.9 }}>Select a specific interest to explore</p>
                </div>
                
                <div style={{ padding: '30px', overflowY: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                    {selectedCategory.items.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleSubCategoryClick(item)} 
                        style={{
                          padding: '20px', borderRadius: '16px',
                          backgroundColor: '#f9fafb', border: '1px solid #e5e7eb',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', color: '#374151'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = selectedCategory.color; e.currentTarget.style.borderColor = 'transparent'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                      >
                        {item} <ArrowRight size={18} color={selectedCategory.textColor} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* 2. VIEW: DYNAMIC WIKIPEDIA RESULTS */
              <>
                <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button 
                    onClick={() => setSelectedSubCategory(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <ArrowLeft size={24} color="#374151" />
                  </button>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{selectedSubCategory}</h2>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      {selectedCategory.title.includes("Food") ? "Famous Indian dishes" : "Curated destinations in India"}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    style={{ marginLeft: 'auto', background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={20} color="#374151" />
                  </button>
                </div>

                <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }}>
                  
                  {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                      <Loader2 className="animate-spin" size={40} color="#16a34a" />
                      <p style={{ marginTop: '10px', color: '#6b7280' }}>Fetching hidden gems...</p>
                    </div>
                  )}

                  {!loading && dynamicDestinations.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                      {dynamicDestinations.map((dest, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleDestinationClick(dest.name)}
                          style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <div style={{ height: '160px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                            <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '15px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {dest.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6b7280' }}>
                              {dest.isFood ? <Utensils size={12} /> : <MapPin size={12} />} 
                              {/* Display "Dish" for foods, "India" for places */}
                              {dest.isFood ? "Indian Dish" : "India"}
                            </div>
                            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {dest.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!loading && dynamicDestinations.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                      <p>No specific results found. Try exploring another category!</p>
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