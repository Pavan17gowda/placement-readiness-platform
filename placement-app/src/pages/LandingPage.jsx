import { useNavigate } from 'react-router-dom';
import { Code, Video, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges across multiple difficulty levels',
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with AI-powered feedback',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Ace Your Placement
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Practice, assess, and prepare for your dream job
        </p>
        <button
          onClick={() => navigate('/app')}
          className="bg-primary hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          Get Started
        </button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Placement Readiness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
