import { useStore } from '../store';
import { Home, Compass, Users, Calendar, Bell, PenSquare } from 'lucide-react';
import type { TabType } from '../types';

export default function MobileNav() {
  const { activeTab, setActiveTab, setComposeOpen, getUnreadNotificationCount } = useStore();
  const unread = getUnreadNotificationCount();
  
  const items: { tab: TabType; icon: React.ReactNode }[] = [
    { tab: 'home', icon: <Home className="w-5 h-5" /> },
    { tab: 'explore', icon: <Compass className="w-5 h-5" /> },
    { tab: 'clubs', icon: <Users className="w-5 h-5" /> },
    { tab: 'events', icon: <Calendar className="w-5 h-5" /> },
    { tab: 'notifications', icon: (
      <div className="relative">
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unread}
          </span>
        )}
      </div>
    )},
  ];
  
  return (
    <>
      {/* Floating compose button */}
      <button
        onClick={() => setComposeOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full shadow-xl shadow-primary-600/30 flex items-center justify-center hover:bg-primary-500 transition-all z-40 lg:hidden animate-pulse-glow"
      >
        <PenSquare className="w-6 h-6" />
      </button>
      
      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex z-40 lg:hidden safe-area-bottom">
        {items.map(item => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex-1 flex items-center justify-center py-3 transition-colors ${
              activeTab === item.tab ? 'text-primary-600' : 'text-slate-400'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </>
  );
}
