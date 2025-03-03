import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    const res = await signup(formData);
    if (res) {
      alert("Signup successful! Redirecting...");
      navigate(res.user.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard"); // Redirect based on role
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <AuthForm type="signup" onSubmit={handleSignup} />
    </>
  );
}
