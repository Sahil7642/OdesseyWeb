import { useState, useEffect } from 'react';
import { STATUS } from 'react-joyride';

export const usePageTour = (tourKey) => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(tourKey);
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, [tourKey]);

  const handleTourCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem(tourKey, 'true');
    }
  };

  // If you ever want to call restart manually from somewhere else
  const restartTour = () => {
    setRunTour(false);
    setTimeout(() => setRunTour(true), 50);
  };

  return { runTour, handleTourCallback, restartTour };
};