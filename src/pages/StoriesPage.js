import React from 'react';

const StoriesPage = () => {
  const stories = [
    { title: "Finding Silence in Spiti", author: "Ananya S.", img: "https://source.unsplash.com/random/800x600?mountain" },
    { title: "A Culinary Journey in Kerala", author: "Rahul V.", img: "https://source.unsplash.com/random/800x600?food,india" },
    { title: "The Hidden Beaches of Gokarna", author: "Priya M.", img: "https://source.unsplash.com/random/800x600?beach" },
    { title: "Temple Trails of Tamil Nadu", author: "Amit K.", img: "https://source.unsplash.com/random/800x600?temple" }
  ];

  return (
    <div style={{ padding: '120px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Travel Stories</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {stories.map((story, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
            <img src={story.img} alt={story.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{story.title}</h3>
              <p style={{ color: '#6b7280' }}>By {story.author}</p>
              <button style={{ marginTop: '15px', color: '#16a34a', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>Read More &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;