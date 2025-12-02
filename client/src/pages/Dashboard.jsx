import React from 'react'
import Card from '../components/Card'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12,345', change: '+12%', icon: '👥' },
    { title: 'Revenue', value: '$45,678', change: '+8%', icon: '💰' },
    { title: 'Active Projects', value: '23', change: '+3', icon: '📁' },
    { title: 'Completion Rate', value: '94%', change: '+2%', icon: '✅' }
  ]

  return (
    <div className="dashboard">
      <h2 className="page-heading">Dashboard Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content">
        <Card title="Recent Activity">
          <ActivityList />
        </Card>
        
        <Card title="Quick Stats">
          <QuickStats />
        </Card>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, change, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
      <span className="stat-change positive">{change}</span>
    </div>
  </div>
)

const ActivityList = () => (
  <ul className="activity-list">
    <li>New user registered - 2 minutes ago</li>
    <li>Project completed - 15 minutes ago</li>
    <li>Report generated - 1 hour ago</li>
    <li>System update - 3 hours ago</li>
  </ul>
)

const QuickStats = () => (
  <div className="quick-stats">
    <p>📊 Total Insights: 1,234</p>
    <p>🔄 Sync Status: Active</p>
    <p>⚡ Performance: Excellent</p>
  </div>
)

export default Dashboard
