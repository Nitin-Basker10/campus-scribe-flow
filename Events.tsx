import { useState } from 'react';
import { useStore } from '../store';
import { Calendar, MapPin, Users, Clock, Plus, X, ChevronRight } from 'lucide-react';
import { format, isPast, isFuture } from 'date-fns';

export default function Events() {
  const { events, clubs, currentUser, attendEvent, createEvent } = useStore();
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'attending'>('upcoming');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newClubId, setNewClubId] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCapacity, setNewCapacity] = useState<number | ''>('');
  
  if (!currentUser) return null;
  
  const userClubs = clubs.filter(c => c.leaderId === currentUser.id || currentUser.role === 'admin');
  
  let filteredEvents = events;
  if (filter === 'upcoming') {
    filteredEvents = events.filter(e => isFuture(new Date(e.date)));
  } else if (filter === 'past') {
    filteredEvents = events.filter(e => isPast(new Date(e.date)));
  } else {
    filteredEvents = events.filter(e => e.attendees.includes(currentUser.id));
  }
  
  filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClubId || !newDate || !newLocation.trim()) return;
    createEvent({
      title: newTitle,
      description: newDesc,
      clubId: newClubId,
      date: new Date(newDate).toISOString(),
      location: newLocation,
      maxCapacity: newCapacity || undefined,
    });
    setNewTitle('');
    setNewDesc('');
    setNewClubId('');
    setNewDate('');
    setNewLocation('');
    setNewCapacity('');
    setShowCreate(false);
  };
  
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">Events</h2>
          {userClubs.length > 0 && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Event
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          {(['upcoming', 'attending', 'past'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Events List */}
      <div className="p-4 space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No events found</p>
          </div>
        ) : (
          filteredEvents.map(event => {
            const club = clubs.find(c => c.id === event.clubId);
            const isAttending = event.attendees.includes(currentUser.id);
            const eventDate = new Date(event.date);
            const past = isPast(eventDate);
            const spotsLeft = event.maxCapacity ? event.maxCapacity - event.attendees.length : null;
            
            return (
              <div
                key={event.id}
                className={`bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-all animate-fade-in ${
                  past ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-primary-200'
                }`}
              >
                {/* Date strip */}
                <div className={`h-1 ${past ? 'bg-slate-300' : 'bg-gradient-to-r from-primary-500 to-accent-500'}`} />
                
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Date card */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                      past ? 'bg-slate-100' : 'bg-primary-50'
                    }`}>
                      <span className={`text-xs font-bold uppercase ${past ? 'text-slate-400' : 'text-primary-600'}`}>
                        {format(eventDate, 'MMM')}
                      </span>
                      <span className={`text-xl font-bold ${past ? 'text-slate-500' : 'text-primary-700'}`}>
                        {format(eventDate, 'd')}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        {event.title}
                        {past && <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">Past</span>}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {format(eventDate, 'h:mm a')}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {event.attendees.length}{event.maxCapacity ? `/${event.maxCapacity}` : ''} attending
                        </span>
                        {club && (
                          <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <ChevronRight className="w-3 h-3" />
                            {club.name}
                          </span>
                        )}
                      </div>
                      
                      {spotsLeft !== null && spotsLeft <= 10 && spotsLeft > 0 && !past && (
                        <p className="text-xs text-amber-600 font-medium mt-2">⚡ Only {spotsLeft} spots left!</p>
                      )}
                    </div>
                    
                    {!past && (
                      <button
                        onClick={() => attendEvent(event.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          isAttending
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                            : 'bg-primary-600 text-white hover:bg-primary-500'
                        }`}
                      >
                        {isAttending ? 'Attending ✓' : 'RSVP'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Create Event</h3>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Workshop: Intro to AI"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="What's this event about?"
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Club</label>
                <select
                  value={newClubId}
                  onChange={(e) => setNewClubId(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400"
                >
                  <option value="">Select club</option>
                  {userClubs.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Optional"
                    min="1"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Room 301, CS Building"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-500 transition-colors"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
