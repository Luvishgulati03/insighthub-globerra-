import axios from 'axios'

const API_KEY = 'YOUR_API_KEY_HERE' // Replace with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// For demo purposes, using a free alternative API that doesn't require key
const DEMO_API_URL = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeatherData = async (city) => {
  try {
    // Using OpenWeather API (requires API key)
    // Uncomment below and add your API key to use OpenWeather
    /*
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })
    return response.data
    */

    // Using wttr.in as a free alternative (no API key needed)
    const response = await axios.get(`https://wttr.in/${city}?format=j1`)
    
    // Transform the data to match OpenWeather format
    const data = response.data
    const current = data.current_condition[0]
    
    return {
      name: city,
      sys: { country: data.nearest_area[0].country[0].value },
      main: {
        temp: parseFloat(current.temp_C),
        feels_like: parseFloat(current.FeelsLikeC),
        humidity: parseFloat(current.humidity),
        pressure: parseFloat(current.pressure)
      },
      weather: [{
        description: current.weatherDesc[0].value,
        icon: getWeatherIcon(current.weatherCode)
      }],
      wind: {
        speed: Math.round(parseFloat(current.windspeedKmph) / 3.6 * 10) / 10 // Convert to m/s and round to 1 decimal
      }
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch weather data: ${error.response.data.message || 'City not found'}`)
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.')
    } else {
      throw new Error('Failed to fetch weather data. Please try again.')
    }
  }
}

// Helper function to map weather codes to OpenWeather icon codes
const getWeatherIcon = (code) => {
  const iconMap = {
    '113': '01d', // Sunny
    '116': '02d', // Partly cloudy
    '119': '03d', // Cloudy
    '122': '04d', // Overcast
    '143': '50d', // Mist
    '176': '10d', // Patchy rain
    '179': '13d', // Patchy snow
    '200': '11d', // Thundery
    '227': '13d', // Blizzard
    '230': '13d', // Blizzard
    '248': '50d', // Fog
    '260': '50d', // Freezing fog
    '263': '09d', // Patchy light drizzle
    '266': '09d', // Light drizzle
    '281': '09d', // Freezing drizzle
    '284': '09d', // Heavy freezing drizzle
    '293': '10d', // Patchy light rain
    '296': '10d', // Light rain
    '299': '10d', // Moderate rain
    '302': '10d', // Moderate rain
    '305': '10d', // Heavy rain
    '308': '10d', // Heavy rain
    '311': '09d', // Light freezing rain
    '314': '09d', // Moderate or heavy freezing rain
    '317': '13d', // Light sleet
    '320': '13d', // Moderate or heavy sleet
    '323': '13d', // Patchy light snow
    '326': '13d', // Light snow
    '329': '13d', // Patchy moderate snow
    '332': '13d', // Moderate snow
    '335': '13d', // Patchy heavy snow
    '338': '13d', // Heavy snow
    '350': '13d', // Ice pellets
    '353': '10d', // Light rain shower
    '356': '10d', // Moderate or heavy rain shower
    '359': '10d', // Torrential rain shower
    '362': '13d', // Light sleet showers
    '365': '13d', // Moderate or heavy sleet showers
    '368': '13d', // Light snow showers
    '371': '13d', // Moderate or heavy snow showers
    '374': '13d', // Light showers of ice pellets
    '377': '13d', // Moderate or heavy showers of ice pellets
    '386': '11d', // Patchy light rain with thunder
    '389': '11d', // Moderate or heavy rain with thunder
    '392': '11d', // Patchy light snow with thunder
    '395': '11d'  // Moderate or heavy snow with thunder
  }
  
  return iconMap[code] || '01d'
}
