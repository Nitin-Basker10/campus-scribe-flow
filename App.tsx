import { useStore } from './store';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Clubs from './components/Clubs';
import Events from './components/Events';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import ComposeModal from './components/ComposeModal';
import MobileNav from './components/MobileNav';

function MainContent() {
  const { activeTab } = useStore();
  
  switch (activeTab) {
    case 'home':
      return <Feed />;
    case 'explore':
      return <Explore />;
    case 'clubs':
      return <Clubs />;
    case 'events':
      return <Events />;
    case 'notifications':
      return <Notifications />;
    case 'profile':
      return <Profile />;
    case 'admin':
      return <AdminPanel />;
    default:
      return <Feed />;
  }
}

export default function App() {
  const { isAuthenticated } = useStore();
  
  if (!isAuthenticated) {
    return <Auth />;
  }
  
  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 max-w-2xl border-r border-slate-200 pb-16 lg:pb-0">
        <MainContent />
      </main>
      
      {/* Right Sidebar */}
      <RightSidebar />
      
      {/* Compose Modal */}
      <ComposeModal />
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
