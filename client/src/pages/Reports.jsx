import React from 'react'
import Card from '../components/Card'
import '../styles/Reports.css'

const Reports = () => {
  const reports = [
    { name: 'Monthly Sales Report', date: '2024-11-30', status: 'Completed' },
    { name: 'User Activity Report', date: '2024-11-29', status: 'Completed' },
    { name: 'Performance Analysis', date: '2024-11-28', status: 'In Progress' },
    { name: 'Financial Summary', date: '2024-11-27', status: 'Completed' }
  ]

  return (
    <div className="reports">
      <h2 className="page-heading">Reports</h2>
      
      <div className="reports-actions">
        <button className="btn-primary">📄 Generate New Report</button>
        <button className="btn-secondary">📥 Export All</button>
      </div>

      <Card title="Recent Reports">
        <ReportsList reports={reports} />
      </Card>

      <div className="reports-grid">
        <Card title="Report Categories">
          <CategoryList />
        </Card>
        
        <Card title="Scheduled Reports">
          <ScheduledList />
        </Card>
      </div>
    </div>
  )
}

const ReportsList = ({ reports }) => (
  <div className="reports-list">
    {reports.map((report, index) => (
      <ReportItem key={index} {...report} />
    ))}
  </div>
)

const ReportItem = ({ name, date, status }) => (
  <div className="report-item">
    <div className="report-info">
      <h4>{name}</h4>
      <p className="report-date">{date}</p>
    </div>
    <span className={`report-status ${status.toLowerCase().replace(' ', '-')}`}>
      {status}
    </span>
    <button className="btn-icon">📥</button>
  </div>
)

const CategoryList = () => (
  <ul className="category-list">
    <li>📊 Sales & Revenue</li>
    <li>👥 User Analytics</li>
    <li>💼 Business Intelligence</li>
    <li>🔧 System Performance</li>
  </ul>
)

const ScheduledList = () => (
  <ul className="scheduled-list">
    <li>Weekly Summary - Every Monday</li>
    <li>Monthly Report - 1st of each month</li>
    <li>Quarterly Review - Every 3 months</li>
  </ul>
)

export default Reports
