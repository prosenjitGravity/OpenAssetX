import { useState } from "react"
import "./dashboard.css"
import { Link } from "react-router-dom"
import Navbar from './navbar';

export default function DashboardPage() {
  const [userProfile] = useState({
    username: "CryptoTrader_Mike",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    memberSince: "January 2024",
    verificationStatus: "Verified",
    reputation: 4.8,
    totalTransactions: 47
  })

  const [userStats] = useState({
    moneyTokens: 1250,
    assetsOwned: 8,
    assetsListed: 3,
    totalSales: 12,
    totalPurchases: 15,
    totalRevenue: 2850,
    avgSalePrice: 237,
    successRate: 95
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: "sale",
      description: "Sold Vintage Camera",
      amount: 300,
      date: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "purchase",
      description: "Bought Art Supplies Set",
      amount: 75,
      date: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "listing",
      description: "Listed Programming Books",
      amount: 150,
      date: "2 days ago",
      status: "active"
    },
    {
      id: 4,
      type: "purchase",
      description: "Bought Guitar Amplifier",
      amount: 200,
      date: "5 days ago",
      status: "completed"
    }
  ])

  const [myAssets] = useState([
    {
      id: 1,
      name: "Programming Book Collection",
      price: 150,
      status: "listed",
      image: "/placeholder.svg?height=100&width=100",
      category: "Books",
      listedDate: "3 days ago"
    },
    {
      id: 2,
      name: "Professional Microphone",
      price: 180,
      status: "listed",
      image: "/placeholder.svg?height=100&width=100",
      category: "Electronics",
      listedDate: "1 week ago"
    },
    {
      id: 3,
      name: "Vintage Camera",
      price: 300,
      status: "sold",
      image: "/placeholder.svg?height=100&width=100",
      category: "Electronics",
      listedDate: "2 weeks ago"
    }
  ])

  const [ownedAssets] = useState([
    {
      id: 4,
      name: "Guitar Amplifier",
      previousOwner: "MusicStore_Co",
      purchasePrice: 200,
      purchaseDate: "5 days ago",
      image: "/placeholder.svg?height=100&width=100",
      category: "Music",
      condition: "Very Good"
    },
    {
      id: 5,
      name: "Art Supplies Set",
      previousOwner: "ArtCollector_Jane",
      purchasePrice: 75,
      purchaseDate: "1 day ago",
      image: "/placeholder.svg?height=100&width=100",
      category: "Art",
      condition: "New"
    },
    {
      id: 6,
      name: "Mountain Bike Helmet",
      previousOwner: "SportsPro_Alex",
      purchasePrice: 45,
      purchaseDate: "1 week ago",
      image: "/placeholder.svg?height=100&width=100",
      category: "Sports",
      condition: "Good"
    }
  ])

  const [activeTab, setActiveTab] = useState("listed")

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-main-content">
        {/* Header with Profile */}
        <div className="dashboard-header">
          <div className="dashboard-profile-section">
            <div className="dashboard-profile-avatar">
              <span className="dashboard-avatar-text">
                {userProfile.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="dashboard-profile-info">
              <h1 className="dashboard-title">Welcome back, {userProfile.username}</h1>
              <p className="dashboard-subtitle">Manage your assets and track your performance</p>
              <div className="dashboard-profile-meta">
                <span className="dashboard-meta-item">
                  <span className="dashboard-meta-icon">📅</span>
                  Member since {userProfile.memberSince}
                </span>
                <span className="dashboard-meta-item">
                  <span className="dashboard-meta-icon">✅</span>
                  {userProfile.verificationStatus}
                </span>
                <span className="dashboard-meta-item">
                  <span className="dashboard-meta-icon">⭐</span>
                  {userProfile.reputation}/5.0 ({userProfile.totalTransactions} transactions)
                </span>
              </div>
            </div>
          </div>
          
          <div className="dashboard-wallet-info">
            <div className="dashboard-wallet-card">
              <div className="dashboard-wallet-header">
                <span className="dashboard-wallet-label">Wallet Address</span>
                <button className="dashboard-copy-btn" title="Copy Address">📋</button>
              </div>
              <div className="dashboard-wallet-address">{userProfile.walletAddress}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card dashboard-stat-primary">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Balance</span>
              <span className="dashboard-card-icon">💰</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.moneyTokens}</div>
              <p className="dashboard-stat-description">Available tokens</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Total Revenue</span>
              <span className="dashboard-card-icon">📈</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.totalRevenue}</div>
              <p className="dashboard-stat-description">Lifetime earnings</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Assets Owned</span>
              <span className="dashboard-card-icon">📦</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.assetsOwned}</div>
              <p className="dashboard-stat-description">In collection</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Listed</span>
              <span className="dashboard-card-icon">🛒</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.assetsListed}</div>
              <p className="dashboard-stat-description">For sale</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Sales</span>
              <span className="dashboard-card-icon">✅</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.totalSales}</div>
              <p className="dashboard-stat-description">Completed</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Success Rate</span>
              <span className="dashboard-card-icon">🎯</span>
            </div>
            <div className="dashboard-card-content">
              <div className="dashboard-stat-number">{userStats.successRate}%</div>
              <p className="dashboard-stat-description">Sale conversion</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-quick-actions">
          <Link to="/add-new-asset" className="dashboard-primary-btn">
            <span className="dashboard-btn-icon">➕</span>
            List New Asset
          </Link>
          <Link to="/buy-tokens" className="dashboard-outline-btn">
            <span className="dashboard-btn-icon">💳</span>
            Buy Tokens
          </Link>
          <Link to="/marketplace" className="dashboard-outline-btn">
            <span className="dashboard-btn-icon">🛒</span>
            Browse Market
          </Link>
          <Link to="/analytics" className="dashboard-outline-btn">
            <span className="dashboard-btn-icon">📊</span>
            View Analytics
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-content-grid">
          {/* Assets Section */}
          <div className="dashboard-assets-section">
            <div className="dashboard-tabs-container">
              <div className="dashboard-tabs-header">
                <h2 className="dashboard-section-title">My Assets</h2>
                <div className="dashboard-tabs-list">
                  <button 
                    className={`dashboard-tab-trigger ${activeTab === "listed" ? "active" : ""}`}
                    onClick={() => setActiveTab("listed")}
                  >
                    Listed ({myAssets.filter(asset => asset.status === 'listed').length})
                  </button>
                  <button 
                    className={`dashboard-tab-trigger ${activeTab === "owned" ? "active" : ""}`}
                    onClick={() => setActiveTab("owned")}
                  >
                    Owned ({ownedAssets.length})
                  </button>
                </div>
              </div>

              {activeTab === "listed" && (
                <div className="dashboard-tab-content">
                  <div className="dashboard-assets-grid">
                    {myAssets.map((asset) => (
                      <div key={asset.id} className="dashboard-asset-card">
                        <div className="dashboard-asset-image-container">
                          <img
                            src={asset.image || "/placeholder.svg"}
                            alt={asset.name}
                            className="dashboard-asset-image"
                          />
                          <span className={`dashboard-status-badge dashboard-status-${asset.status}`}>
                            {asset.status}
                          </span>
                        </div>
                        <div className="dashboard-asset-content">
                          <h3 className="dashboard-asset-title">{asset.name}</h3>
                          <div className="dashboard-asset-meta">
                            <span className="dashboard-category-tag">{asset.category}</span>
                            <span className="dashboard-listed-date">{asset.listedDate}</span>
                          </div>
                          <div className="dashboard-asset-price-row">
                            <span className="dashboard-asset-price">{asset.price} tokens</span>
                          </div>
                          <div className="dashboard-asset-actions">
                            <button className="dashboard-action-btn dashboard-action-primary">
                              <span className="dashboard-btn-icon">👁</span>
                              View
                            </button>
                            <button className="dashboard-action-btn">
                              <span className="dashboard-btn-icon">✏</span>
                              Edit
                            </button>
                            <button className="dashboard-action-btn dashboard-action-danger">
                              <span className="dashboard-btn-icon">🗑</span>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "owned" && (
                <div className="dashboard-tab-content">
                  <div className="dashboard-assets-grid">
                    {ownedAssets.map((asset) => (
                      <div key={asset.id} className="dashboard-asset-card">
                        <div className="dashboard-asset-image-container">
                          <img
                            src={asset.image || "/placeholder.svg"}
                            alt={asset.name}
                            className="dashboard-asset-image"
                          />
                          <span className="dashboard-condition-badge">
                            {asset.condition}
                          </span>
                        </div>
                        <div className="dashboard-asset-content">
                          <h3 className="dashboard-asset-title">{asset.name}</h3>
                          <div className="dashboard-asset-meta">
                            <span className="dashboard-category-tag">{asset.category}</span>
                            <span className="dashboard-purchase-date">{asset.purchaseDate}</span>
                          </div>
                          <p className="dashboard-asset-seller">From: {asset.previousOwner}</p>
                          <div className="dashboard-asset-price-row">
                            <span className="dashboard-purchase-price">Paid: {asset.purchasePrice} tokens</span>
                          </div>
                          <div className="dashboard-asset-actions">
                            <button className="dashboard-action-btn dashboard-action-primary">
                              <span className="dashboard-btn-icon">👁</span>
                              View History
                            </button>
                            <button className="dashboard-primary-btn dashboard-resell-btn">
                              <span className="dashboard-btn-icon">🔄</span>
                              Resell
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="dashboard-activity-section">
            <div className="dashboard-activity-card">
              <div className="dashboard-activity-header">
                <h3 className="dashboard-section-title">Recent Activity</h3>
                <Link to="/activity" className="dashboard-view-all-link">View All</Link>
              </div>
              <div className="dashboard-activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="dashboard-activity-item">
                    <div className={` material-icons dashboard-activity-icon dashboard-activity-${activity.type}`}>
                      {activity.type === 'sale' && '💰'}
                      {activity.type === 'purchase' && 'shopping_cart'}
                      {activity.type === 'listing' && '📋'}
                    </div>
                    <div className="dashboard-activity-content">
                      <p className="dashboard-activity-description">{activity.description}</p>
                      <div className="dashboard-activity-meta">
                        <span className="dashboard-activity-amount">{activity.amount} tokens</span>
                        <span className="dashboard-activity-date">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
