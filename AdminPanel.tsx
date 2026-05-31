import { useState } from 'react';
import { useStore } from '../store';
import { Shield, Users, FileText, Calendar, TrendingUp, Megaphone, BarChart3, Activity } from 'lucide-react';

export default function AdminPanel() {
  const { currentUser, users, posts, clubs, events, createPost } = useStore();
  const [announcementText, setAnnouncementText] = useState('');
  
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="p-12 text-center">
        <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">Access Denied</h3>
        <p className="text-slate-400 mt-1">Only administrators can access this panel</p>
      </div>
    );
  }
  
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalLeaders = users.filter(u => u.role === 'club_leader').length;
  const totalPosts = posts.filter(p => !p.parentId).length;
  const totalAnnouncements = posts.filter(p => p.isAnnouncement).length;
  const totalEvents = events.length;
  const totalClubs = clubs.length;
  const officialClubs = clubs.filter(c => c.isOfficial).length;
  
  const handleAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    createPost(announcementText, { isAnnouncement: true });
    setAnnouncementText('');
  };
  
  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Posts', value: totalPosts, icon: FileText, color: 'from-purple-500 to-purple-600', change: '+28%' },
    { label: 'Active Clubs', value: totalClubs, icon: Activity, color: 'from-green-500 to-green-600', change: '+3' },
    { label: 'Events', value: totalEvents, icon: Calendar, color: 'from-amber-500 to-amber-600', change: '+5' },
  ];
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your campus community</p>
      </div>
      
      {/* Stats */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>
      
      {/* Quick Announcement */}
      <div className="mx-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-4 border border-primary-100">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
          <Megaphone className="w-4 h-4 text-primary-600" />
          Quick Announcement
        </h3>
        <form onSubmit={handleAnnouncement} className="space-y-3">
          <textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="Write an official announcement..."
            rows={3}
            className="w-full border border-primary-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 resize-none bg-white"
          />
          <button
            type="submit"
            disabled={!announcementText.trim()}
            className="px-5 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Publish Announcement
          </button>
        </form>
      </div>
      
      {/* Overview */}
      <div className="p-4 space-y-4">
        {/* Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary-600" />
            Community Breakdown
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Students</span>
                <span className="font-medium text-slate-900">{totalStudents}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(totalStudents / users.length) * 100}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Club Leaders</span>
                <span className="font-medium text-slate-900">{totalLeaders}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(totalLeaders / users.length) * 100}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Official Clubs</span>
                <span className="font-medium text-slate-900">{officialClubs} / {totalClubs}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(officialClubs / totalClubs) * 100}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Announcements</span>
                <span className="font-medium text-slate-900">{totalAnnouncements} / {totalPosts} posts</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(totalAnnouncements / Math.max(totalPosts, 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Users */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-primary-600" />
            Registered Users
          </h3>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{user.displayName}</p>
                  <p className="text-xs text-slate-400 truncate">@{user.username} · {user.department}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  user.role === 'admin' ? 'bg-red-50 text-red-600' :
                  user.role === 'club_leader' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {user.role === 'admin' ? 'Admin' : user.role === 'club_leader' ? 'Leader' : 'Student'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Engagement */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary-600" />
            Top Engaged Posts
          </h3>
          <div className="space-y-2">
            {[...posts]
              .filter(p => !p.parentId)
              .sort((a, b) => (b.likes.length + b.reposts.length + b.replies.length) - (a.likes.length + a.reposts.length + a.replies.length))
              .slice(0, 5)
              .map(post => {
                const author = useStore.getState().getUserById(post.authorId);
                return (
                  <div key={post.id} className="p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      {author && <img src={author.avatar} alt="" className="w-5 h-5 rounded-full" />}
                      <span className="text-xs text-slate-400">{author?.displayName}</span>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-1">{post.content}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-slate-400">❤️ {post.likes.length}</span>
                      <span className="text-xs text-slate-400">🔄 {post.reposts.length}</span>
                      <span className="text-xs text-slate-400">💬 {post.replies.length}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
