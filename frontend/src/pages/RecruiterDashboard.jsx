import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  // ✅ Fetch Jobs Posted by Recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/jobs/recruiter-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <button
          onClick={() => navigate("/recruiter/post-job")}
          className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
        >
          Post New Job
        </button>
      </div>
      <p>Welcome, {user?.name}</p>

      {/* ✅ Recruiter Posted Jobs */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="p-4 border-b flex justify-between">
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm">Applicants: {job.applicantCount || 0}</p>
                </div>
                <button
                  onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                >
                  View Applicants
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
