import { useApp } from '../context/AppContext.jsx';
import { useToast } from './ToastProvider.jsx';
import MatchBar from './MatchBar.jsx';

// A richer recommendation card used by the "Generate New Matches" feature.
// It explicitly breaks down, for each recommended position:
//   • matching qualifications (skills/experience the participant already has)
//   • missing skills (gaps to close), so the recommendation is testable.
export default function TopMatchCard({ job, rank, onViewDetails }) {
  const { isJobSaved, toggleSavedJob } = useApp();
  const { showToast } = useToast();
  const saved = isJobSaved(job.id);
  const m = job.match || {};

  const matched = m.matchedSkills || [];
  const missing = m.missingSkills || [];
  const experienceSkills = m.experienceSkills || [];
  const reasons = m.reasons || [];
  const eligibilityNote = m.eligibilityNote || '';

  const handleSave = () => {
    toggleSavedJob(job.id);
    showToast(saved ? 'Removed from saved jobs' : `Saved "${job.title}"`, saved ? 'info' : 'success');
  };

  return (
    <article className="card job-card" data-testid="top-match-card">
      <div className="job-card__top">
        <div>
          <h3 className="job-card__title">
            <span className="rank-pill">#{rank}</span> {job.title}
          </h3>
          <div className="job-card__company">
            {job.company} · {job.location}
          </div>
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
        <span>🧭 {job.field}</span>
        <span>💼 {job.employmentType}</span>
        {job.pay && <span>💲 {job.pay}</span>}
        <span className="chip chip--muted" title="This is a simulated opportunity with a fictional employer">
          Simulated
        </span>
      </div>

      <MatchBar percentage={m.percentage ?? 0} reasons={reasons} />

      {/* Eligibility / certification warning for grad-degree or license roles */}
      {eligibilityNote && (
        <div className="eligibility-note" role="note">
          🚫 {eligibilityNote}
        </div>
      )}

      {/* Matching qualifications */}
      <div className="match-breakdown">
        <div className="match-breakdown__title match-breakdown__title--good">
          ✅ Matching qualifications
        </div>
        {matched.length > 0 || experienceSkills.length > 0 ? (
          <div className="chips">
            {matched.map((s) => (
              <span key={`m-${s}`} className="chip chip--match-good">{s}</span>
            ))}
            {experienceSkills.map((s) => (
              <span key={`e-${s}`} className="chip chip--match-good" title="Evidenced in your previous experience">
                {s} (from experience)
              </span>
            ))}
          </div>
        ) : (
          <p className="match-breakdown__empty">
            No direct skill matches yet — add relevant skills or experience to your profile.
          </p>
        )}
      </div>

      {/* Missing / qualifications to develop */}
      <div className="match-breakdown">
        <div className="match-breakdown__title match-breakdown__title--gap">
          ⚠️ Qualifications you may be missing
        </div>
        {missing.length > 0 ? (
          <div className="chips">
            {missing.map((s) => (
              <span key={`x-${s}`} className="chip chip--match-gap">{s}</span>
            ))}
          </div>
        ) : (
          <p className="match-breakdown__empty">
            You already list every required skill for this role. 🎉
          </p>
        )}
        {(job.qualifications || []).length > 0 && (
          <p className="match-breakdown__quals">
            <strong>Listed requirements:</strong> {job.qualifications.join(' · ')}
          </p>
        )}
      </div>

      <div className="job-card__actions">
        <button className="btn btn--outline btn--sm" onClick={() => onViewDetails(job)}>
          View Details
        </button>
        <button className="btn btn--ghost btn--sm" onClick={handleSave}>
          {saved ? '★ Saved' : '☆ Save Job'}
        </button>
      </div>
    </article>
  );
}
