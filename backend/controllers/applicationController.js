const Application = require("../models/Application");
const Job = require("../models/Job");
const pdf = require("pdf-parse");
const axios = require("axios");
const multer = require("multer");

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for handling file uploads in routes
exports.uploadMiddleware = upload.single("resume");

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    // Extract text from the uploaded PDF
    const pdfData = await pdf(req.file.buffer);
    const pdfText = pdfData.text;

    console.log("Extracted PDF Text:", pdfText);
    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(500).json({ error: "Failed to extract text from resume" });
    }

    // Get the Job Description
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // AI Matching Prompt
    const prompt = `
    Analyze this resume and compare the resume with the following job description and calculate a match score.

    Job Description: ${job.description}
    Required Skills: ${job.skillsRequired.join(", ")}
    
    Resume Text: ${pdfText}
    
    Then Extract and structure this resume data into JSON format.
    Ensure the output follows this exact schema:()
    {
    "name": "<Full Name>",
    "email": "<Email>",
    "phone_num" : <Number or 'N/A'>,
    "education": [
    {
        "degree": "<Degree or 'N/A'>",
        "branch": "<Branch or 'N/A'>",
        "institution": "<Institution Name or 'N/A'>",
        "year": "<Graduation Year or 'N/A'>"
    },]
    "experience": [
    {
        "job_title": "<Job Title or 'N/A'>",
        "company": "<Company Name or 'N/A'>",
        "start_date": "<YYYY-MM-DD or 'N/A'>",
        "end_date": "<YYYY-MM-DD or 'N/A'>"
    },]
    "skills": ["<Skill_1>", "<Skill_2>", "<Skill_3>", ...],
    "matchScore" : <score>"
    
    - If any field is missing, fill it with 'N/A'.
    - Use 'N/A' instead of leaving fields empty.
    - Do NOT include Markdown (\`\`\`json). Return raw JSON only.
    `;
    // ✅ Debug: Check what is being sent to AI
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅")
    console.log("Sending Prompt to AI:", prompt);

    // Send Resume & JD to Google Gemini AI
    let aiResponse;
    try {
      aiResponse = await axios.post(
       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          /* headers: { "Content-Type": "application/json" }, */
          params: { key: process.env.GEMINI_API_KEY },
        }
      );
    
      if (!aiResponse.data || aiResponse.status !== 200) {
        console.error("❌ Gemini API Error Response:", aiResponse.data);
        return res.status(500).json({ error: "AI processing failed" });
      }
    } catch (error) {
      console.error("❌ Gemini API Request Failed:", error.response?.data || error.message);
      return res.status(500).json({ error: "Failed to process AI request" });
    }
    

    // Extract AI Response
    let responseText = aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    responseText = responseText.replace(/```json|```/g, "").trim();
    //console.log(responseText)

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return res.status(500).json({ error: "Failed to parse LLM response." });
    }
    parsedData.candidateId = req.user.userId;
    parsedData.jobId = jobId;
    parsedData.name = parsedData.name || "N/A";
    parsedData.email = parsedData.email || "N/A";
    parsedData.phone_num = parsedData.phone_num && !isNaN(parsedData.phone_num) 
  ? Number(parsedData.phone_num) 
  : null;

    parsedData.education = parsedData.education || {};
    parsedData.education.degree = parsedData.education.degree || "N/A";
    parsedData.education.branch = parsedData.education.branch || "N/A";
    parsedData.education.institution = parsedData.education.institution || "N/A";
    parsedData.education.year = parsedData.education.year || "N/A";

    parsedData.experience = parsedData.experience || {};
    parsedData.experience.job_title = parsedData.experience.job_title || "N/A";
    parsedData.experience.company = parsedData.experience.company || "N/A";
    parsedData.experience.start_date = parsedData.experience.start_date || "N/A";
    parsedData.experience.end_date = parsedData.experience.end_date || "N/A";

    parsedData.skills = parsedData.skills || [];
    parsedData.matchScore= parsedData.matchScore || 0;
    // Store Application
    const application = new Application(parsedData);
   await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Resume Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Get Applications by Candidate
exports.getCandidateApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user.userId }).populate("jobId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// exports.getApplicantsForJob = async (req, res) => {
//   try {
//     const recruiterId = req.user.userId;

//     // Find jobs posted by this recruiter
//     const jobs = await Job.find({ postedBy: recruiterId });

//     if (!jobs.length) {
//       return res.status(404).json({ error: "No jobs found for this recruiter" });
//     }

//     // Extract job IDs
//     const jobIds = jobs.map(job => job._id);

//     // Fetch all applicants for these jobs & sort by match score (highest first)
//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .populate("candidateId", "name email") // Get candidate details
//       .populate("jobId", "title") // Get job title
//       .sort({ matchScore: -1 }); // Sort by highest match score

//     res.status(200).json(applications);
//   } catch (error) {
//     console.error("Error fetching applicants:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.query;
    const recruiterId = req.user.userId;

    // Ensure the recruiter owns the job
    const job = await Job.findOne({ _id: jobId, postedBy: recruiterId });
    if (!job) return res.status(403).json({ error: "Unauthorized to view applicants for this job" });

    // Fetch applicants & sort by match score
    const applications = await Application.find({ jobId })
      .populate("candidateId", "name email")
      .sort({ matchScore: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    // Ensure valid status
    const validStatuses = ["Applied", "In Process", "Selected", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Ensure only the recruiter who posted the job can update status
    const job = await Job.findById(application.jobId);
    if (!job || job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized to update this application" });
    }

    // Update status
    application.status = status;
    await application.save();

    res.status(200).json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
