import { BookOpen, LogIn, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white sticky top-0 z-50">
      <div className="text-xl font-bold flex items-center gap-2">
        <BookOpen size={24} /> BookHaven
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <LogIn size={18} /> Log In
        </Button>
        <Button variant="default" className="flex items-center gap-2">
          <UserPlus size={18} /> Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
