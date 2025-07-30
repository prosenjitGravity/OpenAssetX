import React, { useState } from 'react';
import './registration.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    } else if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) {
      newErrors.walletAddress = "Please enter a valid Ethereum wallet address";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log("Registration data:", formData);
      alert("Account created successfully! You've received 1000 tokens!");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="back-link-container">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span>
            Back to Home
          </Link>
        </div>

        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">
              <span className="icon-coins">🪙</span>
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-description">
              Join OpenAssetX and get <strong>1000 money tokens free!</strong>
            </p>
          </div>
          
          <div className="register-content">
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="walletAddress" className="form-label">
                  Wallet Address
                  <span className="field-hint">Your Ethereum/Polygon wallet for token transactions</span>
                </label>
                <input
                  id="walletAddress"
                  type="text"
                  className={`form-input ${errors.walletAddress ? 'form-input-error' : ''}`}
                  placeholder="0x... (Your Ethereum/Polygon wallet)"
                  value={formData.walletAddress}
                  onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                  required
                />
                {errors.walletAddress && <span className="error-message">{errors.walletAddress}</span>}
              </div>

              <div className="checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button 
                type="submit" 
                className={`register-button ${!formData.agreeToTerms ? 'register-button-disabled' : ''}`}
                disabled={!formData.agreeToTerms}
              >
                <span className="button-icon">🚀</span>
                Create Account & Get 1000 Tokens
              </button>
            </form>

            <div className="login-link-container">
              <p className="login-text">
                Already have an account?{" "}
                <a href="/login" className="login-link">
                  Sign in
                </a>
              </p>
            </div>

            <div className="security-badge">
              <span className="security-icon">🔒</span>
              <span className="security-text">Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;