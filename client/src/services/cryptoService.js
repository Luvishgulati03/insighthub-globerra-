import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

export const fetchTopCryptos = async (limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h,7d'
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch cryptocurrency data')
  }
}

export const fetchCryptoDetails = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: true,
        developer_data: false
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch cryptocurrency details')
  }
}

export const fetchTrendingCryptos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search/trending`)
    return response.data.coins
  } catch (error) {
    throw new Error('Failed to fetch trending cryptocurrencies')
  }
}

export const fetchGlobalData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/global`)
    return response.data.data
  } catch (error) {
    throw new Error('Failed to fetch global crypto data')
  }
}
