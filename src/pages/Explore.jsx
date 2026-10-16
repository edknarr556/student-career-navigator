import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import careerFields from '../data/careerFields.js';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('field') || careerFields[0].id;
  const [selectedId, setSelectedId] = useState(initial);

  // Keep selection in sync if the URL changes (e.g. from a dashboard link).
  useEffect(() => {
    const fromUrl = searchParams.get('field');
    if (fromUrl && fromUrl !== selectedId) setSelectedId(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const selected = careerFields.find((f) => f.id === selectedId) || careerFields[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    setSearchParams({ field: id });
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1>Career Exploration 🧭</h1>
        <p>Choose a field to learn about roles, skills, education, and career paths.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 300px) 1fr', gap: '1.25rem', alignItems: 'start' }} className="explore-grid">
        {/* Field list */}
        <div className="grid" style={{ gap: '0.6rem' }}>
          {careerFields.map((f) => (
            <button
              key={f.id}
              className={`card field-card ${f.id === selectedId ? 'selected' : ''}`}
              onClick={() => handleSelect(f.id)}
              style={{ textAlign: 'left', border: f.id === selectedId ? undefined : '1px solid var(--gray-200)', borderLeft: f.id === selectedId ? '4px solid var(--green-600)' : '4px solid var(--blue-700)', cursor: 'pointer', background: 'var(--white)', padding: '0.9rem 1rem' }}
            >
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{f.name}</h3>
            </button>
          ))}
        </div>

        {/* Field detail */}
        <div className="panel">
          <h2>{selected.name}</h2>
          <p style={{ color: 'var(--gray-800)' }}>{selected.description}</p>

          <div className="section-title">Common Job Titles</div>
          <ul className="detail-list">
            {selected.commonTitles.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="section-title">Skills Needed</div>
          <div className="chips">
            {selected.skills.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>

          <div className="section-title">Typical Education Requirements</div>
          <p style={{ marginTop: 0 }}>{selected.education}</p>

          <div className="section-title">Potential Career Paths</div>
          <ul className="detail-list">
            {selected.paths.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
