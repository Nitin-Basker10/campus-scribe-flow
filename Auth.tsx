import { useState } from 'react';
import { useStore } from '../store';
import { GraduationCap, Mail, Lock, User, BookOpen, Hash, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import type { UserRole } from '../types';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, authError } = useStore();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('student');
  const [regDepartment, setRegDepartment] = useState('');
  const [regYear, setRegYear] = useState<number | ''>('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      username: regUsername,
      displayName: regDisplayName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      department: regDepartment,
      year: regYear || undefined,
    });
  };

  const demoAccounts = [
    { label: 'Admin', email: 'admin@campus.edu', password: 'admin123', icon: '🛡️' },
    { label: 'Club Leader (Alex)', email: 'alex@campus.edu', password: 'pass123', icon: '👑' },
    { label: 'Student (Priya)', email: 'priya@campus.edu', password: 'pass123', icon: '🎓' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-campus-dark to-campus-darker flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left - Branding */}
        <div className="text-white space-y-6 px-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">CampusConnect</h1>
              <p className="text-primary-300 text-sm">Your College, Your Voice</p>
            </div>
          </div>
          
          <div className="space-y-4 text-lg text-slate-300">
            <p className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
              <span>Stay updated with official college announcements and news</span>
            </p>
            <p className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
              <span>Join clubs, discover events, and connect with fellow students</span>
            </p>
            <p className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
              <span>Share your thoughts, engage in discussions, and build your network</span>
            </p>
          </div>
          
          {/* Demo Accounts */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3">
            <p className="text-sm text-slate-400 font-medium">Quick Demo Login:</p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => {
                    setMode('login');
                    setLoginEmail(acc.email);
                    setLoginPassword(acc.password);
                    login(acc.email, acc.password);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group"
                >
                  <span className="text-xl">{acc.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{acc.label}</p>
                    <p className="text-xs text-slate-400">{acc.email}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right - Form */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex mb-8 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                mode === 'login' 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                mode === 'register' 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-in">
              {authError}
            </div>
          )}
          
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-400 font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@campus.edu"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm text-slate-400 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Username</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="username"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={regDisplayName}
                      onChange={(e) => setRegDisplayName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@campus.edu"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    minLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Department</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      placeholder="e.g. CS"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Year</label>
                  <select
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-all"
                  >
                    <option value="" className="bg-slate-800">Select</option>
                    <option value="1" className="bg-slate-800">1st Year</option>
                    <option value="2" className="bg-slate-800">2nd Year</option>
                    <option value="3" className="bg-slate-800">3rd Year</option>
                    <option value="4" className="bg-slate-800">4th Year</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Account Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['student', 'club_leader', 'admin'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setRegRole(role)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                        regRole === role
                          ? 'bg-primary-600/20 border-primary-500 text-primary-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {role === 'student' ? '🎓 Student' : role === 'club_leader' ? '👑 Club Leader' : '🛡️ Admin'}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
