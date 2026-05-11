import { useState, useEffect } from 'react'

/**
 * WordPress REST API からデータを取得するカスタムフック
 * @param {string} endpoint - APIエンドポイント
 * @returns {Object} { data, loading, error }
 */
export function useWordPressAPI(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://www.cafe-eikokuya.jp/wp-json/wp/v2${endpoint}`
        )
        if (!response.ok) throw new Error(`API Error: ${response.status}`)
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}

/**
 * スクロール位置に応じてコンポーネントを表示するフック
 * @param {number} threshold - スクロール閾値 (0-1)
 * @returns {boolean} 要素が見えているか
 */
export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isInView]
}

/**
 * レスポンシブなウィンドウサイズを取得するフック
 * @returns {Object} { width, height, isMobile }
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...windowSize,
    isMobile: windowSize.width < 768,
  }
}
