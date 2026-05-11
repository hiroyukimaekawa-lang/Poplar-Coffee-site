import './Footer.css'

const footerLinks = [
  { label: '新着情報', href: '#news' },
  { label: 'おもてなしの心', href: '#hospitality' },
  { label: '店舗情報', href: '#store' },
  { label: '会社情報', href: '#about' },
  { label: '通信販売', href: '#shopping' },
  { label: 'プライバシーポリシー', href: '#policy' },
  { label: 'サイトマップ', href: '#sitemap' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>カフェ 英國屋</h4>
            <p>
              カフェ文化の本場、英国の人たちがとても大切にしているお茶の時間をご提供します。
            </p>
          </div>

          <div className="footer-section">
            <h4>メニュー</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>お問い合わせ</h4>
            <p>
              <strong>電話:</strong> 06-6633-1580
            </p>
            <p>
              <strong>住所:</strong> 大阪府大阪市北区中之島
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Eikokuya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
