import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css"; 

import { Joyride } from 'react-joyride'; 
import { usePageTour } from './hooks/usePageTour'; 
import { Map, X } from 'lucide-react'; 

// Existing Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection"; 
import ExploreStates from "./components/ExploreStates"; 
import TravelerTypes from "./components/TravellerTypes";
import ExperienceGrid from "./components/ExperienceGrid";
import TravelerStories from "./components/TravelerStories";
import SearchResults from "./components/SearchResults";
import StateDetails from "./components/StateDetails"; 

import HoverChatbot from "./components/HoverChatBot";
import WalkingCursor from "./components/WalkingCursor";

// Pages
import PlanTrip from "./pages/PlanTrip";
import StoriesPage from "./pages/StoriesPage";
import ItinerariesPage from "./pages/ItinerariesPage";
import LodgesPage from "./pages/LodgesPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import MissionPage from "./pages/MissionPage";
import AboutPage from "./pages/AboutPage";
import RoutePlannerPage from "./pages/RoutePlannerPage";
import TripDiscovererPage from './pages/TripDiscovererPage';
import BlogPage from './pages/BlogPage';
import GamePage from "./pages/GamePage";
import CareersPage from "./pages/CareersPage";
import VehicleOptions from "./pages/VehicleOptions";
import WishlistPage from "./pages/WishlistPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null; 
};

const HomePageWrapper = ({ onSearch, searchQuery, searchResults }) => {
  const { runTour, showPrompt, handleTourCallback, startTour, skipTour } = usePageTour('hasSeenHomeTour');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const tourSteps = [
    {
      // 👇 FOOLPROOF TARGET: Targeting the body guarantees it works 100% of the time!
      target: 'body', 
      content: 'Welcome to Odessey! Let’s take a quick look at how to navigate the platform.',
      placement: 'center',
      disableBeacon: true, 
    },
    {
      target: '.tour-nav-explore', 
      content: 'Discover hidden gems, browse unique experiences, and read inspiring travel diaries from others.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.tour-nav-plan', 
      content: 'Ready to pack? Build a custom day-by-day itinerary or browse our ready-made travel plans.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.tour-nav-services', 
      content: 'Book premium eco-lodges, map out complex road trips, and secure your travel vehicles all in one place.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.tour-nav-community', 
      content: 'Connect with fellow travelers, read insightful blogs, and share your own adventures.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.tour-home-hero',
      content: 'Start your journey by searching for a destination right here.',
      placement: 'bottom',
      disableBeacon: true, 
    },
    {
      target: '.tour-home-states',
      content: 'Not sure where to go? Browse through our beautifully curated guides for every state in India.',
      disableBeacon: true, 
    },
    {
      target: '.tour-home-types',
      content: 'Select your personal travel style—from Backpacking to Luxury—to get perfectly tailored recommendations.',
      disableBeacon: true,
    },
    {
      target: '.tour-home-experiences',
      content: 'Find unique, hand-picked local activities that go beyond standard sightseeing.',
      disableBeacon: true,
    },
    {
      target: '#traveler-diaries',
      content: 'Get inspired by real travel stories from our community, or write and share your own adventures!',
      disableBeacon: true,
    },
    {
      target: '.tour-chatbot',
      content: 'Have questions or need instant help? Our AI assistant is here 24/7 to guide your journey!',
      disableBeacon: true,
      placement: 'left',
    }
  ];

  return (
    <>
      {/* --- THE STARTUP PROMPT MODAL --- */}
      {showPrompt && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '24px', padding: '40px', maxWidth: '450px', width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center', position: 'relative',
            animation: 'slideUp 0.4s ease-out'
          }}>
            <button onClick={() => skipTour(dontShowAgain)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
              <X size={24} />
            </button>
            
            <div style={{ width: '60px', height: '60px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Map size={30} color="#16a34a" />
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>Welcome to Odessey!</h2>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', marginBottom: '30px' }}>
              Would you like a quick guided tour to help you navigate our platform and discover all our travel features?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
              <button 
                onClick={() => startTour(dontShowAgain)}
                style={{ backgroundColor: '#16a34a', color: 'white', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#15803d'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#16a34a'}
              >
                Yes, start the tour
              </button>
              <button 
                onClick={() => skipTour(dontShowAgain)}
                style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#e5e7eb'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#f3f4f6'}
              >
                No, skip for now
              </button>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#6b7280' }}>
              <input 
                type="checkbox" 
                checked={dontShowAgain} 
                onChange={(e) => setDontShowAgain(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#16a34a' }}
              />
              Do not show this message again
            </label>
          </div>
        </div>
      )}

      {/* --- THE JOYRIDE COMPONENT --- */}
      {runTour && (
        <Joyride
          steps={tourSteps}
          run={runTour}
          continuous={true} 
          showSkipButton={true}
          showProgress={true}
          callback={handleTourCallback}
          scrollOffset={150} 
          styles={{
            options: { primaryColor: '#16a34a', zIndex: 10000, textColor: '#334155' },
            buttonClose: { display: 'none' },
            tooltip: { borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', padding: '20px' },
            buttonNext: { borderRadius: '8px', fontWeight: 'bold' },
            buttonBack: { color: '#64748b' },
            buttonSkip: { color: '#94a3b8' }
          }}
        />
      )}

      <div className="tour-home-hero">
        <HeroSection onSearch={onSearch} /> 
      </div>

      <div className="tour-home-states">
        <ExploreStates />
      </div>
      <div className="tour-home-types">
        <TravelerTypes />
      </div>
      <div className="tour-home-experiences">
        <ExperienceGrid />
      </div>
      <div id="traveler-diaries">
        <TravelerStories />
      </div>
      <div id="search-results">
        <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (place) => {
    setSearchQuery(place.name);
    setSearchResults([place]);
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Router>
      <ScrollToTop />
      
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePageWrapper onSearch={handleSearch} searchQuery={searchQuery} searchResults={searchResults} />} />
          <Route path="/place/:placeName" element={<StateDetails />} />
          <Route path="/state/:stateName" element={<StateDetails />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/route-planner" element={<RoutePlannerPage />} />
          <Route path="/story" element={<StoriesPage />} />
          <Route path="/itinerary" element={<ItinerariesPage />} />
          <Route path="/lodges" element={<LodgesPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/discover" element={<TripDiscovererPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/vehicles" element={<VehicleOptions />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>

        <HoverChatbot />
        <WalkingCursor />
        <Footer />
      </div>
    </Router>
  );
}

export default App;