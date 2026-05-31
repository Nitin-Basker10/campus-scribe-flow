import { useStore } from '../store';
import { 
  Home, Compass, Users, Calendar, Bell, User, Shield, 
  LogOut, PenSquare, GraduationCap, TrendingUp 
} from 'lucide-react';
import type { TabType } from '../types';

export default function Sidebar() {
  const { currentUser, activeTab, setActiveTab, logout, setComposeOpen, getUnreadNotificationCount } = useStore();
  
  if (!currentUser) return null;
  
  const unreadCount = getUnreadNotificationCount();
  
  const navItems: { tab: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { tab: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { tab: 'explore', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { tab: 'clubs', label: 'Clubs', icon: <Users className="w-5 h-5" /> },
    { tab: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { tab: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, badge: unreadCount },
    { tab: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];
  
  if (currentUser.role === 'admin') {
    navItems.push({ tab: 'admin', label: 'Admin Panel', icon: <Shield className="w-5 h-5" /> });
  }
  
  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-white border-r border-slate-200 max-lg:w-20">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div className="max-lg:hidden">
          <h1 className="font-bold text-slate-900 text-lg leading-tight">CampusConnect</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">College Hub</p>
        </div>
      </div>
      
      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group ${
              activeTab === item.tab
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`flex-shrink-0 ${activeTab === item.tab ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {item.icon}
            </span>
            <span className="max-lg:hidden">{item.label}</span>
            {item.badge ? (
              <span className="absolute right-3 max-lg:right-1 max-lg:top-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
            {activeTab === item.tab && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />
            )}
          </button>
        ))}
      </nav>
      
      {/* Trending */}
      <div className="p-3 border-t border-slate-100 max-lg:hidden">
        <div className="bg-slate-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Trending
          </div>
          {['#Hackathon2025', '#GameDay', '#MidSem'].map(tag => (
            <button key={tag} className="block text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline">
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Compose Button */}
      <div className="p-3 max-lg:px-2">
        <button
          onClick={() => setComposeOpen(true)}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-3 rounded-xl font-semibold shadow-md shadow-primary-500/25 hover:shadow-primary-500/40 transition-all flex items-center justify-center gap-2"
        >
          <PenSquare className="w-4 h-4" />
          <span className="max-lg:hidden">Post</span>
        </button>
      </div>
      
      {/* User */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-slate-100" />
          <div className="flex-1 min-w-0 max-lg:hidden">
            <p className="text-sm font-semibold text-slate-900 truncate flex items-center gap-1">
              {currentUser.displayName}
              {currentUser.verified && <span className="text-primary-500 text-xs">✓</span>}
            </p>
            <p className="text-xs text-slate-400 truncate">@{currentUser.username}</p>
          </div>
          <button
            onClick={logout}
            className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
