import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    experienceLevel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(`${API_URL}/jobs/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Job Posted Successfully!");
      navigate("/recruiter-dashboard");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <label className="block mb-2">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>

        <label className="block mb-2">Skills Required (Comma Separated)</label>
        <input
          type="text"
          name="skillsRequired"
          value={formData.skillsRequired}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Experience Level</label>
        <input
          type="text"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
          Post Job
        </button>
      </form>
    </div>
  );
}
