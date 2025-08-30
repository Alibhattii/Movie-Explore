import { Link } from 'react-router-dom'
import { imageBaseUrl } from '../api/tmdb'

export default function MovieCard({ item, onFavoriteToggle, isFavorite }) {
  const isMovie = item.media_type ? item.media_type === 'movie' : Boolean(item.title)
  const title = isMovie ? item.title : item.name
  const date = isMovie ? item.release_date : item.first_air_date
  const rating = item.vote_average
  const poster = imageBaseUrl(item.poster_path)
  const detailPath = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`

  return (
    <div className="group bg-white dark:bg-gray-800/90 ring-1 ring-gray-200/70 dark:ring-gray-700/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <Link to={detailPath} className="block">
          {poster ? (
            <img src={poster} alt={title} className="w-full h-64 object-cover" />
          ) : (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 grid place-items-center text-gray-500">No Image</div>
          )}
        </Link>
        <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-black/70 text-white">{(isMovie ? 'Movie' : 'TV')}</div>
        <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-yellow-500/90 text-black font-semibold">⭐ {rating?.toFixed?.(1) ?? rating ?? '—'}</div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition">{title}</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{date || '—'}</p>
        {onFavoriteToggle && (
          <button
            onClick={() => onFavoriteToggle(item)}
            className={`mt-3 w-full px-3 py-1.5 rounded-md text-sm font-medium shadow-sm ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </button>
        )}
      </div>
    </div>
  )
}


