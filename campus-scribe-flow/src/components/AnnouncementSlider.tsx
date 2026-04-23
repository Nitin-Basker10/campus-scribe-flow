import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Hackathon 2026 — Registrations Open",
    description: "36-hour national hackathon. Build, break, innovate. Last date: April 15.",
    tag: "EVENT",
    color: "text-primary",
  },
  {
    id: 2,
    title: "End Semester Exam Schedule Released",
    description: "Check your department portal for the updated timetable. Exams begin May 5.",
    tag: "ACADEMIC",
    color: "text-yellow-400",
  },
  {
    id: 3,
    title: "Coding Club — Weekly Contest #42",
    description: "This Saturday at 6 PM. Prizes for top 3. Open to all years.",
    tag: "CLUB",
    color: "text-emerald-400",
  },
  {
    id: 4,
    title: "Campus Wi-Fi Maintenance — April 2",
    description: "Network downtime from 2 AM to 6 AM. Plan accordingly.",
    tag: "NOTICE",
    color: "text-blue-400",
  },
];

export default function AnnouncementSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + announcements.length) % announcements.length);
  const next = () => setCurrent((c) => (c + 1) % announcements.length);

  return (
    <section id="announcements" className="py-20 relative">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-10">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            ANNOUNCE<span className="text-primary">MENTS</span>
          </h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-mono text-muted-foreground">
            {current + 1}/{announcements.length}
          </span>
        </div>

        <div className="relative rounded-lg border border-border bg-card overflow-hidden min-h-[200px] glow-border-red">
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline pointer-events-none z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-12"
            >
              <span className={`text-xs font-mono font-semibold tracking-widest ${announcements[current].color}`}>
                [{announcements[current].tag}]
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                {announcements[current].title}
              </h3>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                {announcements[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Nav controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prev}
              className="p-2 rounded-md border border-border hover:border-primary/40 transition-colors bg-background/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-md border border-border hover:border-primary/40 transition-colors bg-background/50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-8 flex gap-2">
            {announcements.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-3 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
