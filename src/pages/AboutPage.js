import React from 'react';
import { Leaf, Map, Heart, Globe, User, CheckCircle, Mail, Instagram, MapPin } from 'lucide-react';
import logoSrc from '../Odesseylogo/logo_odessey.png';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{ 
        backgroundColor: '#111827', color: 'white', padding: '160px 20px 80px', 
        textAlign: 'center', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px' 
      }}>
        <img src={logoSrc} alt="Odessey" style={{ height: '60px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>About Odessey</h1>
        <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', opacity: 0.9, lineHeight: '1.6' }}>
          Odessey is a modern travel experience company dedicated to curating journeys that feel personal, effortless, and meaningful. 
          We believe travel is more than movement—it’s a story.
        </p>
      </div>

      {/* 2. FOUNDERS SECTION */}
      <div style={{ maxWidth: '1000px', margin: '-50px auto 60px', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '30px', textAlign: 'center' }}>Meet The Founders</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {/* Amrita */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', backgroundColor: '#f3f4f6', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={40} color="#4b5563" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>Amrita Pandey</h3>
              <p style={{ color: '#16a34a', fontWeight: '600' }}>Founder</p>
            </div>
            
            {/* Sahil */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', backgroundColor: '#f3f4f6', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={40} color="#4b5563" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>Sahil Gupta</h3>
              <p style={{ color: '#16a34a', fontWeight: '600' }}>Co-Founder</p>
            </div>
          </div>
          
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#4b5563', lineHeight: '1.8' }}>
            Together, Sahil and Amrita bring a shared passion for travel, storytelling, and curated experiences. 
            With complementary expertise in strategy, creativity, and traveller engagement, they lead Odessey with a unified vision — 
            to redefine how people experience travel by making every journey smooth, personal, and memorable.
          </p>
        </div>
      </div>

      {/* 3. WHAT WE DO */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '40px', textAlign: 'center' }}>What We Do</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { title: "Curated Experiences", desc: "Tailor-made itineraries designed around your interests, pace, and budget.", icon: Heart },
            { title: "Destination Planning", desc: "Expert recommendations for domestic & off-beat locations with on-ground insights.", icon: Map },
            { title: "Stays & Experiences", desc: "Handpicked boutique stays, luxury camps, immersive activities, and scenic escapes.", icon: Leaf },
            { title: "End-to-End Management", desc: "We handle travel, stay, transport, and activities so you don't have to.", icon: CheckCircle }
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#16a34a', marginBottom: '15px' }}><item.icon size={32} /></div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WHY ODESSEY & VISION */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Why Odessey?</h2>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
              <li>✨ Personalised like a friend, professional like a brand</li>
              <li>✨ Transparent pricing with no hidden charges</li>
              <li>✨ Strong local partnerships for smooth travel</li>
              <li>✨ 24×7 support throughout the journey</li>
              <li>✨ Travel insights & storytelling that elevate your experience</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Our Shared Vision</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', opacity: 0.9 }}>
              To inspire people to explore deeply, travel meaningfully, and celebrate life through experiences crafted with intention, creativity, and care.
            </p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', color: '#4ade80' }}>
              "At Odessey, we believe every journey has a story – and our mission is to help travellers discover it."
            </p>
          </div>

        </div>
      </div>

      {/* 5. CLIENTS & DESTINATIONS */}
      <div style={{ maxWidth: '1000px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>Who Travels With Us?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '60px' }}>
          {["Friends & Groups", "Families", "Solo Travellers", "Corporate Retreats", "Couples & Honeymooners"].map((client, idx) => (
            <span key={idx} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', borderRadius: '100px', color: '#4b5563', fontWeight: '600' }}>{client}</span>
          ))}
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>Popular Destinations</h2>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>
          Rann of Kutch · Meghalaya · Himachal · Rajasthan · Kerala · Goa · Andaman · Hong Kong · Thailand
        </p>
      </div>

      {/* 6. CONTACT & TAGLINE */}
      <div style={{ backgroundColor: '#f0fdf4', padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #bbf7d0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', marginBottom: '20px', fontStyle: 'italic' }}>
            “Aap kahi bhi jao, phasoge nahi! Odessey is here with you.”
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
              <Instagram size={20} color="#E1306C" /> @odesseytravelstories
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
              <Mail size={20} color="#16a34a" /> founders@odessey.in
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
              <MapPin size={20} color="#2563eb" /> PAN-India Travel Planning
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;