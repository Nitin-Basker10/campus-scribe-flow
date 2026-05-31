export type UserRole = 'student' | 'admin' | 'club_leader';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  bio: string;
  department: string;
  year?: number;
  joinedClubs: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  verified: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  likes: string[];
  reposts: string[];
  replies: string[];
  parentId?: string;
  isAnnouncement: boolean;
  isPinned: boolean;
  clubId?: string;
  tags: string[];
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: ClubCategory;
  leaderId: string;
  members: string[];
  avatar: string;
  coverImage: string;
  createdAt: string;
  isOfficial: boolean;
  events: string[];
}

export type ClubCategory = 
  | 'academic'
  | 'cultural'
  | 'sports'
  | 'tech'
  | 'arts'
  | 'social'
  | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  date: string;
  location: string;
  attendees: string[];
  maxCapacity?: number;
  image?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'reply' | 'repost' | 'follow' | 'announcement' | 'event' | 'club_invite';
  fromUserId?: string;
  postId?: string;
  clubId?: string;
  eventId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type TabType = 'home' | 'explore' | 'clubs' | 'events' | 'notifications' | 'profile' | 'admin';
