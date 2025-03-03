const express = require("express");
const { verifyToken, candidateOnly,recruiterOnly } = require("../middleware/authMiddleware");
const { applyForJob, getCandidateApplications, uploadMiddleware } = require("../controllers/applicationController");
const { getApplicantsForJob, updateApplicationStatus } = require("../controllers/applicationController");

const router = express.Router();


// Apply for a Job
router.post("/apply", verifyToken, candidateOnly, uploadMiddleware, applyForJob);

// Get Candidate's Applications
router.get("/my-applications", verifyToken, candidateOnly, getCandidateApplications);

// Get all applicants for a recruiter's jobs
router.get("/recruiter/applicants", verifyToken, recruiterOnly, getApplicantsForJob);

// Update application status (Recruiter Only)
router.put("/recruiter/update-status", verifyToken, recruiterOnly, updateApplicationStatus);

module.exports = router;