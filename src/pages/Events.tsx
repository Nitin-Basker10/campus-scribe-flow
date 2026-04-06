import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Tag, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const events = [
  {
    title: "Hackathon 2026",
    date: "Apr 15–16, 2026",
    time: "9 AM — 9 AM (36 hrs)",
    venue: "Main Auditorium",
    type: "Hackathon",
    desc: "National-level hackathon with prizes worth ₹2L. Open to all branches.",
    featured: true,
  },
  {
    title: "Web Dev Bootcamp",
    date: "Apr 5, 2026",
    time: "2 PM — 5 PM",
    venue: "Lab 302",
    type: "Workshop",
    desc: "Hands-on workshop on React, Tailwind, and modern frontend tools.",
    featured: false,
  },
  {
    title: "Inter-College Sports Meet",
    date: "Apr 10–12, 2026",
    time: "All Day",
    venue: "Sports Complex",
    type: "Sports",
    desc: "Cricket, football, basketball & athletics. Represent your department.",
    featured: false,
  },
  {
    title: "Photography Exhibition",
    date: "Apr 18, 2026",
    time: "10 AM — 6 PM",
    venue: "Gallery Hall",
    type: "Exhibition",
    desc: "Annual showcase by Shutter Club. Theme: Campus Through Our Lens.",
    featured: false,
  },
];

function handleShare(event: (typeof events)[0]) {
  const text = `🎯 ${event.title}\n📅 ${event.date} · ${event.time}\n📍 ${event.venue}\n\n${event.desc}\n\nShared from MIT Campus Hub`;
  if (navigator.share) {
    navigator.share({ title: event.title, text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    toast.success("Event details copied to clipboard!");
  }
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              UPCOMING <span className="text-primary">EVENTS</span>
            </h1>
            <p className="text-muted-foreground mb-10 max-w-lg">
              Everything happening on campus — workshops, fests, competitions & more.
            </p>
          </motion.div>

          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-lg border bg-card transition-all ${
                  event.featured
                    ? "border-primary/40 glow-border-red"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {event.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 mb-3 text-[10px] font-mono font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                        ★ FEATURED
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
                  </div>
                  <button
                    onClick={() => handleShare(event)}
                    className="ml-4 p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors shrink-0"
                    title="Share event"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {event.venue}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> {event.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
