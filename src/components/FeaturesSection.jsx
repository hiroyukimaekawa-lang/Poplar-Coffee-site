import './FeaturesSection.css'

const features = [
  {
    id: 1,
    icon: '☕',
    title: 'おもてなしの心',
    description: 'カフェ文化の本場、英国の人たちがとても大切にしているお茶の時間。それは、お茶を味わうだけでなく、やすらぎの場として、また社交や文化交流の場として、暮らしそのものを美しく彩っています。',
    link: '#hospitality',
  },
  {
    id: 2,
    icon: '🏪',
    title: '店舗情報',
    description: '挽き立てのコーヒで迎える爽やかな朝、彩り鮮やかなワンプレートランチで過ごすお昼、ゆったりとした午後で楽しむ甘いデザートなど、喫茶店での過ごし方は人それぞれです。',
    link: '#store',
  },
  {
    id: 3,
    icon: '🏢',
    title: '会社情報',
    description: '英國屋の全店舗は、人の流れの要であるターミナルに立地。すべてを直営にすることで、最高の味とサービス、地域一番店として求められるスペースと雰囲気をご提供しています。',
    link: '#about',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href={feature.link} className="feature-link">
                詳しく見る →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
