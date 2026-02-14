import React from 'react';

const PlanTrip = () => {
  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>Plan Your Custom Trip</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px' }}>Tell us what you love, and we'll help you build the perfect itinerary.</p>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input type="text" placeholder="Where do you want to go?" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <div style={{ display: 'flex', gap: '20px' }}>
          <input type="date" style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
          <input type="number" placeholder="Travelers" style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        </div>
        <textarea placeholder="Any specific interests? (e.g., Hiking, Food, History)" rows="5" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db' }}></textarea>
        <button style={{ padding: '15px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Start Planning</button>
      </form>
    </div>
  );
};

export default PlanTrip;