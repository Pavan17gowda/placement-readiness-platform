import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisById } from '../utils/storage';
import { CheckCircle2, ArrowLeft, Calendar, Lightbulb } from 'lucide-react';

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      if (data) {
        setAnalysis(data);
      } else {
        navigate('/app/analyze');
      }
    }
  }, [id, navigate]);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (analysis.readinessScore / 100) * circumference;

  return (
    <div className="max-w-6xl">
      <button
        onClick={() => navigate('/app/history')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
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
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{analysis.readinessScore}</span>
                <span className="text-xs text-gray-500">Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Skills Extracted */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Skills Extracted</h2>
        <div className="space-y-4">
          {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
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
    </div>
  );
}
