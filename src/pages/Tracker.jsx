import { useMemo, useState } from 'react';
import jobs from '../data/jobs.js';
import { useApp, APPLICATION_STATUSES } from '../context/AppContext.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';

const jobMap = Object.fromEntries(jobs.map((j) => [j.id, j]));

export default function Tracker() {
  const { applications, savedJobIds, addApplication, updateApplication, removeApplication } = useApp();
  const { showToast } = useToast();
  const [addSelection, setAddSelection] = useState('');

  // Jobs that are saved or on the dataset but not yet tracked — candidates to add.
  const addableJobs = useMemo(() => {
    const tracked = new Set(applications.map((a) => a.jobId));
    const savedFirst = [...jobs].sort((a, b) => {
      const aSaved = savedJobIds.includes(a.id) ? 0 : 1;
      const bSaved = savedJobIds.includes(b.id) ? 0 : 1;
      return aSaved - bSaved;
    });
    return savedFirst.filter((j) => !tracked.has(j.id));
  }, [applications, savedJobIds]);

  const handleAdd = () => {
    if (!addSelection) {
      showToast('Please pick a job to add first.', 'info');
      return;
    }
    addApplication(addSelection, 'Interested');
    const job = jobMap[addSelection];
    showToast(`Added "${job?.title}" to your tracker`, 'success');
    setAddSelection('');
  };

  const handleStatusChange = (app, status) => {
    const updates = { status };
    // Auto-fill applied date the first time it moves to "Applied".
    if (status === 'Applied' && !app.appliedDate) {
      updates.appliedDate = new Date().toISOString().slice(0, 10);
    }
    updateApplication(app.id, updates);
    showToast('Status updated', 'info');
  };

  const handleRemove = (app) => {
    const job = jobMap[app.jobId];
    removeApplication(app.id);
    showToast(`Removed "${job?.title}" from tracker`, 'info');
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1>Application Tracker 📋</h1>
        <p>Track every opportunity from interest to offer. Everything saves to your browser.</p>
      </div>

      {/* Add to tracker */}
      <div className="panel" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>Add a job to your tracker</h3>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="field" style={{ margin: 0, flex: '1 1 320px' }}>
            <label htmlFor="add-job">Choose a job (saved jobs listed first)</label>
            <select
              id="add-job"
              className="select"
              value={addSelection}
              onChange={(e) => setAddSelection(e.target.value)}
            >
              <option value="">— Select a job —</option>
              {addableJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {savedJobIds.includes(j.id) ? '★ ' : ''}
                  {j.title} — {j.company}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn--primary" onClick={handleAdd} disabled={addableJobs.length === 0}>
            + Add to Tracker
          </button>
        </div>
        {addableJobs.length === 0 && (
          <p style={{ color: 'var(--gray-600)', marginBottom: 0, marginTop: '0.5rem' }}>
            All jobs are already in your tracker.
          </p>
        )}
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No applications tracked yet"
          message="Add a job above, or hit Apply on any listing to start tracking it here."
          actionLabel="Find Jobs"
          actionTo="/jobs"
        />
      ) : (
        <div className="panel table-wrap">
          <table className="tracker">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const job = jobMap[app.jobId];
                return (
                  <tr key={app.id}>
                    <td>
                      <strong>{job?.title || 'Unknown job'}</strong>
                      <div style={{ color: 'var(--gray-600)', fontSize: '0.84rem' }}>
                        {job?.company} · {job?.location}
                      </div>
                      <div style={{ marginTop: '0.3rem' }}>
                        <StatusBadge status={app.status} />
                      </div>
                    </td>
                    <td>
                      <select
                        className="select"
                        value={app.status}
                        onChange={(e) => handleStatusChange(app, e.target.value)}
                        style={{ minWidth: '160px' }}
                      >
                        {APPLICATION_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="input"
                        value={app.appliedDate || ''}
                        onChange={(e) => updateApplication(app.id, { appliedDate: e.target.value })}
                        style={{ minWidth: '150px' }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="textarea"
                        placeholder="Add personal notes…"
                        value={app.notes || ''}
                        onChange={(e) => updateApplication(app.id, { notes: e.target.value })}
                        style={{ minWidth: '180px', minHeight: '60px' }}
                      />
                    </td>
                    <td>
                      <button className="btn btn--danger btn--sm" onClick={() => handleRemove(app)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
