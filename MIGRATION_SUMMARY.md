# React + Vite モダン化完了サマリー

## ✅ 完了したこと

### 1. **Vite + React プロジェクト構造の構築**
   - `package.json` - React 18とVite用の依存関係を設定
   - `vite.config.js` - Vite の開発サーバーとビルド設定
   - `.eslintrc.json` - ESLint の設定ファイル
   - `src/main.jsx` - React アプリケーションのエントリーポイント
   - `src/index.css` - グローバルスタイル (モダンCSS変数)

### 2. **React コンポーネント設計**
   - **Header.jsx** - レスポンシブナビゲーション
   - **Hero.jsx** - 自動スライドショー機能
   - **NewsSection.jsx** - WordPress REST API からのニュース取得
   - **FeaturesSection.jsx** - 3列グリッドレイアウト
   - **ShoppingSection.jsx** - 通信販売セクション
   - **Footer.jsx** - フッターナビゲーション

### 3. **モダンCSS設定**
   - CSS変数による色管理
   - Flexbox/Grid レイアウト
   - レスポンシブデザイン対応
   - スムーズなアニメーション

### 4. **WordPress REST API 統合**
   ```javascript
   fetch('https://www.cafe-eikokuya.jp/wp-json/wp/v2/posts?_embed&per_page=6')
   ```
   - ニュース記事を動的に取得
   - エラーハンドリング実装

---

## 📁 プロジェクト構造

```
Poplar-Coffee-site/
├── src/
│   ├── main.jsx              # エントリーポイント
│   ├── App.jsx               # メインアプリケーション
│   ├── App.css               # アプリスタイル
│   ├── index.css             # グローバルスタイル
│   └── components/
│       ├── Header.jsx        # ヘッダー
│       ├── Header.css
│       ├── Hero.jsx          # ヒーロースライダー
│       ├── Hero.css
│       ├── NewsSection.jsx   # ニュース
│       ├── NewsSection.css
│       ├── FeaturesSection.jsx
│       ├── FeaturesSection.css
│       ├── ShoppingSection.jsx
│       ├── ShoppingSection.css
│       ├── Footer.jsx
│       └── Footer.css
├── public/
│   └── fonts.css             # フォント設定
├── index.html                # HTML テンプレート (更新予定)
├── package.json              # 依存関係
├── vite.config.js            # Vite 設定
├── .eslintrc.json            # ESLint 設定
├── .gitignore                # Git 除外設定
└── README.md                 # プロジェクトドキュメント

```

---

## 🚀 使用開始

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザが `http://localhost:5173` で自動的に開きます。

### ビルド

```bash
npm run build
```

`dist/` ディレクトリに本番用ファイルが生成されます。

---

## 🔄 主な改善点

| 項目 | 旧版 (WordPress) | 新版 (React) |
|------|------------------|-------------|
| **フレームワーク** | WordPress + jQuery | React 18 + Vite |
| **開発速度** | ホットリロード無し | Vite HMR対応 |
| **ビルドサイズ** | 数MB | ~50-100KB (最適化後) |
| **DX** | プラグイン依存 | コンポーネント駆動 |
| **パフォーマンス** | 複雑な読み込み | コード分割対応 |
| **メンテナンス** | 煩雑 | シンプル |
| **デプロイ** | PHP環境必須 | 静的サイト化可能 |

---

## 📝 次のステップ (推奨)

### 短期
- [ ] `index.html` を新しい形式に更新 (既存ファイル保存)
- [ ] `npm install` で依存関係をインストール
- [ ] `npm run dev` で開発サーバーを起動
- [ ] UI/デザイン確認

### 中期
- [ ] 店舗情報ページの React 化
- [ ] メニューページの React 化
- [ ] 画像の最適化・遅延読み込み
- [ ] メタタグ管理の自動化 (Helmet活用)

### 長期
- [ ] TypeScript 導入
- [ ] Storybook でコンポーネント管理
- [ ] E2E テスト実装
- [ ] CI/CD パイプライン構築

---

## 🛠️ 技術スタック

- **フレームワーク**: React 18.2.0
- **ビルドツール**: Vite 5.0.0
- **言語**: JavaScript (ESM)
- **スタイル**: Vanilla CSS + CSS Variables
- **API**: WordPress REST API v2
- **バージョン管理**: Git

---

## 📚 ドキュメント

各コンポーネントにはコメントで詳細な説明があります。

### 主要な API エンドポイント

```javascript
// ニュース取得
GET https://www.cafe-eikokuya.jp/wp-json/wp/v2/posts
Query: _embed=true, per_page=6

// ページ情報
GET https://www.cafe-eikokuya.jp/wp-json/wp/v2/pages/{id}
```

---

## ⚠️ 注意事項

1. **CORS対応**: WordPress サイトの CORS 設定を確認してください
2. **画像パス**: 既存画像は `/images` ディレクトリから読み込まれます
3. **メニュー**: 現在のメニューはハードコード化しています (動的化推奨)

---

## 📞 トラブルシューティング

### ポート 5173 が既に使用されている場合

```bash
npm run dev -- --port 3000
```

### REST API エラーが発生する場合

- WordPress サイトの REST API が有効か確認
- CORS ヘッダーの設定を確認
- ブラウザコンソールでエラーを確認

---

**作成日**: 2026年4月27日
**プロジェクト**: Poplar Coffee Site (英國屋)
