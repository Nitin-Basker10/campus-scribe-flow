import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Fallback high-quality photos if no clubs have posted yet.
const defaultPhotos = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", // University campus
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop", // Robotics / tech
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", // Group crowd
];

export default function PhotoFeed() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Read from local storage first (simulating database pull)
    const stored = localStorage.getItem("campus_photos");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setPhotos(parsed);
        return;
      }
    }
    // Set fallback if empty
    setPhotos(defaultPhotos);
  }, []);

  // Set up an event listener to dynamically grab changes from other tabs or if posted on the same page
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("campus_photos");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setPhotos(parsed);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    
    // Also periodically poll in case it changes in the background by another component directly
    const interval = setInterval(handleStorageChange, 3000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (photos.length <= 1) return;
    
    // Cycle every 5 seconds to trigger the fade away
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold tracking-tight">
            CAMPUS <span className="text-primary">GALLERY</span>
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        
        {/* Photo Canvas */}
        <div className="relative w-full aspect-[21/9] bg-card rounded-2xl border border-border overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[currentIndex] + currentIndex}
              src={photos[currentIndex]}
              alt={`Campus moment ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} /* Fade away animation! */
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Subtle bottom gradient to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
}
