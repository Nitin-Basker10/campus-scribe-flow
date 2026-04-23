import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnnouncementSlider from "@/components/AnnouncementSlider";
import EventFeed from "@/components/EventFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AnnouncementSlider />
      <EventFeed />
      <Footer />
    </div>
  );
};

export default Index;
