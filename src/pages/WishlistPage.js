import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Trash2, Calendar, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('odessey_wishlist') || '[]');
    setWishlist(saved);
  }, []);

  // Remove item from wishlist
  const handleRemove = (e, nameToRemove) => {
    e.stopPropagation();
    const updatedList = wishlist.filter(item => item.name !== nameToRemove);
    setWishlist(updatedList);
    localStorage.setItem('odessey_wishlist', JSON.stringify(updatedList));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', paddingTop: '100px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', backgroundColor: '#fee2e2', borderRadius: '50%', marginBottom: '20px' }}>
          <Heart size={32} color="#dc2626" fill="#dc2626" />
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#111827', marginBottom: '15px', letterSpacing: '-1px' }}>
          Your Travel Wishlist
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          All the beautiful destinations you've saved. Ready to turn these dreams into itineraries?
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {wishlist.length === 0 ? (
          /* EMPTY STATE */
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', border: '1px dashed #d1d5db', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
            <Compass size={60} color="#9ca3af" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>Your wishlist is empty</h3>
            <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>You haven't saved any destinations yet. Start exploring and click the heart icon to save places here.</p>
            <button 
              onClick={() => navigate('/discover')}
              style={{ backgroundColor: '#16a34a', color: 'white', padding: '14px 30px', borderRadius: '50px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
            >
              Discover Destinations
            </button>
          </div>
        ) : (
          /* WISHLIST GRID */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {wishlist.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/place/${item.name}`)}
                style={{ 
                  backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e5e7eb', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  cursor: 'pointer', display: 'flex', flexDirection: 'column' 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={(e) => handleRemove(e, item.name)}
                    style={{ position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s' }}
                    onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#fee2e2'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.9)'}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                    {item.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#16a34a', marginBottom: '15px', fontWeight: '600' }}>
                    <MapPin size={14} /> India
                  </div>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '25px' }}>
                    {item.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/plan', { state: { presetDestination: item.name } });
                      }}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#16a34a', color: 'white', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
                    >
                      <Calendar size={16} /> Plan Trip
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', backgroundColor: '#f3f4f6', borderRadius: '10px', color: '#4b5563' }}>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;