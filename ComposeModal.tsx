import { useState } from 'react';
import { useStore } from '../store';
import { X, Megaphone, Hash, ImageIcon } from 'lucide-react';

export default function ComposeModal() {
  const { currentUser, composeOpen, setComposeOpen, createPost, clubs } = useStore();
  const [content, setContent] = useState('');
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [selectedClub, setSelectedClub] = useState('');
  
  if (!composeOpen || !currentUser) return null;
  
  const userClubs = clubs.filter(c => c.leaderId === currentUser.id || currentUser.role === 'admin');
  const canAnnounce = currentUser.role === 'admin';
  const charCount = content.length;
  const maxChars = 500;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || charCount > maxChars) return;
    createPost(content, {
      isAnnouncement: canAnnounce && isAnnouncement,
      clubId: selectedClub || undefined,
    });
    setContent('');
    setIsAnnouncement(false);
    setSelectedClub('');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50 animate-fade-in" onClick={() => setComposeOpen(false)}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Create Post</h2>
          <button onClick={() => setComposeOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="flex gap-3">
              <img src={currentUser.avatar} alt="" className="w-11 h-11 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening on campus?"
                  className="w-full resize-none border-0 focus:outline-none text-[15px] text-slate-800 placeholder:text-slate-400 min-h-[120px]"
                  autoFocus
                />
              </div>
            </div>
            
            {/* Options */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-1 flex-wrap">
                {canAnnounce && (
                  <button
                    type="button"
                    onClick={() => setIsAnnouncement(!isAnnouncement)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isAnnouncement
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    Announcement
                  </button>
                )}
                
                {userClubs.length > 0 && (
                  <select
                    value={selectedClub}
                    onChange={(e) => setSelectedClub(e.target.value)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 focus:outline-none focus:border-primary-400"
                  >
                    <option value="">No club</option>
                    {userClubs.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
                
                <button type="button" className="p-1.5 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  <Hash className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${charCount > maxChars ? 'text-red-500' : charCount > maxChars * 0.8 ? 'text-amber-500' : 'text-slate-400'}`}>
                  {charCount}/{maxChars}
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() || charCount > maxChars}
                  className="px-5 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
