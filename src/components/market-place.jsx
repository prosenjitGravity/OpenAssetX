import { useState } from "react"
import "./market-place.css"
import { Link } from "react-router-dom"

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
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
    },
    {
      id: 2,
      name: "Complete Book Series",
      description: "Harry Potter complete collection, hardcover",
      price: 120,
      category: "Books",
      seller: "0x9876...5432",
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      description: "ASUS ROG Strix, RTX 3070, 16GB RAM",
      price: 1200,
      category: "Electronics",
      seller: "0x5555...7777",
      image: "/placeholder.svg?height=200&width=300",
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
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-flex">
            <div className="nav-left">
              <a href="/" className="logo">
                AssetMarket
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
          <h1 className="title">Marketplace</h1>
          <p className="subtitle">Discover and buy unique used assets</p>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filters-grid">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="dropdown-container">
              <button 
                className="dropdown-trigger"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span>{getCategoryLabel()}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {categoryDropdownOpen && (
                <div className="dropdown-content">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className="dropdown-item"
                      onClick={() => handleCategorySelect(category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-container">
              <button 
                className="dropdown-trigger"
                onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
              >
                <span>{getPriceLabel()}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {priceDropdownOpen && (
                <div className="dropdown-content">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      className="dropdown-item"
                      onClick={() => handlePriceSelect(range.value)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="filter-btn">
              <span className="btn-icon">🔧</span>
              More Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p className="count-text">
            Showing {filteredAssets.length} of {assets.length} assets
          </p>
        </div>

        {/* Asset Grid */}
        <div className="assets-grid">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="asset-card">
              <div className="asset-image-container">
                <img
                  src={asset.image || "/placeholder.svg"}
                  alt={asset.name}
                  className="asset-image"
                />
              </div>
              <div className="asset-content">
                <div className="asset-header">
                  <h3 className="asset-title">{asset.name}</h3>
                  <span className="condition-badge">{asset.condition}</span>
                </div>
                <p className="asset-description">{asset.description}</p>

                <div className="seller-info">
                  <span className="seller-icon">👤</span>
                  <span className="seller-text">Seller: {asset.seller}</span>
                </div>

                <div className="price-row">
                  <span className="asset-price">{asset.price} tokens</span>
                  <span className="category-badge">{asset.category}</span>
                </div>

                <div className="asset-actions">
                  <Link to={`/asset/${asset.id}`} className="view-btn">
                    <span className="btn-icon">👁</span>
                    View Details
                  </Link>
                  <button className="buy-btn">
                    <span className="btn-icon">🛒</span>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="no-results">
            <p className="no-results-title">No assets found matching your criteria.</p>
            <p className="no-results-subtitle">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
