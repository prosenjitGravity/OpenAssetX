import { useState } from "react"
import "./asset-detail.css"

export default function AssetDetailPage({ assetId }) {
  const [asset] = useState({
    id: 1,
    name: "Professional DSLR Camera",
    description:
      "Canon EOS 5D Mark IV with lens kit. This camera has been well-maintained and comes with original packaging, battery charger, and documentation. Perfect for professional photography or serious hobbyists.",
    price: 800,
    category: "Electronics",
    condition: "Excellent",
    seller: "0x1234567890abcdef1234567890abcdef12345678",
    sellerName: "PhotoPro_Mike",
    image: "/placeholder.svg?height=400&width=600",
    listedDate: "2024-01-15",
    tokenId: "AST_001_CAM_2024",
    specifications: [
      "24.6MP Full Frame CMOS Sensor",
      "DIGIC 6+ Image Processor",
      "61-Point High Density Reticular AF",
      "4K Video Recording",
      "Built-in Wi-Fi and GPS",
    ],
  })

  const [ownershipHistory] = useState([
    {
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      ownerName: "PhotoPro_Mike",
      date: "2024-01-15",
      price: null,
      action: "Listed for sale",
    },
    {
      owner: "0x9876543210fedcba9876543210fedcba98765432",
      ownerName: "CameraCollector_Jane",
      date: "2023-08-20",
      price: 850,
      action: "Purchased",
    },
    {
      owner: "0x5555555555555555555555555555555555555555",
      ownerName: "StudioRental_Co",
      date: "2022-03-10",
      price: 1200,
      action: "Original purchase",
    },
  ])

  const handlePurchase = () => {
    // Handle purchase logic
    console.log("Purchasing asset:", asset.id)
  }

  return (
    <div className="asset-detail-container">
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
        {/* Back Button */}
        <div className="back-button-container">
          <a href="/marketplace" className="back-link">
            <span className="back-icon">←</span>
            Back to Marketplace
          </a>
        </div>

        <div className="content-grid">
          {/* Asset Image */}
          <div className="image-section">
            <div className="image-card">
              <img
                src={asset.image || "/placeholder.svg"}
                alt={asset.name}
                className="asset-image"
              />
            </div>
          </div>

          {/* Asset Details */}
          <div className="details-section">
            <div className="asset-header">
              <div className="title-section">
                <h1 className="asset-title">{asset.name}</h1>
                <span className="condition-badge">{asset.condition}</span>
              </div>

              <div className="meta-info">
                <span className="category-badge">{asset.category}</span>
                <div className="listed-date">
                  <span className="date-icon">📅</span>
                  Listed on {asset.listedDate}
                </div>
              </div>

              <p className="asset-description">{asset.description}</p>
            </div>

            {/* Price and Purchase */}
            <div className="purchase-card">
              <div className="price-section">
                <div className="price-info">
                  <p className="price-label">Current Price</p>
                  <p className="price-amount">{asset.price} tokens</p>
                </div>
                <div className="token-info">
                  <p className="token-label">Token ID</p>
                  <p className="token-id">{asset.tokenId}</p>
                </div>
              </div>

              <button onClick={handlePurchase} className="buy-button">
                <span className="btn-icon">🛒</span>
                Buy Now for {asset.price} tokens
              </button>
            </div>

            {/* Seller Info */}
            <div className="seller-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">👤</span>
                  Seller Information
                </h3>
              </div>
              <div className="card-content">
                <div className="seller-details">
                  <div className="detail-row">
                    <span className="detail-label">Username:</span>
                    <span className="detail-value">{asset.sellerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Wallet:</span>
                    <span className="wallet-address">{asset.seller}</span>
                  </div>
                  <button className="explorer-btn">
                    <span className="btn-icon">🔗</span>
                    View on Blockchain Explorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="specifications-section">
          <div className="specs-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="title-icon">📦</span>
                Specifications
              </h3>
            </div>
            <div className="card-content">
              <ul className="specs-list">
                {asset.specifications.map((spec, index) => (
                  <li key={index} className="spec-item">
                    <span className="spec-icon">✅</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ownership History */}
        <div className="history-section">
          <div className="history-card">
            <div className="card-header">
              <h3 className="card-title">
                <span className="title-icon">📜</span>
                Ownership History
              </h3>
              <p className="card-description">Complete blockchain-verified ownership trail</p>
            </div>
            <div className="card-content">
              <div className="history-timeline">
                {ownershipHistory.map((record, index) => (
                  <div key={index} className="timeline-item">
                    <div className="record-content">
                      <div className="record-info">
                        <div className="owner-details">
                          <span className="owner-name">{record.ownerName}</span>
                          <span className="action-badge">{record.action}</span>
                        </div>
                        <p className="owner-address">{record.owner}</p>
                        <p className="record-date">{record.date}</p>
                      </div>
                      {record.price && (
                        <div className="price-info">
                          <p className="record-price">{record.price} tokens</p>
                        </div>
                      )}
                    </div>
                    {index < ownershipHistory.length - 1 && <div className="timeline-separator"></div>}
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
