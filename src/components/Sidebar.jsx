import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/jobs', label: 'Job Search', icon: '🔍' },
  { to: '/recommendations', label: 'Recommendations', icon: '⭐' },
  { to: '/saved', label: 'Saved Jobs', icon: '🔖', badge: 'saved' },
  { to: '/tracker', label: 'Application Tracker', icon: '📋', badge: 'apps' },
  { to: '/explore', label: 'Career Exploration', icon: '🧭' },
  { to: '/profile', label: 'My Profile', icon: '👤' },
];

export default function Sidebar({ open, onNavigate }) {
  const { savedJobIds, applications } = useApp();

  const badgeValue = (key) => {
    if (key === 'saved') return savedJobIds.length;
    if (key === 'apps') return applications.length;
    return 0;
  };

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar__brand">
        <img src="/favicon.svg" alt="" />
        <span>Career Navigator</span>
      </div>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && badgeValue(item.badge) > 0 && (
              <span className="sidebar__badge">{badgeValue(item.badge)}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        Student Career Navigator
        <br />
        Prototype v1.0
      </div>
    </aside>
  );
}
