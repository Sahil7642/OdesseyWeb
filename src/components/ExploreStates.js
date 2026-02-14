/*import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { State } from 'country-state-city';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExploreStates = () => {
  const [states, setStates] = useState([]);
  const scrollContainerRef = useRef(null);

  // 👇 RELIABLE IMAGE LIST (No more broken links)
  const stateImages = [
    "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80", // India Palace
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80", // Taj Mahal
    "https://s7ap1.scene7.com/is/image/incredibleindia/2-pavagadh-temple-gujarat-state-hero2?qlt=82&ts=1726733709050", // Pavagadh Gujarat
    "https://s7ap1.scene7.com/is/image/incredibleindia/1-varkala-cliff-varkala-kerala-attr-hero?qlt=82&ts=1742154423234", // Varkala
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80", // Golden Temple
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Auli_Himalayas.jpg"  // Auli
  ];

  useEffect(() => {
    const indiaStates = State.getStatesOfCountry('IN');
    
    // Duplicate list for "endless" feel
    const infiniteList = [
      ...indiaStates, ...indiaStates, ...indiaStates
    ];
    
    setStates(infiniteList);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section style={{ position: 'relative', padding: '60px 0', backgroundColor: '#f9fafb' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
          Explore by <span style={{ color: '#16a34a', fontStyle: 'italic' }}>States</span>
        </h2>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Swipe to discover the unique culture of every region.
        </p>
      </div>

      {/* LEFT ARROW *}
      <button 
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: '20px',
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronLeft size={24} color="#374151" />
      </button>

      {/* RIGHT ARROW *}
      <button 
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: '20px',
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronRight size={24} color="#374151" />
      </button>

      {/* SCROLL CONTAINER *}
      <div 
        ref={scrollContainerRef}
        className="hide-scrollbar" 
        style={{
          display: 'flex',
          gap: '30px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory', 
          padding: '20px 60px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {states.map((state, index) => (
          <div key={`${state.isoCode}-${index}`} style={{
            flex: '0 0 auto',
            width: '280px',
            scrollSnapAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            transition: 'transform 0.3s'
          }}>
            
            {/* Image Area *}
            <div style={{ height: '180px', backgroundColor: '#f3f4f6' }}>
              <img 
                // 👇 THIS LINE FIXES THE IMAGES
                // It cycles through our list of 6 valid images
                src={stateImages[index % stateImages.length]}
                alt={state.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content Area *}
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {state.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                Discover eco-friendly stays and local traditions in {state.name}.
              </p>
              
              <button style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}>
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreStates;
*/

import React, { useEffect, useState, useRef } from 'react';
import { State } from 'country-state-city';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// 👇 1. IMPORT THIS
import { useNavigate } from 'react-router-dom';

const ExploreStates = () => {
  // 👇 2. ADD THIS LINE HERE (Inside the component, at the top)
  const navigate = useNavigate(); 

  const [states, setStates] = useState([]);
  const scrollContainerRef = useRef(null);

  // Reliable Image List
  const stateImages = [
    "https://www.indiantempletour.com/wp-content/uploads/2022/08/Andaman-and-Nicobar-Islands-Package-1.jpg", //1. Andaman & Nicobar Islands
    "https://etimg.etb2bimg.com/photo/89314482.cms", //2. Andhra Pradesh
    "https://static.toiimg.com/thumb/91692790/Arunachal-Dirang-Monastery.jpg?width=1200&height=900", //Arunchal Pradesh
    "https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2025/04/majuli-island.jpg", //Assam
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg", //Bihar
    "https://chandigarhtourism.in/images/places-to-vist/headers/chandigarh-local-sightseeing-tour-packages-header-chandigarh-tourism.jpg.jpg", //Chandigarh
    "https://portal-tourism.cgstate.gov.in/files/Chitrakote%20Waterfall(1).JPG", //Chattisgrah
    "https://s7ap1.scene7.com/is/image/incredibleindia/2-diu-fort-diu-attr-hero-1?qlt=82&ts=1726737809175", //DNHDD
    "https://static.toiimg.com/photo/msid-88070906,width-96,height-65.cms", //Delhi
    "https://images.financialexpressdigital.com/2024/01/goa-tourism.jpg", // Goa
    "https://www.gujarattourism.com/content/dam/gujrattourism/images/home_page/SOU.jpg", //Gujarat
    "https://haryanatourism.gov.in/wp-content/uploads/2024/06/KURUKSHETRA.jpg", //Haryana
    "https://www.naturetravelagency.com/uploads/1724499766best%20time%20to%20visit%20himachal%20Pradesh%20for%20snowfall.png", // Himachal Pradesh
    "https://www.peakadventuretour.com/assets/imgs/kashmir-tourism-01.webp", //Jammu and Kashmir
    "https://s7ap1.scene7.com/is/image/incredibleindia/jonha-falls-ranchi-jharkhand-new?qlt=82&ts=1727010871094", // Jharkhand
    "https://www.delhitourism.com/images/destination/5e5f7e1a005ce1.jpg", //Karnataka
    "https://www.ekeralatourism.net/wp-content/uploads/2018/03/Alleppey.jpg", //Kerala
    "https://etimg.etb2bimg.com/photo/77779116.cms", //Ladakh
    "https://www.lakshadweeptoursandtravels.com/images/banner-slide-2.jpg", // Lakshadweep
    "https://www.bandhavgarh-national-park.com/images/Khajuraho_2.jpg", // Madhya Pradesh
    "https://www.clubmahindra.com/blog/media/section_images/shuttersto-2b0161eaf6ec9f1.jpg", // Maharashtra
    "https://manipurtourism.gov.in/wp-content/uploads/2020/08/Pakhangba.jpg", // Manipur
    "https://chalotravellers.com/wp-content/uploads/2024/08/Dawki-Shnongpdeng-meghalaya.jpg", // Meghalaya
    "https://mizoramtourism.com/post_images/673ac0a2656b5_627debbb4e724_DD-1808.jpg", // Mizoram
    "https://s7ap1.scene7.com/is/image/incredibleindia/dimapur-nagaland-travel-masthead-hero?qlt=82&ts=1727368339099", // Nagaland
    "https://www.transformingtravels.com/wp-content/uploads/2025/10/Odisha-tourism-1920x960.jpg", // Odisha
    "https://media.assettype.com/outlooktraveller%2F2024-02%2F10e4c7c9-ca10-4359-87c0-925664bf69b9%2Fshutterstock_1967101996.jpg?rect=1079%2C0%2C1688%2C2250", // Puducherry
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80", // Punjab
    "https://s7ap1.scene7.com/is/image/incredibleindia/2-mehrangarh-fort-jodhpur-rajasthan-city-hero?qlt=82&ts=1726660925514", // Rajasthan
    "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/09/Best-Places-to-Visit-in-Sikkim.jpg", //Sikkim
    "https://s7ap1.scene7.com/is/image/incredibleindia/1-meenakshi-amman-temple-madurai-tamil-nadu-attr-hero?qlt=82&ts=1726654442664", // Tamil Nadu
    "https://www.fabhotels.com/blog/wp-content/uploads/2019/02/Golconda-Fort.jpg", // Telangana
    "https://tripuratourism.gov.in/images/tour/1661759345/80.jpg", // Tripura
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80", // Uttar Pradesh
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Auli_Himalayas.jpg",  // Uttarakhand
    "https://hblimg.mmtcdn.com/content/hubble/img/dest_img/mmt/activities/m_Kolkata_dest_landscape_l_956_1435.jpg", // West Bengal
  ];

  useEffect(() => {
    const indiaStates = State.getStatesOfCountry('IN');
    // Duplicate for endless scroll feel
    const infiniteList = [...indiaStates, ...indiaStates, ...indiaStates];
    setStates(infiniteList);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section style={{ position: 'relative', padding: '60px 0', backgroundColor: '#f9fafb' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
          Explore by <span style={{ color: '#16a34a', fontStyle: 'italic' }}>States</span>
        </h2>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Swipe to discover the unique culture of every region.
        </p>
      </div>

      {/* ARROWS */}
      <button 
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: '20px',
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronLeft size={24} color="#374151" />
      </button>

      <button 
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: '20px',
          top: '55%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronRight size={24} color="#374151" />
      </button>

      {/* SCROLL CONTAINER */}
      <div 
        ref={scrollContainerRef}
        className="hide-scrollbar" 
        style={{
          display: 'flex',
          gap: '30px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory', 
          padding: '20px 60px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {states.map((state, index) => (
          <div 
            key={`${state.isoCode}-${index}`}
            // 👇 3. ADD ONCLICK HERE
            onClick={() => navigate(`/state/${state.isoCode}`)}
            style={{
              flex: '0 0 auto',
              width: '280px',
              scrollSnapAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.3s',
              cursor: 'pointer' // Shows hand cursor on hover
            }}
          >
            
            <div style={{ height: '180px', backgroundColor: '#f3f4f6' }}>
              <img 
                src={stateImages[index % stateImages.length]}
                alt={state.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {state.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                Discover eco-friendly stays and local traditions in {state.name}.
              </p>
              
              <button style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}>
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreStates;