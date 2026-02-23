/*import React, { useRef } from 'react';
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
        
        {/* HEADER *}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
              Traveler <span style={{ color: '#16a34a', fontStyle: 'italic' }}>Diaries</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              Real stories from real wanderers.
            </p>
          </div>
          
          {/* NAVIGATION BUTTONS *}
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

        {/* --- CAROUSEL CONTAINER --- *}
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
              
              {/* Card Image *}
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

              {/* Card Content *}
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Quote size={24} color="#e5e7eb" style={{ marginBottom: '10px' }} />
                
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                  {story.title}
                </h3>
                
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  "{story.snippet}"
                </p>

                {/* Divider *}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6', marginBottom: '20px' }}></div>

                {/* Traveler Profile *}
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
*/

import React from 'react';
import { BookOpen, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravellerStories = () => {
  const navigate = useNavigate();

  // --- MOCK DATA: TOP 3 TEASER STORIES ---
  // These should match a few of the stories from your main StoriesPage
  const topStories = [
    {
      id: 1,
      title: "Chasing the Monsoon in the Abode of Clouds",
      author: "Priya Sharma",
      state: "Meghalaya",
      category: "Nature",
      img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=600&q=80",
      excerpt: "Walking across the living root bridges while the rain poured down was a spiritual experience. Meghalaya completely transformed my definition of green."
    },
    {
      id: 2,
      title: "Lost in the Colors of the Pink City",
      author: "David Chen",
      state: "Rajasthan",
      category: "Culture",
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
      excerpt: "From the majestic Amer Fort to the bustling bazaars of Johari Bazaar, Jaipur is an absolute sensory overload in the best way possible."
    },
    {
      id: 3,
      title: "Finding Silence in the Backwaters",
      author: "Ananya Desai",
      state: "Kerala",
      category: "Relaxation",
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
      excerpt: "Two days on a houseboat in Alleppey taught me the true meaning of slow living. Just water, palm trees, and absolute peace."
    }
  ];

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '50px' }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#16a34a', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              <BookOpen size={18} /> Travel Diaries
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', lineHeight: '1.2' }}>
              Real Stories from Real Travellers
            </h2>
          </div>
          
          {/* VIEW ALL BUTTON (Desktop) */}
          <button 
            onClick={() => navigate('/stories')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '50px', backgroundColor: 'white', border: '1px solid #d1d5db', color: '#374151', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#374151'; }}
          >
            View All Diaries <ArrowRight size={18} />
          </button>
        </div>

        {/* STORIES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {topStories.map((story) => (
            <div 
              key={story.id} 
              // Clicking the card takes them to the main stories page
              onClick={() => navigate('/stories')}
              style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; e.currentTarget.querySelector('.read-more-icon').style.transform = 'translate(4px, -4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.03)'; e.currentTarget.querySelector('.read-more-icon').style.transform = 'translate(0, 0)'; }}
            >
              {/* Image & Tags */}
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={story.img} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
                <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px' }}>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#1f2937', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#16a34a" /> {story.state}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  By {story.author}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '12px', lineHeight: '1.4' }}>
                  {story.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '20px' }}>
                  {story.excerpt}
                </p>
                
                {/* Fake Link that animates on hover */}
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#1f2937', fontWeight: '700', fontSize: '14px', marginTop: 'auto' }}>
                  Read Full Story
                  <div className="read-more-icon" style={{ transition: 'transform 0.2s', color: '#16a34a' }}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE FALLBACK BUTTON */}
        <div style={{ textAlign: 'center', marginTop: '40px', display: 'block' }}>
           <button 
             onClick={() => navigate('/stories')}
             style={{ padding: '16px 32px', borderRadius: '50px', backgroundColor: '#111827', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}
           >
             Explore All Diaries <ArrowRight size={20} />
           </button>
        </div>

      </div>
    </section>
  );
};

export default TravellerStories;