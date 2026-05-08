import { useState, useEffect } from 'react';
import { STATUS, ACTIONS } from 'react-joyride'; // 👈 Added ACTIONS

export const usePageTour = (tourKey) => {
  const [runTour, setRunTour] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const tourPreference = localStorage.getItem(tourKey);
    if (!tourPreference) {
      const timer = setTimeout(() => setShowPrompt(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [tourKey]);

  const handleTourCallback = (data) => {
    const { status, action } = data; // 👈 Destructure action
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    // 👇 CRITICAL FIX: If they click "Skip", reach the end, OR click the "X" (CLOSE)
    if (finishedStatuses.includes(status) || action === ACTIONS.CLOSE || action === ACTIONS.SKIP) {
      setRunTour(false); // Completely kills the tour immediately
      localStorage.setItem(tourKey, 'completed');
    }
  };

  const startTour = (dontShowAgain) => {
    setShowPrompt(false);
    if (dontShowAgain) {
      localStorage.setItem(tourKey, 'completed');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

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