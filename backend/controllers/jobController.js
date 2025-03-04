const Job = require("../models/Job");

// Create a Job (Recruiter Only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, skillsRequired, experienceLevel } = req.body;

    if (!title || !description || !experienceLevel) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = new Job({
      title,
      description,
      skillsRequired,
      experienceLevel,
      postedBy: req.user.userId, 
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// View Jobs Posted by Recruiter
exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Jobs (For Candidates)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a specific job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
