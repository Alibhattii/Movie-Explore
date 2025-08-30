import MovieCard from './MovieCard'

export default function MovieList({ items, favorites, onFavoriteToggle }) {
  const favoriteIds = new Set(favorites?.map((f) => `${f.media_type || (f.title ? 'movie' : 'tv')}-${f.id}`))

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items?.map((item) => {
        const key = `${item.media_type || (item.title ? 'movie' : 'tv')}-${item.id}`
        return (
          <MovieCard
            key={key}
            item={item}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favoriteIds.has(key)}
          />
        )
      })}
    </div>
  )
}


