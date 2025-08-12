import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';
import Navbar from './navbar';

export default function AboutPage() {
  const navigate = useNavigate();
  
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Prosenjit Paul',
      role: 'CEO & Co-Founder',
      image: '/assets/images/pro.jpg',
      bio: 'Former Goldman Sachs VP with 10+ years in fintech. Led blockchain initiatives at major financial institutions.',
      expertise: ['Blockchain Strategy', 'Financial Markets', 'Leadership'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Ex-Ethereum Foundation developer. Built smart contract systems handling $50M+ in transactions.',
      expertise: ['Smart Contracts', 'Solidity', 'Web3 Architecture'],
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Head of Product',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Product leader from Airbnb and Uber. Specialized in marketplace dynamics and user experience.',
      expertise: ['Product Strategy', 'UX Design', 'Marketplace Growth'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Head of Engineering',
      image: '/placeholder.svg?height=200&width=200',
      bio: 'Full-stack architect with experience at Netflix and Google. Expert in scalable blockchain systems.',
      expertise: ['System Architecture', 'React/Node.js', 'DevOps'],
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'OpenAssetX was founded with a mission to revolutionize used goods trading through blockchain technology.'
    },
    {
      year: '2024',
      title: 'Seed Funding',
      description: 'Raised $5M in seed funding from leading blockchain VCs and angel investors.'
    },
    {
      year: '2024',
      title: 'Alpha Launch',
      description: 'Launched alpha version with 1,000+ beta users and $500K in transaction volume.'
    },
    {
      year: '2025',
      title: 'Public Beta',
      description: 'Public beta launch with multi-network support and advanced security features.'
    },
    {
      year: '2025',
      title: 'Growth Phase',
      description: 'Scaling to 10,000+ active users with $2M+ monthly transaction volume.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: '👥' },
    { number: '$2M+', label: 'Monthly Volume', icon: '💰' },
    { number: '25K+', label: 'Assets Traded', icon: '📦' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' }
  ];

  const values = [
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Bank-level security with multi-layer protection and smart contract audits.'
    },
    {
      icon: '🌐',
      title: 'Decentralized',
      description: 'True Web3 principles with user ownership and decentralized governance.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Cutting-edge blockchain technology with continuous feature development.'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Built by the community, for the community with transparent development.'
    }
  ];

  const technologies = [
    { name: 'Ethereum', icon: '⟠', description: 'Primary blockchain network' },
    { name: 'Polygon', icon: '⬟', description: 'Layer 2 scaling solution' },
    { name: 'IPFS', icon: '📦', description: 'Decentralized storage' },
    { name: 'React', icon: '⚛️', description: 'Frontend framework' },
    { name: 'Node.js', icon: '🟢', description: 'Backend infrastructure' },
    { name: 'Solidity', icon: '🔷', description: 'Smart contract language' }
  ];

  return (
    <div className="about-page-container">
      <Navbar />

      <div className="about-page-main-content">
        {/* Back Button */}
        <div className="about-page-back-button-container">
          <button 
            onClick={() => navigate('/')}
            className="about-page-back-link"
          >
            <span className="about-page-back-icon">←</span>
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <div className="about-page-hero">
          <div className="about-page-hero-content">
            <h1 className="about-page-hero-title">About OpenAssetX</h1>
            <p className="about-page-hero-subtitle">
              Revolutionizing the used goods marketplace through blockchain technology, 
              creating a transparent, secure, and decentralized trading ecosystem for physical assets.
            </p>
            <div className="about-page-hero-actions">
              <button className="about-page-btn about-page-btn-primary" onClick={() => navigate('/register')}>
                <span className="about-page-btn-icon">🚀</span>
                Get Started
              </button>
              <button className="about-page-btn about-page-btn-secondary" onClick={() => navigate('/learn')}>
                <span className="about-page-btn-icon">📚</span>
                Learn More
              </button>
            </div>
          </div>
          <div className="about-page-hero-visual">
            <div className="about-page-hero-logo">🔗</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-page-stats-section">
          <div className="about-page-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-page-stat-card">
                <div className="about-page-stat-icon">{stat.icon}</div>
                <div className="about-page-stat-content">
                  <span className="about-page-stat-number">{stat.number}</span>
                  <span className="about-page-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="about-page-mission-section">
          <div className="about-page-content-grid">
            <div className="about-page-card">
              <div className="about-page-card-header">
                <h2 className="about-page-card-title">
                  <span className="about-page-title-icon">🎯</span>
                  Our Mission
                </h2>
              </div>
              <div className="about-page-card-content">
                <p className="about-page-mission-text">
                  To democratize asset trading by leveraging blockchain technology, creating a trustless, 
                  transparent marketplace where anyone can buy and sell used goods with complete confidence 
                  and ownership control.
                </p>
                <div className="about-page-mission-points">
                  <div className="about-page-mission-point">
                    <span className="about-page-point-icon">✅</span>
                    <span>Eliminate intermediary fees and fraud</span>
                  </div>
                  <div className="about-page-mission-point">
                    <span className="about-page-point-icon">✅</span>
                    <span>Provide true ownership of digital assets</span>
                  </div>
                  <div className="about-page-mission-point">
                    <span className="about-page-point-icon">✅</span>
                    <span>Create sustainable circular economy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-page-card">
              <div className="about-page-card-header">
                <h2 className="about-page-card-title">
                  <span className="about-page-title-icon">🔮</span>
                  Our Vision
                </h2>
              </div>
              <div className="about-page-card-content">
                <p className="about-page-vision-text">
                  To become the world's leading Web3 marketplace for physical assets, 
                  fostering a global community where trust is built through technology, 
                  not intermediaries.
                </p>
                <div className="about-page-vision-goals">
                  <div className="about-page-vision-goal">
                    <h4 className="about-page-goal-title">Global Reach</h4>
                    <p className="about-page-goal-desc">Connect buyers and sellers worldwide</p>
                  </div>
                  <div className="about-page-vision-goal">
                    <h4 className="about-page-goal-title">Innovation Leader</h4>
                    <p className="about-page-goal-desc">Pioneer new Web3 marketplace solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-page-values-section">
          <div className="about-page-section-header">
            <h2 className="about-page-section-title">
              <span className="about-page-section-icon">⭐</span>
              Our Core Values
            </h2>
            <p className="about-page-section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="about-page-values-grid">
            {values.map((value, index) => (
              <div key={index} className="about-page-value-card">
                <div className="about-page-value-icon">{value.icon}</div>
                <h3 className="about-page-value-title">{value.title}</h3>
                <p className="about-page-value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="about-page-team-section">
          <div className="about-page-section-header">
            <h2 className="about-page-section-title">
              <span className="about-page-section-icon">👥</span>
              Meet Our Team
            </h2>
            <p className="about-page-section-subtitle">
              Industry experts building the future of Web3 marketplaces
            </p>
          </div>
          <div className="about-page-team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="about-page-team-card">
                <div className="about-page-team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="about-page-team-info">
                  <h3 className="about-page-team-name">{member.name}</h3>
                  <p className="about-page-team-role">{member.role}</p>
                  <p className="about-page-team-bio">{member.bio}</p>
                  <div className="about-page-team-expertise">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="about-page-expertise-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="about-page-team-social">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="about-page-social-link">
                        💼
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="about-page-social-link">
                        🐦
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="about-page-social-link">
                        💻
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="about-page-tech-section">
          <div className="about-page-section-header">
            <h2 className="about-page-section-title">
              <span className="about-page-section-icon">🔧</span>
              Technology Stack
            </h2>
            <p className="about-page-section-subtitle">
              Built with cutting-edge blockchain and web technologies
            </p>
          </div>
          <div className="about-page-tech-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="about-page-tech-card">
                <div className="about-page-tech-icon">{tech.icon}</div>
                <div className="about-page-tech-info">
                  <h4 className="about-page-tech-name">{tech.name}</h4>
                  <p className="about-page-tech-description">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="about-page-timeline-section">
          <div className="about-page-section-header">
            <h2 className="about-page-section-title">
              <span className="about-page-section-icon">📅</span>
              Our Journey
            </h2>
            <p className="about-page-section-subtitle">
              Key milestones in building the future of asset trading
            </p>
          </div>
          <div className="about-page-timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="about-page-timeline-item">
                <div className="about-page-timeline-marker">
                  <div className="about-page-timeline-dot"></div>
                  <div className="about-page-timeline-year">{milestone.year}</div>
                </div>
                <div className="about-page-timeline-content">
                  <h3 className="about-page-timeline-title">{milestone.title}</h3>
                  <p className="about-page-timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="about-page-why-section">
          <div className="about-page-card about-page-why-card">
            <div className="about-page-card-header">
              <h2 className="about-page-card-title">
                <span className="about-page-title-icon">🌟</span>
                Why Choose OpenAssetX?
              </h2>
            </div>
            <div className="about-page-card-content">
              <div className="about-page-why-grid">
                <div className="about-page-why-item">
                  <div className="about-page-why-icon">🔒</div>
                  <div className="about-page-why-content">
                    <h4 className="about-page-why-title">Unmatched Security</h4>
                    <p className="about-page-why-description">
                      Smart contracts audited by leading security firms with multi-signature wallets and insurance coverage.
                    </p>
                  </div>
                </div>
                <div className="about-page-why-item">
                  <div className="about-page-why-icon">💰</div>
                  <div className="about-page-why-content">
                    <h4 className="about-page-why-title">Low Fees</h4>
                    <p className="about-page-why-description">
                      Eliminate traditional marketplace fees with direct peer-to-peer transactions and competitive rates.
                    </p>
                  </div>
                </div>
                <div className="about-page-why-item">
                  <div className="about-page-why-icon">🌍</div>
                  <div className="about-page-why-content">
                    <h4 className="about-page-why-title">Global Access</h4>
                    <p className="about-page-why-description">
                      Trade with anyone, anywhere in the world with cryptocurrency payments and international shipping.
                    </p>
                  </div>
                </div>
                <div className="about-page-why-item">
                  <div className="about-page-why-icon">📱</div>
                  <div className="about-page-why-content">
                    <h4 className="about-page-why-title">User-Friendly</h4>
                    <p className="about-page-why-description">
                      Intuitive interface designed for both crypto natives and newcomers to blockchain technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="about-page-contact-section">
          <div className="about-page-contact-grid">
            <div className="about-page-contact-info">
              <h2 className="about-page-contact-title">Get in Touch</h2>
              <p className="about-page-contact-description">
                Have questions about OpenAssetX? We'd love to hear from you. 
                Reach out to our team for partnerships, support, or general inquiries.
              </p>
              <div className="about-page-contact-methods">
                <div className="about-page-contact-method">
                  <span className="about-page-contact-icon">📧</span>
                  <div className="about-page-contact-details">
                    <span className="about-page-contact-label">Email</span>
                    <span className="about-page-contact-value">hello@openassetx.com</span>
                  </div>
                </div>
                <div className="about-page-contact-method">
                  <span className="about-page-contact-icon">💬</span>
                  <div className="about-page-contact-details">
                    <span className="about-page-contact-label">Discord</span>
                    <span className="about-page-contact-value">OpenAssetX Community</span>
                  </div>
                </div>
                <div className="about-page-contact-method">
                  <span className="about-page-contact-icon">🐦</span>
                  <div className="about-page-contact-details">
                    <span className="about-page-contact-label">Twitter</span>
                    <span className="about-page-contact-value">@OpenAssetX</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-page-contact-cta">
              <div className="about-page-cta-card">
                <h3 className="about-page-cta-title">Ready to Start Trading?</h3>
                <p className="about-page-cta-description">
                  Join thousands of users already trading on OpenAssetX. 
                  Create your account and get 1000 free tokens to start.
                </p>
                <div className="about-page-cta-actions">
                  <button className="about-page-btn about-page-btn-primary" onClick={() => navigate('/register')}>
                    <span className="about-page-btn-icon">🚀</span>
                    Create Account
                  </button>
                  <button className="about-page-btn about-page-btn-secondary" onClick={() => navigate('/marketplace')}>
                    <span className="about-page-btn-icon">🛒</span>
                    Browse Marketplace
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
