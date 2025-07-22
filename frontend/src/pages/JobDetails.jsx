import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [parsedApplication, setParsedApplication] = useState(null);
  const [resumeExtract, setResumeExtract] = useState("");
  const [suggestions, setSuggestions] = useState("");

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

  const handleResumeAnalysis = async (e) => {
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

      setParsedApplication(res.data.parsedApplication);
      setResumeExtract(res.data.resumeExtract);
      setMatchScore(res.data.parsedApplication.matchScore);
      setMessage("✅ Resume analyzed successfully!");
    } catch (error) {
      console.error("Resume Analysis Error:", error);
      setMessage("❌ Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!resumeExtract || !id) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/applications/suggestion`,
        {
          responseText: resumeExtract,
          jobId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuggestions(res.data.resumeSuggestions);
    } catch (error) {
      console.error("Suggestion Error:", error);
      setSuggestions("❌ Failed to fetch suggestions.");
    }
  };

  const handleSubmitApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/applications/submit`,
        {
          applicationData: parsedApplication,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Application submitted successfully!");
      setStatus("Applied");
    } catch (error) {
      //console.error("Submission Error:", error);
      if(error.status ==400 )
        setMessage("You have already applied for this job");
      else 
        setMessage("❌ Failed to submit application.");
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

      {/* ✅ Right Half - Resume Upload & Flow */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Upload Resume</h2>
        <form onSubmit={handleResumeAnalysis} className="space-y-4">
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
            className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md transition cursor-pointer"
          >
            Analyze Resume
          </button>
        </form>

        {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}

        {matchScore !== null && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded">
            <p className="text-lg font-semibold">Match Score: {matchScore}%</p>
          </div>
        )}

        {parsedApplication && (
          <>
            <button
              onClick={handleGetSuggestions}
              className="w-full mt-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-md transition cursor-pointer"
            >
              Get AI Suggestions
            </button>

            
            {suggestions && (
              <div className="mt-4 p-4 bg-gray-100 border-l-4 border-purple-500 text-gray-800 rounded space-y-2">
                <h3 className="text-lg font-semibold text-purple-700">AI Suggestions</h3>
                {(() => {
                  try {
                    const parsed = JSON.parse(suggestions.replace(/```json|```/g, "").trim());
                    return (
                      <div className="space-y-1">
                        <p><strong>Missing Skills/Experiences:</strong> {parsed["Missing Skills/Experiences"]}</p>
                        <p><strong>Company Specific Skills that would Boost your Profile:</strong> {parsed["Company Specific Skills that would Boost your Profile"]}</p>
                        <p><strong>Extra Suggestions:</strong> {parsed["Extra Suggestions"]}</p>
                      </div>
                    );
                  } catch {
                    return <pre className="whitespace-pre-wrap">{suggestions}</pre>;
                  }
                })()}
              </div>
            )}

              
            <button
              onClick={handleSubmitApplication}
              className="w-full mt-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-md transition cursor-pointer"
            >
              Submit Application
            </button>
          </>
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
