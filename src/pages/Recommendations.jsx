import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import jobs, { IS_DEMO_DATA } from '../data/jobs.js';
import { useApp } from '../context/AppContext.jsx';
import { rankJobs, generateMatches } from '../utils/matching.js';
import JobCard from '../components/JobCard.jsx';
import TopMatchCard from '../components/TopMatchCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import { useToast } from '../components/ToastProvider.jsx';

// Short, human-readable summary of the profile inputs that drove a match run,
// so participants can confirm the recommendations reflect their latest edits.
function profileSummary(p) {
  const parts = [];
  if (p.major) parts.push(p.major);
  if (p.academicYear) parts.push(p.academicYear);
  if (p.preferredType) parts.push(p.preferredType);
  if (p.preferredLocation) parts.push(p.preferredLocation);
  const skills = (p.skills || []).slice(0, 5).join(', ');
  if (skills) parts.push(`skills: ${skills}`);
  return parts.join(' · ');
}

export default function Recommendations() {
  const { profile } = useApp();
  const { showToast } = useToast();
  const [activeJob, setActiveJob] = useState(null);

  // The full ranked list (existing functionality — unchanged behavior).
  const ranked = useMemo(() => rankJobs(profile, jobs), [profile]);

  // The three generated matches. Null until the participant clicks the button.
  const [generated, setGenerated] = useState(null);
  // Snapshot of the profile summary at generation time (for transparency).
  const [generatedFor, setGeneratedFor] = useState('');
  const [runCount, setRunCount] = useState(0);

  const handleGenerate = () => {
    // Recompute against the CURRENT profile every click — never cached/hardcoded.
    const top3 = generateMatches(profile, jobs, 3);
    setGenerated(top3);
    setGeneratedFor(profileSummary(profile));
    setRunCount((n) => n + 1);
    showToast('Generated 3 new matches from your current profile', 'success');
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1>Recommended For You ⭐</h1>
        <p>
          Jobs ranked by how well they match your major, academic year, skills,
          previous experience, preferred location, and job type. Update your{' '}
          <Link to="/profile">profile</Link> and click{' '}
          <strong>Generate New Matches</strong> to see them change.
        </p>
      </div>

      {IS_DEMO_DATA && (
        <div className="inline-note" role="note">
          <strong>Demonstration data:</strong> these listings are a fixed sample
          dataset for this ETI&nbsp;200 research prototype — not live job postings.
          Recommendations are produced by filtering and ranking that dataset
          against your profile with a transparent, local scoring algorithm (no AI
          service or external API, so there are no credentials involved).
        </div>
      )}

      {/* ---- Generate New Matches ---- */}
      <section className="panel generate-panel">
        <div className="generate-panel__head">
          <div>
            <h2 style={{ margin: 0 }}>Generate New Matches</h2>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--gray-600)' }}>
              Produces three recommendations from your <em>current</em> profile,
              each with matching qualifications and missing skills.
            </p>
          </div>
          <button className="btn btn--primary" onClick={handleGenerate} data-testid="generate-matches">
            🔄 Generate New Matches
          </button>
        </div>

        {generated === null ? (
          <p style={{ color: 'var(--gray-600)', marginBottom: 0 }}>
            Click <strong>Generate New Matches</strong> to see your top three
            opportunities. Edit your <Link to="/profile">profile</Link> anytime and
            regenerate — results update instantly, no page reload needed.
          </p>
        ) : (
          <>
            <p className="generate-panel__meta">
              Showing 3 matches for: <strong>{generatedFor || 'your profile'}</strong>
              <span className="generate-panel__run">run #{runCount}</span>
            </p>
            <div className="grid grid--cards">
              {generated.map((job, i) => (
                <TopMatchCard
                  key={job.id}
                  job={job}
                  rank={i + 1}
                  onViewDetails={setActiveJob}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ---- Full ranked list (existing functionality, preserved) ---- */}
      <h2 style={{ marginTop: '2rem' }}>All opportunities, ranked</h2>
      <div className="grid grid--cards">
        {ranked.map((job) => (
          <JobCard key={job.id} job={job} showMatch onViewDetails={setActiveJob} />
        ))}
      </div>

      {activeJob && <JobDetailModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </div>
  );
}
