import axios from 'axios'

// Using CountriesNow API - CORS-friendly, no proxy needed
const COUNTRIES_NOW_API = 'https://countriesnow.space/api/v0.1'

export const fetchAllCountries = async () => {
  try {
    // Fetch countries and flags
    const [countriesRes, flagsRes] = await Promise.all([
      axios.get(`${COUNTRIES_NOW_API}/countries/capital`),
      axios.get(`${COUNTRIES_NOW_API}/countries/flag/images`)
    ])

    const countries = countriesRes.data.data
    const flags = flagsRes.data.data

    // Merge all data
    return countries.map((country, index) => {
      const flagData = flags.find(f => f.name === country.name)

      return {
        name: { common: country.name, official: country.name },
        capital: country.capital ? [country.capital] : [],
        region: getRegion(country.name),
        subregion: '',
        population: Math.floor(Math.random() * 100000000), // Random for demo
        flags: { 
          svg: flagData?.flag || '', 
          png: flagData?.flag || '' 
        },
        cca3: country.iso3 || `${country.name.substring(0, 3).toUpperCase()}_${index}`,
        languages: {},
        currencies: {},
        borders: [],
        continents: [getRegion(country.name)],
        landlocked: false,
        unMember: true,
        independent: true,
        car: { side: 'right' },
        idd: { root: '', suffixes: [] },
        timezones: [],
        area: 0,
        maps: { googleMaps: `https://www.google.com/maps/place/${country.name}` }
      }
    })
  } catch (error) {
    console.error('Countries API Error:', error)
    throw new Error('Failed to fetch countries data. Please try again later.')
  }
}

// Helper function to determine region based on country name
const getRegion = (countryName) => {
  const regions = {
    'Americas': ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname', 'French Guiana', 'Costa Rica', 'Panama', 'Nicaragua', 'Honduras', 'El Salvador', 'Guatemala', 'Belize', 'Jamaica', 'Haiti', 'Dominican Republic', 'Cuba', 'Bahamas', 'Trinidad and Tobago', 'Barbados', 'Saint Lucia', 'Grenada', 'Saint Vincent and the Grenadines', 'Antigua and Barbuda', 'Dominica', 'Saint Kitts and Nevis'],
    'Europe': ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Poland', 'Romania', 'Netherlands', 'Belgium', 'Greece', 'Portugal', 'Czech Republic', 'Hungary', 'Sweden', 'Austria', 'Bulgaria', 'Denmark', 'Finland', 'Slovakia', 'Norway', 'Ireland', 'Croatia', 'Bosnia and Herzegovina', 'Albania', 'Lithuania', 'Slovenia', 'Latvia', 'Estonia', 'Montenegro', 'Luxembourg', 'Malta', 'Iceland', 'Andorra', 'Monaco', 'Liechtenstein', 'San Marino', 'Vatican City', 'Switzerland', 'Serbia', 'North Macedonia', 'Moldova', 'Belarus', 'Ukraine', 'Russia'],
    'Asia': ['China', 'India', 'Indonesia', 'Pakistan', 'Bangladesh', 'Japan', 'Philippines', 'Vietnam', 'Turkey', 'Iran', 'Thailand', 'Myanmar', 'South Korea', 'Iraq', 'Afghanistan', 'Saudi Arabia', 'Uzbekistan', 'Malaysia', 'Nepal', 'Yemen', 'North Korea', 'Sri Lanka', 'Kazakhstan', 'Syria', 'Cambodia', 'Jordan', 'Azerbaijan', 'United Arab Emirates', 'Tajikistan', 'Israel', 'Laos', 'Lebanon', 'Singapore', 'Oman', 'Kuwait', 'Georgia', 'Mongolia', 'Armenia', 'Qatar', 'Bahrain', 'East Timor', 'Cyprus', 'Bhutan', 'Maldives', 'Brunei', 'Palestine'],
    'Africa': ['Nigeria', 'Ethiopia', 'Egypt', 'Democratic Republic of the Congo', 'Tanzania', 'South Africa', 'Kenya', 'Uganda', 'Algeria', 'Sudan', 'Morocco', 'Angola', 'Ghana', 'Mozambique', 'Madagascar', 'Cameroon', 'Ivory Coast', 'Niger', 'Burkina Faso', 'Mali', 'Malawi', 'Zambia', 'Somalia', 'Senegal', 'Chad', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Tunisia', 'Burundi', 'South Sudan', 'Togo', 'Sierra Leone', 'Libya', 'Liberia', 'Central African Republic', 'Mauritania', 'Eritrea', 'Gambia', 'Botswana', 'Namibia', 'Gabon', 'Lesotho', 'Guinea-Bissau', 'Equatorial Guinea', 'Mauritius', 'Eswatini', 'Djibouti', 'Comoros', 'Cape Verde', 'Sao Tome and Principe', 'Seychelles'],
    'Oceania': ['Australia', 'Papua New Guinea', 'New Zealand', 'Fiji', 'Solomon Islands', 'Micronesia', 'Vanuatu', 'Samoa', 'Kiribati', 'Tonga', 'Palau', 'Marshall Islands', 'Tuvalu', 'Nauru']
  }

  for (const [region, countries] of Object.entries(regions)) {
    if (countries.some(c => countryName.includes(c) || c.includes(countryName))) {
      return region
    }
  }
  return 'Other'
}

export const fetchCountryByName = async (name) => {
  try {
    const countries = await fetchAllCountries()
    return countries.find(c => c.name.common.toLowerCase() === name.toLowerCase())
  } catch (error) {
    throw new Error('Country not found')
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const countries = await fetchAllCountries()
    return [countries.find(c => c.cca3 === code)]
  } catch (error) {
    throw new Error('Country not found')
  }
}
