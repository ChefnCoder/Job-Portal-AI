import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="p-4 bg-white shadow-md flex justify-between">
        <Link to="/" className="text-lg font-bold">Job Portal</Link>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/signup" className="text-blue-500">Signup</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
