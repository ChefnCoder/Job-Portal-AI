import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI-Powered Hiring Platform</h1>
      <p className="text-lg max-w-2xl">
        Streamline your hiring process with AI-driven job matching and resume parsing.
      </p>

      {/* ✅ Show Different Content Based on Login Status */}
      {!user ? (
        // 🔹 Not Logged In: Show Login & Signup Buttons
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      ) : (
        // 🔹 Logged In: Show Personalized Message & Dashboard Button
        <div className="mt-6 space-y-4">
          <p className="text-xl font-semibold">Hello, {user.name}! 👋</p>
          <p className="text-lg">
            {user.role === "candidate"
              ? "Explore job opportunities and track your applications."
              : "Manage job postings and find the best candidates."}
          </p>
          <button
            onClick={() =>
              navigate(user.role === "candidate" ? "/dashboard" : "/recruiter-dashboard")
            }
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer"
          >
            Go to {user.role === "candidate" ? "Dashboard" : "Recruiter Dashboard"}
          </button>
        </div>
      )}
    </div>
  );
}
