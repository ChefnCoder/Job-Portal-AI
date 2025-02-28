const express = require("express");
const { verifyToken, recruiterOnly, candidateOnly } = require("../middleware/authMiddleware");
const { createJob, getRecruiterJobs, getAllJobs } = require("../controllers/jobController");

const router = express.Router();

// Create Job (Recruiters Only)
router.post("/create", verifyToken, recruiterOnly, createJob);

// Get Jobs Posted by a Recruiter
router.get("/recruiter-jobs", verifyToken, recruiterOnly, getRecruiterJobs);

// Get All Jobs (For Candidates)
router.get("/all", verifyToken, candidateOnly, getAllJobs);

module.exports = router;
