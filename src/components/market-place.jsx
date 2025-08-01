import { useState } from "react"
import "./market-place.css"
import { Link } from "react-router-dom"
import Navbar from './navbar';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false)

  const [assets] = useState([
    {
      id: 1,
      name: "Professional DSLR Camera",
      description: "Canon EOS 5D Mark IV with lens kit",
      price: 800,
      category: "Electronics",
      seller: "0x1234...5678",
      image: "https://cdn.media.amplience.net/i/canon/eos_5d_mark_iv-beauty_1bd06bcadaee4833af6460c87898d249?$70-30-header-4by3-dt$",
      condition: "Excellent",
    },
    {
      id: 2,
      name: "Complete Book Series",
      description: "Harry Potter complete collection, hardcover",
      price: 120,
      category: "Books",
      seller: "0x9876...5432",
      image: "https://media.trekbikes.com/image/upload/w_1440,h_1080,c_pad,f_auto,fl_progressive:semi,q_auto/XCaliber8_23_35069_B_Portrait",
      condition: "Good",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      description: "ASUS ROG Strix, RTX 3070, 16GB RAM",
      price: 1200,
      category: "Electronics",
      seller: "0x5555...7777",
      image: "https://dlcdnwebimgs.asus.com/gain/9D1F9B8C-4A4C-4006-BEA1-E7E06F0D1B42/w717/h525",
      condition: "Very Good",
    },
    {
      id: 4,
      name: "Vintage Vinyl Records",
      description: "Collection of 50+ classic rock albums",
      price: 300,
      category: "Music",
      seller: "0x3333...9999",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
    },
    {
      id: 5,
      name: "Mountain Bike",
      description: "Trek X-Caliber 8, 29-inch wheels",
      price: 600,
      category: "Sports",
      seller: "0x7777...1111",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Very Good",
    },
    {
      id: 6,
      name: "Art Supplies Kit",
      description: "Professional watercolor and acrylic set",
      price: 85,
      category: "Art",
      seller: "0x2222...8888",
      image: "/placeholder.svg?height=200&width=300",
      condition: "New",
    },
  ])

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Books", label: "Books" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Art", label: "Art" },
  ]

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-100", label: "0 - 100 tokens" },
    { value: "100-500", label: "100 - 500 tokens" },
    { value: "500+", label: "500+ tokens" },
  ]

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "0-100" && asset.price <= 100) ||
      (priceRange === "100-500" && asset.price > 100 && asset.price <= 500) ||
      (priceRange === "500+" && asset.price > 500)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const handleCategorySelect = (value) => {
    setSelectedCategory(value)
    setCategoryDropdownOpen(false)
  }

  const handlePriceSelect = (value) => {
    setPriceRange(value)
    setPriceDropdownOpen(false)
  }

  const getCategoryLabel = () => {
    const category = categories.find(cat => cat.value === selectedCategory)
    return category ? category.label : "Category"
  }

  const getPriceLabel = () => {
    const price = priceRanges.find(range => range.value === priceRange)
    return price ? price.label : "Price Range"
  }

  return (
    <div className="marketplace-container">
      {/* Navigation */}
      <Navbar/>

      <div className="marketplace-main-content">
        {/* Header */}
        <div className="marketplace-header">
          <h1 className="marketplace-title">Asset Marketplace</h1>
          <p className="marketplace-subtitle">Discover and buy unique verified assets on the blockchain</p>
        </div>

        {/* Filters */}
        <div className="marketplace-filters-container">
          <div className="marketplace-filters-grid">
            <div className="marketplace-search-container">
              <span className="marketplace-search-icon">🔍</span>
              <input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="marketplace-search-input"
              />
            </div>

            <div className="marketplace-dropdown-container">
              <button 
                className="marketplace-dropdown-trigger"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span>{getCategoryLabel()}</span>
                <span className="marketplace-dropdown-arrow">▼</span>
              </button>
              {categoryDropdownOpen && (
                <div className="marketplace-dropdown-content">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className="marketplace-dropdown-item"
                      onClick={() => handleCategorySelect(category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="marketplace-dropdown-container">
              <button 
                className="marketplace-dropdown-trigger"
                onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
              >
                <span>{getPriceLabel()}</span>
                <span className="marketplace-dropdown-arrow">▼</span>
              </button>
              {priceDropdownOpen && (
                <div className="marketplace-dropdown-content">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      className="marketplace-dropdown-item"
                      onClick={() => handlePriceSelect(range.value)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="marketplace-filter-btn">
              <span className="marketplace-btn-icon">🔧</span>
              More Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="marketplace-results-count">
          <p className="marketplace-count-text">
            Showing <strong>{filteredAssets.length}</strong> of <strong>{assets.length}</strong> assets
          </p>
        </div>

        {/* Asset Grid */}
        <div className="marketplace-assets-grid">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="marketplace-asset-card">
              <div className="marketplace-asset-image-container">
                <img
                  src={asset.image || "/placeholder.svg"}
                  alt={asset.name}
                  className="marketplace-asset-image"
                />
                <div className="marketplace-condition-overlay">
                  <span className="marketplace-condition-badge">{asset.condition}</span>
                </div>
              </div>
              <div className="marketplace-asset-content">
                <div className="marketplace-asset-header">
                  <h3 className="marketplace-asset-title">{asset.name}</h3>
                  <span className="marketplace-category-badge">{asset.category}</span>
                </div>
                <p className="marketplace-asset-description">{asset.description}</p>

                <div className="marketplace-seller-info">
                  <span className="marketplace-seller-icon">👤</span>
                  <span className="marketplace-seller-text">Seller: {asset.seller}</span>
                </div>

                <div className="marketplace-price-row">
                  <span className="marketplace-asset-price">{asset.price} tokens</span>
                </div>

                <div className="marketplace-asset-actions">
                  <Link to={`/asset/${asset.id}`} className="marketplace-view-btn">
                    <span className="marketplace-btn-icon">👁</span>
                    View Details
                  </Link>
                  <button className="marketplace-buy-btn">
                    <span className="marketplace-btn-icon">🛒</span>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="marketplace-no-results">
            <div className="marketplace-no-results-icon">📭</div>
            <h3 className="marketplace-no-results-title">No assets found</h3>
            <p className="marketplace-no-results-subtitle">Try adjusting your filters or search terms to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  )
}
