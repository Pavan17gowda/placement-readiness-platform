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
  const extracted = {};
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    const found = SKILL_CATEGORIES[category].filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
    if (found.length > 0) {
      extracted[category] = found;
    }
  });

  // If nothing found, return general stack
  if (Object.keys(extracted).length === 0) {
    extracted['General'] = ['Fresher Stack', 'Communication', 'Problem Solving'];
  }

  return extracted;
}

export function generateChecklist(skills) {
  const hasSkill = (category) => skills[category] && skills[category].length > 0;
  
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
      'Practice array and string problems',
      'Master sorting and searching algorithms',
      'Understand time and space complexity',
      hasSkill('Core CS') && skills['Core CS'].includes('DBMS') ? 'Practice SQL queries and normalization' : 'Review data structures basics',
      'Solve tree and graph problems',
      'Practice dynamic programming questions'
    ],
    'Round 3: Tech Interview': [
      hasSkill('Languages') ? `Prepare projects using ${skills['Languages'][0]}` : 'Prepare your best project',
      hasSkill('Web') ? `Deep dive into ${skills['Web'].join(', ')}` : 'Review your tech stack',
      hasSkill('Data') ? `Practice database design with ${skills['Data'][0]}` : 'Understand database basics',
      'Prepare to explain your project architecture',
      hasSkill('Cloud/DevOps') ? `Study ${skills['Cloud/DevOps'].join(', ')} basics` : 'Learn deployment basics',
      'Review system design fundamentals',
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
  
  return [
    {
      day: 'Day 1-2',
      title: 'Basics + Core CS',
      tasks: [
        hasSkill('Core CS') ? `Review ${skills['Core CS'].slice(0, 3).join(', ')}` : 'Review CS fundamentals',
        'Practice basic coding problems',
        'Revise OOP concepts',
        hasSkill('Data') ? `Study ${skills['Data'][0]} basics` : 'Review database concepts'
      ]
    },
    {
      day: 'Day 3-4',
      title: 'DSA + Coding Practice',
      tasks: [
        'Solve 10 array/string problems',
        'Practice tree and graph traversals',
        'Review sorting algorithms',
        hasSkill('Languages') ? `Code in ${skills['Languages'][0]}` : 'Practice in your preferred language',
        'Take a timed coding test'
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
        'Practice 20 common interview questions',
        hasSkill('Web') ? `Prepare ${skills['Web'][0]} specific questions` : 'Prepare tech-specific questions',
        'Record yourself answering questions',
        'Practice whiteboard coding',
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
        'Take a full mock interview',
        'Prepare questions for interviewer',
        'Get good rest before interview'
      ]
    }
  ];
}

export function generateInterviewQuestions(skills) {
  const questions = [];
  const hasSkill = (category) => skills[category] && skills[category].length > 0;

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
