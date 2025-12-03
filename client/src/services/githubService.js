import axios from 'axios'

const GITHUB_API = 'https://api.github.com'

export const fetchGitHubProfile = async (username) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`${GITHUB_API}/users/${username}`),
      axios.get(`${GITHUB_API}/users/${username}/repos?sort=stars&per_page=100`)
    ])

    const user = userRes.data
    const repos = reposRes.data

    // Calculate language statistics
    const languageStats = {}
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
      }
    })

    // Get top repositories by stars
    const topRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    return {
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        location: user.location,
        company: user.company,
        blog: user.blog,
        email: user.email,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        publicGists: user.public_gists,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        htmlUrl: user.html_url
      },
      repos: {
        total: repos.length,
        totalStars,
        topRepos: topRepos.map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
          updatedAt: repo.updated_at
        })),
        languages: languageStats
      }
    }
  } catch (error) {
    console.error('GitHub API Error:', error)
    if (error.response?.status === 404) {
      throw new Error('User not found')
    } else if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.')
    } else {
      throw new Error('Failed to fetch GitHub profile')
    }
  }
}
