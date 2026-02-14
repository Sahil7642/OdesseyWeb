import React from 'react';

const ExperiencesPage = () => {
  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '50px' }}>Traveler Experiences</h1>
      
      <div style={{ display: 'grid', gap: '40px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ backgroundColor: '#f3f4f6', padding: '40px', borderRadius: '20px', textAlign: 'left' }}>
            <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#374151', marginBottom: '20px' }}>
              "Odessey planned the perfect trip for us. We discovered hidden gems we would have never found on our own. Truly magical!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
              <div>
                <h4 style={{ fontWeight: 'bold' }}>Sarah Jenkins</h4>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Traveled to Rajasthan</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencesPage;