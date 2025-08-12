import { useState } from "react"
import "./add-new-asset.css"
import Navbar from './navbar';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ListAssetPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    purchaseDate: "",
    warranty: "",
    specifications: [""],
    includedItems: [""],
    images: [],
    serialNumber: "",
    defects: "",
    reason: "",
    location: "",
    dimensions: "",
    weight: "",
    color: "",
    yearManufactured: "",
    usageFrequency: "",
    modifications: "",
    repairHistory: "",
    certificationsIncluded: ""
  })

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [conditionDropdownOpen, setConditionDropdownOpen] = useState(false)
  const [warrantyDropdownOpen, setWarrantyDropdownOpen] = useState(false)
  const [usageDropdownOpen, setUsageDropdownOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const categories = [
    { value: "Electronics", label: "Electronics", icon: "📱" },
    { value: "Books", label: "Books", icon: "📚" },
    { value: "Music", label: "Music", icon: "🎵" },
    { value: "Sports", label: "Sports & Fitness", icon: "⚽" },
    { value: "Art", label: "Art & Collectibles", icon: "🎨" },
    { value: "Clothing", label: "Clothing & Fashion", icon: "👕" },
    { value: "Home", label: "Home & Garden", icon: "🏠" },
    { value: "Automotive", label: "Automotive", icon: "🚗" },
    { value: "Tools", label: "Tools & Equipment", icon: "🔧" },
    { value: "Jewelry", label: "Jewelry & Accessories", icon: "💍" },
    { value: "Other", label: "Other", icon: "📦" }
  ]

  const conditions = [
    { value: "New", label: "New", desc: "Never used, in original packaging" },
    { value: "Excellent", label: "Excellent", desc: "Like new, minimal signs of use" },
    { value: "Very Good", label: "Very Good", desc: "Light signs of use, fully functional" },
    { value: "Good", label: "Good", desc: "Normal wear, fully functional" },
    { value: "Fair", label: "Fair", desc: "Heavy wear but functional" },
    { value: "Poor", label: "Poor", desc: "Significant wear, may need repair" }
  ]

  const warrantyOptions = [
    { value: "None", label: "No warranty remaining" },
    { value: "1-6months", label: "1-6 months remaining" },
    { value: "6-12months", label: "6-12 months remaining" },
    { value: "1-2years", label: "1-2 years remaining" },
    { value: "2+years", label: "More than 2 years remaining" },
    { value: "Lifetime", label: "Lifetime warranty" }
  ]

  const usageFrequencyOptions = [
    { value: "Daily", label: "Daily use" },
    { value: "Weekly", label: "Weekly use" },
    { value: "Monthly", label: "Monthly use" },
    { value: "Occasionally", label: "Occasional use" },
    { value: "Rarely", label: "Rarely used" },
    { value: "Never", label: "Never used" }
  ]

  const sections = [
    { title: "Basic Info", icon: "📝" },
    { title: "Details", icon: "🔍" },
    { title: "Pricing", icon: "💰" },
    { title: "Photos", icon: "📷" },
    { title: "Review", icon: "✅" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Listing asset:", formData)
  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)]
      })
    }
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, ""]
    })
  }

  const removeSpecification = (index) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index)
    setFormData({ ...formData, specifications: newSpecs })
  }

  const updateSpecification = (index, value) => {
    const newSpecs = [...formData.specifications]
    newSpecs[index] = value
    setFormData({ ...formData, specifications: newSpecs })
  }

  const addIncludedItem = () => {
    setFormData({
      ...formData,
      includedItems: [...formData.includedItems, ""]
    })
  }

  const removeIncludedItem = (index) => {
    const newItems = formData.includedItems.filter((_, i) => i !== index)
    setFormData({ ...formData, includedItems: newItems })
  }

  const updateIncludedItem = (index, value) => {
    const newItems = [...formData.includedItems]
    newItems[index] = value
    setFormData({ ...formData, includedItems: newItems })
  }

  const handleDropdownSelect = (type, value) => {
    setFormData({ ...formData, [type]: value })
    setCategoryDropdownOpen(false)
    setConditionDropdownOpen(false)
    setWarrantyDropdownOpen(false)
    setUsageDropdownOpen(false)
  }

  const getDropdownLabel = (type) => {
    if (type === 'category') {
      const category = categories.find(cat => cat.value === formData.category)
      return category ? `${category.icon} ${category.label}` : "Select category"
    }
    if (type === 'condition') {
      const condition = conditions.find(cond => cond.value === formData.condition)
      return condition ? condition.label : "Select condition"
    }
    if (type === 'warranty') {
      const warranty = warrantyOptions.find(war => war.value === formData.warranty)
      return warranty ? warranty.label : "Select warranty status"
    }
    if (type === 'usageFrequency') {
      const usage = usageFrequencyOptions.find(usage => usage.value === formData.usageFrequency)
      return usage ? usage.label : "Select usage frequency"
    }
  }

  const getCompletionPercentage = () => {
    const requiredFields = ['name', 'description', 'category', 'condition', 'price']
    const completedRequired = requiredFields.filter(field => formData[field]).length
    const optionalCompleted = Object.keys(formData).filter(key => 
      !requiredFields.includes(key) && formData[key] && 
      (Array.isArray(formData[key]) ? formData[key].length > 0 : true)
    ).length
    return Math.round(((completedRequired + optionalCompleted * 0.5) / (requiredFields.length + 3)) * 100)
  }

  return (
    <div className="add-new-asset-container">
      <Navbar />

      <div className="add-new-asset-main-content">
        {/* Back Button */}
        <div className="add-new-asset-back-button-container">
          <Link href="/dashboard" className="add-new-asset-back-link">
            <span className="material-icons add-new-asset-back-icon">arrow_back</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Header with Progress */}
        <div className="add-new-asset-header">
          <div className="add-new-asset-header-content">
            <h1 className="add-new-asset-title">List New Asset</h1>
            <p className="add-new-asset-subtitle">Create a comprehensive asset listing for the blockchain marketplace</p>
          </div>
          <div className="add-new-asset-progress-section">
            <div className="add-new-asset-completion-ring">
              <svg className="add-new-asset-progress-ring" width="60" height="60">
                <circle
                  className="add-new-asset-progress-ring-bg"
                  cx="30"
                  cy="30"
                  r="25"
                />
                <circle
                  className="add-new-asset-progress-ring-fill"
                  cx="30"
                  cy="30"
                  r="25"
                  strokeDasharray={`${getCompletionPercentage() * 1.57} 157`}
                />
              </svg>
              <span className="add-new-asset-progress-text">{getCompletionPercentage()}%</span>
            </div>
            <div className="add-new-asset-progress-info">
              <span className="add-new-asset-progress-label">Completion</span>
              <span className="add-new-asset-progress-desc">Form Progress</span>
            </div>
          </div>
        </div>

        <div className="add-new-asset-form-card">
          <form onSubmit={handleSubmit} className="add-new-asset-form-container">
            
            {/* Basic Information Section */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="material-icons add-new-asset-section-icon">info_outline</span>
                  Basic Information
                </h3>
                <span className="add-new-asset-required-badge">Required Fields</span>
              </div>
              
              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label htmlFor="name" className="add-new-asset-input-label">
                    Asset Name <span className="add-new-asset-required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g., Professional DSLR Camera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="add-new-asset-form-input"
                    required
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="brand" className="add-new-asset-input-label">Brand/Manufacturer</label>
                  <input
                    id="brand"
                    type="text"
                    placeholder="e.g., Canon, Apple, Samsung"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>

              <div className="add-new-asset-form-grid-3">
                <div className="add-new-asset-input-group">
                  <label htmlFor="model" className="add-new-asset-input-label">Model/Version</label>
                  <input
                    id="model"
                    type="text"
                    placeholder="e.g., EOS 5D Mark IV"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="serialNumber" className="add-new-asset-input-label">Serial Number</label>
                  <input
                    id="serialNumber"
                    type="text"
                    placeholder="For authenticity verification"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="yearManufactured" className="add-new-asset-input-label">Year Manufactured</label>
                  <input
                    id="yearManufactured"
                    type="number"
                    min="1950"
                    max="2025"
                    placeholder="e.g., 2023"
                    value={formData.yearManufactured}
                    onChange={(e) => setFormData({ ...formData, yearManufactured: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>

              <div className="add-new-asset-input-group">
                <label htmlFor="description" className="add-new-asset-input-label">
                  Detailed Description <span className="add-new-asset-required">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Provide comprehensive information about your asset including features, usage history, any modifications, and why you're selling it..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="add-new-asset-form-textarea"
                  required
                />
                <div className="add-new-asset-char-count">
                  {formData.description.length}/500 characters
                </div>
              </div>
            </div>

            {/* Classification & Physical Details */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="material-icons add-new-asset-section-icon">category</span>
                  Classification & Physical Details
                </h3>
              </div>
              
              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label className="add-new-asset-input-label">
                    Category <span className="add-new-asset-required">*</span>
                  </label>
                  <div className="add-new-asset-dropdown-container">
                    <button 
                      type="button"
                      className="add-new-asset-dropdown-trigger"
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    >
                      <span>{getDropdownLabel('category')}</span>
                      <span className="add-new-asset-dropdown-arrow">▼</span>
                    </button>
                    {categoryDropdownOpen && (
                      <div className="add-new-asset-dropdown-content">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            className="add-new-asset-dropdown-item"
                            onClick={() => handleDropdownSelect('category', category.value)}
                          >
                            <span className="add-new-asset-dropdown-icon">{category.icon}</span>
                            {category.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="add-new-asset-input-group">
                  <label className="add-new-asset-input-label">
                    Condition <span className="add-new-asset-required">*</span>
                  </label>
                  <div className="add-new-asset-dropdown-container">
                    <button 
                      type="button"
                      className="add-new-asset-dropdown-trigger"
                      onClick={() => setConditionDropdownOpen(!conditionDropdownOpen)}
                    >
                      <span>{getDropdownLabel('condition')}</span>
                      <span className="add-new-asset-dropdown-arrow">▼</span>
                    </button>
                    {conditionDropdownOpen && (
                      <div className="add-new-asset-dropdown-content">
                        {conditions.map((condition) => (
                          <button
                            key={condition.value}
                            type="button"
                            className="add-new-asset-dropdown-item"
                            onClick={() => handleDropdownSelect('condition', condition.value)}
                          >
                            <div className="add-new-asset-condition-option">
                              <span className="add-new-asset-condition-label">{condition.label}</span>
                              <span className="add-new-asset-condition-desc">{condition.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="add-new-asset-form-grid-3">
                <div className="add-new-asset-input-group">
                  <label htmlFor="color" className="add-new-asset-input-label">Color</label>
                  <input
                    id="color"
                    type="text"
                    placeholder="e.g., Black, Silver, Blue"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="dimensions" className="add-new-asset-input-label">Dimensions</label>
                  <input
                    id="dimensions"
                    type="text"
                    placeholder="e.g., 15 x 10 x 5 cm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="weight" className="add-new-asset-input-label">Weight</label>
                  <input
                    id="weight"
                    type="text"
                    placeholder="e.g., 2.5 kg, 500g"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>

              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label className="add-new-asset-input-label">Usage Frequency</label>
                  <div className="add-new-asset-dropdown-container">
                    <button 
                      type="button"
                      className="add-new-asset-dropdown-trigger"
                      onClick={() => setUsageDropdownOpen(!usageDropdownOpen)}
                    >
                      <span>{getDropdownLabel('usageFrequency')}</span>
                      <span className="add-new-asset-dropdown-arrow">▼</span>
                    </button>
                    {usageDropdownOpen && (
                      <div className="add-new-asset-dropdown-content">
                        {usageFrequencyOptions.map((usage) => (
                          <button
                            key={usage.value}
                            type="button"
                            className="add-new-asset-dropdown-item"
                            onClick={() => handleDropdownSelect('usageFrequency', usage.value)}
                          >
                            {usage.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="location" className="add-new-asset-input-label">Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Purchase History */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="material-icons add-new-asset-section-icon">local_offer	</span>
                  Pricing & Purchase History
                </h3>
              </div>
              
              <div className="add-new-asset-form-grid-3">
                <div className="add-new-asset-input-group">
                  <label htmlFor="price" className="add-new-asset-input-label">
                    Selling Price (Tokens) <span className="add-new-asset-required">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="1"
                    placeholder="150"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="add-new-asset-form-input"
                    required
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="originalPrice" className="add-new-asset-input-label">Original Purchase Price</label>
                  <input
                    id="originalPrice"
                    type="number"
                    min="0"
                    placeholder="What you originally paid"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="purchaseDate" className="add-new-asset-input-label">Purchase Date</label>
                  <input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>

              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label className="add-new-asset-input-label">Warranty Status</label>
                  <div className="add-new-asset-dropdown-container">
                    <button 
                      type="button"
                      className="add-new-asset-dropdown-trigger"
                      onClick={() => setWarrantyDropdownOpen(!warrantyDropdownOpen)}
                    >
                      <span>{getDropdownLabel('warranty')}</span>
                      <span className="add-new-asset-dropdown-arrow">▼</span>
                    </button>
                    {warrantyDropdownOpen && (
                      <div className="add-new-asset-dropdown-content">
                        {warrantyOptions.map((warranty) => (
                          <button
                            key={warranty.value}
                            type="button"
                            className="add-new-asset-dropdown-item"
                            onClick={() => handleDropdownSelect('warranty', warranty.value)}
                          >
                            {warranty.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="reason" className="add-new-asset-input-label">Reason for Selling</label>
                  <input
                    id="reason"
                    type="text"
                    placeholder="e.g., Upgrading to newer model"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="add-new-asset-form-input"
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="material-icons add-new-asset-section-icon">settings</span>
                  Technical Specifications
                </h3>
              </div>
              
              <div className="add-new-asset-dynamic-list">
                <div className="add-new-asset-list-header">
                  <span className="add-new-asset-list-title">Add key specifications and features:</span>
                  <button type="button" className="add-new-asset-add-btn" onClick={addSpecification}>
                    <span className="add-new-asset-btn-icon">➕</span>
                    Add Specification
                  </button>
                </div>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="add-new-asset-list-item">
                    <input
                      type="text"
                      placeholder="e.g., 24.6MP Full Frame CMOS Sensor"
                      value={spec}
                      onChange={(e) => updateSpecification(index, e.target.value)}
                      className="add-new-asset-list-input"
                    />
                    {formData.specifications.length > 1 && (
                      <button
                        type="button"
                        className="add-new-asset-remove-btn"
                        onClick={() => removeSpecification(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="add-new-asset-section-icon">📦</span>
                  What's Included
                </h3>
              </div>
              
              <div className="add-new-asset-dynamic-list">
                <div className="add-new-asset-list-header">
                  <span className="add-new-asset-list-title">List all items included with the sale:</span>
                  <button type="button" className="add-new-asset-add-btn" onClick={addIncludedItem}>
                    <span className="add-new-asset-btn-icon">➕</span>
                    Add Item
                  </button>
                </div>
                {formData.includedItems.map((item, index) => (
                  <div key={index} className="add-new-asset-list-item">
                    <input
                      type="text"
                      placeholder="e.g., Original box, Charger, User manual"
                      value={item}
                      onChange={(e) => updateIncludedItem(index, e.target.value)}
                      className="add-new-asset-list-input"
                    />
                    {formData.includedItems.length > 1 && (
                      <button
                        type="button"
                        className="add-new-asset-remove-btn"
                        onClick={() => removeIncludedItem(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Condition Details & History */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="add-new-asset-section-icon">🔧</span>
                  Condition & History
                </h3>
              </div>
              
              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label htmlFor="modifications" className="add-new-asset-input-label">Modifications Made</label>
                  <textarea
                    id="modifications"
                    placeholder="Any modifications, upgrades, or customizations made to the original item..."
                    rows={3}
                    value={formData.modifications}
                    onChange={(e) => setFormData({ ...formData, modifications: e.target.value })}
                    className="add-new-asset-form-textarea"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="repairHistory" className="add-new-asset-input-label">Repair History</label>
                  <textarea
                    id="repairHistory"
                    placeholder="Any repairs, services, or maintenance performed..."
                    rows={3}
                    value={formData.repairHistory}
                    onChange={(e) => setFormData({ ...formData, repairHistory: e.target.value })}
                    className="add-new-asset-form-textarea"
                  />
                </div>
              </div>

              <div className="add-new-asset-form-grid-2">
                <div className="add-new-asset-input-group">
                  <label htmlFor="defects" className="add-new-asset-input-label">Known Issues or Defects</label>
                  <textarea
                    id="defects"
                    placeholder="List any scratches, dents, missing parts, functional issues, or other defects. Honesty builds trust with buyers."
                    rows={3}
                    value={formData.defects}
                    onChange={(e) => setFormData({ ...formData, defects: e.target.value })}
                    className="add-new-asset-form-textarea"
                  />
                </div>

                <div className="add-new-asset-input-group">
                  <label htmlFor="certificationsIncluded" className="add-new-asset-input-label">Certifications & Documents</label>
                  <textarea
                    id="certificationsIncluded"
                    placeholder="Any certificates, authenticity documents, receipts, or warranties included..."
                    rows={3}
                    value={formData.certificationsIncluded}
                    onChange={(e) => setFormData({ ...formData, certificationsIncluded: e.target.value })}
                    className="add-new-asset-form-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="add-new-asset-form-section">
              <div className="add-new-asset-section-header">
                <h3 className="add-new-asset-section-title">
                  <span className="material-icons add-new-asset-section-icon">image_search</span>
                  Photos & Media
                </h3>
              </div>
              
              <div className="add-new-asset-upload-section">
                <div className="add-new-asset-upload-area">
                  <div className="material-icons add-new-asset-upload-icon">camera_alt</div>
                  <p className="add-new-asset-upload-title">Upload high-quality images</p>
                  <p className="add-new-asset-upload-subtitle">Add multiple photos from different angles. First image will be the main photo.</p>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="add-new-asset-upload-input"
                  />
                  <button 
                    type="button" 
                    className="add-new-asset-upload-btn"
                    onClick={() => document.getElementById("images")?.click()}
                  >
                    <span className="material-icons add-new-asset-btn-icon">source</span>
                    Choose Images
                  </button>
                  <p className="add-new-asset-upload-info">PNG, JPG up to 10MB each, maximum 10 images</p>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="add-new-asset-image-preview">
                    <h4 className="add-new-asset-preview-title">Selected Images ({formData.images.length})</h4>
                    <div className="add-new-asset-preview-grid">
                      {formData.images.map((file, index) => (
                        <div key={index} className="add-new-asset-preview-item">
                          <div className="add-new-asset-preview-info">
                            <span className="add-new-asset-preview-name">{file.name}</span>
                            <span className="add-new-asset-preview-size">{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                          </div>
                          <button
                            type="button"
                            className="add-new-asset-preview-remove"
                            onClick={() => removeImage(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Blockchain Process Info */}
            <div className="add-new-asset-info-section">
              <div className="add-new-asset-info-header">
                <h3 className="add-new-asset-info-title">
                  <span className="add-new-asset-info-icon">🔗</span>
                  Blockchain Process
                </h3>
              </div>
              <div className="add-new-asset-info-steps">
                <div className="add-new-asset-step">
                  <span className="add-new-asset-step-number">1</span>
                  <div className="add-new-asset-step-content">
                    <span className="add-new-asset-step-title">Token Creation</span>
                    <span className="add-new-asset-step-text">ERC1155 asset token created with your asset details</span>
                  </div>
                </div>
                <div className="add-new-asset-step">
                  <span className="add-new-asset-step-number">2</span>
                  <div className="add-new-asset-step-content">
                    <span className="add-new-asset-step-title">Token Minting</span>
                    <span className="add-new-asset-step-text">Token minted to your wallet address</span>
                  </div>
                </div>
                <div className="add-new-asset-step">
                  <span className="add-new-asset-step-number">3</span>
                  <div className="add-new-asset-step-content">
                    <span className="add-new-asset-step-title">Marketplace Listing</span>
                    <span className="add-new-asset-step-text">Asset listed on the decentralized marketplace</span>
                  </div>
                </div>
                <div className="add-new-asset-step">
                  <span className="add-new-asset-step-number">4</span>
                  <div className="add-new-asset-step-content">
                    <span className="add-new-asset-step-title">Ownership Control</span>
                    <span className="add-new-asset-step-text">You retain ownership until purchase and transfer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="add-new-asset-submit-section">
              <button type="submit" className="add-new-asset-submit-btn">
                <span className="material-icons add-new-asset-btn-icon">add</span>
                Create Asset Token & List for Sale
              </button>
              <Link href="/dashboard" className="add-new-asset-cancel-btn">
                <span className="material-icons add-new-asset-back-icon">cancel</span>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
