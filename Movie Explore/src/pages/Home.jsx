import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMulti, fetchTrendingMovies, fetchTrendingTV } from '../api/tmdb'
import MovieList from '../components/MovieList'

export default function Home({ favorites, onFavoriteToggle }) {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTV, setTrendingTV] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)

  // Fetch trending content on component mount
  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingLoading(true)
      try {
        const [movies, tv] = await Promise.all([
          fetchTrendingMovies(1),
          fetchTrendingTV(1)
        ])
        setTrendingMovies(movies.slice(0, 9)) // Get top 9 movies
        setTrendingTV(tv.slice(0, 9)) // Get top 9 TV shows
      } catch (error) {
        console.error('Error fetching trending content:', error)
      } finally {
        setTrendingLoading(false)
      }
    }
    fetchTrending()
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!query) { setResults([]); return }
      setLoading(true)
      try {
        const data = await searchMulti(query)
        if (!cancelled) setResults(data.filter((i) => i.media_type === 'movie' || i.media_type === 'tv'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [query])

  const empty = !loading && query && results.length === 0
  const intro = !query

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {intro && (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-6xl">🎬</span>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Movie Explorer
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover and explore your favorite movies and TV shows. Search through millions of titles and save your favorites for easy access.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Search Movies & TV Shows</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Save Favorites</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Get Detailed Info</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Movies Section */}
      {intro && !trendingLoading && trendingMovies.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">🔥 Trending Movies</h2>
            <p className="text-gray-600 dark:text-gray-400">The most popular movies this week</p>
          </div>
          <MovieList items={trendingMovies} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
        </div>
      )}

      {/* Trending TV Shows Section */}
      {intro && !trendingLoading && trendingTV.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">📺 Trending TV Shows</h2>
            <p className="text-gray-600 dark:text-gray-400">The most popular TV shows this week</p>
          </div>
          <MovieList items={trendingTV} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
        </div>
      )}

      {/* Loading for trending content */}
      {intro && trendingLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300">Loading trending content...</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300">Searching...</span>
            </div>
          </div>
        )}
        
        {empty && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400">No movies or TV shows found for "{query}". Try a different search term.</p>
          </div>
        )}
        
        {!intro && !loading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Search Results for "{query}"
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </span>
            </div>
            <MovieList items={results} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
          </div>
        )}
      </div>

      {/* About Us Section */}
      {intro && (
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">About Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Movie Explorer is your ultimate destination for discovering and exploring movies and TV shows from around the world.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Smart Search</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Search through millions of movies and TV shows with instant results and detailed information.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Save Favorites</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create your personal collection by saving your favorite movies and TV shows for easy access.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Detailed Info</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get comprehensive details including ratings, release dates, genres, and plot summaries.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Responsive Design</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enjoy a seamless experience across all devices with our mobile-first responsive design.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Dark Mode</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Switch between light and dark themes for comfortable viewing in any environment.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Local Storage</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your favorites are saved locally, so they persist even when you close the browser.
                </p>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Technology Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">React 19</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Modern UI library for building interactive interfaces</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Tailwind CSS</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Utility-first CSS framework for rapid UI development</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">TMDb API</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive movie and TV show database</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


