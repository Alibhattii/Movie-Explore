import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './components/Favorites'

const FAVORITES_KEY = 'movie_explorer_favorites_v1'

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (item) => {
    const key = `${item.media_type || (item.title ? 'movie' : 'tv')}-${item.id}`
    setFavorites((prev) => {
      const exists = prev.some((i) => `${i.media_type || (i.title ? 'movie' : 'tv')}-${i.id}` === key)
      if (exists) return prev.filter((i) => `${i.media_type || (i.title ? 'movie' : 'tv')}-${i.id}` !== key)
      return [{ ...item }, ...prev]
    })
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home favorites={favorites} onFavoriteToggle={toggleFavorite} />} />
            <Route path=":type/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} onFavoriteToggle={toggleFavorite} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
