import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const { signup, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData) => {
    setLoading(true);
    const res = await signup(formData);
    setLoading(false);

    if (res) {
      alert("Signup successful! Redirecting...");
      navigate(res.user.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 via-indigo-100 to-slate-100 px-4">
      <div className="backdrop-blur-md bg-white/60 border border-slate-200 shadow-xl rounded-2xl p-10 w-full max-w-3xl animate-fade-in">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Join Us Today 🚀
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Create your account to access all features
        </p>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-blue-500 font-medium">Signing up...</p>
          </div>
        ) : (
          <AuthForm type="signup" onSubmit={handleSignup} />
        )}
      </div>
    </div>
  );
}
