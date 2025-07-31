import { useState } from "react";
import { BookOpen, LogIn, UserPlus, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center gap-2">
          <BookOpen size={24} /> BookHaven
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn size={18} /> Log In
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <UserPlus size={18} /> Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <LogIn size={18} /> Log In
          </Button>
          <Button variant="default" className="w-full flex items-center gap-2">
            <UserPlus size={18} /> Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
