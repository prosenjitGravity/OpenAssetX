import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'wallet'
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const [recentActivity] = useState([
    { device: "Chrome on Windows", location: "New York, US", time: "2 hours ago", current: true },
    { device: "Mobile App", location: "New York, US", time: "1 day ago", current: false },
    { device: "Firefox on Mac", location: "California, US", time: "3 days ago", current: false }
  ]);

  const socialLogins = [
    { id: 'google', name: 'Google', icon: '🔍', color: '#4285f4' },
    { id: 'github', name: 'GitHub', icon: '🐙', color: '#333' },
    { id: 'discord', name: 'Discord', icon: '🎮', color: '#5865f2' }
  ];

  const walletOptions = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊', description: 'Connect with MetaMask' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗', description: 'Scan QR code' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: '💼', description: 'Coinbase Wallet' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (loginMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log("Login data:", formData);
      setIsLoading(false);
      // Handle successful login
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Handle social login
    }, 1500);
  };

  const handleWalletConnect = (wallet) => {
    console.log(`Connecting with ${wallet}`);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Handle wallet connection
    }, 2000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Reset password for:", forgotEmail);
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Back Link */}
        <div className="login-back-link-container">
          <Link to="/" className="login-back-link">
            <span className="login-back-arrow">←</span>
            Back to Home
          </Link>
        </div>

        <div className="login-content-grid">
          {/* Welcome Section */}
          <div className="login-welcome-section">
            <div className="login-welcome-card">
              <div className="login-welcome-header">
                <div className="login-brand">
                  <span className="login-brand-icon">🔗</span>
                  <span className="login-brand-text">OpenAssetX</span>
                </div>
                <h2 className="login-welcome-title">Welcome Back!</h2>
                <p className="login-welcome-description">
                  Continue your blockchain asset trading journey with secure access to your account.
                </p>
              </div>

              <div className="login-features-list">
                <div className="login-feature-item">
                  <span className="login-feature-icon">🔒</span>
                  <div className="login-feature-content">
                    <h4 className="login-feature-title">Secure Trading</h4>
                    <p className="login-feature-desc">Bank-level security for all transactions</p>
                  </div>
                </div>
                <div className="login-feature-item">
                  <span className="login-feature-icon">⚡</span>
                  <div className="login-feature-content">
                    <h4 className="login-feature-title">Instant Access</h4>
                    <p className="login-feature-desc">Quick login to your dashboard</p>
                  </div>
                </div>
                <div className="login-feature-item">
                  <span className="login-feature-icon">🌐</span>
                  <div className="login-feature-content">
                    <h4 className="login-feature-title">Global Marketplace</h4>
                    <p className="login-feature-desc">Trade with users worldwide</p>
                  </div>
                </div>
              </div>

              <div className="login-stats-container">
                <div className="login-stat-item">
                  <span className="login-stat-number">10K+</span>
                  <span className="login-stat-label">Active Users</span>
                </div>
                <div className="login-stat-item">
                  <span className="login-stat-number">25K+</span>
                  <span className="login-stat-label">Assets Traded</span>
                </div>
                <div className="login-stat-item">
                  <span className="login-stat-number">$2M+</span>
                  <span className="login-stat-label">Volume</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="login-form-section">
            <div className="login-card">
              {!showForgotPassword ? (
                <>
                  {/* Header */}
                  <div className="login-header">
                    <div className="login-icon">
                      <span className="login-icon-login">🔐</span>
                    </div>
                    <h1 className="login-title">Sign In</h1>
                    <p className="login-description">Access your OpenAssetX account</p>
                  </div>

                  {/* Login Method Toggle */}
                  <div className="login-method-toggle">
                    <button
                      type="button"
                      className={`login-method-btn ${loginMethod === 'email' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('email')}
                    >
                      <span className="login-method-icon">📧</span>
                      Email
                    </button>
                    <button
                      type="button"
                      className={`login-method-btn ${loginMethod === 'wallet' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('wallet')}
                    >
                      <span className="login-method-icon">👛</span>
                      Wallet
                    </button>
                  </div>

                  <div className="login-content">
                    {loginMethod === 'email' ? (
                      <>
                        {/* Email Login Form */}
                        <form onSubmit={handleSubmit} className="login-form">
                          <div className="login-form-group">
                            <label htmlFor="email" className="login-form-label">
                              Email Address
                            </label>
                            <input
                              id="email"
                              type="email"
                              className={`login-form-input ${errors.email ? 'login-form-input-error' : ''}`}
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                            />
                            {errors.email && <span className="login-error-message">{errors.email}</span>}
                          </div>

                          <div className="login-form-group">
                            <label htmlFor="password" className="login-form-label">
                              Password
                            </label>
                            <div className="login-password-container">
                              <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className={`login-form-input ${errors.password ? 'login-form-input-error' : ''}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? '🙈' : '👁️'}
                              </button>
                            </div>
                            {errors.password && <span className="login-error-message">{errors.password}</span>}
                          </div>

                          <div className="login-form-options">
                            <label className="login-checkbox-container">
                              <input
                                type="checkbox"
                                className="login-checkbox-input"
                                checked={formData.rememberMe}
                                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                              />
                              <span className="login-checkbox-custom"></span>
                              <span className="login-checkbox-text">Remember me</span>
                            </label>
                            <button
                              type="button"
                              className="login-forgot-link"
                              onClick={() => setShowForgotPassword(true)}
                            >
                              Forgot password?
                            </button>
                          </div>

                          <button 
                            type="submit" 
                            className={`login-button ${isLoading ? 'login-button-loading' : ''}`}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="login-spinner">⏳</span>
                                Signing In...
                              </>
                            ) : (
                              <>
                                <span className="login-button-icon">🚀</span>
                                Sign In
                              </>
                            )}
                          </button>
                        </form>

                        {/* Social Login */}
                        <div className="login-divider">
                          <span className="login-divider-text">Or continue with</span>
                        </div>

                        <div className="login-social-container">
                          {socialLogins.map((social) => (
                            <button
                              key={social.id}
                              type="button"
                              className="login-social-btn"
                              onClick={() => handleSocialLogin(social.id)}
                              disabled={isLoading}
                            >
                              <span className="login-social-icon">{social.icon}</span>
                              {social.name}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Wallet Login */}
                        <div className="login-wallet-section">
                          <div className="login-wallet-description">
                            <p>Connect your crypto wallet to access your account securely</p>
                          </div>
                          
                          <div className="login-wallet-options">
                            {walletOptions.map((wallet) => (
                              <button
                                key={wallet.id}
                                type="button"
                                className="login-wallet-btn"
                                onClick={() => handleWalletConnect(wallet.id)}
                                disabled={isLoading}
                              >
                                <span className="login-wallet-icon">{wallet.icon}</span>
                                <div className="login-wallet-info">
                                  <span className="login-wallet-name">{wallet.name}</span>
                                  <span className="login-wallet-desc">{wallet.description}</span>
                                </div>
                                <span className="login-wallet-arrow">→</span>
                              </button>
                            ))}
                          </div>

                          <div className="login-wallet-help">
                            <div className="login-help-item">
                              <span className="login-help-icon">🔒</span>
                              <span>Your wallet connection is secure and encrypted</span>
                            </div>
                            <div className="login-help-item">
                              <span className="login-help-icon">⚡</span>
                              <span>No transaction fees for login</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Sign Up Link */}
                    <div className="login-signup-link-container">
                      <p className="login-signup-text">
                        Don't have an account?{" "}
                        <Link to="/register" className="login-signup-link">
                          Create one now and get 1000 free tokens
                        </Link>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Forgot Password Form */}
                  <div className="login-header">
                    <div className="login-icon">
                      <span className="login-icon-login">🔑</span>
                    </div>
                    <h1 className="login-title">Reset Password</h1>
                    <p className="login-description">Enter your email to receive reset instructions</p>
                  </div>

                  <div className="login-content">
                    <form onSubmit={handleForgotPassword} className="login-form">
                      <div className="login-form-group">
                        <label htmlFor="forgotEmail" className="login-form-label">
                          Email Address
                        </label>
                        <input
                          id="forgotEmail"
                          type="email"
                          className="login-form-input"
                          placeholder="Enter your email address"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>

                      <button type="submit" className="login-button">
                        <span className="login-button-icon">📧</span>
                        Send Reset Link
                      </button>
                    </form>

                    <div className="login-back-to-login">
                      <button
                        type="button"
                        className="login-back-btn"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        ← Back to Sign In
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Security Section */}
              <div className="login-security-section">
                <div className="login-security-badges">
                  <div className="login-security-badge">
                    <span className="login-security-icon">🔒</span>
                    <span className="login-security-text">256-bit SSL</span>
                  </div>
                  <div className="login-security-badge">
                    <span className="login-security-icon">🛡️</span>
                    <span className="login-security-text">2FA Protected</span>
                  </div>
                  <div className="login-security-badge">
                    <span className="login-security-icon">✅</span>
                    <span className="login-security-text">GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="login-activity-card">
              <div className="login-activity-header">
                <h3 className="login-activity-title">
                  <span className="login-activity-icon">📊</span>
                  Recent Login Activity
                </h3>
              </div>
              <div className="login-activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="login-activity-item">
                    <div className="login-activity-info">
                      <div className="login-activity-device">{activity.device}</div>
                      <div className="login-activity-meta">
                        <span className="login-activity-location">{activity.location}</span>
                        <span className="login-activity-time">{activity.time}</span>
                      </div>
                    </div>
                    {activity.current && (
                      <span className="login-activity-current">Current</span>
                    )}
                  </div>
                ))}
              </div>
              <button className="login-activity-manage">
                Manage Login Sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
