import { useState } from "react"
import "./add-new-asset.css"

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
    reason: ""
  })

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [conditionDropdownOpen, setConditionDropdownOpen] = useState(false)
  const [warrantyDropdownOpen, setWarrantyDropdownOpen] = useState(false)

  const categories = [
    { value: "Electronics", label: "Electronics" },
    { value: "Books", label: "Books" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Art", label: "Art" },
    { value: "Clothing", label: "Clothing" },
    { value: "Home", label: "Home & Garden" },
    { value: "Automotive", label: "Automotive" },
    { value: "Tools", label: "Tools & Equipment" },
    { value: "Jewelry", label: "Jewelry & Accessories" },
    { value: "Other", label: "Other" }
  ]

  const conditions = [
    { value: "New", label: "New - Never used, in original packaging" },
    { value: "Excellent", label: "Excellent - Like new, minimal signs of use" },
    { value: "Very Good", label: "Very Good - Light signs of use, fully functional" },
    { value: "Good", label: "Good - Normal wear, fully functional" },
    { value: "Fair", label: "Fair - Heavy wear but functional" },
    { value: "Poor", label: "Poor - Significant wear, may need repair" }
  ]

  const warrantyOptions = [
    { value: "None", label: "No warranty remaining" },
    { value: "1-6months", label: "1-6 months remaining" },
    { value: "6-12months", label: "6-12 months remaining" },
    { value: "1-2years", label: "1-2 years remaining" },
    { value: "2+years", label: "More than 2 years remaining" },
    { value: "Lifetime", label: "Lifetime warranty" }
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
    if (type === 'category') setCategoryDropdownOpen(false)
    if (type === 'condition') setConditionDropdownOpen(false)
    if (type === 'warranty') setWarrantyDropdownOpen(false)
  }

  const getDropdownLabel = (type) => {
    if (type === 'category') {
      const category = categories.find(cat => cat.value === formData.category)
      return category ? category.label : "Select category"
    }
    if (type === 'condition') {
      const condition = conditions.find(cond => cond.value === formData.condition)
      return condition ? condition.label : "Select condition"
    }
    if (type === 'warranty') {
      const warranty = warrantyOptions.find(war => war.value === formData.warranty)
      return warranty ? warranty.label : "Select warranty status"
    }
  }

  return (
    <div className="list-asset-container">
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
          <a href="/dashboard" className="back-link">
            <span className="back-icon">←</span>
            Back to Dashboard
          </a>
        </div>

        {/* Header */}
        <div className="header">
          <h1 className="title">List New Asset</h1>
          <p className="subtitle">Create a professional asset listing with detailed information</p>
        </div>

        <div className="form-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="title-icon">➕</span>
              Asset Details
            </h2>
            <p className="card-description">Provide comprehensive information about the asset you want to sell</p>
          </div>
          
          <div className="card-content">
            <form onSubmit={handleSubmit} className="form-container">
              
              {/* Basic Information Section */}
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                <div className="form-grid-2">
                  <div className="input-group">
                    <label htmlFor="name" className="input-label">Asset Name *</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g., Professional DSLR Camera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="brand" className="input-label">Brand/Manufacturer</label>
                    <input
                      id="brand"
                      type="text"
                      placeholder="e.g., Canon, Apple, Samsung"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="input-group">
                    <label htmlFor="model" className="input-label">Model/Version</label>
                    <input
                      id="model"
                      type="text"
                      placeholder="e.g., EOS 5D Mark IV, iPhone 13 Pro"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="serialNumber" className="input-label">Serial Number</label>
                    <input
                      id="serialNumber"
                      type="text"
                      placeholder="Optional - for authenticity verification"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="description" className="input-label">Detailed Description *</label>
                  <textarea
                    id="description"
                    placeholder="Provide comprehensive information about your asset including features, usage history, any modifications, and why you're selling it..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-textarea"
                    required
                  />
                </div>
              </div>

              {/* Category and Condition Section */}
              <div className="form-section">
                <h3 className="section-title">Classification</h3>
                <div className="form-grid-2">
                  <div className="input-group">
                    <label className="input-label">Category *</label>
                    <div className="dropdown-container">
                      <button 
                        type="button"
                        className="dropdown-trigger"
                        onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      >
                        <span>{getDropdownLabel('category')}</span>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      {categoryDropdownOpen && (
                        <div className="dropdown-content">
                          {categories.map((category) => (
                            <button
                              key={category.value}
                              type="button"
                              className="dropdown-item"
                              onClick={() => handleDropdownSelect('category', category.value)}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Condition *</label>
                    <div className="dropdown-container">
                      <button 
                        type="button"
                        className="dropdown-trigger"
                        onClick={() => setConditionDropdownOpen(!conditionDropdownOpen)}
                      >
                        <span>{getDropdownLabel('condition')}</span>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      {conditionDropdownOpen && (
                        <div className="dropdown-content">
                          {conditions.map((condition) => (
                            <button
                              key={condition.value}
                              type="button"
                              className="dropdown-item"
                              onClick={() => handleDropdownSelect('condition', condition.value)}
                            >
                              {condition.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing and Purchase History */}
              <div className="form-section">
                <h3 className="section-title">Pricing & Purchase History</h3>
                <div className="form-grid-3">
                  <div className="input-group">
                    <label htmlFor="price" className="input-label">Selling Price (Tokens) *</label>
                    <input
                      id="price"
                      type="number"
                      min="1"
                      placeholder="e.g., 150"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="originalPrice" className="input-label">Original Purchase Price</label>
                    <input
                      id="originalPrice"
                      type="number"
                      min="0"
                      placeholder="What you originally paid"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="purchaseDate" className="input-label">Purchase Date</label>
                    <input
                      id="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Warranty Status</label>
                  <div className="dropdown-container">
                    <button 
                      type="button"
                      className="dropdown-trigger"
                      onClick={() => setWarrantyDropdownOpen(!warrantyDropdownOpen)}
                    >
                      <span>{getDropdownLabel('warranty')}</span>
                      <span className="dropdown-arrow">▼</span>
                    </button>
                    {warrantyDropdownOpen && (
                      <div className="dropdown-content">
                        {warrantyOptions.map((warranty) => (
                          <button
                            key={warranty.value}
                            type="button"
                            className="dropdown-item"
                            onClick={() => handleDropdownSelect('warranty', warranty.value)}
                          >
                            {warranty.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="reason" className="input-label">Reason for Selling</label>
                  <input
                    id="reason"
                    type="text"
                    placeholder="e.g., Upgrading to newer model, No longer needed"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="form-section">
                <h3 className="section-title">Technical Specifications</h3>
                <div className="dynamic-list">
                  <div className="list-header">
                    <span className="list-title">Add key specifications and features:</span>
                    <button type="button" className="add-btn" onClick={addSpecification}>
                      <span className="btn-icon">➕</span>
                      Add Spec
                    </button>
                  </div>
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="list-item">
                      <input
                        type="text"
                        placeholder="e.g., 24.6MP Full Frame CMOS Sensor"
                        value={spec}
                        onChange={(e) => updateSpecification(index, e.target.value)}
                        className="list-input"
                      />
                      {formData.specifications.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeSpecification(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Items */}
              <div className="form-section">
                <h3 className="section-title">What's Included</h3>
                <div className="dynamic-list">
                  <div className="list-header">
                    <span className="list-title">List all items included with the sale:</span>
                    <button type="button" className="add-btn" onClick={addIncludedItem}>
                      <span className="btn-icon">➕</span>
                      Add Item
                    </button>
                  </div>
                  {formData.includedItems.map((item, index) => (
                    <div key={index} className="list-item">
                      <input
                        type="text"
                        placeholder="e.g., Original box, Charger, User manual"
                        value={item}
                        onChange={(e) => updateIncludedItem(index, e.target.value)}
                        className="list-input"
                      />
                      {formData.includedItems.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeIncludedItem(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Defects and Issues */}
              <div className="form-section">
                <h3 className="section-title">Condition Details</h3>
                <div className="input-group">
                  <label htmlFor="defects" className="input-label">Known Issues or Defects</label>
                  <textarea
                    id="defects"
                    placeholder="List any scratches, dents, missing parts, functional issues, or other defects. Being honest builds trust with buyers."
                    rows={3}
                    value={formData.defects}
                    onChange={(e) => setFormData({ ...formData, defects: e.target.value })}
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-section">
                <h3 className="section-title">Photos</h3>
                <div className="upload-section">
                  <div className="upload-area">
                    <div className="upload-icon">📷</div>
                    <p className="upload-title">Upload high-quality images</p>
                    <p className="upload-subtitle">Add multiple photos from different angles. First image will be the main photo.</p>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="upload-input"
                    />
                    <button 
                      type="button" 
                      className="upload-btn"
                      onClick={() => document.getElementById("images")?.click()}
                    >
                      Choose Images
                    </button>
                    <p className="upload-info">PNG, JPG up to 10MB each, maximum 10 images</p>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="image-preview">
                      <h4 className="preview-title">Selected Images ({formData.images.length})</h4>
                      <div className="preview-grid">
                        {formData.images.map((file, index) => (
                          <div key={index} className="preview-item">
                            <div className="preview-info">
                              <span className="preview-name">{file.name}</span>
                              <span className="preview-size">{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                            </div>
                            <button
                              type="button"
                              className="preview-remove"
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

              {/* Smart Contract Info */}
              <div className="info-section">
                <h3 className="info-title">🔗 Blockchain Process</h3>
                <div className="info-steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <span className="step-text">ERC1155 asset token will be created with your asset details</span>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <span className="step-text">Token will be minted to your wallet address</span>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <span className="step-text">Asset will be listed on the decentralized marketplace</span>
                  </div>
                  <div className="step">
                    <span className="step-number">4</span>
                    <span className="step-text">You retain ownership until purchase and transfer</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="submit-section">
                <button type="submit" className="submit-btn">
                  <span className="btn-icon">🚀</span>
                  Create Asset Token & List for Sale
                </button>
                <a href="/dashboard">
                  <button type="button" className="cancel-btn">
                    Cancel
                  </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
