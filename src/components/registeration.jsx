import React, { useState } from 'react';
import './registration.css';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    
    // Profile Information
    country: "",
    phoneNumber: "",
    dateOfBirth: "",
    
    // Blockchain Information
    walletAddress: "",
    preferredNetwork: "ethereum",
    
    // Trading Preferences
    tradingExperience: "",
    interestedCategories: [],
    
    // Legal & Verification
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false,
    verifyAge: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const steps = [
    { id: 1, title: "Personal Info", icon: "person" },
    { id: 2, title: "Blockchain Setup", icon: "currency_bitcoin" },
    { id: 3, title: "Preferences", icon: "settings" },
    { id: 4, title: "Verification", icon: "verified_user" }
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", 
    "Australia", "Japan", "India", "Singapore", "Other"
  ];

  const networks = [
    { id: "ethereum", name: "Ethereum", icon: "⟠", description: "Main network for most assets" },
    { id: "polygon", name: "Polygon", icon: "⬟", description: "Lower fees, faster transactions" },
    // { id: "binance", name: "BSC", icon: "🟡", description: "Binance Smart Chain" }
  ];

  const categories = [
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "art", name: "Art & Collectibles", icon: "🎨" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "clothing", name: "Fashion", icon: "👕" },
    { id: "home", name: "Home & Garden", icon: "🏠" },
    { id: "automotive", name: "Automotive", icon: "🚗" }
  ];

  const tradingLevels = [
    { id: "beginner", name: "Beginner", description: "New to trading" },
    { id: "intermediate", name: "Intermediate", description: "Some trading experience" },
    { id: "advanced", name: "Advanced", description: "Experienced trader" }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.username.trim()) newErrors.username = "Username is required";
      else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters";
      
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      if (!formData.country) newErrors.country = "Country is required";
    }

    if (step === 2) {
      if (!formData.walletAddress.trim()) {
        newErrors.walletAddress = "Wallet address is required";
      } else if (!formData.walletAddress.startsWith('0x') || formData.walletAddress.length !== 42) {
        newErrors.walletAddress = "Please enter a valid Ethereum wallet address";
      }
    }

    if (step === 4) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy";
      if (!formData.verifyAge) newErrors.verifyAge = "You must confirm you are at least 18 years old";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleCategoryToggle = (categoryId) => {
    const categories = formData.interestedCategories;
    const newCategories = categories.includes(categoryId)
      ? categories.filter(id => id !== categoryId)
      : [...categories, categoryId];
    handleInputChange('interestedCategories', newCategories);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      console.log("Registration data:", formData);
      // Handle registration logic here
      alert("Account created successfully! You've received 1000 tokens!");
    }
  };

  // const connectWallet = async () => {
  //   setIsConnectingWallet(true);
  //   // Simulate wallet connection
  //   setTimeout(() => {
  //     setFormData({
  //       ...formData,
  //       walletAddress: "0x1234567890abcdef1234567890abcdef12345678"
  //     });
  //     setIsConnectingWallet(false);
  //   }, 2000);
  // };

  const getStepProgress = () => {
    return (currentStep / steps.length) * 100;
  };


  const connectWallet = async () => {
    try {
      setIsConnectingWallet(true);
      if (!window.ethereum) {
        alert("MetaMask not found. Please install the MetaMask extension.");
        setIsConnectingWallet(false);
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts[0]) {
        handleInputChange('walletAddress', accounts[0]);
      }
      setIsConnectingWallet(false);
    } catch (error) {
      alert("Failed to connect wallet: " + (error?.message || error));
      setIsConnectingWallet(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        {/* Back Link */}
        <div className="registration-back-link-container">
          <Link to="/" className="registration-back-link">
            <span className="registration-back-arrow">←</span>
            Back to Home
          </Link>
        </div>

        {/* Main Registration Card */}
        <div className="registration-card">
          {/* Header */}
          <div className="registration-header">
            <div className="registration-icon">
              <span className="registration-icon-coins">🪙</span>
            </div>
            <h1 className="registration-title">Create Your Account</h1>
            <p className="registration-description">
              Join OpenAssetX and get <strong>1000 money tokens free!</strong> Start trading blockchain assets today.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="registration-progress">
            <div className="registration-progress-bar">
              <div 
                className="registration-progress-fill"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
            <div className="registration-steps-indicator">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`registration-step-item ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}
                >
                  <div className="material-icons registration-step-circle">
                    {currentStep > step.id ? '✓' : step.icon}
                  </div>
                  <span className="registration-step-title">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="registration-content">
            <form onSubmit={handleSubmit} className="registration-form">
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="registration-step-content">
                  <h2 className="registration-step-heading">
                    <span className="material-icons registration-step-icon">person</span>
                    Personal Information
                  </h2>
                  
                  <div className="registration-form-grid">
                    <div className="registration-form-group">
                      <label htmlFor="fullName" className="registration-form-label">
                        Full Name <span className="registration-required">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className={`registration-form-input ${errors.fullName ? 'registration-form-input-error' : ''}`}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      />
                      {errors.fullName && <span className="registration-error-message">{errors.fullName}</span>}
                    </div>

                    <div className="registration-form-group">
                      <label htmlFor="username" className="registration-form-label">
                        Username <span className="registration-required">*</span>
                      </label>
                      <input
                        id="username"
                        type="text"
                        className={`registration-form-input ${errors.username ? 'registration-form-input-error' : ''}`}
                        placeholder="Choose a unique username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                      />
                      {errors.username && <span className="registration-error-message">{errors.username}</span>}
                    </div>

                    <div className="registration-form-group registration-form-group-full">
                      <label htmlFor="email" className="registration-form-label">
                        Email Address <span className="registration-required">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`registration-form-input ${errors.email ? 'registration-form-input-error' : ''}`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && <span className="registration-error-message">{errors.email}</span>}
                    </div>

                    <div className="registration-form-group">
                      <label htmlFor="password" className="registration-form-label">
                        Password <span className="registration-required">*</span>
                      </label>
                      <div className="registration-password-container">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className={`registration-form-input ${errors.password ? 'registration-form-input-error' : ''}`}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <button
                          type="button"
                          className="material-icons registration-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="registration-password-strength">
                          <div className="registration-strength-bar">
                            <div 
                              className={`registration-strength-fill strength-${passwordStrength}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <span className="registration-strength-text">
                            {passwordStrength < 2 ? 'Weak' : passwordStrength < 4 ? 'Medium' : 'Strong'}
                          </span>
                        </div>
                      )}
                      {errors.password && <span className="registration-error-message">{errors.password}</span>}
                    </div>

                    <div className="registration-form-group">
                      <label htmlFor="confirmPassword" className="registration-form-label">
                        Confirm Password <span className="registration-required">*</span>
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className={`registration-form-input ${errors.confirmPassword ? 'registration-form-input-error' : ''}`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                      {errors.confirmPassword && <span className="registration-error-message">{errors.confirmPassword}</span>}
                    </div>

                    <div className="registration-form-group">
                      <label htmlFor="country" className="registration-form-label">
                        Country <span className="registration-required">*</span>
                      </label>
                      <select
                        id="country"
                        className={`registration-form-select ${errors.country ? 'registration-form-input-error' : ''}`}
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      {errors.country && <span className="registration-error-message">{errors.country}</span>}
                    </div>

                    <div className="registration-form-group">
                      <label htmlFor="phoneNumber" className="registration-form-label">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        className="registration-form-input"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Blockchain Setup */}
              {currentStep === 2 && (
                <div className="registration-step-content">
      <h2 className="registration-step-heading">
        <span className="registration-step-icon">🔗</span>
        Blockchain Setup
      </h2>

      <div className="registration-blockchain-section">

        {/* Preferred Network Selection */}
        <div className="registration-network-selection">
          <label className="registration-form-label">
            Preferred Network <span className="registration-required">*</span>
          </label>
          <div className="registration-network-grid">
            {networks.map((network) => (
              <button
                key={network.id}
                type="button"
                className={`registration-network-btn ${formData.preferredNetwork === network.id ? 'active' : ''}`}
                onClick={() => handleInputChange('preferredNetwork', network.id)}
              >
                <span className="registration-network-icon">{network.icon}</span>
                <div className="registration-network-info">
                  <span className="registration-network-name">{network.name}</span>
                  <span className="registration-network-desc">{network.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Wallet Address and Connect Button */}
        <div className="registration-wallet-section">
          <label className="registration-form-label">
            Wallet Address <span className="registration-required">*</span>
          </label>
          <div className="registration-wallet-input-container">
            <input
              type="text"
              className={`registration-form-input ${errors.walletAddress ? 'registration-form-input-error' : ''}`}
              placeholder="0x... (Your wallet address)"
              value={formData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              readOnly={!!formData.walletAddress}
            />
            <button
              type="button"
              className="registration-connect-wallet-btn"
              onClick={connectWallet}
              disabled={isConnectingWallet}
            >
              {isConnectingWallet ? (
                <>
                  <span className="registration-spinner">⏳</span>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="registration-wallet-icon">💼</span>
                  Connect Wallet
                </>
              )}
            </button>
          </div>
          {formData.walletAddress && (
            <div className="registration-wallet-success">
              <span className="registration-success-icon">✅</span>
              Connected: {formData.walletAddress}
            </div>
          )}
          {errors.walletAddress && <span className="registration-error-message">{errors.walletAddress}</span>}

          <div className="registration-wallet-info">
            <div className="registration-info-item">
              <span className="registration-info-icon">🔒</span>
              <span>Your wallet is used for secure token transactions</span>
            </div>
            <div className="registration-info-item">
              <span className="registration-info-icon">💰</span>
              <span>1000 free tokens will be sent to this address</span>
            </div>
          </div>
        </div>
      </div>
    </div>

              )}

              {/* Step 3: Trading Preferences */}
              {currentStep === 3 && (
                <div className="registration-step-content">
                  <h2 className="registration-step-heading">
                    <span className="registration-step-icon">⚙️</span>
                    Trading Preferences
                  </h2>

                  <div className="registration-preferences-section">
                    <div className="registration-form-group">
                      <label className="registration-form-label">
                        Trading Experience
                      </label>
                      <div className="registration-experience-grid">
                        {tradingLevels.map((level) => (
                          <button
                            key={level.id}
                            type="button"
                            className={`registration-experience-btn ${formData.tradingExperience === level.id ? 'active' : ''}`}
                            onClick={() => handleInputChange('tradingExperience', level.id)}
                          >
                            <span className="registration-experience-name">{level.name}</span>
                            <span className="registration-experience-desc">{level.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="registration-form-group">
                      <label className="registration-form-label">
                        Interested Categories
                      </label>
                      <div className="registration-categories-grid">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            className={`registration-category-btn ${formData.interestedCategories.includes(category.id) ? 'active' : ''}`}
                            onClick={() => handleCategoryToggle(category.id)}
                          >
                            <span className="registration-category-icon">{category.icon}</span>
                            <span className="registration-category-name">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Terms & Verification */}
              {currentStep === 4 && (
                <div className="registration-step-content">
                  <h2 className="registration-step-heading">
                    <span className="registration-step-icon">✅</span>
                    Terms & Verification
                  </h2>

                  <div className="registration-verification-section">
                    <div className="registration-account-summary">
                      <h3 className="registration-summary-title">Account Summary</h3>
                      <div className="registration-summary-grid">
                        <div className="registration-summary-item">
                          <span className="registration-summary-label">Name:</span>
                          <span className="registration-summary-value">{formData.fullName}</span>
                        </div>
                        <div className="registration-summary-item">
                          <span className="registration-summary-label">Username:</span>
                          <span className="registration-summary-value">@{formData.username}</span>
                        </div>
                        <div className="registration-summary-item">
                          <span className="registration-summary-label">Email:</span>
                          <span className="registration-summary-value">{formData.email}</span>
                        </div>
                        <div className="registration-summary-item">
                          <span className="registration-summary-label">Network:</span>
                          <span className="registration-summary-value">
                            {networks.find(n => n.id === formData.preferredNetwork)?.name}
                          </span>
                        </div>
                        <div className="registration-summary-item">
                          <span className="registration-summary-label">Free Tokens:</span>
                          <span className="registration-summary-value registration-tokens-highlight">1000 tokens</span>
                        </div>
                      </div>
                    </div>

                    <div className="registration-terms-section">
                      <div className="registration-checkbox-group">
                        <label className="registration-checkbox-container">
                          <input
                            type="checkbox"
                            className="registration-checkbox-input"
                            checked={formData.agreeToTerms}
                            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          />
                          <span className="registration-checkbox-custom"></span>
                          <span className="registration-checkbox-text">
                            I agree to the <a href="/terms" className="registration-terms-link">Terms of Service</a> <span className="registration-required">*</span>
                          </span>
                        </label>
                        {errors.agreeToTerms && <span className="registration-error-message">{errors.agreeToTerms}</span>}
                      </div>

                      <div className="registration-checkbox-group">
                        <label className="registration-checkbox-container">
                          <input
                            type="checkbox"
                            className="registration-checkbox-input"
                            checked={formData.agreeToPrivacy}
                            onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                          />
                          <span className="registration-checkbox-custom"></span>
                          <span className="registration-checkbox-text">
                            I agree to the <a href="/privacy" className="registration-terms-link">Privacy Policy</a> <span className="registration-required">*</span>
                          </span>
                        </label>
                        {errors.agreeToPrivacy && <span className="registration-error-message">{errors.agreeToPrivacy}</span>}
                      </div>

                      <div className="registration-checkbox-group">
                        <label className="registration-checkbox-container">
                          <input
                            type="checkbox"
                            className="registration-checkbox-input"
                            checked={formData.verifyAge}
                            onChange={(e) => handleInputChange('verifyAge', e.target.checked)}
                          />
                          <span className="registration-checkbox-custom"></span>
                          <span className="registration-checkbox-text">
                            I confirm that I am at least 18 years old <span className="registration-required">*</span>
                          </span>
                        </label>
                        {errors.verifyAge && <span className="registration-error-message">{errors.verifyAge}</span>}
                      </div>

                      <div className="registration-checkbox-group">
                        <label className="registration-checkbox-container">
                          <input
                            type="checkbox"
                            className="registration-checkbox-input"
                            checked={formData.agreeToMarketing}
                            onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                          />
                          <span className="registration-checkbox-custom"></span>
                          <span className="registration-checkbox-text">
                            I want to receive updates and promotional emails (optional)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="registration-form-actions">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="registration-button-secondary"
                    onClick={handlePrevious}
                  >
                    <span className="registration-button-icon">←</span>
                    Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="registration-button-primary"
                    onClick={handleNext}
                  >
                    Next
                    <span className="registration-button-icon">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`registration-button-primary registration-button-submit ${!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.verifyAge ? 'registration-button-disabled' : ''}`}
                    disabled={!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.verifyAge}
                  >
                    <span className="registration-button-icon">🚀</span>
                    Create Account & Get 1000 Tokens
                  </button>
                )}
              </div>
            </form>

            {/* Additional Links */}
            <div className="registration-additional-links">
              <div className="registration-login-link-container">
                <p className="registration-login-text">
                  Already have an account?{" "}
                  <Link to="/login" className="registration-login-link">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="registration-security-badges">
                <div className="registration-security-badge">
                  <span className="material-icons registration-security-icon">enhanced_encryption</span>
                  <span className="registration-security-text">256-bit SSL encryption</span>
                </div>
                <div className="registration-security-badge">
                  <span className="material-icons registration-security-icon">security</span>
                  <span className="registration-security-text">GDPR compliant</span>
                </div>
                <div className="registration-security-badge">
                  <span className="material-icons registration-security-icon">⚡</span>
                  <span className="registration-security-text">bolt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
