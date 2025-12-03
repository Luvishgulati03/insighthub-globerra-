import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Weather from './pages/Weather'
import Crypto from './pages/Crypto'
import Countries from './pages/Countries'
import CountryDetail from './pages/CountryDetail'
import GitHub from './pages/GitHub'
import News from './pages/News'
import Settings from './pages/Settings'
import './styles/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="weather" element={<Weather />} />
          <Route path="crypto" element={<Crypto />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:code" element={<CountryDetail />} />
          <Route path="github" element={<GitHub />} />
          <Route path="news" element={<News />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
