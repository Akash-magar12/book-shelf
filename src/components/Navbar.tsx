import { useEffect, useState } from "react";
import {
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName[0].toUpperCase();
    return "U";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="text-xl font-bold flex items-center gap-2">
            <BookOpen size={24} /> BookHaven
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {user && (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={20} /> Cart
              </Button>

              <Avatar>
                <AvatarImage src={user.photoURL ?? ""} alt="User Avatar" />
                <AvatarFallback>{getUserInitial()}</AvatarFallback>
              </Avatar>
            </>
          )}
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
        {user && (
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {user && (
            <>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-2"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart size={20} /> Cart
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.photoURL ?? ""} alt="User Avatar" />
                  <AvatarFallback>{getUserInitial()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {user.displayName ?? user.email}
                </span>
              </div>
            </>
          )}
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
