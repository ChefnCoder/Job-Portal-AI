const jwt = require("jsonwebtoken");

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to allow only Recruiters
exports.recruiterOnly = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ error: "Access Denied. Recruiter only." });
  }
  next();
};

// Middleware to allow only Candidates
exports.candidateOnly = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ error: "Access Denied. Candidate only." });
  }
  next();
};
