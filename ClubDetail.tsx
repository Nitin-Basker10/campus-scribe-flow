import { useStore } from '../store';
import PostCard from './PostCard';
import { ArrowLeft, Users, Crown, Calendar, BadgeCheck } from 'lucide-react';

interface ClubDetailProps {
  clubId: string;
}

export default function ClubDetail({ clubId }: ClubDetailProps) {
  const { clubs, posts, events, currentUser, getUserById, setSelectedClub, joinClub, leaveClub, setSelectedProfile, setActiveTab } = useStore();
  
  const club = clubs.find(c => c.id === clubId);
  if (!club || !currentUser) return null;
  
  const leader = getUserById(club.leaderId);
  const isMember = club.members.includes(currentUser.id);
  const isLeader = club.leaderId === currentUser.id;
  const clubPosts = posts.filter(p => p.clubId === clubId && !p.parentId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const clubEvents = events.filter(e => e.clubId === clubId);
  const memberUsers = club.members.map(id => getUserById(id)).filter(Boolean);
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedClub(null)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              {club.name}
              {club.isOfficial && <BadgeCheck className="w-5 h-5 text-primary-500" />}
            </h2>
            <p className="text-xs text-slate-400">{club.members.length} members</p>
          </div>
        </div>
      </div>
      
      {/* Club Info */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start gap-4 mb-4">
          <img src={club.avatar} alt="" className="w-16 h-16 rounded-2xl border-2 border-slate-100" />
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-relaxed">{club.description}</p>
            {leader && (
              <button
                onClick={() => { setSelectedProfile(leader.id); setActiveTab('profile'); }}
                className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 hover:text-primary-600"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                Led by <span className="font-medium">{leader.displayName}</span>
              </button>
            )}
          </div>
          
          {isLeader ? (
            <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium border border-amber-200">
              Leader
            </span>
          ) : isMember ? (
            <button
              onClick={() => leaveClub(club.id)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              Leave Club
            </button>
          ) : (
            <button
              onClick={() => joinClub(club.id)}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors"
            >
              Join Club
            </button>
          )}
        </div>
        
        {/* Members */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <div className="flex -space-x-2">
            {memberUsers.slice(0, 5).map(u => u && (
              <img key={u.id} src={u.avatar} alt="" className="w-7 h-7 rounded-full border-2 border-white" />
            ))}
          </div>
          {memberUsers.length > 5 && (
            <span className="text-xs text-slate-400 ml-1">+{memberUsers.length - 5} more</span>
          )}
        </div>
      </div>
      
      {/* Club Events */}
      {clubEvents.length > 0 && (
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-3">
            <Calendar className="w-4 h-4 text-primary-600" />
            Upcoming Events
          </h3>
          <div className="space-y-2">
            {clubEvents.map(event => (
              <div key={event.id} className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-3">
                <p className="font-semibold text-sm text-slate-900">{event.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  {' · '}{event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Club Posts */}
      <div>
        <h3 className="px-4 pt-4 pb-2 text-sm font-semibold text-slate-900">Club Posts</h3>
        {clubPosts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No posts in this club yet</div>
        ) : (
          clubPosts.map(post => <PostCard key={post.id} post={post} showThread />)
        )}
      </div>
    </div>
  );
}
