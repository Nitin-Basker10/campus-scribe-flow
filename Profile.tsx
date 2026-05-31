import { useState } from 'react';
import { useStore } from '../store';
import PostCard from './PostCard';
import { ArrowLeft, Calendar, BadgeCheck, BookOpen, Edit3, X, Crown } from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const { currentUser, selectedProfile, setSelectedProfile, getUserById, getPostsByUser, getClubsByUser, followUser, updateProfile } = useStore();
  const [activeSection, setActiveSection] = useState<'posts' | 'clubs' | 'likes'>('posts');
  const [editMode, setEditMode] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [editDisplayName, setEditDisplayName] = useState('');
  
  if (!currentUser) return null;
  
  const profileId = selectedProfile || currentUser.id;
  const user = getUserById(profileId);
  if (!user) return null;
  
  const isOwnProfile = user.id === currentUser.id;
  const isFollowing = currentUser.following.includes(user.id);
  const userPosts = getPostsByUser(user.id);
  const userClubs = getClubsByUser(user.id);
  const { posts } = useStore();
  const likedPosts = posts.filter(p => p.likes.includes(user.id) && !p.parentId);
  
  const handleSaveProfile = () => {
    updateProfile({
      bio: editBio,
      displayName: editDisplayName,
    });
    setEditMode(false);
  };
  
  const startEdit = () => {
    setEditBio(user.bio);
    setEditDisplayName(user.displayName);
    setEditMode(true);
  };
  
  const roleLabel = user.role === 'admin' ? '🛡️ Administrator' : user.role === 'club_leader' ? '👑 Club Leader' : '🎓 Student';
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          {selectedProfile && (
            <button onClick={() => setSelectedProfile(null)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              {user.displayName}
              {user.verified && <BadgeCheck className="w-5 h-5 text-primary-500" />}
            </h2>
            <p className="text-xs text-slate-400">{userPosts.length} posts</p>
          </div>
        </div>
      </div>
      
      {/* Cover + Avatar */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500" />
        <div className="px-4 -mt-12 flex items-end justify-between">
          <img src={user.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
          <div className="pb-2">
            {isOwnProfile ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => followUser(user.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isFollowing
                    ? 'bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600'
                    : 'bg-primary-600 text-white hover:bg-primary-500'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="px-4 pt-3 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
          {user.displayName}
          {user.verified && <BadgeCheck className="w-5 h-5 text-primary-500" />}
        </h3>
        <p className="text-sm text-slate-400">@{user.username}</p>
        
        {user.bio && <p className="text-sm text-slate-700 mt-2 leading-relaxed">{user.bio}</p>}
        
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {user.department}{user.year ? ` · Year ${user.year}` : ''}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Joined {format(new Date(user.createdAt), 'MMMM yyyy')}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            user.role === 'admin' ? 'bg-red-50 text-red-600' :
            user.role === 'club_leader' ? 'bg-amber-50 text-amber-600' :
            'bg-slate-100 text-slate-500'
          }`}>
            {roleLabel}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <span className="text-sm">
            <span className="font-bold text-slate-900">{user.following.length}</span>{' '}
            <span className="text-slate-400">Following</span>
          </span>
          <span className="text-sm">
            <span className="font-bold text-slate-900">{user.followers.length}</span>{' '}
            <span className="text-slate-400">Followers</span>
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        {(['posts', 'clubs', 'likes'] as const).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex-1 py-3 text-sm font-medium transition-all relative ${
              activeSection === section ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
            {activeSection === section && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div>
        {activeSection === 'posts' && (
          userPosts.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No posts yet</div>
          ) : (
            userPosts
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map(post => <PostCard key={post.id} post={post} showThread />)
          )
        )}
        
        {activeSection === 'clubs' && (
          userClubs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">Not a member of any clubs</div>
          ) : (
            <div className="p-4 space-y-2">
              {userClubs.map(club => (
                <div key={club.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <img src={club.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900 flex items-center gap-1">
                      {club.name}
                      {club.isOfficial && <BadgeCheck className="w-3.5 h-3.5 text-primary-500" />}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      {club.leaderId === user.id && <Crown className="w-3 h-3 text-amber-500" />}
                      {club.leaderId === user.id ? 'Leader' : 'Member'} · {club.members.length} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
        
        {activeSection === 'likes' && (
          likedPosts.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No liked posts</div>
          ) : (
            likedPosts
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map(post => <PostCard key={post.id} post={post} />)
          )
        )}
      </div>
      
      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setEditMode(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
              <button onClick={() => setEditMode(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 resize-none"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
