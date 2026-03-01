/*
import React from 'react';
import { Leaf } from 'lucide-react';


const Header = () => {
  const navLinks = [
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Our Mission', href: '/mission' }
  ];


  const leftNavLinks = [
    { name: 'Plan your trip', href: '/plan' },
    { name: 'Story', href: '/story' },
    { name: 'Itinerary', href: '/itinerary' }
  ];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Left side: Logo + Left Navigation *//*}
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-2 text-white hover:text-green-300 transition-colors">
                <Leaf className="h-7 w-7 text-green-400" />
                <span className="text-xl font-bold">EcoJourney</span>
              </a>
             
              <nav className="hidden md:flex items-center space-x-6">
                {leftNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:bg-white/10 px-3 py-2 rounded-lg"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
           
            {/* Right side: Right Navigation *//*}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200 hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
            </nav>


            {/* Mobile menu button *//*}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
*/

/*
import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Our Mission', href: '/mission' }
  ];

  const leftNavLinks = [
    { name: 'Plan your trip', href: '/plan' },
    { name: 'Story', href: '/story' },
    { name: 'Itinerary', href: '/itinerary' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'py-2' : 'py-4'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`
            backdrop-blur-md border rounded-2xl px-4 sm:px-6 py-3 shadow-lg
            transition-all duration-300
            ${isScrolled 
              ? 'bg-white/95 border-gray-200' 
              : 'bg-white/10 border-white/20'
            }
          `}>
            <div className="flex items-center justify-between">
              {/* Logo + Left Navigation *}
              <div className="flex items-center space-x-4 sm:space-x-8">
                <a 
                  href="/" 
                  className={`
                    flex items-center space-x-2 transition-colors
                    ${isScrolled 
                      ? 'text-green-700 hover:text-green-600' 
                      : 'text-white hover:text-green-300'
                    }
                  `}
                >
                  <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-green-500" />
                  <span className="text-lg sm:text-xl font-bold">Odessey</span>
                </a>
               
                {/* Desktop Left Nav *}
                <nav className="hidden lg:flex items-center space-x-6">
                  {leftNavLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`
                        text-sm font-medium transition-all duration-200 
                        px-3 py-2 rounded-lg
                        ${isScrolled
                          ? 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
             
              {/* Desktop Right Nav *}
              <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`
                      text-sm font-medium transition-all duration-200 
                      px-3 py-2 rounded-lg
                      ${isScrolled
                        ? 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button *}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                  md:hidden p-2 rounded-lg transition-colors
                  ${isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay *}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl 
                       animate-slide-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Mobile Menu Header *}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold text-gray-900">Odessey</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Links *}
              <nav className="space-y-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Planning
                </div>
                {leftNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-green-50 
                             hover:text-green-700 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3">
                  Explore
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-green-50 
                             hover:text-green-700 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
*/
/*
import React from 'react';
import { Leaf, Menu } from 'lucide-react';


const Header = () => {
  const navLinks = [
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Our Mission', href: '/mission' }
  ];

  const leftNavLinks = [
    { name: 'Plan your trip', href: '/plan' },
    { name: 'Story', href: '/story' },
    { name: 'Itinerary', href: '/itinerary' }
  ];

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background 0.3s'
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        
        {/* LEFT SIDE: Logo + Left Links *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          
          {/* Logo *}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
            <Leaf size={28} color="#4ade80" /> {/* Green Leaf Icon *}
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Odessey</span>
          </a>

          {/* Left Navigation (Hidden on small screens if we had media queries, but shown here for simplicity) *}
          <nav style={{ display: 'flex', gap: '20px' }}>
            {leftNavLinks.map((link) => (
              <a key={link.name} href={link.href} style={linkStyle}>
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE: Right Links *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} style={linkStyle}>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Icon (Visual Only) *}
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
            <Menu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
*/
/*
import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// 👇 IMPORT YOUR LOGO (Keep the one that works for you)
// Option A: If logo is in public folder:
import logoSrc from "/Users/sahilgupta/OdesseyWeb/odessey-web/src/Odesseylogo/logo_odessey.png";
// Option B: If logo is in src/assets:
// import logoSrc from '../assets/logo.png'; 

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 1. RIGHT SIDE LINKS (Fixed: No duplicates)
  const navLinks = [
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/#traveler-diaries' }, // Links to the section
    { name: 'Our Mission', href: '/mission' }
  ];

  // 👇 2. LEFT SIDE LINKS
  const leftNavLinks = [
    { name: 'Plan your trip', href: '/plan' },
    { name: 'Story', href: '/story' },
    { name: 'Itinerary', href: '/itinerary' }
  ];

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background 0.3s',
    cursor: 'pointer'
  };

  // Helper to handle navigation smoothly
  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        
        {/* LEFT SIDE *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          
          {/* Logo *}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img 
              src={logoSrc} 
              alt="Odessey Logo" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
            />
            {/* Remove text if your logo already has it, otherwise keep this: *}
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Odessey</span>
          </div>

          <nav style={{ display: 'flex', gap: '20px' }}>
            {leftNavLinks.map((link) => (
              <span key={link.name} onClick={() => handleNavClick(link.href)} style={linkStyle}>
                {link.name}
              </span>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            {navLinks.map((link) => (
              <span key={link.name} onClick={() => handleNavClick(link.href)} style={linkStyle}>
                {link.name}
              </span>
            ))}
          </nav>

          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
            <Menu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
*/
/*
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Import your logo
import logoSrc from '../Odesseylogo/logo_odessey.png'; 

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 👇 1. State to track scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  // 👇 2. Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // User has scrolled down -> Turn White
      } else {
        setIsScrolled(false); // User is at top -> Stay Transparent
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Our Mission', href: '/mission' }
  ];

  const leftNavLinks = [
    { name: 'Plan your trip', href: '/plan' },
    { name: 'Story', href: '/story' },
    { name: 'Itinerary', href: '/itinerary' }
  ];

  // 👇 3. Dynamic Styles based on 'isScrolled'
  const textColor = isScrolled ? '#111827' : 'white'; // Black if scrolled, White if top
  const glassBackground = isScrolled 
    ? 'rgba(255, 255, 255, 0.95)' // Solid White (High visibility)
    : 'rgba(255, 255, 255, 0.1)'; // Transparent Glass

  const linkStyle = {
    color: textColor,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'color 0.3s ease', // Smooth color change
    cursor: 'pointer'
  };

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '20px',
      transition: 'padding 0.3s ease' // Smooth transition for padding if needed
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        
        // Dynamic Background
        backgroundColor: glassBackground,
        backdropFilter: 'blur(10px)',
        
        // Dynamic Border
        border: isScrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
        
        // Dynamic Shadow
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 4px 6px rgba(0,0,0,0.05)',
        
        borderRadius: '16px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease'
      }}>
        
        {/* LEFT SIDE *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          
          {/* LOGO *}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img 
              src={logoSrc} 
              alt="Odessey Logo" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
            />
            {/* Dynamic Logo Text Color *}
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: textColor, transition: 'color 0.3s ease' }}>
              Odessey
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '20px' }}>
            {leftNavLinks.map((link) => (
              <span 
                key={link.name} 
                onClick={() => handleNavClick(link.href)} 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = isScrolled ? '#f3f4f6' : 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {link.name}
              </span>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE *}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            {navLinks.map((link) => (
              <span 
                key={link.name} 
                onClick={() => handleNavClick(link.href)} 
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = isScrolled ? '#f3f4f6' : 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {link.name}
              </span>
            ))}
          </nav>

          {/* Dynamic Menu Icon Color *}
          <button style={{ background: 'none', border: 'none', color: textColor, cursor: 'pointer', padding: '4px', transition: 'color 0.3s ease' }}>
            <Menu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
*/

import React, { useState, useEffect } from 'react';
// 👇 Added Sparkles icon for the new Discover menu item
import { Menu, X, ChevronDown, MapPin, Compass, Calendar, Camera, Info, MessageCircle, ArrowRight, Map, Car, LayoutGrid, Sparkles } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// Import your logo
import logoSrc from '../Odesseylogo/logo_odessey.png'; 

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 
  const [isAtTop, setIsAtTop] = useState(true);     
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSection, setOpenSection] = useState(null); // Controls the accordion

  // Toggle Accordion Helper
  const toggleSection = (sectionTitle) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  // --- SCROLL & ROUTE LOGIC ---
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (location.pathname === '/') {
          if (currentScrollY < 50) setIsAtTop(true); 
          else setIsAtTop(false);
        } else {
          setIsAtTop(false);
        }

        if (isMenuOpen) {
          setIsVisible(false);
        } else {
          if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false); 
          else setIsVisible(true);  
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    controlNavbar();
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isMenuOpen, location.pathname]); 

  // Reset menu and style on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsVisible(true);
    setOpenSection(null); // Close accordions on page change
    if (location.pathname !== '/') setIsAtTop(false); 
    else setIsAtTop(window.scrollY < 50);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  // --- DESKTOP NAVIGATION ---
  const desktopNavLinks = [
    { name: 'Discover', href: '/discover' }, // 👇 Newly Added Discover Page
    { name: 'Plan Trip', href: '/plan' },
    { name: 'Itineraries', href: '/itinerary' },
    { name: 'Lodges', href: '/lodges' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Diaries', href: '/story' },
    { name: 'About Us', href: '/about' }
  ];

  // --- MOBILE ACCORDION STRUCTURE ---
  const menuStructure = [
    {
      title: "Destinations", icon: MapPin,
      items: [
        { label: "Search Destinations", href: "/" },
        { label: "Curated Itineraries", href: "/itinerary" },
        { label: "Premium Lodges", href: "/lodges" }
      ]
    },
    {
      title: "Experiences", icon: Compass,
      items: [
        { label: "All Experiences", href: "/experiences" },
        { label: "Adventure & Wildlife", href: "/experiences" },
        { label: "Culture & Wellness", href: "/experiences" }
      ]
    },
    {
      title: "Plan Your Trip", icon: Calendar,
      items: [
        { label: "Trip Discoverer (Quiz)", href: "/discover", navIcon: Sparkles }, // 👇 Newly Added Discover Page
        { label: "Custom Trip Planner", href: "/plan", navIcon: Calendar },
        { label: "Maps & Routes", href: "/route-planner", navIcon: Map }, 
        { label: "Vehicle Options", href: "/plan", navIcon: Car }, 
        { label: "Other Services", href: "/plan", navIcon: LayoutGrid } 
      ]
    },
    {
      title: "Inspiration", icon: Camera,
      items: [
        { label: "Travel Diaries", href: "/story" },
        { label: "Traveller Stories", href: "/story" }
      ]
    },
    {
      title: "About Odessey", icon: Info,
      items: [
        { label: "Our Story", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers & Partners", href: "/careers" }
      ]
    },
    {
      title: "Help & Connect", icon: MessageCircle,
      items: [
        { label: "Contact Us", href: "/#footer" },
        { label: "WhatsApp Support", href: "https://wa.me/919353520020", external: true }
      ]
    }
  ];

  const handleMobileNavClick = (e, item) => {
    if (item.external) {
      window.open(item.href, '_blank');
      return;
    }
    if (item.href.startsWith('/#')) {
      e.preventDefault();
      const id = item.href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.href);
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  // --- DYNAMIC STYLES ---
  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, padding: '20px',
    transition: 'transform 0.4s ease-in-out',
    transform: isVisible ? 'translateY(0)' : 'translateY(-150%)',
    pointerEvents: isVisible ? 'auto' : 'none'
  };

  const innerStyle = {
    maxWidth: '1200px', margin: '0 auto',
    backgroundColor: isAtTop ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 1)', 
    backdropFilter: isAtTop ? 'blur(10px)' : 'none',
    border: isAtTop ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0,0,0,0.05)',
    boxShadow: isAtTop ? '0 4px 6px rgba(0,0,0,0.05)' : '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '16px', padding: '10px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
  };

  const textColor = isAtTop ? 'white' : '#111827';
  
  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <header style={headerStyle}>
        <div style={innerStyle}>
          
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textDecoration: 'none' }}>
            <img src={logoSrc} alt="Odessey Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: textColor, transition: 'color 0.3s' }}>
              Odessey
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {desktopNavLinks.map((link) => (
              <Link 
                key={link.name} to={link.href} 
                style={{
                  color: textColor, fontSize: '14px', fontWeight: '600', textDecoration: 'none',
                  padding: '8px 12px', borderRadius: '8px', transition: 'all 0.2s',
                  backgroundColor: location.pathname === link.href ? (isAtTop ? 'rgba(255,255,255,0.2)' : '#f3f4f6') : 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = isAtTop ? 'rgba(255,255,255,0.2)' : '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = location.pathname === link.href ? (isAtTop ? 'rgba(255,255,255,0.2)' : '#f3f4f6') : 'transparent'}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', color: textColor, cursor: 'pointer', padding: '4px', transition: 'color 0.3s' }}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* --- MOBILE SLIDE-OUT MENU --- */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '400px', backgroundColor: 'white', zIndex: 50,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column'
      }}>
        
        {/* Drawer Header */}
        <div style={{ padding: '25px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logoSrc} alt="Odessey Logo" style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>Odessey</span>
          </div>
          <button 
            onClick={() => { setIsMenuOpen(false); setIsVisible(true); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', padding: '4px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Big Green Action Button */}
          <button 
            onClick={() => { setIsMenuOpen(false); navigate('/plan'); }}
            style={{ 
              width: '100%', backgroundColor: '#16a34a', color: 'white', 
              padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', 
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              marginBottom: '30px', transition: 'background 0.2s' 
            }}
            onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} 
            onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
          >
            Plan Your Adventure <ArrowRight size={18} />
          </button>

          {/* Accordion Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {menuStructure.map((section, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleSection(section.title)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <section.icon size={22} color="#16a34a" strokeWidth={2} />
                    <span style={{ fontSize: '17px', fontWeight: '600', color: '#1f2937' }}>{section.title}</span>
                  </div>
                  <ChevronDown size={20} color="#9ca3af" style={{ transform: openSection === section.title ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                </div>
                
                {/* Accordion Expanded Content */}
                <div style={{ 
                  maxHeight: openSection === section.title ? '400px' : '0', 
                  overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
                  paddingLeft: '37px' 
                }}>
                  <div style={{ paddingBottom: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.items.map((item, subIdx) => (
                      <div 
                        key={subIdx} 
                        onClick={(e) => handleMobileNavClick(e, item)}
                        style={{ fontSize: '15px', color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                        onMouseEnter={(e)=>e.currentTarget.style.color='#16a34a'} 
                        onMouseLeave={(e)=>e.currentTarget.style.color='#4b5563'}
                      >
                        {item.navIcon && <item.navIcon size={14} color="#9ca3af" />}
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
        
        {/* Drawer Footer */}
        <div style={{ padding: '20px 30px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
          © 2026 Odessey. Travel sustainably.
        </div>

      </div>

      {/* --- BACKGROUND OVERLAY --- */}
      {isMenuOpen && (
        <div 
          onClick={() => { setIsMenuOpen(false); setIsVisible(true); }}
          style={{ position: 'fixed', inset: 0, zIndex: 45, backgroundColor: 'rgba(17, 24, 39, 0.5)', backdropFilter: 'blur(3px)', transition: 'opacity 0.4s' }}
        />
      )}
    </>
  );
};

export default Header;