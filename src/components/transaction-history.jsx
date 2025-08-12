import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './transaction-history.css';
import Navbar from './navbar';

export default function TransactionHistoryPage() {
  const navigate = useNavigate();
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('30d');
  const [sortBy, setSortBy] = useState('date-desc');

  const [transactions] = useState([
    {
      id: 'TXN_001',
      type: 'asset_purchase',
      assetName: 'Professional DSLR Camera Canon EOS 5D',
      counterparty: 'PhotoPro_Mike',
      amount: -300,
      currency: 'tokens',
      status: 'completed',
      date: '2025-08-07 14:30:00',
      txHash: '0xabc123def456ghi789jkl012mno345pqr678stu901',
      networkFee: 2.5,
      category: 'Electronics',
      note: 'Purchased camera for photography business'
    },
    {
      id: 'TXN_002',
      type: 'asset_sale',
      assetName: 'MacBook Pro 16-inch - Excellent Condition',
      counterparty: 'TechEnthusiast_Bob',
      amount: 850,
      currency: 'tokens',
      status: 'completed',
      date: '2025-08-05 10:15:00',
      txHash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234',
      networkFee: 3.0,
      category: 'Electronics',
      note: 'Sold to upgrade to newer model'
    },
    {
      id: 'TXN_003',
      type: 'token_purchase',
      assetName: null,
      counterparty: 'OpenAssetX Platform',
      amount: 500,
      currency: 'tokens',
      status: 'completed',
      date: '2025-08-03 16:45:00',
      txHash: '0xghi789jkl012mno345pqr678stu901vwx234yza567',
      networkFee: 0.002,
      ethSpent: 2.5,
      category: 'Token Purchase',
      note: 'Bought tokens with ETH'
    },
    {
      id: 'TXN_004',
      type: 'transfer_sent',
      assetName: null,
      counterparty: 'CryptoFriend_Alice',
      amount: -50,
      currency: 'tokens',
      status: 'completed',
      date: '2025-08-02 09:20:00',
      txHash: '0xjkl012mno345pqr678stu901vwx234yza567bcd890',
      networkFee: 1.0,
      category: 'Transfer',
      note: 'Payment for shared project'
    },
    {
      id: 'TXN_005',
      type: 'asset_purchase',
      assetName: 'Vintage Art Collection - Abstract Paintings',
      counterparty: 'ArtCollector_Jane',
      amount: -450,
      currency: 'tokens',
      status: 'pending',
      date: '2025-08-01 12:10:00',
      txHash: '0xmno345pqr678stu901vwx234yza567bcd890efg123',
      networkFee: 2.0,
      category: 'Art',
      note: 'Investment purchase'
    },
    {
      id: 'TXN_006',
      type: 'transfer_received',
      assetName: null,
      counterparty: 'BusinessPartner_Sam',
      amount: 200,
      currency: 'tokens',
      status: 'completed',
      date: '2025-07-30 18:30:00',
      txHash: '0xpqr678stu901vwx234yza567bcd890efg123hij456',
      networkFee: 0,
      category: 'Transfer',
      note: 'Payment received for consulting'
    },
    {
      id: 'TXN_007',
      type: 'asset_sale',
      assetName: 'Designer Watch - Limited Edition',
      counterparty: 'WatchCollector_Alex',
      amount: 500,
      currency: 'tokens',
      status: 'failed',
      date: '2025-07-28 14:55:00',
      txHash: '0xstu901vwx234yza567bcd890efg123hij456klm789',
      networkFee: 2.5,
      category: 'Accessories',
      note: 'Transaction failed due to insufficient gas'
    }
  ]);

  const transactionTypes = [
    { id: 'all', name: 'All Transactions', icon: '📋' },
    { id: 'asset_purchase', name: 'Asset Purchases', icon: '🛒' },
    { id: 'asset_sale', name: 'Asset Sales', icon: '💰' },
    { id: 'token_purchase', name: 'Token Purchases', icon: '🪙' },
    { id: 'transfer_sent', name: 'Transfers Sent', icon: '📤' },
    { id: 'transfer_received', name: 'Transfers Received', icon: '📥' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'amount-desc', label: 'Amount (Highest First)' },
    { value: 'amount-asc', label: 'Amount (Lowest First)' }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = activeFilter === 'all' || tx.type === activeFilter;
    const matchesSearch = !searchQuery || 
      tx.assetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return Math.abs(b.amount) - Math.abs(a.amount);
      case 'amount-asc':
        return Math.abs(a.amount) - Math.abs(b.amount);
      default:
        return 0;
    }
  });

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'asset_purchase': return '🛒';
      case 'asset_sale': return '💰';
      case 'token_purchase': return '🪙';
      case 'transfer_sent': return '📤';
      case 'transfer_received': return '📥';
      default: return '📋';
    }
  };

  const getTransactionTitle = (tx) => {
    switch (tx.type) {
      case 'asset_purchase':
        return `Purchased: ${tx.assetName}`;
      case 'asset_sale':
        return `Sold: ${tx.assetName}`;
      case 'token_purchase':
        return 'Purchased Tokens';
      case 'transfer_sent':
        return 'Sent Tokens';
      case 'transfer_received':
        return 'Received Tokens';
      default:
        return 'Transaction';
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'completed': 'tx-history-status-completed',
      'pending': 'tx-history-status-pending',
      'failed': 'tx-history-status-failed'
    };
    return statusClasses[status] || 'tx-history-status-default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatTxHash = (hash) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const handleExport = () => {
    // In real app, export to CSV/PDF
    console.log('Exporting transactions...');
    alert('Transaction history exported successfully!');
  };

  const handleTransactionClick = (tx) => {
    // Navigate to transaction details or open modal
    console.log('View transaction details:', tx.id);
  };

  const calculateTotals = () => {
    return filteredTransactions.reduce((acc, tx) => {
      if (tx.status === 'completed') {
        if (tx.amount > 0) {
          acc.totalReceived += tx.amount;
        } else {
          acc.totalSpent += Math.abs(tx.amount);
        }
        acc.totalFees += tx.networkFee;
      }
      return acc;
    }, { totalReceived: 0, totalSpent: 0, totalFees: 0 });
  };

  const totals = calculateTotals();

  return (
    <div className="tx-history-container">
      <Navbar />

      <div className="tx-history-main-content">
        {/* Back Button */}
        <div className="tx-history-back-button-container">
          <Link 
            onClick={() => navigate('/dashboard')}
            className="tx-history-back-link"
          >
            <span className="tx-history-back-icon">←</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="tx-history-header">
          <div className="tx-history-title-section">
            <h1 className="tx-history-title">Transaction History</h1>
            <p className="tx-history-subtitle">Complete record of all your blockchain transactions</p>
          </div>
          <div className="tx-history-header-actions">
            <button className="tx-history-btn tx-history-btn-secondary" onClick={handleExport}>
              <span className="tx-history-btn-icon">📁</span>
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="tx-history-summary-cards">
          <div className="tx-history-summary-card">
            <div className="tx-history-summary-icon">📈</div>
            <div className="tx-history-summary-content">
              <span className="tx-history-summary-value">{totals.totalReceived.toLocaleString()}</span>
              <span className="tx-history-summary-label">Total Received</span>
            </div>
          </div>
          <div className="tx-history-summary-card">
            <div className="tx-history-summary-icon">📉</div>
            <div className="tx-history-summary-content">
              <span className="tx-history-summary-value">{totals.totalSpent.toLocaleString()}</span>
              <span className="tx-history-summary-label">Total Spent</span>
            </div>
          </div>
          <div className="tx-history-summary-card">
            <div className="tx-history-summary-icon">⚡</div>
            <div className="tx-history-summary-content">
              <span className="tx-history-summary-value">{totals.totalFees.toFixed(2)}</span>
              <span className="tx-history-summary-label">Network Fees</span>
            </div>
          </div>
          <div className="tx-history-summary-card">
            <div className="tx-history-summary-icon">📋</div>
            <div className="tx-history-summary-content">
              <span className="tx-history-summary-value">{filteredTransactions.length}</span>
              <span className="tx-history-summary-label">Transactions</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="tx-history-filters-container">
          <div className="tx-history-card">
            <div className="tx-history-card-header">
              <h2 className="tx-history-card-title">
                <span className="tx-history-title-icon">🔍</span>
                Filters & Search
              </h2>
            </div>
            <div className="tx-history-card-content">
              <div className="tx-history-filters-grid">
                <div className="tx-history-search-group">
                  <label className="tx-history-form-label">Search Transactions</label>
                  <input
                    type="text"
                    className="tx-history-search-input"
                    placeholder="Search by asset name, user, or transaction hash..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="tx-history-filter-group">
                  <label className="tx-history-form-label">Date Range</label>
                  <select
                    className="tx-history-select"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    {dateRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="tx-history-filter-group">
                  <label className="tx-history-form-label">Sort By</label>
                  <select
                    className="tx-history-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="tx-history-type-filters">
                {transactionTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`tx-history-type-filter ${activeFilter === type.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(type.id)}
                  >
                    <span className="tx-history-type-icon">{type.icon}</span>
                    <span className="tx-history-type-text">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="tx-history-transactions-container">
          <div className="tx-history-card">
            <div className="tx-history-card-header">
              <h2 className="tx-history-card-title">
                <span className="tx-history-title-icon">📋</span>
                Transactions ({filteredTransactions.length})
              </h2>
            </div>
            <div className="tx-history-card-content">
              {filteredTransactions.length > 0 ? (
                <div className="tx-history-transactions-list">
                  {filteredTransactions.map((tx) => {
                    const formattedDate = formatDate(tx.date);
                    return (
                      <div 
                        key={tx.id}
                        className="tx-history-transaction-item"
                        onClick={() => handleTransactionClick(tx)}
                      >
                        <div className="tx-history-transaction-main">
                          <div className="tx-history-transaction-icon">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div className="tx-history-transaction-details">
                            <div className="tx-history-transaction-title">
                              {getTransactionTitle(tx)}
                            </div>
                            <div className="tx-history-transaction-meta">
                              <span className="tx-history-counterparty">
                                {tx.type.includes('purchase') ? 'From' : 
                                 tx.type.includes('sale') ? 'To' : 
                                 tx.type === 'transfer_sent' ? 'To' : 'From'}: @{tx.counterparty}
                              </span>
                              <span className="tx-history-category">{tx.category}</span>
                            </div>
                            {tx.note && (
                              <div className="tx-history-transaction-note">
                                {tx.note}
                              </div>
                            )}
                          </div>
                          <div className="tx-history-transaction-amount">
                            <div className="tx-history-amount-display">
                              <span className={`tx-history-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency}
                              </span>
                              {tx.ethSpent && (
                                <span className="tx-history-eth-amount">
                                  Cost: {tx.ethSpent} ETH
                                </span>
                              )}
                            </div>
                            <span className={`tx-history-status ${getStatusBadge(tx.status)}`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                        <div className="tx-history-transaction-footer">
                          <div className="tx-history-transaction-time">
                            <span className="tx-history-date">{formattedDate.date}</span>
                            <span className="tx-history-time">{formattedDate.time}</span>
                          </div>
                          <div className="tx-history-transaction-hash">
                            <span className="tx-history-hash-label">TX:</span>
                            <span className="tx-history-hash-value">{formatTxHash(tx.txHash)}</span>
                            <button className="tx-history-hash-copy" title="Copy transaction hash">
                              📋
                            </button>
                          </div>
                          <div className="tx-history-network-fee">
                            Fee: {tx.networkFee} {tx.type === 'token_purchase' ? 'ETH' : 'tokens'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="tx-history-no-transactions">
                  <div className="tx-history-no-transactions-icon">📭</div>
                  <div className="tx-history-no-transactions-text">
                    <h3>No transactions found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
