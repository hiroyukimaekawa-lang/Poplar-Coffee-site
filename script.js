// ============================================
// 写真の位置設定（Storyセクション）
// ============================================
// 以下の配列で写真の位置を調整できます
// - x: 左からの位置（ピクセル）
// - y: 上からの位置（ピクセル）
// - width: 写真の幅（ピクセル）
// - height: 写真の高さ（ピクセル）
// - rotation: 回転角度（度、正の値は時計回り、負の値は反時計回り）
const STORY_IMAGES_CONFIG = [
    { src: 'images/menu1.JPG', width: 280, height: 200, rotation: -3, x: 50, y: 20 },
    { src: 'images/menu2.JPG', width: 240, height: 320, rotation: 2, x: 200, y: 100 },
    { src: 'images/menu3.JPG', width: 300, height: 220, rotation: -2, x: 80, y: 250 },
    { src: 'images/product1.JPG', width: 260, height: 280, rotation: 1.5, x: 250, y: 180 },
    { src: 'images/store-photo.JPG', width: 220, height: 240, rotation: -1.5, x: 120, y: 350 },
];

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
                description: "当店自慢のオリジナルブレンド。コクと香りのバランスが良く、毎日飲んでも飽きのこない味わいです。ブラックでもミルクでもおすすめ。",
                price: "テイクアウト: ¥660 / 店内: ¥930",
                image: "images/coffee-beans-both.JPG"
            },
            {
                title: "オリジナルブレンド焙煎豆　200g",
                description: "当店自慢のオリジナルブレンド。コクと香りのバランスが良く、毎日飲んでも飽きのこない味わいです。ブラックでもミルクでもおすすめ。",
                price: "テイクアウト: ¥1,320 / 店内: ¥1,850",
                image: "images/coffee-beans-both.JPG"
            },
 
            {
                title: "自家製プリン",
                description: "毎日店内で仕込む、なめらか食感の自家製プリン。卵のコクとやさしい甘さ、ほろ苦カラメルが絶妙なバランスです。",
                price: "テイクアウト: ¥330 / 店内: ¥460",
                image: "images/menu2.JPG"
            },
            {
                title: "珈琲ゼリー",
                description: "香り高い珈琲を使用した、手作り珈琲ゼリー。つるんとした食感と、ほろ苦さが広がる大人のデザートです。",
                price: "テイクアウト: ¥660 / 店内: ¥930",
                image: "images/menu3.JPG"
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

    // Story Images - 4方向基準配置システム
    setupRandomPositioning('storyImages', STORY_IMAGES_CONFIG, ['top', 'right', 'bottom', 'left', 'top']);

    // Gallery Images - 4方向基準配置システム
    setupRandomPositioning('galleryGrid', GALLERY_IMAGES_CONFIG, ['top', 'right', 'bottom', 'left', 'top', 'right']);

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

