# 動物診断アプリ

質問に答えるとあなたの性格を動物で診断するWebアプリケーションです。

## 特徴

- 10個の質問に答えて性格診断
- 16種類の動物タイプ
- MBTIのようなデザイン
- かわいい動物の絵文字付き
- SNSシェア機能（X、LINE、URLコピー）
- レスポンシブデザイン

## 技術スタック

- Next.js 16
- TypeScript
- Tailwind CSS
- React

## ローカル開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Vercelへのデプロイ

### GitHubと連携

1. このプロジェクトをGitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)にアクセスしてアカウント作成/ログイン
3. 「New Project」をクリック
4. GitHubリポジトリをインポート
5. デプロイ設定は自動検出されます
6. 「Deploy」をクリック

以降、GitHubのメインブランチにプッシュすると自動的にデプロイされます。

### Vercel CLIでデプロイ

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

## プロジェクト構成

```
├── app/
│   ├── page.tsx          # トップページ・質問ページ
│   ├── result/
│   │   └── page.tsx      # 結果表示ページ
│   └── layout.tsx        # レイアウト
├── lib/
│   ├── animals.ts        # 動物データ
│   └── questions.ts      # 質問データと診断ロジック
└── public/               # 静的ファイル
```

## ライセンス

MIT
