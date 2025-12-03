import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1'

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch countries data')
  }
}

export const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`)
    return response.data[0]
  } catch (error) {
    throw new Error('Country not found')
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`)
    return response.data
  } catch (error) {
    throw new Error('Country not found')
  }
}

export const fetchCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch countries by region')
  }
}
