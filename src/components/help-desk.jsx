// HelpCenter.jsx
import React, { useState, useEffect } from 'react';
import './help-desk.css';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  });

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'wallet', name: 'Wallet & Security', icon: '🔒' },
    { id: 'trading', name: 'Trading & Assets', icon: '📈' },
    { id: 'account', name: 'Account Management', icon: '👤' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' },
    { id: 'fees', name: 'Fees & Payments', icon: '💰' }
  ];

  const faqData = {
    general: [
      {
        question: "What is OpenAssetX?",
        answer: "OpenAssetX is a decentralized blockchain marketplace where users can trade, buy, and sell digital assets securely using Web3 technology."
      },
      {
        question: "How do I get started on OpenAssetX?",
        answer: "Simply connect your MetaMask wallet, complete your profile setup, and start exploring our marketplace. No lengthy registration process required!"
      },
      {
        question: "Is OpenAssetX safe to use?",
        answer: "Yes, OpenAssetX uses blockchain technology and smart contracts to ensure secure, transparent transactions. We also implement industry-standard security measures."
      }
    ],
    wallet: [
      {
        question: "How do I connect my MetaMask wallet?",
        answer: "Click the 'Connect Wallet' button in the top right corner, select MetaMask from the options, and approve the connection in your wallet extension."
      },
      {
        question: "What wallets are supported?",
        answer: "Currently, we support MetaMask, WalletConnect, and Coinbase Wallet. More wallet integrations are coming soon."
      },
      {
        question: "My wallet won't connect. What should I do?",
        answer: "Ensure your wallet extension is updated, refresh the page, and make sure you're on the correct network. If issues persist, try clearing your browser cache."
      }
    ],
    trading: [
      {
        question: "How do I buy an asset?",
        answer: "Browse assets, click on the one you want, review details, click 'Buy Now', and confirm the transaction in your wallet."
      },
      {
        question: "What are gas fees?",
        answer: "Gas fees are network transaction costs paid to miners/validators. These vary based on network congestion and are not controlled by OpenAssetX."
      },
      {
        question: "Can I cancel a transaction?",
        answer: "Once confirmed on the blockchain, transactions cannot be reversed. However, you can cancel pending transactions from your wallet before confirmation."
      }
    ]
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Your message has been sent! We\'ll get back to you within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: ''
    });
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const filteredFAQs = searchQuery 
    ? Object.values(faqData).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory] || [];

  return (
    <div className="help-center">
      {/* Header Section */}
      <div className="help-header">
        <div className="container">
          <h1>OpenAssetX Help Center</h1>
          <p>Find answers to your questions and get the support you need</p>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="help-content">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <div className="action-card">
                <span className="action-icon">💬</span>
                <h3>Live Chat</h3>
                <p>Chat with our support team</p>
                <button className="btn-primary">Start Chat</button>
              </div>
              <div className="action-card">
                <span className="action-icon">📧</span>
                <h3>Email Support</h3>
                <p>Send us a detailed message</p>
                <button className="btn-secondary">Contact Us</button>
              </div>
              <div className="action-card">
                <span className="action-icon">📚</span>
                <h3>Documentation</h3>
                <p>Browse our full guide</p>
                <button className="btn-secondary">Read Docs</button>
              </div>
              <div className="action-card">
                <span className="action-icon">🎥</span>
                <h3>Video Tutorials</h3>
                <p>Watch step-by-step guides</p>
                <button className="btn-secondary">Watch Videos</button>
              </div>
            </div>
          </div>

          {/* Categories and FAQ */}
          <div className="help-main">
            {!searchQuery && (
              <div className="categories">
                <h2>Help Categories</h2>
                <div className="category-tabs">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="faq-section">
              <h2>{searchQuery ? 'Search Results' : `${categories.find(c => c.id === activeCategory)?.name || 'FAQ'}`}</h2>
              
              {filteredFAQs.length === 0 ? (
                <div className="no-results">
                  <p>No results found for "{searchQuery}". Try different keywords or browse categories.</p>
                </div>
              ) : (
                <div className="faq-list">
                  {filteredFAQs.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                      >
                        {faq.question}
                        <span className={`faq-arrow ${expandedFAQ === index ? 'expanded' : ''}`}>▼</span>
                      </button>
                      {expandedFAQ === index && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="contact-section">
              <h2>Still Need Help?</h2>
              <p>Can't find what you're looking for? Send us a message and we'll get back to you.</p>
              
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>
                
                <textarea
                  placeholder="Describe your issue in detail..."
                  rows="5"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
                
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>

            {/* Status Page */}
            <div className="status-section">
              <h2>System Status</h2>
              <div className="status-grid">
                <div className="status-item">
                  <span className="status-indicator online"></span>
                  <span>Marketplace</span>
                  <span className="status-text">Operational</span>
                </div>
                <div className="status-item">
                  <span className="status-indicator online"></span>
                  <span>Wallet Connection</span>
                  <span className="status-text">Operational</span>
                </div>
                <div className="status-item">
                  <span className="status-indicator online"></span>
                  <span>Trading Engine</span>
                  <span className="status-text">Operational</span>
                </div>
                <div className="status-item">
                  <span className="status-indicator warning"></span>
                  <span>ETH Network</span>
                  <span className="status-text">High Gas Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <div className="chat-widget">
        <button className="chat-toggle">
          <span>💬</span>
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};
