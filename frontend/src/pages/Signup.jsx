import AuthForm from "../components/AuthForm";

export default function Signup() {
  const handleSignup = (formData) => {
    console.log("Signing up with:", formData);
    // Here we will integrate API call later
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}
