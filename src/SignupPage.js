import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>🎉 Join the HappyHub 🎈</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="👤 Your Name" required />
        <input type="email" placeholder="📧 Email Address" required />
        <input type="password" placeholder="🔐 Create Password" required />
        <button type="submit">🚀 Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
