import React from 'react'
import '../styles/CryptoCard.css'

const CryptoCard = ({ crypto }) => {
  const priceChange = crypto.price_change_percentage_24h
  const isPositive = priceChange >= 0

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
        <div className="crypto-info">
          <h3>{crypto.name}</h3>
          <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div className="crypto-price">
        <span className="price-value">${crypto.current_price.toLocaleString()}</span>
        <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↗' : '↘'} {Math.abs(priceChange).toFixed(2)}%
        </span>
      </div>

      <div className="crypto-stats">
        <StatItem label="Market Cap" value={`$${(crypto.market_cap / 1e9).toFixed(2)}B`} />
        <StatItem label="Volume 24h" value={`$${(crypto.total_volume / 1e9).toFixed(2)}B`} />
        <StatItem label="High 24h" value={`$${crypto.high_24h.toLocaleString()}`} />
        <StatItem label="Low 24h" value={`$${crypto.low_24h.toLocaleString()}`} />
      </div>

      {crypto.sparkline_in_7d && (
        <MiniChart data={crypto.sparkline_in_7d.price} isPositive={isPositive} />
      )}
    </div>
  )
}

const StatItem = ({ label, value }) => (
  <div className="stat-item">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </div>
)

const MiniChart = ({ data, isPositive }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg className="mini-chart" viewBox="0 0 100 30" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
      />
    </svg>
  )
}

export default CryptoCard
