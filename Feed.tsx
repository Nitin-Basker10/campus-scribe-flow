import { useState } from 'react';
import { useStore } from '../store';
import PostCard from './PostCard';
import { Sparkles, Users, Megaphone } from 'lucide-react';

type FeedFilter = 'all' | 'following' | 'announcements';

export default function Feed() {
  const { posts, currentUser } = useStore();
  const [filter, setFilter] = useState<FeedFilter>('all');
  
  if (!currentUser) return null;
  
  // Get top-level posts (not replies)
  let feedPosts = posts.filter(p => !p.parentId);
  
  // Sort: pinned first, then by date
  feedPosts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Apply filter
  if (filter === 'following') {
    feedPosts = feedPosts.filter(p => currentUser.following.includes(p.authorId) || p.authorId === currentUser.id);
  } else if (filter === 'announcements') {
    feedPosts = feedPosts.filter(p => p.isAnnouncement);
  }
  
  const filters: { key: FeedFilter; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'For You', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'following', label: 'Following', icon: <Users className="w-4 h-4" /> },
    { key: 'announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
  ];
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <h2 className="px-4 pt-4 pb-2 text-xl font-bold text-slate-900">Home</h2>
        <div className="flex">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-all relative ${
                filter === f.key ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {f.icon}
              {f.label}
              {filter === f.key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Posts */}
      <div>
        {feedPosts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No posts yet</h3>
            <p className="text-slate-400 mt-1">
              {filter === 'following' ? 'Follow some people to see their posts here!' : 'Be the first to share something!'}
            </p>
          </div>
        ) : (
          feedPosts.map(post => (
            <PostCard key={post.id} post={post} showThread />
          ))
        )}
      </div>
    </div>
  );
}
