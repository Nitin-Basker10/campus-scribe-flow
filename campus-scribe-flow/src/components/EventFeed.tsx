import { motion } from "framer-motion";
import { Calendar, Users, BookOpen, Code, Trophy } from "lucide-react";

const events = [
  {
    icon: Code,
    title: "Web Dev Bootcamp",
    club: "Tech Club",
    date: "Apr 5, 2026",
    type: "Workshop",
  },
  {
    icon: Trophy,
    title: "Inter-College Sports Meet",
    club: "Sports Committee",
    date: "Apr 10–12, 2026",
    type: "Event",
  },
  {
    icon: Users,
    title: "Photography Club Recruitment",
    club: "Shutter Club",
    date: "Apr 8, 2026",
    type: "Recruitment",
  },
  {
    icon: BookOpen,
    title: "Notes Upload Drive — S4 CSE",
    club: "Academic Cell",
    date: "Apr 3, 2026",
    type: "Academic",
  },
  {
    icon: Calendar,
    title: "Annual Cultural Fest Planning",
    club: "Cultural Committee",
    date: "Apr 20, 2026",
    type: "Event",
  },
];

const typeColor: Record<string, string> = {
  Workshop: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Event: "bg-primary/10 text-primary border-primary/20",
  Recruitment: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Academic: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function EventFeed() {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-10">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            RECENT <span className="text-primary">UPDATES</span>
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="space-y-3">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:glow-border-red transition-all cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary shrink-0">
                <event.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {event.club} · {event.date}
                </p>
              </div>
              <span
                className={`hidden sm:inline-flex px-3 py-1 text-xs font-mono rounded-full border ${typeColor[event.type]}`}
              >
                {event.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
