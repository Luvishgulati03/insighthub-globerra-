import React from 'react'
import '../styles/WeatherModal.css'

const WeatherModal = ({ data, onClose }) => {
  const { temp, feels_like, humidity, pressure, temp_min, temp_max } = data.main
  const { description, icon } = data.weather[0]
  const { speed, direction } = data.wind
  const cityName = data.name
  const country = data.sys.country
  const { sunrise, sunset } = data.sys

  const formattedTemp = Math.round(temp)
  const formattedFeelsLike = Math.round(feels_like)
  const formattedHumidity = Math.round(humidity)
  const formattedPressure = Math.round(pressure)
  const formattedWindSpeed = typeof speed === 'number' ? speed.toFixed(1) : speed
  const formattedTempMin = Math.round(temp_min)
  const formattedTempMax = Math.round(temp_max)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>{cityName}, {country}</h2>
          <p className="modal-description">{description}</p>
        </div>

        <div className="modal-main">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={description}
            className="modal-icon"
          />
          <div className="modal-temp">
            <span className="modal-temp-value">{formattedTemp}°C</span>
            <span className="modal-feels-like">Feels like {formattedFeelsLike}°C</span>
            <span className="modal-temp-range">
              H: {formattedTempMax}° L: {formattedTempMin}°
            </span>
          </div>
        </div>

        <div className="modal-details-grid">
          <DetailCard icon="💧" label="Humidity" value={`${formattedHumidity}%`} />
          <DetailCard icon="🌪️" label="Wind Speed" value={`${formattedWindSpeed} m/s`} />
          <DetailCard icon="🔽" label="Pressure" value={`${formattedPressure} hPa`} />
          <DetailCard icon="🧭" label="Wind Direction" value={direction} />
          <DetailCard icon="☁️" label="Cloud Cover" value={`${data.clouds.all}%`} />
          <DetailCard icon="👁️" label="Visibility" value={`${data.visibility} km`} />
          <DetailCard icon="☀️" label="UV Index" value={data.uv} />
          <DetailCard icon="🌧️" label="Precipitation" value={`${data.precipitation} mm`} />
          <DetailCard icon="🌅" label="Sunrise" value={sunrise} />
          <DetailCard icon="🌇" label="Sunset" value={sunset} />
        </div>
      </div>
    </div>
  )
}

const DetailCard = ({ icon, label, value }) => (
  <div className="modal-detail-card">
    <span className="modal-detail-icon">{icon}</span>
    <div className="modal-detail-info">
      <span className="modal-detail-label">{label}</span>
      <span className="modal-detail-value">{value}</span>
    </div>
  </div>
)

export default WeatherModal
