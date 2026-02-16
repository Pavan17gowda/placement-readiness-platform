// Skill extraction and analysis logic

export const SKILL_CATEGORIES = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Operating System', 'Database'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'C'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'Git'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Testing']
};

export function extractSkills(jdText) {
  const lowerText = jdText.toLowerCase();
  const extracted = {
    'Core CS': [],
    'Languages': [],
    'Web': [],
    'Data': [],
    'Cloud/DevOps': [],
    'Testing': [],
    'Other': []
  };
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    const found = SKILL_CATEGORIES[category].filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
    if (found.length > 0) {
      extracted[category] = found;
    }
  });

  // If nothing found, populate Other with defaults
  const hasAnySkills = Object.values(extracted).some(arr => arr.length > 0);
  if (!hasAnySkills) {
    extracted['Other'] = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
  }

  // Remove empty categories
  Object.keys(extracted).forEach(key => {
    if (extracted[key].length === 0) {
      delete extracted[key];
    }
  });

  return extracted;
}

export function generateChecklist(skills) {
  const hasSkill = (category) => skills[category] && skills[category].length > 0;
  const isGenericProfile = hasSkill('Other');
  
  return {
    'Round 1: Aptitude / Basics': [
      'Practice quantitative aptitude questions',
      'Review logical reasoning patterns',
      'Brush up verbal ability and comprehension',
      'Take online aptitude mock tests',
      'Review basic mathematics and statistics'
    ],
    'Round 2: DSA + Core CS': [
      hasSkill('Core CS') ? `Study ${skills['Core CS'].join(', ')} concepts` : 'Review core CS fundamentals',
      isGenericProfile ? 'Learn basic data structures (arrays, strings, lists)' : 'Practice array and string problems',
      'Master sorting and searching algorithms',
      'Understand time and space complexity',
      hasSkill('Core CS') && skills['Core CS'].includes('DBMS') ? 'Practice SQL queries and normalization' : 'Review data structures basics',
      isGenericProfile ? 'Practice simple coding problems' : 'Solve tree and graph problems',
      isGenericProfile ? 'Learn basic algorithms' : 'Practice dynamic programming questions'
    ],
    'Round 3: Tech Interview': [
      hasSkill('Languages') ? `Prepare projects using ${skills['Languages'][0]}` : 'Prepare your best project',
      hasSkill('Web') ? `Deep dive into ${skills['Web'].join(', ')}` : 'Review your tech stack',
      hasSkill('Data') ? `Practice database design with ${skills['Data'][0]}` : 'Understand database basics',
      'Prepare to explain your project architecture',
      hasSkill('Cloud/DevOps') ? `Study ${skills['Cloud/DevOps'].join(', ')} basics` : 'Learn deployment basics',
      isGenericProfile ? 'Focus on explaining your learning journey' : 'Review system design fundamentals',
      'Practice explaining technical decisions'
    ],
    'Round 4: Managerial / HR': [
      'Prepare your elevator pitch',
      'Practice behavioral questions (STAR method)',
      'Research company culture and values',
      'Prepare questions to ask interviewer',
      'Review your strengths and weaknesses',
      'Practice salary negotiation scenarios'
    ]
  };
}

export function generate7DayPlan(skills) {
  const hasSkill = (category) => skills[category] && skills[category].length > 0;
  const isGenericProfile = hasSkill('Other');
  
  return [
    {
      day: 'Day 1-2',
      title: 'Basics + Core CS',
      tasks: [
        hasSkill('Core CS') ? `Review ${skills['Core CS'].slice(0, 3).join(', ')}` : 'Review CS fundamentals',
        isGenericProfile ? 'Learn basic programming concepts' : 'Practice basic coding problems',
        isGenericProfile ? 'Study OOP basics' : 'Revise OOP concepts',
        hasSkill('Data') ? `Study ${skills['Data'][0]} basics` : 'Review database concepts'
      ]
    },
    {
      day: 'Day 3-4',
      title: 'DSA + Coding Practice',
      tasks: [
        isGenericProfile ? 'Solve 5 easy array problems' : 'Solve 10 array/string problems',
        isGenericProfile ? 'Learn basic sorting' : 'Practice tree and graph traversals',
        isGenericProfile ? 'Understand time complexity basics' : 'Review sorting algorithms',
        hasSkill('Languages') ? `Code in ${skills['Languages'][0]}` : 'Practice in your preferred language',
        isGenericProfile ? 'Practice on HackerRank/LeetCode easy' : 'Take a timed coding test'
      ]
    },
    {
      day: 'Day 5',
      title: 'Project + Resume Alignment',
      tasks: [
        'Update resume with quantified achievements',
        hasSkill('Web') ? `Highlight ${skills['Web'][0]} experience` : 'Highlight your best project',
        'Prepare project demo',
        hasSkill('Cloud/DevOps') ? `Add ${skills['Cloud/DevOps'][0]} to resume` : 'Add relevant skills',
        'Get resume reviewed by peers'
      ]
    },
    {
      day: 'Day 6',
      title: 'Mock Interview Questions',
      tasks: [
        isGenericProfile ? 'Practice 10 common interview questions' : 'Practice 20 common interview questions',
        hasSkill('Web') ? `Prepare ${skills['Web'][0]} specific questions` : 'Prepare tech-specific questions',
        'Record yourself answering questions',
        isGenericProfile ? 'Practice explaining your projects' : 'Practice whiteboard coding',
        'Review behavioral questions'
      ]
    },
    {
      day: 'Day 7',
      title: 'Revision + Weak Areas',
      tasks: [
        'Revise all key concepts',
        'Focus on your weakest topic',
        hasSkill('Testing') ? 'Review testing frameworks' : 'Review debugging techniques',
        isGenericProfile ? 'Practice explaining your learning journey' : 'Take a full mock interview',
        'Prepare questions for interviewer',
        'Get good rest before interview'
      ]
    }
  ];
}

export function generateInterviewQuestions(skills) {
  const questions = [];
  const hasSkill = (category) => skills[category] && skills[category].length > 0;
  const isGenericProfile = hasSkill('Other');

  // Generic profile questions
  if (isGenericProfile) {
    questions.push('Tell me about yourself and your background.');
    questions.push('What programming languages are you comfortable with?');
    questions.push('Describe a project you worked on and your role in it.');
    questions.push('How do you approach learning new technologies?');
    questions.push('What is your understanding of data structures?');
    questions.push('Explain the difference between a class and an object.');
    questions.push('How would you debug a program that is not working?');
    questions.push('What motivates you to pursue a career in software development?');
    questions.push('Describe a challenging problem you solved.');
    questions.push('Where do you see yourself in 3 years?');
    return questions;
  }

  // Core CS questions
  if (hasSkill('Core CS')) {
    if (skills['Core CS'].some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'))) {
      questions.push('Explain the difference between BFS and DFS. When would you use each?');
      questions.push('How would you optimize search in sorted data? Explain time complexity.');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('oop'))) {
      questions.push('Explain polymorphism with a real-world example.');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('dbms') || s.toLowerCase().includes('database'))) {
      questions.push('Explain database indexing and when it helps performance.');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('os'))) {
      questions.push('What is the difference between process and thread?');
    }
  }

  // Language-specific questions
  if (hasSkill('Languages')) {
    const lang = skills['Languages'][0];
    if (lang.toLowerCase().includes('java')) {
      questions.push('Explain Java memory management and garbage collection.');
    } else if (lang.toLowerCase().includes('python')) {
      questions.push('What are Python decorators and how do they work?');
    } else if (lang.toLowerCase().includes('javascript')) {
      questions.push('Explain closures in JavaScript with an example.');
    }
  }

  // Web questions
  if (hasSkill('Web')) {
    if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
      questions.push('Explain state management options in React. When would you use Context vs Redux?');
      questions.push('What are React hooks and why were they introduced?');
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('node'))) {
      questions.push('How does Node.js handle asynchronous operations?');
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('rest'))) {
      questions.push('What are RESTful API best practices?');
    }
  }

  // Data questions
  if (hasSkill('Data')) {
    if (skills['Data'].some(s => s.toLowerCase().includes('sql'))) {
      questions.push('Write a SQL query to find the second highest salary from an Employee table.');
    }
    if (skills['Data'].some(s => s.toLowerCase().includes('mongo'))) {
      questions.push('When would you choose MongoDB over a relational database?');
    }
  }

  // Cloud/DevOps questions
  if (hasSkill('Cloud/DevOps')) {
    if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('docker'))) {
      questions.push('Explain the difference between Docker containers and virtual machines.');
    }
    if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('aws'))) {
      questions.push('What AWS services would you use to deploy a web application?');
    }
  }

  // Testing questions
  if (hasSkill('Testing')) {
    questions.push('How do you approach writing test cases for a new feature?');
  }

  // Generic questions if we don't have 10 yet
  const genericQuestions = [
    'Describe a challenging bug you fixed and how you approached it.',
    'How do you stay updated with new technologies?',
    'Explain a project you are most proud of and your role in it.',
    'How do you handle tight deadlines and pressure?',
    'What is your approach to code reviews?'
  ];

  while (questions.length < 10) {
    questions.push(genericQuestions[questions.length % genericQuestions.length]);
  }

  return questions.slice(0, 10);
}

export function calculateReadinessScore(jdText, company, role, skills) {
  let score = 35; // Base score

  // +5 per category detected (max 30)
  const categoryCount = Object.keys(skills).length;
  score += Math.min(categoryCount * 5, 30);

  // +10 if company provided
  if (company && company.trim().length > 0) {
    score += 10;
  }

  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10;
  }

  // +10 if JD length > 800 chars
  if (jdText.length > 800) {
    score += 10;
  }

  return Math.min(score, 100);
}
