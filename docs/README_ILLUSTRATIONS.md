# 🎨 動物イラスト導入ガイド

## 📋 概要

このプロジェクトでは、100種類の動物をMBTIスタイルのカスタムイラストで表示できるように準備が整いました。

**現状**: 絵文字で表示
**目標**: カスタムイラストで表示（絵文字はフォールバック）

---

## 🚀 クイックスタート

### 1️⃣ プロンプトはすでに生成済み ✅

```bash
# 確認
ls scripts/image-prompts.*

# 出力例:
# scripts/image-prompts.json  (プログラム用)
# scripts/image-prompts.csv   (スプレッドシート用)
```

### 2️⃣ Antigravity で試作（5個）

1. **Claude Desktop を起動**
2. **Antigravity 起動**
3. **`docs/SAMPLE_PROMPTS.md` を開く**
4. **サンプル1-5をコピー&ペーストして画像生成**
5. **生成された画像を `public/images/animals/` に保存**
   ```bash
   mkdir -p public/images/animals
   # cat.png, dog.png, lion.png, panda.png, penguin.png
   ```

### 3️⃣ 品質確認

- [ ] スタイルが統一されている
- [ ] 動物が識別できる
- [ ] 可愛くて親しみやすい
- [ ] 背景色が適用されている

### 4️⃣ 本番生成（全100個）

品質に問題なければ、`image-prompts.json` の全プロンプトを使って順次生成。

### 5️⃣ コード反映

```bash
# イラストパスを自動追加
npx tsx scripts/add-image-paths.ts

# コンポーネントを更新（すでに作成済み）
# - components/AnimalIcon.tsx
# - app/result/page.tsx で使用
# - app/animal/page.tsx で使用
```

### 6️⃣ テスト

```bash
npm run dev
# http://localhost:3000 で確認
```

---

## 📁 ファイル構成

```
AnimalUranai/
├── scripts/
│   ├── generate-prompts.ts      ✅ プロンプト生成スクリプト
│   ├── add-image-paths.ts       ✅ imagePath自動追加スクリプト
│   ├── image-prompts.json       ✅ 生成済み（100個）
│   └── image-prompts.csv        ✅ 生成済み
│
├── components/
│   └── AnimalIcon.tsx           ✅ イラスト/絵文字切り替えコンポーネント
│
├── public/
│   └── images/
│       └── animals/             ⬜ ここに画像を配置（100個）
│           ├── cat.png
│           ├── dog.png
│           └── ...
│
└── docs/
    ├── README_ILLUSTRATIONS.md     ✅ このファイル
    ├── IMPLEMENTATION_PLAN.md      ✅ 詳細実装プラン
    ├── SAMPLE_PROMPTS.md           ✅ 試作用サンプル
    └── image-generation-guide.md   ✅ 生成手順書
```

---

## 🎯 推奨フロー

### 段階的導入（おすすめ）

1. **Phase 1: 人気20種だけイラスト化**
   - ネコ、イヌ、ライオン、パンダ、ペンギンなど
   - ユーザー反応を確認

2. **Phase 2: フィードバック収集**
   - スタイルの調整が必要か判断
   - 色の調整、サイズ感の確認

3. **Phase 3: 残り80種を生成**
   - 確立したスタイルで一気に生成

### 一括導入（時間がある場合）

1. 試作5個 → 品質確認
2. 全100個生成（2-3時間）
3. 一括反映

---

## 💰 コスト

| 方法 | コスト | 時間 |
|-----|-------|------|
| **Gemini Flash 2.0 (Antigravity)** | **無料** | 2-3時間 |
| Google AI Studio Batch | 無料 | 1時間 |
| DALL-E 3 | $4.00 | 30分 |

**推奨**: Gemini Flash 2.0（無料 + 高品質）

---

## 🛠️ トラブルシューティング

### Q: イラストが表示されない

```bash
# 画像パスを確認
ls public/images/animals/

# animals.ts を確認
grep "imagePath" lib/animals.ts

# 自動追加スクリプトを再実行
npx tsx scripts/add-image-paths.ts
```

### Q: スタイルがバラバラになった

**原因**: プロンプトのベース部分を変更してしまった
**対策**: `generate-prompts.ts` のベースプロンプトを固定し、再生成

### Q: 動物が識別しにくい

**対策**: プロンプトに特徴を追加
```typescript
// generate-prompts.ts を編集
const animalFeatures = {
  lion: 'with distinctive mane',
  elephant: 'with long trunk',
  penguin: 'with tuxedo-like coloring',
  // ...
};
```

### Q: ファイルサイズが大きい

```bash
# TinyPNG で一括圧縮（70-80%削減）
# または ImageOptim などを使用
```

---

## 📊 進捗管理

### チェックリスト

- [x] プロンプト生成スクリプト作成
- [x] プロンプトファイル生成（100個）
- [x] AnimalIcon コンポーネント作成
- [x] 画像パス自動追加スクリプト作成
- [x] ドキュメント作成
- [ ] 試作5個生成
- [ ] 品質確認・調整
- [ ] 本番生成（100個）
- [ ] ファイル配置
- [ ] コード反映
- [ ] テスト
- [ ] デプロイ

---

## 🎨 デザイン参考

### MBTIスタイルの特徴
- シンプルでフラットなデザイン
- 丸みのある形状
- 親しみやすいキャラクター
- 統一感のある色使い
- 装飾は最小限

### カラーパレット
各動物の `color` プロパティが背景色として使用されます。

---

## 📞 サポート

質問や問題があれば、以下のドキュメントを参照：

1. **SAMPLE_PROMPTS.md** - 試作用サンプル
2. **IMPLEMENTATION_PLAN.md** - 詳細な実装手順
3. **image-generation-guide.md** - 生成ガイド

---

## ✨ 次のステップ

```bash
# 1. サンプルプロンプトを確認
cat docs/SAMPLE_PROMPTS.md

# 2. Antigravity で試作開始！
# 　→ Claude Desktop を起動してください

# 3. 生成された画像を確認
#    品質が良ければ本番生成へ
```

**準備は完了しています。あとは実行するだけです！** 🚀
