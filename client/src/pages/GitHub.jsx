import React, { useState } from 'react'
import { fetchGitHubProfile } from '../services/githubService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import '../styles/GitHub.css'

const GitHub = () => {
  const [username, setUsername] = useState('')
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setProfileData(null)

    try {
      const data = await fetchGitHubProfile(username.trim())
      setProfileData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getLanguageChartData = () => {
    if (!profileData) return []
    const languages = profileData.repos.languages
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }

  const getTopRepos = () => {
    if (!profileData) return []
    return profileData.repos.topRepos.slice(0, 10)
  }

  return (
    <div className="github-page">
      <h2 className="page-heading">GitHub Profile Analyzer</h2>

      <form onSubmit={handleSearch} className="github-search">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="github-input"
        />
        <button type="submit" className="github-search-btn">
          🔍 Analyze Profile
        </button>
      </form>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {profileData && (
        <div className="github-content">
          {/* Profile Card */}
          <div className="profile-card">
            <img 
              src={profileData.user.avatar} 
              alt={profileData.user.login}
              className="profile-avatar"
            />
            <div className="profile-info">
              <h3 className="profile-name">{profileData.user.name || profileData.user.login}</h3>
              <p className="profile-username">@{profileData.user.login}</p>
              {profileData.user.bio && <p className="profile-bio">{profileData.user.bio}</p>}
              
              <div className="profile-meta">
                {profileData.user.location && (
                  <span className="meta-item">📍 {profileData.user.location}</span>
                )}
                {profileData.user.company && (
                  <span className="meta-item">🏢 {profileData.user.company}</span>
                )}
                {profileData.user.blog && (
                  <span className="meta-item">
                    🔗 <a href={profileData.user.blog} target="_blank" rel="noopener noreferrer">
                      {profileData.user.blog}
                    </a>
                  </span>
                )}
              </div>

              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">{profileData.user.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profileData.user.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profileData.user.publicRepos}</span>
                  <span className="stat-label">Repositories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{profileData.repos.totalStars}</span>
                  <span className="stat-label">Total Stars</span>
                </div>
              </div>

              <a 
                href={profileData.user.htmlUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Language Pie Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Top Languages</h3>
              <div className="pie-chart">
                {getLanguageChartData().map(([language, count], index) => {
                  const total = Object.values(profileData.repos.languages).reduce((a, b) => a + b, 0)
                  const percentage = ((count / total) * 100).toFixed(1)
                  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1']
                  
                  return (
                    <div key={language} className="pie-item">
                      <div 
                        className="pie-bar" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: colors[index % colors.length]
                        }}
                      ></div>
                      <div className="pie-label">
                        <span className="language-name">{language}</span>
                        <span className="language-percentage">{percentage}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Stars Bar Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Top Repositories by Stars</h3>
              <div className="bar-chart">
                {getTopRepos().map((repo, index) => {
                  const maxStars = Math.max(...getTopRepos().map(r => r.stars))
                  const barWidth = maxStars > 0 ? (repo.stars / maxStars) * 100 : 0
                  
                  return (
                    <div key={index} className="bar-item">
                      <div className="bar-info">
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="repo-name"
                        >
                          {repo.name}
                        </a>
                        <span className="repo-stars">⭐ {repo.stars}</span>
                      </div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${barWidth}%` }}
                        ></div>
                      </div>
                      {repo.description && (
                        <p className="repo-description">{repo.description}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHub
