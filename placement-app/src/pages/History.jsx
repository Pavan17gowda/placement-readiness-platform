import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteAnalysis } from '../utils/storage';
import { Clock, Trash2, Eye } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(id);
      loadHistory();
    }
  };

  const handleView = (id) => {
    navigate(`/app/results/${id}`);
  };

  if (history.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Analysis History</h2>
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
          <p className="text-gray-600 mb-6">Start by analyzing a job description</p>
          <button
            onClick={() => navigate('/app/analyze')}
            className="bg-primary hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Analyze Job Description
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
        <button
          onClick={() => navigate('/app/analyze')}
          className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Analysis
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => handleView(item.id)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.company || 'Company'} - {item.role || 'Role'}
                  </h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
                    <span className="text-sm font-semibold text-primary">
                      Score: {item.readinessScore}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(item.extractedSkills).slice(0, 3).map(([category, skills]) => (
                    <span
                      key={category}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                    >
                      {category}: {skills.slice(0, 2).join(', ')}
                      {skills.length > 2 && '...'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(item.id);
                  }}
                  className="p-2 text-primary hover:bg-indigo-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
