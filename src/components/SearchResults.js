/*import React from 'react';
import DestinationCard from './DestinationCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const SearchResults = ({ searchQuery, searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  // Mock destination data with images
  const mockDestinations = [
    {
      id: 1,
      name: "Taj Mahal, Agra",
      state: "Uttar Pradesh",
      type: "heritage",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1663918455395-49146be36cbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxJbmRpYSUyMGxhbmRtYXJrc3xlbnwwfHx8fDE3NTg3Mzc3Njl8MA&ixlib=rb-4.1.0&q=85",
      description: "One of the Seven Wonders of the World, this magnificent white marble mausoleum represents eternal love and architectural brilliance.",
      famousFor: ["Marble Architecture", "UNESCO World Heritage", "Mughal History", "Photography"]
    },
    {
      id: 2,
      name: "Munnar Hills",
      state: "Kerala",
      type: "mountain",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1667694140865-0afefb32e6e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxJbmRpYSUyMGRlc3RpbmF0aW9uc3xlbnwwfHx8fDE3NTg3Mzc3Mzl8MA&ixlib=rb-4.1.0&q=85",
      description: "Rolling tea gardens, misty mountains, and cool climate make Munnar a perfect hill station for nature lovers and eco-tourists.",
      famousFor: ["Tea Plantations", "Cool Climate", "Eco-Tourism", "Trekking"]
    },
    {
      id: 3,
      name: "Gulmarg Valley",
      state: "Kashmir",
      type: "mountain",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1667694141297-753e5144da35?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxJbmRpYSUyMGRlc3RpbmF0aW9uc3xlbnwwfHx8fDE3NTg3Mzc3Mzl8MA&ixlib=rb-4.1.0&q=85",
      description: "Paradise on Earth with snow-capped mountains, cable car rides, and world-class skiing facilities in pristine natural beauty.",
      famousFor: ["Cable Car", "Skiing", "Mountain Views", "Adventure Sports"]
    },
    {
      id: 4,
      name: "Golden Temple",
      state: "Punjab",
      type: "heritage",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1580063976019-e7cca58695e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxJbmRpYSUyMGxhbmRtYXJrc3xlbnwwfHx8fDE3NTg3Mzc3Njl8MA&ixlib=rb-4.1.0&q=85",
      description: "The holiest Gurudwara and spiritual center for Sikhs, known for its stunning golden architecture and peaceful atmosphere.",
      famousFor: ["Sikh Heritage", "Golden Architecture", "Spirituality", "Community Kitchen"]
    },
    {
      id: 5,
      name: "Kerala Backwaters",
      state: "Kerala",
      type: "beach",
      rating: "4.6",
      image: "https://images.unsplash.com/photo-1604935385675-92bdee60deb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxJbmRpYSUyMGxhbmRtYXJrc3xlbnwwfHx8fDE3NTg3Mzc3Njl8MA&ixlib=rb-4.1.0&q=85",
      description: "Serene network of waterways, lagoons, and lakes offering houseboat cruises through coconut groves and traditional villages.",
      famousFor: ["Houseboat Cruises", "Coconut Groves", "Ayurvedic Spas", "Traditional Villages"]
    },
    {
      id: 6,
      name: "Shimla Hills",
      state: "Himachal Pradesh",
      type: "mountain",
      rating: "4.5",
      image: "https://images.unsplash.com/photo-1667694140339-aa51181fa672?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxJbmRpYSUyMGRlc3RpbmF0aW9uc3xlbnwwfHx8fDE3NTg3Mzc3Mzl8MA&ixlib=rb-4.1.0&q=85",
      description: "The Queen of Hills with colonial architecture, toy train rides, and stunning mountain vistas perfect for a refreshing getaway.",
      famousFor: ["Toy Train", "Colonial Architecture", "Mall Road", "Mountain Views"]
    }
  ];


  const scrollContainer = (direction) => {
    const container = document.getElementById('carousel-container');
    const scrollAmount = 340;
   
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <section className="py-16 bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header *}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Places {searchQuery && `in ${searchQuery}`}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked eco-friendly destinations that showcase India's natural beauty and cultural heritage
          </p>
        </div>


        {/* Carousel Container *}
        <div className="relative">
          {/* Navigation Buttons *}
          <button
            onClick={() => scrollContainer('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
         
          <button
            onClick={() => scrollContainer('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>


          {/* Scrollable Container *}
          <div
            id="carousel-container"
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {mockDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>


        {/* View All Button *}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};


export default SearchResults;
*/

/*
import React from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// 👇 1. Import City too, so we can search them
import { State, City } from 'country-state-city';

const SearchResults = ({ searchQuery, searchResults }) => {
  const navigate = useNavigate();

  if (!searchQuery || searchResults.length === 0) return null;

  const handleViewDetails = (place) => {
    let targetStateCode = null;
    const lowerName = place.name.toLowerCase().trim();

    // --- STRATEGY 1: Dropdown Selection (The most accurate) ---
    if (place.isoCode) {
      targetStateCode = place.isoCode; // User clicked a State
    } 
    else if (place.stateCode) {
      targetStateCode = place.stateCode; // User clicked a City
    }
    
    // --- STRATEGY 2: Smart Text Search (If user just typed "Manali" and hit Enter) ---
    else {
      // A. Check if they typed a State Name
      const allStates = State.getStatesOfCountry('IN');
      const foundState = allStates.find(s => s.name.toLowerCase() === lowerName);
      
      if (foundState) {
        targetStateCode = foundState.isoCode;
      } else {
        // B. Check if they typed a City Name
        const allCities = City.getCitiesOfCountry('IN');
        const foundCity = allCities.find(c => c.name.toLowerCase() === lowerName);
        
        if (foundCity) {
          targetStateCode = foundCity.stateCode;
        } else {
          // C. Check "Famous Tourist Places" (Cheat Sheet)
          // Since we don't have a backend, we manually map famous spots to their states
          const famousPlaces = {
            "taj mahal": "UP",
            "agra": "UP",
            "varanasi": "UP",
            "jaipur": "RJ",
            "udaipur": "RJ",
            "jaisalmer": "RJ",
            "munnar": "KL",
            "alleppey": "KL",
            "kochi": "KL",
            "coorg": "KA",
            "hampi": "KA",
            "gokarna": "KA",
            "leh": "LA",
            "ladakh": "LA",
            "manali": "HP",
            "kasol": "HP",
            "shimla": "HP",
            "rishikesh": "UK",
            "kedarnath": "UK",
            "gangtok": "SK",
            "shillong": "ML",
            "darjeeling": "WB"
          };

          // Check if the user's search text contains any of these famous names
          const foundKey = Object.keys(famousPlaces).find(key => lowerName.includes(key));
          if (foundKey) {
            targetStateCode = famousPlaces[foundKey];
          }
        }
      }
    }

    // --- NAVIGATION ---
    if (targetStateCode) {
      navigate(`/state/${targetStateCode}`);
    } else {
      alert(`We couldn't find a dedicated page for "${place.name}" yet. Try searching for the State it belongs to!`);
    }
  };

  return (
    <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#111827' }}>
          Search Results for "<span style={{ color: '#16a34a' }}>{searchQuery}</span>"
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px'
        }}>
          
          {searchResults.map((result, index) => (
            <div key={index} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              backgroundColor: 'white'
            }}>
              
              {/* Image Container *}
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={result.img || `https://source.unsplash.com/random/600x400?${result.name},india,travel`} 
                  alt={result.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Text Content *}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
                  {result.name}
                </h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {result.guests && (
                    <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> {result.guests} Guests
                    </span>
                  )}
                  {result.date && (
                    <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {new Date(result.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                  Explore the best sustainable stays and activities in {result.name}.
                </p>

                <button 
                  onClick={() => handleViewDetails(result)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SearchResults;
*/

import React from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ searchQuery, searchResults }) => {
  const navigate = useNavigate();

  // If no search query, show nothing
  if (!searchQuery || searchResults.length === 0) return null;

  const handleViewDetails = (place) => {
    // Navigate to the generic place route
    navigate(`/place/${place.name}`);
  };

  return (
    <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#111827' }}>
          Search Results for "<span style={{ color: '#16a34a' }}>{searchQuery}</span>"
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px'
        }}>
          
          {searchResults.map((result, index) => (
            <div key={index} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              backgroundColor: 'white'
            }}>
              
              {/* IMAGE: Uses Unsplash fallback if result.img is missing */}
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                <img 
                  src={result.img || `https://source.unsplash.com/random/600x400?${result.name},india,travel`} 
                  alt={result.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://source.unsplash.com/random/600x400?travel'; }}
                />
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
                  {result.name}
                </h3>
                
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                  Explore details, history, and travel information for {result.name}.
                </p>

                <button 
                  onClick={() => handleViewDetails(result)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SearchResults;