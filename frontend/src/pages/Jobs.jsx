import React from "react";
import { useState, useEffect } from "react";
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="p-4 border-b flex justify-between">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-sm">{job.description}</p>
              </div>
              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              >
                View Job
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
