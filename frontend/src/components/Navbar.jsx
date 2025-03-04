import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null; // ✅ Hide Navbar if not logged in

  return (
    <nav className="p-4 bg-white shadow-md flex justify-between">
      <Link to="/" className="text-lg font-bold">Job Portal</Link>
      <div className="space-x-4">
        <Link to="/jobs" className="text-blue-500">Jobs</Link>

        {user.role === "candidate" && (
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        )}
        
        {user.role === "recruiter" && (
          <Link to="/recruiter-dashboard" className="text-blue-500">Recruiter Dashboard</Link>
        )}

        <button 
          onClick={logout} 
          className="text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
