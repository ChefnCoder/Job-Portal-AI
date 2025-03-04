import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function ViewApplicants() {
  const { id } = useParams(); 
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch Applicants for the Job
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

  //Handle Status Update
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/applications/recruiter/update-status`,
        { applicationId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Status Updated Successfully!");
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("❌ Failed to update status.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Applicants for Job</h1>

      {message && <p className="text-center text-green-500">{message}</p>}

      {/* List of Applicants */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {applicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <ul>
            {applicants.map((app) => (
              <li key={app._id} className="p-4 border-b flex justify-between">
                <div>
                  <h3 className="font-bold">{app.candidateId.name}</h3>
                  <p className="text-sm">Email: {app.candidateId.email}</p>
                  <p className="text-sm">Phone: +{app.phone_num || "N/A"}</p>
                  <p className="text-sm">Match Score: {app.matchScore}%</p>
                  <p className="text-sm">Status: {app.status}</p>
                </div>
                <select
                  className="p-2 border rounded"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="In Process">In Process</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
