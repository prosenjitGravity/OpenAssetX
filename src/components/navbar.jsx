import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Mock user state - replace with your auth system
  const [user] = useState({
    isLoggedIn: true,
    username: "CryptoTrader_Mike",
    walletAddress: "0x1234...5678",
    balance: 1250,
    notifications: 3,
    avatar: null
  });

  const [notifications] = useState([
    {
      id: 1,
      type: "sale",
      message: "Your Camera sold for 300 tokens",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "purchase",
      message: "Purchase confirmed: Art Supplies",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      type: "system",
      message: "Weekly marketplace summary ready",
      time: "2 days ago",
      unread: false
    }
  ]);

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const handleWalletConnect = () => {
    // Implement wallet connection logic
    console.log("Connecting wallet...");
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Brand/Logo Section */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">
              {/* <span className="navbar-logo-icon">🔗</span> */}
              <span className="navbar-logo-text">OpenAssetX</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-nav-section">
          <div className="navbar-nav-links">
            <Link 
              to="/marketplace" 
              className={`navbar-nav-link ${isActivePage('/marketplace') ? 'active' : ''}`}
            >
              <span className="material-icons navbar-link-icon">shopping_cart</span>
              Marketplace
            </Link>
            <Link 
              to="/about" 
              className={`navbar-nav-link ${isActivePage('/about') ? 'active' : ''}`}
            >
              <span className="material-icons navbar-link-icon">bar_chart</span>
              About
            </Link>
            <Link 
              to="/learn-openassetx" 
              className={`navbar-nav-link ${isActivePage('/learn-openassetx') ? 'active' : ''}`}
            >
              <span className="material-icons navbar-link-icon">local_library</span>
              Learn
            </Link>
          </div>

          {/* Search Bar */}
          <div className="navbar-search-container">
            <div className="navbar-search-wrapper">
              <span className="material-icons navbar-search-icon">search</span>
              <input
                type="text"
                placeholder="Search assets..."
                className="navbar-search-input"
              />
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="navbar-user-section">
          {user.isLoggedIn ? (
            <>
              {/* Wallet Balance */}
              <div className="navbar-wallet-balance">
                <span className="material-icons navbar-balance-icon">token</span>
                <span className="navbar-balance-amount">{user.balance}</span>
              </div>

              {/* Notifications */}
              <div className="navbar-notifications">
                <button 
                  className="navbar-notification-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <span className="material-icons navbar-notification-icon">notifications</span>
                  {user.notifications > 0 && (
                    <span className="navbar-notification-badge">{user.notifications}</span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="navbar-notification-dropdown">
                    <div className="navbar-notification-header">
                      <h3 className="navbar-notification-title">Notifications</h3>
                      <button className="navbar-mark-all-read">Mark all read</button>
                    </div>
                    <div className="navbar-notification-list">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`navbar-notification-item ${notification.unread ? 'unread' : ''}`}
                        >
                          <div className={`navbar-notification-type-icon ${notification.type}`}>
                            {notification.type === 'sale' && '💰'}
                            {notification.type === 'purchase' && '🛒'}
                            {notification.type === 'system' && '📢'}
                          </div>
                          <div className="navbar-notification-content">
                            <p className="navbar-notification-message">{notification.message}</p>
                            <span className="navbar-notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="navbar-notification-footer">
                      <Link to="/notifications" className="navbar-view-all-notifications">
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="navbar-profile">
                <button 
                  className="navbar-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="navbar-profile-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="navbar-avatar-image" />
                    ) : (
                      <span className="navbar-avatar-text">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="navbar-profile-name">{user.username}</span>
                  <span className="navbar-profile-arrow">▼</span>
                </button>

                {profileDropdownOpen && (
                  <div className="navbar-profile-dropdown">
                    <div className="navbar-profile-info">
                      <div className="navbar-profile-details">
                        <span className="navbar-profile-username">{user.username}</span>
                        <span className="navbar-profile-wallet">{user.walletAddress}</span>
                      </div>
                    </div>
                    <div className="navbar-profile-links">
                      <Link to="/dashboard" className="navbar-profile-link">
                        <span className="material-icons navbar-profile-link-icon">dashboard</span>
                        Dashboard
                      </Link>
                      <Link to="/profile" className="navbar-profile-link">
                        <span className="material-icons navbar-profile-link-icon">account_circle</span>
                        Profile Settings
                      </Link>
                      <Link to="/add-new-asset" className="navbar-profile-link">
                        <span className="material-icons navbar-profile-link-icon">inventory_2</span>
                        List New Asset
                      </Link>
                      <Link to="/transactions" className="navbar-profile-link">
                        <span className="material-icons navbar-profile-link-icon">receipt</span>
                        Transaction History
                      </Link>
                      <Link to="/wallet" className="navbar-profile-link">
                        <span className="material-icons navbar-profile-link-icon">wallet</span>
                        Wallet Settings
                      </Link>
                    </div>
                    <div className="navbar-profile-actions">
                      <button className="navbar-wallet-connect-btn" onClick={handleWalletConnect}>
                        <span className="material-icons navbar-btn-icon">contactless</span>
                        Connect Different Wallet
                      </button>
                      <button className="navbar-logout-btn" onClick={handleLogout}>
                        <span className="material-icons navbar-btn-icon">logout</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Guest User Actions */
            <div className="navbar-guest-actions">
              <button className="navbar-wallet-connect" onClick={handleWalletConnect}>
                <span className="navbar-btn-icon">💳</span>
                Connect Wallet
              </button>
              <Link to="/login" className="navbar-login-btn">
                Login
              </Link>
              <Link to="/register" className="navbar-register-btn">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="navbar-hamburger">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            <Link 
              to="/marketplace" 
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="navbar-link-icon">🛒</span>
              Marketplace
            </Link>
            <Link 
              to="/about" 
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="navbar-link-icon">📊</span>
              About
            </Link>
            <Link 
              to="/learn-openassetx" 
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="navbar-link-icon">📚</span>
              Learn
            </Link>
            {user.isLoggedIn && (
              <>
                <Link 
                  to="/dashboard" 
                  className="navbar-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="navbar-link-icon">📊</span>
                  Dashboard
                </Link>
                <Link 
                  to="/add-new-asset" 
                  className="navbar-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="navbar-link-icon">➕</span>
                  List Asset
                </Link>
              </>
            )}
          </div>
          
          {!user.isLoggedIn && (
            <div className="navbar-mobile-actions">
              <button className="navbar-mobile-wallet-btn" onClick={handleWalletConnect}>
                Connect Wallet
              </button>
              <Link to="/login" className="navbar-mobile-login">Login</Link>
              <Link to="/register" className="navbar-mobile-register">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
