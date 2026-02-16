import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Dashboard() {
  const radarData = [
    { subject: 'DSA', score: 75, fullMark: 100 },
    { subject: 'System Design', score: 60, fullMark: 100 },
    { subject: 'Communication', score: 80, fullMark: 100 },
    { subject: 'Resume', score: 85, fullMark: 100 },
    { subject: 'Aptitude', score: 70, fullMark: 100 },
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activeDays = [true, true, false, true, true, false, false];

  const upcomingAssessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
  ];

  const readinessScore = 72;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Overall Readiness</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="70"
                  stroke="hsl(245, 58%, 51%)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-900">{readinessScore}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">Readiness Score</p>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 14 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(245, 58%, 51%)"
                fill="hsl(245, 58%, 51%)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Continue Practice */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Practice</h3>
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-800 mb-2">Dynamic Programming</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: '30%' }}
                />
              </div>
              <span className="text-sm text-gray-600 font-medium">3/10</span>
            </div>
          </div>
          <button className="w-full bg-primary hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goals</h3>
          <div className="mb-4">
            <p className="text-gray-700 mb-2 font-medium">Problems Solved: 12/20 this week</p>
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: '60%' }}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    activeDays[index]
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {day.slice(0, 1)}
                </div>
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
          <div className="space-y-3">
            {upcomingAssessments.map((assessment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">{assessment.title}</p>
                    <p className="text-sm text-gray-600">{assessment.time}</p>
                  </div>
                </div>
                <button className="text-primary hover:text-indigo-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
