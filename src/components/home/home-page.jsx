import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';
import Navbar from '../navbar';
import AssetDetailImage from '../../assets/images/blockchain.jpg';


export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const statistics = [
    { value: "10K+", label: "Active Users", icon: "people" },
    { value: "25K+", label: "Assets Traded", icon: "redeem" },
    { value: "98%", label: "Success Rate", icon: "verified" },
    { value: "$2M+", label: "Trade Volume", icon: "currency_bitcoin" }
  ];

  const features = [
    {
      icon: "security",
      title: "Secure Transactions",
      description: "All transactions are secured by blockchain technology and smart contracts with multi-signature validation",
      benefits: ["End-to-end encryption", "Smart contract protection", "Fraud prevention"]
    },
    {
      icon: "token",
      title: "Native Token Economy",
      description: "Use our money tokens for all transactions with instant settlements and low fees",
      benefits: ["1000 free tokens on signup", "Low transaction fees", "Instant settlements"]
    },
    {
      icon: "receipt_long",
      title: "Complete Ownership History",
      description: "Transparent asset history stored immutably on the blockchain for full verification",
      benefits: ["Immutable records", "Full transparency", "Authenticity verification"]
    },
    {
      icon: "bolt",
      title: "Lightning Fast",
      description: "Quick asset listing, instant token transfers, and rapid marketplace discovery",
      benefits: ["Instant token transfers", "Fast asset discovery", "Quick listing process"]
    },
    {
      icon: "public",
      title: "Global Marketplace",
      description: "Trade with users worldwide in a decentralized, borderless marketplace",
      benefits: ["Worldwide access", "No geographical limits", "24/7 availability"]
    },
    {
      icon: "search",
      title: "Asset Verification",
      description: "Advanced verification system ensures authenticity and quality of all listed assets",
      benefits: ["Quality assurance", "Authenticity checks", "Dispute resolution"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Electronics Trader",
      avatar: "SC",
      rating: 5,
      text: "Sold my camera equipment in minutes with complete transparency. The blockchain verification gave buyers confidence."
    },
    {
      name: "Mike Rodriguez",
      role: "Art Collector",
      avatar: "MR", 
      rating: 5,
      text: "Found rare collectibles at great prices. The ownership history feature helped me verify authenticity before purchasing."
    },
    {
      name: "Lisa Park",
      role: "Book Enthusiast",
      avatar: "LP",
      rating: 5,
      text: "Love the token system! Fast, secure, and the free tokens got me started immediately. Great community too."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Create Account",
      description: "Sign up and get 1000 free tokens to start trading immediately",
      icon: "people"
    },
    {
      step: "2", 
      title: "List Your Assets",
      description: "Upload photos and details of items you want to sell",
      icon: "sports_esports"
    },
    {
      step: "3",
      title: "Connect & Trade",
      description: "Buyers discover your assets and complete secure transactions",
      icon: "handshake"
    },
    {
      step: "4",
      title: "Get Paid",
      description: "Receive tokens instantly in your secure wallet",
      icon: "currency_bitcoin"
    }
  ];

  return (
    <div className="homepage-container">
      <Navbar />

      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-background">
          <div className="homepage-hero-overlay"></div>
        </div>
        <div className="homepage-hero-content">
          <div className="homepage-hero-text">
            <div className="homepage-hero-badge">
              <span className="material-icons homepage-badge-icon">rocket_launch</span>
              Now Live on Blockchain
            </div>
            <h1 className="homepage-hero-title">
              Trade Your <span className="homepage-highlight">Used Assets</span><br />
              On The Blockchain
            </h1>
            <p className="homepage-hero-subtitle">
              A decentralized marketplace where you can buy and sell pre-owned assets using native tokens. 
              Join thousands of users trading safely with blockchain transparency and smart contract security.
            </p>
            <div className="homepage-hero-actions">
              <Link to="/register" className="homepage-btn-primary">
                <span className="material-icons homepage-btn-icon">arrow_forward</span>
                Start Trading Free
              </Link>
              <Link to="/marketplace" className="homepage-btn-secondary">
                <span className="material-icons homepage-btn-icon">search</span>
                Browse Marketplace
              </Link>
            </div>
            <div className="homepage-hero-features">
              <div className="homepage-feature-item">
                <span className="material-icons homepage-feature-icon">card_giftcard</span>
                <span>1000 Free Tokens</span>
              </div>
              <div className="homepage-feature-item">
                <span className="material-icons homepage-feature-icon">bolt</span>
                <span>Instant Trading</span>
              </div>
              <div className="homepage-feature-item">
                <span className="material-icons homepage-feature-icon">https</span>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
          <div className="homepage-hero-visual">
            <div className="homepage-hero-card">
               <img className='homepage-hero-card' src={AssetDetailImage} alt="landing_page_image" />
            </div>
            {/* <div className="homepage-hero-card">
              <div className="homepage-card-header">
                <div className="material-icons homepage-card-avatar">phone_iphone</div>
                <div className="homepage-card-info">
                  <h4>iPhone 16 Pro</h4>
                  <p>Excellent condition</p>
                </div>
              </div>
              <div className="homepage-card-price">650 tokens</div>
              <div className="homepage-card-status"><span className="material-icons">verified_user</span> Verified</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="homepage-statistics">
        <div className="homepage-statistics-container">
          {statistics.map((stat, index) => (
            <div key={index} className="homepage-stat-item">
              <div className="material-icons homepage-stat-icon">{stat.icon}</div>
              <div className="homepage-stat-value">{stat.value}</div>
              <div className="homepage-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="homepage-features">
        <div className="homepage-container">
          <div className="homepage-section-header">
            <h2 className="homepage-section-title">Why Choose OpenAssetX?</h2>
            <p className="homepage-section-subtitle">
              Built on cutting-edge blockchain technology for maximum transparency, security, and user experience
            </p>
          </div>

          <div className="homepage-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="homepage-feature-card">
                <div className="material-icons homepage-feature-icon">{feature.icon}</div>
                <h3 className="homepage-feature-title">{feature.title}</h3>
                <p className="homepage-feature-description">{feature.description}</p>
                <ul className="homepage-feature-benefits">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="homepage-benefit-item">
                      <span className="homepage-benefit-check">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="homepage-how-it-works">
        <div className="homepage-container">
          <div className="homepage-section-header">
            <h2 className="homepage-section-title">How It Works</h2>
            <p className="homepage-section-subtitle">
              Get started in minutes with our simple 4-step process
            </p>
          </div>

          <div className="homepage-steps-container">
            {steps.map((step, index) => (
              <div key={index} className="homepage-step-item">
                <div className="homepage-step-icon">
                  <span className="homepage-step-number">{step.step}</span>
                  <span className="material-icons homepage-step-emoji">{step.icon}</span>
                </div>
                <div className="homepage-step-content">
                  <h4 className="homepage-step-title">{step.title}</h4>
                  <p className="homepage-step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="homepage-step-connector">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="homepage-testimonials">
        <div className="homepage-container">
          <div className="homepage-section-header">
            <h2 className="homepage-section-title">What Our Users Say</h2>
            <p className="homepage-section-subtitle">
              Join thousands of satisfied traders who trust OpenAssetX
            </p>
          </div>

          <div className="homepage-testimonial-container">
            <div className="homepage-testimonial-card">
              <div className="homepage-testimonial-content">
                <div className="homepage-testimonial-rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span key={i} className="material-icons homepage-star">star</span>
                  ))}
                </div>
                <p className="homepage-testimonial-text">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="homepage-testimonial-author">
                  <div className="homepage-author-avatar">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="homepage-author-info">
                    <h4 className="homepage-author-name">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="homepage-author-role">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="homepage-testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`homepage-testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="homepage-cta">
        <div className="homepage-cta-container">
          <div className="homepage-cta-content">
            <h2 className="homepage-cta-title">Ready to Start Trading?</h2>
            <p className="homepage-cta-subtitle">
              Join the future of asset trading with blockchain transparency and security
            </p>
            <div className="homepage-cta-features">
              <div className="homepage-cta-feature">
                <span className="material-icons homepage-cta-feature-icon">redeem</span>
                <span>1000 Free Tokens</span>
              </div>
              <div className="homepage-cta-feature">
                <span className="material-icons homepage-cta-feature-icon">bolt</span>
                <span>Instant Setup</span>
              </div>
              <div className="homepage-cta-feature">
                <span className="material-icons homepage-cta-feature-icon">security</span>
                <span>Bank-Level Security</span>
              </div>
            </div>
            <Link to="/register" className="homepage-cta-button">
              <span className="material-icons homepage-btn-icon">rocket_launch</span>
              Create Free Account & Get 1000 Tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="homepage-footer-content">
          <div className="homepage-footer-main">
            <div className="homepage-footer-brand">
              <h3 className="homepage-footer-logo">
                {/* <span className="homepage-logo-icon">🔗</span> */}
                OpenAssetX
              </h3>
              <p className="homepage-footer-description">
                The world's first decentralized marketplace for used assets, built on blockchain for maximum transparency and security.
              </p>
              <div className="homepage-footer-social">
                <Link  className="homepage-social-link"><span className="material-icons">alternate_email</span></Link>
                <Link  className="homepage-social-link"><span className="material-icons">apple</span></Link>
                <Link  className="homepage-social-link"><span className="material-icons">data_object</span></Link>
              </div>
            </div>

            <div className="homepage-footer-links">
              <div className="homepage-footer-column">
                <h4 className="homepage-footer-title">Platform</h4>
                <ul className="homepage-footer-list">
                  <li><Link to="/marketplace" className="homepage-footer-link">Marketplace</Link></li>
                  <li><Link to="/dashboard" className="homepage-footer-link">Dashboard</Link></li>
                  <li><Link to="/analytics" className="homepage-footer-link">Analytics</Link></li>
                  <li><Link to="/learn" className="homepage-footer-link">Learn</Link></li>
                </ul>
              </div>

              <div className="homepage-footer-column">
                <h4 className="homepage-footer-title">Support</h4>
                <ul className="homepage-footer-list">
                  <li><Link href="#" className="homepage-footer-link">Help Center</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Contact Us</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Community</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Bug Report</Link></li>
                </ul>
              </div>

              <div className="homepage-footer-column">
                <h4 className="homepage-footer-title">Legal</h4>
                <ul className="homepage-footer-list">
                  <li><Link href="#" className="homepage-footer-link">Privacy Policy</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Terms of Service</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Security</Link></li>
                  <li><Link href="#" className="homepage-footer-link">Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="homepage-footer-bottom">
            <p className="homepage-footer-copyright">
              © 2025 OpenAssetX. All rights reserved. Built with blockchain technology.
            </p>
            <div className="homepage-footer-badges">
              <span className="homepage-footer-badge"><span className="material-icons">security</span> SSL Secured</span>
              <span className="homepage-footer-badge"><span className="material-icons">bolt</span> Blockchain Verified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
