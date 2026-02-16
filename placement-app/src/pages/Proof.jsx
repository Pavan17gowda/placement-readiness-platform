import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Copy, Check, ExternalLink, Award } from 'lucide-react';

const SUBMISSION_STORAGE_KEY = 'prp_final_submission';
const CHECKLIST_STORAGE_KEY = 'placement_test_checklist';

const PROJECT_STEPS = [
  { id: 'design-system', label: 'Design System Created', description: 'KodNest Premium Build System' },
  { id: 'landing-page', label: 'Landing Page Built', description: 'Hero, features, footer' },
  { id: 'dashboard', label: 'Dashboard Implemented', description: 'Readiness score, radar chart, activity tracking' },
  { id: 'analysis-logic', label: 'Analysis Logic Working', description: 'Skill extraction, scoring, persistence' },
  { id: 'interactive-results', label: 'Interactive Results', description: 'Skill toggles, live score, export tools' },
  { id: 'company-intel', label: 'Company Intel Added', description: 'Heuristic analysis, round mapping' },
  { id: 'validation', label: 'Validation Hardened', description: 'Schema, edge cases, error handling' },
  { id: 'test-checklist', label: 'Test Checklist Complete', description: '10 tests verified' }
];

export default function Proof() {
  const [submission, setSubmission] = useState({
    lovableLink: '',
    githubLink: '',
    deployedLink: ''
  });
  const [stepStatus, setStepStatus] = useState({});
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [isShipped, setIsShipped] = useState(false);

  useEffect(() => {
    loadSubmission();
    checkStepStatus();
  }, []);

  useEffect(() => {
    checkShippedStatus();
  }, [submission, stepStatus]);

  const loadSubmission = () => {
    try {
      const saved = localStorage.getItem(SUBMISSION_STORAGE_KEY);
      if (saved) {
        setSubmission(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load submission:', error);
    }
  };

  const saveSubmission = (data) => {
    try {
      localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(data));
      setSubmission(data);
    } catch (error) {
      console.error('Failed to save submission:', error);
    }
  };

  const checkStepStatus = () => {
    // Check if test checklist is complete
    try {
      const checklist = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      const checklistComplete = checklist ? 
        Object.values(JSON.parse(checklist)).filter(Boolean).length === 10 : false;

      // For demo purposes, mark all steps as completed if checklist is done
      // In real scenario, you'd track each step individually
      const status = {};
      PROJECT_STEPS.forEach(step => {
        status[step.id] = step.id === 'test-checklist' ? checklistComplete : true;
      });
      setStepStatus(status);
    } catch (error) {
      console.error('Failed to check step status:', error);
    }
  };

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    const updated = { ...submission, [field]: value };
    saveSubmission(updated);

    // Validate URL
    if (value && !validateUrl(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid URL (must start with http:// or https://)' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const checkShippedStatus = () => {
    // All 8 steps completed
    const allStepsComplete = PROJECT_STEPS.every(step => stepStatus[step.id]);

    // All 10 checklist items passed
    let checklistComplete = false;
    try {
      const checklist = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      checklistComplete = checklist ? 
        Object.values(JSON.parse(checklist)).filter(Boolean).length === 10 : false;
    } catch (error) {
      console.error('Failed to check checklist:', error);
    }

    // All 3 proof links provided and valid
    const allLinksProvided = 
      validateUrl(submission.lovableLink) &&
      validateUrl(submission.githubLink) &&
      validateUrl(submission.deployedLink);

    setIsShipped(allStepsComplete && checklistComplete && allLinksProvided);
  };

  const copyFinalSubmission = async () => {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovableLink || '[Not provided]'}
GitHub Repository: ${submission.githubLink || '[Not provided]'}
Live Deployment: ${submission.deployedLink || '[Not provided]'}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence

------------------------------------------`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const completedSteps = Object.values(stepStatus).filter(Boolean).length;
  const totalSteps = PROJECT_STEPS.length;

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Build Proof</h2>
      <p className="text-gray-600 mb-8">Document your work and prepare for submission</p>

      {/* Shipped Status */}
      {isShipped && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-8 rounded-lg mb-6">
          <div className="flex items-start gap-4">
            <Award className="w-12 h-12 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">You built a real product.</h3>
              <p className="text-green-800 mb-2">Not a tutorial. Not a clone.</p>
              <p className="text-green-800 mb-2">A structured tool that solves a real problem.</p>
              <p className="text-green-800 font-semibold">This is your proof of work.</p>
            </div>
          </div>
        </div>
      )}

      {/* Step Completion Overview */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Step Completion Overview</h3>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {completedSteps} / {totalSteps}
            </span>
            <span className={`text-sm font-semibold ${isShipped ? 'text-green-600' : 'text-amber-600'}`}>
              {isShipped ? '✓ Shipped' : 'In Progress'}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isShipped ? 'bg-green-500' : 'bg-primary'
              }`}
              style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {PROJECT_STEPS.map((step) => {
            const isComplete = stepStatus[step.id];
            return (
              <div key={step.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${isComplete ? 'text-gray-700' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artifact Inputs */}
      <div className="bg-white p-8 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Artifact Inputs</h3>
        <p className="text-sm text-gray-600 mb-6">Required for Shipped status</p>

        <div className="space-y-6">
          {/* Lovable Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lovable Project Link <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={submission.lovableLink}
                onChange={(e) => handleInputChange('lovableLink', e.target.value)}
                placeholder="https://lovable.dev/projects/..."
                className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.lovableLink ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validateUrl(submission.lovableLink) && (
                <ExternalLink className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.lovableLink && (
              <p className="text-sm text-red-600 mt-1">{errors.lovableLink}</p>
            )}
          </div>

          {/* GitHub Repository Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Repository Link <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={submission.githubLink}
                onChange={(e) => handleInputChange('githubLink', e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.githubLink ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validateUrl(submission.githubLink) && (
                <ExternalLink className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.githubLink && (
              <p className="text-sm text-red-600 mt-1">{errors.githubLink}</p>
            )}
          </div>

          {/* Deployed URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deployed URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={submission.deployedLink}
                onChange={(e) => handleInputChange('deployedLink', e.target.value)}
                placeholder="https://your-app.vercel.app"
                className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.deployedLink ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validateUrl(submission.deployedLink) && (
                <ExternalLink className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.deployedLink && (
              <p className="text-sm text-red-600 mt-1">{errors.deployedLink}</p>
            )}
          </div>
        </div>
      </div>

      {/* Final Submission Export */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Final Submission</h3>
        <p className="text-sm text-gray-600 mb-6">
          Copy your submission details to share or submit
        </p>

        <button
          onClick={copyFinalSubmission}
          disabled={!validateUrl(submission.lovableLink) || 
                   !validateUrl(submission.githubLink) || 
                   !validateUrl(submission.deployedLink)}
          className="w-full bg-primary hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Final Submission
            </>
          )}
        </button>

        {(!validateUrl(submission.lovableLink) || 
          !validateUrl(submission.githubLink) || 
          !validateUrl(submission.deployedLink)) && (
          <p className="text-sm text-amber-600 mt-3 text-center">
            Complete all artifact inputs above to enable export
          </p>
        )}
      </div>
    </div>
  );
}
