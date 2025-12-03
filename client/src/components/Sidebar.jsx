import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/weather', icon: '🌤️', label: 'Weather' },
    { path: '/crypto', icon: '₿', label: 'Crypto' },
    { path: '/countries', icon: '🌍', label: 'Countries' },
    { path: '/github', icon: '💻', label: 'GitHub' },
    { path: '/news', icon: '📰', label: 'News' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button 
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className={isOpen ? '' : 'hidden'}>InsightHub</h2>
          {!isOpen && <div className="logo-icon">IH</div>}
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                isActive ? 'nav-item active' : 'nav-item'
              }
              title={!isOpen ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className={`nav-label ${isOpen ? '' : 'hidden'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
