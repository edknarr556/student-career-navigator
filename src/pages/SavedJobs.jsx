import { useMemo, useState } from 'react';
import jobs from '../data/jobs.js';
import { useApp } from '../context/AppContext.jsx';
import { rankJobs } from '../utils/matching.js';
import JobCard from '../components/JobCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function SavedJobs() {
  const { profile, savedJobIds } = useApp();
  const [activeJob, setActiveJob] = useState(null);

  const savedJobs = useMemo(() => {
    const ranked = rankJobs(profile, jobs);
    return ranked.filter((job) => savedJobIds.includes(job.id));
  }, [profile, savedJobIds]);

  return (
    <div className="page">
      <div className="page__header">
        <h1>Saved Jobs 🔖</h1>
        <p>Opportunities you've bookmarked. They persist in your browser.</p>
      </div>

      {savedJobs.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="No saved jobs yet"
          message="Browse the job search and tap the star on any listing to save it here."
          actionLabel="Browse Jobs"
          actionTo="/jobs"
        />
      ) : (
        <>
          <div className="results-count">
            <strong>{savedJobs.length}</strong> saved {savedJobs.length === 1 ? 'job' : 'jobs'}
          </div>
          <div className="grid grid--cards">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} showMatch onViewDetails={setActiveJob} />
            ))}
          </div>
        </>
      )}

      {activeJob && <JobDetailModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </div>
  );
}
