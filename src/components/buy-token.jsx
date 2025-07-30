import { useState } from "react"
import "./buy-token.css"

export default function BuyTokensPage() {
  const [ethAmount, setEthAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [exchangeRate] = useState(100) // 1 ETH = 100 Money Tokens

  const handleEthChange = (value) => {
    setEthAmount(value)
    const tokens = parseFloat(value) * exchangeRate
    setTokenAmount(tokens.toString())
  }

  const handleTokenChange = (value) => {
    setTokenAmount(value)  
    const eth = parseFloat(value) / exchangeRate
    setEthAmount(eth.toString())
  }

  const handlePurchase = () => {
    // Handle token purchase logic
    console.log("Purchasing tokens:", { ethAmount, tokenAmount })
  }

  return (
    <div className="buy-tokens-container">
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
          <h1 className="title">Buy Money Tokens</h1>
          <p className="subtitle">Purchase tokens to buy assets on the marketplace</p>
        </div>

        <div className="content-grid">
          {/* Purchase Form */}
          <div className="purchase-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="title-icon">💰</span>
                Token Purchase
              </h2>
              <p className="card-description">Exchange ETH/MATIC for Money Tokens</p>
            </div>
            <div className="card-content">
              {/* Current Balance */}
              <div className="balance-display">
                <div className="balance-row">
                  <span className="balance-label">Current Balance:</span>
                  <span className="balance-amount">1,250 tokens</span>
                </div>
              </div>

              {/* Exchange Rate */}
              <div className="rate-display">
                <div className="rate-row">
                  <span className="rate-label">Exchange Rate:</span>
                  <span className="rate-badge">1 ETH = {exchangeRate} Money Tokens</span>
                </div>
              </div>

              {/* Amount Inputs */}
              <div className="input-section">
                <div className="input-group">
                  <label htmlFor="ethAmount" className="input-label">ETH Amount</label>
                  <div className="input-container">
                    <input
                      id="ethAmount"
                      type="number"
                      step="0.001"
                      placeholder="0.00"
                      value={ethAmount}
                      onChange={(e) => handleEthChange(e.target.value)}
                      className="amount-input"
                    />
                    <div className="input-suffix">ETH</div>
                  </div>
                </div>

                <div className="exchange-arrow">
                  <div className="arrow-icon">↕</div>
                </div>

                <div className="input-group">
                  <label htmlFor="tokenAmount" className="input-label">Money Tokens</label>
                  <div className="input-container">
                    <input
                      id="tokenAmount"
                      type="number"
                      placeholder="0"
                      value={tokenAmount}
                      onChange={(e) => handleTokenChange(e.target.value)}
                      className="amount-input"
                    />
                    <div className="input-suffix">Tokens</div>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="quick-amounts">
                <button 
                  className="quick-btn" 
                  onClick={() => handleEthChange("0.1")}
                >
                  0.1 ETH
                </button>
                <button 
                  className="quick-btn" 
                  onClick={() => handleEthChange("0.5")}
                >
                  0.5 ETH
                </button>
                <button 
                  className="quick-btn" 
                  onClick={() => handleEthChange("1")}
                >
                  1 ETH
                </button>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                className={`purchase-btn ${!ethAmount || parseFloat(ethAmount) <= 0 ? 'disabled' : ''}`}
                disabled={!ethAmount || parseFloat(ethAmount) <= 0}
              >
                <span className="btn-icon">💳</span>
                Purchase {tokenAmount} Tokens
              </button>
            </div>
          </div>

          {/* Information Panel */}
          <div className="info-panel">
            {/* Wallet Info */}
            <div className="info-card">
              <div className="info-header">
                <h3 className="info-title">
                  <span className="info-icon">👛</span>
                  Wallet Information
                </h3>
              </div>
              <div className="info-content">
                <div className="info-row">
                  <span className="info-label">Connected Wallet:</span>
                  <span className="wallet-address">0x1234...5678</span>
                </div>
                <div className="info-row">
                  <span className="info-label">ETH Balance:</span>
                  <span className="eth-balance">2.45 ETH</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Network:</span>
                  <span className="network-badge">Ethereum Mainnet</span>
                </div>
              </div>
            </div>

            {/* How it Works */}
            <div className="info-card">
              <div className="info-header">
                <h3 className="info-title">
                  <span className="info-icon">⚡</span>
                  How it Works
                </h3>
              </div>
              <div className="info-content">
                <ol className="steps-list">
                  <li className="step-item">
                    <span className="step-number">1</span>
                    <span className="step-text">Enter the amount of ETH you want to exchange for Money Tokens</span>
                  </li>
                  <li className="step-item">
                    <span className="step-number">2</span>
                    <span className="step-text">Confirm the transaction in your wallet</span>
                  </li>
                  <li className="step-item">
                    <span className="step-number">3</span>
                    <span className="step-text">Money Tokens will be minted to your wallet address</span>
                  </li>
                  <li className="step-item">
                    <span className="step-number">4</span>
                    <span className="step-text">Use tokens to purchase assets on the marketplace</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Transaction Fees */}
            <div className="info-card">
              <div className="info-header">
                <h3 className="info-title">Transaction Fees</h3>
              </div>
              <div className="info-content">
                <div className="fee-row">
                  <span className="fee-label">Network Fee:</span>
                  <span className="fee-amount">~0.002 ETH</span>
                </div>
                <div className="fee-row">
                  <span className="fee-label">Platform Fee:</span>
                  <span className="fee-amount">1%</span>
                </div>
                <div className="fee-row total-fee">
                  <span className="fee-label">Total Cost:</span>
                  <span className="fee-amount">
                    {ethAmount ? (parseFloat(ethAmount) + 0.002).toFixed(3) : "0.000"} ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
