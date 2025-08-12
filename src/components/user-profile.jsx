import { useState } from 'react';
import './user-profile.css';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('all');

  const [user] = useState({
    id: 'USR_001',
    name: 'John Alexander Doe',
    username: 'johndoe_trader',
    email: 'john.doe@example.com',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    profilePicture: null,
    balance: {
      tokens: 1850,
      eth: 3.75,
      matic: 120.5,
      usdc: 450.25
    },
    joinedDate: '2023-07-15',
    lastLogin: '2025-08-09 12:30 IST',
    verified: true,
    kycVerified: true,
    ratings: 4.7,
    totalRatings: 156,
    totalPurchases: 24,
    totalSales: 18,
    totalVolume: 15750,
    location: 'New York, USA',
    preferredNetwork: 'ethereum',
    membershipTier: 'Gold'
  });

  const [assetPurchases] = useState([
    {
      id: 'PUR_001',
      assetName: 'Professional DSLR Camera Canon EOS 5D',
      assetImage: '/placeholder.svg?height=60&width=60',
      seller: 'PhotoPro_Mike',
      date: '2025-08-05',
      amount: 300,
      tokensUsed: 300,
      status: 'Completed',
      transactionHash: '0xabc123def456...',
      category: 'Electronics'
    },
    {
      id: 'PUR_002',
      assetName: 'Vintage Art Collection - Abstract Paintings',
      assetImage: '/placeholder.svg?height=60&width=60',
      seller: 'ArtCollector_Jane',
      date: '2025-07-28',
      amount: 450,
      tokensUsed: 450,
      status: 'Completed',
      transactionHash: '0xdef456ghi789...',
      category: 'Art'
    },
    {
      id: 'PUR_003',
      assetName: 'Gaming Laptop - High Performance',
      assetImage: '/placeholder.svg?height=60&width=60',
      seller: 'TechGuru_Sam',
      date: '2025-07-20',
      amount: 700,
      tokensUsed: 700,
      status: 'Completed',
      transactionHash: '0xghi789jkl012...',
      category: 'Electronics'
    },
    {
      id: 'PUR_004',
      assetName: 'Rare Book Collection - First Editions',
      assetImage: '/placeholder.svg?height=60&width=60',
      seller: 'BookWorm_Lisa',
      date: '2025-07-15',
      amount: 250,
      tokensUsed: 250,
      status: 'Pending',
      transactionHash: '0xjkl012mno345...',
      category: 'Books'
    }
  ]);

  const [assetSales] = useState([
    {
      id: 'SAL_001',
      assetName: 'MacBook Pro 16-inch - Excellent Condition',
      assetImage: '/placeholder.svg?height=60&width=60',
      buyer: 'TechEnthusiast_Bob',
      date: '2025-08-03',
      amount: 850,
      tokensReceived: 850,
      status: 'Sold',
      transactionHash: '0xsold123abc456...',
      category: 'Electronics'
    },
    {
      id: 'SAL_002',
      assetName: 'Designer Watch - Limited Edition',
      assetImage: '/placeholder.svg?height=60&width=60',
      buyer: 'WatchCollector_Alex',
      date: '2025-07-25',
      amount: 500,
      tokensReceived: 500,
      status: 'Sold',
      transactionHash: '0xsold456def789...',
      category: 'Accessories'
    },
    {
      id: 'SAL_003',
      assetName: 'Professional Photography Equipment Set',
      assetImage: '/placeholder.svg?height=60&width=60',
      buyer: 'Photographer_Emma',
      date: '2025-07-18',
      amount: 650,
      tokensReceived: 650,
      status: 'Sold',
      transactionHash: '0xsold789ghi012...',
      category: 'Electronics'
    }
  ]);

  const [tokenPurchases] = useState([
    {
      id: 'TOK_001',
      date: '2025-08-01',
      ethSpent: 3.0,
      tokensBought: 300,
      exchangeRate: 100,
      paymentMethod: 'ETH',
      status: 'Completed',
      transactionHash: '0xtoken123abc...',
      networkFee: 0.002
    },
    {
      id: 'TOK_002',
      date: '2025-07-15',
      ethSpent: 5.0,
      tokensBought: 500,
      exchangeRate: 100,
      paymentMethod: 'ETH',
      status: 'Completed',
      transactionHash: '0xtoken456def...',
      networkFee: 0.003
    },
    {
      id: 'TOK_003',
      date: '2025-06-30',
      usdcSpent: 200,
      tokensBought: 600,
      exchangeRate: 0.33,
      paymentMethod: 'USDC',
      status: 'Completed',
      transactionHash: '0xtoken789ghi...',
      networkFee: 0.1
    }
  ]);

  const [achievements] = useState([
    { id: 1, title: 'First Purchase', description: 'Made your first asset purchase', earned: true, date: '2023-07-20' },
    { id: 2, title: 'Trusted Seller', description: 'Maintained 4+ star rating', earned: true, date: '2024-01-15' },
    { id: 3, title: 'Volume Trader', description: 'Traded over 10,000 tokens', earned: true, date: '2024-06-10' },
    { id: 4, title: 'Community Member', description: 'Active for over 1 year', earned: true, date: '2024-07-15' },
    { id: 5, title: 'Power Trader', description: 'Complete 50 transactions', earned: false, progress: 42 }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'purchases', name: 'Purchases', icon: '🛒' },
    { id: 'sales', name: 'Sales', icon: '💰' },
    { id: 'tokens', name: 'Token History', icon: '🪙' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ];

  const timeFilters = ['all', '7d', '30d', '90d', '1y'];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Completed': 'user-profile-status-completed',
      'Sold': 'user-profile-status-sold',
      'Pending': 'user-profile-status-pending',
      'Processing': 'user-profile-status-processing'
    };
    return statusClasses[status] || 'user-profile-status-default';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="user-profile-container">
      <Navbar />

      <div className="user-profile-main-content">
        {/* Back Button */}
        <div className="user-profile-back-button-container">
          <Link href="/dashboard" className="user-profile-back-link">
            <span className="user-profile-back-icon">←</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Profile Header */}
        <div className="user-profile-header">
          <div className="user-profile-header-content">
            <div className="user-profile-avatar-section">
              <div className="user-profile-avatar">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} />
                ) : (
                  <span className="user-profile-avatar-text">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="user-profile-verification-badges">
                {user.verified && (
                  <span className="user-profile-badge user-profile-badge-verified">
                    ✅ Verified
                  </span>
                )}
                {user.kycVerified && (
                  <span className="user-profile-badge user-profile-badge-kyc">
                    🔒 KYC
                  </span>
                )}
              </div>
            </div>

            <div className="user-profile-info">
              <div className="user-profile-basic-info">
                <h1 className="user-profile-name">{user.name}</h1>
                <p className="user-profile-username">@{user.username}</p>
                <div className="user-profile-rating">
                  <span className="user-profile-stars">⭐⭐⭐⭐⭐</span>
                  <span className="user-profile-rating-value">{user.ratings}</span>
                  <span className="user-profile-rating-count">({user.totalRatings} reviews)</span>
                </div>
                <div className="user-profile-membership">
                  <span className="user-profile-tier user-profile-tier-gold">
                    👑 {user.membershipTier} Member
                  </span>
                </div>
              </div>

              <div className="user-profile-details-grid">
                <div className="user-profile-detail-item">
                  <span className="user-profile-detail-label">Email:</span>
                  <span className="user-profile-detail-value">{user.email}</span>
                </div>
                <div className="user-profile-detail-item">
                  <span className="user-profile-detail-label">Location:</span>
                  <span className="user-profile-detail-value">{user.location}</span>
                </div>
                <div className="user-profile-detail-item">
                  <span className="user-profile-detail-label">Joined:</span>
                  <span className="user-profile-detail-value">{user.joinedDate}</span>
                </div>
                <div className="user-profile-detail-item">
                  <span className="user-profile-detail-label">Last Login:</span>
                  <span className="user-profile-detail-value">{user.lastLogin}</span>
                </div>
                <div className="user-profile-detail-item user-profile-detail-full">
                  <span className="user-profile-detail-label">Wallet:</span>
                  <div className="user-profile-wallet-info">
                    <span className="user-profile-detail-value">{formatAddress(user.walletAddress)}</span>
                    <button 
                      className="user-profile-copy-btn"
                      onClick={() => copyToClipboard(user.walletAddress)}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-profile-stats">
              <div className="user-profile-stat-item">
                <span className="user-profile-stat-value">{user.totalPurchases}</span>
                <span className="user-profile-stat-label">Purchases</span>
              </div>
              <div className="user-profile-stat-item">
                <span className="user-profile-stat-value">{user.totalSales}</span>
                <span className="user-profile-stat-label">Sales</span>
              </div>
              <div className="user-profile-stat-item">
                <span className="user-profile-stat-value">{user.totalVolume.toLocaleString()}</span>
                <span className="user-profile-stat-label">Volume (tokens)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Balances Section */}
        <div className="user-profile-balances">
          <h2 className="user-profile-section-title">
            <span className="user-profile-section-icon">💳</span>
            Current Balances
          </h2>
          <div className="user-profile-balance-grid">
            <div className="user-profile-balance-card user-profile-balance-primary">
              <div className="user-profile-balance-icon">🪙</div>
              <div className="user-profile-balance-info">
                <span className="user-profile-balance-amount">{user.balance.tokens.toLocaleString()}</span>
                <span className="user-profile-balance-label">Money Tokens</span>
              </div>
            </div>
            <div className="user-profile-balance-card">
              <div className="user-profile-balance-icon">⟠</div>
              <div className="user-profile-balance-info">
                <span className="user-profile-balance-amount">{user.balance.eth}</span>
                <span className="user-profile-balance-label">ETH</span>
              </div>
            </div>
            <div className="user-profile-balance-card">
              <div className="user-profile-balance-icon">⬟</div>
              <div className="user-profile-balance-info">
                <span className="user-profile-balance-amount">{user.balance.matic}</span>
                <span className="user-profile-balance-label">MATIC</span>
              </div>
            </div>
            <div className="user-profile-balance-card">
              <div className="user-profile-balance-icon">💵</div>
              <div className="user-profile-balance-info">
                <span className="user-profile-balance-amount">{user.balance.usdc}</span>
                <span className="user-profile-balance-label">USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="user-profile-tabs">
          <div className="user-profile-tabs-header">
            <div className="user-profile-tabs-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`user-profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="user-profile-tab-icon">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="user-profile-time-filter">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="user-profile-filter-select"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>

          {/* Tab Content */}
          <div className="user-profile-tab-content">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="user-profile-overview">
                <div className="user-profile-overview-grid">
                  <div className="user-profile-overview-card">
                    <h3 className="user-profile-card-title">
                      <span className="user-profile-card-icon">📈</span>
                      Trading Activity
                    </h3>
                    <div className="user-profile-activity-stats">
                      <div className="user-profile-activity-item">
                        <span className="user-profile-activity-label">This Month:</span>
                        <span className="user-profile-activity-value">8 transactions</span>
                      </div>
                      <div className="user-profile-activity-item">
                        <span className="user-profile-activity-label">Average Rating:</span>
                        <span className="user-profile-activity-value">{user.ratings}/5.0</span>
                      </div>
                      <div className="user-profile-activity-item">
                        <span className="user-profile-activity-label">Success Rate:</span>
                        <span className="user-profile-activity-value">98.5%</span>
                      </div>
                      <div className="user-profile-activity-item">
                        <span className="user-profile-activity-label">Response Time:</span>
                        <span className="user-profile-activity-value"> 2 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="user-profile-overview-card">
                    <h3 className="user-profile-card-title">
                      <span className="user-profile-card-icon">🎯</span>
                      Quick Actions
                    </h3>
                    <div className="user-profile-quick-actions">
                      <a href="/add-new-asset" className="user-profile-action-btn">
                        <span className="user-profile-action-icon">➕</span>
                        List New Asset
                      </a>
                      <a href="/buy-tokens" className="user-profile-action-btn">
                        <span className="user-profile-action-icon">🪙</span>
                        Buy Tokens
                      </a>
                      <a href="/marketplace" className="user-profile-action-btn">
                        <span className="user-profile-action-icon">🛒</span>
                        Browse Market
                      </a>
                    </div>
                  </div>

                  <div className="user-profile-overview-card user-profile-card-full">
                    <h3 className="user-profile-card-title">
                      <span className="user-profile-card-icon">⏰</span>
                      Recent Activity
                    </h3>
                    <div className="user-profile-recent-activity">
                      <div className="user-profile-activity-timeline">
                        <div className="user-profile-timeline-item">
                          <div className="user-profile-timeline-dot"></div>
                          <div className="user-profile-timeline-content">
                            <p className="user-profile-timeline-text">Sold MacBook Pro for 850 tokens</p>
                            <span className="user-profile-timeline-date">2 days ago</span>
                          </div>
                        </div>
                        <div className="user-profile-timeline-item">
                          <div className="user-profile-timeline-dot"></div>
                          <div className="user-profile-timeline-content">
                            <p className="user-profile-timeline-text">Purchased DSLR Camera for 300 tokens</p>
                            <span className="user-profile-timeline-date">4 days ago</span>
                          </div>
                        </div>
                        <div className="user-profile-timeline-item">
                          <div className="user-profile-timeline-dot"></div>
                          <div className="user-profile-timeline-content">
                            <p className="user-profile-timeline-text">Bought 300 tokens with ETH</p>
                            <span className="user-profile-timeline-date">1 week ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="user-profile-purchases">
                <div className="user-profile-transactions-header">
                  <h3 className="user-profile-transactions-title">Asset Purchases</h3>
                  <span className="user-profile-transactions-count">{assetPurchases.length} total purchases</span>
                </div>
                <div className="user-profile-transactions-list">
                  {assetPurchases.map(purchase => (
                    <div key={purchase.id} className="user-profile-transaction-item">
                      <div className="user-profile-transaction-main">
                        <div className="user-profile-asset-info">
                          <div className="user-profile-asset-image">
                            <img src={purchase.assetImage} alt={purchase.assetName} />
                          </div>
                          <div className="user-profile-asset-details">
                            <h4 className="user-profile-asset-name">{purchase.assetName}</h4>
                            <p className="user-profile-seller-info">Sold by @{purchase.seller}</p>
                            <span className="user-profile-category">{purchase.category}</span>
                          </div>
                        </div>
                        <div className="user-profile-transaction-details">
                          <div className="user-profile-amount">
                            <span className="user-profile-amount-value">{purchase.tokensUsed} tokens</span>
                            <span className="user-profile-amount-label">Paid</span>
                          </div>
                          <span className={`user-profile-status ${getStatusBadge(purchase.status)}`}>
                            {purchase.status}
                          </span>
                        </div>
                      </div>
                      <div className="user-profile-transaction-meta">
                        <span className="user-profile-transaction-date">{purchase.date}</span>
                        <button className="user-profile-tx-link">
                          <span className="user-profile-tx-hash">{purchase.transactionHash.slice(0, 16)}...</span>
                          <span className="user-profile-external-icon">🔗</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div className="user-profile-sales">
                <div className="user-profile-transactions-header">
                  <h3 className="user-profile-transactions-title">Asset Sales</h3>
                  <span className="user-profile-transactions-count">{assetSales.length} total sales</span>
                </div>
                <div className="user-profile-transactions-list">
                  {assetSales.map(sale => (
                    <div key={sale.id} className="user-profile-transaction-item">
                      <div className="user-profile-transaction-main">
                        <div className="user-profile-asset-info">
                          <div className="user-profile-asset-image">
                            <img src={sale.assetImage} alt={sale.assetName} />
                          </div>
                          <div className="user-profile-asset-details">
                            <h4 className="user-profile-asset-name">{sale.assetName}</h4>
                            <p className="user-profile-seller-info">Bought by @{sale.buyer}</p>
                            <span className="user-profile-category">{sale.category}</span>
                          </div>
                        </div>
                        <div className="user-profile-transaction-details">
                          <div className="user-profile-amount">
                            <span className="user-profile-amount-value">{sale.tokensReceived} tokens</span>
                            <span className="user-profile-amount-label">Received</span>
                          </div>
                          <span className={`user-profile-status ${getStatusBadge(sale.status)}`}>
                            {sale.status}
                          </span>
                        </div>
                      </div>
                      <div className="user-profile-transaction-meta">
                        <span className="user-profile-transaction-date">{sale.date}</span>
                        <button className="user-profile-tx-link">
                          <span className="user-profile-tx-hash">{sale.transactionHash.slice(0, 16)}...</span>
                          <span className="user-profile-external-icon">🔗</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Token History Tab */}
            {activeTab === 'tokens' && (
              <div className="user-profile-tokens">
                <div className="user-profile-transactions-header">
                  <h3 className="user-profile-transactions-title">Token Purchase History</h3>
                  <span className="user-profile-transactions-count">{tokenPurchases.length} total purchases</span>
                </div>
                <div className="user-profile-token-list">
                  {tokenPurchases.map(token => (
                    <div key={token.id} className="user-profile-token-item">
                      <div className="user-profile-token-main">
                        <div className="user-profile-token-info">
                          <div className="user-profile-token-icon">
                            {token.paymentMethod === 'ETH' ? '⟠' : token.paymentMethod === 'USDC' ? '💵' : '🪙'}
                          </div>
                          <div className="user-profile-token-details">
                            <h4 className="user-profile-token-title">Token Purchase</h4>
                            <p className="user-profile-token-method">
                              Paid with {token.paymentMethod} • Rate: {token.exchangeRate} tokens per {token.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="user-profile-token-amounts">
                          <div className="user-profile-token-spent">
                            <span className="user-profile-token-value">
                              {token.ethSpent || token.usdcSpent} {token.paymentMethod}
                            </span>
                            <span className="user-profile-token-label">Spent</span>
                          </div>
                          <div className="user-profile-token-received">
                            <span className="user-profile-token-value">{token.tokensBought} tokens</span>
                            <span className="user-profile-token-label">Received</span>
                          </div>
                          <span className={`user-profile-status ${getStatusBadge(token.status)}`}>
                            {token.status}
                          </span>
                        </div>
                      </div>
                      <div className="user-profile-token-meta">
                        <div className="user-profile-token-fees">
                          <span className="user-profile-fee-info">Network fee: {token.networkFee} {token.paymentMethod}</span>
                        </div>
                        <span className="user-profile-transaction-date">{token.date}</span>
                        <button className="user-profile-tx-link">
                          <span className="user-profile-tx-hash">{token.transactionHash.slice(0, 16)}...</span>
                          <span className="user-profile-external-icon">🔗</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="user-profile-achievements">
                <div className="user-profile-achievements-header">
                  <h3 className="user-profile-achievements-title">Achievements & Badges</h3>
                  <span className="user-profile-achievements-count">
                    {achievements.filter(a => a.earned).length} of {achievements.length} earned
                  </span>
                </div>
                <div className="user-profile-achievements-grid">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`user-profile-achievement-item ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                      <div className="user-profile-achievement-icon">
                        {achievement.earned ? '🏆' : '🔒'}
                      </div>
                      <div className="user-profile-achievement-info">
                        <h4 className="user-profile-achievement-title">{achievement.title}</h4>
                        <p className="user-profile-achievement-desc">{achievement.description}</p>
                        {achievement.earned && (
                          <span className="user-profile-achievement-date">Earned on {achievement.date}</span>
                        )}
                        {!achievement.earned && achievement.progress && (
                          <div className="user-profile-achievement-progress">
                            <div className="user-profile-progress-bar">
                              <div 
                                className="user-profile-progress-fill"
                                style={{ width: `${(achievement.progress / 50) * 100}%` }}
                              />
                            </div>
                            <span className="user-profile-progress-text">{achievement.progress}/50</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
