import { useState } from "react";
import { ShieldAlert, CheckCircle, XCircle, Trash2, ShieldCheck, Activity } from "lucide-react";

const initialRequests = [
  { id: 1, club: "Astronomy Core", contact: "Neil D.", email: "astro@mit.edu", status: "pending" },
  { id: 2, club: "Chess Masters", contact: "Magnus", email: "chess@mit.edu", status: "pending" },
];

const mockAnnouncements = [
  { id: 101, title: "Global AI Hack", author: "AI Club", time: "2hrs ago" },
  { id: 102, title: "Pizza Night!", author: "E-Cell", time: "5hrs ago" },
  { id: 103, title: "Robot Wars Rescheduled", author: "Robotics Team", time: "1 day ago" },
];

export default function AdminDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  const handleApprove = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
    // In a real app, this would trigger an email to the club and create their auth profile!
  };

  const handleReject = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to permanently delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 mt-16 max-w-6xl">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            MIThub Sentinel (Admin)
          </h1>
          <p className="text-muted-foreground mt-1">Global ecosystem moderation and oversight</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 border border-border">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Active Users</p>
              <p className="text-lg font-bold leading-none mt-1">4,291</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Pending Club Requests */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full max-h-[600px]">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold">Pending Club Approvals</h2>
            <span className="ml-auto bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">{requests.length}</span>
          </div>
          
          <div className="overflow-y-auto pr-2 space-y-4 flex-grow">
            {requests.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">No pending requests! You're fully caught up.</div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-secondary/40 border border-border p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{req.club}</h3>
                    <p className="text-xs text-muted-foreground">{req.contact} • {req.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(req.id)} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-md transition-colors" title="Approve & Send Credentials">
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleReject(req.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors" title="Reject Request">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Global Announcement Feed Moderation */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full max-h-[600px]">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <h2 className="text-xl font-semibold">Live Feed Moderation</h2>
          </div>
          
          <p className="text-xs text-muted-foreground mb-4">View and delete announcements that violate community guidelines.</p>

          <div className="overflow-y-auto pr-2 space-y-4 flex-grow">
            {announcements.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">Feed is completely empty.</div>
            ) : (
              announcements.map((post) => (
                <div key={post.id} className="bg-secondary/20 border border-border/50 p-4 rounded-lg flex items-center justify-between group hover:border-border transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">{post.author}</span>
                      <span className="text-xs text-muted-foreground">• {post.time}</span>
                    </div>
                    <h3 className="font-medium text-sm text-foreground">{post.title}</h3>
                  </div>
                  
                  <button 
                    onClick={() => handleDeletePost(post.id)} 
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Post"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
