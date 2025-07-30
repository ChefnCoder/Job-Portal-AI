import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/jobs/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Explore Opportunities ✨
        </h1>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-16">
            No jobs available at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/70 border border-gray-200 backdrop-blur-sm shadow-lg rounded-xl p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{job.description}</p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-lg shadow-md transition"
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
