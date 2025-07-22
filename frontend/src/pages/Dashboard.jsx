import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

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

  const statusStyles = {
    Applied: "bg-blue-100 text-blue-700",
    "In Process": "bg-yellow-100 text-yellow-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          {/* <p className="text-lg text-gray-600 mt-2">
            Welcome back, <span className="font-semibold">{user?.name}</span>
          </p> */}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">My Applications</h2>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">You haven’t applied to any jobs yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="border border-gray-200 bg-white/90 p-5 rounded-xl flex justify-between items-center hover:shadow-lg transition duration-200"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{app.jobId.title}</h3>
                    <p
                      className={`inline-block mt-1 text-sm px-3 py-1 rounded-full font-medium ${
                        statusStyles[app.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {app.status}
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      const confirmed = window.confirm("🗑 Delete this application?");
                      if (!confirmed) return;
                      try {
                        const token = localStorage.getItem("token");
                        await axios.delete(`${API_URL}/applications/delete/${app._id}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        setApplications((prev) => prev.filter((a) => a._id !== app._id));
                      } catch (err) {
                        alert("❌ Could not delete application.");
                        console.error(err);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-2xl transition transform hover:scale-110 cursor-pointer"
                    title="Delete"
                  >
                    <MdDeleteOutline />
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
