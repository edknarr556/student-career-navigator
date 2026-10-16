import { useMemo, useState } from 'react';
import jobs, { EMPLOYMENT_TYPES, CAREER_FIELDS } from '../data/jobs.js';
import { useApp } from '../context/AppContext.jsx';
import { rankJobs } from '../utils/matching.js';
import JobCard from '../components/JobCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function JobSearch() {
  const { profile } = useApp();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');
  const [field, setField] = useState('All');
  const [activeJob, setActiveJob] = useState(null);

  // Attach match data so cards can optionally display it and so details stay consistent.
  const ranked = useMemo(() => rankJobs(profile, jobs), [profile]);

  // Unique locations derived from the data.
  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return ranked.filter((job) => {
      // Keyword search across title, company, skills, description, field.
      if (kw) {
        const haystack = [
          job.title,
          job.company,
          job.description,
          job.field,
          ...job.skills,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(kw)) return false;
      }
      if (type !== 'All' && job.employmentType !== type) return false;
      if (location !== 'All' && job.location !== location) return false;
      if (field !== 'All' && job.field !== field) return false;
      return true;
    });
  }, [ranked, keyword, type, location, field]);

  const hasActiveFilters =
    keyword.trim() !== '' || type !== 'All' || location !== 'All' || field !== 'All';

  const clearFilters = () => {
    setKeyword('');
    setType('All');
    setLocation('All');
    setField('All');
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1>Job Search</h1>
        <p>Browse {jobs.length} internships and entry-level opportunities. Search and filters update instantly.</p>
      </div>

      <div className="filters">
        <div className="field">
          <label htmlFor="kw">Search by keyword</label>
          <input
            id="kw"
            className="input"
            type="text"
            placeholder="Title, company, or skill…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="type">Employment type</label>
          <select id="type" className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option>All</option>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="loc">Location</label>
          <select id="loc" className="select" value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="fld">Career field</label>
          <select id="fld" className="select" value={field} onChange={(e) => setField(e.target.value)}>
            <option>All</option>
            {CAREER_FIELDS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <button className="btn btn--ghost" onClick={clearFilters} disabled={!hasActiveFilters}>
            Clear
          </button>
        </div>
      </div>

      <div className="results-count">
        Showing <strong>{filtered.length}</strong> of {jobs.length} jobs
        {hasActiveFilters ? ' (filtered)' : ''}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No jobs match your filters"
          message="Try removing a filter or searching for a different keyword."
        />
      ) : (
        <div className="grid grid--cards">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} showMatch onViewDetails={setActiveJob} />
          ))}
        </div>
      )}

      {activeJob && <JobDetailModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </div>
  );
}
