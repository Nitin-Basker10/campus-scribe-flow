import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, FileText, Filter, Plus, Upload, X, Share2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const departments = ["CSE", "ECE", "ME", "CE", "EEE"];
const years = ["S1-S2", "S3-S4", "S5-S6", "S7-S8"];

interface Note {
  title: string;
  dept: string;
  year: string;
  author: string;
  downloads: number;
  description?: string;
}

const initialNotes: Note[] = [
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
  const [showUpload, setShowUpload] = useState(false);
  const [notesList, setNotesList] = useState<Note[]>(initialNotes);

  // Mock auth state — replace with real auth later
  const isLoggedIn = !!localStorage.getItem("userRole");

  const [form, setForm] = useState({ title: "", dept: "CSE", year: "S1-S2", description: "" });

  const filtered = notesList.filter(
    (n) => (!deptFilter || n.dept === deptFilter) && (!yearFilter || n.year === yearFilter)
  );

  const handleUpload = () => {
    if (!form.title.trim()) {
      toast.error("Please enter a title for the notes.");
      return;
    }
    const newNote: Note = {
      title: form.title,
      dept: form.dept,
      year: form.year,
      author: "You",
      downloads: 0,
      description: form.description,
    };
    setNotesList([newNote, ...notesList]);
    setForm({ title: "", dept: "CSE", year: "S1-S2", description: "" });
    setShowUpload(false);
    toast.success("Notes shared successfully!");
  };

  const handleShare = (note: Note) => {
    const text = `📚 ${note.title}\n${note.dept} · ${note.year} · by ${note.author}\n\nShared from MIT Campus Hub`;
    if (navigator.share) {
      navigator.share({ title: note.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Note details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  STUDY <span className="text-primary">NOTES</span>
                </h1>
                <p className="text-muted-foreground mb-8 max-w-lg">
                  Access and share academic notes filtered by department and year. Login required to upload.
                </p>
              </div>
              {isLoggedIn ? (
                <Button
                  onClick={() => setShowUpload(!showUpload)}
                  className="gap-2"
                  variant={showUpload ? "outline" : "default"}
                >
                  {showUpload ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {showUpload ? "Cancel" : "Share Notes"}
                </Button>
              ) : (
                <Button variant="outline" className="gap-2 opacity-60 cursor-not-allowed" disabled>
                  <Upload className="h-4 w-4" />
                  Login to Share
                </Button>
              )}
            </div>
          </motion.div>

          {/* Upload Form */}
          <AnimatePresence>
            {showUpload && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="p-6 rounded-lg border border-primary/30 bg-card space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    Share Your Notes
                  </h3>
                  <Input
                    placeholder="Note title (e.g., DBMS Module 1–3 Notes)"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="bg-secondary border-border"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={form.dept}
                      onChange={(e) => setForm({ ...form, dept: e.target.value })}
                      className="px-3 py-2 rounded-md bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="px-3 py-2 rounded-md bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <Textarea
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="bg-secondary border-border min-h-[60px]"
                  />
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 flex-1" disabled>
                      <FileText className="h-4 w-4" />
                      Attach File (coming soon)
                    </Button>
                    <Button onClick={handleUpload} className="gap-2 flex-1">
                      <Upload className="h-4 w-4" />
                      Share Notes
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                key={note.title + i}
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
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {note.downloads} downloads
                  </span>
                  <button
                    onClick={() => handleShare(note)}
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
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
