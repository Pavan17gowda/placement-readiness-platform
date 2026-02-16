import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, FileText, BookOpen, User, Sparkles, History, ClipboardCheck, Award, Rocket } from 'lucide-react';

export default function DashboardLayout() {
  const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/analyze', label: 'Analyze JD', icon: Sparkles },
    { path: '/app/history', label: 'History', icon: History },
    { path: '/app/practice', label: 'Practice', icon: Code },
    { path: '/app/assessments', label: 'Assessments', icon: FileText },
    { path: '/app/resources', label: 'Resources', icon: BookOpen },
    { path: '/app/profile', label: 'Profile', icon: User },
    { path: '/app/test-checklist', label: 'Test Checklist', icon: ClipboardCheck, divider: true },
    { path: '/app/proof', label: 'Proof', icon: Award },
    { path: '/app/ship', label: 'Ship', icon: Rocket },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Placement Prep</h2>
        </div>
        <nav className="px-4">
          {navItems.map((item) => (
            <div key={item.path}>
              {item.divider && <div className="my-2 border-t border-gray-200"></div>}
              <NavLink
                to={item.path}
                end={item.path === '/app'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Placement Prep</h1>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
