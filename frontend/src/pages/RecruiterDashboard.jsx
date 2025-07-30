import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-800">Welcome To Your Dashboard</h1>
          {/* <p className="text-lg text-gray-600 mt-2">
            Welcome back, <span className="font-semibold">{user?.name}</span>
          </p> */}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Posted Jobs</h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">You haven’t posted any jobs yet.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-200 p-3 rounded-xl flex items-center justify-between hover:shadow-md transition duration-200 bg-gray-50"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                    {/* <p className="text-sm text-gray-500 mt-1">Job ID: {job._id}</p> */}
                  </div>

                  <button
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow cursor-pointer"
                  >
                    <FaUsers />
                    View Applicants
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
