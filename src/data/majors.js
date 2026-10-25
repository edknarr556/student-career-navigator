// Supported college majors for the Student Career Navigator profile editor
// and recommendation system.
//
// Each major maps to one or more career "fields" used by the job dataset, plus
// a set of representative skills. The matching algorithm uses this mapping so
// that changing the major genuinely re-ranks recommendations toward jobs tagged
// for that major — while still letting a student's individual skills/interests
// surface relevant cross-disciplinary jobs.
//
// This list is additive: all previously supported majors remain, and Psychology
// is included as an additional supported major (not a replacement).

export const MAJORS = [
  'Business',
  'English',
  'Information Technology',
  'Healthcare',
  'Education',
  'Engineering',
  'Communications',
  'Psychology',
  // Previously seeded majors kept for backward compatibility.
  'Software Development',
  'Finance',
  'Marketing',
  'Data Analytics',
  'Cybersecurity',
  'Enterprise Technology Integration',
];

// major -> list of job "fields" that major relates to most directly.
// A job is considered a strong major match when its `majors` tag (or `field`)
// intersects this list.
export const MAJOR_FIELD_MAP = {
  Business: ['Business', 'Finance', 'Marketing', 'Communications'],
  English: ['English', 'Communications', 'Education'],
  'Information Technology': ['Information Technology', 'Software Development', 'Data Analytics', 'Cybersecurity'],
  Healthcare: ['Healthcare', 'Psychology'],
  Education: ['Education', 'English', 'Psychology'],
  Engineering: ['Engineering', 'Information Technology', 'Software Development'],
  Communications: ['Communications', 'Marketing', 'English'],
  Psychology: ['Psychology', 'Healthcare', 'Education'],
  // Backward-compatible majors.
  'Software Development': ['Software Development', 'Information Technology'],
  Finance: ['Finance', 'Business', 'Data Analytics'],
  Marketing: ['Marketing', 'Communications', 'Business'],
  'Data Analytics': ['Data Analytics', 'Information Technology', 'Finance'],
  Cybersecurity: ['Cybersecurity', 'Information Technology'],
  'Enterprise Technology Integration': ['Information Technology', 'Business', 'Data Analytics'],
};

// Representative skills per major — used only as a gentle fallback signal when a
// student hasn't listed many of their own skills, so the major still nudges the
// ranking. The student's own listed skills always take priority.
export const MAJOR_SKILLS = {
  Business: ['Communication', 'Project Management', 'Excel', 'Leadership'],
  English: ['Writing', 'Editing', 'Research', 'Communication'],
  'Information Technology': ['Troubleshooting', 'Networking', 'SQL', 'Customer Service'],
  Healthcare: ['Patient Care', 'Communication', 'Medical Terminology', 'Attention to Detail'],
  Education: ['Communication', 'Lesson Planning', 'Classroom Management', 'Mentoring'],
  Engineering: ['Problem Solving', 'CAD', 'Mathematics', 'Project Management'],
  Communications: ['Writing', 'Public Speaking', 'Social Media', 'Communication'],
  Psychology: ['Research', 'Communication', 'Statistics', 'Behavioral Observation', 'Interpersonal Skills'],
  'Software Development': ['JavaScript', 'Java', 'Git', 'Problem Solving'],
  Finance: ['Excel', 'Financial Modeling', 'Analytics', 'Attention to Detail'],
  Marketing: ['SEO', 'Content Creation', 'Social Media', 'Communication'],
  'Data Analytics': ['SQL', 'Python', 'Data Visualization', 'Analytics'],
  Cybersecurity: ['Networking', 'Security', 'Linux', 'Troubleshooting'],
  'Enterprise Technology Integration': ['SQL', 'Project Management', 'Troubleshooting', 'Communication'],
};
