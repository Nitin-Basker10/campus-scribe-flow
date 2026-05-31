import { useState } from 'react';
import { useStore } from '../store';
import { Heart, MessageCircle, Repeat2, MoreHorizontal, Trash2, Pin, Megaphone, BadgeCheck, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  showThread?: boolean;
}

export default function PostCard({ post, showThread = false }: PostCardProps) {
  const { currentUser, getUserById, likePost, repostPost, deletePost, pinPost, setSelectedProfile, getPostReplies } = useStore();
  const [showMenu, setShowMenu] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { createPost } = useStore();
  
  const author = getUserById(post.authorId);
  if (!author || !currentUser) return null;
  
  const isLiked = post.likes.includes(currentUser.id);
  const isReposted = post.reposts.includes(currentUser.id);
  const isOwner = post.authorId === currentUser.id;
  const isAdmin = currentUser.role === 'admin';
  const replies = getPostReplies(post.id);
  
  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    createPost(replyText, { parentId: post.id });
    setReplyText('');
    setReplyOpen(false);
  };
  
  // Parse content for hashtags and mentions
  const renderContent = (text: string) => {
    const parts = text.split(/(#\w+|@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return <span key={i} className="text-primary-600 hover:underline cursor-pointer font-medium">{part}</span>;
      }
      if (part.startsWith('@')) {
        return <span key={i} className="text-primary-600 hover:underline cursor-pointer font-medium">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <article className={`animate-fade-in ${post.isPinned ? 'border-l-2 border-l-amber-400' : ''}`}>
      {/* Pinned/Announcement badge */}
      {(post.isPinned || post.isAnnouncement) && (
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          {post.isPinned && (
            <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
              <Pin className="w-3 h-3" /> Pinned
            </span>
          )}
          {post.isAnnouncement && (
            <span className="flex items-center gap-1 text-xs text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-full">
              <Megaphone className="w-3 h-3" /> Official Announcement
            </span>
          )}
        </div>
      )}
      
      <div className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
        <div className="flex gap-3">
          {/* Avatar */}
          <button onClick={() => setSelectedProfile(author.id)} className="flex-shrink-0">
            <img src={author.avatar} alt="" className="w-11 h-11 rounded-full border-2 border-slate-100 hover:border-primary-200 transition-colors" />
          </button>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <button
                  onClick={() => setSelectedProfile(author.id)}
                  className="font-semibold text-slate-900 text-sm hover:underline truncate flex items-center gap-1"
                >
                  {author.displayName}
                  {author.verified && <BadgeCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />}
                </button>
                <span className="text-slate-400 text-sm truncate">@{author.username}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-400 text-xs flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {timeAgo}
                </span>
              </div>
              
              {/* Menu */}
              {(isOwner || isAdmin) && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 w-40 animate-fade-in">
                      {isAdmin && (
                        <button
                          onClick={() => { pinPost(post.id); setShowMenu(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Pin className="w-4 h-4" />
                          {post.isPinned ? 'Unpin' : 'Pin'}
                        </button>
                      )}
                      {(isOwner || isAdmin) && (
                        <button
                          onClick={() => { deletePost(post.id); setShowMenu(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Club tag */}
            {post.clubId && (
              <div className="mt-0.5">
                <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">
                  {useStore.getState().clubs.find(c => c.id === post.clubId)?.name || 'Club'}
                </span>
              </div>
            )}
            
            {/* Content */}
            <div className="mt-2 text-[15px] text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
              {renderContent(post.content)}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1 mt-3 -ml-2">
              <button
                onClick={() => setReplyOpen(!replyOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors group"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{post.replies.length || ''}</span>
              </button>
              
              <button
                onClick={() => repostPost(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  isReposted 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Repeat2 className="w-4 h-4" />
                <span className="text-xs font-medium">{post.reposts.length || ''}</span>
              </button>
              
              <button
                onClick={() => likePost(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  isLiked 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{post.likes.length || ''}</span>
              </button>
            </div>
            
            {/* Reply box */}
            {replyOpen && (
              <form onSubmit={handleReply} className="mt-3 flex gap-2 animate-fade-in">
                <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}
            
            {/* Thread replies */}
            {showThread && replies.length > 0 && (
              <div className="mt-3 border-l-2 border-slate-100 pl-4 space-y-3">
                {replies.map(reply => (
                  <PostCard key={reply.id} post={reply} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mx-4 border-b border-slate-100" />
    </article>
  );
}
