import React, { useState, useEffect, forwardRef } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css"; 

import { Joyride } from 'react-joyride'; 
import { usePageTour } from './hooks/usePageTour'; 
import { HelpCircle } from 'lucide-react'; 

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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null; 
};

// 👇 The exact working CustomBeacon from your code
const CustomBeacon = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      onClick={props.onClick} // Joyride naturally listens to this!
      onMouseEnter={props.onMouseEnter} 
      style={{
        backgroundColor: '#16a34a',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '50px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 10px 25px rgba(22, 163, 74, 0.4)',
        animation: 'pulse 2s infinite' 
      }}
    >
      <HelpCircle size={18} /> How it works
    </button>
  );
});

const HomePageWrapper = ({ onSearch, searchQuery, searchResults }) => {
  const { runTour, handleTourCallback, restartTour } = usePageTour('hasSeenHomeTour');

  const tourSteps = [
    {
      // 👇 Step 1 targets the invisible anchor. No disableBeacon here, so CustomBeacon renders!
      target: '.tour-start-anchor', 
      content: 'Your journey starts here! Let’s take a quick look at how to navigate the platform.',
      placement: 'top',
    },
    {
      target: '.tour-header', 
      content: 'Use the navigation menu to explore destinations, plan trips, or check out our premium services.',
      placement: 'bottom',
      disableBeacon: true, // Hide the beacon for all subsequent steps
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
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        callback={handleTourCallback}
        beaconComponent={CustomBeacon} // 👈 Passes your custom button
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

      <div className="tour-home-hero" style={{ position: 'relative' }}>
        <HeroSection onSearch={onSearch} /> 
        
        {/* 👇 THE ANCHOR: Centered at the bottom of the Hero Section. Joyride will place the button here! */}
        <div 
          className="tour-start-anchor" 
          style={{ 
            position: 'absolute', 
            bottom: '40px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: '1px', 
            height: '1px' 
          }} 
        />

        {/* STATIC FALLBACK: If the user finishes the tour, runTour becomes false, so Joyride hides the beacon. 
            This renders a static button in the exact same spot so they can replay the tour anytime! */}
        {!runTour && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              restartTour();
            }}
            style={{
              position: 'absolute',
              bottom: '20px', // Adjusted slightly to match Joyride's beacon offset
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '50px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(22, 163, 74, 0.4)',
              transition: 'transform 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}
          >
            <HelpCircle size={18} /> Replay Tour
          </button>
        )}
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
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
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
        </Routes>

        <HoverChatbot />
        <WalkingCursor />
        <Footer />
      </div>
    </Router>
  );
}

export default App;