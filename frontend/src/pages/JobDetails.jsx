import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch Job Details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  // Handle Resume Upload & Job Application
  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_URL}/applications/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMatchScore(res.data.application.matchScore);
      setStatus(res.data.application.status);
      setMessage("✅ Application submitted successfully!");
    } catch (error) {
      console.error("Application Error:", error);
      setMessage("❌ Failed to apply for job.");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Left Half - Job Details */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="mt-2">{job.description}</p>
        <h2 className="text-xl font-semibold mt-4">Skills Required</h2>
        <p>{job.skillsRequired.join(", ")}</p>
        <h2 className="text-xl font-semibold mt-4">Experience Level</h2>
        <p>{job.experienceLevel}</p>
      </div>

      {/* Right Half - Apply Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Upload Resume</h2>
        <form onSubmit={handleApply}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="border p-2 w-full cursor-pointer"
            required
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
            Apply
          </button>
        </form>

        {message && <p className="mt-2">{message}</p>}
        {matchScore !== null && <p className="mt-2">Match Score: {matchScore}%</p>}
        {status && <p className="mt-2">Application Status: {status}</p>}
      </div>
    </div>
  );
}
