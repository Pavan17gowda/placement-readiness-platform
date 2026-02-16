export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Problems Solved</h3>
          <p className="text-4xl font-bold text-primary">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Mock Interviews</h3>
          <p className="text-4xl font-bold text-primary">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Success Rate</h3>
          <p className="text-4xl font-bold text-primary">78%</p>
        </div>
      </div>
    </div>
  );
}
