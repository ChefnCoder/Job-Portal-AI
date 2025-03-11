import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const { signup, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData) => {
    setLoading(true); // Show loader
    const res = await signup(formData);
    setLoading(false); // Hide loader after response

    if (res) {
      alert("Signup successful! Redirecting...");
      navigate(res.user.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show Loader when loading */}
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
          <p className="mt-2 text-blue-500">Signing up...</p>
        </div>
      ) : (
        <AuthForm type="signup" onSubmit={handleSignup} />
      )}
    </div>
  );
}
