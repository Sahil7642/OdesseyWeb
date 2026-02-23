import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, Sparkles, Activity, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperiencesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState(null);

  // --- EXPANDED DATA (12 EXPERIENCES) ---
  const experiences = [
    { 
      id: 1, title: "White Water Rafting on the Ganges", location: "Rishikesh, UK", duration: "4 Hours", category: "Adventure", 
      image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80", 
      desc: "Navigate the thrilling grade 3 and 4 rapids of the holy Ganges river with expert guides.",
      fullDesc: "Get your adrenaline pumping on one of India's most famous white-water rafting routes. Starting from Shivpuri, you will battle legendary rapids like 'Roller Coaster' and 'Golf Course' under the strict supervision of certified river guides. The experience concludes with a calm float near the iconic Laxman Jhula, allowing you to body-surf in the holy waters of the Ganges.",
      inclusions: ["Certified River Guide & Safety Briefing", "Premium Rafting Gear & Life Jackets", "Cliff Jumping Activity", "Transport back to Base Camp"]
    },
    { 
      id: 2, title: "Traditional Rajasthani Cooking Masterclass", location: "Jaipur, RJ", duration: "3 Hours", category: "Culture", 
      image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=800&q=80", 
      desc: "Learn to cook authentic Dal Baati Churma and Laal Maas in a local family's heritage home.",
      fullDesc: "Food is the gateway to culture. Step into the warm kitchen of a local Rajasthani family residing in a restored courtyard home. You will start by learning about the local spices that give Rajputana food its fiery reputation. Get hands-on experience kneading dough for Baati, slow-cooking rich curries, and finally sitting down with the family to feast on the royal meal you just helped prepare.",
      inclusions: ["Hands-on Cooking Instruction", "All Fresh Ingredients & Spices", "Printed Recipe Cards to take home", "Full Lunch/Dinner Feast"]
    },
    { 
      id: 3, title: "Sunrise Tiger Safari", location: "Bandhavgarh, MP", duration: "Half Day", category: "Wildlife", 
      image: "https://images.unsplash.com/photo-1589705353106-932d0df34173?auto=format&fit=crop&w=800&q=80", 
      desc: "An early morning open-jeep safari tracking the elusive Bengal Tiger and wild elephants.",
      fullDesc: "Enter the dense Sal forests of Bandhavgarh before dawn. Known for having one of the highest densities of Bengal Tigers in the world, the early morning light offers the best chance for tracking these magnificent predators. Led by an expert naturalist, you will decipher alarm calls and pugmarks while observing a diverse range of wildlife including leopards, deer, and exotic birds.",
      inclusions: ["Open-top 4x4 Gypsy Safari", "Expert Wildlife Naturalist/Tracker", "National Park Entry Permits", "Packed Morning Picnic Breakfast"]
    },
    { 
      id: 4, title: "Himalayan Sound Healing & Yoga", location: "Dharamshala, HP", duration: "Full Day", category: "Wellness", 
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", 
      desc: "Reset your mind and body with Tibetan singing bowls and guided meditation in the mountains.",
      fullDesc: "Escape the noise of the world and retreat to a quiet monastery nestled in the upper reaches of McLeod Ganj. This full-day wellness journey begins with a gentle morning Hatha yoga session facing the Dhauladhar mountains. The afternoon is dedicated to a profound sound bathing session using authentic Tibetan singing bowls, designed to align your chakras and melt away deep-seated stress.",
      inclusions: ["Morning Mountain Yoga Session", "Guided Singing Bowl Therapy", "Monastery Tour & Monastic Interaction", "Healthy Vegetarian Sattvic Meals"]
    },
    { 
      id: 5, title: "Midnight Heritage Walk", location: "Old Delhi", duration: "2.5 Hours", category: "Culture", 
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80", 
      desc: "Explore the narrow, historic alleys of Chandni Chowk and taste legendary midnight street food.",
      fullDesc: "See Old Delhi come alive when the rest of the city goes to sleep. As the chaotic daytime traffic clears, the majestic illuminated silhouettes of the Jama Masjid and Red Fort take center stage. Walk through ancient lanes learning about Mughal history, and stop at 100-year-old street food stalls to taste kebabs, rich nihari, and sweet, frothy rabri under the moonlight.",
      inclusions: ["Expert Local Historian Guide", "Safe, Curated Route", "Unlimited Street Food Tastings", "Bottled Water & Wet Wipes"]
    },
    { 
      id: 6, title: "Scuba Diving with Mantas", location: "Havelock Island, AN", duration: "Full Day", category: "Adventure", 
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", 
      desc: "Discover vibrant coral reefs and swim alongside majestic manta rays in crystal clear waters.",
      fullDesc: "Whether you are a beginner or a seasoned diver, the warm, crystal-clear waters of the Andaman Sea offer an unparalleled underwater spectacle. Board a dive boat and head out to 'The Wall', a famous dive site known for its dropping coral reefs. Swim among schools of neon fish, graceful sea turtles, and if you are lucky, the giant oceanic Manta Rays.",
      inclusions: ["PADI Certified Dive Instructor", "All Scuba Gear & Wetsuits", "Underwater Photography/Video", "Boat Transfers & Lunch"]
    },
    { 
      id: 7, title: "Paragliding over the Himalayas", location: "Bir Billing, HP", duration: "2 Hours", category: "Adventure", 
      image: "https://images.unsplash.com/photo-1521532359737-1425e40e326c?auto=format&fit=crop&w=800&q=80", 
      desc: "Soar through the skies at Asia's highest and world's second-highest paragliding site.",
      fullDesc: "Experience the ultimate thrill of flying. After a scenic drive to the takeoff point at Billing (8000 ft), you'll strap in with a highly experienced tandem pilot. Run off the edge of the mountain and instantly catch the thermals, soaring high above the Kangra Valley, lush green tea gardens, and Tibetan monasteries before a gentle landing in Bir.",
      inclusions: ["Tandem Paragliding Flight (15-20 Mins)", "Transport to Takeoff Point", "GoPro Video Recording", "Safety Briefing & Equipment"]
    },
    { 
      id: 8, title: "Snow Leopard Tracking Expedition", location: "Kibber, Spiti Valley", duration: "4 Days", category: "Wildlife", 
      image: "https://images.unsplash.com/photo-1545624177-3e1174ee0fce?auto=format&fit=crop&w=800&q=80", 
      desc: "A rare, extreme-altitude expedition to spot the elusive 'Ghost of the Mountains'.",
      fullDesc: "This is an expedition for the true wildlife enthusiast. Set in the harsh, freezing winter of Spiti Valley, you will be guided by indigenous trackers from the Kibber village who possess an uncanny ability to spot the camouflage of the Snow Leopard. Spend your days scanning the icy ridges and your nights warming up in a local homestay.",
      inclusions: ["Indigenous Wildlife Trackers & Spotting Scopes", "Traditional Homestay Accommodation", "All Meals & Hot Beverages", "Permits & Conservation Fees"]
    },
    { 
      id: 9, title: "The Theyyam Ritual Experience", location: "Kannur, Kerala", duration: "Evening", category: "Culture", 
      image: "https://images.unsplash.com/photo-1600676435306-03fcb59ba5b1?auto=format&fit=crop&w=800&q=80", 
      desc: "Witness the intense and mystical 800-year-old trance-dance ritual of Malabar.",
      fullDesc: "Theyyam is not just a performance; it is a sacred ritual where the dancer is believed to be possessed by the gods. We will take you to a local village shrine ('Kavu') after dark. Watch as the performers don massive, intricate headgear and vibrant face paint. Driven by the hypnotic beating of the Chenda drums, the dancer leaps through fire, creating an atmosphere that is truly spellbinding.",
      inclusions: ["Local Translator and Guide", "Reserved Viewing Spot", "Pre-ritual Explanation Session", "Transport to Village Shrine"]
    },
    { 
      id: 10, title: "Traditional Ayurveda Detox", location: "Varkala, Kerala", duration: "Full Day", category: "Wellness", 
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80", 
      desc: "Rejuvenate your body with an ancient Abhyanga massage overlooking the Arabian Sea.",
      fullDesc: "Located atop the famous red cliffs of Varkala, this wellness experience focuses on the ancient healing science of Ayurveda. Following a brief consultation with an Ayurvedic doctor to determine your 'Dosha' (body type), you will receive a full-body Abhyanga massage using warm, medicated herbal oils. The day concludes with a Shirodhara treatment (warm oil poured continuously on the forehead) to calm the nervous system.",
      inclusions: ["Ayurvedic Doctor Consultation", "60-Min Abhyanga Oil Massage", "45-Min Shirodhara Treatment", "Herbal Tea & Detox Lunch"]
    },
    { 
      id: 11, title: "Living Root Bridge Trek", location: "Nongriat, Meghalaya", duration: "Full Day", category: "Adventure", 
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80", 
      desc: "Descend 3,000 steps into the jungle to find a bio-engineering marvel.",
      fullDesc: "The Khasi people of Meghalaya don't build bridges; they grow them. This challenging but immensely rewarding trek takes you deep into the rainforests of Cherrapunji. Navigating steep stone steps and wire suspension bridges crossing roaring rivers, you will finally arrive at the magnificent Double Decker Living Root Bridge. Swim in the crystal-clear natural pools beneath the bridge to cool off before the hike back up.",
      inclusions: ["Local Khasi Trekking Guide", "Walking Sticks", "Entry Fees to Nongriat", "Packed Jungle Picnic Lunch"]
    },
    { 
      id: 12, title: "Kutchi Embroidery Workshop", location: "Bhuj, Gujarat", duration: "Half Day", category: "Culture", 
      image: "https://images.unsplash.com/photo-1605814545086-455b8beffca2?auto=format&fit=crop&w=800&q=80", 
      desc: "Learn the intricate art of mirror-work embroidery from artisan women in a desert village.",
      fullDesc: "The Rann of Kutch is famous for its vibrant textiles. Visit a rural artisan village where the women practice complex, generations-old embroidery techniques like 'Rabari' and 'Suf'. Sit with them in their colorful mud huts, learn how to thread the tiny mirrors into the fabric, and create your own small textile piece to take home as a souvenir.",
      inclusions: ["Hands-on Embroidery Lesson", "All Fabric, Threads, and Mirrors", "Interaction with Master Artisans", "Traditional Kutchi Lunch"]
    }
  ];

  const categories = ['All', 'Adventure', 'Culture', 'Wildlife', 'Wellness'];
  const displayedExps = activeCategory === 'All' ? experiences : experiences.filter(e => e.category === activeCategory);

  const handleIncludeExperience = (e, expData) => {
    e.stopPropagation();
    navigate('/plan', { state: { prefillExperience: expData } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '80px', overflowX: 'hidden', position: 'relative' }}>
      
      {/* HERO SECTION */}
      <div style={{ position: 'relative', height: '45vh', minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.4), rgba(17, 24, 39, 0.8))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '50px', color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            <Activity size={16} /> Beyond Sightseeing
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: '800', color: 'white', marginBottom: '15px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '-1px' }}>Unforgettable Experiences</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>Immerse yourself in the culture, adventure, and soul of the places you visit.</p>
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

        {/* EXPERIENCES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          {displayedExps.map((exp) => (
            <div 
              key={exp.id} 
              onClick={() => setSelectedExperience(exp)}
              style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} 
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ height: '240px', position: 'relative' }}>
                <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#16a34a', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Sparkles size={14} /> {exp.category}
                </div>
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>
                    <MapPin size={14} /> {exp.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4b5563', fontSize: '13px', fontWeight: '600', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '6px' }}>
                    <Clock size={12} /> {exp.duration}
                  </div>
                </div>
                
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', lineHeight: '1.3' }}>{exp.title}</h3>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{exp.desc}</p>

                <button 
                  onClick={(e) => handleIncludeExperience(e, exp)} 
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: 'transparent', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', border: '2px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
                  onMouseEnter={(e)=>{e.currentTarget.style.backgroundColor='#16a34a'; e.currentTarget.style.color='white';}} onMouseLeave={(e)=>{e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#16a34a';}}
                >
                  Include in itinerary <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DETAILED EXPERIENCE MODAL --- */}
      {selectedExperience && (
        <div 
          onClick={() => setSelectedExperience(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease-out forwards' }}
          >
            <button onClick={() => setSelectedExperience(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10 }}>
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div style={{ height: '300px', flexShrink: 0, position: 'relative' }}>
              <img src={selectedExperience.image} alt={selectedExperience.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17, 24, 39, 0.95), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '25px', left: '35px', right: '35px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {selectedExperience.location}</span>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {selectedExperience.duration}</span>
                </div>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', lineHeight: '1.2' }}>{selectedExperience.title}</h2>
              </div>
            </div>

            {/* Scrollable Details */}
            <div style={{ padding: '35px', overflowY: 'auto', backgroundColor: 'white', flex: 1 }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>What to Expect</h3>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '35px' }}>
                {selectedExperience.fullDesc}
              </p>

              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>What's Included</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {selectedExperience.inclusions.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: '#f0fdf4', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <CheckCircle2 size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#15803d', fontSize: '15px', fontWeight: '600' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Sticky Footer */}
            <div style={{ padding: '20px 35px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>Add this to your trip?</div>
              <button 
                onClick={(e) => handleIncludeExperience(e, selectedExperience)}
                style={{ padding: '14px 28px', borderRadius: '12px', backgroundColor: '#16a34a', color: 'white', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
              >
                Include in itinerary <ArrowRight size={18} />
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

export default ExperiencesPage;