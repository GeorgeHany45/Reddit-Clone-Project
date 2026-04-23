import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'


import './LoginPage.css';

const LoginPage = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({ identifier:'', password:'' });
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5001/api/auth/login',formData);
      localStorage.setItem("token", response.data.token);
      alert(' login successfully')
     
    }
    catch(error){
      console.log(error.message)
      alert('incorrect login details')
    }
  };
 

  // Check if both fields are filled
  const isFormValid = formData.identifier.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className="login-modal">
      <div className="modal-content">
        <h2>Log In</h2>
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

          <button type="submit" className="login-btn" disabled={!isFormValid}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;