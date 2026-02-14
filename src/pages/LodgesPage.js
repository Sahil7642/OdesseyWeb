import React from 'react';

const LodgesPage = () => {
  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Our Lodges & Stays</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>Handpicked eco-friendly stays for a sustainable experience.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <img src={`https://source.unsplash.com/random/400x300?hotel,nature,${i}`} alt="Lodge" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>Eco-Nature Resort {i}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Coorg, Karnataka</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LodgesPage;