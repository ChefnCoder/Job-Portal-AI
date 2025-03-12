import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [demoUser, setDemoUser] = useState(null);

  // Predefined Demo Credentials
  const demoCredentials = {
    candidate: { email: "demo.candidate@example.com", password: "candidate123" },
    recruiter: { email: "demo.recruiter@example.com", password: "recruiter123" },
  };

  // Autofill Login Form with Demo Credentials
  const handleDemoLogin = (role) => {
    setDemoUser(demoCredentials[role]);
  };

  const handleLogin = async (formData) => {
    setLoading(true); // Show loader
    const res = await login(formData);
    setLoading(false); // Hide loader after response

    if (res) {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show Loader when loading */}
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
          <p className="mt-2 text-blue-500">Logging in...</p>
        </div>
      ) : (
        <>
          {/* ✅ Render Login Form */}
          <AuthForm type="login" onSubmit={handleLogin} defaultValues={demoUser} />

          {/* ✅ Demo Login Buttons */}
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleDemoLogin("candidate")}
              className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition rounded-lg shadow-md cursor-pointer"
              disabled={loading} // Disable while loading
            >
              Demo Candidate
            </button>
            <button
              onClick={() => handleDemoLogin("recruiter")}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition cursor-pointer"
              disabled={loading} // Disable while loading
            >
              Demo Recruiter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
