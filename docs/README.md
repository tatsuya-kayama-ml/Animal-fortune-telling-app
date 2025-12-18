# 動物100診断

100種類の動物からあなたにピッタリの動物タイプを診断するWebアプリケーションです。

## 機能

### 診断機能
- 12個の質問に答えて、97種類の動物から最適なタイプを診断
- 各質問には6つの選択肢があり、回答に応じて性格特性がスコアリングされる
- 診断結果ページで動物の詳細情報を表示

### 診断結果の表示内容
- 動物名（日本語・英語）
- 絵文字アイコン
- 性格の説明（基本・詳細）
- 基本的な特徴（4つ）
- 強み・弱み
- 相性の良い動物・悪い動物（クリックで詳細ページへ遷移）
- アドバイス
- 統計情報（今日何%の人がこの動物だったか）

### SNSシェア機能
- X（Twitter）でシェア
- LINEでシェア
- URLコピー
- OGP画像の自動生成

### その他の機能
- 他の動物一覧表示（結果ページから）
- 動物詳細ページ（`/animal?id=xxx`）
- 「自分の結果に戻る」ボタン（localStorageに診断結果を保存）
- 今日の診断数カウント

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォント**: Noto Color Emoji（絵文字表示用）
- **デプロイ**: Vercel

## プロジェクト構成

```
app/
├── page.tsx              # トップページ（診断フロー）
├── layout.tsx            # レイアウト
├── result/page.tsx       # 診断結果ページ
├── animal/page.tsx       # 動物詳細ページ
├── share/[animal]/page.tsx  # SNSシェア用ページ（OGP対応）
└── api/
    ├── og/route.tsx      # OGP画像生成API
    └── stats/route.ts    # 統計API

components/
└── AnimalIcon.tsx        # 動物アイコンコンポーネント

lib/
├── animals.ts            # 動物データ（97種類）
└── questions.ts          # 質問データ（12問）
```

## 開発

### 環境構築

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

### ビルド

```bash
npm run build
```

## デプロイ

Vercelにデプロイ済み:
https://animal-fortune-telling-app.vercel.app/

## データ構造

### Animal（動物）

```typescript
interface Animal {
  id: string;              // 識別子（例: 'cat'）
  name: string;            // 日本語名（例: 'ネコ'）
  nameEn: string;          // 英語名（例: 'Cat'）
  description: string;     // 基本説明
  traits: string[];        // 特徴（4つ）
  color: string;           // テーマカラー
  emoji: string;           // 絵文字
  detailedDescription?: string;  // 詳細説明
  strengths?: string[];    // 強み
  weaknesses?: string[];   // 弱み
  compatibility?: string[];     // 相性の良い動物
  incompatibility?: string[];   // 相性の悪い動物
  advice?: string;         // アドバイス
}
```

### Question（質問）

```typescript
interface Question {
  id: number;
  text: string;            // 質問文
  options: {
    text: string;          // 選択肢テキスト
    traits: string[];      // この選択肢が持つ特性
  }[];
}
```

## スコア計算ロジック

各動物は複数の性格特性（traits）を持ち、ユーザーの回答で選択された特性とマッチングしてスコアを算出。最もスコアの高い動物が診断結果となる。

スコアにはランダム要素も加味されており、同じ回答でも異なる結果が出る可能性がある。
