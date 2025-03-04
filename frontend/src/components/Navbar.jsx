import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // ✅ Hide Navbar if not logged in

  const handleLogout = async () => {
    await logout(); // ✅ Ensure logout completes before moving forward
    navigate("/"); // ✅ Redirect to Home
    window.location.reload(); // ✅ Force page reload to clear session completely
  };

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
          onClick={handleLogout} 
          className="text-red-500 hover:underline cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
