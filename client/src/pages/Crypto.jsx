import React, { useState, useEffect } from 'react'
import CryptoCard from '../components/CryptoCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import Card from '../components/Card'
import { fetchTopCryptos, fetchGlobalData, fetchTrendingCryptos } from '../services/cryptoService'
import '../styles/Crypto.css'

const Crypto = () => {
  const [cryptos, setCryptos] = useState([])
  const [globalData, setGlobalData] = useState(null)
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCryptoData()
  }, [])

  const loadCryptoData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [cryptoData, global, trendingData] = await Promise.all([
        fetchTopCryptos(12),
        fetchGlobalData(),
        fetchTrendingCryptos()
      ])
      
      setCryptos(cryptoData)
      setGlobalData(global)
      setTrending(trendingData.slice(0, 5))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="crypto-page">
        <h2 className="page-heading">Crypto Dashboard</h2>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="crypto-page">
        <h2 className="page-heading">Crypto Dashboard</h2>
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div className="crypto-page">
      <h2 className="page-heading">Crypto Dashboard</h2>

      {globalData && <GlobalStats data={globalData} />}

      <div className="crypto-section">
        <h3 className="section-title">Top Cryptocurrencies</h3>
        <div className="crypto-grid">
          {cryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>

      {trending.length > 0 && (
        <Card title="🔥 Trending Coins">
          <TrendingList coins={trending} />
        </Card>
      )}
    </div>
  )
}

const GlobalStats = ({ data }) => {
  const stats = [
    { label: 'Total Market Cap', value: `$${(data.total_market_cap.usd / 1e12).toFixed(2)}T` },
    { label: 'Total Volume 24h', value: `$${(data.total_volume.usd / 1e9).toFixed(2)}B` },
    { label: 'BTC Dominance', value: `${data.market_cap_percentage.btc.toFixed(1)}%` },
    { label: 'Active Cryptocurrencies', value: data.active_cryptocurrencies.toLocaleString() }
  ]

  return (
    <div className="global-stats">
      {stats.map((stat, index) => (
        <div key={index} className="global-stat-card">
          <span className="global-stat-label">{stat.label}</span>
          <span className="global-stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

const TrendingList = ({ coins }) => (
  <div className="trending-list">
    {coins.map((item, index) => (
      <div key={item.item.id} className="trending-item">
        <span className="trending-rank">#{index + 1}</span>
        <img src={item.item.small} alt={item.item.name} className="trending-icon" />
        <div className="trending-info">
          <span className="trending-name">{item.item.name}</span>
          <span className="trending-symbol">{item.item.symbol}</span>
        </div>
        <span className="trending-score">Score: {item.item.score + 1}</span>
      </div>
    ))}
  </div>
)

export default Crypto
