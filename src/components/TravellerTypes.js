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
import { User, Users, Heart, Backpack, Camera, Coffee, Compass, Briefcase, Smile, Image as ImageIcon, Loader2, X, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravellerTypes = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [selectedMainSection, setSelectedMainSection] = useState(null);
  const [selectedSubPersona, setSelectedSubPersona] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. DATA STRUCTURE (Optimized Short Queries) ---
  const mainSections = [
    {
      id: "traveller",
      title: "The Traveller",
      icon: Compass,
      color: "#e0f2fe", iconColor: "#0284c7", // Blue
      desc: "Soul searchers looking for adventure and rejuvenation in the unknown.",
      subSections: [
        { 
          id: "t1", title: "Backpackers", icon: Backpack, 
          // Simple query: "Backpacking in India" matches a real Wiki category/page
          query: "Backpacking in India" 
        },
        { 
          id: "t2", title: "Foodies", icon: Coffee, 
          query: "Indian cuisine" 
        },
        { 
          id: "t3", title: "Friends (Adventure)", icon: Users, 
          query: "Adventure sports in India" 
        },
        { 
          id: "t4", title: "Couples (Offbeat)", icon: Heart, 
          query: "Hill stations in India" 
        },
        { 
          id: "t5", title: "Soul Searchers", icon: User, 
          query: "Yoga in India" 
        }
      ]
    },
    {
      id: "tourist",
      title: "The Tourist",
      icon: Camera,
      color: "#ffedd5", iconColor: "#ea580c", // Orange
      desc: "Exploring heritage, architecture, and famous landmarks.",
      subSections: [
        { 
          id: "tr1", title: "Family & Kids", icon: Smile, 
          query: "Tourism in India" 
        },
        { 
          id: "tr2", title: "Friends (Leisure)", icon: Users, 
          query: "Beaches in India" 
        },
        { 
          id: "tr3", title: "Couples (Honeymoon)", icon: Heart, 
          query: "Honeymoon destinations in India" 
        },
        { 
          id: "tr4", title: "Solo Sightseeing", icon: User, 
          query: "Tourist attractions in India" 
        },
        { 
          id: "tr5", title: "Office / Corporate", icon: Briefcase, 
          query: "Convention centres in India" 
        }
      ]
    },
    {
      id: "gallery",
      title: "Photo Gallery",
      icon: ImageIcon,
      color: "#dcfce7", iconColor: "#16a34a", // Green
      desc: "Share your moments with the community.",
      subSections: [] 
    }
  ];

  // --- 2. FETCH LOGIC (With Fallback) ---
  const fetchDestinations = async (query, isGallery = false) => {
    setLoading(true);
    setDestinations([]);

    // 1. Construct Search Query
    // We add "India" to ensure context, but keep it simple.
    let searchTerm = isGallery 
      ? "Tourism in India" 
      : `${query} India`; 

    // 2. Define Exclusions (Political/Foreign)
    // We add these mainly to the 'filter' step, but slight help in query doesn't hurt
    const exclusions = "-person -biography -film -party -politics";

    try {
      // Increase limit to 50 to maximize chance of finding valid items
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm + " " + exclusions)}&gsrlimit=50&prop=pageimages|extracts&pithumbsize=600&exintro&explaintext&exsentences=2&format=json&origin=*`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.pages) {
        let results = Object.values(data.query.pages);

        // FILTER LOGIC
        results = results.filter(item => {
          // Must have Thumbnail & Text
          if (!item.thumbnail || !item.thumbnail.source || !item.extract) return false;
          
          const text = (item.extract + " " + item.title).toLowerCase();
          
          // 1. Block Foreign/Political Terms
          const badKeywords = [
            "pakistan", "china", "mexico", "usa", "nepal", "bangladesh", "sri lanka",
            "political party", "ministry", "association", "bjp", "congress", "corporation", 
            "ltd", "pvt", "government", "election", "parliament", "assembly", "cricket team"
          ];
          if (badKeywords.some(kw => text.includes(kw))) return false;

          // 2. Block People (Born/Died/Actor)
          if (text.includes("born") || text.includes("died") || text.includes("politician") || text.includes("cricketer") || text.includes("actress")) return false;

          // 3. Indian Context (Relaxed check: Title OR Text must mention relevant keywords)
          // We check for 'India' OR specific states/terms to catch more valid results
          const indianKeywords = ["india", "state", "pradesh", "kerala", "goa", "delhi", "mumbai", "rajasthan", "himalaya", "bengal", "punjab", "gujarat", "temple", "fort", "lake", "river", "mountain", "peak", "valley", "trek", "resort", "city", "town", "station"];
          
          return indianKeywords.some(kw => text.includes(kw));
        });

        const formatted = results.map(item => ({
          name: item.title,
          desc: item.extract,
          img: item.thumbnail.source
        }));

        // Shuffle and Slice
        setDestinations(formatted.sort(() => 0.5 - Math.random()).slice(0, 20));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. HANDLERS ---
  const handleMainSectionClick = (section) => {
    setSelectedMainSection(section);
    setSelectedSubPersona(null); 
    setDestinations([]); 

    if (section.id === 'gallery') {
      fetchDestinations("", true);
    }
  };

  const handleSubPersonaClick = (subPersona) => {
    setSelectedSubPersona(subPersona);
    fetchDestinations(subPersona.query, false);
  };

  const closeModal = () => {
    setSelectedMainSection(null);
    setSelectedSubPersona(null);
    setDestinations([]);
  };

  const goBackToSubMenu = () => {
    setSelectedSubPersona(null);
    setDestinations([]);
  };

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* --- MAIN 3 CARDS GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {mainSections.map((section) => (
            <div 
              key={section.id}
              onClick={() => handleMainSectionClick(section)}
              style={{
                backgroundColor: 'white', borderRadius: '24px', padding: '40px 30px',
                textAlign: 'center', cursor: 'pointer',
                border: '1px solid #f3f4f6', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
            >
              <div style={{ width: '80px', height: '80px', marginBottom: '25px', backgroundColor: section.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: section.iconColor }}>
                <section.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>{section.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{section.desc}</p>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Explore <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- MODAL SYSTEM --- */}
      {selectedMainSection && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', width: '100%', maxWidth: '1000px',
            borderRadius: '24px', overflow: 'hidden', position: 'relative',
            height: '85vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>

            {/* Modal Header */}
            <div style={{ padding: '25px 30px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {selectedSubPersona && (
                  <button onClick={goBackToSubMenu} style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '5px' }}>
                    <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} color="#374151" />
                  </button>
                )}
                <div style={{ padding: '10px', backgroundColor: selectedMainSection.color, borderRadius: '12px', color: selectedMainSection.iconColor }}>
                  <selectedMainSection.icon size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>
                    {selectedSubPersona ? selectedSubPersona.title : selectedMainSection.title}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    {selectedMainSection.id === 'gallery' ? "Captured moments from across India" : (selectedSubPersona ? "Curated suggestions" : "Select your travel style")}
                  </p>
                </div>
              </div>
              <button onClick={closeModal} style={{ background: '#f3f4f6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#374151" />
              </button>
            </div>

            {/* --- MODAL CONTENT AREA --- */}
            <div style={{ padding: '30px', overflowY: 'auto', backgroundColor: '#f9fafb', flex: 1 }}>
              
              {/* VIEW 1: SUB-SECTION SELECTOR */}
              {!selectedSubPersona && selectedMainSection.id !== 'gallery' && (
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
                  <p style={{ marginTop: '15px', color: '#6b7280', fontWeight: '500' }}>Fetching best spots...</p>
                </div>
              )}

              {/* VIEW 3: RESULTS GRID */}
              {!loading && destinations.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
                  {destinations.map((dest, idx) => (
                    <div 
                      key={idx}
                      onClick={() => navigate(`/place/${dest.name}`)}
                      style={{ 
                        backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', 
                        transition: 'transform 0.2s' 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb', position: 'relative' }}>
                        <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {selectedMainSection.id === 'gallery' && (
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 15px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                            {dest.name}
                          </div>
                        )}
                      </div>
                      
                      {selectedMainSection.id !== 'gallery' && (
                        <div style={{ padding: '20px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {dest.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: selectedMainSection.iconColor, marginBottom: '10px', fontWeight: '500' }}>
                            <MapPin size={14} /> India
                          </div>
                          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {dest.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && destinations.length === 0 && (selectedSubPersona || selectedMainSection.id === 'gallery') && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  <p>No destinations found. Please try again later.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravellerTypes;