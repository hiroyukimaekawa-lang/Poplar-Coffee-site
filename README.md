# ポプラ館珈琲 ウェブサイト

厚木で約30年にわたり愛されてきた「ポプラ館珈琲」の公式ウェブサイトです。

## プロジェクト構成

```
Poplar-Coffee-site/
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # JavaScriptファイル
├── images/             # 画像フォルダ
└── README.md           # このファイル
```

## 機能

- レスポンシブデザイン対応
- ヒーロー画像の自動スライド
- Shop項目のクリックでデリバリーページへの遷移
- スムーズスクロールナビゲーション

## セットアップ

1. **画像ファイルの配置**
   `images/` フォルダに以下の画像を配置してください：
   - `hero1.jpg`, `hero2.jpg`, `hero3.jpg`（ヒーローセクション用）
   - `menu-*.jpg`（メニューアイテム用）
   - `shop-*.jpg`（Shopアイテム用）
   
   画像が配置されていない場合、プレースホルダー画像が表示されます。

2. **Googleスプレッドシートからのメニューデータ取得**
   - スプレッドシートを「ウェブに公開」設定にしてください
   - `script.js` の `fetchMenuDataFromGoogleSheet()` 関数が自動的にデータを取得します
   - 取得に失敗した場合は、デフォルトのメニューデータが表示されます
   - スプレッドシートID: `1oUBUpAm4sbv8lh5U7-AONGaJjNidvIfb`
   - シートID: `1236346293`

3. **デリバリーページのURL設定**
   `script.js` の `shopData` 配列内の各アイテムの `deliveryUrl` にデリバリーページのURLを設定してください。

4. **Googleマップの設定**
   `index.html` のGoogleマップ埋め込みURLを実際の座標に更新してください。
   現在はプレースホルダーのURLが設定されています。

## カスタマイズ

### メニューデータの更新

`script.js` ファイル内の `menuData` 配列を編集して、メニューアイテムを追加・変更できます。

### Shopデータの更新

`script.js` ファイル内の `shopData` 配列を編集して、Shopアイテムを追加・変更できます。各アイテムの `deliveryUrl` にデリバリーページのURLを設定してください。

### スタイルの変更

`styles.css` ファイル内のCSS変数を変更することで、サイト全体のカラースキームを調整できます：

```css
:root {
    --primary-color: #2c3e2d;    /* メインカラー */
    --secondary-color: #8b6f47;  /* アクセントカラー */
    --text-color: #333;          /* テキストカラー */
    --bg-color: #fafafa;         /* 背景色 */
}
```

## 参考サイト

デザインの参考として [フヅクエ 初台](https://fuzkue.com/shops/hatsudai) を参照しています。

## ライセンス

© 2025 ポプラ館珈琲 All rights reserved

