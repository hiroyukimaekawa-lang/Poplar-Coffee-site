# Poplar Coffee Site - React + Vite

現在のWordPress サイトを React + Vite でモダン化したプロジェクトです。

## 特徴

- ⚡ **Vite** による超高速開発
- ⚛️ **React 18** の最新機能
- 🎨 **モダンCSS** (CSS Modules/Scoped Styles)
- 🔌 **WordPress REST API** との統合
- 📱 **レスポンシブデザイン**
- ♿ **アクセシビリティ対応**

## インストール

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
```

ブラウザが自動的に http://localhost:5173 で開きます。

## ビルド

```bash
npm run build
```

`dist/` フォルダにプロダクション用ファイルが生成されます。

## プロジェクト構造

```
src/
  ├── App.jsx           # メインアプリケーション
  ├── App.css           # アプリケーションスタイル
  ├── index.css         # グローバルスタイル
  ├── main.jsx          # エントリーポイント
  └── components/
      ├── Header.jsx    # ヘッダーコンポーネント
      ├── Hero.jsx      # ヒーロースライダー
      ├── NewsSection.jsx    # ニュースセクション
      ├── FeaturesSection.jsx # 特徴セクション
      ├── ShoppingSection.jsx # 買い物セクション
      └── Footer.jsx    # フッター

public/
  └── images/   # 画像ファイル

index.html    # HTML テンプレート
vite.config.js   # Vite 設定
package.json     # 依存関係とスクリプト
```

## 主な改善点

### モダン化
- jQuery 依存を排除
- バニラ JavaScript/React Hooks を活用
- 不要な WordPress プラグインを削除

### パフォーマンス
- コード分割とレイジーローディング対応
- 画像最適化
- CSS-in-JS から CSS スコープに変更

### 保守性
- コンポーネント化
- 再利用可能なコード
- 一貫したコード構造

## API 統合

現在、WordPress REST API を使用してニュースを取得しています：

```javascript
const response = await fetch(
  'https://www.cafe-eikokuya.jp/wp-json/wp/v2/posts?_embed&per_page=6'
)
```

## ライセンス

Copyright © 2026 Eikokuya. All rights reserved.
