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
                title: "ベイクドチーズケーキとコーヒー",
                description: "OBSCURA COFFEE ROASTERSのお豆を使ったコーヒーのおともは、バニラの風味がアクセントになったギュギュッとおいしいベイクドチーズケーキで。コーヒー豆は販売もしています。",
                price: "",
                image: "images/menu-cheesecake.jpg"
            },
            {
                title: "お味噌汁の定食",
                description: "じっくり丁寧に取った出汁で煮込んだ具沢山のお味噌汁と、色鮮やかで優しい味のおかずが並ぶ定食です。",
                price: "",
                image: "images/menu-miso.jpg"
            },
            {
                title: "ゴルゴンゾーラ等のチーズのトーストにはちみつと胡椒とレモンスカッシュ",
                description: "トーストやサンドイッチも用意しています。レモンスカッシュには国産減農薬レモンでつくるシロップを使用。ジンジャーシロップのドリンクも人気です。",
                price: "",
                image: "images/menu-toast.jpg"
            },
            {
                title: "ピスコサワーとミックスナッツ",
                description: "カクテル、ウイスキー、ビールもあれこれあります。写真はラテンアメリカ文学好きが高じてお出ししているペルーのカクテル「ピスコサワー」です。",
                price: "",
                image: "images/menu-pisco.jpg"
            }
        ];
    }

    // Shop Data (実際のデータはGoogleドライブから取得する想定)
    const shopData = [
        {
            title: "コーヒー豆",
            image: "images/shop-beans.jpg",
            deliveryUrl: "#" // デリバリーページのURL
        },
        {
            title: "オリジナルグッズ",
            image: "images/shop-goods.jpg",
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
            const shopItem = document.createElement('div');
            shopItem.className = 'shop-item';
            shopItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="shop-item-image" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(item.title)}'">
                <div class="shop-item-overlay">
                    <h3 class="shop-item-title">${item.title}</h3>
                </div>
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
            
            shopGrid.appendChild(shopItem);
        });
    }

    // Story Images - Random Photo Collage
    const storyImagesContainer = document.getElementById('storyImages');
    if (storyImagesContainer) {
        // 店舗の写真データ（実際の画像パスに置き換えてください）
        const storyImages = [
            { src: 'images/story1.jpg', width: 280, height: 200, rotation: -3, x: 50, y: 20 },
            { src: 'images/story2.jpg', width: 240, height: 320, rotation: 2, x: 200, y: 100 },
            { src: 'images/story3.jpg', width: 300, height: 220, rotation: -2, x: 80, y: 250 },
            { src: 'images/story4.jpg', width: 260, height: 280, rotation: 1.5, x: 250, y: 180 },
            { src: 'images/story5.jpg', width: 220, height: 240, rotation: -1.5, x: 120, y: 350 },
        ];

        // 写真を配置
        storyImages.forEach((imageData, index) => {
            const imgItem = document.createElement('div');
            imgItem.className = 'story-image-item';
            
            // 位置とサイズを設定
            const x = imageData.x || Math.random() * 300;
            const y = imageData.y || Math.random() * 400;
            
            // z-indexを設定（後ろの写真ほど低い値）
            const zIndex = storyImages.length - index;
            
            imgItem.style.width = imageData.width + 'px';
            imgItem.style.height = imageData.height + 'px';
            imgItem.style.left = x + 'px';
            imgItem.style.top = y + 'px';
            imgItem.style.transform = `rotate(${imageData.rotation}deg)`;
            imgItem.style.zIndex = zIndex;
            
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = `ポプラ館珈琲 ${index + 1}`;
            img.onerror = function() {
                // 画像が読み込めない場合はプレースホルダーを使用
                this.src = `https://via.placeholder.com/${imageData.width}x${imageData.height}?text=店舗写真${index + 1}`;
            };
            
            imgItem.appendChild(img);
            storyImagesContainer.appendChild(imgItem);
        });
    }

    // Gallery Images
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        // ギャラリーの写真データ（実際の画像パスに置き換えてください）
        // 2列レイアウト用：左列と右列で異なるオフセットを設定
        const galleryImages = [
            // 左列（上から下へ）
            { src: 'images/gallery1.jpg', alt: '店内の様子 1', rotation: -2, offsetX: -15, offsetY: 10 },
            { src: 'images/gallery3.jpg', alt: '店内の様子 3', rotation: 1.5, offsetX: -10, offsetY: -8 },
            { src: 'images/gallery5.jpg', alt: '店内の様子 5', rotation: -2.5, offsetX: -12, offsetY: 12 },
            // 右列（上から下へ）
            { src: 'images/gallery2.jpg', alt: '店内の様子 2', rotation: 3, offsetX: 15, offsetY: -10 },
            { src: 'images/gallery4.jpg', alt: '店内の様子 4', rotation: -1.5, offsetX: 10, offsetY: 8 },
            { src: 'images/gallery6.jpg', alt: '店内の様子 6', rotation: 2, offsetX: 12, offsetY: -12 },
        ];

        galleryImages.forEach((imageData, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            // ランダムな回転とオフセットを適用
            const rotation = imageData.rotation || (Math.random() * 6 - 3); // -3度から3度
            const offsetX = imageData.offsetX || (Math.random() * 20 - 10); // -10pxから10px
            const offsetY = imageData.offsetY || (Math.random() * 20 - 10); // -10pxから10px
            
            galleryItem.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
            
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt;
            img.onerror = function() {
                // 画像が読み込めない場合はプレースホルダーを使用
                this.src = 'https://via.placeholder.com/400x300?text=店内写真';
            };
            
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
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

