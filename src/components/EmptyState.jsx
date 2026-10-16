import { Link } from 'react-router-dom';

// Reusable empty-state block used whenever a list has no items.
export default function EmptyState({ icon = '📭', title, message, actionLabel, actionTo }) {
  return (
    <div className="empty">
      <div className="empty__icon">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn--primary" style={{ marginTop: '0.75rem' }}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
