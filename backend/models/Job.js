const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [String],
    experienceLevel: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Recruiter ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
