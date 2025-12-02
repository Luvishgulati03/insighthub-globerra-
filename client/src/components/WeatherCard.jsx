import React from 'react'
import '../styles/WeatherCard.css'

const WeatherCard = ({ data, onClick }) => {
  const { temp, feels_like, humidity, pressure } = data.main
  const { description, icon } = data.weather[0]
  const { speed } = data.wind
  const cityName = data.name
  const country = data.sys.country

  // Format values properly
  const formattedTemp = Math.round(temp)
  const formattedFeelsLike = Math.round(feels_like)
  const formattedHumidity = Math.round(humidity)
  const formattedPressure = Math.round(pressure)
  const formattedWindSpeed = typeof speed === 'number' ? speed.toFixed(1) : speed

  return (
    <div className="weather-card" onClick={onClick}>
      <div className="weather-header">
        <h2>{cityName}, {country}</h2>
        <p className="weather-description">{description}</p>
      </div>
      
      <div className="weather-main">
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="weather-icon"
        />
        <div className="temperature">
          <span className="temp-value">{formattedTemp}°C</span>
          <span className="feels-like">Feels like {formattedFeelsLike}°C</span>
        </div>
      </div>

      <div className="weather-details">
        <DetailItem icon="💧" label="Humidity" value={`${formattedHumidity}%`} />
        <DetailItem icon="🌪️" label="Wind Speed" value={`${formattedWindSpeed} m/s`} />
        <DetailItem icon="🔽" label="Pressure" value={`${formattedPressure} hPa`} />
      </div>

      <div className="weather-card-hint">
        Click for more details →
      </div>
    </div>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <div className="detail-item">
    <span className="detail-icon">{icon}</span>
    <div className="detail-info">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  </div>
)

export default WeatherCard
