import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './my-asset-details.css';
import Navbar from './navbar';

export default function MyAssetDetailsPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [asset] = useState({
    id: 'AST_001_CAM_2024',
    name: 'Professional DSLR Camera Canon EOS 5D Mark IV',
    description: 'High-performance full-frame DSLR camera in excellent condition. Perfect for professional photography and serious enthusiasts. Comes with original packaging and all accessories.',
    category: 'Electronics',
    subcategory: 'Cameras',
    condition: 'Excellent',
    price: 800,
    originalPrice: 1200,
    currency: 'tokens',
    status: 'Listed',
    listedDate: '2024-08-05',
    views: 234,
    likes: 18,
    offers: 3,
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600'
    ],
    specifications: {
      brand: 'Canon',
      model: 'EOS 5D Mark IV',
      year: '2021',
      serialNumber: 'C5D4-123456789',
      warranty: '6 months seller warranty',
      color: 'Black',
      dimensions: '15.1 x 11.6 x 7.6 cm',
      weight: '800g'
    },
    includedItems: [
      'Camera body',
      'EF 24-70mm f/4L lens',
      'Battery pack LP-E6N',
      'Battery charger LC-E6',
      'Original box and documentation',
      'USB cable',
      'Strap',
      '64GB SD card'
    ],
    technicalSpecs: [
      '30.4MP Full Frame CMOS Sensor',
      'DIGIC 6+ Image Processor',
      '61-Point High Density Reticular AF',
      '4K Video Recording at 30fps',
      'Built-in Wi-Fi and GPS',
      '3.2-inch LCD touchscreen',
      'Dual SD card slots',
      'ISO range: 100-32000'
    ],
    location: 'New York, USA',
    shippingOptions: ['Local pickup', 'Insured shipping'],
    defects: 'Minor scratches on LCD screen, fully functional',
    reasonForSelling: 'Upgrading to mirrorless system',
    tags: ['professional', 'photography', 'canon', 'dslr', 'full-frame']
  });

  const [recentOffers] = useState([
    {
      id: 'OFF_001',
      buyerName: 'TechEnthusiast_Bob',
      amount: 750,
      message: 'Great condition! Would you consider 750 tokens?',
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: 'OFF_002',
      buyerName: 'PhotoPro_Sarah',
      amount: 780,
      message: 'Interested in immediate purchase at 780 tokens',
      status: 'pending',
      timestamp: '1 day ago'
    },
    {
      id: 'OFF_003',
      buyerName: 'CameraCollector_Mike',
      amount: 700,
      message: 'Cash ready, quick transaction',
      status: 'declined',
      timestamp: '3 days ago'
    }
  ]);

  const handleImageChange = (index) => {
    setActiveImageIndex(index);
  };

  const handleEditAsset = () => {
    navigate(`/edit-asset/${assetId}`);
  };

  const handleDeleteAsset = () => {
    if (window.confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      navigate('/my-assets');
    }
  };

  const handleOfferAction = (offerId, action) => {
    console.log(`${action} offer ${offerId}`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Listed': 'asset-details-status-listed',
      'Sold': 'asset-details-status-sold',
      'Pending': 'asset-details-status-pending',
      'Draft': 'asset-details-status-draft'
    };
    return statusClasses[status] || 'asset-details-status-default';
  };

  return (
    <div className="asset-details-container">
      <Navbar />

      <div className="asset-details-main-content">
        {/* Back Button */}
        <div className="asset-details-back-button-container">
          <button 
            onClick={() => navigate('/my-assets')}
            className="asset-details-back-link"
          >
            <span className="asset-details-back-icon">←</span>
            Back to My Assets
          </button>
        </div>

        {/* Asset Header */}
        <div className="asset-details-header">
          <div className="asset-details-title-section">
            <h1 className="asset-details-asset-title">{asset.name}</h1>
            <div className="asset-details-meta-info">
              <span className={`asset-details-status ${getStatusBadge(asset.status)}`}>
                {asset.status}
              </span>
              <span className="asset-details-condition">{asset.condition} Condition</span>
              <span className="asset-details-category">{asset.category}</span>
              <span className="asset-details-views">👁️ {asset.views} views</span>
            </div>
          </div>
          <div className="asset-details-actions">
            <button className="asset-details-btn asset-details-btn-primary" onClick={handleEditAsset}>
              <span className="asset-details-btn-icon">✏️</span>
              Edit Asset
            </button>
            <button className="asset-details-btn asset-details-btn-secondary" onClick={handleDeleteAsset}>
              <span className="asset-details-btn-icon">🗑️</span>
              Delete
            </button>
          </div>
        </div>

        <div className="asset-details-content-grid">
          {/* Main Content */}
          <div className="asset-details-main-column">
            
            {/* Image Gallery */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">📸</span>
                  Asset Images
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-image-gallery">
                  <div className="asset-details-main-image">
                    <img
                      src={asset.images[activeImageIndex]}
                      alt={asset.name}
                      className="asset-details-featured-image"
                    />
                    <div className="asset-details-image-counter">
                      {activeImageIndex + 1} / {asset.images.length}
                    </div>
                  </div>
                  {asset.images.length > 1 && (
                    <div className="asset-details-thumbnails">
                      {asset.images.map((image, index) => (
                        <button
                          key={index}
                          className={`asset-details-thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                          onClick={() => handleImageChange(index)}
                        >
                          <img src={image} alt={`${asset.name} ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Asset Information */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">📋</span>
                  Asset Details
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-info-grid">
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Asset ID</span>
                    <span className="asset-details-info-value">{asset.id}</span>
                  </div>
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Listed Date</span>
                    <span className="asset-details-info-value">{asset.listedDate}</span>
                  </div>
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Location</span>
                    <span className="asset-details-info-value">{asset.location}</span>
                  </div>
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Condition</span>
                    <span className="asset-details-info-value">{asset.condition}</span>
                  </div>
                  <div className="asset-details-info-item asset-details-info-full">
                    <span className="asset-details-info-label">Description</span>
                    <span className="asset-details-info-value">{asset.description}</span>
                  </div>
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Reason for Selling</span>
                    <span className="asset-details-info-value">{asset.reasonForSelling}</span>
                  </div>
                  <div className="asset-details-info-item">
                    <span className="asset-details-info-label">Defects/Issues</span>
                    <span className="asset-details-info-value">{asset.defects}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">⚙️</span>
                  Specifications
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-specs-grid">
                  {Object.entries(asset.specifications).map(([key, value]) => (
                    <div key={key} className="asset-details-spec-item">
                      <span className="asset-details-spec-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span className="asset-details-spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Features */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">🔧</span>
                  Technical Features
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-features-list">
                  {asset.technicalSpecs.map((spec, index) => (
                    <div key={index} className="asset-details-feature-item">
                      <span className="asset-details-feature-check">✅</span>
                      <span className="asset-details-feature-text">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Included Items */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">📦</span>
                  What's Included
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-included-list">
                  {asset.includedItems.map((item, index) => (
                    <div key={index} className="asset-details-included-item">
                      <span className="asset-details-included-icon">📋</span>
                      <span className="asset-details-included-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="asset-details-sidebar">
            
            {/* Pricing Card */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">💰</span>
                  Pricing
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-price-display">
                  <div className="asset-details-current-price">
                    <span className="asset-details-price-amount">{asset.price}</span>
                    <span className="asset-details-price-currency">tokens</span>
                  </div>
                  {asset.originalPrice && asset.originalPrice > asset.price && (
                    <div className="asset-details-original-price">
                      <span className="asset-details-original-amount">{asset.originalPrice} tokens</span>
                      <span className="asset-details-savings">Save {asset.originalPrice - asset.price} tokens!</span>
                    </div>
                  )}
                </div>
                <div className="asset-details-price-info">
                  <div className="asset-details-price-row">
                    <span className="asset-details-price-label">Market Average:</span>
                    <span className="asset-details-price-value">850 tokens</span>
                  </div>
                  <div className="asset-details-price-status">
                    <span className="asset-details-status-badge asset-details-competitive">Competitively Priced</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">📊</span>
                  Performance
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-stats-grid">
                  <div className="asset-details-stat-item">
                    <span className="asset-details-stat-value">{asset.views}</span>
                    <span className="asset-details-stat-label">Total Views</span>
                  </div>
                  <div className="asset-details-stat-item">
                    <span className="asset-details-stat-value">{asset.likes}</span>
                    <span className="asset-details-stat-label">Interested</span>
                  </div>
                  <div className="asset-details-stat-item">
                    <span className="asset-details-stat-value">{asset.offers}</span>
                    <span className="asset-details-stat-label">Offers</span>
                  </div>
                  <div className="asset-details-stat-item">
                    <span className="asset-details-stat-value">12</span>
                    <span className="asset-details-stat-label">Today's Views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Offers */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">💬</span>
                  Recent Offers ({recentOffers.length})
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-offers-list">
                  {recentOffers.map((offer) => (
                    <div key={offer.id} className="asset-details-offer-item">
                      <div className="asset-details-offer-header">
                        <div className="asset-details-offer-user">
                          <span className="asset-details-offer-name">@{offer.buyerName}</span>
                          <span className="asset-details-offer-amount">{offer.amount} tokens</span>
                        </div>
                        <span className={`asset-details-offer-status asset-details-${offer.status}`}>
                          {offer.status}
                        </span>
                      </div>
                      <p className="asset-details-offer-message">{offer.message}</p>
                      <div className="asset-details-offer-footer">
                        <span className="asset-details-offer-time">{offer.timestamp}</span>
                        {offer.status === 'pending' && (
                          <div className="asset-details-offer-actions">
                            <button 
                              className="asset-details-offer-btn asset-details-accept"
                              onClick={() => handleOfferAction(offer.id, 'accept')}
                            >
                              Accept
                            </button>
                            <button 
                              className="asset-details-offer-btn asset-details-decline"
                              onClick={() => handleOfferAction(offer.id, 'decline')}
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {recentOffers.filter(o => o.status === 'pending').length === 0 && (
                  <div className="asset-details-no-offers">
                    <span className="asset-details-no-offers-icon">💭</span>
                    <span>No pending offers</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="asset-details-card">
              <div className="asset-details-card-header">
                <h2 className="asset-details-card-title">
                  <span className="asset-details-title-icon">🏷️</span>
                  Tags
                </h2>
              </div>
              <div className="asset-details-card-content">
                <div className="asset-details-tags">
                  {asset.tags.map((tag, index) => (
                    <span key={index} className="asset-details-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}