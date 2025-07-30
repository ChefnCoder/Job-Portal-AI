import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [demoUser, setDemoUser] = useState(null);

  const demoCredentials = {
    candidate: { email: "demo.candidate@example.com", password: "candidate123" },
    recruiter: { email: "demo.recruiter@example.com", password: "recruiter123" },
  };

  const handleDemoLogin = (role) => {
    setDemoUser(demoCredentials[role]);
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    const res = await login(formData);
    setLoading(false);
    if (res) {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-300 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Welcome Back 👋
          </h2>

          {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}

          {loading ? (
            <div className="flex flex-col items-center py-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-blue-500 font-medium">Logging in...</p>
            </div>
          ) : (
            <AuthForm type="login" onSubmit={handleLogin} defaultValues={demoUser} />
          )}
        </div>

        {/* Right: Demo Buttons */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Try Demo Login</h3>
          <p className="text-sm text-gray-500 mb-6">
            Use predefined credentials to explore the app quickly.
          </p>

          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => handleDemoLogin("candidate")}
              disabled={loading}
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
              Demo Candidate
            </button>
            <button
              onClick={() => handleDemoLogin("recruiter")}
              disabled={loading}
              className="w-full px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
              Demo Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
