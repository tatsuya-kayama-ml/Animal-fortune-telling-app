# Gemini（Google AI Studio）で画像生成する手順

## 🚀 クイックスタート

### 1. Google AI Studio を開く
https://aistudio.google.com/

### 2. 左メニューから「Imagen」を選択

### 3. プロンプトをコピー＆ペースト

---

## 📝 プロンプト一覧（残り91種類）

以下のプロンプトを順番にGeminiに入力してください。
すでに生成済み: Cat, Dog, Lion, Panda, Penguin

### 動物 #6: ウサギ (Rabbit)

```
Create a cute, minimalist illustration of a Rabbit in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #F0E68C
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Rabbit should look:
優しい, 繊細, 平和主義

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/rabbit.png`

---

### 動物 #7: キツネ (Fox)

```
Create a cute, minimalist illustration of a Fox in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #FF8C00
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Fox should look:
賢い, 機転が利く, 適応力が高い

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/fox.png`

---

### 動物 #8: フクロウ (Owl)

```
Create a cute, minimalist illustration of a Owl in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #8B7355
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Owl should look:
知的, 冷静, 洞察力がある

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/owl.png`

---

### 動物 #9: イルカ (Dolphin)

```
Create a cute, minimalist illustration of a Dolphin in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #00BFFF
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Dolphin should look:
明るい, 社交的, ムードメーカー

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/dolphin.png`

---

### 動物 #10: コアラ (Koala)

```
Create a cute, minimalist illustration of a Koala in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #808080
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Koala should look:
のんびり, 穏やか, マイペース

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/koala.png`

---

## 💡 効率化のコツ

### 一度に10個ずつ依頼する方法

```
以下の10種類の動物イラストを順番に生成してください。
各動物は1枚ずつ、MBTIスタイルのシンプルでかわいいデザインで。

1. Rabbit - 優しい, 繊細, 平和主義 - 背景色#F0E68C
2. Fox - 賢い, 機転が利く, 適応力が高い - 背景色#FF8C00
3. Owl - 知的, 冷静, 洞察力がある - 背景色#8B7355
...

各動物の要件:
- Simple, flat design with rounded shapes
- Centered, 70% of canvas
- Kawaii/cute aesthetic
- Solid color background
- No text or labels
- Square format
```

---

## 📥 画像のダウンロードと保存

### 1. 生成された画像を右クリック
「名前を付けて保存」

### 2. ファイル名を変更
- `rabbit.png`
- `fox.png`
- など

### 3. 所定の場所に移動
```bash
mkdir -p public/images/animals
mv ~/Downloads/*.png public/images/animals/
```

---

## 🔄 進捗管理

### チェックリスト（残り91種類）

- [ ] 6. rabbit (ウサギ)
- [ ] 7. fox (キツネ)
- [ ] 8. owl (フクロウ)
- [ ] 9. dolphin (イルカ)
- [ ] 10. koala (コアラ)
- [ ] 11. tiger (トラ)
- [ ] 12. bear (クマ)
- [ ] 13. elephant (ゾウ)
- [ ] 14. monkey (サル)
- [ ] 15. horse (ウマ)
- [ ] ... （残り81種類）

全リストは `scripts/image-prompts.json` を参照

---

## ✅ 生成後の作業

### 1. 生成枚数を確認
```bash
ls public/images/animals/ | wc -l
# 100枚あればOK
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

### 4. コミット
```bash
git add public/images/animals/
git commit -m "Add all 100 animal illustrations"
```

---

## 📊 全プロンプトの取得方法

すべてのプロンプトを確認したい場合：

```bash
# JSON形式で全プロンプトを表示
cat scripts/image-prompts.json | jq '.[] | {id, name, nameEn, prompt}' | less

# 特定の動物のプロンプトを取得
cat scripts/image-prompts.json | jq '.[] | select(.id == "rabbit")'
```

---

## 💡 Tips

### 品質を統一するために
1. 最初の5個（cat, dog, lion, panda, penguin）の画像を参考として見せる
2. "このスタイルで他の動物も生成してください"と指示
3. バッチで10個ずつ生成すると効率的

### トラブルシューティング
- スタイルがバラバラになる → 1個ずつ生成する
- 背景色が違う → プロンプトの色指定を強調
- 複数の動物が描かれる → "ONLY ONE animal" を追加

---

## 🎯 推奨ワークフロー

1. **10個ずつバッチで生成**（効率重視）
2. **品質確認**
3. **問題があれば個別に再生成**
4. **10個完了したら次の10個へ**

これで約1-2時間で全100枚完成します！
