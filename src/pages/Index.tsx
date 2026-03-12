import Confetti from "@/components/Confetti";
import HeroSection from "@/components/HeroSection";
import FunFacts from "@/components/FunFacts";
import RiaTrivia from "@/components/RiaTrivia";
import ShipMeter from "@/components/ShipMeter";
import BirthdayCam from "@/components/BirthdayCam";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Confetti />
      <HeroSection />
      <FunFacts />
      <RiaTrivia />
      <ShipMeter />
      <BirthdayCam />
      <Footer />
    </div>
  );
};

export default Index;
