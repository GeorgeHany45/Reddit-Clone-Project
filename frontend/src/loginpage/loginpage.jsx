import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


import './AuthPage.css';

const LoginPage = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({ identifier:'', password:'' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5001/api/auth/login',formData);
      
      console.log("Login response data:", response.data);
      console.log("Response token:", response.data.token);
      console.log("Response user:", response.data.user);
      
      // Store token
      localStorage.setItem("token", response.data.token);
      
      // Store user data if it exists
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("Stored user in localStorage");
      } else {
        console.warn("WARNING: No user data in response!");
      }
      
      alert(' login successfully')
      navigate('/reddit')
     
    }
    catch(error){
      console.error("Login error:", error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
  };
 

  // Check if both fields are filled
  const isFormValid = formData.identifier.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className='box-modal'>
    <div className="login-modal">
        <h2 style={{marginBottom :'20px'}}>Log In</h2>
        <form onSubmit={handleSubmit}>
              {/* Email or Username Input */}
          <div className="input-wrapper">
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Email or username <span className="star">*</span></label>
          </div>

          {/* Password Input */}
          <div className="input-wrapper password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Password <span className="star">*</span></label>
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>       

          <div className="actions">
            <a href="#">Forgot password?</a>
          </div>

          <p className="signup-link">
               New to Reddit?
               <span onClick={switchToSignup}> Sign Up</span>
          </p>

          <button type="submit" className="auth-btn" disabled={!isFormValid}>
            Log In
          </button>
        </form>
      </div>
      </div>
   
  
    
  );
};

export default LoginPage;