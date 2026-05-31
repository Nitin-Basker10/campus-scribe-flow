import { useState } from 'react';
import { useStore } from '../store';
import { Users, Plus, Crown, BadgeCheck, ChevronRight, X, Layers } from 'lucide-react';
import type { ClubCategory } from '../types';
import ClubDetail from './ClubDetail';

const categoryConfig: Record<ClubCategory, { emoji: string; color: string; bg: string }> = {
  academic: { emoji: '📚', color: 'text-blue-600', bg: 'bg-blue-50' },
  cultural: { emoji: '🎭', color: 'text-purple-600', bg: 'bg-purple-50' },
  sports: { emoji: '⚽', color: 'text-green-600', bg: 'bg-green-50' },
  tech: { emoji: '💻', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  arts: { emoji: '🎨', color: 'text-pink-600', bg: 'bg-pink-50' },
  social: { emoji: '🤝', color: 'text-amber-600', bg: 'bg-amber-50' },
  other: { emoji: '✨', color: 'text-slate-600', bg: 'bg-slate-50' },
};

export default function Clubs() {
  const { clubs, currentUser, selectedClub, setSelectedClub, joinClub, leaveClub, getUserById, createClub } = useStore();
  const [filter, setFilter] = useState<ClubCategory | 'all' | 'my'>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');
  const [newClubCat, setNewClubCat] = useState<ClubCategory>('tech');
  
  if (!currentUser) return null;
  
  if (selectedClub) {
    return <ClubDetail clubId={selectedClub} />;
  }
  
  let filteredClubs = clubs;
  if (filter === 'my') {
    filteredClubs = clubs.filter(c => c.members.includes(currentUser.id));
  } else if (filter !== 'all') {
    filteredClubs = clubs.filter(c => c.category === filter);
  }
  
  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClubName.trim() || !newClubDesc.trim()) return;
    createClub({ name: newClubName, description: newClubDesc, category: newClubCat });
    setNewClubName('');
    setNewClubDesc('');
    setShowCreate(false);
  };
  
  const categories: (ClubCategory | 'all' | 'my')[] = ['all', 'my', 'tech', 'academic', 'cultural', 'sports', 'arts', 'social', 'other'];
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">Clubs & Organizations</h2>
          {(currentUser.role === 'club_leader' || currentUser.role === 'admin') && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Club
            </button>
          )}
        </div>
        
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? '🌟 All' : cat === 'my' ? '⭐ My Clubs' : `${categoryConfig[cat].emoji} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
            </button>
          ))}
        </div>
      </div>
      
      {/* Clubs Grid */}
      <div className="p-4 grid gap-3">
        {filteredClubs.length === 0 ? (
          <div className="text-center py-12">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">{filter === 'my' ? 'You haven\'t joined any clubs yet' : 'No clubs in this category'}</p>
          </div>
        ) : (
          filteredClubs.map(club => {
            const leader = getUserById(club.leaderId);
            const isMember = club.members.includes(currentUser.id);
            const isLeader = club.leaderId === currentUser.id;
            const cat = categoryConfig[club.category];
            
            return (
              <div
                key={club.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-slate-300 transition-all animate-fade-in"
              >
                <div className="flex items-start gap-4">
                  <img src={club.avatar} alt="" className="w-14 h-14 rounded-xl flex-shrink-0 border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => setSelectedClub(club.id)}
                        className="font-bold text-slate-900 hover:text-primary-600 transition-colors flex items-center gap-1"
                      >
                        {club.name}
                        {club.isOfficial && <BadgeCheck className="w-4 h-4 text-primary-500" />}
                      </button>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.bg} ${cat.color}`}>
                        {cat.emoji} {club.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{club.description}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {club.members.length} member{club.members.length !== 1 ? 's' : ''}
                      </span>
                      {leader && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          {leader.displayName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isLeader ? (
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium border border-amber-200">
                        Leader
                      </span>
                    ) : isMember ? (
                      <button
                        onClick={() => leaveClub(club.id)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-200"
                      >
                        Joined ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => joinClub(club.id)}
                        className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-500 transition-colors"
                      >
                        Join
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedClub(club.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Create Club Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Create New Club</h3>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateClub} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Club Name</label>
                <input
                  type="text"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  placeholder="e.g. Photography Club"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
                <textarea
                  value={newClubDesc}
                  onChange={(e) => setNewClubDesc(e.target.value)}
                  placeholder="What is this club about?"
                  required
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Category</label>
                <select
                  value={newClubCat}
                  onChange={(e) => setNewClubCat(e.target.value as ClubCategory)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400"
                >
                  {(Object.keys(categoryConfig) as ClubCategory[]).map(cat => (
                    <option key={cat} value={cat}>{categoryConfig[cat].emoji} {cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-500 transition-colors"
              >
                Create Club
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
