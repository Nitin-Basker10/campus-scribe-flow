import { useState } from 'react';
import { useStore } from '../store';
import PostCard from './PostCard';
import { Search, TrendingUp, Hash, X } from 'lucide-react';

export default function Explore() {
  const { posts, searchQuery, setSearchQuery, clubs, users } = useStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };
  
  // Get all tags with counts
  const tagCounts: Record<string, number> = {};
  posts.forEach(p => p.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const trendingTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  // Search results
  const isSearching = searchQuery.trim().length > 0;
  const q = searchQuery.toLowerCase();
  
  const matchedPosts = isSearching
    ? posts.filter(p => !p.parentId && (p.content.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))))
    : [];
  
  const matchedUsers = isSearching
    ? users.filter(u => u.displayName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q))
    : [];
  
  const matchedClubs = isSearching
    ? clubs.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : [];
  
  // Popular posts (most liked)
  const popularPosts = [...posts]
    .filter(p => !p.parentId)
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 10);
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Explore</h2>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => { setLocalSearch(e.target.value); if (!e.target.value) setSearchQuery(''); }}
            placeholder="Search posts, people, clubs..."
            className="w-full bg-slate-100 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/30 border border-transparent focus:border-primary-400 transition-all"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => { setLocalSearch(''); setSearchQuery(''); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>
      
      {isSearching ? (
        <div className="p-4 space-y-4">
          {/* Search Results */}
          {matchedUsers.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">People</h3>
              <div className="space-y-2">
                {matchedUsers.map(user => (
                  <UserResultCard key={user.id} userId={user.id} />
                ))}
              </div>
            </div>
          )}
          
          {matchedClubs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Clubs</h3>
              <div className="space-y-2">
                {matchedClubs.map(club => (
                  <div key={club.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <img src={club.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{club.name}</p>
                      <p className="text-xs text-slate-500">{club.members.length} members · {club.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {matchedPosts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Posts</h3>
              {matchedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          {matchedUsers.length === 0 && matchedClubs.length === 0 && matchedPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Trending */}
          <div className="p-4">
            <div className="bg-slate-50 rounded-2xl p-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Trending on Campus
              </h3>
              <div className="space-y-3">
                {trendingTags.map(([tag, count], i) => (
                  <button
                    key={tag}
                    onClick={() => { setLocalSearch(tag); setSearchQuery(tag); }}
                    className="w-full flex items-center gap-3 text-left hover:bg-white p-2 rounded-xl transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-800 group-hover:text-primary-600 flex items-center gap-1">
                        <Hash className="w-3.5 h-3.5" />
                        {tag}
                      </p>
                      <p className="text-xs text-slate-400">{count} post{count > 1 ? 's' : ''}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Popular Posts */}
          <div className="border-t border-slate-100">
            <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-slate-900">Popular Posts</h3>
            {popularPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UserResultCard({ userId }: { userId: string }) {
  const { getUserById, setSelectedProfile, setActiveTab } = useStore();
  const user = getUserById(userId);
  if (!user) return null;
  
  return (
    <button
      onClick={() => { setSelectedProfile(user.id); setActiveTab('profile'); }}
      className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left"
    >
      <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-slate-900 truncate">{user.displayName}</p>
        <p className="text-xs text-slate-500 truncate">@{user.username} · {user.department}</p>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        user.role === 'admin' ? 'bg-red-50 text-red-600' :
        user.role === 'club_leader' ? 'bg-amber-50 text-amber-600' :
        'bg-slate-100 text-slate-500'
      }`}>
        {user.role === 'admin' ? 'Admin' : user.role === 'club_leader' ? 'Leader' : 'Student'}
      </span>
    </button>
  );
}
