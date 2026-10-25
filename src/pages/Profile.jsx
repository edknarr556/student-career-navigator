import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { EMPLOYMENT_TYPES } from '../data/jobs.js';
import demoProfile, { ACADEMIC_YEARS } from '../data/demoProfile.js';

// Split a comma / newline separated string into a clean array.
function parseList(str) {
  return str
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Profile() {
  const { profile, updateProfile } = useApp();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: profile.name || '',
    university: profile.university || '',
    major: profile.major || '',
    graduationYear: profile.graduationYear || '',
    academicYear: profile.academicYear || '',
    skills: (profile.skills || []).join(', '),
    interests: (profile.interests || []).join(', '),
    experience: profile.experience || '',
    preferredLocation: profile.preferredLocation || '',
    preferredType: profile.preferredType || 'Internship',
  });
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.major.trim()) next.major = 'Major is required.';
    const year = form.graduationYear.trim();
    if (year) {
      const n = Number(year);
      if (!/^\d{4}$/.test(year) || n < 1950 || n > 2100) {
        next.graduationYear = 'Enter a valid 4-digit year (e.g. 2028).';
      }
    }
    if (parseList(form.skills).length === 0) {
      next.skills = 'Add at least one skill so we can recommend jobs.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the highlighted fields.', 'info');
      return;
    }
    updateProfile({
      // Preserve any existing fields not shown in this form.
      ...profile,
      name: form.name.trim(),
      university: form.university.trim(),
      major: form.major.trim(),
      graduationYear: form.graduationYear.trim(),
      academicYear: form.academicYear,
      skills: parseList(form.skills),
      interests: parseList(form.interests),
      experience: form.experience.trim(),
      preferredLocation: form.preferredLocation.trim(),
      preferredType: form.preferredType,
    });
    showToast('Profile saved successfully', 'success');
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: profile.name || '',
      university: profile.university || '',
      major: profile.major || '',
      graduationYear: profile.graduationYear || '',
      academicYear: profile.academicYear || '',
      skills: (profile.skills || []).join(', '),
      interests: (profile.interests || []).join(', '),
      experience: profile.experience || '',
      preferredLocation: profile.preferredLocation || '',
      preferredType: profile.preferredType || 'Internship',
    });
    setErrors({});
    setEditing(false);
  };

  const loadDemo = () => {
    setForm({
      name: demoProfile.name,
      university: demoProfile.university,
      major: demoProfile.major,
      graduationYear: demoProfile.graduationYear,
      academicYear: demoProfile.academicYear,
      skills: demoProfile.skills.join(', '),
      interests: demoProfile.interests.join(', '),
      experience: demoProfile.experience,
      preferredLocation: demoProfile.preferredLocation,
      preferredType: demoProfile.preferredType,
    });
    setErrors({});
    showToast('Loaded demo student details — click Save to apply.', 'info');
  };

  // --- Read-only view ---
  if (!editing) {
    return (
      <div className="page">
        <div className="page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1>My Profile 👤</h1>
            <p>This information powers your dashboard and job recommendations.</p>
          </div>
          <button className="btn btn--primary" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>

        <div className="panel">
          <div className="form-grid">
            <ReadRow label="Name" value={profile.name} />
            <ReadRow label="University" value={profile.university} />
            <ReadRow label="Major" value={profile.major} />
            <ReadRow label="Academic Year" value={profile.academicYear} />
            <ReadRow label="Graduation Year" value={profile.graduationYear} />
            <ReadRow label="Preferred Job Location" value={profile.preferredLocation} />
            <ReadRow label="Preferred Job Type" value={profile.preferredType} />
          </div>

          <div className="section-title">Skills</div>
          <div className="chips">
            {(profile.skills || []).length
              ? profile.skills.map((s) => <span key={s} className="chip">{s}</span>)
              : <span style={{ color: 'var(--gray-400)' }}>No skills added yet.</span>}
          </div>

          <div className="section-title">Career Interests</div>
          <div className="chips">
            {(profile.interests || []).length
              ? profile.interests.map((s) => <span key={s} className="chip">{s}</span>)
              : <span style={{ color: 'var(--gray-400)' }}>No interests added yet.</span>}
          </div>

          <div className="section-title">Previous Experience</div>
          <p style={{ marginTop: 0 }}>
            {profile.experience
              ? profile.experience
              : <span style={{ color: 'var(--gray-400)' }}>No previous experience added yet.</span>}
          </p>
        </div>
      </div>
    );
  }

  // --- Edit form ---
  return (
    <div className="page">
      <div className="page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1>Edit Profile ✏️</h1>
          <p>Separate skills and interests with commas.</p>
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={loadDemo}>
          Load demo student
        </button>
      </div>

      <form className="panel" onSubmit={handleSave} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              className={`input ${errors.name ? 'input--error' : ''}`}
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
            />
            {errors.name && <div className="field__error">{errors.name}</div>}
          </div>

          <div className="field">
            <label htmlFor="university">University</label>
            <input
              id="university"
              className="input"
              value={form.university}
              onChange={(e) => setField('university', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="major">Major *</label>
            <input
              id="major"
              className={`input ${errors.major ? 'input--error' : ''}`}
              value={form.major}
              onChange={(e) => setField('major', e.target.value)}
            />
            {errors.major && <div className="field__error">{errors.major}</div>}
          </div>

          <div className="field">
            <label htmlFor="academicYear">Academic Year</label>
            <select
              id="academicYear"
              className="select"
              value={form.academicYear}
              onChange={(e) => setField('academicYear', e.target.value)}
            >
              <option value="">— Select —</option>
              {ACADEMIC_YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="grad">Graduation Year</label>
            <input
              id="grad"
              className={`input ${errors.graduationYear ? 'input--error' : ''}`}
              value={form.graduationYear}
              onChange={(e) => setField('graduationYear', e.target.value)}
              placeholder="2028"
            />
            {errors.graduationYear && <div className="field__error">{errors.graduationYear}</div>}
          </div>

          <div className="field">
            <label htmlFor="loc">Preferred Job Location</label>
            <input
              id="loc"
              className="input"
              value={form.preferredLocation}
              onChange={(e) => setField('preferredLocation', e.target.value)}
              placeholder="Pennsylvania or Remote"
            />
          </div>

          <div className="field">
            <label htmlFor="ptype">Preferred Job Type</label>
            <select
              id="ptype"
              className="select"
              value={form.preferredType}
              onChange={(e) => setField('preferredType', e.target.value)}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="skills">
            Skills * <span className="hint">(comma separated)</span>
          </label>
          <textarea
            id="skills"
            className={`textarea ${errors.skills ? 'input--error' : ''}`}
            value={form.skills}
            onChange={(e) => setField('skills', e.target.value)}
            placeholder="SQL, Java, Troubleshooting, Project Management"
          />
          {errors.skills && <div className="field__error">{errors.skills}</div>}
        </div>

        <div className="field">
          <label htmlFor="interests">
            Career Interests <span className="hint">(comma separated)</span>
          </label>
          <textarea
            id="interests"
            className="textarea"
            value={form.interests}
            onChange={(e) => setField('interests', e.target.value)}
            placeholder="IT Management, Business Technology, Systems Administration"
          />
        </div>

        <div className="field">
          <label htmlFor="experience">
            Previous Experience{' '}
            <span className="hint">(jobs, internships, or projects — mentioning skills here improves matches)</span>
          </label>
          <textarea
            id="experience"
            className="textarea"
            value={form.experience}
            onChange={(e) => setField('experience', e.target.value)}
            placeholder="e.g. Help desk volunteer at campus IT center; built an inventory app with SQL and Java."
          />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn--primary">Save Profile</button>
          <button type="button" className="btn btn--ghost" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function ReadRow({ label, value }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div style={{ fontSize: '0.98rem' }}>
        {value ? value : <span style={{ color: 'var(--gray-400)' }}>Not set</span>}
      </div>
    </div>
  );
}
