# 🎬 Movie Explorer

A modern, responsive web application for discovering and exploring movies and TV shows. Built with React, Tailwind CSS, and powered by The Movie Database (TMDb) API.

## ✨ Features

### 🏠 **Home Page**
- **Hero Section**: Beautiful landing page with search functionality
- **Trending Movies**: Display top 9 trending movies of the week
- **Trending TV Shows**: Display top 9 trending TV shows of the week
- **About Us Section**: Feature showcase and technology stack information
- **Dark/Light Theme**: Toggle between light and dark modes

### 🔍 **Search Functionality**
- **Real-time Search**: Search through millions of movies and TV shows
- **Instant Results**: Get results as you type
- **Filtered Results**: Only shows movies and TV shows
- **Result Counter**: Shows number of search results found

### 🎭 **Movie/TV Show Details**
- **Hero Section**: Large backdrop image with movie information overlay
- **Comprehensive Info**: Title, rating, release date, runtime, genres, overview
- **Cast Section**: Top 10 cast members with photos and character names
- **Videos Section**: Embedded YouTube trailers and videos
- **Similar Content**: Recommendations for similar movies/TV shows
- **Production Details**: Budget, revenue, production companies, status

### ❤️ **Favorites System**
- **Add/Remove Favorites**: Save your favorite movies and TV shows
- **Local Storage**: Favorites persist across browser sessions
- **Favorites Page**: Dedicated page to view all saved favorites
- **Visual Indicators**: Clear buttons to add/remove from favorites

### 🎨 **User Interface**
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: Graceful error messages and fallback states

## 🛠️ Technology Stack

### **Frontend**
- **React 19**: Latest React with modern hooks and features
- **Vite**: Fast build tool and development server
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **React Router DOM**: Client-side routing

### **API & Data**
- **TMDb API**: The Movie Database API for comprehensive movie/TV data
- **Local Storage**: Browser storage for favorites and theme preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Movie Explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app should now be running!

## 📱 Usage Guide

### **Searching for Content**
1. Use the search bar in the header
2. Type any movie or TV show name (e.g., "Dangal", "Breaking Bad")
3. Press Enter or click the search icon
4. Browse through the results

### **Viewing Details**
1. Click on any movie or TV show card
2. Explore the detailed information page
3. View cast, videos, and similar content
4. Add to favorites if desired

### **Managing Favorites**
1. Click "Add Favorite" on any movie/TV show
2. Visit the "Favorites" page to see all saved items
3. Click "Remove Favorite" to remove items

### **Theme Toggle**
1. Click the sun/moon icon in the header
2. Switch between light and dark themes
3. Your preference is automatically saved

## 🏗️ Project Structure

```
Movie Explorer/
├── src/
│   ├── api/
│   │   └── tmdb.js              # TMDb API functions
│   ├── components/
│   │   ├── Header.jsx           # Navigation and search
│   │   ├── Footer.jsx           # Site footer
│   │   ├── MovieCard.jsx        # Individual movie/TV card
│   │   ├── MovieList.jsx        # Grid of movie cards
│   │   └── Favorites.jsx        # Favorites page component
│   ├── pages/
│   │   ├── Home.jsx             # Main home page
│   │   └── MovieDetail.jsx      # Detailed movie/TV page
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # This file
```

## 🔧 API Configuration

The app uses TMDb API with the following key: `82a978b03399a32ddb11dfddacfa028c`

### **API Endpoints Used**
- **Search**: `/search/multi` - Search movies and TV shows
- **Trending Movies**: `/trending/movie/week` - Get trending movies
- **Trending TV**: `/trending/tv/week` - Get trending TV shows
- **Movie Details**: `/movie/{id}` - Get detailed movie information
- **TV Details**: `/tv/{id}` - Get detailed TV show information

## 🎨 Design Features

### **Color Scheme**
- **Primary**: Indigo to Purple gradient
- **Light Mode**: Clean white backgrounds with gray accents
- **Dark Mode**: Dark gray backgrounds with light text

### **Responsive Design**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **TMDb**: For providing comprehensive movie and TV show data
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework

---

**Made with ❤️ using React, Tailwind CSS, and TMDb API**
