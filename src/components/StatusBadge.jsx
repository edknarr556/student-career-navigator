// Maps an application status to a colored badge.
const CLASS_MAP = {
  Interested: 'badge--interested',
  Applied: 'badge--applied',
  'Interview Scheduled': 'badge--interview',
  'Offer Received': 'badge--offer',
  Rejected: 'badge--rejected',
};

export default function StatusBadge({ status }) {
  const cls = CLASS_MAP[status] || 'badge--interested';
  return <span className={`badge ${cls}`}>{status}</span>;
}
