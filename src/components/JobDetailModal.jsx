import { useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useToast } from './ToastProvider.jsx';
import MatchBar from './MatchBar.jsx';

function formatDeadline(dateStr) {
  if (!dateStr) return 'Open';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Full job details in an accessible modal dialog.
export default function JobDetailModal({ job, onClose }) {
  const { isJobSaved, toggleSavedJob, addApplication, isJobTracked } = useApp();
  const { showToast } = useToast();

  // Close on Escape key.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!job) return null;

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <h2 style={{ marginBottom: '0.2rem' }}>{job.title}</h2>
            <div className="job-card__company">{job.company}</div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="job-card__meta" style={{ marginBottom: '1rem' }}>
            <span>📍 {job.location}</span>
            <span>🧭 {job.field}</span>
            <span>💼 {job.employmentType}</span>
            {job.pay && <span>💲 {job.pay}</span>}
          </div>

          {job.match && (
            <div style={{ marginBottom: '1rem' }}>
              <MatchBar percentage={job.match.percentage} reasons={job.match.reasons} />
            </div>
          )}

          <div className="section-title">Job Description</div>
          <p style={{ marginTop: 0 }}>{job.description}</p>

          <div className="section-title">Required Skills</div>
          <div className="chips">
            {job.skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>

          <div className="section-title">Application Deadline</div>
          <p style={{ marginTop: 0 }}>⏳ {formatDeadline(job.deadline)}</p>

          <div className="job-card__actions" style={{ marginTop: '1rem' }}>
            <button className="btn btn--ghost" onClick={handleSave}>
              {saved ? '★ Saved' : '☆ Save Job'}
            </button>
            <button className="btn btn--primary" onClick={handleApply} disabled={tracked}>
              {tracked ? 'Already in Tracker' : 'Apply & Track'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
