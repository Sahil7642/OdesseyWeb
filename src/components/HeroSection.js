/*
import React from 'react';
import SearchBox from './SearchBox';


const HeroSection = ({ onSearch }) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 69, 52, 0.3), rgba(0, 69, 52, 0.4)), url(\'https://images.unsplash.com/photo-1583878594798-c31409c8ab4a\')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
     
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="display-large text-white mb-8 font-bold leading-tight">
          Reconnect With Yourself
        </h1>
       
        <p className="body-large text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover pristine landscapes, authentic experiences, and sustainable lodges
          that bring you closer to nature\'s untouched beauty.
        </p>
       
        <div className="max-w-3xl mx-auto">
          <SearchBox onSearch={onSearch} />
        </div>
       
        <div className="mt-16 text-white/80 text-sm">
          <p>✨ Handpicked eco-friendly destinations across India</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

*/

/*import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ onSearch }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToResults = () => {
    document.getElementById('search-results')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 69, 52, 0.3), rgba(0, 69, 52, 0.4)), 
                         url('https://images.unsplash.com/photo-1583878594798-c31409c8ab4a?q=80&w=2070')`
      }}
    >
      {/* Animated Gradient Overlay }
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 animate-pulse-slow"></div>
      
      {/* Content }
      <div className={`
        relative z-10 text-center px-4 max-w-4xl mx-auto
        transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>
        <h1 className="display-large text-white mb-6 font-bold leading-tight 
                     drop-shadow-2xl animate-fade-in">
          Reconnect With Yourself
        </h1>
       
        <p className="body-large text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed 
                    drop-shadow-lg animate-fade-in" 
           style={{ animationDelay: '0.2s' }}>
          Discover pristine landscapes, authentic experiences, and sustainable lodges
          that bring you closer to nature's untouched beauty.
        </p>
       
        <div className="max-w-3xl mx-auto animate-scale-in" 
             style={{ animationDelay: '0.4s' }}>
          <SearchBox onSearch={onSearch} />
        </div>
       
        <div className="mt-16 text-white/80 text-sm animate-fade-in" 
             style={{ animationDelay: '0.6s' }}>
          <p className="flex items-center justify-center space-x-2">
            <span className="text-2xl">✨</span>
            <span>Handpicked eco-friendly destinations across India</span>
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator }
      <button
        onClick={scrollToResults}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 
                 hover:text-white transition-all duration-300 animate-bounce"
        aria-label="Scroll to results"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;

*/
/*
import React from 'react';
import SearchBox from './SearchBox';

const HeroSection = ({ onSearch }) => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay }
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Gradient Overlay for text readability }
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      
      {/* Content Container }
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6 animate-fade-in-up">
          🌿 Sustainable Travel India
        </span>
        
        <h1 className="display-large text-white mb-6 drop-shadow-lg">
          Reconnect With <span className="text-green-300 italic">Nature</span>
        </h1>
        
        <p className="body-large text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover pristine landscapes, authentic cultural experiences, and eco-friendly lodges that preserve the beauty of India.
        </p>
        
        {/* Search Component }
        <div className="animate-fade-in-up delay-200">
          <SearchBox onSearch={onSearch} />
        </div>
        
        {/* Trust badges/Simple footer text }
        <div className="mt-12 flex items-center justify-center space-x-8 text-white/80 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Verified Eco-Lodges</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Local Communities</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Zero Carbon Trips</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
*/
/*
import React from 'react';
import SearchBox from './SearchBox';

const HeroSection = ({ onSearch }) => {
  return (
    <section 
      className="relative flex-items-center justify-center overflow-hidden" 
      // CHANGE THIS NUMBER to crop the image height:
      // '100vh' = Full Screen
      // '600px' = Standard Hero height
      // '400px' = Short banner
      style={{ height: '500px', width: '100%'}} 
    >
      
      {/* Background Image *}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://tourism.gov.in/sites/default/files/2022-02/dawki-Jaintia%20hills-meghalaya.jpg" 
          alt="Nature Background" 
          // 'object-cover' is the magic class that crops the image to fit the box
          // 'object-center' focuses on the middle (try 'object-top' or 'object-bottom' to shift it)
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Overlay *}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content *}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
          🌿 Sustainable Travel India
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Reconnect With <span className="text-green-300 italic">Nature</span>
        </h1>
        
        <p className="text-lg text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover pristine landscapes, authentic cultural experiences, and eco-friendly lodges.
        </p>
        
        <SearchBox onSearch={onSearch} />
      </div>
    </section>
  );
};

export default HeroSection;
*/

/*
import React from 'react';
import SearchBox from './SearchBox';

const HeroSection = ({ onSearch }) => {
  return (
    <section 
      style={{ 
        position: 'relative', 
        height: '500px', 
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      
      {/* 1. Background Image Layer *}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <img 
          src="https://tourism.gov.in/sites/default/files/2022-02/dawki-Jaintia%20hills-meghalaya.jpg" 
          alt="Nature Background" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        {/* Dark Overlay *}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // 50% Dark overlay
        }}></div>
      </div>

      {/* 2. Text Content Layer *}
      <div style={{
        position: 'relative', // Keeps it above the image
        zIndex: 10,
        textAlign: 'center',
        color: 'white',
        width: '100%',
        maxWidth: '800px',
        padding: '0 20px'
      }}>
        <span style={{
          display: 'inline-block',
          padding: '5px 15px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          marginBottom: '20px',
          fontSize: '14px',
          backdropFilter: 'blur(5px)'
        }}>
          🌿 Sustainable Travel India
        </span>
        
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Reconnect With <span style={{ color: '#86efac', fontStyle: 'italic' }}>Nature</span>
        </h1>
        
        <p style={{
          fontSize: '18px',
          marginBottom: '40px',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Discover pristine landscapes, authentic cultural experiences, and eco-friendly lodges that preserve the beauty of India.
        </p>
        
        {/* Search Box Container *}
        <div style={{ marginTop: '20px' }}>
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
*/

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { State, City } from 'country-state-city';

const HeroSection = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // 1. CAROUSEL STATE
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. IMAGE LIST
  const heroImages = [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80", // Mountains
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1920&q=80", // Kerala Boat
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80", // Goa Beach
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80", // Taj Mahal
    "https://www.lakshadweeptoursandtravels.com/images/banner-slide-2.jpg", // Lakshadweep
    "https://www.bandhavgarh-national-park.com/images/Khajuraho_2.jpg", // Madhya Pradesh
  ];

  // 3. AUTOMATIC SLIDESHOW (Speed Decreased to 8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3500); //  CHANGED: 3500ms = 3.5 Seconds per slide

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- SEARCH LOGIC ---
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 2) {
      const allStates = State.getStatesOfCountry('IN');
      const allCities = City.getCitiesOfCountry('IN');
      const filteredStates = allStates.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
      const filteredCities = allCities.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions([...filteredStates, ...filteredCities].slice(0, 10));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (place) => {
    setSearchInput(place.name);
    setShowSuggestions(false);
    onSearch(place); 
  };

  const executeSearch = () => {
    if (searchInput.trim()) {
      setShowSuggestions(false);
      onSearch({ name: searchInput, custom: true });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <section style={{
      position: 'relative',
      height: '80vh',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '0 20px',
      overflow: 'hidden'
    }}>
      
      {/* BACKGROUND CAROUSEL */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 0 }}></div>

      {/* 👇 4. NAVIGATION DOTS ADDED HERE */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 20
      }}>
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentImageIndex === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>

      <div style={{ maxWidth: '900px', width: '100%', zIndex: 10 }}>
        
        <h1 style={{ 
          fontSize: 'clamp(40px, 5vw, 64px)', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          Discover the Unseen
        </h1>
        <p style={{ 
          fontSize: 'clamp(18px, 2vw, 24px)', 
          marginBottom: '40px', 
          opacity: 0.9 
        }}>
          Explore India's most pristine landscapes and authentic experiences.
        </p>

        {/* SEARCH BAR CONTAINER */}
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          
          {/* LOCATION INPUT */}
          <div style={{ flex: 2, display: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '1px solid #e5e7eb', position: 'relative' }}>
            <MapPin color="#16a34a" size={20} style={{ marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <p style={{ color: '#111827', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', marginBottom: '2px' }}>Location</p>
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{ width: '100%', border: 'none', outline: 'none', color: '#4b5563', fontSize: '14px' }}
              />
            </div>

            {/* SUGGESTIONS */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute', top: '60px', left: 0, right: 0,
                backgroundColor: 'white', borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100,
                overflow: 'hidden', textAlign: 'left', maxHeight: '300px', overflowY: 'auto'
              }}>
                {suggestions.map((place, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSelect(place)}
                    style={{ padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', color: '#374151', fontSize: '14px' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATES INPUT */}
          <div style={{ flex: 1, display: 'none', mdDisplay: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '1px solid #e5e7eb' }}>
            <Calendar color="#16a34a" size={20} style={{ marginRight: '10px' }} />
            <div>
              <p style={{ color: '#111827', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', marginBottom: '2px' }}>Dates</p>
              <input type="text" placeholder="Add dates" style={{ width: '100%', border: 'none', outline: 'none', color: '#4b5563', fontSize: '14px' }} />
            </div>
          </div>

          {/* GUESTS INPUT */}
          <div style={{ flex: 1, display: 'none', mdDisplay: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <Users color="#16a34a" size={20} style={{ marginRight: '10px' }} />
            <div>
              <p style={{ color: '#111827', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', marginBottom: '2px' }}>Guests</p>
              <input type="text" placeholder="Add guests" style={{ width: '100%', border: 'none', outline: 'none', color: '#4b5563', fontSize: '14px' }} />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button 
            onClick={executeSearch}
            style={{
              backgroundColor: '#16a34a', color: 'white', border: 'none',
              borderRadius: '50px', width: '50px', height: '50px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0
            }}
          >
            <Search size={24} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;