import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Heart, Key, PlusCircle, Menu, X, Globe, LogOut, List } from "lucide-react";
import axios from "axios";

function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fetch current logged-in user from backend session
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true, // important to send session cookie
      });
      setUser(res.data.user);
    } catch (err) {
      console.log("Not logged in or session expired", err);
      setUser(null);
    }
  };

  // Fetch user on mount and whenever the route changes
  useEffect(() => {
    fetchUser();
  }, [location]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/login"; // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Determine nav links based on user state
  let navLinks = [];
  if (!user) {
    navLinks = [
      { name: "Login", path: "/login", icon: Key },
      { name: "Sign Up", path: "/signup", icon: PlusCircle, highlight: true },
    ];
  } else if (user.userType === "user") {
    navLinks = [
      { name: "Home", path: "/", icon: Home },
      { name: "Home List", path: "/homeList", icon: List },
      { name: "Favourites", path: "/favourites", icon: Heart },
      { name: "About", path: "/about", icon: Info },
      { name: "Logout", path: "/logout", icon: LogOut, action: handleLogout, highlight: true },
    ];
  } else if (user.userType === "host") {
    navLinks = [
      { name: "Home", path: "/", icon: Home },
      { name: "Host Homes", path: "/hostHomes", icon: Key },
      { name: "Add Home", path: "/addHome", icon: PlusCircle },
      { name: "Logout", path: "/logout", icon: LogOut, action: handleLogout, highlight: true },
    ];
  }

  // Individual nav item
  const NavItem = ({ link }) => (
    <Link
      to={link.path}
      onClick={link.action || (() => {})}
      className={`flex items-center space-x-2 font-medium text-white hover:text-yellow-300 transition duration-300 ${
        link.highlight ? "px-4 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-500" : ""
      }`}
    >
      <link.icon className="w-5 h-5" />
      <span>{link.name}</span>
    </Link>
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-red-800 to-red-900 shadow-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-white animate-spin-slow" />
            <span className="text-2xl font-extrabold text-white tracking-wider">
              Air<span className="text-yellow-300">bnb</span> Clone
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavItem key={link.name} link={link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-red-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-red-900/95 shadow-2xl pb-3 rounded-b-xl mx-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={link.action || (() => setIsMenuOpen(false))}
                className={`block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-red-700 hover:text-yellow-300 ${
                  link.highlight ? "bg-red-700 font-bold" : ""
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
