import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import jobs from '../data/jobs.js';
import { useApp } from '../context/AppContext.jsx';
import { rankJobs } from '../utils/matching.js';
import JobCard from '../components/JobCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';

export default function Recommendations() {
  const { profile } = useApp();
  const [activeJob, setActiveJob] = useState(null);

  const ranked = useMemo(() => rankJobs(profile, jobs), [profile]);

  return (
    <div className="page">
      <div className="page__header">
        <h1>Recommended For You ⭐</h1>
        <p>
          Jobs ranked by how well they match your major, skills, and interests. Update your{' '}
          <Link to="/profile">profile</Link> to refine these recommendations.
        </p>
      </div>

      <div className="inline-note">
        Match percentages are calculated from your profile using a transparent scoring algorithm —
        no AI or external services. Each card explains why it was recommended.
      </div>

      <div className="grid grid--cards">
        {ranked.map((job) => (
          <JobCard key={job.id} job={job} showMatch onViewDetails={setActiveJob} />
        ))}
      </div>

      {activeJob && <JobDetailModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </div>
  );
}
