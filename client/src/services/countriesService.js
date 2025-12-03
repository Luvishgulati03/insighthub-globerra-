import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v2'

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
      timeout: 15000
    })
    
    // Transform v2 data to match our component structure
    return response.data.map(country => ({
      name: { common: country.name, official: country.name },
      capital: country.capital ? [country.capital] : [],
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      flags: { svg: country.flag, png: country.flag },
      cca3: country.alpha3Code,
      languages: country.languages ? Object.fromEntries(
        country.languages.map((lang, i) => [`lang${i}`, lang.name])
      ) : {},
      currencies: country.currencies ? Object.fromEntries(
        country.currencies.map(curr => [curr.code, { name: curr.name, symbol: curr.symbol }])
      ) : {},
      borders: country.borders || [],
      continents: [country.region],
      landlocked: country.landlocked || false,
      unMember: true,
      independent: country.independent || true,
      car: { side: 'right' },
      idd: { root: '', suffixes: [] },
      timezones: country.timezones || [],
      area: country.area || 0,
      maps: { googleMaps: `https://www.google.com/maps/place/${country.name}` }
    }))
  } catch (error) {
    console.error('Countries API Error:', error)
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection.')
    } else if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`)
    } else if (error.request) {
      throw new Error('Network error. Please check your internet connection.')
    } else {
      throw new Error('Failed to fetch countries data. Please try again later.')
    }
  }
}

export const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`)
    const country = response.data[0]
    
    return {
      name: { common: country.name, official: country.name },
      capital: country.capital ? [country.capital] : [],
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      flags: { svg: country.flag, png: country.flag },
      cca3: country.alpha3Code,
      languages: country.languages ? Object.fromEntries(
        country.languages.map((lang, i) => [`lang${i}`, lang.name])
      ) : {},
      currencies: country.currencies ? Object.fromEntries(
        country.currencies.map(curr => [curr.code, { name: curr.name, symbol: curr.symbol }])
      ) : {},
      borders: country.borders || [],
      continents: [country.region],
      landlocked: country.landlocked || false,
      unMember: true,
      independent: country.independent || true,
      car: { side: 'right' },
      idd: { root: '', suffixes: [] },
      timezones: country.timezones || [],
      area: country.area || 0,
      maps: { googleMaps: `https://www.google.com/maps/place/${country.name}` }
    }
  } catch (error) {
    throw new Error('Country not found')
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`)
    const country = response.data
    
    return [{
      name: { common: country.name, official: country.name },
      capital: country.capital ? [country.capital] : [],
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      flags: { svg: country.flag, png: country.flag },
      cca3: country.alpha3Code,
      languages: country.languages ? Object.fromEntries(
        country.languages.map((lang, i) => [`lang${i}`, lang.name])
      ) : {},
      currencies: country.currencies ? Object.fromEntries(
        country.currencies.map(curr => [curr.code, { name: curr.name, symbol: curr.symbol }])
      ) : {},
      borders: country.borders || [],
      continents: [country.region],
      landlocked: country.landlocked || false,
      unMember: true,
      independent: country.independent || true,
      car: { side: 'right' },
      idd: { root: '', suffixes: [] },
      timezones: country.timezones || [],
      area: country.area || 0,
      maps: { googleMaps: `https://www.google.com/maps/place/${country.name}` }
    }]
  } catch (error) {
    throw new Error('Country not found')
  }
}
