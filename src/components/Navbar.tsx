import { useEffect, useState } from "react";
import {
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ...imports remain unchanged

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
                className="flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={20} /> Cart
              </Button>

              <Button variant="ghost" asChild className="cursor-pointer">
                <Link to="/search" className="flex items-center gap-2">
                  <Search size={18} /> Search
                </Link>
              </Button>

              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.photoURL || undefined}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-black text-white font-semibold">
                  {getUserInitial()}
                </AvatarFallback>
              </Avatar>
            </>
          )}
          {user ? (
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} /> Log In
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <UserPlus size={18} /> Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        {user && (
          <div className="sm:hidden flex">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={user.photoURL || undefined}
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-black text-white">
                  {getUserInitial()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
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
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart size={20} /> Cart
              </Button>

              <Button variant="ghost" asChild className="w-full cursor-pointer">
                <Link to="/search" className="w-full flex items-center gap-2">
                  <Search size={20} /> Search
                </Link>
              </Button>
            </>
          )}
          {user ? (
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} /> Log In
              </Button>
              <Button
                variant="default"
                className="w-full flex items-center gap-2 cursor-pointer"
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
