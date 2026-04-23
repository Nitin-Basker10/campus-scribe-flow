import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">
            MIT<span className="text-primary">hub</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          © 2026 MIThub · Deconstructing campus, one update at a time.
        </p>
      </div>
    </footer>
  );
}
