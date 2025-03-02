const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_num: { type: Number, required: false, default: null },
    education: [
      {
      degree: { type: String, required: true },
      branch: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true }
      }
    ],
    experience: [
      {
        job_title: { type: String, required: false, default: "N/A" },
        company: { type: String, required: false, default: "N/A" },
        start_date: { type: String, required: false, default: "N/A" },
        end_date: { type: String, required: false, default: "N/A" }
      }
    ],
    
    skills: { type: [String], required: true },
    matchScore: { type: Number, required: true }, // AI match percentage
    status: { type: String, enum: ["Applied", "In Process", "Selected", "Rejected"], default: "Applied" },
    },
    
    { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
