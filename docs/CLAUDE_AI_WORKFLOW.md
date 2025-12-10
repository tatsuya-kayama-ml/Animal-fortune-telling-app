# Claude.ai で画像生成する手順

## 手順

### 1. Claude.ai を開く
https://claude.ai

### 2. 新しいチャットを開始

### 3. 以下をコピー&ペースト

---

**Cat（ネコ）の画像を生成してください：**

```
Create a cute, minimalist illustration of a Cat in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #FFB6C1
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Cat should look:
独立心が強い, マイペース, 気まぐれ

Keep it simple, charming, and instantly recognizable.
```

保存先: `public/images/animals/cat.png`

---

**Dog（イヌ）の画像を生成してください：**

```
Create a cute, minimalist illustration of a Dog in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #DEB887
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Dog should look:
忠実, 社交的, ポジティブ

Keep it simple, charming, and instantly recognizable.
```

保存先: `public/images/animals/dog.png`

---

**Lion（ライオン）の画像を生成してください：**

```
Create a cute, minimalist illustration of a Lion in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #DAA520
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Lion should look:
リーダーシップがある, 自信がある, 情熱的

Keep it simple, charming, and instantly recognizable.
```

保存先: `public/images/animals/lion.png`

---

**Panda（パンダ）の画像を生成してください：**

```
Create a cute, minimalist illustration of a Panda in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #000000
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Panda should look:
のんびり, マイペース, 癒し系

Keep it simple, charming, and instantly recognizable.
```

保存先: `public/images/animals/panda.png`

---

**Penguin（ペンギン）の画像を生成してください：**

```
Create a cute, minimalist illustration of a Penguin in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching #4169E1
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The Penguin should look:
協調性がある, チームプレイヤー, 真面目

Keep it simple, charming, and instantly recognizable.
```

保存先: `public/images/animals/penguin.png`

---

### 4. 画像をダウンロード

生成された画像を右クリック → 「名前を付けて保存」

### 5. ファイルを配置

```bash
mkdir -p public/images/animals
mv ~/Downloads/*.png public/images/animals/
```

### 6. ファイル名を変更

ダウンロードしたファイル名を適切に変更：
- `image1.png` → `cat.png`
- `image2.png` → `dog.png`
- など

---

## 全100個の生成

### オプション1: 10個ずつバッチで依頼

```
以下の10個の動物のイラストを生成してください：
1. Cat - [プロンプト]
2. Dog - [プロンプト]
...
```

### オプション2: `image-prompts.json` を使う

```bash
# プロンプトを10個ずつに分割
cat scripts/image-prompts.json | jq '.[0:10]' > batch1.json
cat scripts/image-prompts.json | jq '.[10:20]' > batch2.json
# ...

# 各バッチのプロンプトをClaude.aiに投げる
```

---

## 次のステップ

1. ✅ 上記の5個のプロンプトをClaude.aiにコピペ
2. ⬜ 生成された画像を確認
3. ⬜ `public/images/animals/` に保存
4. ⬜ コード反映（`npx tsx scripts/add-image-paths.ts`）
5. ⬜ テスト（`npm run dev`）
