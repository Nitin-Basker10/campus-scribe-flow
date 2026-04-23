import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Tag, Share2, CalendarPlus, Image, Upload, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface EventData {
  title: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  desc: string;
  featured: boolean;
  poster?: string;
  calendarStart?: string;
  calendarEnd?: string;
}

const initialEvents: EventData[] = [
  {
    title: "Hackathon 2026",
    date: "Apr 15–16, 2026",
    time: "9 AM — 9 AM (36 hrs)",
    venue: "Main Auditorium",
    type: "Hackathon",
    desc: "National-level hackathon with prizes worth ₹2L. Open to all branches.",
    featured: true,
    calendarStart: "20260415T090000",
    calendarEnd: "20260416T210000",
  },
  {
    title: "Web Dev Bootcamp",
    date: "Apr 5, 2026",
    time: "2 PM — 5 PM",
    venue: "Lab 302",
    type: "Workshop",
    desc: "Hands-on workshop on React, Tailwind, and modern frontend tools.",
    featured: false,
    calendarStart: "20260405T140000",
    calendarEnd: "20260405T170000",
  },
  {
    title: "Inter-College Sports Meet",
    date: "Apr 10–12, 2026",
    time: "All Day",
    venue: "Sports Complex",
    type: "Sports",
    desc: "Cricket, football, basketball & athletics. Represent your department.",
    featured: false,
    calendarStart: "20260410T080000",
    calendarEnd: "20260412T180000",
  },
  {
    title: "Photography Exhibition",
    date: "Apr 18, 2026",
    time: "10 AM — 6 PM",
    venue: "Gallery Hall",
    type: "Exhibition",
    desc: "Annual showcase by Shutter Club. Theme: Campus Through Our Lens.",
    featured: false,
    calendarStart: "20260418T100000",
    calendarEnd: "20260418T180000",
  },
];

function handleShare(event: EventData) {
  const text = `🎯 ${event.title}\n📅 ${event.date} · ${event.time}\n📍 ${event.venue}\n\n${event.desc}\n\nShared from MIT Campus Hub`;
  if (navigator.share) {
    navigator.share({ title: event.title, text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    toast.success("Event details copied to clipboard!");
  }
}

function handleAddToCalendar(event: EventData) {
  const start = event.calendarStart || "20260101T000000";
  const end = event.calendarEnd || "20260101T010000";
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.desc}`,
    `LOCATION:${event.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Calendar file downloaded!");
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>(initialEvents);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const isClub = typeof window !== "undefined" && localStorage.getItem("userRole") === "club";

  function handlePosterUpload(index: number) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const updated = [...events];
        updated[index] = { ...updated[index], poster: reader.result as string };
        setEvents(updated);
        toast.success("Poster uploaded!");
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

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
                className={`rounded-lg border bg-card transition-all overflow-hidden ${
                  event.featured
                    ? "border-primary/40 glow-border-red"
                    : "border-border hover:border-primary/20"
                }`}
              >
                {/* Poster */}
                {event.poster && (
                  <button
                    onClick={() => setSelectedPoster(event.poster!)}
                    className="w-full cursor-pointer"
                  >
                    <img
                      src={event.poster}
                      alt={`${event.title} poster`}
                      className="w-full h-48 object-cover border-b border-border"
                    />
                  </button>
                )}

                <div className="p-6">
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
                    <div className="flex gap-2 ml-4 shrink-0">
                      <button
                        onClick={() => handleAddToCalendar(event)}
                        className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                        title="Add to calendar"
                      >
                        <CalendarPlus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleShare(event)}
                        className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                        title="Share event"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      {isClub && (
                        <button
                          onClick={() => handlePosterUpload(i)}
                          className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                          title="Upload poster"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Poster lightbox */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPoster(null)}
        >
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-card border border-border text-foreground hover:text-primary z-10"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={selectedPoster} alt="Event poster" className="w-full rounded-lg border border-border" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
