import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const [params] = useSearchParams()
  const initial = params.get('q') || ''
  const [query, setQuery] = useState(initial)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initial)
  }, [initial])

  const onSubmit = (e) => {
    e.preventDefault()
    const target = query.trim()
    navigate(target ? `/?q=${encodeURIComponent(target)}` : '/')
    setIsMobileMenuOpen(false) // Close mobile menu after search
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <span className="text-2xl">🎬</span>
              <span className="hidden sm:inline">Movie Explorer</span>
              <span className="sm:hidden">ME</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/favorites" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Favorites</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <form onSubmit={onSubmit} className="relative hidden sm:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies or TV shows..."
                className="w-64 lg:w-80 rounded-full border border-gray-300/70 bg-white px-4 py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </nav>
          </div>
        )}
        
        {/* Mobile search */}
        <form onSubmit={onSubmit} className="mt-3 sm:hidden">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies or TV shows..."
              className="w-full rounded-full border border-gray-300/70 bg-white px-4 py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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


