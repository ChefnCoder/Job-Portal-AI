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

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="p-4 bg-white shadow-md flex justify-between">
        <Link to="/" className="text-lg font-bold">Job Portal</Link>
        <div className="space-x-4">
        <Link to="/jobs" className="text-blue-500">Jobs</Link>
        <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        <Link to="/recruiter-dashboard" className="text-blue-500">RecruiterDashboard</Link>
        <Link to="/login" className="text-blue-500">Login</Link>
        <Link to="/signup" className="text-blue-500">Signup</Link>
        

        </div>
      </nav>
      
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
