import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const [params] = useSearchParams()
  const initial = params.get('q') || ''
  const [query, setQuery] = useState(initial)
  const [isDark, setIsDark] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initial)
  }, [initial])

  // Simple theme initialization
  useEffect(() => {
    try {
      const theme = localStorage.getItem('theme')
      console.log('Current theme from localStorage:', theme)
      
      if (theme === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
        console.log('Applied dark theme')
      } else {
        setIsDark(false)
        document.documentElement.classList.remove('dark')
        console.log('Applied light theme')
      }
    } catch (error) {
      console.error('Error initializing theme:', error)
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const target = query.trim()
    navigate(target ? `/?q=${encodeURIComponent(target)}` : '/')
  }

  const toggleTheme = () => {
    try {
      const newTheme = !isDark
      console.log('Toggling theme from', isDark, 'to', newTheme)
      
      setIsDark(newTheme)
      
      if (newTheme) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        console.log('Switched to dark theme')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        console.log('Switched to light theme')
      }
    } catch (error) {
      console.error('Error toggling theme:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <span className="text-2xl">🎬</span>
              Movie Explorer
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <Link to="/favorites" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Favorites</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <form onSubmit={onSubmit} className="relative hidden sm:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies or TV shows..."
                className="w-64 lg:w-80 rounded-full border border-gray-300/70 dark:border-gray-600/70 bg-white dark:bg-gray-800 px-4 py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile search */}
        <form onSubmit={onSubmit} className="mt-3 sm:hidden">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies or TV shows..."
              className="w-full rounded-full border border-gray-300/70 dark:border-gray-600/70 bg-white dark:bg-gray-800 px-4 py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </header>
  )
}


