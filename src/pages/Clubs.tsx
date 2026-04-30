import { motion } from "framer-motion";
import { Users, Heart, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const clubs = [
  { name: "BRC", members: 100, desc: "Book Readers Club", tags: ["Sports"] },
  { name: "NSS", members: 200, desc: "National Service Scheme", tags: ["Service"] },
  { name: "NSO", members: 150, desc: "National Sports Organization", tags: ["Sports"] },
  { name: "YRC", members: 180, desc: "Youth Red Cross", tags: ["Service"] },
  { name: "Athenaeum", members: 100, desc: "The English Literary Society", tags: ["Literary"] },
  { name: "PDA", members: 90, desc: "Personality Development Association", tags: ["Development"] },
  { name: "Tamil Mandram", members: 150, desc: "Tamil literary and cultural society", tags: ["Cultural"] },
  { name: "Rotaract Club", members: 250, desc: "Community service and leadership", tags: ["Service"] },
  { name: "Computer Society", members: 300, desc: "Computer Society of MIT", tags: ["Tech"] },
  { name: "TBO", members: 100, desc: "The BAJA SAE India", tags: ["Tech"] },
  { name: "MIT Quill", members: 80, desc: "The official literary club", tags: ["Literary"] },
  { name: "Variety Team", members: 120, desc: "Official cultural team", tags: ["Cultural"] },
  { name: "Museum", members: 50, desc: "MIT Museum", tags: ["Heritage"] },
  { name: "MITRA", members: 100, desc: "Social service organization", tags: ["Service"] },
  { name: "TEDC", members: 150, desc: "Entrepreneurship Development Cell", tags: ["Business"] },
  { name: "AUSEC", members: 100, desc: "Aero Unmanned Systems", tags: ["Tech"] },
  { name: "QUANTUM", members: 100, desc: "Quantum Club", tags: ["Tech"] },
  { name: "Raptorsclubmit", members: 80, desc: "Raptors Club", tags: ["Tech"] },
  { name: "PSMIT", members: 100, desc: "Photographic Society", tags: ["Creative"] },
  { name: "Quiz Club", members: 90, desc: "Official Quiz Club", tags: ["Literary"] },
  { name: "Vibez", members: 120, desc: "Dance and Music", tags: ["Cultural"] },
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
