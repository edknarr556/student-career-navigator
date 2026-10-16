import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
} from '../utils/storage.js';
import demoProfile from '../data/demoProfile.js';

const AppContext = createContext(null);

export const APPLICATION_STATUSES = [
  'Interested',
  'Applied',
  'Interview Scheduled',
  'Offer Received',
  'Rejected',
];

export function AppProvider({ children }) {
  // Seed with the demo profile on first run so the app is immediately usable.
  const [profile, setProfile] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PROFILE, demoProfile)
  );
  const [savedJobIds, setSavedJobIds] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SAVED_JOBS, [])
  );
  const [applications, setApplications] = useState(() =>
    loadFromStorage(STORAGE_KEYS.APPLICATIONS, [])
  );

  // Persist each slice to local storage whenever it changes.
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SAVED_JOBS, savedJobIds);
  }, [savedJobIds]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.APPLICATIONS, applications);
  }, [applications]);

  // --- Profile actions ---
  const updateProfile = (next) => setProfile(next);

  // --- Saved jobs actions ---
  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  const toggleSavedJob = (jobId) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const removeSavedJob = (jobId) => {
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
  };

  // --- Application tracker actions ---
  const isJobTracked = (jobId) =>
    applications.some((app) => app.jobId === jobId);

  const addApplication = (jobId, status = 'Interested') => {
    setApplications((prev) => {
      if (prev.some((app) => app.jobId === jobId)) return prev;
      return [
        ...prev,
        {
          id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          jobId,
          status,
          appliedDate: status === 'Applied' ? today() : '',
          notes: '',
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const updateApplication = (appId, updates) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, ...updates } : app))
    );
  };

  const removeApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  };

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      savedJobIds,
      isJobSaved,
      toggleSavedJob,
      removeSavedJob,
      applications,
      isJobTracked,
      addApplication,
      updateApplication,
      removeApplication,
    }),
    [profile, savedJobIds, applications]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}
