import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);


  // Fetch Applied Jobs for Candidate
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User might not be logged in.");
          return;
        }

        const res = await axios.get(`${API_URL}/applications/my-applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Candidate Dashboard</h1>
      <p className="mb-2">Welcome, {user?.name}</p>

      {/* Applied Jobs Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">My Applications</h2>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <ul>
            {applications.map((app) => (
              <li key={app._id} className="p-2 border-b">
                <h3 className="font-bold">{app.jobId.title}</h3>
                <p className="text-sm">Match Score: {app.matchScore}</p>
                <p className="text-sm">Status: {app.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
