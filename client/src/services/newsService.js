import axios from 'axios'

// Using GNews API - free tier available
const GNEWS_API = 'https://gnews.io/api/v4'
const API_KEY = 'your_api_key_here' // User will need to get their own key

// Backup: Using NewsData.io API
const NEWSDATA_API = 'https://newsdata.io/api/1'

// For demo purposes, we'll use a mock news feed
export const fetchNews = async (category = 'general', country = 'us') => {
  try {
    // Using mediastack API (free tier)
    const response = await axios.get(`http://api.mediastack.com/v1/news`, {
      params: {
        access_key: 'demo', // This will fail, so we'll use mock data
        countries: country,
        categories: category,
        limit: 20
      }
    })

    return response.data.data
  } catch (error) {
    console.log('Using mock news data for demo')
    // Return mock data for demo
    return getMockNews()
  }
}

const getMockNews = () => {
  return [
    {
      title: 'Tech Giants Announce New AI Initiatives',
      description: 'Major technology companies unveil groundbreaking artificial intelligence projects aimed at transforming various industries.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      url: 'https://example.com/article1',
      source: 'Tech News Daily',
      publishedAt: new Date().toISOString(),
      category: 'technology'
    },
    {
      title: 'Global Markets Show Strong Recovery',
      description: 'Stock markets worldwide experience significant gains as economic indicators point to sustained growth.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      url: 'https://example.com/article2',
      source: 'Financial Times',
      publishedAt: new Date().toISOString(),
      category: 'business'
    },
    {
      title: 'Breakthrough in Renewable Energy Storage',
      description: 'Scientists develop new battery technology that could revolutionize how we store and use renewable energy.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      url: 'https://example.com/article3',
      source: 'Science Today',
      publishedAt: new Date().toISOString(),
      category: 'science'
    },
    {
      title: 'International Climate Summit Reaches Key Agreement',
      description: 'World leaders commit to ambitious new targets for reducing carbon emissions and combating climate change.',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400',
      url: 'https://example.com/article4',
      source: 'World News',
      publishedAt: new Date().toISOString(),
      category: 'environment'
    },
    {
      title: 'New Study Reveals Health Benefits of Mediterranean Diet',
      description: 'Research shows significant improvements in cardiovascular health and longevity among those following Mediterranean eating patterns.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      url: 'https://example.com/article5',
      source: 'Health Magazine',
      publishedAt: new Date().toISOString(),
      category: 'health'
    },
    {
      title: 'Space Agency Announces Mars Mission Timeline',
      description: 'Detailed plans revealed for upcoming crewed mission to Mars, including launch dates and mission objectives.',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400',
      url: 'https://example.com/article6',
      source: 'Space News',
      publishedAt: new Date().toISOString(),
      category: 'science'
    },
    {
      title: 'Major Sports Championship Final Draws Record Viewers',
      description: 'Historic match breaks viewership records as millions tune in to watch the thrilling championship finale.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      url: 'https://example.com/article7',
      source: 'Sports Network',
      publishedAt: new Date().toISOString(),
      category: 'sports'
    },
    {
      title: 'Film Festival Announces Award Winners',
      description: 'Prestigious international film festival celebrates outstanding achievements in cinema with star-studded ceremony.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      url: 'https://example.com/article8',
      source: 'Entertainment Weekly',
      publishedAt: new Date().toISOString(),
      category: 'entertainment'
    },
    {
      title: 'Education Reform Initiative Launches Nationwide',
      description: 'New program aims to modernize curriculum and improve access to quality education for students across the country.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      url: 'https://example.com/article9',
      source: 'Education Today',
      publishedAt: new Date().toISOString(),
      category: 'education'
    },
    {
      title: 'Cybersecurity Experts Warn of New Threats',
      description: 'Security researchers identify emerging cyber threats and provide recommendations for protecting digital assets.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      url: 'https://example.com/article10',
      source: 'Cyber Security News',
      publishedAt: new Date().toISOString(),
      category: 'technology'
    },
    {
      title: 'Automotive Industry Shifts to Electric Vehicles',
      description: 'Major car manufacturers announce plans to transition entire lineups to electric power within the next decade.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400',
      url: 'https://example.com/article11',
      source: 'Auto News',
      publishedAt: new Date().toISOString(),
      category: 'technology'
    },
    {
      title: 'Archaeological Discovery Sheds Light on Ancient Civilization',
      description: 'Researchers uncover remarkable artifacts that provide new insights into the daily life of ancient peoples.',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400',
      url: 'https://example.com/article12',
      source: 'History Channel',
      publishedAt: new Date().toISOString(),
      category: 'science'
    }
  ]
}
