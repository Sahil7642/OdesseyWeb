





/*

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";


const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (place) => {
    console.log('Searching for:', place);
    setSearchQuery(place.name);
    // Mock results - in real app this would be API call
    setSearchResults([place]);
   
    // Scroll to results section
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };


  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div id="search-results">
        <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
      </div>
      <Footer />
    </div>
  );
};


// Placeholder pages for navigation with consistent layout
const PageLayout = ({ title, description }) => (
  <div className="min-h-screen bg-page">
    <Header />
    <div className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="display-medium text-primary mb-6">{title}</h1>
        <p className="body-large text-secondary mb-8">{description}</p>
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-green-200">
          <p className="text-gray-600">This page is coming soon. We're working on bringing you amazing eco-friendly {title.toLowerCase()} experiences!</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);


const Lodges = () => <PageLayout title="Our Lodges" description="Eco-friendly accommodations in pristine natural settings" />;
const Experiences = () => <PageLayout title="Experiences" description="Unique nature experiences that connect you with the environment" />;
const Mission = () => <PageLayout title="Our Mission" description="Sustainable travel that preserves nature for future generations" />;
const Plan = () => <PageLayout title="Plan Your Trip" description="Comprehensive trip planning tools for sustainable travel" />;
const Story = () => <PageLayout title="Our Story" description="How we started our journey towards sustainable tourism" />;
const Itinerary = () => <PageLayout title="Itinerary" description="Curated itineraries for eco-conscious travelers" />;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lodges" element={<Lodges />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/story" element={<Story />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

// Now let me update the HeroSection component to work with the new search functionality:
*/

/*
import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "./index.css"; 

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection"; 
import ExploreStates from "./components/ExploreStates"; // <--- 1. IMPORT NEW COMPONENT
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (place) => {
    console.log('Searching for:', place);
    setSearchQuery(place.name);
    // If you have real data later, you would filter it here.
    // For now, we just pretend the search result is the place itself.
    setSearchResults([place]);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      {/* Hero Section with Search Box *}
      <HeroSection onSearch={handleSearch} /> 
      
      {/* --- 2. ADD EXPLORE STATES HERE --- *}
      {/* This will show the grid of states immediately after the main image *}
      <ExploreStates />

      {/* Search Results (Only visible if you search or have content) *}
      <div id="search-results">
        <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

*/
/*
import React, { useState } from "react";
// 👇 1. Import Router Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; 

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TravellerTypes from "./components/TravellerTypes"; 
import ExperienceGrid from "./components/ExperienceGrid";
import TravelerStories from "./components/TravelerStories";
import ExploreStates from "./components/ExploreStates"; 
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
// 👇 2. Import New Page
import StateDetails from "./components/StateDetails"; 

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
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        
        <Routes>
          {/* 👇 ROUTE 1: The Main Home Page *}
          <Route path="/" element={
            <>
              <HeroSection onSearch={handleSearch} /> 
              <ExploreStates />
              <TravellerTypes />
              <ExperienceGrid />
              <div id="traveler-diaries">
                <TravelerStories />
              </div>
              <div id="search-results">
                <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
              </div>
            </>
          } />

          {/* 👇 ROUTE 2: The New State Detail Page *}
          {/* ":stateCode" is a variable (like "GA" or "MH") that we pass to the page *}
          <Route path="/state/:stateCode" element={<StateDetails />} />
        </Routes>

        <Footer />
  
      </div>
    </Router>
  );
}

export default App;
*/

import React, { useState, useEffect } from "react";
// 👇 Added useLocation here
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css"; 

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

// Pages
import PlanTrip from "./pages/PlanTrip";
import StoriesPage from "./pages/StoriesPage";
import ItinerariesPage from "./pages/ItinerariesPage";
import LodgesPage from "./pages/LodgesPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import MissionPage from "./pages/MissionPage";
import AboutPage from "./pages/AboutPage";
import RoutePlannerPage from "./pages/RoutePlannerPage";
import TripDiscovererPage from './pages/TripDiscovererPage'

// 👇 NEW: ScrollToTop Helper Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top left (x: 0, y: 0) every time the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
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
      {/* 👇 NEW: Place ScrollToTop directly inside the Router */}
      <ScrollToTop />
      
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={
            <>
              <HeroSection onSearch={handleSearch} /> 
              <ExploreStates />
              <TravelerTypes />
              <ExperienceGrid />
              <div id="traveler-diaries">
                <TravelerStories />
              </div>
              <div id="search-results">
                <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
              </div>
            </>
          } />
          
          {/* STATE DETAILS PAGE */}
         <Route path="/place/:placeName" element={<StateDetails />} />
         <Route path="/state/:stateName" element={<StateDetails />} />

          {/* NEW ROUTES FOR HEADER LINKS */}
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

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;