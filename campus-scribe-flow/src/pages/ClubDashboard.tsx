import { useState } from "react";
import { Users, Eye, Megaphone, Send, Crosshair } from "lucide-react";

export default function ClubDashboard() {
  const [announcementSent, setAnnouncementSent] = useState(false);

  return (
    <div className="container mx-auto py-10 px-4 mt-16 max-w-5xl">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Robotics Team Portal</h1>
          <p className="text-muted-foreground mt-1">Manage your club presence and announcements</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 border border-border">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Followers</p>
              <p className="text-lg font-bold leading-none mt-1">1,204</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 border border-border">
            <Eye className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Views (Week)</p>
              <p className="text-lg font-bold leading-none mt-1">5.4k</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Post Announcement */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Post Announcement</h2>
          </div>
          
          {announcementSent ? (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-primary mb-2">Announcement Published!</h3>
              <p className="text-sm text-muted-foreground mb-4">Your post is now live on the feed.</p>
              <button 
                onClick={() => setAnnouncementSent(false)}
                className="text-sm font-medium text-foreground bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80"
              >
                Post Another
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setAnnouncementSent(true); }}>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Title</label>
                <input type="text" placeholder="e.g. Robot Wars 2026 Rescheduled!" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Detailed Description</label>
                <textarea rows={4} placeholder="What's happening?" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Tags (Comma separated)</label>
                <input type="text" placeholder="Event, Hackathon, Update" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" />
              </div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-md flex items-center justify-center gap-2 glow-red hover:glow-red-strong transition-all mt-6">
                Broadcast Post <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </section>

        {/* Talent / Skill Search request */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Crosshair className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Recruitment Drive</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
            Search for specific skills amongst the student body (e.g., React, Arduino, Figma) and automatically send an alert to matching profiles!
          </p>
          
          <div className="space-y-4 mt-auto">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Looking For Skills</label>
              <input type="text" placeholder="e.g. Embedded C++, Fusion360" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Role Pitch</label>
              <input type="text" placeholder="Join our navigation subsystem sub-team!" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <button className="w-full py-2.5 border border-border bg-secondary text-foreground font-semibold rounded-md hover:bg-border/50 transition-all">
              Initiate Drive
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
