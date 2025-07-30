import { useState } from "react"
import "./dashboard.css"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  const [userStats] = useState({
    moneyTokens: 1250,
    assetsOwned: 3,
    assetsListed: 2,
    totalSales: 5,
  })

  const [myAssets] = useState([
    {
      id: 1,
      name: "Programming Book Collection",
      price: 150,
      status: "listed",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Vintage Camera",
      price: 300,
      status: "sold",
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const [ownedAssets] = useState([
    {
      id: 3,
      name: "Guitar Amplifier",
      previousOwner: "0x1234...5678",
      purchasePrice: 200,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Art Supplies Set",
      previousOwner: "0x9876...5432",
      purchasePrice: 75,
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const [activeTab, setActiveTab] = useState("listed")

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-flex">
            <div className="nav-left">
              <a href="/" className="logo">
                OpenAssetX
              </a>
            </div>
            <div className="nav-right">
              <a href="/marketplace">
                <button className="nav-btn">Marketplace</button>
              </a>
              <a href="/dashboard">
                <button className="nav-btn">Dashboard</button>
              </a>
              <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="title">Dashboard</h1>
          <p className="subtitle">Manage your assets and tokens</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="card-header">
              <span className="card-title">Money Tokens</span>
              <span className="icon">💰</span>
            </div>
            <div className="card-content">
              <div className="stat-number">{userStats.moneyTokens}</div>
              <p className="stat-description">Available balance</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <span className="card-title">Assets Owned</span>
              <span className="icon">📦</span>
            </div>
            <div className="card-content">
              <div className="stat-number">{userStats.assetsOwned}</div>
              <p className="stat-description">In your collection</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <span className="card-title">Listed Assets</span>
              <span className="icon">🛒</span>
            </div>
            <div className="card-content">
              <div className="stat-number">{userStats.assetsListed}</div>
              <p className="stat-description">Currently for sale</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <span className="card-title">Total Sales</span>
              <span className="icon">📈</span>
            </div>
            <div className="card-content">
              <div className="stat-number">{userStats.totalSales}</div>
              <p className="stat-description">Assets sold</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/add-new-asset">
            <button className="primary-btn">
              <span className="btn-icon">➕</span>
              List New Asset
            </button>
          </Link>
          <a href="/buy-tokens">
            <button className="outline-btn">
              <span className="btn-icon">💳</span>
              Buy More Tokens
            </button>
          </a>
          <a href="/marketplace">
            <button className="outline-btn">
              <span className="btn-icon">🛒</span>
              Browse Marketplace
            </button>
          </a>
        </div>

        {/* Tabs for Assets */}
        <div className="tabs-container">
          <div className="tabs-list">
            <button 
              className={`tab-trigger ${activeTab === "listed" ? "active" : ""}`}
              onClick={() => setActiveTab("listed")}
            >
              My Listed Assets
            </button>
            <button 
              className={`tab-trigger ${activeTab === "owned" ? "active" : ""}`}
              onClick={() => setActiveTab("owned")}
            >
              Assets I Own
            </button>
          </div>

          {activeTab === "listed" && (
            <div className="tab-content">
              <div className="assets-grid">
                {myAssets.map((asset) => (
                  <div key={asset.id} className="asset-card">
                    <div className="asset-image-container">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.name}
                        className="asset-image"
                      />
                    </div>
                    <div className="asset-content">
                      <h3 className="asset-title">{asset.name}</h3>
                      <div className="asset-price-row">
                        <span className="asset-price">{asset.price} tokens</span>
                        <span className={`badge ${asset.status === "listed" ? "badge-primary" : "badge-secondary"}`}>
                          {asset.status}
                        </span>
                      </div>
                      <div className="asset-actions">
                        <button className="action-btn">
                          <span className="btn-icon">👁</span>
                          View
                        </button>
                        <button className="action-btn">
                          <span className="btn-icon">✏</span>
                          Edit
                        </button>
                        <button className="action-btn">
                          <span className="btn-icon">🗑</span>
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
            <div className="tab-content">
              <div className="assets-grid">
                {ownedAssets.map((asset) => (
                  <div key={asset.id} className="asset-card">
                    <div className="asset-image-container">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.name}
                        className="asset-image"
                      />
                    </div>
                    <div className="asset-content">
                      <h3 className="asset-title">{asset.name}</h3>
                      <p className="asset-description">Purchased from: {asset.previousOwner}</p>
                      <div className="asset-price-row">
                        <span className="purchase-price">Paid: {asset.purchasePrice} tokens</span>
                      </div>
                      <div className="asset-actions">
                        <button className="action-btn">
                          <span className="btn-icon">👁</span>
                          View History
                        </button>
                        <button className="primary-btn">Resell</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
