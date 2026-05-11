import './ShoppingSection.css'

export default function ShoppingSection() {
  return (
    <section id="shopping" className="shopping-section">
      <div className="container">
        <div className="shopping-content">
          <div className="shopping-text">
            <h2>通信販売</h2>
            <p>
              香り深いコーヒーやブレンドティーを、ご家庭やオフィスでも味わっていただきたい。英國屋のオリジナル・ギフトブランドが、至福のひとときをお届けします。お世話になった方へのギフトや、お中元・お歳暮・内祝いなどにもどうぞ。
            </p>
            <a href="https://www.cafe-eikokuya.jp/giftshopping/" className="btn-primary">
              商品を見る
            </a>
          </div>
          <div className="shopping-image">
            <div className="image-placeholder">
              <span>🎁 商品画像</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
