import { motion } from "framer-motion";
import { Users, Heart, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const clubs = [
  { name: "Coding Club", members: 240, desc: "Competitive programming, dev sprints & hackathons", tags: ["Tech", "Open"] },
  { name: "Shutter Club", members: 85, desc: "Campus photography, workshops & exhibitions", tags: ["Creative", "Open"] },
  { name: "Robotics Society", members: 60, desc: "Build bots, compete in nationals", tags: ["Tech", "Selective"] },
  { name: "Literary Circle", members: 120, desc: "Debates, poetry slams & magazine publication", tags: ["Literary", "Open"] },
  { name: "Music Club", members: 95, desc: "Jam sessions, open mics & annual fest performances", tags: ["Creative", "Open"] },
  { name: "Entrepreneurship Cell", members: 150, desc: "Startup incubation, pitch nights & mentorship", tags: ["Business", "Open"] },
];

export default function ClubsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              CAMPUS <span className="text-primary">CLUBS</span>
            </h1>
            <p className="text-muted-foreground mb-10 max-w-lg">
              Follow clubs to get personalized updates. Login required to follow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map((club, i) => (
              <motion.div
                key={club.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-5 rounded-lg border border-border bg-card hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <button className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-foreground">{club.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{club.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1.5">
                    {club.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{club.members} members</span>
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
