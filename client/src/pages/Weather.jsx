import React, { useState, useEffect } from 'react'
import WeatherCard from '../components/WeatherCard'
import WeatherModal from '../components/WeatherModal'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchWeatherData } from '../services/weatherService'
import '../styles/Weather.css'

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('London')
  const [searchInput, setSearchInput] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadWeather(city)
  }, [city])

  const loadWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchWeatherData(cityName)
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setCity(searchInput.trim())
      setSearchInput('')
    }
  }

  const handleCardClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="weather-page">
      <h2 className="page-heading">Weather Information</h2>
      
      <SearchBar 
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearch}
      />

      <div className="weather-content">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weather && !loading && <WeatherCard data={weather} onClick={handleCardClick} />}
      </div>

      {weather && <ForecastInfo />}
      
      {showModal && weather && (
        <WeatherModal data={weather} onClose={handleCloseModal} />
      )}
    </div>
  )
}

const SearchBar = ({ value, onChange, onSubmit }) => (
  <form className="search-bar" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Enter city name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
    <button type="submit" className="search-btn">🔍 Search</button>
  </form>
)

const ForecastInfo = () => (
  <div className="forecast-info">
    <h3>📅 5-Day Forecast</h3>
    <p className="info-note">Extended forecast feature coming soon!</p>
  </div>
)

export default Weather
