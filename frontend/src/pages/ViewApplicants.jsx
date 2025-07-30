import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function ViewApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/applications/recruiter/applicants?jobId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplicants(res.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, [id]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/applications/recruiter/update-status`,
        { applicationId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Status updated successfully!");
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      setTimeout(() => setMessage(""), 3000); // auto-dismiss message
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("❌ Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Applicants for This Job
        </h1>

        {message && (
          <div className="text-center text-sm mb-6 font-medium text-green-600 animate-pulse">
            {message}
          </div>
        )}

        <div className="bg-white/60 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-xl">
          {applicants.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">
              No applicants yet. Be patient!
            </p>
          ) : (
            <div className="space-y-6">
              {applicants.map((app) => (
                <div
                  key={app._id}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-md"
                >
                  <div className="w-full md:w-2/3">
                  
                  <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    Match Score: {app.matchScore}%
                  </div>

                  {/* 🔹 Candidate Name */}
                  <h3 className="text-lg font-semibold text-gray-800">{app.candidateId.name}</h3>

                  {/* 📧 Email and Phone in same line */}
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Email:</span> {app.candidateId.email} &nbsp;|&nbsp;
                    <span className="font-medium">Phone:</span> +{app.phone_num || "N/A"}
                  </p>
                </div>


                  <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col md:items-end">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Update Status
                    </label>
                    <select
                      className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="In Process">In Process</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
