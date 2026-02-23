import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, Sparkles, Compass, X, Calendar as CalIcon, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItinerariesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  // --- EXPANDED MOCK DATA (7 FULL ITINERARIES) ---
  const itineraries = [
    { 
      id: 1, title: "Royal Rajasthan Circuit", location: "Rajasthan", days: "7 Days / 6 Nights", category: "Heritage", 
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", tags: ["Palaces", "Desert", "Culture"],
      overview: "Experience the grandeur of India's most vibrant state. From the pink hues of Jaipur to the golden sands of Jaisalmer.",
      plan: [
        { day: 1, title: "Arrival in Jaipur", desc: "Check-in to a heritage Haveli. Evening visit to Chokhi Dhani for traditional dinner." },
        { day: 2, title: "The Pink City Heritage", desc: "Explore Amer Fort, Hawa Mahal, and the bustling Johari Bazaar." },
        { day: 3, title: "Journey to Jodhpur", desc: "Drive to Jodhpur. Evening tour of Mehrangarh Fort overlooking the blue city." },
        { day: 4, title: "Into the Thar Desert", desc: "Drive to Jaisalmer. Enjoy a sunset camel safari and overnight stay in a luxury desert camp." },
        { day: 5, title: "Golden Fort & Havelis", desc: "Explore Jaisalmer Fort, Patwon Ki Haveli, and Gadisar Lake." },
        { day: 6, title: "Udaipur - The City of Lakes", desc: "Drive to Udaipur. Evening boat ride on Lake Pichola at sunset." },
        { day: 7, title: "Departure", desc: "Morning visit to the City Palace before departure." }
      ]
    },
    { 
      id: 2, title: "Kerala Backwaters & Tea Estates", location: "Kerala", days: "6 Days / 5 Nights", category: "Nature", 
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", tags: ["Houseboat", "Hills", "Ayurveda"],
      overview: "A deeply relaxing journey through 'God's Own Country', blending misty mountains with serene coastal backwaters.",
      plan: [
        { day: 1, title: "Arrival in Kochi & Munnar Drive", desc: "Arrive in Kochi, scenic drive to Munnar. View Cheeyappara waterfalls." },
        { day: 2, title: "Munnar Tea Gardens", desc: "Visit the Tata Tea Museum, Eravikulam National Park, and Mattupetty Dam." },
        { day: 3, title: "Thekkady Wildlife", desc: "Drive to Thekkady. Afternoon elephant ride and Periyar lake boat safari." },
        { day: 4, title: "Alleppey Houseboat", desc: "Check into a private traditional houseboat. Cruise the backwaters while a chef prepares local meals." },
        { day: 5, title: "Marari Beach Relaxation", desc: "Disembark and drive to Marari for a quiet day at a pristine, uncrowded beach." },
        { day: 6, title: "Departure", desc: "Return drive to Kochi airport." }
      ]
    },
    { 
      id: 3, title: "Spiti Valley Expedition", location: "Himachal Pradesh", days: "9 Days / 8 Nights", category: "Adventure", 
      image: "https://images.unsplash.com/photo-1623227866981-d131ec6d7c71?auto=format&fit=crop&w=800&q=80", tags: ["High Altitude", "Monasteries", "Trekking"],
      overview: "A rugged, breathtaking road trip into the cold desert mountains of the Himalayas. Not for the faint of heart.",
      plan: [
        { day: 1, title: "Shimla to Kalpa", desc: "Begin the epic mountain drive. Overnight stay in Kalpa with views of Kinner Kailash." },
        { day: 2, title: "Entering the Desert", desc: "Drive to Tabo via the treacherous and beautiful Indo-Tibet highway." },
        { day: 3, title: "Tabo to Kaza", desc: "Visit the 1000-year-old Tabo Monastery, then drive to Kaza, the heart of Spiti." },
        { day: 4, title: "Key Monastery & Kibber", desc: "Visit the iconic Key Monastery perched on a hilltop, and the high-altitude village of Kibber." },
        { day: 5, title: "Langza to Chandratal", desc: "Drive to the stunning, crescent-shaped Chandratal Lake. Camp overnight under the stars." },
        { day: 6, title: "Kunzum Pass to Manali", desc: "Cross the challenging Kunzum Pass and Rohtang Pass down into the green Manali valley." },
        { day: 7, title: "Departure", desc: "Relaxed morning in Manali before departure." }
      ]
    },
    { 
      id: 4, title: "Golden Triangle Highlights", location: "Delhi, Agra, Jaipur", days: "5 Days / 4 Nights", category: "Heritage", 
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", tags: ["Taj Mahal", "History", "Monuments"],
      overview: "The quintessential Indian journey. Witness the bustling streets of Delhi, the iconic Taj Mahal, and the royal heritage of Jaipur.",
      plan: [
        { day: 1, title: "Welcome to New Delhi", desc: "Arrive in the capital. Afternoon tour of Qutub Minar, India Gate, and Humayun's Tomb." },
        { day: 2, title: "Old Delhi to Agra", desc: "Morning rickshaw ride through Chandni Chowk. Afternoon drive to Agra and sunset view of the Taj Mahal from Mehtab Bagh." },
        { day: 3, title: "The Taj Mahal & Agra Fort", desc: "Sunrise visit to the Taj Mahal. Later, explore the massive red sandstone Agra Fort. Evening drive to Jaipur." },
        { day: 4, title: "Jaipur Sightseeing", desc: "Elephant or jeep ride up to Amer Fort. Afternoon photo stop at Jal Mahal and Hawa Mahal." },
        { day: 5, title: "Departure", desc: "Morning shopping for local handicrafts in Jaipur. Transfer to Delhi or Jaipur airport." }
      ]
    },
    { 
      id: 5, title: "Andaman Island Hopping", location: "Andaman Islands", days: "7 Days / 6 Nights", category: "Relaxation", 
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", tags: ["Beaches", "Scuba", "Sunsets"],
      overview: "Escape to tropical paradise. Discover crystal-clear waters, white sandy beaches, and vibrant coral reefs untouched by the mainland hustle.",
      plan: [
        { day: 1, title: "Arrival in Port Blair", desc: "Arrive at Port Blair. Afternoon visit to Cellular Jail followed by the stirring Light and Sound Show." },
        { day: 2, title: "Ferry to Havelock Island", desc: "Morning luxury ferry to Havelock. Spend the afternoon relaxing at the world-famous Radhanagar Beach." },
        { day: 3, title: "Elephant Beach Adventure", desc: "Take a speed boat to Elephant Beach for snorkeling, sea walking, or scuba diving among vibrant corals." },
        { day: 4, title: "Neil Island Tranquility", desc: "Ferry to Neil Island. Visit the serene Bharatpur Beach and watch an unforgettable sunset." },
        { day: 5, title: "Natural Bridge Exploration", desc: "Explore the incredible Howrah Bridge (Natural Rock Formation) and relax at Laxmanpur Beach." },
        { day: 6, title: "Return to Port Blair", desc: "Morning ferry back to Port Blair. Evening free for local souvenir shopping." },
        { day: 7, title: "Departure", desc: "Morning transfer to the airport." }
      ]
    },
    { 
      id: 6, title: "Meghalaya Monsoon Magic", location: "Meghalaya", days: "6 Days / 5 Nights", category: "Nature", 
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80", tags: ["Waterfalls", "Caves", "Root Bridges"],
      overview: "Step into the 'Abode of Clouds'. Explore living root bridges, mystical caves, and some of the highest waterfalls in Asia.",
      plan: [
        { day: 1, title: "Guwahati to Shillong", desc: "Arrive at Guwahati and drive to Shillong. En route, stop at the beautiful Umiam Lake." },
        { day: 2, title: "Shillong Local & Laitlum", desc: "Visit Elephant Falls and Shillong Peak. Afternoon trek to the breathtaking Laitlum Canyons." },
        { day: 3, title: "Drive to Cherrapunji", desc: "Drive to the wettest place on earth. View the dramatic Nohkalikai Falls and explore Mawsmai Cave." },
        { day: 4, title: "Double Decker Root Bridge", desc: "Descend 3000 steps deep into the jungle to witness the incredible living root bridges of Nongriat." },
        { day: 5, title: "Crystal Clear Dawki", desc: "Drive to the border town of Dawki. Enjoy a boat ride on the transparent Umngot River." },
        { day: 6, title: "Departure", desc: "Return journey to Guwahati for your onward flight." }
      ]
    },
    { 
      id: 7, title: "Kashmir Paradise Retreat", location: "Jammu & Kashmir", days: "6 Days / 5 Nights", category: "Nature", 
      image: "https://images.unsplash.com/photo-1595815771614-ade9d6527620?auto=format&fit=crop&w=800&q=80", tags: ["Snow", "Shikara", "Valleys"],
      overview: "Often called 'Heaven on Earth', experience the serene lakes of Srinagar and the rolling green meadows of Pahalgam and Gulmarg.",
      plan: [
        { day: 1, title: "Srinagar & Dal Lake", desc: "Arrive in Srinagar. Check into a traditional wooden houseboat and enjoy a sunset Shikara ride." },
        { day: 2, title: "Mughal Gardens", desc: "Visit the stunning terraced Shalimar Bagh and Nishat Bagh. Evening stroll around the local markets." },
        { day: 3, title: "Excursion to Gulmarg", desc: "Day trip to the 'Meadow of Flowers'. Take the thrilling Gulmarg Gondola ride up to Mount Apharwat." },
        { day: 4, title: "Srinagar to Pahalgam", desc: "Drive to Pahalgam, the 'Valley of Shepherds', passing saffron fields and apple orchards." },
        { day: 5, title: "Exploring Betaab Valley", desc: "Visit the scenic Betaab Valley and Aru Valley. Relax by the Lidder River." },
        { day: 6, title: "Departure", desc: "Drive back to Srinagar airport with memories of a lifetime." }
      ]
    }
  ];

  const filters = ['All', 'Heritage', 'Nature', 'Adventure', 'Relaxation'];
  const displayedItineraries = activeFilter === 'All' ? itineraries : itineraries.filter(i => i.category === activeFilter);

  // Navigates to the Plan page, passing the specific package data in the background
  const handleCustomize = (e, packageData) => {
    e.stopPropagation(); 
    navigate('/plan', { state: { prefillPackage: packageData } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden', position: 'relative' }}>
      
      {/* HERO SECTION */}
      <div style={{ position: 'relative', height: '45vh', minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.8))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            <Compass size={16} /> Curated Journeys
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: '800', color: 'white', marginBottom: '15px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '-1px' }}>Ready-To-Go Itineraries</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>Expertly crafted travel plans covering India’s most iconic destinations. View the plans, or customize them to your liking.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* FILTERS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '-30px', position: 'relative', zIndex: 10, marginBottom: '50px' }}>
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} style={{ padding: '12px 24px', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: activeFilter === filter ? '#16a34a' : 'white', color: activeFilter === filter ? 'white' : '#4b5563', border: activeFilter === filter ? '1px solid #16a34a' : '1px solid #e5e7eb', boxShadow: activeFilter === filter ? '0 10px 20px rgba(22, 163, 74, 0.25)' : '0 4px 6px rgba(0,0,0,0.05)' }}>
              {filter}
            </button>
          ))}
        </div>

        {/* ITINERARIES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {displayedItineraries.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItinerary(item)}
              style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s, box-shadow 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} 
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ height: '220px', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> {item.days}
                </div>
              </div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <MapPin size={14} /> {item.location}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>{item.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={(e) => handleCustomize(e, item)} 
                  style={{ marginTop: 'auto', width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
                  onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#dcfce7'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#f0fdf4'}
                >
                  Customize this trip <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DAY-BY-DAY ITINERARY MODAL --- */}
      {selectedItinerary && (
        <div 
          onClick={() => setSelectedItinerary(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease-out forwards' }}
          >
            <button onClick={() => setSelectedItinerary(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10 }}>
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div style={{ height: '250px', flexShrink: 0, position: 'relative' }}>
              <img src={selectedItinerary.image} alt={selectedItinerary.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17, 24, 39, 0.95), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '25px', left: '35px', right: '35px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Map size={12} /> {selectedItinerary.location}</span>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {selectedItinerary.days}</span>
                </div>
                <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>{selectedItinerary.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.5' }}>{selectedItinerary.overview}</p>
              </div>
            </div>

            {/* Scrollable Day-by-Day View */}
            <div style={{ padding: '35px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalIcon size={20} color="#16a34a" /> Day-by-Day Plan
              </h3>
              
              <div style={{ position: 'relative', borderLeft: '2px dashed #e5e7eb', marginLeft: '10px', paddingLeft: '25px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {selectedItinerary.plan?.map((day) => (
                  <div key={day.day} style={{ position: 'relative' }}>
                    {/* Timeline Dot */}
                    <div style={{ position: 'absolute', left: '-33px', top: '0', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid #f0fdf4' }} />
                    <div style={{ color: '#16a34a', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Day {day.day}</div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px' }}>{day.title}</h4>
                    <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>{day.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Sticky Footer */}
            <div style={{ padding: '20px 35px', backgroundColor: 'white', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>Want to tweak this plan?</div>
              <button 
                onClick={(e) => handleCustomize(e, selectedItinerary)}
                style={{ padding: '14px 28px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
              >
                Customize this trip <ArrowRight size={18} />
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

export default ItinerariesPage;