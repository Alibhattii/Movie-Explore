# 🎬 Movie Explorer

A modern, responsive web application for discovering and exploring movies and TV shows. Built with React, Tailwind CSS, and powered by The Movie Database (TMDb) API.

![Movie Explorer](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![TMDb API](https://img.shields.io/badge/TMDb_API-3.0-01D277?style=for-the-badge)

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
- **Filtered Results**: Only shows movies and TV shows (excludes other content)
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

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

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

3. **Get TMDb API Key**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API → Request API Key
   - Choose "Developer" option
   - Fill out the form and get your API key

4. **Configure API Key**
   - The API key is already configured in the code: `82a978b03399a32ddb11dfddacfa028c`
   - If you want to use your own key, update it in `src/api/tmdb.js`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
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
├── public/
│   ├── vite.svg
│   └── index.html
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
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🔧 API Endpoints Used

The app uses the following TMDb API endpoints:

- **Search**: `/search/multi` - Search movies and TV shows
- **Trending Movies**: `/trending/movie/week` - Get trending movies
- **Trending TV**: `/trending/tv/week` - Get trending TV shows
- **Movie Details**: `/movie/{id}` - Get detailed movie information
- **TV Details**: `/tv/{id}` - Get detailed TV show information
- **Popular Movies**: `/movie/popular` - Get popular movies
- **Top Rated**: `/movie/top_rated` - Get top rated movies

## 🎨 Styling & Design

### **Color Scheme**
- **Primary**: Indigo (#6366f1) to Purple (#8b5cf6) gradient
- **Light Mode**: Clean white backgrounds with gray accents
- **Dark Mode**: Dark gray backgrounds with light text

### **Typography**
- **Headings**: Bold, gradient text for main titles
- **Body**: Clean, readable fonts with proper hierarchy
- **Responsive**: Scales appropriately across devices

### **Components**
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 📱 Responsive Design

The app is fully responsive and optimized for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### **Mobile Features**
- Collapsible search bar
- Touch-friendly buttons
- Optimized card layouts
- Swipe-friendly navigation

## 🔒 Data & Privacy

- **No User Accounts**: The app doesn't require user registration
- **Local Storage**: Favorites and theme preferences are stored locally
- **TMDb Attribution**: Proper attribution to TMDb as data source
- **No Personal Data**: No personal information is collected or stored

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deploy to Vercel/Netlify**
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDb**: For providing comprehensive movie and TV show data
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Vite**: For the fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for error messages
2. Ensure your API key is valid
3. Verify all dependencies are installed
4. Check your internet connection

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] User authentication and accounts
- [ ] Watchlist functionality
- [ ] Movie/TV show reviews and ratings
- [ ] Advanced filtering (genre, year, rating)
- [ ] Pagination for search results
- [ ] Movie/TV show recommendations
- [ ] Social sharing features
- [ ] Offline support with service workers
- [ ] PWA capabilities
- [ ] Multi-language support

---

**Made with ❤️ using React, Tailwind CSS, and TMDb API**
