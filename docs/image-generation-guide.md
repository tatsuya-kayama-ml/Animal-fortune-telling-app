# 動物イラスト生成ガイド

## 概要
100種類の動物イラストをGemini Flash 2.0（Imagen 3経由）で一括生成する手順

## 準備

### 1. プロンプトファイルの生成
```bash
npx tsx scripts/generate-prompts.ts
```

これにより以下のファイルが生成されます：
- `scripts/image-prompts.json` - プログラムで処理する用
- `scripts/image-prompts.csv` - Googleスプレッドシートで確認・編集する用

### 2. Antigravityでの設定

#### 使用モデル
- **Gemini 2.0 Flash Experimental** (imagen-3.0-generate-001 経由)
- 画像生成は無料枠で利用可能

#### プロンプト例
```
Create a cute, minimalist illustration of a Lion in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #FFD700
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Lion should look: リーダーシップ, 勇敢, 強い

Keep it simple, charming, and instantly recognizable.
```

## 実行方法

### オプション1: Antigravity UI で手動実行（推奨で試作）
1. `image-prompts.json` を開く
2. 最初の5-10個のプロンプトをコピー
3. Antigravity Chat で順番に実行
4. 生成結果を確認してプロンプトを調整
5. 満足したら全100個を実行

### オプション2: スクリプトで自動実行
```typescript
// scripts/generate-images.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// image-prompts.jsonを読み込んで順番に生成
// 各画像を public/images/animals/{id}.png に保存
```

### オプション3: Google AI Studio で一括実行
1. `image-prompts.csv` を Google Sheets にインポート
2. Google AI Studio の Batch API を使用
3. 一括ダウンロード

## ファイル構成

生成後のディレクトリ構造：
```
public/
  images/
    animals/
      lion.png
      tiger.png
      bear.png
      ...（100種類）
```

## コード側の変更

### animals.ts の更新
```typescript
export interface Animal {
  // ... 既存のプロパティ
  emoji: string;        // 絵文字は残す（フォールバック用）
  imagePath?: string;   // 新規追加
}

// 各動物にimagePath追加
{
  id: 'lion',
  // ...
  emoji: '🦁',
  imagePath: '/images/animals/lion.png',
}
```

### コンポーネントの更新
```typescript
// 絵文字とイラストの両方に対応
<div className="animal-icon">
  {animal.imagePath ? (
    <Image
      src={animal.imagePath}
      alt={animal.name}
      width={192}
      height={192}
      className="rounded-full"
    />
  ) : (
    <span className="text-8xl">{animal.emoji}</span>
  )}
</div>
```

## 品質チェックポイント

### 試作段階（5-10個）で確認すべき点
- [ ] スタイルの統一感（MBTIライク）
- [ ] 色の適用具合（background色が正しいか）
- [ ] キャラクターのサイズ感（大きすぎ/小さすぎないか）
- [ ] 動物の識別しやすさ
- [ ] 可愛さ・親しみやすさ

### 調整が必要な場合
プロンプトの以下を調整：
- `Kawaii/cute aesthetic` → `Modern minimal aesthetic`
- `70% of canvas` → `60% of canvas`
- `rounded shapes` → `geometric shapes`

## コスト概算

### Gemini Flash 2.0 での生成
- 画像生成：無料枠内（1日あたり1,500リクエストまで）
- 100枚生成：無料
- 複数バリエーション生成しても無料枠内

### 代替案：DALL-E 3
- $0.040 per image (1024x1024)
- 100枚 = $4.00

## タイムライン

| フェーズ | 作業内容 | 所要時間 |
|---------|---------|---------|
| 1 | プロンプト生成・調整 | 30分 |
| 2 | 試作（5-10個）生成 | 30分 |
| 3 | プロンプト微調整 | 30分 |
| 4 | 全100個生成 | 2-3時間 |
| 5 | コード実装 | 1-2時間 |
| 6 | 品質確認・調整 | 1時間 |

**合計：6-8時間**

## 注意事項

1. **著作権**: Gemini生成画像は商用利用可能
2. **バックアップ**: 絵文字は削除せず、フォールバックとして残す
3. **段階的導入**: 一部の動物だけイラストにして様子を見ることも可能
4. **最適化**: 生成後にTinyPNGなどで圧縮（容量削減）

## 次のステップ

1. ✅ `generate-prompts.ts` を実行
2. ⬜ 試作（5個）を生成して品質確認
3. ⬜ プロンプト調整
4. ⬜ 全100個生成
5. ⬜ `public/images/animals/` に配置
6. ⬜ コード実装
7. ⬜ デプロイ
