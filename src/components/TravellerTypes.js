/*import React, { useState } from 'react';
import { Compass, Camera, Image as ImageIcon, X, Upload } from 'lucide-react';

const TravellerTypes = () => {
  const [activeModal, setActiveModal] = useState(null);

  // --- CONTENT DATA ---
  const travellerContent = {
    title: "The Traveller",
    definition: "A Traveller seeks to immerse themselves in the culture. They don't just see sights; they feel them.",
    destinations: [
      { name: "Spiti Valley", desc: "Rugged mountains.", img: "https://images.unsplash.com/photo-1579619623193-4e3113110593?auto=format&fit=crop&w=400&q=80" },
      { name: "Varkala Cliff", desc: "Soul meets sea.", img: "https://images.unsplash.com/photo-1596309873994-4d1012117565?auto=format&fit=crop&w=400&q=80" },
      { name: "Meghalaya", desc: "Living root bridges.", img: "https://images.unsplash.com/photo-1590456206869-d34346e92f23?auto=format&fit=crop&w=400&q=80" }
    ]
  };

  const touristContent = {
    title: "The Tourist",
    definition: "A Tourist travels for pleasure, relaxation, and the joy of ticking famous landmarks off their list.",
    destinations: [
      { name: "Taj Mahal", desc: "Symbol of love.", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" },
      { name: "Jaipur", desc: "The Pink City.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80" },
      { name: "Goa", desc: "Sun and sand.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80" }
    ]
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1534951474654-886e563917a8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1533241242337-331e5a593719?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1605626960011-e6c867a5c32c?auto=format&fit=crop&w=400&q=80"
  ];

  // --- CARD COMPONENT ---
  const Card = ({ icon: Icon, title, desc, onClick, color }) => (
    <div 
      onClick={onClick}
      style={{
        flex: '1',                // Makes all cards equal width
        minWidth: '280px',        // Prevents them from getting too squished
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #f3f4f6',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%', 
        backgroundColor: color, opacity: 0.1, position: 'absolute'
      }}></div>
      <div style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: color }}>
        <Icon size={32} />
      </div>
      
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>{desc}</p>
      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Explore &rarr;</span>
    </div>
  );

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      
      {/* HEADING *}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Find Your Travel Persona</h2>
        <p style={{ color: '#6b7280' }}>Discover who you are and share your journey.</p>
      </div>

      {/* --- GRID CONTAINER (Forces Side-by-Side) --- *}
      <div style={{
        display: 'flex',           // This aligns them horizontally
        justifyContent: 'center',
        gap: '30px',               // Space between cards
        flexWrap: 'wrap',          // Wraps to next line ONLY if screen is too small (mobile)
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Card 
          icon={Compass} 
          title="The Traveller" 
          desc="Soul searchers looking for the unknown." 
          onClick={() => setActiveModal('traveller')}
          color="#2563eb" // Blue
        />
        <Card 
          icon={Camera} 
          title="The Tourist" 
          desc="Sightseers looking for beauty and comfort." 
          onClick={() => setActiveModal('tourist')}
          color="#ea580c" // Orange
        />
        <Card 
          icon={ImageIcon} 
          title="Photo Gallery" 
          desc="Share your moments with the community." 
          onClick={() => setActiveModal('gallery')}
          color="#16a34a" // Green
        />
      </div>

      {/* --- MODAL (POPUP) --- *}
      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '40px', borderRadius: '20px',
            width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
            position: 'relative', boxShadow: '0 20px 25px rgba(0,0,0,0.1)'
          }}>
            <button 
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>

            {/* TRAVELLER CONTENT *}
            {activeModal === 'traveller' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass /> The Traveller
                </h2>
                <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#4b5563', borderLeft: '4px solid #3b82f6', paddingLeft: '15px', marginBottom: '30px' }}>
                  "{travellerContent.definition}"
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {travellerContent.destinations.map((place, i) => (
                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      <img src={place.img} alt={place.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <div style={{ padding: '15px' }}>
                        <h4 style={{ fontWeight: 'bold' }}>{place.name}</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280' }}>{place.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TOURIST CONTENT *}
            {activeModal === 'tourist' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#c2410c', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Camera /> The Tourist
                </h2>
                <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#4b5563', borderLeft: '4px solid #f97316', paddingLeft: '15px', marginBottom: '30px' }}>
                  "{touristContent.definition}"
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {touristContent.destinations.map((place, i) => (
                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      <img src={place.img} alt={place.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <div style={{ padding: '15px' }}>
                        <h4 style={{ fontWeight: 'bold' }}>{place.name}</h4>
                        <p style={{ fontSize: '13px', color: '#6b7280' }}>{place.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY CONTENT *}
            {activeModal === 'gallery' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ImageIcon /> Community Gallery
                  </h2>
                  <button onClick={() => alert("Upload feature coming soon!")} style={{ padding: '10px 20px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={16} /> Upload
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                  {galleryImages.map((img, i) => (
                    <img key={i} src={img} alt="Gallery" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default TravellerTypes;
*/
/*
import React, { useState } from 'react';
import { Compass, Camera, Image as ImageIcon, X, Upload, Mountain, CloudRain, Activity, Map } from 'lucide-react';

const TravelerTypes = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState('himalayas'); // For the Traveller Modal Tabs

  // --- DATA FOR TABLES ---
  const sikkimTreks = [
    { name: "Goecha La", alt: "4,940m", dur: "10-12 Days", diff: "Strenuous", unique: "Kanchenjunga SE face views" },
    { name: "Dzongri La", alt: "4,170m", dur: "8 Days", diff: "Moderate", unique: "Views of 16 Himalayan peaks" },
    { name: "Green Lake", alt: "5,200m", dur: "14 Days", diff: "Strenuous", unique: "Remote base camp, zero crowds" },
    { name: "Sandakphu", alt: "3,636m", dur: "7 Days", diff: "Easy/Mod", unique: "View of Everest, Lhotse, Makalu" },
  ];

  const uttarakhandTreks = [
    { name: "Roopkund", alt: "5,029m", time: "May-Jun", highlight: "Mystery Lake & Trishul views" },
    { name: "Valley of Flowers", alt: "3,658m", time: "Jul-Aug", highlight: "UNESCO site, 500+ flower species" },
    { name: "Kedarkantha", alt: "3,810m", time: "Dec-Apr", highlight: "Premier winter snow trek" },
    { name: "Chopta-Tungnath", alt: "3,680m", time: "All Year", highlight: "Highest Shiva temple in the world" },
  ];

  const sahyadriTreks = [
    { name: "Kalsubai", alt: "5,400ft", diff: "Moderate", feature: "Highest point in Maharashtra" },
    { name: "Harihar Fort", alt: "3,676ft", diff: "Hard", feature: "Near-vertical rock-cut stairs" },
    { name: "Andharban", alt: "2,160ft", diff: "Easy", feature: "Deep forest immersion & fog trails" },
    { name: "Alang-Madan-Kulang", alt: "4,800ft+", diff: "Hard", feature: "Toughest trek, massive rock massifs" },
  ];

  const wellnessPrograms = [
    { type: "Panchakarma", dur: "14-21 Days", focus: "Full-body detox", treat: "Vamana, Virechana, Basti" },
    { type: "Stress Mgmt", dur: "7 Days", focus: "Mental clarity", treat: "Shirodhara, Yoga Nidra" },
    { type: "Sleep Care", dur: "9 Days", focus: "Somnipathy", treat: "Foot rituals, Deep tissue massage" },
  ];

  const gujaratTransport = [
    { dest: "Rann of Kutch", mode: "Road", time: "9 Hours", cost: "₹1,700–2,400" },
    { dest: "Rann of Kutch", mode: "Train (Bhuj)", time: "7-8 Hours", cost: "₹1,600–2,700" },
    { dest: "Saputara", mode: "Road", time: "5.5 Hours", cost: "₹4,100–5,900" },
    { dest: "Girnar", mode: "Train (Junagadh)", time: "6.5 Hours", cost: "₹880–2,500" },
  ];

  // --- HELPER COMPONENTS ---
  const TableHeader = ({ cols }) => (
    <thead>
      <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
        {cols.map((col, i) => <th key={i} style={{ padding: '12px', fontSize: '12px', color: '#4b5563' }}>{col}</th>)}
      </tr>
    </thead>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        borderBottom: activeTab === id ? '3px solid #2563eb' : '3px solid transparent',
        backgroundColor: activeTab === id ? '#eff6ff' : 'transparent',
        color: activeTab === id ? '#2563eb' : '#6b7280',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      <Icon size={18} /> {label}
    </button>
  );

  const Card = ({ icon: Icon, title, desc, onClick, color }) => (
    <div 
      onClick={onClick}
      style={{
        flex: '1', minWidth: '280px', backgroundColor: 'white', borderRadius: '16px',
        padding: '30px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #f3f4f6', cursor: 'pointer', transition: 'transform 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: color, opacity: 0.1, position: 'absolute' }}></div>
      <div style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: color }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>{desc}</p>
      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Explore &rarr;</span>
    </div>
  );

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Find Your Travel Persona</h2>
        <p style={{ color: '#6b7280' }}>Discover who you are and share your journey.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        <Card icon={Compass} title="The Traveller" desc="Soul searchers looking for rejuvenation." onClick={() => { setActiveModal('traveller'); setActiveTab('himalayas'); }} color="#2563eb" />
        <Card icon={Camera} title="The Tourist" desc="Sightseers looking for beauty and comfort." onClick={() => setActiveModal('tourist')} color="#ea580c" />
        <Card icon={ImageIcon} title="Photo Gallery" desc="Share your moments with the community." onClick={() => setActiveModal('gallery')} color="#16a34a" />
      </div>

      {/* --- MODAL --- *}
      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '20px', width: '95%', maxWidth: '1000px',
            height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            position: 'relative', boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
          }}>
            
            {/* Close Button *}
            <button 
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
            >
              <X size={20} />
            </button>

            {/* --- TRAVELLER MODAL CONTENT --- *}
            {activeModal === 'traveller' && (
              <>
                {/* Header *}
                <div style={{ padding: '30px 30px 10px 30px', borderBottom: '1px solid #e5e7eb' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Compass /> The Cartography of Rejuvenation
                  </h2>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>
                    A comprehensive study of Indian trekking ecosystems and wellness hubs.
                  </p>
                  
                  {/* TABS *}
                  <div style={{ display: 'flex', marginTop: '20px', borderBottom: '1px solid #e5e7eb' }}>
                    <TabButton id="himalayas" label="Himalayan Arc" icon={Mountain} />
                    <TabButton id="western" label="Western Ghats" icon={CloudRain} />
                    <TabButton id="wellness" label="Wellness Hubs" icon={Activity} />
                    <TabButton id="gujarat" label="Gujarat & Offbeat" icon={Map} />
                  </div>
                </div>

                {/* Scrollable Content Area *}
                <div style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
                  
                  {/* 1. HIMALAYAS TAB *}
                  {activeTab === 'himalayas' && (
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>The Himalayan Arc: Tectonics & Endurance</h3>
                      <p style={{ marginBottom: '20px', color: '#4b5563', lineHeight: '1.6' }}>
                        The Himalayas represent the apex of global adventure. The pursuit of rejuvenation here is rooted in the "sublime"—the psychological state achieved when faced with the overwhelming scale of nature.
                      </p>

                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>Sikkim & Darjeeling: Vertical Biodiversity</h4>
                      <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <TableHeader cols={["Trek", "Altitude", "Duration", "Difficulty", "Unique Factor"]} />
                          <tbody>
                            {sikkimTreks.map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px', fontWeight: '600' }}>{t.name}</td>
                                <td style={{ padding: '10px' }}>{t.alt}</td>
                                <td style={{ padding: '10px' }}>{t.dur}</td>
                                <td style={{ padding: '10px' }}>{t.diff}</td>
                                <td style={{ padding: '10px', color: '#4b5563' }}>{t.unique}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>Uttarakhand: Sacred Valleys</h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <TableHeader cols={["Trek", "Altitude", "Best Time", "Highlights"]} />
                          <tbody>
                            {uttarakhandTreks.map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px', fontWeight: '600' }}>{t.name}</td>
                                <td style={{ padding: '10px' }}>{t.alt}</td>
                                <td style={{ padding: '10px' }}>{t.time}</td>
                                <td style={{ padding: '10px', color: '#4b5563' }}>{t.highlight}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 2. WESTERN GHATS TAB *}
                  {activeTab === 'western' && (
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>The Sahyadri Range: Monsoon Rebirth</h3>
                      <p style={{ marginBottom: '20px', color: '#4b5563', lineHeight: '1.6' }}>
                        In the Sahyadris, rejuvenation is a seasonal event triggered by the monsoon. The Andharban Trek (The Dark Forest) descends through a canopy so thick that sunlight often fails to reach the floor, offering potent sensory therapy.
                      </p>

                      <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <TableHeader cols={["Trek", "Altitude", "Difficulty", "Rejuvenation Feature"]} />
                          <tbody>
                            {sahyadriTreks.map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px', fontWeight: '600' }}>{t.name}</td>
                                <td style={{ padding: '10px' }}>{t.alt}</td>
                                <td style={{ padding: '10px' }}>{t.diff}</td>
                                <td style={{ padding: '10px', color: '#4b5563' }}>{t.feature}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #16a34a' }}>
                        <h4 style={{ fontWeight: 'bold', color: '#166534', marginBottom: '5px' }}>Coorg: The Scotland of India</h4>
                        <p style={{ fontSize: '14px', color: '#14532d' }}>
                          Further south, Coorg offers "managed" rejuvenation. Resorts offer forest immersion (Shinrin-yoku) and "Digital Detox" zones where Wi-Fi is intentionally absent to reconnect with circadian rhythms.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 3. WELLNESS HUBS TAB *}
                  {activeTab === 'wellness' && (
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>Wellness Epicenters: The Science of Rejuvenation</h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                          <h4 style={{ color: '#ea580c', fontWeight: 'bold', marginBottom: '10px' }}>Rishikesh</h4>
                          <p style={{ fontSize: '13px', color: '#4b5563' }}>
                            The "Yoga Capital of the World." Focuses on the "Sattvic" lifestyle—early rising, vegetarian diet, and sound healing by the Ganges.
                          </p>
                        </div>
                        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                          <h4 style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '10px' }}>Kerala</h4>
                          <p style={{ fontSize: '13px', color: '#4b5563' }}>
                            The cradle of authentic Ayurveda. Treatments like Abhyanga and Pizhichil are clinical processes to remove "Ama" (toxins) from the body.
                          </p>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>Typical Wellness Programs</h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <TableHeader cols={["Program", "Duration", "Core Focus", "Typical Treatments"]} />
                          <tbody>
                            {wellnessPrograms.map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px', fontWeight: '600' }}>{t.type}</td>
                                <td style={{ padding: '10px' }}>{t.dur}</td>
                                <td style={{ padding: '10px' }}>{t.focus}</td>
                                <td style={{ padding: '10px', color: '#4b5563' }}>{t.treat}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 4. GUJARAT & OFFBEAT TAB *}
                  {activeTab === 'gujarat' && (
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>Gujarat: Heritage & Naturopathy</h3>
                      <p style={{ marginBottom: '20px', color: '#4b5563', lineHeight: '1.6' }}>
                        Gujarat blends rugged endurance with healing. <strong>Girnar</strong> requires climbing 10,000 steps for purification. The <strong>Polo Forest</strong> offers "Body Detox" programs in ancient ruins. The <strong>Rann of Kutch</strong> offers visual rejuvenation through the vast white desert.
                      </p>

                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>Transport from Ahmedabad</h4>
                      <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <TableHeader cols={["Destination", "Mode", "Time", "Approx Cost"]} />
                          <tbody>
                            {gujaratTransport.map((t, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '10px', fontWeight: '600' }}>{t.dest}</td>
                                <td style={{ padding: '10px' }}>{t.mode}</td>
                                <td style={{ padding: '10px' }}>{t.time}</td>
                                <td style={{ padding: '10px' }}>{t.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>Offbeat Solitude</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#4b5563', fontSize: '14px' }}>
                          <li style={{ marginBottom: '10px' }}><strong>🏝️ Gokarna:</strong> Coastal silence. A digital detox alternative to Goa with yoga retreats on beaches like Kudle and Om.</li>
                          <li><strong>🏚️ Dhanushkodi:</strong> The ghost town. Rejuvenation through reflection on transience at the tip of India.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              </>
            )}

            {/* --- OTHER MODALS (Simplified for now) --- *}
            {activeModal === 'tourist' && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '28px', color: '#ea580c' }}>The Tourist</h2>
                <p>Standard sightseeing content goes here...</p>
              </div>
            )}
            
            {activeModal === 'gallery' && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '28px', color: '#16a34a' }}>Community Gallery</h2>
                <button onClick={() => alert("Upload!")} style={{ marginTop: '20px', padding: '10px 20px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px' }}>Upload Photo</button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default TravelerTypes;
*/


import React, { useState } from 'react';
import { User, Users, Heart, Backpack, Camera, Coffee, Compass, Briefcase, Smile, Loader2, X, MapPin, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelerTypes = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [selectedMainSection, setSelectedMainSection] = useState(null);
  const [selectedSubPersona, setSelectedSubPersona] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. COMPREHENSIVE DESTINATION DATABASE (For Default Clicks) ---
  const personaDatabase = {
    "t1": [ 
      "Kasol", "Rishikesh", "Hampi", "Gokarna", "Varkala", "Pushkar", "Manali", "McLeod Ganj", 
      "Spiti Valley", "Jibhi", "Tirthan Valley", "Ziro", "Dharamkot", "Old Manali", "Parvati Valley",
      "Tosh", "Kheerganga", "Triund", "Bir Billing", "Kodaikanal", "Munnar", "Wayanad", 
      "Majuli", "Tawang", "Cherrapunji", "Shillong", "Dalhousie", "Auli", "Chopta", "Almora",
      "Jog Falls", "Dudhsagar Falls", "Athirappilly Waterfalls", "Nohkalikai Falls"
    ],
    "t2": [ 
      "Chandni Chowk", "Amritsar", "Lucknow", "Indore", "Surat", "Kolkata", "Hyderabad", "Chennai", 
      "Madurai", "Jaipur", "Ahmedabad", "Mumbai", "Pune", "Kochi", "Mysore", "Agra", "Varanasi"
    ],
    "t3": [ 
      "Rohtang Pass", "Solang Valley", "Auli", "Gulmarg", "Rishikesh", "Dandeli", "Kolad", 
      "Andaman Islands", "Meghalaya", "Chadar Trek", "Sandhan Valley", "Bandhavgarh National Park", 
      "Ranthambore National Park", "Jim Corbett National Park", "Kaziranga National Park"
    ],
    "t4": [ 
      "Landour", "Khajjiar", "Chikmagalur", "Coonoor", "Gurez Valley", "Dzukou Valley", "Shoja", 
      "Chitkul", "Narkanda", "Pangot", "Munsiyari", "Mukteshwar", "Chaukori", "Kausani", "Binsar"
    ],
    "t5": [ 
      "Varanasi", "Bodh Gaya", "Auroville", "Haridwar", "Gangotri", "Kedarnath", "Badrinath", 
      "Yamunotri", "Tiruvannamalai", "Sarnath", "Hemkund Sahib", "Golden Temple", "Shravanabelagola"
    ],
    "tr1": [ 
      "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Agra", "New Delhi", "Mumbai", "Bengaluru", 
      "Mysore", "Ooty", "Munnar", "Kodaikanal", "Darjeeling", "Gangtok", "Shimla", "Manali"
    ],
    "tr2": [ 
      "Goa", "Gokarna", "Varkala", "Pondicherry", "Alibaug", "Daman", "Diu", 
      "Tarkarli", "Murud Janjira", "Ganpatipule", "Diveagar", "Guhagar", "Harihareshwar"
    ],
    "tr3": [ 
      "Alleppey", "Kumarakom", "Havelock Island", "Neil Island", "Radhanagar Beach", "Munnar", 
      "Wayanad", "Kovalam", "Poovar", "Bekal", "Marari Beach", "Cherai Beach", "Gulmarg"
    ],
    "tr4": [ 
      "Qutub Minar", "Red Fort", "Hawa Mahal", "City Palace, Udaipur", "Victoria Memorial, Kolkata", 
      "Charminar", "Meenakshi Temple", "Konark Sun Temple", "Ajanta Caves", "Ellora Caves", 
      "Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Elephanta Caves"
    ],
    "tr5": [ 
      "Gurugram", "Pune", "Hyderabad", "Chennai", "Noida", "Navi Mumbai", "Chandigarh", "Ahmedabad", 
      "Kochi", "Indore", "Vadodara", "Surat", "Nagpur", "Visakhapatnam", "Coimbatore"
    ]
  };

  // --- 2. MAIN SECTIONS DATA ---
  const mainSections = [
    {
      id: "traveller",
      title: "The Traveller",
      icon: Compass,
      color: "#e0f2fe", iconColor: "#0284c7",
      desc: "Soul searchers looking for adventure and rejuvenation in the unknown.",
      subSections: [
        { id: "t1", title: "Backpackers & Treks", icon: Backpack },
        { id: "t2", title: "Foodies", icon: Coffee },
        { id: "t3", title: "Friends (Adventure)", icon: Users },
        { id: "t4", title: "Couples (Offbeat)", icon: Heart },
        { id: "t5", title: "Soul Searchers", icon: User }
      ]
    },
    {
      id: "tourist",
      title: "The Tourist",
      icon: Camera,
      color: "#ffedd5", iconColor: "#ea580c",
      desc: "Exploring heritage, architecture, and famous landmarks.",
      subSections: [
        { id: "tr1", title: "Family & Kids", icon: Smile },
        { id: "tr2", title: "Friends (Leisure)", icon: Users },
        { id: "tr3", title: "Couples (Honeymoon)", icon: Heart },
        { id: "tr4", title: "Solo Sightseeing", icon: User },
        { id: "tr5", title: "Office / Corporate", icon: Briefcase }
      ]
    }
  ];

  // --- 3. PHOTO GALLERY COLLAGE DATA ---
  const collageImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", 
    //"https://images.unsplash.com/photo-1514222325250-13f34e5ced2e?auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"  
  ];

  // --- 4. SMART FETCH LOGIC ---
  const fetchFromAPI = async (baseUrl, queryParams) => {
    try {
      const response = await fetch(`${baseUrl}?${queryParams}`);
      const data = await response.json();
      return data.query && data.query.pages ? Object.values(data.query.pages) : [];
    } catch (e) {
      return [];
    }
  };

  // Reusable search logic with Strict Location Enforcement
  const performSearchQuery = async (safeQuery, enforceLocation = "") => {
    const queryParams = `action=query&generator=search&gsrsearch=${encodeURIComponent(safeQuery)}&gsrlimit=40&prop=pageimages|extracts&pithumbsize=600&exintro&explaintext&exsentences=3&format=json&origin=*`;

    const [wikiResults, voyageResults] = await Promise.all([
      fetchFromAPI('https://en.wikipedia.org/w/api.php', queryParams),
      fetchFromAPI('https://en.wikivoyage.org/w/api.php', queryParams)
    ]);

    const combinedResults = [...wikiResults, ...voyageResults];
    const uniqueResultsMap = new Map();
    combinedResults.forEach(item => { if (!uniqueResultsMap.has(item.title)) uniqueResultsMap.set(item.title, item); });
    let results = Array.from(uniqueResultsMap.values());
    
    return results.filter(item => {
      if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;
      const title = item.title.toLowerCase();
      const text = item.extract.toLowerCase();
      
      // STRICT GEOGRAPHY FILTER: Ensure the search term (e.g., "Vadodara") is ACTUALLY in the text.
      if (enforceLocation) {
        // Use just the first word to ensure safe matching (e.g. "New Delhi" -> matches "delhi")
        const locWord = enforceLocation.split(' ')[0].toLowerCase().trim();
        if (!title.includes(locWord) && !text.includes(locWord)) {
          return false;
        }
      }

      const badTitles = ["culture of", "history of", "politics of", "economy of", "timeline", "list of", "demographics"];
      if (badTitles.some(t => title.includes(t))) return false;

      const badKeywords = ["pakistan", "china", "mexico", "usa", "nepal", "bangladesh", "sri lanka", "political party", "ministry", "association", "bjp", "congress"];
      if (badKeywords.some(kw => text.includes(kw))) return false;

      if (text.includes("born") || text.includes("died") || text.includes("politician") || text.includes("cricketer") || text.includes("actress") || text.includes("singer")) return false;

      return true;
    }).map(item => ({
      name: item.title.replace(" (India)", ""),
      desc: item.extract,
      img: item.thumbnail.source
    }));
  };

  const fetchDestinations = async (subId, userSearch = "") => {
    setLoading(true);
    setDestinations([]);

    try {
      if (userSearch) {
        // --- SMART FALLBACK SEARCH ---
        const searchContext = {
          "t1": "waterfall OR trek OR hill OR forest OR nature OR valley",
          "t2": "street food OR cuisine OR restaurant OR dish OR sweet OR thali",
          "t3": "waterfall OR adventure OR camp OR wildlife OR national park OR safari",
          "t4": "valley OR nature OR resort OR hill station OR offbeat OR village",
          "t5": "temple OR spiritual OR ashram OR yoga OR river OR shrine",
          "tr1": "tourist OR family OR sightseeing OR park OR palace OR lake",
          "tr2": "beach OR lake OR resort OR waterfall OR chill",
          "tr3": "romantic OR resort OR hill station OR view OR lake OR palace",
          "tr4": "monument OR heritage OR fort OR palace OR museum OR cave OR architecture",
          "tr5": "hotel OR resort OR corporate OR convention OR city"
        };
        
        const contextStr = searchContext[subId] || "tourist OR nature";
        
        // ATTEMPT 1: Grouped Query -> Requires the Place AND one of the context strings.
        const query1 = `+"${userSearch}" (${contextStr}) India -person -biography -election`;
        let formatted = await performSearchQuery(query1, userSearch);
        
        // ATTEMPT 2: Broader Context if Attempt 1 fails
        if (formatted.length === 0) {
          const query2 = `+"${userSearch}" (tourist OR attraction OR place OR city OR nature) India -person`;
          formatted = await performSearchQuery(query2, userSearch);
        }

        // ATTEMPT 3: Failsafe -> Just search the city name
        if (formatted.length === 0) {
          const query3 = `"${userSearch}" India -person -biography`;
          formatted = await performSearchQuery(query3, ""); // Don't enforce location filter on failsafe
        }

        setDestinations(formatted.slice(0, 20));

      } else {
        // --- DEFAULT BEHAVIOR: STATIC CURATED LIST ---
        const list = personaDatabase[subId] || ["India Gate", "Taj Mahal"]; 
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        const selectedPlaces = shuffled.slice(0, 25);
        const titlesQuery = selectedPlaces.join('|');

        const queryParams = `action=query&titles=${encodeURIComponent(titlesQuery)}&prop=pageimages|extracts&pithumbsize=600&exintro&explaintext&exsentences=3&format=json&origin=*`;
        
        const [wikiResults, voyageResults] = await Promise.all([
          fetchFromAPI('https://en.wikipedia.org/w/api.php', queryParams),
          fetchFromAPI('https://en.wikivoyage.org/w/api.php', queryParams)
        ]);

        const combinedResults = [...wikiResults, ...voyageResults];
        const uniqueResultsMap = new Map();
        combinedResults.forEach(item => { if (!uniqueResultsMap.has(item.title)) uniqueResultsMap.set(item.title, item); });
        let results = Array.from(uniqueResultsMap.values());

        results = results.filter(item => {
          if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;
          const text = (item.extract + " " + item.title).toLowerCase();
          const badKeywords = ["pakistan", "china", "ministry", "election", "politician"];
          if (badKeywords.some(kw => text.includes(kw))) return false;
          return true;
        });

        const formatted = results.map(item => ({
          name: item.title.replace(", Himachal Pradesh", "").replace(", India", ""), 
          desc: item.extract,
          img: item.thumbnail.source
        }));

        setDestinations(formatted);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 5. HANDLERS ---
  const handleMainSectionClick = (section) => {
    setSelectedMainSection(section);
    setSelectedSubPersona(null); 
    setDestinations([]); 
    setSearchTerm("");
  };

  const handleSubPersonaClick = (subPersona) => {
    setSelectedSubPersona(subPersona);
    setSearchTerm(""); 
    fetchDestinations(subPersona.id, "");
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && selectedSubPersona) {
      fetchDestinations(selectedSubPersona.id, searchTerm);
    }
  };

  const closeModal = () => {
    setSelectedMainSection(null);
    setSelectedSubPersona(null);
    setDestinations([]);
    setSearchTerm("");
  };

  const goBackToSubMenu = () => {
    setSelectedSubPersona(null);
    setDestinations([]);
    setSearchTerm("");
  };

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* --- HEADER --- */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
            Choose Your <span style={{ color: '#16a34a' }}>Travel Persona</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Discover destinations tailored to your travel style.
          </p>
        </div>

        {/* --- PERSONA CARDS --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {mainSections.map((section) => (
            <div 
              key={section.id}
              onClick={() => handleMainSectionClick(section)}
              style={{
                backgroundColor: 'white', borderRadius: '20px', padding: '25px 30px',
                textAlign: 'center', cursor: 'pointer',
                border: '1px solid #e5e7eb', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = section.iconColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
            >
              <div style={{ width: '60px', height: '60px', marginBottom: '15px', backgroundColor: section.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: section.iconColor }}>
                <section.icon size={28} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{section.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>{section.desc}</p>
              <div style={{ fontSize: '14px', fontWeight: '600', color: section.iconColor, display: 'flex', alignItems: 'center', gap: '5px' }}>
                Explore styles <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* --- PHOTO GALLERY COLLAGE --- */}
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', display: 'inline-block' }}>
            Photo Gallery
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px', gap: '15px' }}>
            <div style={{ gridColumn: 'span 2', gridRow: 'span 2', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              <img src={collageImages[0]} alt="Taj Mahal" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
            <div style={{ gridColumn: 'span 1', gridRow: 'span 1', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={collageImages[1]} alt="Kerala" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
            <div style={{ gridColumn: 'span 1', gridRow: 'span 1', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={collageImages[2]} alt="Mountains" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
            <div style={{ gridColumn: 'span 2', gridRow: 'span 1', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={collageImages[3]} alt="Rajasthan" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL SYSTEM --- */}
      {selectedMainSection && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', width: '100%', maxWidth: '1000px', borderRadius: '24px', overflow: 'hidden', 
            position: 'relative', height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>

            {/* Modal Header */}
            <div style={{ padding: '20px 30px', borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: selectedSubPersona ? '15px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {selectedSubPersona && (
                    <button onClick={goBackToSubMenu} style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '5px' }}>
                      <ArrowLeft size={24} color="#374151" />
                    </button>
                  )}
                  <div style={{ padding: '10px', backgroundColor: selectedMainSection.color, borderRadius: '12px', color: selectedMainSection.iconColor }}>
                    <selectedMainSection.icon size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                      {selectedSubPersona ? selectedSubPersona.title : selectedMainSection.title}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                      {selectedSubPersona ? "Curated suggestions" : "Select your travel style"}
                    </p>
                  </div>
                </div>
                <button onClick={closeModal} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#374151" />
                </button>
              </div>

              {/* SEARCH BAR */}
              {selectedSubPersona && (
                <form onSubmit={handleManualSearch} style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder={`Search a place, city, or state for ${selectedSubPersona.title.toLowerCase()}... (e.g. Vadodara)`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', backgroundColor: '#f9fafb' }}
                  />
                  <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                </form>
              )}
            </div>

            {/* --- MODAL CONTENT AREA --- */}
            <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }}>
              
              {/* VIEW 1: SUB-SECTION SELECTOR */}
              {!selectedSubPersona && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {selectedMainSection.subSections.map((sub) => (
                    <div 
                      key={sub.id}
                      onClick={() => handleSubPersonaClick(sub)}
                      style={{
                        backgroundColor: 'white', padding: '25px', borderRadius: '16px',
                        border: '1px solid #e5e7eb', cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = selectedMainSection.iconColor; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ color: selectedMainSection.iconColor, marginBottom: '15px' }}><sub.icon size={32} /></div>
                      <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>{sub.title}</h4>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 2: LOADING STATE */}
              {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Loader2 className="animate-spin" size={40} color={selectedMainSection.iconColor} />
                  <p style={{ marginTop: '15px', color: '#6b7280', fontWeight: '500' }}>{searchTerm ? "Searching locations..." : "Curating the best spots..."}</p>
                </div>
              )}

              {/* VIEW 3: RESULTS GRID */}
              {!loading && destinations.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
                  {destinations.map((dest, idx) => (
                    <div 
                      key={idx}
                      onClick={() => navigate(`/place/${dest.name}`)}
                      style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                        <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {dest.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: selectedMainSection.iconColor, marginBottom: '10px', fontWeight: '600' }}>
                          <MapPin size={12} /> India
                        </div>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {dest.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && destinations.length === 0 && selectedSubPersona && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  <p>No destinations found for "{searchTerm || selectedSubPersona.title}". Please try again.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelerTypes;