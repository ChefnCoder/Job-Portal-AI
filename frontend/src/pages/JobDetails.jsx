import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa"; // Import upload icon

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    
    setLoading(true);
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
      setTimeout(() => {
        setLoading(false);
        setResume(null); // Reset file input
      }, 1000);
    } catch (error) {
      console.error("Application Error:", error);
      setMessage("❌ Failed to apply for job.");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ✅ Left Half - Job Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">{job.title}</h1>
        <p className="mt-2 text-gray-700">{job.description}</p>
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">Skills Required</h2>
          <p className="text-gray-600">{job.skillsRequired.join(", ")}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">Experience Level</h2>
          <p className="text-gray-600">{job.experienceLevel}</p>
        </div>
      </div>

      {/* ✅ Right Half - Apply Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Upload Resume</h2>
        <form onSubmit={handleApply} className="space-y-4">
        <label className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="hidden"
            required
          />
          <FaCloudUploadAlt className="text-3xl text-gray-500 mr-2" />
          <span className="text-gray-700">
            {resume ? resume.name : "Upload Your Resume (PDF)"}
          </span>
        </label>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md  transition cursor-pointer">
            Apply Now
          </button>
        </form>

        {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}
        
        {matchScore !== null && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded">
            <p className="text-lg font-semibold">Match Score: {matchScore}%</p>
          </div>
        )}
        
        {status && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            <p className="text-lg font-semibold">Application Status: {status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
