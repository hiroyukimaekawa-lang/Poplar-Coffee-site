
// Googleスプレッドシートからメニューデータを取得
// スプレッドシートID: 1oUBUpAm4sbv8lh5U7-AONGaJjNidvIfb
// シートID: 1236346293
async function fetchMenuDataFromGoogleSheet() {
    const spreadsheetId = '1oUBUpAm4sbv8lh5U7-AONGaJjNidvIfb';
    const sheetId = '1236346293';
    // CSV形式でエクスポート（スプレッドシートが公開設定である必要があります）
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${sheetId}`;
    
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('Failed to fetch menu data');
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.warn('Googleスプレッドシートからのデータ取得に失敗しました。デフォルトデータを使用します。', error);
        return null;
    }
}

// CSVをパースしてメニューデータに変換
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;
    
    const headers = lines[0].split(',').map(h => h.trim());
    const menuData = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < headers.length) continue;
        
        // ヘッダーに応じてデータをマッピング（実際のスプレッドシート構造に合わせて調整が必要）
        const item = {
            title: values[0] || '',
            description: values[1] || '',
            price: values[2] || '',
            image: values[3] || 'images/menu-default.jpg'
        };
        
        if (item.title) {
            menuData.push(item);
        }
    }
    
    return menuData;
}

// Hero Image Slider
document.addEventListener('DOMContentLoaded', async function() {
    const heroImages = document.querySelectorAll('.hero-image');
    let currentIndex = 0;

    function showNextImage() {
        heroImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImages[currentIndex].classList.add('active');
    }

    // Change image every 5 seconds
    setInterval(showNextImage, 5000);

    // Menu Data (Googleスプレッドシートから取得を試みる)
    let menuData = await fetchMenuDataFromGoogleSheet();
    
    // 取得に失敗した場合はデフォルトデータを使用
    if (!menuData || menuData.length === 0) {
        menuData = [
            {
                title: "オリジナルブレンド焙煎豆　100g",
                description: "当店自慢のオリジナルブレンド。<br>コクと香りのバランスが良く、<br>毎日飲んでも飽きのこない味わいです。<br>ブラックでもミルクでもおすすめ。",
                price: "¥600",
                image: "./images/coffee-beans.JPG"
            },
            {
                title: "各種コーヒー",
                description: "コロンビア、ブラジル、イエメン等<br>幅広い種類のコーヒーを<br>取り揃えております",
                price: "100g：¥600~",
                image: "./images/menu-coffee2.jpg"
            },
 
            {
                title: "自家製プリン",
                description: "毎日店内で仕込む、<br>なめらか食感の自家製プリン。<br>卵のコクとやさしい甘さ、<br>ほろ苦カラメルが絶妙なバランスです。",
                price: "¥300",
                image: "./images/menu-puding1.jpg"
            },
            {
                title: "クロワッサンプレート",
                description: "バターの香り豊かな<br>手作りクロワッサン。<br>サクサクとした食感と、<br>ほんのりとした甘さが楽しめます。",
                price: "単品: ¥600 / ブレンドコーヒー付き: ¥900",
                image: "./images/menu-croissant.jpg"
            }
        ];
    }

    // Shop Data
    const shopData = [
        {
            title: "珈琲のメニュー",
            image: "images/coffee-beans-both.JPG",
            linkText: "珈琲のメニューへ",
            deliveryUrl: "#" // デリバリーページのURL
        },
        {
            title: "珈琲のメニュー",
            image: "images/coffee-beans1.JPG",
            linkText: "珈琲のメニューへ",
            deliveryUrl: "#"
        },
        {
            title: "食事のメニュー",
            image: "images/menu1.JPG",
            linkText: "食事のメニューへ",
            deliveryUrl: "#"
        },
        {
            title: "食事のメニュー",
            image: "images/menu2.JPG",
            linkText: "食事のメニューへ",
            deliveryUrl: "#"
        }
    ];

    // Render Menu Items
    const menuGrid = document.getElementById('menuGrid');
    if (menuGrid) {
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            const priceHtml = item.price ? `<p class="menu-item-price">${item.price}</p>` : '';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="menu-item-image" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(item.title)}'">
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <p class="menu-item-description">${item.description}</p>
                    ${priceHtml}
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });
    }

    // Render Shop Items
    const shopGrid = document.getElementById('shopGrid');
    if (shopGrid) {
        shopData.forEach(item => {
            const shopItemContainer = document.createElement('div');
            shopItemContainer.className = 'shop-item-container';
            
            const shopItem = document.createElement('div');
            shopItem.className = 'shop-item';
            shopItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="shop-item-image" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(item.title)}'">
            `;
            
            // クリックでデリバリーページに遷移
            shopItem.addEventListener('click', function() {
                if (item.deliveryUrl && item.deliveryUrl !== '#') {
                    window.open(item.deliveryUrl, '_blank');
                } else {
                    // デリバリーページのURLが設定されていない場合の処理
                    alert('デリバリーページの準備中です。');
                }
            });
            
            // リンクを追加
            const shopLink = document.createElement('a');
            shopLink.href = item.deliveryUrl !== '#' ? item.deliveryUrl : '#';
            shopLink.className = 'shop-item-link';
            shopLink.textContent = item.linkText;
            shopLink.addEventListener('click', function(e) {
                if (item.deliveryUrl === '#') {
                    e.preventDefault();
                    alert('デリバリーページの準備中です。');
                }
            });
            
            shopItemContainer.appendChild(shopItem);
            shopItemContainer.appendChild(shopLink);
            shopGrid.appendChild(shopItemContainer);
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// ローディングアニメーション制御
// ============================================
window.onload = function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (loadingOverlay) {
        // ページ読み込み完了後、0.6秒フェードアウト
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
        }, 600);
    }
};

// ============================================
// スクロールインジケーター制御（スマホ表示のみ）
// ============================================
(function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (!scrollIndicator) return;
    
    // スマホ表示時のみ動作
    function handleScroll() {
        // 画面幅が768px以下の場合のみ処理
        if (window.innerWidth > 768) {
            scrollIndicator.classList.add('hidden');
            return;
        }
        
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール量が100pxを超えたらフェードアウト
        if (scrollY > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }
    
    // スクロールイベント監視
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // リサイズ時も確認
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // 初期状態を確認
    handleScroll();
})();

// ============================================
// セクションタイトル（背景画像付き）: スクロールフェードイン
// ============================================
(function() {
    // 対象要素を取得
    const sectionTitleBgElements = document.querySelectorAll('.section-title-bg');
    
    // 要素が存在しない場合は処理を終了
    if (sectionTitleBgElements.length === 0) return;
    
    // IntersectionObserverのオプション設定
    const observerOptions = {
        root: null, // ビューポートを基準にする
        rootMargin: '0px', // マージンなし
        threshold: 0.2 // 要素が20%表示されたら発火
    };
    
    // IntersectionObserverのコールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // 要素が画面に入ったら
            if (entry.isIntersecting) {
                // is-visibleクラスを追加してフェードイン表示
                entry.target.classList.add('is-visible');
                // 一度だけ再生するため、監視を解除
                observer.unobserve(entry.target);
            }
        });
    };
    
    // IntersectionObserverインスタンスを作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 各要素を監視対象に追加
    sectionTitleBgElements.forEach(element => {
        observer.observe(element);
    });
})();
