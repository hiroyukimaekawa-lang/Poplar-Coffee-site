import { useState, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    'https://www.cafe-eikokuya.jp/wordpress/wp-content/uploads/2021/01/topimg1-scaled-1.webp',
    'https://www.cafe-eikokuya.jp/wordpress/wp-content/uploads/2021/01/0002-scaled.webp',
    'https://www.cafe-eikokuya.jp/wordpress/wp-content/uploads/2021/01/CITY外観-scaled.webp',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <div className="hero-carousel">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">カフェ 英國屋</h1>
          <p className="hero-subtitle">
            心豊かなひとときをご提供します
          </p>
        </div>
      </div>
    </section>
  )
}
