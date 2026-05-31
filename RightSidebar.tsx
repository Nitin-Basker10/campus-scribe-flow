import { useStore } from '../store';
import { UserPlus, BadgeCheck, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function RightSidebar() {
  const { currentUser, users, events, clubs, followUser, setSelectedProfile, setActiveTab, attendEvent } = useStore();
  
  if (!currentUser) return null;
  
  // Who to follow (users not yet followed)
  const suggestions = users
    .filter(u => u.id !== currentUser.id && !currentUser.following.includes(u.id))
    .slice(0, 3);
  
  // Upcoming events
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  return (
    <aside className="w-80 h-screen sticky top-0 overflow-y-auto border-l border-slate-200 bg-slate-50/50 p-4 space-y-4 max-xl:hidden">
      {/* Who to follow */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-primary-600" />
            Who to Follow
          </h3>
          <div className="space-y-3">
            {suggestions.map(user => (
              <div key={user.id} className="flex items-center gap-3">
                <button onClick={() => { setSelectedProfile(user.id); setActiveTab('profile'); }}>
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full hover:ring-2 hover:ring-primary-200 transition-all" />
                </button>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => { setSelectedProfile(user.id); setActiveTab('profile'); }}
                    className="text-sm font-semibold text-slate-900 truncate hover:text-primary-600 transition-colors flex items-center gap-1"
                  >
                    {user.displayName}
                    {user.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary-500" />}
                  </button>
                  <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                </div>
                <button
                  onClick={() => followUser(user.id)}
                  className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium hover:bg-primary-500 transition-colors flex-shrink-0"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary-600" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => {
              const club = clubs.find(c => c.id === event.clubId);
              const isAttending = event.attendees.includes(currentUser.id);
              return (
                <div key={event.id} className="group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary-600 uppercase leading-none">
                        {format(new Date(event.date), 'MMM')}
                      </span>
                      <span className="text-sm font-bold text-primary-700 leading-none">
                        {format(new Date(event.date), 'd')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{event.title}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                      {club && (
                        <p className="text-xs text-primary-600 mt-0.5 font-medium">{club.name}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => attendEvent(event.id)}
                    className={`w-full mt-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isAttending
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200'
                    }`}
                  >
                    {isAttending ? '✓ Attending' : 'RSVP'}
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-primary-600 font-medium hover:text-primary-700"
          >
            View all events
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Footer */}
      <div className="px-2 text-xs text-slate-400 space-y-1">
        <p>© 2025 CampusConnect</p>
        <p>Built for college communities</p>
      </div>
    </aside>
  );
}
