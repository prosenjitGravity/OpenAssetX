import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="back-link-container">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span>
            Back to Home
          </Link>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <span className="icon-login">🔐</span>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-description">Sign in to your OpenAssetX account</p>
          </div>
          
          <div className="login-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="signup-link-container">
              <p className="signup-text">
                Don't have an account?{" "}
                <a href="/register" className="signup-link">
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;