import BestSellers from "@/components/BestSellers";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <BestSellers />
      <Footer />
    </div>
  );
};

export default LandingPage;
