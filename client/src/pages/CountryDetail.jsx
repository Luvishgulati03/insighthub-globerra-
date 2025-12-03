import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import Card from '../components/Card'
import { fetchCountryByCode } from '../services/countriesService'
import '../styles/CountryDetail.css'

const CountryDetail = () => {
  const { code } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [country, setCountry] = useState(location.state?.country || null)
  const [loading, setLoading] = useState(!country)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!country) {
      loadCountry()
    }
  }, [code])

  const loadCountry = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchCountryByCode(code)
      setCountry(data[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="country-detail-page">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="country-detail-page">
        <ErrorMessage message={error} />
        <button onClick={() => navigate('/countries')} className="back-btn">
          ← Back to Countries
        </button>
      </div>
    )
  }

  if (!country) return null

  const currencies = Object.values(country.currencies || {})
  const languages = Object.values(country.languages || {})
  const borders = country.borders || []

  return (
    <div className="country-detail-page">
      <button onClick={() => navigate('/countries')} className="back-btn">
        ← Back to Countries
      </button>

      <div className="country-detail-header">
        <div className="country-flag-large">
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        </div>
        <div className="country-header-info">
          <h1>{country.name.common}</h1>
          <p className="country-official-name">{country.name.official}</p>
        </div>
      </div>

      <div className="country-detail-grid">
        <Card title="General Information">
          <InfoGrid>
            <InfoItem label="Capital" value={country.capital?.[0] || 'N/A'} />
            <InfoItem label="Region" value={country.region} />
            <InfoItem label="Subregion" value={country.subregion || 'N/A'} />
            <InfoItem label="Population" value={country.population.toLocaleString()} />
            <InfoItem label="Area" value={`${country.area.toLocaleString()} km²`} />
            <InfoItem label="Timezones" value={country.timezones.join(', ')} />
          </InfoGrid>
        </Card>

        <Card title="Currencies">
          <div className="currencies-list">
            {currencies.map((currency, index) => (
              <div key={index} className="currency-item">
                <span className="currency-symbol">{currency.symbol}</span>
                <div>
                  <div className="currency-name">{currency.name}</div>
                  <div className="currency-code">{Object.keys(country.currencies)[index]}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Languages">
          <div className="languages-list">
            {languages.map((language, index) => (
              <span key={index} className="language-tag">{language}</span>
            ))}
          </div>
        </Card>

        <Card title="Additional Details">
          <InfoGrid>
            <InfoItem label="Continent" value={country.continents?.[0] || 'N/A'} />
            <InfoItem label="Landlocked" value={country.landlocked ? 'Yes' : 'No'} />
            <InfoItem label="UN Member" value={country.unMember ? 'Yes' : 'No'} />
            <InfoItem label="Independent" value={country.independent ? 'Yes' : 'No'} />
            <InfoItem label="Driving Side" value={country.car?.side || 'N/A'} />
            <InfoItem label="Calling Code" value={country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : 'N/A'} />
          </InfoGrid>
        </Card>
      </div>

      {borders.length > 0 && (
        <Card title={`Border Countries (${borders.length})`}>
          <div className="borders-list">
            {borders.map((border) => (
              <span key={border} className="border-tag">{border}</span>
            ))}
          </div>
        </Card>
      )}

      {country.maps?.googleMaps && (
        <Card title="Location">
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            🗺️ View on Google Maps
          </a>
        </Card>
      )}
    </div>
  )
}

const InfoGrid = ({ children }) => (
  <div className="info-grid">{children}</div>
)

const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
)

export default CountryDetail
