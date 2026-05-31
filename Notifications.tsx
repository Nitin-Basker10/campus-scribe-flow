import { useStore } from '../store';
import { Bell, Heart, MessageCircle, Repeat2, UserPlus, Megaphone, Calendar, Users, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const iconMap = {
  like: { icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  reply: { icon: MessageCircle, color: 'text-primary-500', bg: 'bg-primary-50' },
  repost: { icon: Repeat2, color: 'text-green-500', bg: 'bg-green-50' },
  follow: { icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-50' },
  announcement: { icon: Megaphone, color: 'text-amber-500', bg: 'bg-amber-50' },
  event: { icon: Calendar, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  club_invite: { icon: Users, color: 'text-pink-500', bg: 'bg-pink-50' },
};

export default function Notifications() {
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead, getUserById } = useStore();
  
  if (!currentUser) return null;
  
  const userNotifs = notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const unread = userNotifs.filter(n => !n.read).length;
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Notifications
            {unread > 0 && (
              <span className="ml-2 text-sm font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                {unread} new
              </span>
            )}
          </h2>
          {unread > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>
      </div>
      
      {/* Notifications List */}
      <div>
        {userNotifs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No notifications</h3>
            <p className="text-slate-400 mt-1">When someone interacts with you, you'll see it here</p>
          </div>
        ) : (
          userNotifs.map(notif => {
            const config = iconMap[notif.type];
            const Icon = config.icon;
            const fromUser = notif.fromUserId ? getUserById(notif.fromUserId) : null;
            
            return (
              <button
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-slate-50 ${
                  notif.read ? 'bg-white hover:bg-slate-50' : 'bg-primary-50/30 hover:bg-primary-50/50'
                }`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-full ${config.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    {fromUser && (
                      <img src={fromUser.avatar} alt="" className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-slate-700">
                      {notif.message}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
