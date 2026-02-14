import React from 'react';

const ItinerariesPage = () => {
  const itineraries = [
    { name: "Golden Triangle Tour", days: "5 Days", price: "₹25,000" },
    { name: "Kerala Backwaters & Hills", days: "7 Days", price: "₹35,000" },
    { name: "Rajasthan Royal Desert", days: "8 Days", price: "₹40,000" },
    { name: "Himachal Adventure", days: "6 Days", price: "₹28,000" }
  ];

  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px' }}>Curated Itineraries</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        {itineraries.map((item, index) => (
          <div key={index} style={{ padding: '30px', backgroundColor: '#f9fafb', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>{item.name}</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>{item.days} • Starting from {item.price}</p>
            <button style={{ padding: '10px 20px', backgroundColor: '#111827', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItinerariesPage;