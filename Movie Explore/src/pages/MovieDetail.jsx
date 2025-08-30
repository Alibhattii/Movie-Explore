import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieDetails, fetchTvDetails, imageBaseUrl } from '../api/tmdb'
import MovieList from '../components/MovieList'

export default function MovieDetail() {
  const { type, id } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      try {
        const result = type === 'tv' ? await fetchTvDetails(id) : await fetchMovieDetails(id)
        if (!cancelled) setData(result)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [type, id])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-300">Loading...</span>
        </div>
      </div>
    </div>
  )
  
  if (!data) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The movie or TV show you're looking for doesn't exist.</p>
      </div>
    </div>
  )

  const title = data.title || data.name
  const poster = imageBaseUrl(data.poster_path, 'w500')
  const backdrop = imageBaseUrl(data.backdrop_path, 'w1280')
  const date = data.release_date || data.first_air_date
  const rating = data.vote_average
  const genres = (data.genres || []).map((g) => g.name).join(', ')
  const runtime = data.runtime || data.episode_run_time?.[0]
  const status = data.status
  const cast = data.credits?.cast?.slice(0, 10) || []
  const similar = data.similar?.results?.slice(0, 6) || []
  const videos = data.videos?.results?.filter(v => v.site === 'YouTube')?.slice(0, 3) || []

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      {backdrop && (
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${backdrop})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {poster && (
                  <img src={poster} alt={title} className="w-48 h-72 rounded-lg shadow-2xl" />
                )}
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-4">{title}</h1>
                  <div className="flex items-center gap-4 text-lg mb-4">
                    <span>{date}</span>
                    <span className="text-yellow-400">⭐ {rating?.toFixed?.(1) ?? rating}</span>
                    {runtime && <span>{Math.floor(runtime / 60)}h {runtime % 60}m</span>}
                  </div>
                  {genres && <p className="text-gray-300 mb-4">{genres}</p>}
                  {data.overview && (
                    <p className="text-lg leading-relaxed max-w-2xl">{data.overview}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map((person) => (
                <div key={person.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  {person.profile_path ? (
                    <img 
                      src={imageBaseUrl(person.profile_path, 'w185')} 
                      alt={person.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{person.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.key} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    className="w-full h-48"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{video.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{video.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies/TV Shows */}
        {similar.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Similar {type === 'tv' ? 'TV Shows' : 'Movies'}
            </h2>
            <MovieList items={similar} />
          </div>
        )}

        {/* Additional Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Production Details</h3>
              <div className="space-y-2 text-sm">
                {status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="text-gray-900 dark:text-gray-100">{status}</span>
                  </div>
                )}
                {data.original_language && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Language:</span>
                    <span className="text-gray-900 dark:text-gray-100">{data.original_language.toUpperCase()}</span>
                  </div>
                )}
                {data.budget && data.budget > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                    <span className="text-gray-900 dark:text-gray-100">${(data.budget / 1000000).toFixed(1)}M</span>
                  </div>
                )}
                {data.revenue && data.revenue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                    <span className="text-gray-900 dark:text-gray-100">${(data.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Production Companies</h3>
              <div className="space-y-2 text-sm">
                {data.production_companies?.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path ? (
                      <img 
                        src={imageBaseUrl(company.logo_path, 'w92')} 
                        alt={company.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    )}
                    <span className="text-gray-900 dark:text-gray-100">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


