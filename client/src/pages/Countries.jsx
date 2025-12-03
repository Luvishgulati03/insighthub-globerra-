import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchAllCountries } from '../services/countriesService'
import '../styles/Countries.css'

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [populationRange, setPopulationRange] = useState('All')
  const [hasLoaded, setHasLoaded] = useState(false)
  const navigate = useNavigate()

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const populationRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: '< 1M', min: 0, max: 1000000 },
    { label: '1M - 10M', min: 1000000, max: 10000000 },
    { label: '10M - 100M', min: 10000000, max: 100000000 },
    { label: '> 100M', min: 100000000, max: Infinity }
  ]

  // Don't auto-load on mount - wait for user to click load button

  useEffect(() => {
    filterCountries()
  }, [countries, searchTerm, selectedRegion, populationRange])

  const loadCountries = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchAllCountries()
      setCountries(data)
      setFilteredCountries(data)
      setHasLoaded(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filterCountries = () => {
    let filtered = [...countries]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by region
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }

    // Filter by population
    if (populationRange !== 'All') {
      const range = populationRanges.find(r => r.label === populationRange)
      filtered = filtered.filter(country =>
        country.population >= range.min && country.population < range.max
      )
    }

    setFilteredCountries(filtered)
  }

  const handleCountryClick = (country) => {
    navigate(`/countries/${country.cca3}`, { state: { country } })
  }

  return (
    <div className="countries-page">
      <h2 className="page-heading">Countries Explorer</h2>

      {!hasLoaded && !loading && !error && (
        <div className="welcome-section">
          <p className="welcome-text">
            Explore detailed information about countries around the world
          </p>
          <button onClick={loadCountries} className="load-btn">
            🌍 Load Countries Data
          </button>
          <p className="api-note">
            Note: Due to CORS restrictions in development, you may need to use a CORS proxy or browser extension.
            <br />
            Alternatively, this will work fine in production.
          </p>
        </div>
      )}

      {loading && <LoadingSpinner />}

      {error && (
        <div>
          <ErrorMessage message={error} />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={loadCountries} className="retry-btn">
              🔄 Retry
            </button>
          </div>
        </div>
      )}

      {hasLoaded && !loading && !error && (
        <>
          <div className="countries-filters">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={populationRange}
              onChange={(e) => setPopulationRange(e.target.value)}
              className="filter-select"
            >
              {populationRanges.map(range => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="countries-count">
            Showing {filteredCountries.length} of {countries.length} countries
          </div>

          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onClick={() => handleCountryClick(country)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Countries
