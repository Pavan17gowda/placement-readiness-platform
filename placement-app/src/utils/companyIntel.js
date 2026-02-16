// Company intelligence and round mapping logic

const ENTERPRISE_COMPANIES = [
  'amazon', 'google', 'microsoft', 'apple', 'meta', 'facebook',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'capgemini',
  'ibm', 'oracle', 'salesforce', 'adobe', 'intel', 'nvidia',
  'deloitte', 'pwc', 'ey', 'kpmg', 'jpmorgan', 'goldman sachs',
  'morgan stanley', 'citigroup', 'wells fargo', 'bank of america'
];

const MID_SIZE_COMPANIES = [
  'zomato', 'swiggy', 'paytm', 'razorpay', 'cred', 'phonepe',
  'freshworks', 'zoho', 'postman', 'browserstack', 'atlassian',
  'thoughtworks', 'publicis sapient', 'nagarro', 'epam'
];

export function inferCompanySize(companyName) {
  if (!companyName) return 'Startup';
  
  const lower = companyName.toLowerCase().trim();
  
  if (ENTERPRISE_COMPANIES.some(c => lower.includes(c))) {
    return 'Enterprise';
  }
  
  if (MID_SIZE_COMPANIES.some(c => lower.includes(c))) {
    return 'Mid-size';
  }
  
  return 'Startup';
}

export function inferIndustry(companyName, skills) {
  if (!companyName) return 'Technology Services';
  
  const lower = companyName.toLowerCase();
  
  // Financial services
  if (lower.includes('bank') || lower.includes('capital') || 
      lower.includes('finance') || lower.includes('jpmorgan') ||
      lower.includes('goldman') || lower.includes('morgan stanley')) {
    return 'Financial Services';
  }
  
  // E-commerce
  if (lower.includes('amazon') || lower.includes('flipkart') || 
      lower.includes('walmart') || lower.includes('ebay')) {
    return 'E-commerce';
  }
  
  // Food tech
  if (lower.includes('zomato') || lower.includes('swiggy') || 
      lower.includes('uber') || lower.includes('doordash')) {
    return 'Food & Delivery Tech';
  }
  
  // Fintech
  if (lower.includes('paytm') || lower.includes('razorpay') || 
      lower.includes('stripe') || lower.includes('paypal') ||
      lower.includes('cred') || lower.includes('phonepe')) {
    return 'Fintech';
  }
  
  // Cloud/Infrastructure
  if (lower.includes('aws') || lower.includes('azure') || 
      lower.includes('gcp') || lower.includes('cloud')) {
    return 'Cloud & Infrastructure';
  }
  
  // Consulting
  if (lower.includes('deloitte') || lower.includes('accenture') || 
      lower.includes('pwc') || lower.includes('ey') || lower.includes('kpmg')) {
    return 'IT Consulting';
  }
  
  return 'Technology Services';
}

export function getHiringFocus(companySize) {
  const focuses = {
    'Enterprise': {
      primary: 'Structured DSA + Core Fundamentals',
      description: 'Large companies emphasize algorithmic thinking, system design fundamentals, and thorough CS knowledge. Expect multiple rounds with increasing difficulty.',
      traits: ['Strong DSA foundation', 'System design basics', 'CS fundamentals', 'Scalability mindset']
    },
    'Mid-size': {
      primary: 'Balanced: DSA + Practical Skills',
      description: 'Mid-size companies look for both problem-solving ability and hands-on experience. They value candidates who can contribute quickly.',
      traits: ['Good DSA skills', 'Practical coding', 'Tech stack knowledge', 'Team collaboration']
    },
    'Startup': {
      primary: 'Practical Problem Solving + Stack Depth',
      description: 'Startups prioritize hands-on skills and ability to ship features quickly. They value versatility and ownership mentality.',
      traits: ['Full-stack capability', 'Quick learning', 'Ownership mindset', 'Practical experience']
    }
  };
  
  return focuses[companySize] || focuses['Startup'];
}

export function generateRoundMapping(companySize, skills) {
  const hasSkill = (category) => skills[category] && skills[category].length > 0;
  const hasDSA = hasSkill('Core CS') && skills['Core CS'].some(s => 
    s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm')
  );
  
  // Enterprise round mapping
  if (companySize === 'Enterprise') {
    return [
      {
        round: 'Round 1',
        title: 'Online Assessment',
        description: 'DSA problems + Aptitude + MCQs',
        why: 'Filters candidates at scale. Tests fundamental problem-solving and CS knowledge.',
        duration: '60-90 mins'
      },
      {
        round: 'Round 2',
        title: 'Technical Interview I',
        description: 'DSA deep dive + Core CS concepts',
        why: 'Evaluates algorithmic thinking and ability to optimize solutions under pressure.',
        duration: '45-60 mins'
      },
      {
        round: 'Round 3',
        title: 'Technical Interview II',
        description: 'System design + Project discussion',
        why: 'Assesses architectural thinking and real-world problem-solving experience.',
        duration: '45-60 mins'
      },
      {
        round: 'Round 4',
        title: 'Managerial / HR',
        description: 'Behavioral questions + Culture fit',
        why: 'Ensures alignment with company values and team dynamics.',
        duration: '30-45 mins'
      }
    ];
  }
  
  // Mid-size round mapping
  if (companySize === 'Mid-size') {
    return [
      {
        round: 'Round 1',
        title: 'Coding Assessment',
        description: hasDSA ? 'DSA problems + Practical coding' : 'Practical coding challenges',
        why: 'Tests both algorithmic skills and ability to write production-ready code.',
        duration: '60-90 mins'
      },
      {
        round: 'Round 2',
        title: 'Technical Discussion',
        description: hasSkill('Web') ? `${skills['Web'][0]} + System design` : 'Tech stack + Architecture',
        why: 'Evaluates depth in relevant technologies and design thinking.',
        duration: '45-60 mins'
      },
      {
        round: 'Round 3',
        title: 'Team Fit + Culture',
        description: 'Behavioral + Collaboration scenarios',
        why: 'Ensures you can work effectively in a fast-paced team environment.',
        duration: '30-45 mins'
      }
    ];
  }
  
  // Startup round mapping
  return [
    {
      round: 'Round 1',
      title: 'Practical Coding',
      description: hasSkill('Web') 
        ? `Build a feature using ${skills['Web'].slice(0, 2).join(', ')}`
        : 'Solve real-world coding problems',
      why: 'Startups need people who can ship code quickly. This tests hands-on ability.',
      duration: '60-120 mins'
    },
    {
      round: 'Round 2',
      title: 'System Discussion',
      description: 'Architecture + Trade-offs + Scalability',
      why: 'Evaluates your ability to make pragmatic technical decisions with limited resources.',
      duration: '45-60 mins'
    },
    {
      round: 'Round 3',
      title: 'Culture Fit + Vision',
      description: 'Ownership mindset + Learning agility',
      why: 'Startups need self-driven individuals who thrive in ambiguity and wear multiple hats.',
      duration: '30-45 mins'
    }
  ];
}

export function generateCompanyIntel(company, role, skills) {
  const companySize = inferCompanySize(company);
  const industry = inferIndustry(company, skills);
  const hiringFocus = getHiringFocus(companySize);
  const roundMapping = generateRoundMapping(companySize, skills);
  
  return {
    companySize,
    industry,
    hiringFocus,
    roundMapping,
    sizeCategory: {
      'Enterprise': '2000+ employees',
      'Mid-size': '200-2000 employees',
      'Startup': '<200 employees'
    }[companySize]
  };
}
