// Default demo student profile used to seed the app on first run so the
// prototype is immediately demonstrable in a classroom setting.

const demoProfile = {
  name: 'Demo Student',
  university: 'Penn State University',
  major: 'Enterprise Technology Integration',
  graduationYear: '2028',
  // Academic year (class standing). Used by the edit form and recommendations.
  academicYear: 'Sophomore',
  skills: ['Information Technology', 'SQL', 'Java', 'Troubleshooting', 'Project Management'],
  interests: ['IT Management', 'Business Technology', 'Systems Administration'],
  // Free-text summary of prior jobs, internships, or projects. The matching
  // logic scans this text for skill keywords, so it genuinely affects results.
  experience:
    'Help desk volunteer at campus IT center; built a small inventory app with SQL and Java for a class project.',
  preferredLocation: 'Pennsylvania or Remote',
  preferredType: 'Internship',
};

export const ACADEMIC_YEARS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate',
];

export default demoProfile;
