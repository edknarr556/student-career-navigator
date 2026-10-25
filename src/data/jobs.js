// Simulated job listings for the Student Career Navigator prototype.
//
// IMPORTANT (university research prototype): this is a FIXED, SIMULATED dataset.
// Every company and position below is FICTIONAL and for demonstration only —
// none are real job openings. The UI labels them as simulated opportunities.
// Recommendations are produced by filtering/ranking this dataset against the
// participant's profile (see src/utils/matching.js) — no live AI service or
// external API is called, so there are no credentials to manage.
//
// Each listing has:
//   title, company (fictional), location, employmentType, field,
//   majors   -> which college majors the role relates to (tags),
//   skills   -> required/relevant skills (used for matching),
//   qualifications -> plain-English requirements shown to the student,
//   description, pay (optional), deadline,
//   requiresGradDegreeOrLicense -> true if NOT immediately eligible for an
//       undergraduate (grad degree or professional license required). These are
//       down-ranked and flagged rather than recommended as immediately eligible.

export const IS_DEMO_DATA = true;

export const EMPLOYMENT_TYPES = ['Internship', 'Part-time', 'Full-time', 'Remote'];

export const CAREER_FIELDS = [
  'Information Technology',
  'Software Development',
  'Cybersecurity',
  'Business',
  'Finance',
  'Marketing',
  'Data Analytics',
  'English',
  'Healthcare',
  'Education',
  'Engineering',
  'Communications',
  'Psychology',
];

// Small helper to keep every record consistent and default-safe.
function job(data) {
  return {
    simulated: true,
    requiresGradDegreeOrLicense: false,
    qualifications: [],
    majors: [],
    ...data,
  };
}

const jobs = [
  // ============================================================
  // ORIGINAL 15 LISTINGS (preserved; tags added for new matching)
  // ============================================================
  job({
    id: 'job-001', title: 'IT Support Internship', company: 'Keystone Technologies (fictional)',
    location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Information Technology',
    majors: ['Information Technology'], pay: '$20/hour', deadline: '2026-11-30',
    skills: ['Troubleshooting', 'Networking', 'Customer Service', 'Windows'],
    qualifications: ['Current student', 'Basic PC hardware knowledge', 'Strong communication'],
    description: 'Support the internal help desk by diagnosing hardware and software issues, imaging workstations, and documenting resolutions. A great entry point for students exploring IT operations.',
  }),
  job({
    id: 'job-002', title: 'Junior Systems Administrator', company: 'Nittany Cloud Solutions (fictional)',
    location: 'State College, PA', employmentType: 'Full-time', field: 'Information Technology',
    majors: ['Information Technology'], pay: '$58,000/year', deadline: '2026-12-15',
    skills: ['Linux', 'Networking', 'Project Management', 'Troubleshooting'],
    qualifications: ['Associate or Bachelor in IT', 'Familiarity with Linux'],
    description: 'Maintain servers, manage user accounts, and automate routine maintenance tasks. Work alongside senior administrators to keep client infrastructure running smoothly.',
  }),
  job({
    id: 'job-003', title: 'Software Engineering Intern', company: 'BlueRiver Labs (fictional)',
    location: 'Remote', employmentType: 'Remote', field: 'Software Development',
    majors: ['Software Development', 'Information Technology', 'Engineering'], pay: '$28/hour', deadline: '2026-11-20',
    skills: ['Java', 'JavaScript', 'Git', 'Problem Solving'],
    qualifications: ['Coursework in programming', 'Comfort with Git'],
    description: 'Join an agile team building web features in React and Java. You will write code, participate in code reviews, and ship real functionality used by customers.',
  }),
  job({
    id: 'job-004', title: 'Frontend Developer (Entry-Level)', company: 'Pixel Forge Studio (fictional)',
    location: 'Philadelphia, PA', employmentType: 'Full-time', field: 'Software Development',
    majors: ['Software Development', 'Information Technology'], pay: '$65,000/year', deadline: '2026-12-05',
    skills: ['JavaScript', 'React', 'HTML', 'CSS'],
    qualifications: ['Portfolio of web projects', 'HTML/CSS/JS fluency'],
    description: 'Build responsive, accessible user interfaces for client web applications. Collaborate with designers to turn mockups into polished, interactive experiences.',
  }),
  job({
    id: 'job-005', title: 'Business Analyst Intern', company: 'Summit Business Group (fictional)',
    location: 'Pittsburgh, PA', employmentType: 'Internship', field: 'Business',
    majors: ['Business', 'Information Technology'], pay: '$22/hour', deadline: '2026-11-28',
    skills: ['Project Management', 'Communication', 'Excel', 'SQL'],
    qualifications: ['Current student', 'Strong Excel skills'],
    description: 'Assist in gathering requirements, mapping business processes, and preparing reports for stakeholders. Ideal for students interested in bridging business and technology.',
  }),
  job({
    id: 'job-006', title: 'Financial Analyst Trainee', company: 'Liberty Financial Partners (fictional)',
    location: 'New York, NY', employmentType: 'Full-time', field: 'Finance',
    majors: ['Finance', 'Business'], pay: '$62,000/year', deadline: '2026-12-10',
    skills: ['Excel', 'Financial Modeling', 'Analytics', 'Communication'],
    qualifications: ['Bachelor in Finance/Economics', 'Excel proficiency'],
    description: 'Support senior analysts with forecasting, budgeting, and variance analysis. Build financial models and present findings to the finance leadership team.',
  }),
  job({
    id: 'job-007', title: 'Marketing Coordinator (Part-time)', company: 'BrightPath Media (fictional)',
    location: 'Remote', employmentType: 'Part-time', field: 'Marketing',
    majors: ['Marketing', 'Communications', 'Business'], pay: '$19/hour', deadline: '2026-11-25',
    skills: ['Social Media', 'Content Creation', 'Communication', 'SEO'],
    qualifications: ['Current student', 'Social media familiarity'],
    description: 'Plan and schedule social media content, write short blog posts, and track campaign engagement. Flexible hours that fit around a class schedule.',
  }),
  job({
    id: 'job-008', title: 'Data Analytics Intern', company: 'Insight Metrics Co. (fictional)',
    location: 'Remote', employmentType: 'Internship', field: 'Data Analytics',
    majors: ['Data Analytics', 'Information Technology', 'Business'], pay: '$24/hour', deadline: '2026-12-01',
    skills: ['SQL', 'Python', 'Data Visualization', 'Analytics'],
    qualifications: ['Coursework in statistics or data', 'SQL basics'],
    description: 'Clean datasets, build dashboards, and surface insights that drive product decisions. You will work with SQL and visualization tools on real business data.',
  }),
  job({
    id: 'job-009', title: 'Cybersecurity Analyst Intern', company: 'Fortress Security Group (fictional)',
    location: 'Arlington, VA', employmentType: 'Internship', field: 'Cybersecurity',
    majors: ['Cybersecurity', 'Information Technology'], pay: '$26/hour', deadline: '2026-12-08',
    skills: ['Networking', 'Security', 'Troubleshooting', 'Linux'],
    qualifications: ['Current student', 'Networking fundamentals'],
    description: 'Monitor security alerts, assist with vulnerability scans, and document incident response procedures. Learn hands-on defensive security practices.',
  }),
  job({
    id: 'job-010', title: 'IT Project Management Intern', company: 'Horizon Enterprise Systems (fictional)',
    location: 'Remote', employmentType: 'Remote', field: 'Information Technology',
    majors: ['Information Technology', 'Business'], pay: '$23/hour', deadline: '2026-11-27',
    skills: ['Project Management', 'Communication', 'SQL', 'Troubleshooting'],
    qualifications: ['Current student', 'Organized and detail-oriented'],
    description: 'Coordinate IT project tasks, track milestones, and keep documentation up to date. Perfect for students interested in IT management and systems integration.',
  }),
  job({
    id: 'job-011', title: 'Junior Database Developer', company: 'DataBridge Analytics (fictional)',
    location: 'Columbus, OH', employmentType: 'Full-time', field: 'Data Analytics',
    majors: ['Data Analytics', 'Information Technology'], pay: '$60,000/year', deadline: '2026-12-12',
    skills: ['SQL', 'Database Design', 'Python', 'Analytics'],
    qualifications: ['Bachelor in CS/IS or related', 'Strong SQL'],
    description: 'Design and optimize relational database schemas, write queries, and support reporting pipelines for enterprise clients.',
  }),
  job({
    id: 'job-012', title: 'Business Technology Associate', company: 'Commonwealth Consulting (fictional)',
    location: 'Harrisburg, PA', employmentType: 'Full-time', field: 'Business',
    majors: ['Business', 'Information Technology'], pay: '$56,000/year', deadline: '2026-12-18',
    skills: ['Project Management', 'SQL', 'Communication', 'Troubleshooting'],
    qualifications: ['Bachelor degree', 'Comfort bridging business and IT'],
    description: 'Act as a liaison between business units and IT teams, translating business needs into technical requirements and helping deploy enterprise software solutions.',
  }),
  job({
    id: 'job-013', title: 'Full-Stack Developer Intern', company: 'CodeCrest Technologies (fictional)',
    location: 'Austin, TX', employmentType: 'Internship', field: 'Software Development',
    majors: ['Software Development', 'Information Technology', 'Engineering'], pay: '$30/hour', deadline: '2026-12-03',
    skills: ['Java', 'JavaScript', 'React', 'SQL'],
    qualifications: ['Programming coursework', 'Some web project experience'],
    description: 'Work across the stack building APIs and UI features. You will pair with mentors and contribute to production code throughout the internship.',
  }),
  job({
    id: 'job-014', title: 'Digital Marketing Intern', company: 'Vista Growth Agency (fictional)',
    location: 'Chicago, IL', employmentType: 'Internship', field: 'Marketing',
    majors: ['Marketing', 'Communications'], pay: '$18/hour', deadline: '2026-11-29',
    skills: ['SEO', 'Analytics', 'Content Creation', 'Communication'],
    qualifications: ['Current student', 'Interest in digital campaigns'],
    description: 'Assist with paid and organic campaigns, analyze performance data, and help optimize landing pages for conversion.',
  }),
  job({
    id: 'job-015', title: 'Accounting & Finance Intern', company: 'Keystone Capital Advisors (fictional)',
    location: 'Philadelphia, PA', employmentType: 'Internship', field: 'Finance',
    majors: ['Finance', 'Business'], pay: '$21/hour', deadline: '2026-12-06',
    skills: ['Excel', 'Analytics', 'Communication', 'Financial Modeling'],
    qualifications: ['Current student', 'Attention to detail'],
    description: 'Reconcile accounts, prepare financial statements, and support the finance team during month-end close. A strong foundation for a finance career.',
  }),

  // ============================================================
  // BUSINESS (10)
  // ============================================================
  job({ id: 'bus-01', title: 'Operations Intern', company: 'Cornerstone Retail Group (fictional)', location: 'Pittsburgh, PA', employmentType: 'Internship', field: 'Business', majors: ['Business'], pay: '$20/hour', deadline: '2026-12-10', skills: ['Communication', 'Excel', 'Project Management', 'Problem Solving'], qualifications: ['Current student', 'Organized'], description: 'Support daily operations: track inventory, coordinate vendors, and help streamline store processes.' }),
  job({ id: 'bus-02', title: 'Sales Development Representative', company: 'Apex Solutions (fictional)', location: 'Remote', employmentType: 'Full-time', field: 'Business', majors: ['Business', 'Communications'], pay: '$45,000/year', deadline: '2026-12-15', skills: ['Communication', 'Negotiation', 'CRM', 'Interpersonal Skills'], qualifications: ['Bachelor degree', 'Strong verbal communication'], description: 'Qualify leads, book meetings, and build the top of the sales funnel for a growing B2B software company.' }),
  job({ id: 'bus-03', title: 'Human Resources Assistant', company: 'Meridian Enterprises (fictional)', location: 'Harrisburg, PA', employmentType: 'Part-time', field: 'Business', majors: ['Business', 'Psychology'], pay: '$18/hour', deadline: '2026-11-30', skills: ['Communication', 'Organization', 'Interpersonal Skills', 'Attention to Detail'], qualifications: ['Current student', 'Discretion with confidential info'], description: 'Help coordinate interviews, maintain employee records, and support onboarding logistics.' }),
  job({ id: 'bus-04', title: 'Supply Chain Intern', company: 'LogiCore Distribution (fictional)', location: 'Columbus, OH', employmentType: 'Internship', field: 'Business', majors: ['Business', 'Engineering'], pay: '$21/hour', deadline: '2026-12-05', skills: ['Excel', 'Analytics', 'Problem Solving', 'Project Management'], qualifications: ['Current student', 'Analytical mindset'], description: 'Analyze shipping data, help forecast demand, and support logistics coordination across warehouses.' }),
  job({ id: 'bus-05', title: 'Management Trainee', company: 'Summit Hospitality (fictional)', location: 'State College, PA', employmentType: 'Full-time', field: 'Business', majors: ['Business'], pay: '$48,000/year', deadline: '2026-12-20', skills: ['Leadership', 'Communication', 'Customer Service', 'Project Management'], qualifications: ['Bachelor degree', 'Willing to rotate departments'], description: 'A rotational program developing future managers across front-of-house, operations, and finance.' }),
  job({ id: 'bus-06', title: 'Small Business Consulting Intern', company: 'GrowthBridge Advisors (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Business', majors: ['Business', 'Finance'], pay: '$22/hour', deadline: '2026-12-12', skills: ['Excel', 'Communication', 'Analytics', 'Research'], qualifications: ['Current student', 'Interest in consulting'], description: 'Research markets, build simple financial projections, and prepare recommendations for small-business clients.' }),
  job({ id: 'bus-07', title: 'Procurement Assistant', company: 'Ironleaf Manufacturing (fictional)', location: 'Erie, PA', employmentType: 'Part-time', field: 'Business', majors: ['Business'], pay: '$17/hour', deadline: '2026-11-28', skills: ['Excel', 'Negotiation', 'Organization', 'Communication'], qualifications: ['Current student'], description: 'Process purchase orders, compare supplier quotes, and maintain the procurement tracker.' }),
  job({ id: 'bus-08', title: 'Project Coordinator Intern', company: 'BlueStone Partners (fictional)', location: 'Philadelphia, PA', employmentType: 'Internship', field: 'Business', majors: ['Business', 'Communications'], pay: '$20/hour', deadline: '2026-12-08', skills: ['Project Management', 'Communication', 'Organization', 'Excel'], qualifications: ['Current student', 'Detail-oriented'], description: 'Keep project schedules on track, take meeting notes, and coordinate between internal teams.' }),
  job({ id: 'bus-09', title: 'Entrepreneurship Program Intern', company: 'Launchpad Ventures (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Business', majors: ['Business'], pay: '$19/hour', deadline: '2026-12-14', skills: ['Research', 'Communication', 'Problem Solving', 'Content Creation'], qualifications: ['Current student', 'Self-starter'], description: 'Support early-stage founders with market research, pitch-deck review, and event logistics.' }),
  job({ id: 'bus-10', title: 'Retail Analytics Associate', company: 'MarketMosaic (fictional)', location: 'Chicago, IL', employmentType: 'Full-time', field: 'Business', majors: ['Business', 'Data Analytics'], pay: '$52,000/year', deadline: '2026-12-18', skills: ['Excel', 'Analytics', 'SQL', 'Communication'], qualifications: ['Bachelor degree', 'Comfort with data'], description: 'Turn sales and customer data into merchandising recommendations for regional retail teams.' }),

  // ============================================================
  // ENGLISH (10)
  // ============================================================
  job({ id: 'eng-01', title: 'Editorial Intern', company: 'Maple & Quill Publishing (fictional)', location: 'Remote', employmentType: 'Internship', field: 'English', majors: ['English', 'Communications'], pay: '$18/hour', deadline: '2026-12-05', skills: ['Writing', 'Editing', 'Proofreading', 'Communication'], qualifications: ['Current student', 'Strong writing sample'], description: 'Proofread manuscripts, fact-check articles, and draft back-cover copy for an independent publisher.' }),
  job({ id: 'eng-02', title: 'Content Writer', company: 'StoryForge Media (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'English', majors: ['English', 'Communications', 'Marketing'], pay: '$20/hour', deadline: '2026-12-10', skills: ['Writing', 'Editing', 'SEO', 'Research'], qualifications: ['Current student', 'Portfolio of writing'], description: 'Write blog posts and web copy on a flexible schedule, optimizing drafts for clarity and search.' }),
  job({ id: 'eng-03', title: 'Communications & Copy Intern', company: 'Lighthouse Nonprofit (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'English', majors: ['English', 'Communications'], pay: '$17/hour', deadline: '2026-11-30', skills: ['Writing', 'Communication', 'Social Media', 'Editing'], qualifications: ['Current student'], description: 'Draft newsletters, grant-letter language, and social posts for a community nonprofit.' }),
  job({ id: 'eng-04', title: 'Technical Writing Assistant', company: 'ClarityDocs (fictional)', location: 'Remote', employmentType: 'Internship', field: 'English', majors: ['English', 'Information Technology'], pay: '$21/hour', deadline: '2026-12-12', skills: ['Writing', 'Editing', 'Research', 'Attention to Detail'], qualifications: ['Current student', 'Interest in clear documentation'], description: 'Help turn complex product features into simple how-to guides and knowledge-base articles.' }),
  job({ id: 'eng-05', title: 'Library & Archives Intern', company: 'Rivertown Public Library (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'English', majors: ['English', 'Education'], pay: '$16/hour', deadline: '2026-12-01', skills: ['Research', 'Organization', 'Communication', 'Attention to Detail'], qualifications: ['Current student'], description: 'Catalog materials, assist patrons with research, and help run reading programs.' }),
  job({ id: 'eng-06', title: 'Junior Copy Editor', company: 'Northwind Review (fictional)', location: 'Remote', employmentType: 'Full-time', field: 'English', majors: ['English'], pay: '$44,000/year', deadline: '2026-12-16', skills: ['Editing', 'Proofreading', 'Writing', 'Attention to Detail'], qualifications: ['Bachelor in English or related', 'Grammar mastery'], description: 'Edit articles for style and accuracy, enforce the house style guide, and mentor contributors.' }),
  job({ id: 'eng-07', title: 'Social Media & Storytelling Intern', company: 'EverGreen Brands (fictional)', location: 'Remote', employmentType: 'Internship', field: 'English', majors: ['English', 'Communications', 'Marketing'], pay: '$18/hour', deadline: '2026-12-09', skills: ['Writing', 'Social Media', 'Content Creation', 'Communication'], qualifications: ['Current student'], description: 'Craft brand stories and captions, and help shape a consistent voice across channels.' }),
  job({ id: 'eng-08', title: 'Grant Writing Assistant', company: 'Open Doors Foundation (fictional)', location: 'Pittsburgh, PA', employmentType: 'Part-time', field: 'English', majors: ['English', 'Communications'], pay: '$19/hour', deadline: '2026-12-03', skills: ['Writing', 'Research', 'Editing', 'Communication'], qualifications: ['Current student', 'Persuasive writing'], description: 'Research funding opportunities and draft sections of grant proposals for a foundation.' }),
  job({ id: 'eng-09', title: 'Publishing Marketing Intern', company: 'Paperbird Press (fictional)', location: 'Remote', employmentType: 'Internship', field: 'English', majors: ['English', 'Marketing'], pay: '$18/hour', deadline: '2026-12-11', skills: ['Writing', 'Content Creation', 'Social Media', 'Communication'], qualifications: ['Current student'], description: 'Write author spotlights and promotional copy, and help plan book-launch campaigns.' }),
  job({ id: 'eng-10', title: 'Writing Center Peer Tutor', company: 'Campus Writing Center (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'English', majors: ['English', 'Education'], pay: '$15/hour', deadline: '2026-11-27', skills: ['Writing', 'Communication', 'Editing', 'Mentoring'], qualifications: ['Current student', 'Strong writing'], description: 'Coach fellow students on essays and papers in one-on-one tutoring sessions.' }),

  // ============================================================
  // HEALTHCARE (10)  -- some flagged as requiring license/grad degree
  // ============================================================
  job({ id: 'hlth-01', title: 'Medical Office Assistant Intern', company: 'Wellspring Clinic (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Healthcare', majors: ['Healthcare'], pay: '$17/hour', deadline: '2026-12-05', skills: ['Communication', 'Medical Terminology', 'Organization', 'Customer Service'], qualifications: ['Current student', 'HIPAA awareness (training provided)'], description: 'Greet patients, manage scheduling, and maintain accurate records at a family clinic.' }),
  job({ id: 'hlth-02', title: 'Patient Care Volunteer Coordinator', company: 'Evergreen Community Hospital (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Healthcare', majors: ['Healthcare', 'Psychology'], pay: '$18/hour', deadline: '2026-12-10', skills: ['Communication', 'Interpersonal Skills', 'Organization', 'Patient Care'], qualifications: ['Current student', 'Compassionate demeanor'], description: 'Coordinate volunteers and help patients navigate services and appointments.' }),
  job({ id: 'hlth-03', title: 'Public Health Outreach Intern', company: 'HealthBridge Alliance (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Healthcare', majors: ['Healthcare', 'Communications', 'Psychology'], pay: '$19/hour', deadline: '2026-12-12', skills: ['Communication', 'Research', 'Content Creation', 'Interpersonal Skills'], qualifications: ['Current student'], description: 'Develop community health materials and help run wellness awareness campaigns.' }),
  job({ id: 'hlth-04', title: 'Health Data Entry Assistant', company: 'MediTrack Systems (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Healthcare', majors: ['Healthcare', 'Information Technology'], pay: '$16/hour', deadline: '2026-11-30', skills: ['Attention to Detail', 'Medical Terminology', 'Organization', 'Communication'], qualifications: ['Current student', 'Accurate typing'], description: 'Enter and verify patient intake data in an electronic health record system.' }),
  job({ id: 'hlth-05', title: 'Nutrition Program Assistant', company: 'FreshStart Wellness (fictional)', location: 'Pittsburgh, PA', employmentType: 'Internship', field: 'Healthcare', majors: ['Healthcare'], pay: '$17/hour', deadline: '2026-12-06', skills: ['Communication', 'Research', 'Organization', 'Interpersonal Skills'], qualifications: ['Current student'], description: 'Support dietitians with meal-plan materials and community nutrition workshops.' }),
  job({ id: 'hlth-06', title: 'Rehabilitation Services Aide', company: 'Momentum Therapy Center (fictional)', location: 'Erie, PA', employmentType: 'Part-time', field: 'Healthcare', majors: ['Healthcare', 'Psychology'], pay: '$18/hour', deadline: '2026-12-08', skills: ['Patient Care', 'Communication', 'Interpersonal Skills', 'Attention to Detail'], qualifications: ['Current student', 'Comfortable assisting patients'], description: 'Help therapists prepare equipment and support patients through exercise routines.' }),
  job({ id: 'hlth-07', title: 'Medical Records Intern', company: 'Cedar Valley Health (fictional)', location: 'Columbus, OH', employmentType: 'Internship', field: 'Healthcare', majors: ['Healthcare', 'Information Technology'], pay: '$17/hour', deadline: '2026-12-14', skills: ['Medical Terminology', 'Attention to Detail', 'Organization', 'Communication'], qualifications: ['Current student'], description: 'Organize and digitize medical records while learning health-information workflows.' }),
  job({ id: 'hlth-08', title: 'Healthcare Marketing Intern', company: 'Vitality Group (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Healthcare', majors: ['Healthcare', 'Marketing', 'Communications'], pay: '$18/hour', deadline: '2026-12-11', skills: ['Content Creation', 'Communication', 'Social Media', 'Research'], qualifications: ['Current student'], description: 'Create patient-education content and support outreach for a healthcare provider network.' }),
  job({ id: 'hlth-09', title: 'Registered Nurse', company: 'Evergreen Community Hospital (fictional)', location: 'State College, PA', employmentType: 'Full-time', field: 'Healthcare', majors: ['Healthcare'], pay: '$70,000/year', deadline: '2026-12-20', skills: ['Patient Care', 'Medical Terminology', 'Communication', 'Attention to Detail'], qualifications: ['BSN degree', 'Active RN license'], requiresGradDegreeOrLicense: true, description: 'Provide direct patient care on a medical-surgical unit. (Requires an active nursing license.)' }),
  job({ id: 'hlth-10', title: 'Clinical Psychologist', company: 'Mindful Health Group (fictional)', location: 'Philadelphia, PA', employmentType: 'Full-time', field: 'Healthcare', majors: ['Healthcare', 'Psychology'], pay: '$85,000/year', deadline: '2026-12-22', skills: ['Research', 'Communication', 'Behavioral Observation', 'Interpersonal Skills'], qualifications: ['Doctoral degree (PhD/PsyD)', 'State clinical license'], requiresGradDegreeOrLicense: true, description: 'Conduct assessments and therapy with clients. (Requires a doctoral degree and clinical license.)' }),

  // ============================================================
  // EDUCATION (10)
  // ============================================================
  job({ id: 'edu-01', title: 'Teaching Assistant Intern', company: 'Bright Futures Academy (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Education', majors: ['Education'], pay: '$16/hour', deadline: '2026-12-05', skills: ['Communication', 'Lesson Planning', 'Classroom Management', 'Mentoring'], qualifications: ['Current student', 'Background check'], description: 'Support a lead teacher with classroom activities, small-group instruction, and grading.' }),
  job({ id: 'edu-02', title: 'After-School Program Leader', company: 'Rivertown Youth Center (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Education', majors: ['Education', 'Psychology'], pay: '$15/hour', deadline: '2026-11-30', skills: ['Classroom Management', 'Communication', 'Mentoring', 'Interpersonal Skills'], qualifications: ['Current student', 'Enjoys working with kids'], description: 'Lead homework help and enrichment activities for elementary students after school.' }),
  job({ id: 'edu-03', title: 'Curriculum Development Intern', company: 'LearnWell Education (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Education', majors: ['Education', 'English'], pay: '$18/hour', deadline: '2026-12-10', skills: ['Lesson Planning', 'Writing', 'Research', 'Communication'], qualifications: ['Current student'], description: 'Help design lesson materials and activities aligned to learning standards.' }),
  job({ id: 'edu-04', title: 'Education Technology Assistant', company: 'ClassConnect (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Education', majors: ['Education', 'Information Technology'], pay: '$17/hour', deadline: '2026-12-08', skills: ['Troubleshooting', 'Communication', 'Lesson Planning', 'Customer Service'], qualifications: ['Current student'], description: 'Support teachers using classroom software and create simple how-to guides.' }),
  job({ id: 'edu-05', title: 'Tutoring Program Coordinator', company: 'Summit Learning Collective (fictional)', location: 'Pittsburgh, PA', employmentType: 'Part-time', field: 'Education', majors: ['Education'], pay: '$16/hour', deadline: '2026-12-03', skills: ['Mentoring', 'Communication', 'Organization', 'Classroom Management'], qualifications: ['Current student'], description: 'Match students with tutors, track progress, and organize tutoring schedules.' }),
  job({ id: 'edu-06', title: 'Special Education Aide Intern', company: 'Harmony Learning Center (fictional)', location: 'Erie, PA', employmentType: 'Internship', field: 'Education', majors: ['Education', 'Psychology'], pay: '$17/hour', deadline: '2026-12-12', skills: ['Classroom Management', 'Interpersonal Skills', 'Communication', 'Behavioral Observation'], qualifications: ['Current student', 'Patience and empathy'], description: 'Assist special-education teachers in supporting students with individualized learning plans.' }),
  job({ id: 'edu-07', title: 'Museum Education Intern', company: 'Keystone Science Museum (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Education', majors: ['Education', 'Communications'], pay: '$16/hour', deadline: '2026-12-06', skills: ['Communication', 'Lesson Planning', 'Public Speaking', 'Mentoring'], qualifications: ['Current student'], description: 'Lead hands-on activities and school-group tours at an interactive science museum.' }),
  job({ id: 'edu-08', title: 'Instructional Design Intern', company: 'EduCraft Studios (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Education', majors: ['Education', 'Information Technology'], pay: '$19/hour', deadline: '2026-12-14', skills: ['Lesson Planning', 'Writing', 'Research', 'Content Creation'], qualifications: ['Current student'], description: 'Help build engaging online course modules and assessments.' }),
  job({ id: 'edu-09', title: 'Early Childhood Education Assistant', company: 'Little Sprouts Preschool (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Education', majors: ['Education', 'Psychology'], pay: '$15/hour', deadline: '2026-11-28', skills: ['Classroom Management', 'Communication', 'Mentoring', 'Interpersonal Skills'], qualifications: ['Current student', 'Background check'], description: 'Support preschool teachers with play-based learning and daily routines.' }),
  job({ id: 'edu-10', title: 'Licensed K-12 Teacher', company: 'Bright Futures Academy (fictional)', location: 'Harrisburg, PA', employmentType: 'Full-time', field: 'Education', majors: ['Education'], pay: '$50,000/year', deadline: '2026-12-20', skills: ['Lesson Planning', 'Classroom Management', 'Communication', 'Mentoring'], qualifications: ['Bachelor in Education', 'State teaching license'], requiresGradDegreeOrLicense: true, description: 'Lead a classroom full-time. (Requires a state teaching license.)' }),

  // ============================================================
  // ENGINEERING (10)
  // ============================================================
  job({ id: 'eng2-01', title: 'Mechanical Engineering Intern', company: 'Ironleaf Manufacturing (fictional)', location: 'Erie, PA', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering'], pay: '$24/hour', deadline: '2026-12-10', skills: ['CAD', 'Problem Solving', 'Mathematics', 'Project Management'], qualifications: ['Current student', 'Intro to CAD'], description: 'Support design reviews, create CAD drawings, and help test prototype components.' }),
  job({ id: 'eng2-02', title: 'Civil Engineering Co-op', company: 'Keystone Infrastructure (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering'], pay: '$25/hour', deadline: '2026-12-12', skills: ['CAD', 'Mathematics', 'Problem Solving', 'Project Management'], qualifications: ['Current student'], description: 'Assist with site surveys, drafting, and materials estimates on public works projects.' }),
  job({ id: 'eng2-03', title: 'Electrical Engineering Intern', company: 'VoltEdge Systems (fictional)', location: 'State College, PA', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering'], pay: '$26/hour', deadline: '2026-12-08', skills: ['Problem Solving', 'Mathematics', 'Troubleshooting', 'CAD'], qualifications: ['Current student', 'Circuits coursework'], description: 'Build and test circuit prototypes and help document measurement results.' }),
  job({ id: 'eng2-04', title: 'Manufacturing Process Intern', company: 'Precision Works Co. (fictional)', location: 'Columbus, OH', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering', 'Business'], pay: '$23/hour', deadline: '2026-12-05', skills: ['Problem Solving', 'Analytics', 'Project Management', 'Mathematics'], qualifications: ['Current student'], description: 'Analyze production lines for efficiency and support continuous-improvement projects.' }),
  job({ id: 'eng2-05', title: 'Robotics Lab Assistant', company: 'Automaton Labs (fictional)', location: 'Pittsburgh, PA', employmentType: 'Part-time', field: 'Engineering', majors: ['Engineering', 'Software Development'], pay: '$22/hour', deadline: '2026-12-14', skills: ['Problem Solving', 'Python', 'Mathematics', 'Troubleshooting'], qualifications: ['Current student', 'Some programming'], description: 'Help assemble and program lab robots for research demonstrations.' }),
  job({ id: 'eng2-06', title: 'Environmental Engineering Intern', company: 'GreenScape Engineering (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering'], pay: '$23/hour', deadline: '2026-12-11', skills: ['Research', 'Mathematics', 'Analytics', 'Problem Solving'], qualifications: ['Current student'], description: 'Support water-quality studies and prepare data summaries for environmental reports.' }),
  job({ id: 'eng2-07', title: 'Quality Engineering Intern', company: 'Precision Works Co. (fictional)', location: 'Columbus, OH', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering'], pay: '$22/hour', deadline: '2026-12-06', skills: ['Attention to Detail', 'Analytics', 'Problem Solving', 'Mathematics'], qualifications: ['Current student'], description: 'Inspect parts, log defects, and help maintain quality-control documentation.' }),
  job({ id: 'eng2-08', title: 'Biomedical Engineering Intern', company: 'MediTrack Systems (fictional)', location: 'Philadelphia, PA', employmentType: 'Internship', field: 'Engineering', majors: ['Engineering', 'Healthcare'], pay: '$25/hour', deadline: '2026-12-13', skills: ['Problem Solving', 'CAD', 'Research', 'Mathematics'], qualifications: ['Current student'], description: 'Assist in prototyping and testing medical-device components.' }),
  job({ id: 'eng2-09', title: 'Engineering Project Coordinator', company: 'Keystone Infrastructure (fictional)', location: 'Harrisburg, PA', employmentType: 'Part-time', field: 'Engineering', majors: ['Engineering', 'Business'], pay: '$21/hour', deadline: '2026-11-30', skills: ['Project Management', 'Communication', 'Organization', 'Problem Solving'], qualifications: ['Current student'], description: 'Track engineering project milestones, schedules, and documentation.' }),
  job({ id: 'eng2-10', title: 'Junior CAD Technician', company: 'DesignForge (fictional)', location: 'Remote', employmentType: 'Full-time', field: 'Engineering', majors: ['Engineering'], pay: '$54,000/year', deadline: '2026-12-18', skills: ['CAD', 'Attention to Detail', 'Mathematics', 'Problem Solving'], qualifications: ['Associate/Bachelor in Engineering', 'CAD proficiency'], description: 'Produce and revise detailed technical drawings for the product design team.' }),

  // ============================================================
  // COMMUNICATIONS (10)
  // ============================================================
  job({ id: 'comm-01', title: 'Public Relations Intern', company: 'Beacon Communications (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Communications', majors: ['Communications', 'English'], pay: '$18/hour', deadline: '2026-12-05', skills: ['Writing', 'Communication', 'Public Speaking', 'Research'], qualifications: ['Current student'], description: 'Draft press releases, build media lists, and help coordinate press events.' }),
  job({ id: 'comm-02', title: 'Social Media Assistant', company: 'EverGreen Brands (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Communications', majors: ['Communications', 'Marketing'], pay: '$17/hour', deadline: '2026-11-30', skills: ['Social Media', 'Content Creation', 'Writing', 'Communication'], qualifications: ['Current student'], description: 'Schedule posts, respond to comments, and track engagement across platforms.' }),
  job({ id: 'comm-03', title: 'Corporate Communications Intern', company: 'Meridian Enterprises (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Communications', majors: ['Communications', 'Business'], pay: '$19/hour', deadline: '2026-12-10', skills: ['Writing', 'Communication', 'Editing', 'Public Speaking'], qualifications: ['Current student'], description: 'Help write internal newsletters and prepare leadership presentations.' }),
  job({ id: 'comm-04', title: 'Broadcast Production Intern', company: 'Channel 9 Media (fictional)', location: 'Pittsburgh, PA', employmentType: 'Internship', field: 'Communications', majors: ['Communications'], pay: '$16/hour', deadline: '2026-12-08', skills: ['Communication', 'Content Creation', 'Public Speaking', 'Organization'], qualifications: ['Current student'], description: 'Support producers with scripts, run-downs, and on-set logistics.' }),
  job({ id: 'comm-05', title: 'Event Communications Coordinator', company: 'Summit Hospitality (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Communications', majors: ['Communications', 'Business'], pay: '$18/hour', deadline: '2026-12-03', skills: ['Communication', 'Organization', 'Public Speaking', 'Writing'], qualifications: ['Current student'], description: 'Coordinate event messaging, signage, and attendee communications.' }),
  job({ id: 'comm-06', title: 'Internal Communications Assistant', company: 'Commonwealth Consulting (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Communications', majors: ['Communications'], pay: '$17/hour', deadline: '2026-12-12', skills: ['Writing', 'Editing', 'Communication', 'Content Creation'], qualifications: ['Current student'], description: 'Maintain the company intranet and draft employee announcements.' }),
  job({ id: 'comm-07', title: 'Brand Storytelling Intern', company: 'BrightPath Media (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Communications', majors: ['Communications', 'Marketing', 'English'], pay: '$18/hour', deadline: '2026-12-14', skills: ['Writing', 'Content Creation', 'Social Media', 'Communication'], qualifications: ['Current student'], description: 'Develop brand narratives and multimedia stories for client campaigns.' }),
  job({ id: 'comm-08', title: 'Media Relations Assistant', company: 'Beacon Communications (fictional)', location: 'Philadelphia, PA', employmentType: 'Part-time', field: 'Communications', majors: ['Communications'], pay: '$18/hour', deadline: '2026-11-28', skills: ['Communication', 'Writing', 'Research', 'Public Speaking'], qualifications: ['Current student'], description: 'Monitor media coverage and help prepare talking points for spokespeople.' }),
  job({ id: 'comm-09', title: 'Nonprofit Outreach Intern', company: 'Open Doors Foundation (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Communications', majors: ['Communications', 'Psychology'], pay: '$17/hour', deadline: '2026-12-09', skills: ['Communication', 'Interpersonal Skills', 'Writing', 'Social Media'], qualifications: ['Current student'], description: 'Build community relationships and craft outreach messaging for programs.' }),
  job({ id: 'comm-10', title: 'Communications Specialist', company: 'Vitality Group (fictional)', location: 'Remote', employmentType: 'Full-time', field: 'Communications', majors: ['Communications', 'Marketing'], pay: '$50,000/year', deadline: '2026-12-18', skills: ['Writing', 'Communication', 'Content Creation', 'Public Speaking'], qualifications: ['Bachelor degree', 'Strong portfolio'], description: 'Own messaging across channels and coordinate communications campaigns.' }),

  // ============================================================
  // INFORMATION TECHNOLOGY (10 additional, beyond the originals)
  // ============================================================
  job({ id: 'it-01', title: 'Help Desk Technician', company: 'Nittany Cloud Solutions (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Information Technology', majors: ['Information Technology'], pay: '$18/hour', deadline: '2026-12-05', skills: ['Troubleshooting', 'Customer Service', 'Windows', 'Communication'], qualifications: ['Current student'], description: 'Answer tier-1 support tickets and resolve common software and account issues.' }),
  job({ id: 'it-02', title: 'Network Operations Intern', company: 'Horizon Enterprise Systems (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Cybersecurity'], pay: '$22/hour', deadline: '2026-12-10', skills: ['Networking', 'Troubleshooting', 'Linux', 'Problem Solving'], qualifications: ['Current student', 'Networking basics'], description: 'Monitor network health and help maintain switches, routers, and documentation.' }),
  job({ id: 'it-03', title: 'Cloud Support Intern', company: 'SkyStack (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Software Development'], pay: '$24/hour', deadline: '2026-12-12', skills: ['Linux', 'Troubleshooting', 'Networking', 'Problem Solving'], qualifications: ['Current student'], description: 'Assist customers with cloud deployments and basic configuration questions.' }),
  job({ id: 'it-04', title: 'IT Asset Management Intern', company: 'Commonwealth Consulting (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Information Technology', majors: ['Information Technology', 'Business'], pay: '$19/hour', deadline: '2026-11-30', skills: ['Organization', 'SQL', 'Attention to Detail', 'Communication'], qualifications: ['Current student'], description: 'Track hardware and software inventory and keep the asset database accurate.' }),
  job({ id: 'it-05', title: 'Desktop Support Associate', company: 'Keystone Technologies (fictional)', location: 'Pittsburgh, PA', employmentType: 'Full-time', field: 'Information Technology', majors: ['Information Technology'], pay: '$46,000/year', deadline: '2026-12-15', skills: ['Troubleshooting', 'Windows', 'Networking', 'Customer Service'], qualifications: ['Associate/Bachelor in IT'], description: 'Provide on-site desktop support and image new machines for staff.' }),
  job({ id: 'it-06', title: 'IT Security Awareness Intern', company: 'Fortress Security Group (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Communications', 'Cybersecurity'], pay: '$21/hour', deadline: '2026-12-08', skills: ['Security', 'Communication', 'Content Creation', 'Research'], qualifications: ['Current student'], description: 'Build phishing-awareness materials and help run security training sessions.' }),
  job({ id: 'it-07', title: 'Systems Integration Intern', company: 'Horizon Enterprise Systems (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Enterprise Technology Integration'], pay: '$23/hour', deadline: '2026-12-11', skills: ['SQL', 'Troubleshooting', 'Project Management', 'Communication'], qualifications: ['Current student'], description: 'Help connect business applications and test data flows between systems.' }),
  job({ id: 'it-08', title: 'Technical Support Analyst', company: 'SkyStack (fictional)', location: 'Remote', employmentType: 'Full-time', field: 'Information Technology', majors: ['Information Technology'], pay: '$48,000/year', deadline: '2026-12-18', skills: ['Troubleshooting', 'Customer Service', 'SQL', 'Communication'], qualifications: ['Bachelor degree or equivalent experience'], description: 'Resolve escalated customer issues and document solutions in the knowledge base.' }),
  job({ id: 'it-09', title: 'IT Business Analyst Intern', company: 'Summit Business Group (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Business', 'Data Analytics'], pay: '$22/hour', deadline: '2026-12-06', skills: ['SQL', 'Communication', 'Analytics', 'Project Management'], qualifications: ['Current student'], description: 'Gather requirements and translate them into technical specifications for IT teams.' }),
  job({ id: 'it-10', title: 'Junior DevOps Intern', company: 'CodeCrest Technologies (fictional)', location: 'Austin, TX', employmentType: 'Internship', field: 'Information Technology', majors: ['Information Technology', 'Software Development'], pay: '$25/hour', deadline: '2026-12-14', skills: ['Linux', 'Git', 'Troubleshooting', 'Problem Solving'], qualifications: ['Current student', 'Command-line comfort'], description: 'Help automate build and deployment pipelines and monitor service health.' }),

  // ============================================================
  // PSYCHOLOGY (10)  -- undergrad-eligible unless flagged
  // ============================================================
  job({ id: 'psy-01', title: 'Human Resources Intern', company: 'Meridian Enterprises (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Psychology', majors: ['Psychology', 'Business'], pay: '$19/hour', deadline: '2026-12-05', skills: ['Communication', 'Interpersonal Skills', 'Organization', 'Research'], qualifications: ['Current student', 'Discretion with sensitive info'], description: 'Support recruiting, onboarding, and employee-engagement surveys. A strong fit for psychology students interested in people and organizations.' }),
  job({ id: 'psy-02', title: 'Behavioral Health Technician', company: 'Mindful Health Group (fictional)', location: 'State College, PA', employmentType: 'Full-time', field: 'Psychology', majors: ['Psychology', 'Healthcare'], pay: '$40,000/year', deadline: '2026-12-10', skills: ['Behavioral Observation', 'Communication', 'Interpersonal Skills', 'Patient Care'], qualifications: ['Bachelor in Psychology or related (entry-level)', 'Background check'], description: 'Work with clients on daily skills and document behavioral progress under clinician supervision. Entry-level; no license required.' }),
  job({ id: 'psy-03', title: 'Research Assistant — Psychology', company: 'Cognition Research Collective (fictional)', location: 'Remote', employmentType: 'Part-time', field: 'Psychology', majors: ['Psychology'], pay: '$18/hour', deadline: '2026-12-12', skills: ['Research', 'Statistics', 'Communication', 'Attention to Detail'], qualifications: ['Current student', 'Intro statistics coursework'], description: 'Help run studies, code data, and support literature reviews for a behavioral research lab.' }),
  job({ id: 'psy-04', title: 'Mental Health Program Assistant', company: 'Evergreen Community Services (fictional)', location: 'Pittsburgh, PA', employmentType: 'Part-time', field: 'Psychology', majors: ['Psychology', 'Healthcare'], pay: '$18/hour', deadline: '2026-11-30', skills: ['Communication', 'Interpersonal Skills', 'Behavioral Observation', 'Organization'], qualifications: ['Current student'], description: 'Assist program staff with client scheduling, group activities, and resource referrals.' }),
  job({ id: 'psy-05', title: 'Social Services Intern', company: 'Open Doors Foundation (fictional)', location: 'Harrisburg, PA', employmentType: 'Internship', field: 'Psychology', majors: ['Psychology'], pay: '$17/hour', deadline: '2026-12-06', skills: ['Interpersonal Skills', 'Communication', 'Research', 'Organization'], qualifications: ['Current student'], description: 'Support caseworkers by gathering client information and connecting families to community resources.' }),
  job({ id: 'psy-06', title: 'Human Services Case Management Intern', company: 'Community Bridges (fictional)', location: 'Erie, PA', employmentType: 'Internship', field: 'Psychology', majors: ['Psychology'], pay: '$18/hour', deadline: '2026-12-08', skills: ['Communication', 'Organization', 'Interpersonal Skills', 'Research'], qualifications: ['Current student'], description: 'Shadow case managers, maintain client records, and help coordinate support services.' }),
  job({ id: 'psy-07', title: 'Applied Behavior Analysis (ABA) Assistant', company: 'Harmony Learning Center (fictional)', location: 'State College, PA', employmentType: 'Part-time', field: 'Psychology', majors: ['Psychology', 'Education'], pay: '$19/hour', deadline: '2026-12-11', skills: ['Behavioral Observation', 'Communication', 'Interpersonal Skills', 'Attention to Detail'], qualifications: ['Current student', 'RBT training provided'], description: 'Support behavior technicians delivering ABA sessions and recording observation data. Entry-level; certification training provided.' }),
  job({ id: 'psy-08', title: 'Organizational Development Intern', company: 'GrowthBridge Advisors (fictional)', location: 'Remote', employmentType: 'Internship', field: 'Psychology', majors: ['Psychology', 'Business'], pay: '$20/hour', deadline: '2026-12-14', skills: ['Research', 'Statistics', 'Communication', 'Interpersonal Skills'], qualifications: ['Current student'], description: 'Analyze employee-survey data and help design workplace-culture initiatives. Blends psychology with business.' }),
  job({ id: 'psy-09', title: 'Community Outreach Coordinator', company: 'Lighthouse Nonprofit (fictional)', location: 'Philadelphia, PA', employmentType: 'Part-time', field: 'Psychology', majors: ['Psychology', 'Communications'], pay: '$18/hour', deadline: '2026-12-03', skills: ['Communication', 'Interpersonal Skills', 'Public Speaking', 'Organization'], qualifications: ['Current student'], description: 'Build relationships with community partners and coordinate mental-wellness awareness events.' }),
  job({ id: 'psy-10', title: 'Youth Development Program Intern', company: 'Rivertown Youth Center (fictional)', location: 'State College, PA', employmentType: 'Internship', field: 'Psychology', majors: ['Psychology', 'Education'], pay: '$16/hour', deadline: '2026-11-28', skills: ['Mentoring', 'Communication', 'Behavioral Observation', 'Interpersonal Skills'], qualifications: ['Current student', 'Background check'], description: 'Mentor youth, run skill-building activities, and observe program outcomes.' }),
];

export default jobs;
