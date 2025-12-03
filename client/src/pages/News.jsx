import React, { useState, useEffect } from 'react'
import { fetchNews } from '../services/newsService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import '../styles/News.css'

const News = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'technology', 'business', 'science', 'health', 'sports', 'entertainment']

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchNews()
      setArticles(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <div className="news-page">
      <h2 className="page-heading">News Dashboard</h2>

      <div className="news-filters">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="news-count">
            Showing {filteredArticles.length} articles
          </div>

          <div className="news-grid">
            {filteredArticles.map((article, index) => (
              <div key={index} className="news-card">
                <div className="news-image-container">
                  <img 
                    src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'} 
                    alt={article.title}
                    className="news-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'
                    }}
                  />
                  <div className="news-category-badge">
                    {article.category}
                  </div>
                </div>

                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">{formatDate(article.publishedAt)}</span>
                  </div>

                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-description">{article.description}</p>

                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-link"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default News
