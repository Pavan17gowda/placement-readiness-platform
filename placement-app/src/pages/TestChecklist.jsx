import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertTriangle, RotateCcw } from 'lucide-react';

const TEST_ITEMS = [
  {
    id: 'jd-validation',
    label: 'JD required validation works',
    hint: 'Go to /app/analyze, try submitting empty form. Should be blocked.'
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Paste JD with <200 chars. Should show amber warning message.'
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze JD with "React, Node.js, SQL". Check Results page shows grouped skills.'
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Amazon" (Enterprise) vs unknown company (Startup). Rounds should differ.'
  },
  {
    id: 'score-calculation',
    label: 'Score calculation is deterministic',
    hint: 'Same JD + company + role should always produce same base score.'
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On Results, click skill tags. Score should change immediately (+2 know, -2 practice).'
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, note score, refresh page. Should retain same state.'
  },
  {
    id: 'history-storage',
    label: 'History saves and loads correctly',
    hint: 'Create analysis, go to History, click entry. Should load full saved analysis.'
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click "Copy 7-day plan" and paste. Should contain formatted plan text.'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools Console. Navigate through app. Should have no red errors.'
  }
];

const STORAGE_KEY = 'placement_test_checklist';

export default function TestChecklist() {
  const [checklist, setChecklist] = useState({});
  const [showHints, setShowHints] = useState({});

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load checklist:', error);
    }
  };

  const saveChecklist = (newChecklist) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecklist));
      setChecklist(newChecklist);
    } catch (error) {
      console.error('Failed to save checklist:', error);
    }
  };

  const toggleItem = (id) => {
    const updated = {
      ...checklist,
      [id]: !checklist[id]
    };
    saveChecklist(updated);
  };

  const resetChecklist = () => {
    if (window.confirm('Are you sure you want to reset the test checklist?')) {
      saveChecklist({});
    }
  };

  const toggleHint = (id) => {
    setShowHints(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const passedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = TEST_ITEMS.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Checklist</h2>
      <p className="text-gray-600 mb-8">Verify all features before shipping</p>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Tests Passed: {passedCount} / {totalCount}
            </h3>
            {allPassed ? (
              <p className="text-green-600 font-medium mt-1">✓ All tests passed! Ready to ship.</p>
            ) : (
              <p className="text-amber-600 font-medium mt-1">⚠️ Fix issues before shipping.</p>
            )}
          </div>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Checklist
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              allPassed ? 'bg-green-500' : 'bg-primary'
            }`}
            style={{ width: `${(passedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Warning if not all passed */}
      {!allPassed && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Shipping Locked</p>
            <p className="text-sm text-amber-800">
              Complete all {totalCount} tests to unlock the ship route. {totalCount - passedCount} remaining.
            </p>
          </div>
        </div>
      )}

      {/* Test Items */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {TEST_ITEMS.map((item, index) => {
            const isChecked = checklist[item.id] || false;
            const showHint = showHints[item.id] || false;

            return (
              <div key={item.id} className="p-5">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-medium ${isChecked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {index + 1}. {item.label}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleHint(item.id)}
                        className="text-xs text-primary hover:text-indigo-700 font-medium ml-4"
                      >
                        {showHint ? 'Hide' : 'How to test'}
                      </button>
                    </div>

                    {showHint && (
                      <div className="mt-2 p-3 bg-indigo-50 rounded border border-indigo-100">
                        <p className="text-sm text-gray-700">{item.hint}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ship Status */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Next Step</h3>
        {allPassed ? (
          <p className="text-gray-700">
            All tests passed! You can now proceed to <span className="font-mono text-primary">/app/ship</span>
          </p>
        ) : (
          <p className="text-gray-700">
            Complete all tests above to unlock shipping. Route <span className="font-mono text-gray-500">/app/ship</span> is currently locked.
          </p>
        )}
      </div>
    </div>
  );
}
