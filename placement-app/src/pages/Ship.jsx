import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Rocket, CheckCircle2 } from 'lucide-react';

const CHECKLIST_STORAGE_KEY = 'placement_test_checklist';

export default function Ship() {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(true);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {
    checkShipStatus();
  }, []);

  const checkShipStatus = () => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const checklist = JSON.parse(saved);
        const passed = Object.values(checklist).filter(Boolean).length;
        setPassedCount(passed);
        setIsLocked(passed < 10);
      } else {
        setIsLocked(true);
        setPassedCount(0);
      }
    } catch (error) {
      console.error('Failed to check ship status:', error);
      setIsLocked(true);
    }
  };

  if (isLocked) {
    return (
      <div className="max-w-4xl">
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <Lock className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Locked</h2>
          <p className="text-gray-600 mb-6">
            Complete all 10 tests in the Test Checklist before shipping.
          </p>
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-700">
              Tests Passed: <span className="text-primary">{passedCount} / 10</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {10 - passedCount} tests remaining
            </p>
          </div>
          <button
            onClick={() => navigate('/app/test-checklist')}
            className="bg-primary hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Test Checklist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="bg-white p-12 rounded-lg shadow text-center">
        <Rocket className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Ship! 🚀</h2>
        <p className="text-gray-600 mb-8">
          All tests have passed. Your Placement Readiness Platform is ready for deployment.
        </p>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-green-900">All Systems Go</h3>
          </div>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <p className="text-sm text-green-800">✓ Input validation working</p>
            <p className="text-sm text-green-800">✓ Skill extraction verified</p>
            <p className="text-sm text-green-800">✓ Round mapping dynamic</p>
            <p className="text-sm text-green-800">✓ Score calculation accurate</p>
            <p className="text-sm text-green-800">✓ Data persistence confirmed</p>
            <p className="text-sm text-green-800">✓ Export functionality tested</p>
            <p className="text-sm text-green-800">✓ No console errors</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">Deployment Checklist</h3>
          <div className="text-left max-w-2xl mx-auto space-y-3 text-sm text-gray-700">
            <p>□ Review environment variables</p>
            <p>□ Run production build: <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code></p>
            <p>□ Test production build locally</p>
            <p>□ Deploy to hosting platform (Vercel, Netlify, etc.)</p>
            <p>□ Verify deployed site functionality</p>
            <p>□ Set up analytics (optional)</p>
            <p>□ Configure custom domain (optional)</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built with React, Tailwind CSS, and Recharts
          </p>
        </div>
      </div>
    </div>
  );
}
