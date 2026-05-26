import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import ServicesSection from "@/components/ServicesSection";
import Heart3DSection from "@/components/Heart3DSection";
import DNATechSection from "@/components/DNATechSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BenefitsSection from "@/components/BenefitsSection";
import LocationSection from "@/components/LocationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <Heart3DSection />
      <DNATechSection />
      <TeamSection />
      <TestimonialsSection />
      <BenefitsSection />
      <LocationSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
