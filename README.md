# **AI-Powered Hiring Platform 🚀**
### **Transforming Recruitment with AI-driven Resume Parsing & Job Matching**

## **📌 Overview**
The **AI-Powered Hiring Platform** is designed to streamline the recruitment process by integrating **AI-based resume parsing** and **job matching**.  

**✅ Features Implemented in Phase 1:**
- **User Authentication** (JWT + Refresh Token)  
- **Role-Based Access Control** (`Candidate`, `Recruiter`)  
- **Candidate Dashboard** (Resume Upload, Applied Jobs, Status Tracking)  
- **Job Listings & Details** (View & Apply for Jobs)  
- **Recruiter Dashboard** (Post Jobs, View Applicants, Update Status)  
- **AI Resume Matching** (Parses Resume, Extracts Skills, Computes Match Score)  
- **Fully Responsive UI** (Tailwind CSS, Clean UX)  

---

## **📌 Tech Stack**
| Tech | Purpose |
|------|---------|
| **React (Vite)** | Frontend (SPA) |
| **Tailwind CSS** | Styling & Responsiveness |
| **Node.js + Express** | Backend API |
| **MongoDB + Mongoose** | Database (Job Postings, Applications, Users) |
| **JWT (Access + Refresh Tokens)** | Secure Authentication |
| **Multer (File Uploads)** | Resume Parsing |
| **Google Gemini AI** | AI Resume Matching |

---

## **📌 Project Structure**
```
job-portal-ai/
│── backend/                
│   ├── controllers/        # Business logic for APIs
│   ├── middleware/         # JWT auth, input validation, etc.
│   ├── models/             # Mongoose schema (User, Jobs, Applications)
│   ├── routes/             # API endpoints
│   ├── utils/              # Helpers (encryption, AI integrations)
│   ├── config/             # Environment & DB connection
│   ├── server.js           # Main entry point
│
│── frontend/               
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Forms, Cards)
│   │   ├── pages/          # Pages (Login, Dashboard, Job Listing, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Context API for global state
│   │   ├── App.jsx         # Main App file
│   │   ├── main.jsx        # Entry point
│   └── .env                # Frontend environment variables
│
│── docs/                   # Project documentation
│── README.md               # Project overview
│── package.json            # Dependencies
│── .gitignore              # Ignore unnecessary files
```

---

## **📌 How to Run Locally**
### **🔹 Setup Backend**
```sh
cd backend
npm install
npm run dev
```
**Environment Variables (`backend/.env`)**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
GEMINI_API_KEY=your_gemini_api_key
```

### **🔹 Setup Frontend**
```sh
cd frontend
npm install
npm run dev
```
**Environment Variables (`frontend/.env`)**
```
VITE_BACKEND_API_URL=http://localhost:5000/api
```

---

## **📌 Future Enhancements (Phase 2 & Beyond)**
🔹 **AI-Powered Resume Feedback** (Suggests skill improvements before submission).  
🔹 **Automated AI Emails for Recruiters** (Rejection & Selection Emails).  
🔹 **Advanced Search & Filters for Candidates**.  
🔹 **Recruiter Auto-Screening Based on Minimum Match Score**.  
🔹 **Security & Performance Enhancements** (Rate Limiting, Redis Caching, API Docs).  

---

## **📌 Contributing**
1. **Fork the repository**  
2. **Create a feature branch**  
3. **Commit changes**  
4. **Submit a Pull Request**  

---

### **🚀 Let's revolutionize hiring with AI!** 🎯  
For any queries, feel free to **reach out @tanmay2020anand@gmail.com**! 💡  
