import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./AuthPage.css"
import LoginPage from "./loginpage";
import { useNavigate } from "react-router-dom";

const Signup = ({ switchToLogin }) => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  

  const [step, setStep] = useState(1); 

  const isEmailValid = email.trim() !== "";
  const isFormValid =
    username.trim() !== "" && password.trim() !== "";

  // Step 1 → go to step 2
  const handleContinue = () => {
    setStep(2);
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        username,
        email,
        password,
      });
      alert('signup successfully')
      navigate('/reddit')

      
      
    } catch (error) {
      console.log(error.message);
      alert("Signup failed");
    }
  };

  

  return (
    <div className="box-modal">
    <div className="login-modal">
      <div className="modal-content">
        <h2 style={{marginBottom : '20px'}}>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Email */}
          {step === 1 && (
            <>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label>
                  Email <span className="star">*</span>
                </label>
              </div>

              <button
                type="button"
                className="auth-btn"
                disabled={!isEmailValid}
                onClick={handleContinue}
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2: Username + Password */}
          {step === 2 && (
            <>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder=" "
                  required
                />
                <label>
                  Username <span className="star">*</span>
                </label>
              </div>

              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder=" "
                  required
                />
                <label>
                  Password <span className="star">*</span>
                </label>
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </>
          )}

          <p className="signup-link">
            Already have an account?<span onClick={ switchToLogin }>Log In</span>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;