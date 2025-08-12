import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './learn-page.css';
import Navbar from './navbar';

export default function LearnPage() {
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set(['blockchain-basics-1', 'wallet-setup-1']));

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', color: '#2563eb' },
    { id: 'blockchain-basics', name: 'Blockchain Basics', icon: '🔗', color: '#059669' },
    { id: 'buying-guide', name: 'Buying Guide', icon: '🛒', color: '#7c3aed' },
    { id: 'selling-guide', name: 'Selling Guide', icon: '💰', color: '#dc2626' },
    { id: 'security', name: 'Security Center', icon: '🔒', color: '#ea580c' },
    { id: 'advanced', name: 'Advanced Features', icon: '⚙️', color: '#0891b2' },
    { id: 'faq', name: 'FAQ', icon: '❓', color: '#9333ea' }
  ];

  const lessons = {
    'getting-started': [
      {
        id: 'welcome',
        title: 'Welcome to OpenAssetX',
        description: 'Learn about our blockchain marketplace and how it revolutionizes asset trading',
        duration: '5 min',
        type: 'video',
        level: 'Beginner'
      },
      {
        id: 'account-setup',
        title: 'Creating Your Account',
        description: 'Step-by-step guide to setting up your OpenAssetX account',
        duration: '8 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'first-steps',
        title: 'Your First Steps',
        description: 'Navigate the platform and understand the dashboard',
        duration: '10 min',
        type: 'interactive',
        level: 'Beginner'
      },
      {
        id: 'platform-tour',
        title: 'Platform Overview',
        description: 'Complete tour of OpenAssetX features and capabilities',
        duration: '12 min',
        type: 'tutorial',
        level: 'Beginner'
      }
    ],
    'blockchain-basics': [
      {
        id: 'blockchain-basics-1',
        title: 'What is Blockchain?',
        description: 'Understanding blockchain technology and how it powers our marketplace',
        duration: '15 min',
        type: 'article',
        level: 'Beginner'
      },
      {
        id: 'tokens-explained',
        title: 'Understanding Money Tokens',
        description: 'How our native tokens work and their role in transactions',
        duration: '12 min',
        type: 'video',
        level: 'Beginner'
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contracts Explained',
        description: 'How automated contracts ensure secure transactions',
        duration: '18 min',
        type: 'article',
        level: 'Intermediate'
      },
      {
        id: 'network-basics',
        title: 'Ethereum vs Polygon',
        description: 'Understanding different blockchain networks and their benefits',
        duration: '14 min',
        type: 'tutorial',
        level: 'Intermediate'
      }
    ],
    'buying-guide': [
      {
        id: 'browse-assets',
        title: 'Finding Assets to Buy',
        description: 'How to search, filter, and discover assets on our marketplace',
        duration: '10 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'making-offers',
        title: 'Making an Offer',
        description: 'Step-by-step guide to purchasing assets and making offers',
        duration: '8 min',
        type: 'interactive',
        level: 'Beginner'
      },
      {
        id: 'payment-process',
        title: 'Payment & Transactions',
        description: 'Understanding the payment process and transaction confirmations',
        duration: '12 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'buyer-protection',
        title: 'Buyer Protection',
        description: 'Your rights as a buyer and how disputes are resolved',
        duration: '15 min',
        type: 'article',
        level: 'Intermediate'
      }
    ],
    'selling-guide': [
      {
        id: 'listing-assets',
        title: 'Listing Your First Asset',
        description: 'Complete guide to creating your first asset listing',
        duration: '20 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'pricing-strategy',
        title: 'Pricing Your Assets',
        description: 'Best practices for competitive pricing and market research',
        duration: '16 min',
        type: 'article',
        level: 'Intermediate'
      },
      {
        id: 'managing-listings',
        title: 'Managing Your Listings',
        description: 'Edit, update, and optimize your asset listings for better visibility',
        duration: '12 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'seller-reputation',
        title: 'Building Seller Reputation',
        description: 'How to build trust and increase your seller rating',
        duration: '18 min',
        type: 'article',
        level: 'Intermediate'
      }
    ],
    'security': [
      {
        id: 'wallet-setup-1',
        title: 'Setting Up MetaMask',
        description: 'Complete guide to installing and securing your MetaMask wallet',
        duration: '25 min',
        type: 'tutorial',
        level: 'Beginner'
      },
      {
        id: 'security-best-practices',
        title: 'Security Best Practices',
        description: 'Essential security tips to protect your account and assets',
        duration: '20 min',
        type: 'article',
        level: 'Beginner'
      },
      {
        id: 'avoiding-scams',
        title: 'Avoiding Common Scams',
        description: 'Recognize and avoid fraudulent activities in the crypto space',
        duration: '15 min',
        type: 'video',
        level: 'Intermediate'
      },
      {
        id: 'backup-recovery',
        title: 'Backup & Recovery',
        description: 'How to backup your wallet and recover your funds safely',
        duration: '22 min',
        type: 'tutorial',
        level: 'Advanced'
      }
    ],
    'advanced': [
      {
        id: 'gas-optimization',
        title: 'Gas Fee Optimization',
        description: 'Understanding and minimizing blockchain transaction fees',
        duration: '18 min',
        type: 'article',
        level: 'Advanced'
      },
      {
        id: 'bulk-operations',
        title: 'Bulk Asset Management',
        description: 'Efficiently manage multiple assets and batch operations',
        duration: '14 min',
        type: 'tutorial',
        level: 'Advanced'
      },
      {
        id: 'api-integration',
        title: 'API Integration',
        description: 'Integrate OpenAssetX with your applications using our API',
        duration: '30 min',
        type: 'technical',
        level: 'Expert'
      },
      {
        id: 'analytics-insights',
        title: 'Analytics & Insights',
        description: 'Leverage marketplace data for better trading decisions',
        duration: '16 min',
        type: 'article',
        level: 'Advanced'
      }
    ],
    'faq': [
      {
        id: 'general-faq',
        title: 'General Questions',
        description: 'Most commonly asked questions about OpenAssetX',
        duration: '5 min',
        type: 'faq',
        level: 'All Levels'
      },
      {
        id: 'technical-faq',
        title: 'Technical Issues',
        description: 'Troubleshooting common technical problems',
        duration: '8 min',
        type: 'faq',
        level: 'All Levels'
      },
      {
        id: 'payment-faq',
        title: 'Payment & Fees',
        description: 'Questions about payments, fees, and transactions',
        duration: '6 min',
        type: 'faq',
        level: 'All Levels'
      }
    ]
  };

  const popularLessons = [
    'blockchain-basics-1',
    'wallet-setup-1',
    'listing-assets',
    'security-best-practices',
    'making-offers'
  ];

  const filteredLessons = lessons[activeCategory]?.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const markAsComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const calculateProgress = () => {
    const totalLessons = Object.values(lessons).flat().length;
    const completedCount = completedLessons.size;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const getLessonTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'tutorial': return '📖';
      case 'interactive': return '🎯';
      case 'article': return '📝';
      case 'technical': return '💻';
      case 'faq': return '❓';
      default: return '📚';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#059669';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#dc2626';
      case 'Expert': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  return (
    <div className="learn-page-container">
      <Navbar />

      <div className="learn-page-main-content">
        {/* Back Button */}
        <div className="learn-page-back-button-container">
          <button 
            onClick={() => navigate('/dashboard')}
            className="learn-page-back-link"
          >
            <span className="learn-page-back-icon">←</span>
            Back to Dashboard
          </button>
        </div>

        {/* Hero Section */}
        <div className="learn-page-hero">
          <div className="learn-page-hero-content">
            <h1 className="learn-page-hero-title">Learn OpenAssetX</h1>
            <p className="learn-page-hero-subtitle">
              Master blockchain asset trading with our comprehensive learning center. 
              From blockchain basics to advanced trading strategies.
            </p>
            <div className="learn-page-hero-stats">
              <div className="learn-page-hero-stat">
                <span className="learn-page-stat-number">{Object.values(lessons).flat().length}</span>
                <span className="learn-page-stat-label">Lessons</span>
              </div>
              <div className="learn-page-hero-stat">
                <span className="learn-page-stat-number">{calculateProgress()}%</span>
                <span className="learn-page-stat-label">Your Progress</span>
              </div>
              <div className="learn-page-hero-stat">
                <span className="learn-page-stat-number">{completedLessons.size}</span>
                <span className="learn-page-stat-label">Completed</span>
              </div>
            </div>
          </div>
          <div className="learn-page-hero-image">
            <div className="learn-page-hero-icon">🎓</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="learn-page-search-section">
          <div className="learn-page-search-container">
            <input
              type="text"
              className="learn-page-search-input"
              placeholder="Search lessons, guides, and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="learn-page-search-button">🔍</button>
          </div>
        </div>

        {/* Popular Lessons */}
        {!searchQuery && (
          <div className="learn-page-popular-section">
            <h2 className="learn-page-section-title">
              <span className="learn-page-section-icon">🔥</span>
              Popular Lessons
            </h2>
            <div className="learn-page-popular-grid">
              {popularLessons.map((lessonId) => {
                const lesson = Object.values(lessons).flat().find(l => l.id === lessonId);
                if (!lesson) return null;
                
                return (
                  <div key={lessonId} className="learn-page-popular-card">
                    <div className="learn-page-lesson-type">
                      {getLessonTypeIcon(lesson.type)}
                    </div>
                    <div className="learn-page-popular-content">
                      <h3 className="learn-page-popular-title">{lesson.title}</h3>
                      <p className="learn-page-popular-description">{lesson.description}</p>
                      <div className="learn-page-popular-meta">
                        <span className="learn-page-duration">{lesson.duration}</span>
                        <span 
                          className="learn-page-level" 
                          style={{ color: getLevelColor(lesson.level) }}
                        >
                          {lesson.level}
                        </span>
                        {completedLessons.has(lessonId) && (
                          <span className="learn-page-completed-badge">✅ Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="learn-page-content-grid">
          {/* Categories Sidebar */}
          <div className="learn-page-sidebar">
            <div className="learn-page-categories-card">
              <h3 className="learn-page-categories-title">Learning Paths</h3>
              <div className="learn-page-categories-list">
                {categories.map((category) => {
                  const categoryLessons = lessons[category.id] || [];
                  const completedInCategory = categoryLessons.filter(lesson => 
                    completedLessons.has(lesson.id)
                  ).length;
                  const progressPercent = categoryLessons.length > 0 
                    ? Math.round((completedInCategory / categoryLessons.length) * 100) 
                    : 0;

                  return (
                    <button
                      key={category.id}
                      className={`learn-page-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.id)}
                      style={{ '--category-color': category.color }}
                    >
                      <div className="learn-page-category-main">
                        <span className="learn-page-category-icon">{category.icon}</span>
                        <div className="learn-page-category-info">
                          <span className="learn-page-category-name">{category.name}</span>
                          <span className="learn-page-category-count">
                            {categoryLessons.length} lessons
                          </span>
                        </div>
                      </div>
                      <div className="learn-page-category-progress">
                        <div className="learn-page-progress-bar">
                          <div 
                            className="learn-page-progress-fill"
                            style={{ 
                              width: `${progressPercent}%`,
                              backgroundColor: category.color
                            }}
                          />
                        </div>
                        <span className="learn-page-progress-text">{progressPercent}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="learn-page-quick-links-card">
              <h4 className="learn-page-quick-links-title">Quick Links</h4>
              <div className="learn-page-quick-links">
                <a href="/register" className="learn-page-quick-link">
                  <span className="learn-page-link-icon">🚀</span>
                  Get Started
                </a>
                <a href="/buy-tokens" className="learn-page-quick-link">
                  <span className="learn-page-link-icon">🪙</span>
                  Buy Tokens
                </a>
                <a href="/add-new-asset" className="learn-page-quick-link">
                  <span className="learn-page-link-icon">➕</span>
                  List Asset
                </a>
                <a href="/marketplace" className="learn-page-quick-link">
                  <span className="learn-page-link-icon">🛒</span>
                  Browse Market
                </a>
              </div>
            </div>
          </div>

          {/* Lessons Content */}
          <div className="learn-page-lessons-content">
            <div className="learn-page-lessons-header">
              <h2 className="learn-page-lessons-title">
                {categories.find(c => c.id === activeCategory)?.name || 'Lessons'}
              </h2>
              <span className="learn-page-lessons-count">
                {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''}
                {searchQuery && ' found'}
              </span>
            </div>

            <div className="learn-page-lessons-grid">
              {filteredLessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                
                return (
                  <div key={lesson.id} className="learn-page-lesson-card">
                    <div className="learn-page-lesson-header">
                      <div className="learn-page-lesson-type-badge">
                        <span className="learn-page-lesson-type-icon">
                          {getLessonTypeIcon(lesson.type)}
                        </span>
                        <span className="learn-page-lesson-type-text">{lesson.type}</span>
                      </div>
                      {isCompleted && (
                        <div className="learn-page-completed-icon">✅</div>
                      )}
                    </div>
                    
                    <div className="learn-page-lesson-content">
                      <h3 className="learn-page-lesson-title">{lesson.title}</h3>
                      <p className="learn-page-lesson-description">{lesson.description}</p>
                      
                      <div className="learn-page-lesson-meta">
                        <div className="learn-page-lesson-info">
                          <span className="learn-page-lesson-duration">
                            <span className="learn-page-meta-icon">⏱️</span>
                            {lesson.duration}
                          </span>
                          <span 
                            className="learn-page-lesson-level"
                            style={{ color: getLevelColor(lesson.level) }}
                          >
                            <span className="learn-page-meta-icon">📊</span>
                            {lesson.level}
                          </span>
                        </div>
                        
                        <div className="learn-page-lesson-actions">
                          {!isCompleted ? (
                            <button 
                              className="learn-page-start-btn"
                              onClick={() => markAsComplete(lesson.id)}
                            >
                              Start Lesson
                            </button>
                          ) : (
                            <button className="learn-page-review-btn">
                              Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLessons.length === 0 && searchQuery && (
              <div className="learn-page-no-results">
                <div className="learn-page-no-results-icon">🔍</div>
                <h3 className="learn-page-no-results-title">No lessons found</h3>
                <p className="learn-page-no-results-text">
                  Try adjusting your search terms or browse our categories above.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="learn-page-help-section">
          <div className="learn-page-help-card">
            <div className="learn-page-help-content">
              <h3 className="learn-page-help-title">Need Additional Help?</h3>
              <p className="learn-page-help-description">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="learn-page-help-actions">
                <button className="learn-page-help-btn learn-page-help-primary">
                  <span className="learn-page-help-icon">💬</span>
                  Contact Support
                </button>
                <button className="learn-page-help-btn learn-page-help-secondary">
                  <span className="learn-page-help-icon">👥</span>
                  Join Community
                </button>
              </div>
            </div>
            <div className="learn-page-help-stats">
              <div className="learn-page-help-stat">
                <span className="learn-page-help-stat-number">10K+</span>
                <span className="learn-page-help-stat-label">Students Helped</span>
              </div>
              <div className="learn-page-help-stat">
                <span className="learn-page-help-stat-number">24/7</span>
                <span className="learn-page-help-stat-label">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
