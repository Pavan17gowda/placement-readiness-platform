import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import History from './pages/History';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="history" element={<History />} />
          <Route path="test-checklist" element={<TestChecklist />} />
          <Route path="ship" element={<Ship />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
