import { useApp } from '../context/AppContext.jsx';
import { useToast } from './ToastProvider.jsx';
import MatchBar from './MatchBar.jsx';

function formatDeadline(dateStr) {
  if (!dateStr) return 'Open';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// A single job listing card. Shows meta, skills, optional match, and the
// Save / Apply / Details actions.
export default function JobCard({ job, onViewDetails, showMatch = false }) {
  const { isJobSaved, toggleSavedJob, addApplication, isJobTracked } = useApp();
  const { showToast } = useToast();

  const saved = isJobSaved(job.id);
  const tracked = isJobTracked(job.id);

  const handleSave = () => {
    toggleSavedJob(job.id);
    showToast(saved ? 'Removed from saved jobs' : `Saved "${job.title}"`, saved ? 'info' : 'success');
  };

  const handleApply = () => {
    addApplication(job.id, 'Applied');
    showToast(tracked ? 'Already in your tracker' : `Application started for "${job.title}"`, tracked ? 'info' : 'success');
  };

  return (
    <article className="card job-card">
      <div className="job-card__top">
        <div>
          <h3 className="job-card__title">{job.title}</h3>
          <div className="job-card__company">{job.company}</div>
        </div>
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
          title={saved ? 'Remove from saved jobs' : 'Save this job'}
          aria-label={saved ? 'Remove from saved jobs' : 'Save this job'}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <div className="job-card__meta">
        <span>📍 {job.location}</span>
        <span>🧭 {job.field}</span>
        <span>💼 {job.employmentType}</span>
        {job.pay && <span>💲 {job.pay}</span>}
        <span>⏳ Apply by {formatDeadline(job.deadline)}</span>
      </div>

      <p className="job-card__desc">{job.description}</p>

      <div className="chips">
        {job.skills.map((skill) => (
          <span key={skill} className="chip chip--muted">
            {skill}
          </span>
        ))}
      </div>

      {showMatch && job.match && (
        <MatchBar percentage={job.match.percentage} reasons={job.match.reasons} />
      )}

      <div className="job-card__actions">
        <button className="btn btn--outline btn--sm" onClick={() => onViewDetails(job)}>
          View Details
        </button>
        <button className="btn btn--ghost btn--sm" onClick={handleSave}>
          {saved ? '★ Saved' : '☆ Save Job'}
        </button>
        <button className="btn btn--primary btn--sm" onClick={handleApply} disabled={tracked}>
          {tracked ? 'In Tracker' : 'Apply'}
        </button>
      </div>
    </article>
  );
}
