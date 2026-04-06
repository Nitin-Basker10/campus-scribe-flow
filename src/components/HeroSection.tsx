import { motion } from "framer-motion";
import { ArrowDown, Radio } from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with deep crimson tint */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="MIT Campus"
          className="w-full h-full object-cover opacity-20"
          style={{ filter: "saturate(0.3) brightness(0.6)" }}
        />
        {/* Multi-layer crimson gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_78%_48%/0.06)] via-transparent to-[hsl(0_78%_48%/0.04)]" />
        <div className="absolute inset-0 scanline pointer-events-none" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Crimson glow orbs — multiple for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[hsl(0_78%_48%/0.06)] blur-[140px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(0_85%_40%/0.04)] blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(0_70%_35%/0.05)] blur-[80px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-wider glow-border-red">
            <Radio className="h-3 w-3 animate-pulse-glow" />
            LIVE — CAMPUS NETWORK ACTIVE
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
            <span className="text-foreground">DECON</span>
            <span className="text-primary glow-text-red">STRUCT</span>
            <br />
            <span className="text-muted-foreground font-light text-3xl md:text-5xl lg:text-6xl tracking-tight">
              YOUR CAMPUS EXPERIENCE
            </span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            One hub for everything MIT. Announcements, events, clubs, notes — no
            more scattered WhatsApp groups and missed deadlines.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm glow-red hover:glow-red-strong transition-shadow"
            >
              Enter the Hub →
            </a>
            <a
              href="#announcements"
              className="px-8 py-3 rounded-md border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              Browse Public Feed
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
