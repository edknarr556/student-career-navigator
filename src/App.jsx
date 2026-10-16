import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { ToastProvider } from './components/ToastProvider.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import JobSearch from './pages/JobSearch.jsx';
import Recommendations from './pages/Recommendations.jsx';
import SavedJobs from './pages/SavedJobs.jsx';
import Tracker from './pages/Tracker.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="jobs" element={<JobSearch />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="saved" element={<SavedJobs />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="explore" element={<Explore />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </ToastProvider>
    </AppProvider>
  );
}
