import React from 'react'
import Card from '../components/Card'
import '../styles/Analytics.css'

const Analytics = () => {
  return (
    <div className="analytics">
      <h2 className="page-heading">Analytics Dashboard</h2>
      
      <div className="analytics-grid">
        <Card title="User Growth">
          <ChartPlaceholder type="Line Chart" />
        </Card>
        
        <Card title="Traffic Sources">
          <ChartPlaceholder type="Pie Chart" />
        </Card>
        
        <Card title="Conversion Rate">
          <MetricDisplay value="3.45%" trend="up" />
        </Card>
        
        <Card title="Bounce Rate">
          <MetricDisplay value="42.3%" trend="down" />
        </Card>
      </div>

      <Card title="Detailed Metrics">
        <MetricsTable />
      </Card>
    </div>
  )
}

const ChartPlaceholder = ({ type }) => (
  <div className="chart-placeholder">
    <p>📊 {type}</p>
    <p className="chart-note">Chart visualization would go here</p>
  </div>
)

const MetricDisplay = ({ value, trend }) => (
  <div className="metric-display">
    <h3 className="metric-value">{value}</h3>
    <span className={`metric-trend ${trend}`}>
      {trend === 'up' ? '↗️ Increasing' : '↘️ Decreasing'}
    </span>
  </div>
)

const MetricsTable = () => (
  <table className="metrics-table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>Current</th>
        <th>Previous</th>
        <th>Change</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Page Views</td>
        <td>45,678</td>
        <td>42,123</td>
        <td className="positive">+8.4%</td>
      </tr>
      <tr>
        <td>Sessions</td>
        <td>12,345</td>
        <td>11,890</td>
        <td className="positive">+3.8%</td>
      </tr>
      <tr>
        <td>Avg. Duration</td>
        <td>3:45</td>
        <td>3:12</td>
        <td className="positive">+17.2%</td>
      </tr>
    </tbody>
  </table>
)

export default Analytics
