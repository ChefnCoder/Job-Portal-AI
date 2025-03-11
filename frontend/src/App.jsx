import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

// ✅ Lazy Loading Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RecruiterDashboard = lazy(() => import("./pages/RecruiterDashboard"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Applications = lazy(() => import("./pages/Applications"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const PostJob = lazy(() => import("./pages/PostJob"));
const ViewApplicants = lazy(() => import("./pages/ViewApplicants"));

// ✅ Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// ✅ Page Wrapper Component for Smooth Transitions
const PageWrapper = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

// ✅ Animated Routes with Lazy Loading
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex justify-center items-center h-screen">  
        <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 border-solid"></div>  
        <p className="ml-2 text-blue-500">Loading...</p>  
      </div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/applications" element={<PageWrapper><Applications /></PageWrapper>} />

          {/* Protected Routes for Candidates */}
          <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
            <Route path="/jobs/:id" element={<PageWrapper><JobDetails /></PageWrapper>} />
          </Route>

          {/* Protected Routes for Recruiters */}
          <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
            <Route path="/recruiter-dashboard" element={<PageWrapper><RecruiterDashboard /></PageWrapper>} />
            <Route path="/recruiter/post-job" element={<PageWrapper><PostJob /></PageWrapper>} />
            <Route path="/recruiter/jobs/:id/applicants" element={<PageWrapper><ViewApplicants /></PageWrapper>} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

// ✅ Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* ✅ Navbar stays on all pages */}
      <AnimatedRoutes /> {/* ✅ Handles all transitions & lazy loading */}
    </div>
  );
}

export default App;
