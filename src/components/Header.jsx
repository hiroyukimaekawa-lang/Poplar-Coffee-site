import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { label: '新着情報', href: '#news' },
    { label: 'おもてなしの心', href: '#hospitality' },
    { label: '通信販売', href: '#shopping' },
    { label: '店舗情報', href: '#store' },
    { label: '会社情報', href: '#about' },
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <a href="#" className="logo-link">
            <span className="logo-text">カフェ 英國屋</span>
          </a>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="メニューを開く">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="https://www.baitoru.com/op15784/" className="recruit-btn">
                採用情報
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
