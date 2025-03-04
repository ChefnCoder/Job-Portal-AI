import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import PrivateRoute from "./components/PrivateRoute";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import ViewApplicants from "./pages/ViewApplicants";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar /> {/* ✅ Display Navbar Only After Login */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} /> */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/applications" element={<Applications />} />

        {/* Protected Routes for Candidates */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Protected Routes for Recruiters */}
        <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/jobs/:id/applicants" element={<ViewApplicants />} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
