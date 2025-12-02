import React from 'react'
import '../styles/TopBar.css'

const TopBar = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">Welcome Back!</h1>
        <p className="page-subtitle">{currentDate}</p>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn">🔔</button>
        <button className="topbar-btn">👤</button>
      </div>
    </header>
  )
}

export default TopBar
