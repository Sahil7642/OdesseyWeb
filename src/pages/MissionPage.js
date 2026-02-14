import React from 'react';
// 👇 1. Import your Logo
import logoSrc from '/Users/sahilgupta/OdesseyWeb/odessey-web/src/Odesseylogo/logo_odessey.png';

const MissionPage = () => {
  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* 👇 2. Logo Section */}
      <div style={{ 
        display: 'inline-block', 
        padding: '20px', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '50%', 
        marginBottom: '30px' 
      }}>
        <img 
          src={logoSrc} 
          alt="Odessey Logo" 
          style={{ height: '80px', width: 'auto', objectFit: 'contain' }} 
        />
      </div>

      <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '30px', color: '#111827' }}>Our Mission</h1>
      
      <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#4b5563' }}>
        Odessey is a modern travel experience company dedicated to curating journeys that feel personal, effortless, and meaningful. 
        We believe travel is more than movement - it’s a story. 
        Our mission is to transform these stories into unforgettable experiences by combining thoughtful planning, local expertise, 
        and a deep understanding of what travellers truly want.
      </p>

    </div>
  );
};

export default MissionPage;