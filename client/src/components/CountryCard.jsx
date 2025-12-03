import React from 'react'
import '../styles/CountryCard.css'

const CountryCard = ({ country, onClick }) => {
  const population = country.population.toLocaleString()
  const region = country.region
  const capital = country.capital?.[0] || 'N/A'

  return (
    <div className="country-card" onClick={onClick}>
      <div className="country-flag">
        <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      </div>
      
      <div className="country-content">
        <h3 className="country-name">{country.name.common}</h3>
        
        <div className="country-details">
          <DetailRow icon="🌍" label="Region" value={region} />
          <DetailRow icon="🏙️" label="Capital" value={capital} />
          <DetailRow icon="👥" label="Population" value={population} />
        </div>
      </div>
    </div>
  )
}

const DetailRow = ({ icon, label, value }) => (
  <div className="detail-row">
    <span className="detail-icon">{icon}</span>
    <span className="detail-text">
      <strong>{label}:</strong> {value}
    </span>
  </div>
)

export default CountryCard
