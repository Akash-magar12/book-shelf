import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 px-4 py-6">
        <Outlet /> {/* This will render nested routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
