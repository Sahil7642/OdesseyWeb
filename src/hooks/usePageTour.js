import { useState, useEffect } from 'react';
import { STATUS } from 'react-joyride';

export const usePageTour = (tourKey) => {
  const [runTour, setRunTour] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the user has explicitly finished or dismissed the tour forever
    const tourPreference = localStorage.getItem(tourKey);
    if (!tourPreference) {
      // 1.5 second delay gives the page time to load before asking
      const timer = setTimeout(() => setShowPrompt(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [tourKey]);

  const handleTourCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    // If the user clicks "Skip" or reaches the end, we save their preference
    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem(tourKey, 'completed');
    }
  };

  const startTour = (dontShowAgain) => {
    setShowPrompt(false);
    if (dontShowAgain) {
      localStorage.setItem(tourKey, 'completed');
    }

    // Scroll to the top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Give the page 800ms to scroll and the Header to animate down
    setTimeout(() => {
      setRunTour(true);
    }, 800);
  };

  const skipTour = (dontShowAgain) => {
    setShowPrompt(false);
    if (dontShowAgain) {
      localStorage.setItem(tourKey, 'skipped');
    }
  };

  return { runTour, showPrompt, handleTourCallback, startTour, skipTour };
};