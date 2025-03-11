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
        

      {user.role === "candidate" && (
        <>
        <button
            onClick={() => navigate("/jobs")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md  hover:bg-blue-600 transition cursor-pointer border-"
          >Jobs</button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md  hover:bg-blue-600 transition cursor-pointer border-"
          >Dashboard</button>
          {/* <Link to="/jobs" className="text-blue-500">Jobs</Link>
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link> */}
        </>
      )}

        {user.role === "recruiter" && (
          <>
          <button
            onClick={() => navigate("/recruiter-dashboard")}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md  transition cursor-pointer"
          >Dashboard</button>
          {/* <Link to="/recruiter-dashboard" className="text-blue-500"> Dashboard</Link> */}
          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md  hover:bg-blue-600 transition cursor-pointer border-"
          >
            + Post New Job
          </button>
          </>
          
        )}

        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-500 text-white  rounded-lg shadow-md  hover:bg-red-600 transition cursor-pointertext-red-500 hover:underline cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
