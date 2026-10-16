// Realistic sample job listings for the Student Career Navigator prototype.
// Each listing is self-contained so the app can run entirely offline using
// browser local storage — no external APIs or databases are required.

export const EMPLOYMENT_TYPES = [
  'Internship',
  'Part-time',
  'Full-time',
  'Remote',
];

export const CAREER_FIELDS = [
  'Information Technology',
  'Software Development',
  'Cybersecurity',
  'Business',
  'Finance',
  'Marketing',
  'Data Analytics',
];

const jobs = [
  {
    id: 'job-001',
    title: 'IT Support Internship',
    company: 'Keystone Technologies',
    location: 'Harrisburg, PA',
    employmentType: 'Internship',
    field: 'Information Technology',
    pay: '$20/hour',
    deadline: '2026-11-30',
    skills: ['Troubleshooting', 'Networking', 'Customer Service', 'Windows'],
    description:
      'Support the internal help desk by diagnosing hardware and software issues, imaging workstations, and documenting resolutions. A great entry point for students exploring IT operations.',
  },
  {
    id: 'job-002',
    title: 'Junior Systems Administrator',
    company: 'Nittany Cloud Solutions',
    location: 'State College, PA',
    employmentType: 'Full-time',
    field: 'Information Technology',
    pay: '$58,000/year',
    deadline: '2026-12-15',
    skills: ['Linux', 'Networking', 'Project Management', 'Troubleshooting'],
    description:
      'Maintain servers, manage user accounts, and automate routine maintenance tasks. Work alongside senior administrators to keep client infrastructure running smoothly.',
  },
  {
    id: 'job-003',
    title: 'Software Engineering Intern',
    company: 'BlueRiver Labs',
    location: 'Remote',
    employmentType: 'Remote',
    field: 'Software Development',
    pay: '$28/hour',
    deadline: '2026-11-20',
    skills: ['Java', 'JavaScript', 'Git', 'Problem Solving'],
    description:
      'Join an agile team building web features in React and Java. You will write code, participate in code reviews, and ship real functionality used by customers.',
  },
  {
    id: 'job-004',
    title: 'Frontend Developer (Entry-Level)',
    company: 'Pixel Forge Studio',
    location: 'Philadelphia, PA',
    employmentType: 'Full-time',
    field: 'Software Development',
    pay: '$65,000/year',
    deadline: '2026-12-05',
    skills: ['JavaScript', 'React', 'HTML', 'CSS'],
    description:
      'Build responsive, accessible user interfaces for client web applications. Collaborate with designers to turn mockups into polished, interactive experiences.',
  },
  {
    id: 'job-005',
    title: 'Business Analyst Intern',
    company: 'Summit Business Group',
    location: 'Pittsburgh, PA',
    employmentType: 'Internship',
    field: 'Business',
    pay: '$22/hour',
    deadline: '2026-11-28',
    skills: ['Project Management', 'Communication', 'Excel', 'SQL'],
    description:
      'Assist in gathering requirements, mapping business processes, and preparing reports for stakeholders. Ideal for students interested in bridging business and technology.',
  },
  {
    id: 'job-006',
    title: 'Financial Analyst Trainee',
    company: 'Liberty Financial Partners',
    location: 'New York, NY',
    employmentType: 'Full-time',
    field: 'Finance',
    pay: '$62,000/year',
    deadline: '2026-12-10',
    skills: ['Excel', 'Financial Modeling', 'Analytics', 'Communication'],
    description:
      'Support senior analysts with forecasting, budgeting, and variance analysis. Build financial models and present findings to the finance leadership team.',
  },
  {
    id: 'job-007',
    title: 'Marketing Coordinator (Part-time)',
    company: 'BrightPath Media',
    location: 'Remote',
    employmentType: 'Part-time',
    field: 'Marketing',
    pay: '$19/hour',
    deadline: '2026-11-25',
    skills: ['Social Media', 'Content Creation', 'Communication', 'SEO'],
    description:
      'Plan and schedule social media content, write short blog posts, and track campaign engagement. Flexible hours that fit around a class schedule.',
  },
  {
    id: 'job-008',
    title: 'Data Analytics Intern',
    company: 'Insight Metrics Co.',
    location: 'Remote',
    employmentType: 'Internship',
    field: 'Data Analytics',
    pay: '$24/hour',
    deadline: '2026-12-01',
    skills: ['SQL', 'Python', 'Data Visualization', 'Analytics'],
    description:
      'Clean datasets, build dashboards, and surface insights that drive product decisions. You will work with SQL and visualization tools on real business data.',
  },
  {
    id: 'job-009',
    title: 'Cybersecurity Analyst Intern',
    company: 'Fortress Security Group',
    location: 'Arlington, VA',
    employmentType: 'Internship',
    field: 'Cybersecurity',
    pay: '$26/hour',
    deadline: '2026-12-08',
    skills: ['Networking', 'Security', 'Troubleshooting', 'Linux'],
    description:
      'Monitor security alerts, assist with vulnerability scans, and document incident response procedures. Learn hands-on defensive security practices.',
  },
  {
    id: 'job-010',
    title: 'IT Project Management Intern',
    company: 'Horizon Enterprise Systems',
    location: 'Remote',
    employmentType: 'Remote',
    field: 'Information Technology',
    pay: '$23/hour',
    deadline: '2026-11-27',
    skills: ['Project Management', 'Communication', 'SQL', 'Troubleshooting'],
    description:
      'Coordinate IT project tasks, track milestones, and keep documentation up to date. Perfect for students interested in IT management and systems integration.',
  },
  {
    id: 'job-011',
    title: 'Junior Database Developer',
    company: 'DataBridge Analytics',
    location: 'Columbus, OH',
    employmentType: 'Full-time',
    field: 'Data Analytics',
    pay: '$60,000/year',
    deadline: '2026-12-12',
    skills: ['SQL', 'Database Design', 'Python', 'Analytics'],
    description:
      'Design and optimize relational database schemas, write queries, and support reporting pipelines for enterprise clients.',
  },
  {
    id: 'job-012',
    title: 'Business Technology Associate',
    company: 'Commonwealth Consulting',
    location: 'Harrisburg, PA',
    employmentType: 'Full-time',
    field: 'Business',
    pay: '$56,000/year',
    deadline: '2026-12-18',
    skills: ['Project Management', 'SQL', 'Communication', 'Troubleshooting'],
    description:
      'Act as a liaison between business units and IT teams, translating business needs into technical requirements and helping deploy enterprise software solutions.',
  },
  {
    id: 'job-013',
    title: 'Full-Stack Developer Intern',
    company: 'CodeCrest Technologies',
    location: 'Austin, TX',
    employmentType: 'Internship',
    field: 'Software Development',
    pay: '$30/hour',
    deadline: '2026-12-03',
    skills: ['Java', 'JavaScript', 'React', 'SQL'],
    description:
      'Work across the stack building APIs and UI features. You will pair with mentors and contribute to production code throughout the internship.',
  },
  {
    id: 'job-014',
    title: 'Digital Marketing Intern',
    company: 'Vista Growth Agency',
    location: 'Chicago, IL',
    employmentType: 'Internship',
    field: 'Marketing',
    pay: '$18/hour',
    deadline: '2026-11-29',
    skills: ['SEO', 'Analytics', 'Content Creation', 'Communication'],
    description:
      'Assist with paid and organic campaigns, analyze performance data, and help optimize landing pages for conversion.',
  },
  {
    id: 'job-015',
    title: 'Accounting & Finance Intern',
    company: 'Keystone Capital Advisors',
    location: 'Philadelphia, PA',
    employmentType: 'Internship',
    field: 'Finance',
    pay: '$21/hour',
    deadline: '2026-12-06',
    skills: ['Excel', 'Analytics', 'Communication', 'Financial Modeling'],
    description:
      'Reconcile accounts, prepare financial statements, and support the finance team during month-end close. A strong foundation for a finance career.',
  },
];

export default jobs;
