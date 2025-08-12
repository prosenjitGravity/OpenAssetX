import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './edit-asset-details.css';
import Navbar from './navbar';

export default function EditAssetPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Basic Information
    name: 'Professional DSLR Camera Canon EOS 5D Mark IV',
    description: 'High-performance full-frame DSLR camera in excellent condition. Perfect for professional photography and serious enthusiasts. Comes with original packaging and all accessories.',
    category: 'Electronics',
    subcategory: 'Cameras',
    condition: 'Excellent',
    
    // Pricing
    price: 800,
    originalPrice: 1200,
    currency: 'tokens',
    priceNegotiable: true,
    
    // Location & Shipping
    location: 'New York, USA',
    shippingOptions: ['local-pickup', 'insured-shipping'],
    shippingCost: 25,
    
    // Asset Details
    reasonForSelling: 'Upgrading to mirrorless system',
    defects: 'Minor scratches on LCD screen, fully functional',
    warranty: '6 months seller warranty',
    
    // Specifications
    specifications: {
      brand: 'Canon',
      model: 'EOS 5D Mark IV',
      year: '2021',
      serialNumber: 'C5D4-123456789',
      color: 'Black',
      dimensions: '15.1 x 11.6 x 7.6 cm',
      weight: '800g'
    },
    
    // Images
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600'
    ],
    
    // Included Items
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
    
    // Technical Features
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
    
    // Tags
    tags: ['professional', 'photography', 'canon', 'dslr', 'full-frame']
  });

  const categories = [
    'Electronics', 'Books', 'Clothing', 'Home & Garden', 
    'Sports', 'Automotive', 'Art & Collectibles', 'Music'
  ];

  const conditions = [
    'Brand New', 'Like New', 'Excellent', 'Good', 'Fair'
  ];

  const currencies = [
    { value: 'tokens', label: 'Money Tokens' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'matic', label: 'Polygon (MATIC)' }
  ];

  const steps = [
    { id: 1, title: 'Basic Info', icon: '📋' },
    { id: 2, title: 'Details & Specs', icon: '⚙️' },
    { id: 3, title: 'Images & Media', icon: '📸' },
    { id: 4, title: 'Pricing & Review', icon: '💰' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleArrayAdd = (field, value) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()]
      });
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // In real app, upload to server and get URLs
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages].slice(0, 8) // Max 8 images
    });
  };

  const handleImageRemove = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Asset name is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.condition) newErrors.condition = "Condition is required";
    }

    if (step === 2) {
      if (!formData.specifications.brand.trim()) newErrors['specifications.brand'] = "Brand is required";
      if (!formData.specifications.model.trim()) newErrors['specifications.model'] = "Model is required";
    }

    if (step === 3) {
      if (formData.images.length === 0) newErrors.images = "At least one image is required";
    }

    if (step === 4) {
      if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = async (action = 'save') => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${action} asset:`, formData);
      setIsSubmitting(false);
      
      if (action === 'publish') {
        alert('Asset updated and published successfully!');
      } else {
        alert('Asset saved as draft!');
      }
      
      navigate(`/my-assets/${assetId}`);
    }, 2000);
  };

  const getStepProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    <div className="edit-asset-container">
      <Navbar />

      <div className="edit-asset-main-content">
        {/* Back Button */}
        <div className="edit-asset-back-button-container">
          <button 
            onClick={() => navigate(`/my-assets/${assetId}`)}
            className="edit-asset-back-link"
          >
            <span className="edit-asset-back-icon">←</span>
            Back to Asset Details
          </button>
        </div>

        {/* Header */}
        <div className="edit-asset-header">
          <div className="edit-asset-header-content">
            <div className="edit-asset-title-section">
              <h1 className="edit-asset-title">Edit Asset</h1>
              <p className="edit-asset-subtitle">Update your asset information and specifications</p>
            </div>
            <div className="edit-asset-header-actions">
              <button 
                className="edit-asset-btn edit-asset-btn-secondary"
                onClick={() => handleSave('draft')}
                disabled={isSubmitting}
              >
                <span className="edit-asset-btn-icon">💾</span>
                Save Draft
              </button>
              <button 
                className="edit-asset-btn edit-asset-btn-primary"
                onClick={() => handleSave('publish')}
                disabled={isSubmitting}
              >
                <span className="edit-asset-btn-icon">🚀</span>
                {isSubmitting ? 'Updating...' : 'Update & Publish'}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="edit-asset-progress">
          <div className="edit-asset-progress-bar">
            <div 
              className="edit-asset-progress-fill"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
          <div className="edit-asset-steps-indicator">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`edit-asset-step-item ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}
              >
                <div className="edit-asset-step-circle">
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span className="edit-asset-step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="edit-asset-form-container">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="edit-asset-step-content">
              <div className="edit-asset-card">
                <div className="edit-asset-card-header">
                  <h2 className="edit-asset-card-title">
                    <span className="edit-asset-title-icon">📋</span>
                    Basic Information
                  </h2>
                </div>
                <div className="edit-asset-card-content">
                  <div className="edit-asset-form-grid">
                    <div className="edit-asset-form-group edit-asset-form-group-full">
                      <label className="edit-asset-form-label">
                        Asset Name <span className="edit-asset-required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`edit-asset-form-input ${errors.name ? 'edit-asset-form-input-error' : ''}`}
                        placeholder="Enter a descriptive name for your asset"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      {errors.name && <span className="edit-asset-error-message">{errors.name}</span>}
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">
                        Category <span className="edit-asset-required">*</span>
                      </label>
                      <select
                        className={`edit-asset-form-select ${errors.category ? 'edit-asset-form-input-error' : ''}`}
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && <span className="edit-asset-error-message">{errors.category}</span>}
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">
                        Condition <span className="edit-asset-required">*</span>
                      </label>
                      <select
                        className={`edit-asset-form-select ${errors.condition ? 'edit-asset-form-input-error' : ''}`}
                        value={formData.condition}
                        onChange={(e) => handleInputChange('condition', e.target.value)}
                      >
                        <option value="">Select condition</option>
                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                      {errors.condition && <span className="edit-asset-error-message">{errors.condition}</span>}
                    </div>

                    <div className="edit-asset-form-group edit-asset-form-group-full">
                      <label className="edit-asset-form-label">
                        Description <span className="edit-asset-required">*</span>
                      </label>
                      <textarea
                        className={`edit-asset-form-textarea ${errors.description ? 'edit-asset-form-input-error' : ''}`}
                        placeholder="Provide a detailed description of your asset"
                        rows="5"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      {errors.description && <span className="edit-asset-error-message">{errors.description}</span>}
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Location</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="City, State/Country"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Reason for Selling</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="Why are you selling this item?"
                        value={formData.reasonForSelling}
                        onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group edit-asset-form-group-full">
                      <label className="edit-asset-form-label">Known Defects or Issues</label>
                      <textarea
                        className="edit-asset-form-textarea"
                        placeholder="List any defects, damages, or issues (be transparent)"
                        rows="3"
                        value={formData.defects}
                        onChange={(e) => handleInputChange('defects', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details & Specifications */}
          {currentStep === 2 && (
            <div className="edit-asset-step-content">
              <div className="edit-asset-card">
                <div className="edit-asset-card-header">
                  <h2 className="edit-asset-card-title">
                    <span className="edit-asset-title-icon">⚙️</span>
                    Specifications
                  </h2>
                </div>
                <div className="edit-asset-card-content">
                  <div className="edit-asset-form-grid">
                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">
                        Brand <span className="edit-asset-required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`edit-asset-form-input ${errors['specifications.brand'] ? 'edit-asset-form-input-error' : ''}`}
                        placeholder="e.g., Apple, Samsung, Canon"
                        value={formData.specifications.brand}
                        onChange={(e) => handleInputChange('specifications.brand', e.target.value)}
                      />
                      {errors['specifications.brand'] && <span className="edit-asset-error-message">{errors['specifications.brand']}</span>}
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">
                        Model <span className="edit-asset-required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`edit-asset-form-input ${errors['specifications.model'] ? 'edit-asset-form-input-error' : ''}`}
                        placeholder="e.g., iPhone 13, Galaxy S21"
                        value={formData.specifications.model}
                        onChange={(e) => handleInputChange('specifications.model', e.target.value)}
                      />
                      {errors['specifications.model'] && <span className="edit-asset-error-message">{errors['specifications.model']}</span>}
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Year/Age</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="e.g., 2021, 2 years old"
                        value={formData.specifications.year}
                        onChange={(e) => handleInputChange('specifications.year', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Color</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="e.g., Black, White, Silver"
                        value={formData.specifications.color}
                        onChange={(e) => handleInputChange('specifications.color', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Serial Number</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="Device serial number"
                        value={formData.specifications.serialNumber}
                        onChange={(e) => handleInputChange('specifications.serialNumber', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Warranty</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="e.g., 1 year manufacturer warranty"
                        value={formData.warranty}
                        onChange={(e) => handleInputChange('warranty', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Dimensions</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="e.g., 15.1 x 11.6 x 7.6 cm"
                        value={formData.specifications.dimensions}
                        onChange={(e) => handleInputChange('specifications.dimensions', e.target.value)}
                      />
                    </div>

                    <div className="edit-asset-form-group">
                      <label className="edit-asset-form-label">Weight</label>
                      <input
                        type="text"
                        className="edit-asset-form-input"
                        placeholder="e.g., 800g, 2.5lbs"
                        value={formData.specifications.weight}
                        onChange={(e) => handleInputChange('specifications.weight', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Features & Included Items */}
              <div className="edit-asset-cards-row">
                <div className="edit-asset-card">
                  <div className="edit-asset-card-header">
                    <h3 className="edit-asset-card-title">
                      <span className="edit-asset-title-icon">🔧</span>
                      Technical Features
                    </h3>
                  </div>
                  <div className="edit-asset-card-content">
                    <div className="edit-asset-items-list">
                      {formData.technicalSpecs.map((spec, index) => (
                        <div key={index} className="edit-asset-item">
                          <input
                            type="text"
                            className="edit-asset-item-input"
                            value={spec}
                            onChange={(e) => {
                              const newSpecs = [...formData.technicalSpecs];
                              newSpecs[index] = e.target.value;
                              setFormData({ ...formData, technicalSpecs: newSpecs });
                            }}
                          />
                          <button
                            type="button"
                            className="edit-asset-remove-btn"
                            onClick={() => handleArrayRemove('technicalSpecs', index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <div className="edit-asset-add-item">
                        <input
                          type="text"
                          className="edit-asset-add-input"
                          placeholder="Add technical feature..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('technicalSpecs', e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="edit-asset-add-btn"
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleArrayAdd('technicalSpecs', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edit-asset-card">
                  <div className="edit-asset-card-header">
                    <h3 className="edit-asset-card-title">
                      <span className="edit-asset-title-icon">📦</span>
                      Included Items
                    </h3>
                  </div>
                  <div className="edit-asset-card-content">
                    <div className="edit-asset-items-list">
                      {formData.includedItems.map((item, index) => (
                        <div key={index} className="edit-asset-item">
                          <input
                            type="text"
                            className="edit-asset-item-input"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...formData.includedItems];
                              newItems[index] = e.target.value;
                              setFormData({ ...formData, includedItems: newItems });
                            }}
                          />
                          <button
                            type="button"
                            className="edit-asset-remove-btn"
                            onClick={() => handleArrayRemove('includedItems', index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <div className="edit-asset-add-item">
                        <input
                          type="text"
                          className="edit-asset-add-input"
                          placeholder="Add included item..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('includedItems', e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="edit-asset-add-btn"
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleArrayAdd('includedItems', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {currentStep === 3 && (
            <div className="edit-asset-step-content">
              <div className="edit-asset-card">
                <div className="edit-asset-card-header">
                  <h2 className="edit-asset-card-title">
                    <span className="edit-asset-title-icon">📸</span>
                    Asset Images
                  </h2>
                </div>
                <div className="edit-asset-card-content">
                  <div className="edit-asset-upload-section">
                    <div className="edit-asset-upload-area">
                      <input
                        type="file"
                        id="imageUpload"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="edit-asset-upload-input"
                      />
                      <label htmlFor="imageUpload" className="edit-asset-upload-label">
                        <span className="edit-asset-upload-icon">📁</span>
                        <span className="edit-asset-upload-text">
                          Click to upload images or drag and drop
                        </span>
                        <span className="edit-asset-upload-hint">
                          PNG, JPG up to 5MB each (Max 8 images)
                        </span>
                      </label>
                    </div>

                    {errors.images && <span className="edit-asset-error-message">{errors.images}</span>}

                    {formData.images.length > 0 && (
                      <div className="edit-asset-images-grid">
                        {formData.images.map((image, index) => (
                          <div key={index} className="edit-asset-image-item">
                            <img src={image} alt={`Asset ${index + 1}`} className="edit-asset-preview-image" />
                            <button
                              type="button"
                              className="edit-asset-image-remove"
                              onClick={() => handleImageRemove(index)}
                            >
                              ✕
                            </button>
                            {index === 0 && (
                              <span className="edit-asset-primary-badge">Primary</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="edit-asset-image-tips">
                      <h4 className="edit-asset-tips-title">📝 Photo Tips</h4>
                      <ul className="edit-asset-tips-list">
                        <li>Use good lighting and take clear, high-resolution photos</li>
                        <li>Show different angles and any defects honestly</li>
                        <li>First image will be used as the primary thumbnail</li>
                        <li>Include photos of serial numbers, accessories, and packaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing & Review */}
          {currentStep === 4 && (
            <div className="edit-asset-step-content">
              <div className="edit-asset-cards-row">
                <div className="edit-asset-card">
                  <div className="edit-asset-card-header">
                    <h2 className="edit-asset-card-title">
                      <span className="edit-asset-title-icon">💰</span>
                      Pricing & Options
                    </h2>
                  </div>
                  <div className="edit-asset-card-content">
                    <div className="edit-asset-pricing-grid">
                      <div className="edit-asset-form-group">
                        <label className="edit-asset-form-label">
                          Price <span className="edit-asset-required">*</span>
                        </label>
                        <div className="edit-asset-price-input-group">
                          <input
                            type="number"
                            className={`edit-asset-form-input ${errors.price ? 'edit-asset-form-input-error' : ''}`}
                            placeholder="0"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                          />
                          <select
                            className="edit-asset-currency-select"
                            value={formData.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                          >
                            {currencies.map((currency) => (
                              <option key={currency.value} value={currency.value}>
                                {currency.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.price && <span className="edit-asset-error-message">{errors.price}</span>}
                      </div>

                      <div className="edit-asset-form-group">
                        <label className="edit-asset-form-label">Original Price (Optional)</label>
                        <input
                          type="number"
                          className="edit-asset-form-input"
                          placeholder="Original purchase price"
                          value={formData.originalPrice}
                          onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value))}
                        />
                      </div>

                      <div className="edit-asset-checkbox-group">
                        <label className="edit-asset-checkbox-container">
                          <input
                            type="checkbox"
                            className="edit-asset-checkbox-input"
                            checked={formData.priceNegotiable}
                            onChange={(e) => handleInputChange('priceNegotiable', e.target.checked)}
                          />
                          <span className="edit-asset-checkbox-custom"></span>
                          <span className="edit-asset-checkbox-text">Price is negotiable</span>
                        </label>
                      </div>

                      <div className="edit-asset-form-group edit-asset-form-group-full">
                        <label className="edit-asset-form-label">Shipping Options</label>
                        <div className="edit-asset-checkbox-group">
                          <label className="edit-asset-checkbox-container">
                            <input
                              type="checkbox"
                              className="edit-asset-checkbox-input"
                              checked={formData.shippingOptions.includes('local-pickup')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    shippingOptions: [...formData.shippingOptions, 'local-pickup']
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    shippingOptions: formData.shippingOptions.filter(opt => opt !== 'local-pickup')
                                  });
                                }
                              }}
                            />
                            <span className="edit-asset-checkbox-custom"></span>
                            <span className="edit-asset-checkbox-text">Local pickup available</span>
                          </label>
                        </div>
                        <div className="edit-asset-checkbox-group">
                          <label className="edit-asset-checkbox-container">
                            <input
                              type="checkbox"
                              className="edit-asset-checkbox-input"
                              checked={formData.shippingOptions.includes('insured-shipping')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    shippingOptions: [...formData.shippingOptions, 'insured-shipping']
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    shippingOptions: formData.shippingOptions.filter(opt => opt !== 'insured-shipping')
                                  });
                                }
                              }}
                            />
                            <span className="edit-asset-checkbox-custom"></span>
                            <span className="edit-asset-checkbox-text">Insured shipping available</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edit-asset-card">
                  <div className="edit-asset-card-header">
                    <h3 className="edit-asset-card-title">
                      <span className="edit-asset-title-icon">🏷️</span>
                      Tags
                    </h3>
                  </div>
                  <div className="edit-asset-card-content">
                    <div className="edit-asset-tags-section">
                      <div className="edit-asset-current-tags">
                        {formData.tags.map((tag, index) => (
                          <span key={index} className="edit-asset-tag">
                            #{tag}
                            <button
                              type="button"
                              className="edit-asset-tag-remove"
                              onClick={() => handleArrayRemove('tags', index)}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="edit-asset-add-tag">
                        <input
                          type="text"
                          className="edit-asset-tag-input"
                          placeholder="Add tag..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('tags', e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="edit-asset-add-btn"
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            handleArrayAdd('tags', input.value);
                            input.value = '';
                          }}
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Summary */}
              <div className="edit-asset-card">
                <div className="edit-asset-card-header">
                  <h3 className="edit-asset-card-title">
                    <span className="edit-asset-title-icon">👁️</span>
                    Preview Summary
                  </h3>
                </div>
                <div className="edit-asset-card-content">
                  <div className="edit-asset-preview">
                    <div className="edit-asset-preview-header">
                      <h4 className="edit-asset-preview-title">{formData.name}</h4>
                      <div className="edit-asset-preview-price">
                        {formData.price} {formData.currency}
                        {formData.priceNegotiable && <span className="edit-asset-negotiable"> (Negotiable)</span>}
                      </div>
                    </div>
                    <div className="edit-asset-preview-meta">
                      <span className="edit-asset-preview-condition">{formData.condition}</span>
                      <span className="edit-asset-preview-category">{formData.category}</span>
                      <span className="edit-asset-preview-location">{formData.location}</span>
                    </div>
                    <p className="edit-asset-preview-description">{formData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="edit-asset-form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="edit-asset-btn edit-asset-btn-secondary"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                <span className="edit-asset-btn-icon">←</span>
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                className="edit-asset-btn edit-asset-btn-primary"
                onClick={handleNext}
              >
                Next
                <span className="edit-asset-btn-icon">→</span>
              </button>
            ) : (
              <div className="edit-asset-final-actions">
                <button
                  type="button"
                  className="edit-asset-btn edit-asset-btn-secondary"
                  onClick={() => handleSave('draft')}
                  disabled={isSubmitting}
                >
                  <span className="edit-asset-btn-icon">💾</span>
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="edit-asset-btn edit-asset-btn-primary"
                  onClick={() => handleSave('publish')}
                  disabled={isSubmitting}
                >
                  <span className="edit-asset-btn-icon">🚀</span>
                  {isSubmitting ? 'Updating...' : 'Update & Publish'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
