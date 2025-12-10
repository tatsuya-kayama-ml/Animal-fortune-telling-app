# 🤖 自動画像生成ガイド

100種類の動物イラストを自動生成する3つの方法を用意しました。

---

## 🥇 推奨: DALL-E 3（最も簡単）

### メリット
- ✅ セットアップが最も簡単（APIキーだけ）
- ✅ 高品質な画像
- ✅ 安定したAPI
- ⚠️ 有料: $0.04/枚（100枚で$4.00）

### セットアップ

1. **OpenAI APIキーを取得**
   - https://platform.openai.com/api-keys
   - 「Create new secret key」をクリック
   - キーをコピー

2. **`.env.local` ファイルを作成**
   ```bash
   echo "OPENAI_API_KEY=sk-proj-..." > .env.local
   ```

3. **実行**
   ```bash
   # 全100種類を生成（約$4.00）
   npx tsx scripts/batch-generate-dalle.ts

   # 最初の10種類だけ試す（$0.40）
   npx tsx scripts/batch-generate-dalle.ts --start 0 --end 10

   # 既存の画像をスキップして続きから
   npx tsx scripts/batch-generate-dalle.ts --skip-existing
   ```

### 所要時間
- 10枚: 約2分
- 100枚: 約20分（レート制限により12秒間隔）

---

## 🥈 代替案1: Vertex AI Imagen 3（無料〜）

### メリット
- ✅ Google Cloud無料枠あり
- ✅ 高品質
- ⚠️ セットアップが複雑

### セットアップ

1. **Google Cloud Projectを作成**
   - https://console.cloud.google.com/

2. **Vertex AI APIを有効化**

3. **gcloud CLIをインストール**
   ```bash
   # Mac
   brew install google-cloud-sdk

   # 認証
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

4. **`.env.local` に追加**
   ```bash
   echo "GOOGLE_CLOUD_PROJECT_ID=your-project-id" >> .env.local
   echo "GOOGLE_CLOUD_LOCATION=us-central1" >> .env.local
   ```

5. **実行**
   ```bash
   npx tsx scripts/batch-generate-imagen.ts
   ```

### コスト
- 無料枠: 月100枚まで無料（要確認）
- 超過分: $0.02/枚

---

## 🥉 代替案2: Gemini + 手動（無料）

### メリット
- ✅ 完全無料
- ⚠️ 手動作業が必要
- ⚠️ Geminiは画像生成機能が限定的

### 方法

1. **Google AI Studio**
   - https://aistudio.google.com/
   - Gemini 2.0 Flash Experimentalを選択
   - プロンプトを貼り付け

2. **または Claude.ai** （推奨）
   - https://claude.ai
   - [docs/CLAUDE_AI_WORKFLOW.md](./CLAUDE_AI_WORKFLOW.md) を参照

---

## 📊 比較表

| 方法 | コスト | 難易度 | 速度 | 品質 | 推奨度 |
|-----|-------|--------|------|------|--------|
| **DALL-E 3** | $4.00 | ⭐ 簡単 | 20分 | ⭐⭐⭐ | 🥇 |
| Imagen 3 | 無料〜 | ⭐⭐⭐ 難 | 10分 | ⭐⭐⭐ | 🥈 |
| Claude.ai | 無料 | ⭐⭐ 中 | 2-3時間 | ⭐⭐⭐ | 🥉 |

---

## 🚀 クイックスタート（DALL-E 3推奨）

```bash
# 1. OpenAI APIキーを設定
echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local

# 2. 最初の10個を試す（$0.40）
npx tsx scripts/batch-generate-dalle.ts --start 0 --end 10

# 3. 結果を確認
ls public/images/animals/

# 4. 問題なければ全100個生成（$4.00）
npx tsx scripts/batch-generate-dalle.ts --skip-existing

# 5. コードに反映
npx tsx scripts/add-image-paths.ts

# 6. テスト
npm run dev
```

---

## 💡 ヒント

### バッチ生成のコツ

**10個ずつ生成する**（推奨）
```bash
# Batch 1 (0-10)
npx tsx scripts/batch-generate-dalle.ts --start 0 --end 10

# Batch 2 (10-20)
npx tsx scripts/batch-generate-dalle.ts --start 10 --end 20 --skip-existing

# ...
```

**メリット**:
- 途中で品質確認できる
- エラーが起きても被害が少ない
- コストを段階的に投資できる

### エラーが起きたら

```bash
# 既存をスキップして続きから
npx tsx scripts/batch-generate-dalle.ts --skip-existing

# 特定の範囲だけ再生成
npx tsx scripts/batch-generate-dalle.ts --start 20 --end 30
```

---

## 🎨 生成後の作業

### 1. 画像を確認
```bash
ls -lh public/images/animals/
```

### 2. コードに反映
```bash
npx tsx scripts/add-image-paths.ts
```

### 3. テスト
```bash
npm run dev
# http://localhost:3000 で確認
```

### 4. 最適化（オプション）
```bash
# TinyPNG CLIなどで圧縮
# 70-80%のファイルサイズ削減が可能
```

---

## 📞 トラブルシューティング

### Q: APIキーエラー

```
Error: OPENAI_API_KEY not found
```

**解決**:
```bash
# .env.local を確認
cat .env.local

# なければ作成
echo "OPENAI_API_KEY=sk-..." > .env.local
```

### Q: レート制限エラー

```
Error: Rate limit exceeded
```

**解決**:
- スクリプトは自動的に12秒間隔で実行
- さらに間隔を空けたい場合はコードを編集

### Q: コストが心配

**推奨**:
1. まず10個だけ生成（$0.40）
2. 品質を確認
3. 問題なければ全100個（$4.00）

---

## ✨ 完了後

すべての画像が生成できたら:

1. ✅ `public/images/animals/` に100個のPNG
2. ✅ `npx tsx scripts/add-image-paths.ts` 実行
3. ✅ `npm run dev` でテスト
4. ✅ Git commit & push
5. ✅ デプロイ

**おめでとうございます！🎉**
