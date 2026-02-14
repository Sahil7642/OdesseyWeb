import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Quote } from 'lucide-react';

const TravelerStories = () => {
  const scrollRef = useRef(null);

  // --- MOCK STORIES DATA ---
  const stories = [
    {
      id: 1,
      name: "Ananya Sharma",
      location: "Spiti Valley, Himachal",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      image: "https://tripstorz.com/_astro/key-monastery-in-spiti-valley-during-winter.CLBQd5yK_Z2dSSsR.jpg",
      title: "Finding Silence in the Mountains",
      snippet: "The silence in Spiti isn't empty; it's full of answers. Living with the locals in a mud house changed how I view luxury..."
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Gokarna, Karnataka",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-om-beach-gokarna-karnataka-city-hero?qlt=82&ts=1726720866389",
      title: "Beyond the Beaches",
      snippet: "Gokarna is more than just beaches. I hiked the cliff trails at sunrise and discovered a hidden temple that isn't on any map..."
    },
    {
      id: 3,
      name: "Priya & Amit",
      location: "Mawlynnong, Meghalaya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      image: "https://www.esikkimtourism.in/wp-content/uploads/2018/07/Meghalaya-Mawlynnong.jpg",
      title: "Walking on Living Roots",
      snippet: "The living root bridges are nature's engineering marvel. We stayed in a homestay where the host cooked us a bamboo feast..."
    },
    {
      id: 4,
      name: "David Mathew",
      location: "Varanasi, UP",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      image: "https://www.indianpanorama.in/assets/images/tourpackages/banner/holy-varanasi.webp",
      title: "Colors of the Ghats",
      snippet: "Varanasi is an assault on the senses in the best way possible. The evening Aarti ceremony was a spiritual experience I'll never forget..."
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
              Traveler <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Diaries</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              Real stories from real wanderers.
            </p>
          </div>
          
          {/* NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => scroll('left')}
              style={{
                width: '45px', height: '45px', borderRadius: '50%',
                border: '1px solid #d1d5db', backgroundColor: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
            >
              <ChevronLeft size={20} color="#374151" />
            </button>
            <button 
              onClick={() => scroll('right')}
              style={{
                width: '45px', height: '45px', borderRadius: '50%',
                border: 'none', backgroundColor: '#16a34a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 4px 6px rgba(22, 163, 74, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <ChevronRight size={20} color="white" />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL CONTAINER --- */}
        <div 
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '20px', // Space for shadow
            scrollBehavior: 'smooth'
          }}
        >
          {stories.map((story) => (
            <div key={story.id} style={{
              flex: '0 0 auto',
              width: '350px',
              scrollSnapAlign: 'start',
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f3f4f6',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* Card Image */}
              <div style={{ height: '200px', position: 'relative' }}>
                <img 
                  src={story.image} 
                  alt={story.location} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: '15px', left: '15px',
                  backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                  padding: '5px 12px', borderRadius: '20px',
                  display: 'flex', alignItems: 'center', gap: '5px'
                }}>
                  <MapPin size={14} color="white" />
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '500' }}>{story.location}</span>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Quote size={24} color="#e5e7eb" style={{ marginBottom: '10px' }} />
                
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                  {story.title}
                </h3>
                
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  "{story.snippet}"
                </p>

                {/* Divider */}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6', marginBottom: '20px' }}></div>

                {/* Traveler Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={story.avatar} 
                    alt={story.name} 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{story.name}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Verified Traveler</p>
                  </div>
                  
                  <button style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: '600', color: '#16a34a', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Read Story &rarr;
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TravelerStories;