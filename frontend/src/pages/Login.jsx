import AuthForm from "../components/AuthForm";

export default function Login() {
  
  const handleLogin = (formData) => {
    console.log("Logging in with:", formData);
    // Here we will integrate API call later
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
