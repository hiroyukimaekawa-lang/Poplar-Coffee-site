import './NewsSection.css'

export default function NewsSection({ newsData, loading }) {
  if (loading) {
    return (
      <section id="news" className="news-section">
        <div className="container">
          <h2 className="section-title">新着情報</h2>
          <div className="loading">読み込み中...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="news-section">
      <div className="container">
        <h2 className="section-title">新着情報</h2>
        
        <div className="news-list">
          {newsData.slice(0, 6).map((post) => (
            <article key={post.id} className="news-item">
              <div className="news-date">
                {new Date(post.date).toLocaleDateString('ja-JP')}
              </div>
              <div className="news-content">
                <h3>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title.rendered}
                  </a>
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered.substring(0, 150) + '...',
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="news-footer">
          <a href="https://www.cafe-eikokuya.jp/news.html" className="btn-primary">
            ニュース一覧を見る
          </a>
        </div>
      </div>
    </section>
  )
}
