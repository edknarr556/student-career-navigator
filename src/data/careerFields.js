// Career exploration reference data. Stored locally so the exploration
// section works without any network access.

const careerFields = [
  {
    id: 'information-technology',
    name: 'Information Technology',
    description:
      'IT professionals keep an organization\u2019s technology running by managing hardware, software, networks, and user support. It is a broad field with roles ranging from help desk to infrastructure and systems management.',
    commonTitles: [
      'IT Support Specialist',
      'Systems Administrator',
      'Network Technician',
      'IT Project Manager',
      'Help Desk Analyst',
    ],
    skills: ['Troubleshooting', 'Networking', 'Operating Systems', 'Customer Service', 'Project Management'],
    education: 'Associate or Bachelor\u2019s degree in IT, Information Systems, or a related field. Certifications like CompTIA A+ and Network+ are valued.',
    paths: [
      'Help Desk \u2192 Systems Administrator \u2192 IT Manager',
      'Support Specialist \u2192 Network Engineer \u2192 Infrastructure Architect',
    ],
  },
  {
    id: 'software-development',
    name: 'Software Development',
    description:
      'Software developers design, build, and maintain applications and systems. They write code, solve problems, and collaborate with teams to ship products that people use every day.',
    commonTitles: [
      'Frontend Developer',
      'Backend Developer',
      'Full-Stack Engineer',
      'Mobile Developer',
      'Software Engineer',
    ],
    skills: ['JavaScript', 'Java', 'Python', 'Git', 'Problem Solving', 'React'],
    education: 'Bachelor\u2019s degree in Computer Science or Software Engineering is common, though bootcamps and self-study portfolios are increasingly accepted.',
    paths: [
      'Junior Developer \u2192 Senior Developer \u2192 Tech Lead',
      'Developer \u2192 Engineering Manager \u2192 Director of Engineering',
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description:
      'Cybersecurity professionals protect systems, networks, and data from threats. They monitor for attacks, respond to incidents, and build defenses to keep information safe.',
    commonTitles: [
      'Security Analyst',
      'SOC Analyst',
      'Penetration Tester',
      'Security Engineer',
      'Incident Responder',
    ],
    skills: ['Networking', 'Security', 'Linux', 'Risk Analysis', 'Troubleshooting'],
    education: 'Bachelor\u2019s degree in Cybersecurity, IT, or Computer Science. Certifications such as Security+, CEH, and CISSP strengthen your profile.',
    paths: [
      'SOC Analyst \u2192 Security Engineer \u2192 Security Architect',
      'Analyst \u2192 Penetration Tester \u2192 Red Team Lead',
    ],
  },
  {
    id: 'business-management',
    name: 'Business Management',
    description:
      'Business management focuses on planning, organizing, and leading teams and operations to achieve organizational goals. It blends strategy, communication, and people skills.',
    commonTitles: [
      'Business Analyst',
      'Operations Coordinator',
      'Project Manager',
      'Product Manager',
      'Management Associate',
    ],
    skills: ['Communication', 'Project Management', 'Leadership', 'Analytics', 'Problem Solving'],
    education: 'Bachelor\u2019s degree in Business Administration, Management, or a related field. An MBA can accelerate advancement.',
    paths: [
      'Associate \u2192 Manager \u2192 Director',
      'Business Analyst \u2192 Product Manager \u2192 VP of Operations',
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    description:
      'Finance professionals manage money, analyze investments, and guide financial decisions for individuals and organizations. The field rewards analytical thinking and attention to detail.',
    commonTitles: [
      'Financial Analyst',
      'Investment Analyst',
      'Accountant',
      'Budget Analyst',
      'Finance Associate',
    ],
    skills: ['Excel', 'Financial Modeling', 'Analytics', 'Communication', 'Attention to Detail'],
    education: 'Bachelor\u2019s degree in Finance, Accounting, or Economics. Certifications like CFA and CPA are highly regarded.',
    paths: [
      'Analyst \u2192 Senior Analyst \u2192 Finance Manager',
      'Financial Analyst \u2192 Portfolio Manager \u2192 CFO',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description:
      'Marketing professionals promote products and brands, understand customer needs, and craft campaigns that drive engagement and sales across digital and traditional channels.',
    commonTitles: [
      'Marketing Coordinator',
      'Digital Marketing Specialist',
      'Content Strategist',
      'Social Media Manager',
      'Brand Associate',
    ],
    skills: ['Communication', 'Content Creation', 'SEO', 'Social Media', 'Analytics'],
    education: 'Bachelor\u2019s degree in Marketing, Communications, or Business. Portfolios and digital marketing certifications help you stand out.',
    paths: [
      'Coordinator \u2192 Marketing Manager \u2192 Director of Marketing',
      'Specialist \u2192 Growth Lead \u2192 Chief Marketing Officer',
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description:
      'Data analysts turn raw data into insights. They collect, clean, and interpret data to help organizations make informed, evidence-based decisions.',
    commonTitles: [
      'Data Analyst',
      'Business Intelligence Analyst',
      'Database Developer',
      'Reporting Analyst',
      'Data Scientist',
    ],
    skills: ['SQL', 'Python', 'Data Visualization', 'Analytics', 'Statistics'],
    education: 'Bachelor\u2019s degree in Data Science, Statistics, Computer Science, or a related field. Strong SQL and visualization skills are essential.',
    paths: [
      'Data Analyst \u2192 Senior Analyst \u2192 Analytics Manager',
      'Analyst \u2192 Data Scientist \u2192 Head of Data',
    ],
  },
];

export default careerFields;
