import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import NewsSection from './components/NewsSection'
import FeaturesSection from './components/FeaturesSection'
import ShoppingSection from './components/ShoppingSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // WordPress REST API からニュースを取得
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://www.cafe-eikokuya.jp/wp-json/wp/v2/posts?_embed&per_page=6'
        )
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()
        setNewsData(data)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="app">
      <Header />
      <Hero />
      <NewsSection newsData={newsData} loading={loading} />
      <FeaturesSection />
      <ShoppingSection />
      <Footer />
    </div>
  )
}

export default App
