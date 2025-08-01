import { useState, useEffect } from "react"
import "./buy-token.css"
import Navbar from './navbar';

export default function BuyTokensPage() {
  const [ethAmount, setEthAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [exchangeRate] = useState(100) // 1 ETH = 100 Money Tokens
  const [selectedPayment, setSelectedPayment] = useState("eth")
  const [slippage, setSlippage] = useState(0.5)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [userWallet] = useState({
    address: "0x1234567890abcdef1234567890abcdef12345678",
    ethBalance: 2.456,
    tokenBalance: 1250,
    network: "Ethereum Mainnet"
  })

  const [transactionHistory] = useState([
    {
      id: 1,
      type: "purchase",
      amount: "500 tokens",
      cost: "5.0 ETH",
      date: "2024-01-20",
      status: "completed",
      hash: "0xabc123..."
    },
    {
      id: 2,
      type: "purchase", 
      amount: "750 tokens",
      cost: "7.5 ETH",
      date: "2024-01-15",
      status: "completed",
      hash: "0xdef456..."
    }
  ])

  const [priceHistory] = useState([
    { date: "Jan 15", price: 100 },
    { date: "Jan 16", price: 102 },
    { date: "Jan 17", price: 98 },
    { date: "Jan 18", price: 101 },
    { date: "Jan 19", price: 99 },
    { date: "Jan 20", price: 100 }
  ])

  const paymentMethods = [
    { id: "eth", name: "Ethereum (ETH)", icon: "⟠", rate: 100, fee: 1 },
    { id: "matic", name: "Polygon (MATIC)", icon: "⬟", rate: 2.5, fee: 0.5 },
    { id: "usdc", name: "USD Coin (USDC)", icon: "💵", rate: 0.33, fee: 0.1 }
  ]

  const currentMethod = paymentMethods.find(method => method.id === selectedPayment)

  const handleEthChange = (value) => {
    setEthAmount(value)
    const tokens = parseFloat(value) * (currentMethod?.rate || 100)
    setTokenAmount(tokens ? tokens.toString() : "")
  }

  const handleTokenChange = (value) => {
    setTokenAmount(value)  
    const eth = parseFloat(value) / (currentMethod?.rate || 100)
    setEthAmount(eth ? eth.toString() : "")
  }

  const calculateFees = () => {
    if (!ethAmount) return { networkFee: 0, platformFee: 0, total: 0 }
    
    const amount = parseFloat(ethAmount)
    const networkFee = selectedPayment === "eth" ? 0.002 : 0.0001
    const platformFee = amount * (currentMethod?.fee || 1) / 100
    const total = amount + networkFee + platformFee
    
    return { networkFee, platformFee, total }
  }

  const fees = calculateFees()

  const handlePurchase = () => {
    console.log("Purchasing tokens:", { 
      ethAmount, 
      tokenAmount, 
      paymentMethod: selectedPayment,
      fees 
    })
  }

  const getBalanceForMethod = () => {
    switch(selectedPayment) {
      case "eth": return `${userWallet.ethBalance} ETH`
      case "matic": return "150.2 MATIC"
      case "usdc": return "500.0 USDC"
      default: return "0.00"
    }
  }

  return (
    <div className="buy-tokens-container">
      <Navbar />

      <div className="buy-tokens-main-content">
        {/* Back Button */}
        <div className="buy-tokens-back-button-container">
          <a href="/dashboard" className="buy-tokens-back-link">
            <span className="buy-tokens-back-icon">←</span>
            Back to Dashboard
          </a>
        </div>

        {/* Header */}
        <div className="buy-tokens-header">
          <div className="buy-tokens-header-content">
            <h1 className="buy-tokens-title">Buy Money Tokens</h1>
            <p className="buy-tokens-subtitle">Purchase tokens instantly to trade assets on the marketplace</p>
          </div>
          <div className="buy-tokens-current-rate">
            <div className="buy-tokens-rate-display">
              <span className="buy-tokens-rate-label">Current Rate</span>
              <span className="buy-tokens-rate-value">
                1 {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'} = {currentMethod?.rate || 100} tokens
              </span>
              <span className="buy-tokens-rate-change">+2.1% (24h)</span>
            </div>
          </div>
        </div>

        <div className="buy-tokens-content-grid">
          {/* Main Purchase Panel */}
          <div className="buy-tokens-main-panel">
            {/* Purchase Form */}
            <div className="buy-tokens-purchase-card">
              <div className="buy-tokens-card-header">
                <h2 className="buy-tokens-card-title">
                  <span className="buy-tokens-title-icon">💰</span>
                  Token Exchange
                </h2>
                <div className="buy-tokens-balance-info">
                  <span className="buy-tokens-balance-label">Available:</span>
                  <span className="buy-tokens-balance-amount">{getBalanceForMethod()}</span>
                </div>
              </div>

              <div className="buy-tokens-card-content">
                {/* Payment Method Selection */}
                <div className="buy-tokens-payment-methods">
                  <label className="buy-tokens-section-label">Payment Method</label>
                  <div className="buy-tokens-method-grid">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        className={`buy-tokens-method-btn ${selectedPayment === method.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedPayment(method.id)
                          if (ethAmount) handleEthChange(ethAmount)
                        }}
                      >
                        <span className="buy-tokens-method-icon">{method.icon}</span>
                        <span className="buy-tokens-method-name">{method.name}</span>
                        <span className="buy-tokens-method-fee">{method.fee}% fee</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input Section */}
                <div className="buy-tokens-exchange-section">
                  <div className="buy-tokens-input-group">
                    <label className="buy-tokens-input-label">You Pay</label>
                    <div className="buy-tokens-input-container">
                      <input
                        type="number"
                        step="0.001"
                        placeholder="0.00"
                        value={ethAmount}
                        onChange={(e) => handleEthChange(e.target.value)}
                        className="buy-tokens-amount-input"
                      />
                      <div className="buy-tokens-input-suffix">
                        <span className="buy-tokens-currency-icon">{currentMethod?.icon}</span>
                        {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}
                      </div>
                    </div>
                    <div className="buy-tokens-balance-display">
                      Balance: {getBalanceForMethod()}
                    </div>
                  </div>

                  <div className="buy-tokens-exchange-arrow">
                    <button className="buy-tokens-arrow-btn">
                      <span className="buy-tokens-arrow-icon">⇅</span>
                    </button>
                  </div>

                  <div className="buy-tokens-input-group">
                    <label className="buy-tokens-input-label">You Receive</label>
                    <div className="buy-tokens-input-container">
                      <input
                        type="number"
                        placeholder="0"
                        value={tokenAmount}
                        onChange={(e) => handleTokenChange(e.target.value)}
                        className="buy-tokens-amount-input"
                      />
                      <div className="buy-tokens-input-suffix">
                        <span className="buy-tokens-currency-icon">🪙</span>
                        Tokens
                      </div>
                    </div>
                    <div className="buy-tokens-balance-display">
                      Current: {userWallet.tokenBalance.toLocaleString()} tokens
                    </div>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="buy-tokens-quick-amounts">
                  <label className="buy-tokens-section-label">Quick Buy</label>
                  <div className="buy-tokens-quick-grid">
                    <button 
                      className="buy-tokens-quick-btn" 
                      onClick={() => handleEthChange("0.1")}
                    >
                      0.1 {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}
                    </button>
                    <button 
                      className="buy-tokens-quick-btn" 
                      onClick={() => handleEthChange("0.5")}
                    >
                      0.5 {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}
                    </button>
                    <button 
                      className="buy-tokens-quick-btn" 
                      onClick={() => handleEthChange("1")}
                    >
                      1 {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}
                    </button>
                    <button 
                      className="buy-tokens-quick-btn" 
                      onClick={() => handleTokenChange("1000")}
                    >
                      1K Tokens
                    </button>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="buy-tokens-advanced-section">
                  <button 
                    className="buy-tokens-advanced-toggle"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <span className="buy-tokens-advanced-icon">⚙️</span>
                    Advanced Settings
                    <span className={`buy-tokens-toggle-arrow ${showAdvanced ? 'open' : ''}`}>▼</span>
                  </button>
                  
                  {showAdvanced && (
                    <div className="buy-tokens-advanced-content">
                      <div className="buy-tokens-setting-item">
                        <label className="buy-tokens-setting-label">
                          Slippage Tolerance
                          <span className="buy-tokens-info-tooltip">?</span>
                        </label>
                        <div className="buy-tokens-slippage-options">
                          {[0.1, 0.5, 1.0].map((value) => (
                            <button
                              key={value}
                              className={`buy-tokens-slippage-btn ${slippage === value ? 'active' : ''}`}
                              onClick={() => setSlippage(value)}
                            >
                              {value}%
                            </button>
                          ))}
                          <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            max="50"
                            value={slippage}
                            onChange={(e) => setSlippage(parseFloat(e.target.value))}
                            className="buy-tokens-custom-slippage"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Transaction Summary */}
                {ethAmount && parseFloat(ethAmount) > 0 && (
                  <div className="buy-tokens-summary-card">
                    <h4 className="buy-tokens-summary-title">Transaction Summary</h4>
                    <div className="buy-tokens-summary-content">
                      <div className="buy-tokens-summary-row">
                        <span className="buy-tokens-summary-label">Exchange Amount:</span>
                        <span className="buy-tokens-summary-value">{ethAmount} {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}</span>
                      </div>
                      <div className="buy-tokens-summary-row">
                        <span className="buy-tokens-summary-label">Platform Fee ({currentMethod?.fee}%):</span>
                        <span className="buy-tokens-summary-value">{fees.platformFee.toFixed(4)} {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}</span>
                      </div>
                      <div className="buy-tokens-summary-row">
                        <span className="buy-tokens-summary-label">Network Fee:</span>
                        <span className="buy-tokens-summary-value">{fees.networkFee.toFixed(4)} {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}</span>
                      </div>
                      <div className="buy-tokens-summary-row buy-tokens-summary-total">
                        <span className="buy-tokens-summary-label">Total Cost:</span>
                        <span className="buy-tokens-summary-value">{fees.total.toFixed(4)} {currentMethod?.name.split('(')[1]?.replace(')', '') || 'ETH'}</span>
                      </div>
                      <div className="buy-tokens-summary-row buy-tokens-summary-receive">
                        <span className="buy-tokens-summary-label">You'll Receive:</span>
                        <span className="buy-tokens-summary-value">{tokenAmount} tokens</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  className={`buy-tokens-purchase-btn ${!ethAmount || parseFloat(ethAmount) <= 0 ? 'disabled' : ''}`}
                  disabled={!ethAmount || parseFloat(ethAmount) <= 0}
                >
                  <span className="buy-tokens-btn-icon">💳</span>
                  {tokenAmount ? `Purchase ${parseFloat(tokenAmount).toLocaleString()} Tokens` : 'Enter Amount'}
                </button>

                <div className="buy-tokens-security-info">
                  <div className="buy-tokens-security-item">
                    <span className="buy-tokens-security-icon">🔒</span>
                    <span>Secured by smart contracts</span>
                  </div>
                  <div className="buy-tokens-security-item">
                    <span className="buy-tokens-security-icon">⚡</span>
                    <span>Instant token delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sidebar */}
          <div className="buy-tokens-info-panel">
            {/* Wallet Information */}
            <div className="buy-tokens-info-card">
              <div className="buy-tokens-info-header">
                <h3 className="buy-tokens-info-title">
                  <span className="buy-tokens-info-icon">👛</span>
                  Wallet Information
                </h3>
              </div>
              <div className="buy-tokens-info-content">
                <div className="buy-tokens-wallet-details">
                  <div className="buy-tokens-wallet-address">
                    <span className="buy-tokens-address-label">Connected Wallet:</span>
                    <span className="buy-tokens-address-value">{userWallet.address}</span>
                    <button className="buy-tokens-copy-btn">📋</button>
                  </div>
                  <div className="buy-tokens-wallet-balances">
                    <div className="buy-tokens-balance-item">
                      <span className="buy-tokens-balance-currency">ETH</span>
                      <span className="buy-tokens-balance-value">{userWallet.ethBalance}</span>
                    </div>
                    <div className="buy-tokens-balance-item">
                      <span className="buy-tokens-balance-currency">Tokens</span>
                      <span className="buy-tokens-balance-value">{userWallet.tokenBalance.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="buy-tokens-network-info">
                    <span className="buy-tokens-network-icon">🌐</span>
                    <span className="buy-tokens-network-name">{userWallet.network}</span>
                    <span className="buy-tokens-network-status">🟢 Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="buy-tokens-info-card">
              <div className="buy-tokens-info-header">
                <h3 className="buy-tokens-info-title">
                  <span className="buy-tokens-info-icon">📈</span>
                  Price History (7 days)
                </h3>
              </div>
              <div className="buy-tokens-info-content">
                <div className="buy-tokens-chart-container">
                  <div className="buy-tokens-price-chart">
                    {priceHistory.map((point, index) => (
                      <div 
                        key={index} 
                        className="buy-tokens-chart-bar"
                        style={{ height: `${(point.price / 102) * 100}%` }}
                        title={`${point.date}: ${point.price} tokens/ETH`}
                      />
                    ))}
                  </div>
                  <div className="buy-tokens-chart-labels">
                    {priceHistory.map((point, index) => (
                      <span key={index} className="buy-tokens-chart-label">{point.date}</span>
                    ))}
                  </div>
                </div>
                <div className="buy-tokens-price-stats">
                  <div className="buy-tokens-stat-item">
                    <span className="buy-tokens-stat-label">24h Change:</span>
                    <span className="buy-tokens-stat-value positive">+2.1%</span>
                  </div>
                  <div className="buy-tokens-stat-item">
                    <span className="buy-tokens-stat-label">7d High:</span>
                    <span className="buy-tokens-stat-value">102</span>
                  </div>
                  <div className="buy-tokens-stat-item">
                    <span className="buy-tokens-stat-label">7d Low:</span>
                    <span className="buy-tokens-stat-value">98</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How it Works */}
            <div className="buy-tokens-info-card">
              <div className="buy-tokens-info-header">
                <h3 className="buy-tokens-info-title">
                  <span className="buy-tokens-info-icon">⚡</span>
                  How it Works
                </h3>
              </div>
              <div className="buy-tokens-info-content">
                <div className="buy-tokens-steps-list">
                  <div className="buy-tokens-step-item">
                    <div className="buy-tokens-step-number">1</div>
                    <div className="buy-tokens-step-content">
                      <h4 className="buy-tokens-step-title">Choose Payment</h4>
                      <p className="buy-tokens-step-description">Select your preferred cryptocurrency</p>
                    </div>
                  </div>
                  <div className="buy-tokens-step-item">
                    <div className="buy-tokens-step-number">2</div>
                    <div className="buy-tokens-step-content">
                      <h4 className="buy-tokens-step-title">Enter Amount</h4>
                      <p className="buy-tokens-step-description">Specify how much you want to exchange</p>
                    </div>
                  </div>
                  <div className="buy-tokens-step-item">
                    <div className="buy-tokens-step-number">3</div>
                    <div className="buy-tokens-step-content">
                      <h4 className="buy-tokens-step-title">Confirm Transaction</h4>
                      <p className="buy-tokens-step-description">Approve the transaction in your wallet</p>
                    </div>
                  </div>
                  <div className="buy-tokens-step-item">
                    <div className="buy-tokens-step-number">4</div>
                    <div className="buy-tokens-step-content">
                      <h4 className="buy-tokens-step-title">Receive Tokens</h4>
                      <p className="buy-tokens-step-description">Tokens are instantly minted to your wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="buy-tokens-info-card">
              <div className="buy-tokens-info-header">
                <h3 className="buy-tokens-info-title">
                  <span className="buy-tokens-info-icon">📋</span>
                  Recent Transactions
                </h3>
              </div>
              <div className="buy-tokens-info-content">
                <div className="buy-tokens-transaction-list">
                  {transactionHistory.map((tx) => (
                    <div key={tx.id} className="buy-tokens-transaction-item">
                      <div className="buy-tokens-tx-main">
                        <div className="buy-tokens-tx-details">
                          <span className="buy-tokens-tx-amount">{tx.amount}</span>
                          <span className="buy-tokens-tx-cost">for {tx.cost}</span>
                        </div>
                        <span className={`buy-tokens-tx-status ${tx.status}`}>
                          {tx.status === 'completed' ? '✅' : '⏳'} {tx.status}
                        </span>
                      </div>
                      <div className="buy-tokens-tx-meta">
                        <span className="buy-tokens-tx-date">{tx.date}</span>
                        <button className="buy-tokens-tx-link">
                          <span className="buy-tokens-tx-hash">{tx.hash}</span>
                          <span className="buy-tokens-external-icon">🔗</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="buy-tokens-view-all-btn">View All Transactions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
