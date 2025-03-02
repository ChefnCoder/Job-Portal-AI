const express = require("express");
const { verifyToken, candidateOnly } = require("../middleware/authMiddleware");
const { applyForJob, getCandidateApplications, uploadMiddleware } = require("../controllers/applicationController");


const router = express.Router();


// Apply for a Job
router.post("/apply", verifyToken, candidateOnly, uploadMiddleware, applyForJob);

// Get Candidate's Applications
router.get("/my-applications", verifyToken, candidateOnly, getCandidateApplications);

module.exports = router;