import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, APPLICATION_STATUSES } from '../context/AppContext.jsx';
import jobs from '../data/jobs.js';
import careerFields from '../data/careerFields.js';
import { rankJobs } from '../utils/matching.js';
import JobCard from '../components/JobCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Dashboard() {
  const { profile, savedJobIds, applications } = useApp();
  const [activeJob, setActiveJob] = useState(null);

  const ranked = useMemo(() => rankJobs(profile, jobs), [profile]);
  const topJobs = ranked.slice(0, 3);

  // Recommend career paths whose field relates to the student's interests/major.
  const recommendedPaths = useMemo(() => {
    const haystack = [...(profile.interests || []), profile.major || '']
      .join(' ')
      .toLowerCase();
    const scored = careerFields.map((f) => {
      const words = f.name.toLowerCase().split(/\s+/);
      const score = words.filter((w) => w.length > 2 && haystack.includes(w)).length;
      return { field: f, score };
    });
    const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
    const chosen = (matched.length ? matched : scored).slice(0, 3);
    return chosen.map((s) => s.field);
  }, [profile]);

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(APPLICATION_STATUSES.map((s) => [s, 0]));
    applications.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    });
    return counts;
  }, [applications]);

  const jobById = useMemo(() => Object.fromEntries(ranked.map((j) => [j.id, j])), [ranked]);

  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome back, {profile.name || 'Student'}! 👋</h1>
        <p>
          {profile.major ? `${profile.major} major` : 'Set your major in your profile'}
          {profile.university ? ` · ${profile.university}` : ''}
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid--stats" style={{ marginBottom: '1.75rem' }}>
        <div className="card stat">
          <div className="stat__value">{jobs.length}</div>
          <div className="stat__label">Opportunities available</div>
        </div>
        <div className="card stat">
          <div className="stat__value">{savedJobIds.length}</div>
          <div className="stat__label">Saved jobs</div>
        </div>
        <div className="card stat">
          <div className="stat__value">{applications.length}</div>
          <div className="stat__label">Applications tracked</div>
        </div>
        <div className="card stat">
          <div className="stat__value">{topJobs[0]?.match.percentage ?? 0}%</div>
          <div className="stat__label">Best career match</div>
        </div>
      </div>

      {/* Application tracking summary */}
      <div className="panel" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ margin: 0 }}>Application Tracking Summary</h2>
          <Link to="/tracker" className="btn btn--outline btn--sm">Open Tracker</Link>
        </div>
        {applications.length === 0 ? (
          <p style={{ color: 'var(--gray-600)', marginBottom: 0 }}>
            You haven't tracked any applications yet. Apply to a job to get started.
          </p>
        ) : (
          <div className="chips" style={{ marginTop: '0.75rem' }}>
            {APPLICATION_STATUSES.map((status) => (
              <span key={status} className="chip">
                <StatusBadge status={status} /> {statusCounts[status]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Recommended career paths */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2>Recommended Career Paths</h2>
        <Link to="/explore" className="btn btn--outline btn--sm">Explore Careers</Link>
      </div>
      <div className="grid grid--cards" style={{ marginBottom: '1.75rem' }}>
        {recommendedPaths.map((field) => (
          <Link
            key={field.id}
            to={`/explore?field=${field.id}`}
            className="card field-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3>{field.name}</h3>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              {field.description.slice(0, 120)}…
            </p>
            <div className="chips">
              {field.skills.slice(0, 3).map((s) => (
                <span key={s} className="chip chip--muted">{s}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Recommended jobs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2>Recommended Job Opportunities</h2>
        <Link to="/recommendations" className="btn btn--outline btn--sm">See all matches</Link>
      </div>
      <div className="grid grid--cards">
        {topJobs.map((job) => (
          <JobCard key={job.id} job={job} showMatch onViewDetails={setActiveJob} />
        ))}
      </div>

      {activeJob && (
        <JobDetailModal job={jobById[activeJob.id] || activeJob} onClose={() => setActiveJob(null)} />
      )}
    </div>
  );
}
