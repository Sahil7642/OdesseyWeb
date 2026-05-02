import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Compass, ArrowRight, Sparkles, Gamepad2, Landmark, Users, Camera, Coffee, Car } from 'lucide-react';

// --- CUSTOM SVG MANDALA COMPONENT ---
// This creates a beautiful, lightweight geometric mandala without needing external image files
const MandalaBackground = ({ className, style }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} style={{...style, opacity: 0.05, pointerEvents: 'none' }}>
    <g fill="none" stroke="currentColor" strokeWidth="0.5">
      <circle cx="50" cy="50" r="45" />
      <circle cx="50" cy="50" r="35" />
      <circle cx="50" cy="50" r="25" />
      <circle cx="50" cy="50" r="10" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path d="M 50 5 C 60 20, 60 30, 50 40 C 40 30, 40 20, 50 5 Z" />
          <path d="M 50 15 C 55 25, 55 35, 50 45 C 45 35, 45 25, 50 15 Z" />
        </g>
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <path key={`small-${i}`} transform={`rotate(${angle} 50 50)`} d="M 50 25 C 53 30, 53 35, 50 40 C 47 35, 47 30, 50 25 Z" />
      ))}
    </g>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ==========================================
          1. HERO SECTION
      ========================================== */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Background Image (Beautiful Indian Fort/Palace) */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        
        {/* Dark Gradient Overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,24,39,0.4), rgba(17,24,39,0.8))', zIndex: 1 }} />
        
        {/* Rotating Mandala Watermark */}
        <MandalaBackground className="spin-slow" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '80vw', height: '80vw', color: 'white', zIndex: 2 }} />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', padding: '0 20px', marginTop: '60px', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Sparkles size={16} color="#4ade80" /> Discover Incredible India
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '900', color: 'white', lineHeight: '1.1', marginBottom: '20px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Your Journey,<br />Crafted with <span style={{ color: '#4ade80' }}>Soul.</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Experience the vibrant culture, rich heritage, and breathtaking landscapes of India through curated itineraries and interactive games.
            </p>
          </div>

          {/* Quick Search / Trip Planner Bar */}
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', padding: '25px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ flex: '1 1 250px', borderRight: window.innerWidth > 768 ? '1px solid #e5e7eb' : 'none', paddingRight: window.innerWidth > 768 ? '15px' : '0' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase' }}>Where To?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={20} color="#16a34a" />
                <input type="text" placeholder="e.g. Kerala, Jaipur..." style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '16px', fontWeight: 'bold', width: '100%', color: '#111827' }} />
              </div>
            </div>

            <div style={{ flex: '1 1 200px', borderRight: window.innerWidth > 768 ? '1px solid #e5e7eb' : 'none', paddingRight: window.innerWidth > 768 ? '15px' : '0' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase' }}>When?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={20} color="#16a34a" />
                <input type="date" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontWeight: 'bold', width: '100%', color: '#111827', cursor: 'pointer' }} />
              </div>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase' }}>Travel Style</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Compass size={20} color="#16a34a" />
                <select style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '16px', fontWeight: 'bold', width: '100%', color: '#111827', cursor: 'pointer', WebkitAppearance: 'none' }}>
                  <option>Heritage & History</option>
                  <option>Nature & Wildlife</option>
                  <option>Spiritual Journey</option>
                  <option>Adventure & Trekking</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => navigate('/plan')}
              style={{ padding: '18px 30px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', flex: '0 1 auto', width: window.innerWidth <= 768 ? '100%' : 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'background 0.2s', boxShadow: '0 10px 20px rgba(22, 163, 74, 0.3)' }}
              onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} 
              onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
            >
              Plan Trip <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. FEATURED PORTALS (Arcade, Grid, Vehicles)
      ========================================== */}
      <section style={{ padding: '100px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '15px' }}>More Than Just a Booking Site</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>We believe travel should be engaging. Explore our unique tools designed to make your Indian journey unforgettable.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* Arcade Card */}
            <div onClick={() => navigate('/arcade')} style={{ backgroundColor: '#f0fdf4', borderRadius: '24px', padding: '40px', border: '1px solid #bbf7d0', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }} className="feature-card">
              <div style={{ width: '60px', height: '60px', backgroundColor: '#16a34a', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'white' }}><Gamepad2 size={30} /></div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>The Odessey Arcade</h3>
              <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>Play India-themed travel games like Snakes & Ladders and Travel Roulette to earn real rupees for your wallet!</p>
              <span style={{ color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Play & Earn <ArrowRight size={16} /></span>
            </div>

            {/* Experience Grid Card */}
            <div onClick={() => navigate('/experience')} style={{ backgroundColor: '#fff7ed', borderRadius: '24px', padding: '40px', border: '1px solid #fed7aa', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }} className="feature-card">
              <div style={{ width: '60px', height: '60px', backgroundColor: '#ea580c', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'white' }}><Compass size={30} /></div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Curated Experiences</h3>
              <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>Not sure where to go? Filter destinations by vibe, culinary preferences, or adventure levels using our visual grid.</p>
              <span style={{ color: '#ea580c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Find your vibe <ArrowRight size={16} /></span>
            </div>

            {/* Transport Card */}
            <div onClick={() => navigate('/vehicles')} style={{ backgroundColor: '#e0f2fe', borderRadius: '24px', padding: '40px', border: '1px solid #bae6fd', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }} className="feature-card">
              <div style={{ width: '60px', height: '60px', backgroundColor: '#0284c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'white' }}><Car size={30} /></div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Vehicle Options</h3>
              <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>From live flight aggregators and IRCTC trains to renting self-drive cars and bikes for mountain road trips.</p>
              <span style={{ color: '#0284c7', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>View Transport <ArrowRight size={16} /></span>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          3. CULTURAL / SOUL OF INDIA SECTION
      ========================================== */}
      <section style={{ backgroundColor: '#111827', color: 'white', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle Background Mandala */}
        <MandalaBackground className="spin-slow" style={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', color: '#16a34a', opacity: 0.1, zIndex: 0 }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: window.innerWidth < 900 ? '1fr' : '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          {/* Portrait / Cultural Image (Man with Turban / Local Culture) */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-15px', border: '2px solid #16a34a', borderRadius: '24px', zIndex: 0 }}></div>
            <img 
              src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80" 
              alt="Indian Culture" 
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
            />
            {/* Floating Info Badge */}
            <div style={{ position: 'absolute', bottom: '30px', left: '-20px', backgroundColor: 'white', color: '#111827', padding: '15px 25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ backgroundColor: '#fef3c7', padding: '10px', borderRadius: '50%' }}><Users size={24} color="#d97706" /></div>
               <div>
                 <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: 'bold', textTransform: 'uppercase' }}>Connect With</p>
                 <p style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>Local Artisans</p>
               </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>
              <Landmark size={18} /> Authentic Immersion
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>Travel deeper into the heart of the subcontinent.</h2>
            <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: '1.7', marginBottom: '20px' }}>
              Odessey isn't just about ticking boxes on a map. It's about sipping chai at a roadside stall, learning block printing from a master in Jaipur, or navigating the backwaters of Kerala with a local guide.
            </p>
            <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: '1.7', marginBottom: '40px' }}>
              We partner with local communities to bring you experiences that are raw, real, and responsible.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/story')} style={{ padding: '16px 32px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}>
                <Camera size={18} /> Read Travel Diaries
              </button>
              <button onClick={() => navigate('/about')} style={{ padding: '16px 32px', backgroundColor: 'transparent', color: 'white', border: '2px solid white', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.backgroundColor='white'; e.currentTarget.style.color='#111827';}} onMouseLeave={(e)=>{e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='white';}}>
                Our Mission
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. QUICK CALL TO ACTION (FOOTER PRE-AREA)
      ========================================== */}
      <section style={{ backgroundColor: '#16a34a', padding: '80px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>Ready to start your Odessey?</h2>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '40px' }}>Whether you know exactly where you want to go, or you need our AI planner to guide you, we are ready when you are.</p>
          <button onClick={() => navigate('/plan')} style={{ padding: '20px 50px', backgroundColor: 'white', color: '#16a34a', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}>
            Build My Itinerary Now
          </button>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        .spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;