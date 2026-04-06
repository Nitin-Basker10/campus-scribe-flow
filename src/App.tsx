import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CrimsonParticles from "./components/CrimsonParticles.tsx";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Clubs from "./pages/Clubs.tsx";
import Notes from "./pages/Notes.tsx";
import Events from "./pages/Events.tsx";
import ClubDashboard from "./pages/ClubDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CrimsonParticles />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/club-dashboard" element={<ClubDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
