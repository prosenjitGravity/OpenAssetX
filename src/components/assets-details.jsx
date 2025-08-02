import { useState } from "react";
import "./asset-detail.css";
import Navbar from './navbar';

export default function AssetDetailPage({ assetId }) {
  const [asset] = useState({
    id: 1,
    name: "Professional DSLR Camera",
    description:
      "Canon EOS 5D Mark IV with lens kit. This camera has been well-maintained and comes with original packaging, battery charger, and documentation. Perfect for professional photography or serious hobbyists.",
    price: 800,
    originalPrice: 1200,
    category: "Electronics",
    condition: "Excellent",
    seller: "0x1234567890abcdef1234567890abcdef12345678",
    sellerName: "PhotoPro_Mike",
    sellerRating: 4.8,
    sellerTransactions: 23,
    image: "https://cdn.media.amplience.net/i/canon/eos_5d_mark_iv-beauty_1bd06bcadaee4833af6460c87898d249?$70-30-header-4by3-dt$",
    additionalImages: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400"
    ],
    listedDate: "2024-01-15",
    tokenId: "AST_001_CAM_2024",
    brand: "Canon",
    model: "EOS 5D Mark IV",
    yearManufactured: "2021",
    serialNumber: "123456789ABC",
    warranty: "6-12months",
    location: "New York, USA",
    dimensions: "15.1 x 11.6 x 7.6 cm",
    weight: "800g",
    includedItems: [
      "Camera body",
      "EF 24-70mm f/4L lens",
      "Battery pack LP-E6N",
      "Battery charger LC-E6",
      "Original box and documentation",
      "USB cable"
    ],
    specifications: [
      "24.6MP Full Frame CMOS Sensor",
      "DIGIC 6+ Image Processor", 
      "61-Point High Density Reticular AF",
      "4K Video Recording at 30fps",
      "Built-in Wi-Fi and GPS",
      "3.2-inch LCD touchscreen",
      "Dual SD card slots",
      "ISO range: 100-32000"
    ],
    defects: "Minor scratches on LCD screen, fully functional otherwise",
    reasonForSelling: "Upgrading to mirrorless system"
  });

  const [ownershipHistory] = useState([
    {
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      ownerName: "PhotoPro_Mike",
      date: "2024-01-15",
      price: null,
      action: "Listed for sale",
      transactionHash: null
    },
    {
      owner: "0x9876543210fedcba9876543210fedcba98765432",
      ownerName: "CameraCollector_Jane",
      date: "2023-08-20",
      price: 850,
      action: "Purchased",
      transactionHash: "0xabcd1234567890..."
    },
    {
      owner: "0x5555555555555555555555555555555555555555",
      ownerName: "StudioRental_Co",
      date: "2022-03-10",
      price: 1200,
      action: "Original purchase",
      transactionHash: "0xef123456789..."
    },
  ]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const allImages = [asset.image, ...asset.additionalImages];

  const handlePurchase = () => {
    console.log("Purchasing asset:", asset.id);
  };

  const handleAddToWishlist = () => {
    setIsLiked(!isLiked);
  };

  const handleContactSeller = () => {
    console.log("Contacting seller:", asset.sellerName);
  };

  const calculateDiscount = () => {
    if (asset.originalPrice && asset.price < asset.originalPrice) {
      return Math.round(((asset.originalPrice - asset.price) / asset.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="asset-details-container">
      <Navbar />

      <div className="asset-details-main-content">
        {/* Back Button & Actions */}
        <div className="asset-details-header-actions">
          <a href="/marketplace" className="asset-details-back-link">
            <span className="asset-details-back-icon">←</span>
            Back to Marketplace
          </a>
          <div className="asset-details-header-buttons">
            <button 
              className={`asset-details-wishlist-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleAddToWishlist}
            >
              <span className="asset-details-btn-icon">{isLiked ? '❤️' : '🤍'}</span>
              {isLiked ? 'Saved' : 'Save'}
            </button>
            <button className="asset-details-share-btn">
              <span className="asset-details-btn-icon">📤</span>
              Share
            </button>
          </div>
        </div>

        <div className="asset-details-content-grid">
          {/* Image Gallery Section */}
          <div className="asset-details-image-section">
            <div className="asset-details-main-image">
              <img
                src={allImages[activeImageIndex] || "/placeholder.svg"}
                alt={asset.name}
                className="asset-details-asset-image"
              />
              {calculateDiscount() > 0 && (
                <div className="asset-details-discount-badge">
                  -{calculateDiscount()}%
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="asset-details-image-thumbnails">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`asset-details-thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt={`${asset.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Asset Details Section */}
          <div className="asset-details-details-section">
            {/* Asset Header */}
            <div className="asset-details-asset-header">
              <div className="asset-details-breadcrumb">
                <span className="asset-details-category-link">{asset.category}</span>
                <span className="asset-details-breadcrumb-separator">→</span>
                <span className="asset-details-breadcrumb-current">{asset.brand}</span>
              </div>

              <div className="asset-details-title-section">
                <h1 className="asset-details-asset-title">{asset.name}</h1>
                <div className="asset-details-badges">
                  <span className="asset-details-condition-badge">{asset.condition}</span>
                  <span className="asset-details-category-badge">{asset.category}</span>
                </div>
              </div>

              <div className="asset-details-meta-info">
                <div className="asset-details-meta-item">
                  <span className="asset-details-meta-icon">🏷️</span>
                  <span>Model: {asset.model}</span>
                </div>
                <div className="asset-details-meta-item">
                  <span className="asset-details-meta-icon">📅</span>
                  <span>Listed on {asset.listedDate}</span>
                </div>
                <div className="asset-details-meta-item">
                  <span className="asset-details-meta-icon">📍</span>
                  <span>{asset.location}</span>
                </div>
              </div>

              <div className="asset-details-description-container">
                <p className={`asset-details-asset-description ${showFullDescription ? 'expanded' : ''}`}>
                  {asset.description}
                </p>
                <button 
                  className="asset-details-read-more"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>

            {/* Price and Purchase */}
            <div className="asset-details-purchase-card">
              <div className="asset-details-price-section">
                <div className="asset-details-price-info">
                  <div className="asset-details-price-group">
                    <span className="asset-details-price-amount">{asset.price} tokens</span>
                    {asset.originalPrice && asset.originalPrice > asset.price && (
                      <span className="asset-details-original-price">{asset.originalPrice} tokens</span>
                    )}
                  </div>
                  <p className="asset-details-price-label">Current Price</p>
                </div>
                <div className="asset-details-token-info">
                  <p className="asset-details-token-label">Token ID</p>
                  <p className="asset-details-token-id">{asset.tokenId}</p>
                </div>
              </div>

              <div className="asset-details-action-buttons">
                <button onClick={handlePurchase} className="asset-details-buy-button">
                  <span className="asset-details-btn-icon">🛒</span>
                  Buy Now for {asset.price} tokens
                </button>
                <button onClick={handleContactSeller} className="asset-details-contact-button">
                  <span className="asset-details-btn-icon">💬</span>
                  Contact Seller
                </button>
              </div>

              <div className="asset-details-security-info">
                <div className="asset-details-security-item">
                  <span className="asset-details-security-icon">🔒</span>
                  <span>Secure blockchain transaction</span>
                </div>
                <div className="asset-details-security-item">
                  <span className="asset-details-security-icon">✅</span>
                  <span>Verified asset authenticity</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="asset-details-seller-card">
              <div className="asset-details-card-header">
                <h3 className="asset-details-card-title">
                  <span className="asset-details-title-icon">👤</span>
                  Seller Information
                </h3>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-seller-info">
                  <div className="asset-details-seller-avatar">
                    <span className="asset-details-avatar-text">
                      {asset.sellerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="asset-details-seller-details">
                    <div className="asset-details-seller-name-row">
                      <span className="asset-details-seller-name">{asset.sellerName}</span>
                      <div className="asset-details-seller-rating">
                        <span className="asset-details-rating-stars">⭐</span>
                        <span className="asset-details-rating-value">{asset.sellerRating}</span>
                        <span className="asset-details-rating-count">({asset.sellerTransactions} transactions)</span>
                      </div>
                    </div>
                    <span className="asset-details-wallet-address">{asset.seller}</span>
                    <button className="asset-details-explorer-btn">
                      <span className="asset-details-btn-icon">🔗</span>
                      View on Blockchain Explorer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details Grid */}
        <div className="asset-details-info-grid">
          {/* Specifications */}
          <div className="asset-details-specs-card">
            <div className="asset-details-card-header">
              <h3 className="asset-details-card-title">
                <span className="asset-details-title-icon">⚙️</span>
                Technical Specifications
              </h3>
            </div>
            <div className="asset-details-card-content">
              <div className="asset-details-specs-grid">
                {asset.specifications.map((spec, index) => (
                  <div key={index} className="asset-details-spec-item">
                    <span className="asset-details-spec-icon">✅</span>
                    <span className="asset-details-spec-text">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physical Details */}
          <div className="asset-details-physical-card">
            <div className="asset-details-card-header">
              <h3 className="asset-details-card-title">
                <span className="asset-details-title-icon">📐</span>
                Physical Details
              </h3>
            </div>
            <div className="asset-details-card-content">
              <div className="asset-details-detail-grid">
                <div className="asset-details-detail-item">
                  <span className="asset-details-detail-label">Dimensions:</span>
                  <span className="asset-details-detail-value">{asset.dimensions}</span>
                </div>
                <div className="asset-details-detail-item">
                  <span className="asset-details-detail-label">Weight:</span>
                  <span className="asset-details-detail-value">{asset.weight}</span>
                </div>
                <div className="asset-details-detail-item">
                  <span className="asset-details-detail-label">Year:</span>
                  <span className="asset-details-detail-value">{asset.yearManufactured}</span>
                </div>
                <div className="asset-details-detail-item">
                  <span className="asset-details-detail-label">Serial:</span>
                  <span className="asset-details-detail-value">{asset.serialNumber}</span>
                </div>
                <div className="asset-details-detail-item">
                  <span className="asset-details-detail-label">Warranty:</span>
                  <span className="asset-details-detail-value">{asset.warranty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="asset-details-included-card">
            <div className="asset-details-card-header">
              <h3 className="asset-details-card-title">
                <span className="asset-details-title-icon">📦</span>
                What's Included
              </h3>
            </div>
            <div className="asset-details-card-content">
              <div className="asset-details-included-grid">
                {asset.includedItems.map((item, index) => (
                  <div key={index} className="asset-details-included-item">
                    <span className="asset-details-included-icon">✅</span>
                    <span className="asset-details-included-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {(asset.defects || asset.reasonForSelling) && (
          <div className="asset-details-additional-info">
            {asset.defects && (
              <div className="asset-details-info-card">
                <h4 className="asset-details-info-title">
                  <span className="asset-details-info-icon">⚠️</span>
                  Known Issues
                </h4>
                <p className="asset-details-info-text">{asset.defects}</p>
              </div>
            )}
            {asset.reasonForSelling && (
              <div className="asset-details-info-card">
                <h4 className="asset-details-info-title">
                  <span className="asset-details-info-icon">💭</span>
                  Reason for Selling
                </h4>
                <p className="asset-details-info-text">{asset.reasonForSelling}</p>
              </div>
            )}
          </div>
        )}

        {/* Ownership History */}
        <div className="asset-details-history-section">
          <div className="asset-details-history-card">
            <div className="asset-details-card-header">
              <h3 className="asset-details-card-title">
                <span className="asset-details-title-icon">📜</span>
                Ownership History
              </h3>
              <p className="asset-details-card-description">Complete blockchain-verified ownership trail</p>
            </div>
            <div className="asset-details-card-content">
              <div className="asset-details-history-timeline">
                {ownershipHistory.map((record, index) => (
                  <div key={index} className="asset-details-timeline-item">
                    <div className="asset-details-timeline-dot"></div>
                    <div className="asset-details-record-content">
                      <div className="asset-details-record-header">
                        <div className="asset-details-owner-info">
                          <span className="asset-details-owner-name">{record.ownerName}</span>
                          <span className="asset-details-action-badge">{record.action}</span>
                        </div>
                        {record.price && (
                          <span className="asset-details-record-price">{record.price} tokens</span>
                        )}
                      </div>
                      <div className="asset-details-record-details">
                        <span className="asset-details-owner-address">{record.owner}</span>
                        <span className="asset-details-record-date">{record.date}</span>
                      </div>
                      {record.transactionHash && (
                        <button className="asset-details-tx-link">
                          <span className="asset-details-btn-icon">🔗</span>
                          View Transaction
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
