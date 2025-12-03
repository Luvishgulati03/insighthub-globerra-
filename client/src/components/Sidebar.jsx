import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/reports', icon: '📄', label: 'Reports' },
    { path: '/weather', icon: '🌤️', label: 'Weather' },
    { path: '/crypto', icon: '₿', label: 'Crypto' },
    { path: '/countries', icon: '🌍', label: 'Countries' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>InsightHub</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
