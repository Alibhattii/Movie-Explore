import MovieList from './MovieList'

export default function Favorites({ favorites, onFavoriteToggle }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Your Favorites</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {favorites.length === 0 
            ? "Start building your collection by searching and adding movies to your favorites."
            : `You have ${favorites.length} favorite${favorites.length !== 1 ? 's' : ''} saved.`
          }
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No favorites yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Your favorite movies and TV shows will appear here. Start exploring and add some titles to your collection!
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Start Searching
          </a>
        </div>
      ) : (
        <MovieList items={favorites} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
      )}
    </div>
  )
}


