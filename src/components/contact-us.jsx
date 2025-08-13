// ContactUs.jsx
import React, { useState } from 'react';
import './contact-us.css';

export default function ContactUs() {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'general',
    priority: 'medium',
    subject: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: '❓' },
    { value: 'technical', label: 'Technical Support', icon: '⚙️' },
    { value: 'business', label: 'Business Partnership', icon: '🤝' },
    { value: 'security', label: 'Security Issue', icon: '🔒' },
    { value: 'media', label: 'Media & Press', icon: '📰' },
    { value: 'careers', label: 'Careers', icon: '💼' }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@openassetx.com',
      responseTime: '24 hours',
      availability: '24/7'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available in-app',
      responseTime: 'Instant',
      availability: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      responseTime: 'Immediate',
      availability: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: '📍',
      title: 'Office Visit',
      description: 'Visit our headquarters',
      contact: '123 Blockchain Ave, Crypto City',
      responseTime: 'By appointment',
      availability: 'Mon-Fri 9AM-5PM'
    }
  ];

  const teamMembers = [
    {
      name: 'Alex Rodriguez',
      role: 'Customer Success Manager',
      email: 'alex@openassetx.com',
      specialties: ['Account Issues', 'General Support']
    },
    {
      name: 'Sarah Chen',
      role: 'Technical Support Lead',
      email: 'sarah@openassetx.com',
      specialties: ['Wallet Issues', 'Technical Problems']
    },
    {
      name: 'Michael Kim',
      role: 'Business Development',
      email: 'michael@openassetx.com',
      specialties: ['Partnerships', 'Enterprise Solutions']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Contact form submitted:', contactForm);
    }, 2000);
  };

  const resetForm = () => {
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: 'general',
      priority: 'medium',
      subject: '',
      message: '',
      agreeToTerms: false
    });
    setIsSubmitted(false);
  };

  return (
    <div className="contact-us">
      {/* Header Section */}
      <div className="contact-header">
        <div className="container">
          <h1>Contact OpenAssetX</h1>
          <p>We're here to help you succeed in the world of digital assets</p>
          
          <div className="contact-stats">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">&lt;1hr</span>
              <span className="stat-label">Average Response</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          
          {/* Contact Methods */}
          <section className="contact-methods">
            <h2>Get In Touch</h2>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                  <div className="method-details">
                    <div className="contact-info">{method.contact}</div>
                    <div className="response-time">
                      <small>Response: {method.responseTime}</small>
                    </div>
                    <div className="availability">
                      <small>{method.availability}</small>
                    </div>
                  </div>
                  <button className="btn-secondary">Contact Now</button>
                </div>
              ))}
            </div>
          </section>

          {/* Main Contact Form */}
          <section className="contact-form-section">
            <div className="form-container">
              <h2>Send Us a Message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Personal Information */}
                  <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-row">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={contactForm.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={contactForm.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company/Organization (Optional)"
                      value={contactForm.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Inquiry Details */}
                  <div className="form-section">
                    <h3>Inquiry Details</h3>
                    <div className="form-row">
                      <select
                        name="inquiryType"
                        value={contactForm.inquiryType}
                        onChange={handleInputChange}
                        required
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                      <select
                        name="priority"
                        value={contactForm.priority}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject *"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Please describe your inquiry in detail... *"
                      rows="6"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  {/* Terms and Submit */}
                  <div className="form-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={contactForm.agreeToTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="checkmark"></span>
                      I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                    </label>
                    
                    <button 
                      type="submit" 
                      className={`btn-primary ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting OpenAssetX. We've received your message and will get back to you within 24 hours.</p>
                  <p><strong>Reference ID:</strong> OAX-{Date.now()}</p>
                  <button onClick={resetForm} className="btn-secondary">Send Another Message</button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">
              {/* Quick Info */}
              <div className="sidebar-card">
                <h3>Need Immediate Help?</h3>
                <div className="quick-actions">
                  <a href="/help" className="quick-link">
                    <span>📚</span>
                    <div>
                      <strong>Help Center</strong>
                      <small>Find instant answers</small>
                    </div>
                  </a>
                  <a href="/status" className="quick-link">
                    <span>🔄</span>
                    <div>
                      <strong>System Status</strong>
                      <small>Check platform health</small>
                    </div>
                  </a>
                  <button className="quick-link">
                    <span>💬</span>
                    <div>
                      <strong>Live Chat</strong>
                      <small>Chat with support</small>
                    </div>
                  </button>
                </div>
              </div>

              {/* Team Members */}
              <div className="sidebar-card">
                <h3>Our Team</h3>
                <div className="team-list">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                      <div className="member-info">
                        <strong>{member.name}</strong>
                        <small>{member.role}</small>
                        <div className="member-email">{member.email}</div>
                      </div>
                      <div className="member-specialties">
                        {member.specialties.map((specialty, i) => (
                          <span key={i} className="specialty-tag">{specialty}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="sidebar-card">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <span>🐦</span> Twitter
                  </a>
                  <a href="#" className="social-link">
                    <span>💼</span> LinkedIn
                  </a>
                  <a href="#" className="social-link">
                    <span>📘</span> Facebook
                  </a>
                  <a href="#" className="social-link">
                    <span>📞</span> Discord
                  </a>
                  <a href="#" className="social-link">
                    <span>📱</span> Telegram
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Office Information */}
          <section className="office-info">
            <h2>Visit Our Office</h2>
            <div className="office-grid">
              <div className="office-details">
                <h3>OpenAssetX Headquarters</h3>
                <div className="address">
                  <p>📍 123 Blockchain Avenue<br/>
                  Crypto City, CC 12345<br/>
                  United States</p>
                </div>
                <div className="office-hours">
                  <h4>Office Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br/>
                  Saturday: 10:00 AM - 2:00 PM EST<br/>
                  Sunday: Closed</p>
                </div>
                <div className="office-contact">
                  <p>📞 +1 (555) 123-4567<br/>
                  📧 office@openassetx.com</p>
                </div>
              </div>
              <div className="map-placeholder">
                <div className="map-mock">
                  <h4>🗺️ Interactive Map</h4>
                  <p>Click to view directions</p>
                  <button className="btn-secondary">Open in Maps</button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="contact-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>How quickly do you respond to inquiries?</h4>
                <p>We aim to respond to all inquiries within 24 hours. Urgent matters are typically addressed within 2-4 hours.</p>
              </div>
              <div className="faq-item">
                <h4>What information should I include in my message?</h4>
                <p>Please include your wallet address (if applicable), error messages, screenshots, and detailed steps that led to the issue.</p>
              </div>
              <div className="faq-item">
                <h4>Do you offer phone support?</h4>
                <p>Yes, phone support is available Monday-Friday, 9 AM - 6 PM EST for account holders and business inquiries.</p>
              </div>
              <div className="faq-item">
                <h4>Can I schedule a meeting with your team?</h4>
                <p>Yes, business meetings and consultations can be scheduled. Please select "Business Partnership" in your inquiry type.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

