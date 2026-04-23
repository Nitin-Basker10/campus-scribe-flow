import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Filter, Plus } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const departments = ["CSE", "ECE", "ME", "CE", "EEE"];
const years = ["S1-S2", "S3-S4", "S5-S6", "S7-S8"];

const notes = [
  { title: "Data Structures — Module 1–3", dept: "CSE", year: "S3-S4", author: "Anon", downloads: 342 },
  { title: "Digital Electronics Full Notes", dept: "ECE", year: "S3-S4", author: "Arjun K", downloads: 218 },
  { title: "Engineering Mechanics — Solved QPs", dept: "ME", year: "S1-S2", author: "Sneha R", downloads: 156 },
  { title: "DBMS Complete Notes + Lab", dept: "CSE", year: "S5-S6", author: "Vishnu M", downloads: 487 },
  { title: "Signal Processing — Quick Reference", dept: "ECE", year: "S5-S6", author: "Priya S", downloads: 123 },
  { title: "Concrete Technology Notes", dept: "CE", year: "S5-S6", author: "Amal J", downloads: 89 },
];

export default function NotesPage() {
  const [deptFilter, setDeptFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");

  const filtered = notes.filter(
    (n) => (!deptFilter || n.dept === deptFilter) && (!yearFilter || n.year === yearFilter)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                STUDY <span className="text-primary">NOTES</span>
              </h1>
              <p className="text-muted-foreground max-w-lg">
                Access and share academic notes filtered by department and year. Login required to download.
              </p>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors shrink-0 glow-red"
            >
              <Plus className="h-4 w-4" />
              Add Note
            </motion.button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {(deptFilter || yearFilter) && (
              <button
                onClick={() => { setDeptFilter(""); setYearFilter(""); }}
                className="text-xs text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filtered.map((note, i) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary shrink-0">
                  <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{note.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {note.dept} · {note.year} · by {note.author}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {note.downloads} downloads
                  </span>
                  <button className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No notes found for the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
