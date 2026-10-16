import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

// App shell: fixed sidebar on desktop, slide-in sidebar + topbar on mobile.
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <div className="main">
        <header className="topbar">
          <button
            className="topbar__menu-btn"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <span className="topbar__title">Student Career Navigator</span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
