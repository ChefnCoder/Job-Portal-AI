import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X } from "lucide-react";
//is importing two icon components – Menu and X – from the lucide-react library.

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/"); //navigate to respective page and ensure no reload happens
    window.location.reload(); //reload page after navigation
  };

  return (
    <nav className="relative bg-white p-4 shadow-md z-50">

      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Job Portal
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden text-gray-600"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {user.role === "candidate" && (
            <>
              <button
                onClick={() => navigate("/jobs")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Jobs
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Dashboard
              </button>
            </>
          )}

          {user.role === "recruiter" && (
            <>
              <button
                onClick={() => navigate("/recruiter-dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/recruiter/post-job")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
              >
                + Post New Job
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-4 right-4 z-50 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col space-y-3 lg:hidden transition-all duration-300">

          {user.role === "candidate" && (
            <>
              <button
                onClick={() => {
                  navigate("/jobs");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Jobs
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Dashboard
              </button>
            </>
          )}

          {user.role === "recruiter" && (
            <>
              <button
                onClick={() => {
                  navigate("/recruiter-dashboard");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/recruiter/post-job");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                
              >
                + Post New Job
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
