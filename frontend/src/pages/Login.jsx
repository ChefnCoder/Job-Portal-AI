import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const res = await login(formData);
    if (res) {
      alert("Login successful! Redirecting...");
      navigate(res.user.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard");
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <AuthForm type="login" onSubmit={handleLogin} />
    </>
  );
}
