import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { extractSkills, generateChecklist, generate7DayPlan, generateInterviewQuestions, calculateReadinessScore } from '../utils/skillExtractor';
import { generateCompanyIntel } from '../utils/companyIntel';
import { saveAnalysis } from '../utils/storage';

export default function Analyze() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis delay for better UX
    setTimeout(() => {
      const extractedSkills = extractSkills(formData.jdText);
      const checklist = generateChecklist(extractedSkills);
      const plan = generate7DayPlan(extractedSkills);
      const questions = generateInterviewQuestions(extractedSkills);
      const readinessScore = calculateReadinessScore(
        formData.jdText,
        formData.company,
        formData.role,
        extractedSkills
      );
      const companyIntel = generateCompanyIntel(formData.company, formData.role, extractedSkills);

      const analysis = {
        company: formData.company,
        role: formData.role,
        jdText: formData.jdText,
        extractedSkills,
        checklist,
        plan,
        questions,
        readinessScore,
        companyIntel
      };

      const saved = saveAnalysis(analysis);
      setIsAnalyzing(false);
      navigate(`/app/results/${saved.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyze Job Description</h2>
      <p className="text-gray-600 mb-8">Paste the job description to get personalized preparation insights</p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., Google, Microsoft, Amazon"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., Software Engineer, Frontend Developer"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.jdText}
            onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
            required
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Paste the complete job description here..."
          />
          <p className="text-sm text-gray-500 mt-2">
            {formData.jdText.length} characters {formData.jdText.length > 800 && '✓ Detailed JD'}
          </p>
        </div>

        <button
          type="submit"
          disabled={!formData.jdText || isAnalyzing}
          className="w-full bg-primary hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze & Generate Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
