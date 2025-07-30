import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">BookNest</h2>
          <p className="text-sm text-gray-600">
            Discover, explore, and grow your library with BookNest. Your gateway
            to stories and knowledge.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Browse Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Sign Up
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-600">Email: support@booknest.com</p>
          <p className="text-sm text-gray-600">Phone: +91 9876543210</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#">
              <Facebook size={20} className="hover:text-blue-600" />
            </a>
            <a href="#">
              <Instagram size={20} className="hover:text-pink-500" />
            </a>
            <a href="#">
              <Twitter size={20} className="hover:text-sky-500" />
            </a>
            <a href="#">
              <Mail size={20} className="hover:text-red-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs border-t border-gray-300">
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
