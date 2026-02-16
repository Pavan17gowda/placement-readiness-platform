import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById, updateAnalysis } from '../utils/storage';
import { CheckCircle2, ArrowLeft, Calendar, Lightbulb, Download, Copy, Check, AlertCircle } from 'lucide-react';

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({});
  const [liveScore, setLiveScore] = useState(0);
  const [copiedItem, setCopiedItem] = useState(null);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      if (data) {
        setAnalysis(data);
        setSkillConfidenceMap(data.skillConfidenceMap || {});
        setLiveScore(data.liveReadinessScore || data.readinessScore);
      } else {
        navigate('/app/analyze');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    if (analysis) {
      // Calculate live score based on skill confidence
      let score = analysis.readinessScore;
      Object.values(skillConfidenceMap).forEach(confidence => {
        if (confidence === 'know') score += 2;
        if (confidence === 'practice') score -= 2;
      });
      const boundedScore = Math.max(0, Math.min(100, score));
      setLiveScore(boundedScore);

      // Save to localStorage
      updateAnalysis(id, {
        skillConfidenceMap,
        liveReadinessScore: boundedScore
      });
    }
  }, [skillConfidenceMap, analysis, id]);

  const toggleSkillConfidence = (skill) => {
    setSkillConfidenceMap(prev => {
      const current = prev[skill] || 'practice';
      return {
        ...prev,
        [skill]: current === 'practice' ? 'know' : 'practice'
      };
    });
  };

  const copyToClipboard = async (text, itemName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generate7DayPlanText = () => {
    return analysis.plan.map((day, idx) => 
      `${day.day}: ${day.title}\n${day.tasks.map(t => `  • ${t}`).join('\n')}`
    ).join('\n\n');
  };

  const generateChecklistText = () => {
    return Object.entries(analysis.checklist).map(([round, items]) =>
      `${round}\n${items.map(item => `  ☐ ${item}`).join('\n')}`
    ).join('\n\n');
  };

  const generateQuestionsText = () => {
    return analysis.questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');
  };

  const downloadAsText = () => {
    const content = `
PLACEMENT READINESS ANALYSIS
${analysis.company} - ${analysis.role}
Generated: ${new Date(analysis.createdAt).toLocaleString()}
Readiness Score: ${liveScore}/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY SKILLS EXTRACTED
${Object.entries(analysis.extractedSkills).map(([cat, skills]) => 
  `${cat}:\n  ${skills.join(', ')}`
).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROUND-WISE PREPARATION CHECKLIST
${generateChecklistText()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7-DAY PREPARATION PLAN
${generate7DayPlanText()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10 LIKELY INTERVIEW QUESTIONS
${generateQuestionsText()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${analysis.company}_${analysis.role}_prep_plan.txt`.replace(/\s+/g, '_');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getWeakSkills = () => {
    const weak = [];
    Object.entries(analysis.extractedSkills).forEach(([category, skills]) => {
      skills.forEach(skill => {
        if (skillConfidenceMap[skill] === 'practice' || !skillConfidenceMap[skill]) {
          weak.push(skill);
        }
      });
    });
    return weak.slice(0, 3);
  };

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (liveScore / 100) * circumference;
  const weakSkills = getWeakSkills();

  return (
    <div className="max-w-6xl">
      <button
        onClick={() => navigate('/app/history')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to History
      </button>

      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {analysis.company || 'Company'} - {analysis.role || 'Role'}
            </h1>
            <p className="text-gray-600">
              Analyzed on {new Date(analysis.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="60" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="hsl(245, 58%, 51%)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{liveScore}</span>
                <span className="text-xs text-gray-500">Live Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => copyToClipboard(generate7DayPlanText(), '7day')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            {copiedItem === '7day' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy 7-Day Plan
          </button>
          <button
            onClick={() => copyToClipboard(generateChecklistText(), 'checklist')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            {copiedItem === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Round Checklist
          </button>
          <button
            onClick={() => copyToClipboard(generateQuestionsText(), 'questions')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            {copiedItem === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy 10 Questions
          </button>
          <button
            onClick={downloadAsText}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download as TXT
          </button>
        </div>
      </div>

      {/* Key Skills Extracted - Interactive */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Skills Extracted</h2>
        <p className="text-sm text-gray-600 mb-4">Click skills to mark your confidence level</p>
        <div className="space-y-4">
          {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const confidence = skillConfidenceMap[skill] || 'practice';
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleSkillConfidence(skill)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        confidence === 'know'
                          ? 'bg-green-100 text-green-700 border-2 border-green-500'
                          : 'bg-amber-50 text-amber-700 border-2 border-amber-300'
                      }`}
                    >
                      {skill}
                      <span className="ml-2 text-xs">
                        {confidence === 'know' ? '✓ Know' : '⚠ Practice'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Round-wise Preparation Checklist */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Round-wise Preparation Checklist</h2>
        <div className="space-y-6">
          {Object.entries(analysis.checklist).map(([round, items]) => (
            <div key={round}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{round}</h3>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Preparation Plan */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">7-Day Preparation Plan</h2>
        </div>
        <div className="space-y-4">
          {analysis.plan.map((dayPlan, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{dayPlan.day}</h3>
                  <p className="text-sm text-gray-600">{dayPlan.title}</p>
                </div>
              </div>
              <ul className="ml-15 space-y-1">
                {dayPlan.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="text-gray-700 text-sm">• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Likely Interview Questions */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">10 Likely Interview Questions</h2>
        </div>
        <div className="space-y-3">
          {analysis.questions.map((question, idx) => (
            <div key={idx} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="font-bold text-primary">{idx + 1}.</span>
              <p className="text-gray-800">{question}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <div className="bg-indigo-50 border-2 border-primary p-8 rounded-lg shadow">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Action Next</h2>
              <p className="text-gray-700 mb-4">Focus on these areas to improve your readiness:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {weakSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-lg font-semibold text-primary">
                💡 Start Day 1 plan now.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
