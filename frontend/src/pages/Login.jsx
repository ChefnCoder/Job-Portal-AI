import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [demoUser, setDemoUser] = useState(null);

  // ✅ Predefined Demo Credentials
  const demoCredentials = {
    candidate: {
      email: "demo.candidate@example.com",
      password: "candidate123",
    },
    recruiter: {
      email: "demo.recruiter@example.com",
      password: "recruiter123",
    },
  };

  // ✅ Autofill Login Form with Demo Credentials
  const handleDemoLogin = (role) => {
    setDemoUser(demoCredentials[role]);
  };

  const handleLogin = async (formData) => {
    const res = await login(formData);
    if (res) {
      navigate("/");
      window.location.reload(); // Refresh the page after navigating
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* ✅ Render Login Form with Demo Credentials if Selected */}
      <AuthForm type="login" onSubmit={handleLogin} defaultValues={demoUser} />

      {/* ✅ Demo Login Buttons */}
      <div className="mt-4 space-x-4">
        <button
          onClick={() => handleDemoLogin("candidate")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
        >
          Demo Candidate
        </button>
        <button
          onClick={() => handleDemoLogin("recruiter")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition cursor-pointer"
        >
          Demo Recruiter
        </button>
      </div>
    </div>
  );
}
