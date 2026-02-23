import React, { useState } from 'react';
import { MapPin, Star, Coffee, Wifi, Leaf, Wind, ArrowRight, Home, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LodgesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLodge, setSelectedLodge] = useState(null);

  // --- EXPANDED DATA (12 LODGES) ---
  const lodges = [
    { 
      id: 1, name: "The Himalayan Retreat", location: "Manali, HP", category: "Luxury", rating: 5, 
      image: "https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?auto=format&fit=crop&w=800&q=80", 
      desc: "A premium wood-and-stone lodge offering panoramic views of snow-capped peaks.",
      fullDesc: "Nestled at an altitude of 7,000 feet, The Himalayan Retreat is a sanctuary of luxury amidst the raw beauty of the mountains. Built using traditional Himachali Kath-Kuni architecture, every room features floor-to-ceiling windows, private balconies, and heated flooring. Wake up to the sight of the Pir Panjal range and spend your evenings by the crackling central fireplace.",
      highlights: ["Panoramic Mountain Views", "Heated Floors & Private Balcony", "In-house Ayurvedic Spa", "Organic Farm-to-Table Dining"]
    },
    { 
      id: 2, name: "Pepper Trail Eco-Stay", location: "Wayanad, Kerala", category: "Eco-Friendly", rating: 4.8, 
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80", 
      desc: "Treehouses built deep within a 200-acre coffee and spice plantation.",
      fullDesc: "Step back in time and live high above the ground in luxurious treehouses resting on giant Jackfruit trees. Set within a 200-acre colonial coffee and spice plantation, Pepper Trail offers absolute privacy. Navigate the estate on bicycles, take a guided plantation walk, or paddle a coracle on the private reservoir.",
      highlights: ["Luxury Treehouse Accommodation", "200-acre Private Spice Estate", "Guided Plantation Tours", "Zero-plastic & 100% Solar Powered"]
    },
    { 
      id: 3, name: "Desert Rose Camp", location: "Jaisalmer, Rajasthan", category: "Heritage", rating: 4.9, 
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", 
      desc: "Luxurious Swiss tents in the Thar desert with traditional Rajasthani hospitality.",
      fullDesc: "Experience the magic of the Thar Desert without compromising on luxury. Desert Rose Camp offers lavish Swiss tents complete with plush bedding, en-suite bathrooms, and private verandas. As the sun sets, the camp comes alive with the soulful tunes of Manganiyar musicians, traditional Kalbelia dances, and a magnificent dinner under the starlit desert sky.",
      highlights: ["Air-Conditioned Swiss Tents", "Sunset Camel Safaris", "Live Rajasthani Folk Music", "Stargazing Deck"]
    },
    { 
      id: 4, name: "WildGrass Safari Lodge", location: "Kaziranga, Assam", category: "Eco-Friendly", rating: 4.7, 
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80", 
      desc: "Stay amidst nature with high chances of spotting rhinos right from your balcony.",
      fullDesc: "Designed to blend seamlessly into the surrounding wilderness, WildGrass Lodge is the perfect base camp for wildlife enthusiasts. Located just minutes from the Kaziranga National Park gates, the lodge features rustic timber cottages. Enjoy expert-led jeep safaris by day and warm bonfires sharing jungle tales by night.",
      highlights: ["Proximity to National Park Gates", "Expert Naturalist Guides", "Birdwatching Trails", "Locally Sourced Assamese Cuisine"]
    },
    { 
      id: 5, name: "Old Quarter Homestay", location: "Puducherry", category: "Homestay", rating: 4.9, 
      image: "https://images.unsplash.com/photo-1583307519305-64d50c76ce83?auto=format&fit=crop&w=800&q=80", 
      desc: "A beautifully restored French colonial house with an authentic local family.",
      fullDesc: "Located in the heart of White Town, this restored 18th-century French villa offers an intimate glimpse into the slow-paced life of Pondicherry. High ceilings, vintage teak furniture, and a sunlit central courtyard make it a photographer's dream. The host family serves a unique blend of Franco-Tamil cuisine that you won't find in any restaurant.",
      highlights: ["Heritage Colonial Architecture", "Walking Distance to Promenade Beach", "Authentic Franco-Tamil Home Cooking", "Bicycle Rentals Included"]
    },
    { 
      id: 6, name: "The Blue City Haveli", location: "Jodhpur, Rajasthan", category: "Heritage", rating: 5, 
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80", 
      desc: "Live like royalty in a 300-year-old restored Haveli overlooking the Mehrangarh Fort.",
      fullDesc: "Immerse yourself in Rajputana grandeur. This 300-year-old Haveli has been meticulously restored to retain its intricate frescoes, carved jharokhas (balconies), and regal courtyards. The rooftop restaurant offers a breathtaking, uninterrupted view of the colossal Mehrangarh Fort, making every meal a majestic experience.",
      highlights: ["Uninterrupted Mehrangarh Fort Views", "Original 300-year-old Frescoes", "Rooftop Fine Dining", "Curated Old City Heritage Walks"]
    },
    { 
      id: 7, name: "Taj Lake Palace", location: "Udaipur, RJ", category: "Luxury", rating: 5, 
      image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80", 
      desc: "Float on the serene waters of Lake Pichola in a stunning marble palace.",
      fullDesc: "Originally built in 1746 as a pleasure palace for Maharana Jagat Singh II, the Taj Lake Palace is an architectural marvel that appears to float on the waters of Lake Pichola. Accessible only by private boat, this white marble hotel offers an unparalleled level of luxury, with rooms adorned with silk drapes, carved furniture, and sweeping views of the City Palace.",
      highlights: ["Floating Marble Palace", "Private Boat Transfers", "Jiva Spa Boat", "Heritage Champagne Walks"]
    },
    { 
      id: 8, name: "Glenburn Tea Estate", location: "Darjeeling, WB", category: "Heritage", rating: 4.9, 
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb78?auto=format&fit=crop&w=800&q=80", 
      desc: "A boutique colonial retreat set amidst rolling hills and lush green tea gardens.",
      fullDesc: "Established by a Scottish tea company in 1859, Glenburn is a heavenly plantation retreat that sits on a hillock overlooking the majestic Kanchenjunga mountain range. Stay in beautifully restored colonial bungalows, wake up to a fresh pot of estate-grown Darjeeling tea, and spend your days hiking through the estates and visiting local villages.",
      highlights: ["Views of Mount Kanchenjunga", "Tea Tasting Sessions", "Colonial British Architecture", "Guided River Hikes"]
    },
    { 
      id: 9, name: "Dal Lake Floating Palace", location: "Srinagar, J&K", category: "Heritage", rating: 4.8, 
      image: "https://images.unsplash.com/photo-1595815771614-ade9d6527620?auto=format&fit=crop&w=800&q=80", 
      desc: "Experience Kashmiri hospitality in an intricate, hand-carved cedar wood houseboat.",
      fullDesc: "Moored on the tranquil waters of Dal Lake, this premium houseboat is a masterpiece of Kashmiri craftsmanship. Featuring intricate walnut wood carvings, luxurious Persian carpets, and crystal chandeliers, it offers a romantic and peaceful stay. Enjoy breakfast on the deck as Shikaras paddle by selling fresh flowers and local saffron.",
      highlights: ["Intricate Walnut Wood Interiors", "Deck Overlooking Dal Lake", "Traditional Wazwan Cuisine", "Complimentary Shikara Rides"]
    },
    { 
      id: 10, name: "Mawlynnong Bamboo Retreat", location: "Mawlynnong, Meghalaya", category: "Eco-Friendly", rating: 4.6, 
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", 
      desc: "Live in harmony with nature in Asia's cleanest village.",
      fullDesc: "Situated in Mawlynnong, famously known as the cleanest village in Asia, this eco-retreat is constructed entirely out of bamboo and locally sourced sustainable materials. It is a completely off-grid experience that connects you directly with the Khasi community. Walk to the nearby living root bridges and enjoy meals prepared from organically grown village produce.",
      highlights: ["100% Bamboo Architecture", "Access to Asia's Cleanest Village", "Proximity to Living Root Bridges", "Authentic Khasi Hospitality"]
    },
    { 
      id: 11, name: "Spiti Valley Mudhouse", location: "Kaza, HP", category: "Homestay", rating: 4.7, 
      image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80", 
      desc: "An authentic, high-altitude stay in a traditional Spitian mud-brick home.",
      fullDesc: "If you want to experience the true essence of the high Himalayas, there is no better way than staying with a local family in a traditional mud-brick home. Designed to naturally insulate against the freezing winter cold, this cozy homestay offers warm bedding, a traditional Bukhari (wood stove), and endless cups of salty butter tea as you share stories with the hosts.",
      highlights: ["Traditional Mud Architecture", "Stunning Night Sky Stargazing", "Local Spitian Home-Cooked Meals", "Cultural Exchange with Hosts"]
    },
    { 
      id: 12, name: "Kabini Jungle Lodge", location: "Kabini, Karnataka", category: "Eco-Friendly", rating: 4.9, 
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", 
      desc: "A premier wildlife resort located on the southern fringes of the Nagarhole National Park.",
      fullDesc: "Once the hunting lodge of the Maharaja of Mysore, this spectacular eco-resort sits right on the edge of the Kabini River. It is widely considered one of the best places in Asia to spot wild elephants and the elusive black panther. Wake up to the sounds of the jungle, take a serene coracle ride on the river, and end your day with a barbecue by the water.",
      highlights: ["River-facing Cottages", "Coracle River Rides", "High Chances of Leopard Sightings", "Evening Jungle Barbecue"]
    }
  ];

  const categories = ['All', 'Luxury', 'Eco-Friendly', 'Heritage', 'Homestay'];
  const displayedLodges = activeCategory === 'All' ? lodges : lodges.filter(l => l.category === activeCategory);

  const handleBookLodge = (e, lodgeData) => {
    e.stopPropagation();
    navigate('/plan', { state: { prefillLodge: lodgeData } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden', position: 'relative' }}>
      
      {/* HERO SECTION */}
      <div style={{ position: 'relative', height: '45vh', minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.8))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            <Home size={16} /> Handpicked Stays
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: '800', color: 'white', marginBottom: '15px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '-1px' }}>Our Exclusive Lodges</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>From heritage palaces to hidden eco-retreats, discover stays that are destinations in themselves.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* FILTERS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '-30px', position: 'relative', zIndex: 10, marginBottom: '50px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '12px 24px', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: activeCategory === cat ? '#16a34a' : 'white', color: activeCategory === cat ? 'white' : '#4b5563', border: activeCategory === cat ? '1px solid #16a34a' : '1px solid #e5e7eb', boxShadow: activeCategory === cat ? '0 10px 20px rgba(22, 163, 74, 0.25)' : '0 4px 6px rgba(0,0,0,0.05)' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* LODGES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          {displayedLodges.map((lodge) => (
            <div 
              key={lodge.id} 
              onClick={() => setSelectedLodge(lodge)}
              style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} 
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ height: '240px', position: 'relative' }}>
                <img src={lodge.image} alt={lodge.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#1f2937', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                  {lodge.category}
                </div>
                <div style={{ position: 'absolute', bottom: '-15px', right: '20px', backgroundColor: 'white', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '14px', color: '#111827' }}>
                  <Star size={16} fill="#eab308" color="#eab308" /> {lodge.rating}
                </div>
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                  <MapPin size={14} /> {lodge.location}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>{lodge.name}</h3>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>{lodge.desc}</p>
                
                <div style={{ display: 'flex', gap: '15px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '20px', marginBottom: '20px' }}>
                  <Wifi size={18} title="Free Wifi" />
                  <Coffee size={18} title="Breakfast Included" />
                  <Leaf size={18} title="Eco-friendly" />
                  <Wind size={18} title="Air Conditioned" />
                </div>

                <button 
                  onClick={(e) => handleBookLodge(e, lodge)} 
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
                  onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#1f2937'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#111827'}
                >
                  Add to My Trip <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DETAILED LODGE MODAL --- */}
      {selectedLodge && (
        <div 
          onClick={() => setSelectedLodge(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease-out forwards' }}
          >
            <button onClick={() => setSelectedLodge(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10 }}>
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div style={{ height: '300px', flexShrink: 0, position: 'relative' }}>
              <img src={selectedLodge.image} alt={selectedLodge.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17, 24, 39, 0.95), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '25px', left: '35px', right: '35px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {selectedLodge.location}</span>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill="white" /> {selectedLodge.rating} Rating</span>
                </div>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', lineHeight: '1.2' }}>{selectedLodge.name}</h2>
              </div>
            </div>

            {/* Scrollable Details */}
            <div style={{ padding: '35px', overflowY: 'auto', backgroundColor: 'white', flex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>About the Property</h3>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '35px' }}>
                {selectedLodge.fullDesc}
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>Property Highlights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {selectedLodge.highlights.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: '#f9fafb', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <CheckCircle2 size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#374151', fontSize: '15px', fontWeight: '500' }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Sticky Footer */}
            <div style={{ padding: '20px 35px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>Ready to stay here?</div>
              <button 
                onClick={(e) => handleBookLodge(e, selectedLodge)}
                style={{ padding: '14px 28px', borderRadius: '12px', backgroundColor: '#111827', color: 'white', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#1f2937'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#111827'}
              >
                Add to My Trip <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LodgesPage;