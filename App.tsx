
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Overview';
import Tutor from './components/AI/Tutor';
import SyllabusLibrary from './components/Study/SyllabusLibrary';
import StudyHub from './components/Study/StudyHub';
import GroupStudy from './components/Study/GroupStudy';
import ProgressTracker from './components/Analysis/ProgressTracker';
import ResearchHelp from './components/Study/ResearchHelp';
import CareerExpert from './components/Career/CareerExpert';
import AssignmentPro from './components/Study/AssignmentPro';
import { User, AppLanguage } from './types';
import { authService } from './services/authService';

const LANGUAGES: AppLanguage[] = ['English', 'Hindi', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Gujarati', 'Kannada', 'Urdu'];

const Sidebar: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'AI Smart Tutor', path: '/ai-tutor', icon: '🤖' },
    { name: 'Assignment Pro', path: '/assignment', icon: '📝' },
    { name: 'Syllabus & Trends', path: '/syllabus', icon: '📈' },
    { name: 'Career Navigator', path: '/career', icon: '🚀' },
    { name: 'Study Hub', path: '/study-hub', icon: '🧠' },
    { name: 'Group Study', path: '/groups', icon: '👥' },
    { name: 'Analytics', path: '/progress', icon: '📊' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col p-4 overflow-y-auto shadow-2xl shadow-slate-200/50">
      <div className="mb-8 flex items-center space-x-3 px-2">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">S</div>
        <span className="text-xl font-black text-slate-800">StudyMate <span className="text-indigo-600">AI</span></span>
      </div>
      
      <nav className="flex-grow space-y-1.5">
        {menuItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
              location.pathname === item.path ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-6">
        <div className="p-4 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level {user.level || 1}</p>
            <p className="text-[10px] font-bold text-indigo-600">{user.xp || 0} XP</p>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-indigo-600 h-full w-[45%]"></div>
          </div>
          <p className="text-sm font-bold text-slate-800 truncate">{user.fullName}</p>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
        >
          <span>🚪</span>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const current = authService.getCurrentUser();
    if (current) setUser(current);
  }, []);

  const handleLanguageChange = (lang: AppLanguage) => {
    if (user) {
      const updated = { ...user, preferredLanguage: lang };
      setUser(updated);
      authService.updateUser(user.userId, { preferredLanguage: lang });
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="flex bg-slate-50 min-h-screen">
        {user && <Sidebar user={user} onLogout={handleLogout} />}
        
        <div className="flex-grow flex flex-col">
          {user && (
            <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
              <div className="flex items-center space-x-3">
                <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">{user.courseLevel}</span>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-bold text-slate-600">{user.branch}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400">Cognitive Style:</span>
                  <span className="text-xs font-black text-indigo-600">{user.learningStyle || 'Analyzing...'}</span>
                </div>
                <select 
                  className="bg-slate-100 text-xs font-black text-slate-600 outline-none px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-200 transition-all border-none"
                  value={user.preferredLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as AppLanguage)}
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <div className="w-10 h-10 bg-indigo-100 rounded-full border-2 border-white flex items-center justify-center text-sm shadow-sm">👤</div>
              </div>
            </header>
          )}

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />} />
              <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
              <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/ai-tutor" element={user ? <Tutor user={user} /> : <Navigate to="/login" />} />
              <Route path="/assignment" element={user ? <AssignmentPro user={user} /> : <Navigate to="/login" />} />
              <Route path="/syllabus" element={user ? <SyllabusLibrary user={user} /> : <Navigate to="/login" />} />
              <Route path="/career" element={user ? <CareerExpert user={user} /> : <Navigate to="/login" />} />
              <Route path="/study-hub" element={user ? <StudyHub user={user} /> : <Navigate to="/login" />} />
              <Route path="/groups" element={user ? <GroupStudy user={user} /> : <Navigate to="/login" />} />
              <Route path="/progress" element={user ? <ProgressTracker user={user} /> : <Navigate to="/login" />} />
              <Route path="/research" element={user ? <ResearchHelp user={user} /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
