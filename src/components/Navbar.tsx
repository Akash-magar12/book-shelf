import { useEffect, useState } from "react";
import { BookOpen, LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("logout successfull");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2">
          <BookOpen size={24} /> BookHaven
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} /> Log In
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={() => navigate("/signup")}
              >
                <UserPlus size={18} /> Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {user ? (
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} /> Log In
              </Button>
              <Button
                variant="default"
                className="w-full flex items-center gap-2"
                onClick={() => navigate("/signup")}
              >
                <UserPlus size={18} /> Sign Up
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
