import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Page Wrapper Component to Apply Transitions
const PageWrapper = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

// Animated Routes Component (Handles Transitions)
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
        <Route path="/jobs/:id" element={<PageWrapper><JobDetails /></PageWrapper>} />
        <Route path="/applications" element={<PageWrapper><Applications /></PageWrapper>} />

        {/* Protected Routes for Candidates */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Route>

        {/* Protected Routes for Recruiters */}
        <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter-dashboard" element={<PageWrapper><RecruiterDashboard /></PageWrapper>} />
          <Route path="/recruiter/post-job" element={<PageWrapper><PostJob /></PageWrapper>} />
          <Route path="/recruiter/jobs/:id/applicants" element={<PageWrapper><ViewApplicants /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* ✅ Navbar stays on all pages */}
      <AnimatedRoutes /> {/* ✅ Handles all transitions centrally */}
    </div>
  );
}

export default App;
