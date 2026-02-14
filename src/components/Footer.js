/*
import React from 'react';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';


const Footer = () => {
  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Our Vision', href: '/vision' },
    { name: 'Our Mission', href: '/mission' }
  ];


  return (
    <footer className="bg-gradient-to-r from-teal-700 to-green-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section *}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="h-8 w-8 text-green-300" />
              <span className="text-2xl font-bold">Odessey</span>
            </div>
            <p className="text-green-100 text-lg leading-relaxed mb-6 max-w-md">
              Discover pristine landscapes and authentic experiences through sustainable travel.
              We connect you with nature's untouched beauty across India.
            </p>
            <div className="space-y-3 text-green-100">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-300" />
                <span>Eco-friendly destinations across India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300" />
                <span>+91 9353520020</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300" />
                <span>hello@odessey.in</span>
              </div>
            </div>
          </div>


          {/* Quick Links *}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Newsletter *}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Connected</h3>
            <p className="text-green-100 mb-4">
              Get updates on new eco-friendly destinations and sustainable travel tips.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>


        {/* Bottom Section *}
        <div className="border-t border-green-600/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">
            © 2024 Odessey. All rights reserved. Travel sustainably, explore responsibly.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-green-200 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-green-200 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="/sustainability" className="text-green-200 hover:text-white text-sm transition-colors">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
*/

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 👇 1. Import your Logo
import logoSrc from '/Users/sahilgupta/OdesseyWeb/odessey-web/src/Odesseylogo/logo_odessey.png';

const Footer = () => {
  const navigate = useNavigate();

  const headerStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '20px'
  };

  const linkStyle = {
    display: 'block',
    color: '#4b5563',
    textDecoration: 'none',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#4b5563',
    marginBottom: '15px'
  };

  return (
    <footer style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', paddingTop: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          gap: '40px', 
          marginBottom: '50px' 
        }}>

          {/* 1. ODESSEY & CONTACT DETAILS */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            
            {/* 👇 2. Logo Replaced Here */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img 
                src={logoSrc} 
                alt="Odessey Logo" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
              />
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>Odessey</span>
            </div>
            
            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '25px', maxWidth: '350px' }}>
              Discover pristine landscapes and authentic experiences through sustainable travel. We connect you with nature's untouched beauty across India.
            </p>

            <div>
              <div style={contactItemStyle}>
                <MapPin size={18} color="#16a34a" />
                <span>Eco-friendly destinations across India</span>
              </div>
              <div style={contactItemStyle}>
                <Phone size={18} color="#16a34a" />
                <span>+91 9353520020</span>
              </div>
              <div style={contactItemStyle}>
                <Mail size={18} color="#16a34a" />
                <span>hello@odessey.in</span>
              </div>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h3 style={headerStyle}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><span onClick={() => navigate('/about')} style={linkStyle} onMouseEnter={e => e.target.style.color = '#16a34a'} onMouseLeave={e => e.target.style.color = '#4b5563'}>About Us</span></li>
              <li><span onClick={() => navigate('/lodges')} style={linkStyle} onMouseEnter={e => e.target.style.color = '#16a34a'} onMouseLeave={e => e.target.style.color = '#4b5563'}>Our Lodges</span></li>
              <li><span onClick={() => navigate('/#traveler-diaries')} style={linkStyle} onMouseEnter={e => e.target.style.color = '#16a34a'} onMouseLeave={e => e.target.style.color = '#4b5563'}>Experiences</span></li>
              <li><span onClick={() => navigate('/vision')} style={linkStyle} onMouseEnter={e => e.target.style.color = '#16a34a'} onMouseLeave={e => e.target.style.color = '#4b5563'}>Our Vision</span></li>
              <li><span onClick={() => navigate('/mission')} style={linkStyle} onMouseEnter={e => e.target.style.color = '#16a34a'} onMouseLeave={e => e.target.style.color = '#4b5563'}>Our Mission</span></li>
            </ul>
          </div>

          {/* 3. STAY CONNECTED */}
          <div style={{ flex: '1.5', minWidth: '250px' }}>
            <h3 style={headerStyle}>Stay Connected</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Get updates on new eco-friendly destinations and sustainable travel tips.
            </p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{ 
          borderTop: '1px solid #f3f4f6', 
          padding: '30px 0', 
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          <div>
            © 2024 Odessey. All rights reserved. Travel sustainably, explore responsibly.
          </div>
          
          <div style={{ display: 'flex', gap: '25px' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#1f2937'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#1f2937'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Terms of Service</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#1f2937'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Sustainability</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;