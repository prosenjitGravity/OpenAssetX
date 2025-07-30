import { Link } from 'react-router-dom';
import './home-page.css';
export default function HomePage() {
  return (
    <div className="page-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            OpenAssetX
          </Link>
          <div className="navbar-nav">
            <Link to="/marketplace" className="navbar-link">
              Marketplace
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Trade Your Used Assets
            <br />
            <span style={{ color: "#a78bfa" }}>On The Blockchain</span>
          </h1>
          <p className="hero-subtitle">
            A decentralized marketplace where you can buy and sell used assets using our native money tokens. Get 1000
            tokens free on registration!
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Trading →
            </Link>
            <Link to="/marketplace" className="btn btn-secondary btn-lg">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="main-content">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="mb-4">Why Choose OpenAssetX?</h2>
            <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)" }}>
              Built on blockchain technology for transparency and security
            </p>
          </div>

          <div className="grid grid-4 gap-6">
            <div className="card">
              <div className="card-content text-center">
                <div className="mb-4">🛡️</div>
                <h3 className="card-title">Secure Transactions</h3>
                <p className="card-description">
                  All transactions are secured by blockchain technology and smart contracts
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content text-center">
                <div className="mb-4">🪙</div>
                <h3 className="card-title">Native Tokens</h3>
                <p className="card-description">
                  Use our money tokens for all transactions. Get 1000 tokens free on signup!
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-content text-center">
                <div className="mb-4">📜</div>
                <h3 className="card-title">Ownership History</h3>
                <p className="card-description">Complete transparent history of asset ownership stored on blockchain</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content text-center">
                <div className="mb-4">👥</div>
                <h3 className="card-title">Community Driven</h3>
                <p className="card-description">Join a community of users trading valuable used assets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: "var(--primary-color)", color: "white" }} className="py-20">
        <div className="container text-center">
          <h2 className="mb-4" style={{ color: "white" }}>
            Ready to Start Trading?
          </h2>
          <p className="mb-8" style={{ fontSize: "1.125rem", opacity: "0.9" }}>
            Join thousands of users already trading on our platform
          </p>
          <Link to="/register" className="btn btn-secondary btn-lg">
            Create Account & Get 1000 Tokens Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-brand">OpenAssetX</h3>
          <p className="footer-description">Decentralized marketplace for used assets</p>
          <div className="footer-bottom">
            <p>&copy; 2024 OpenAssetX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
