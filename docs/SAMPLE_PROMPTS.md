# Antigravity で試作する用のサンプルプロンプト

## 使い方
1. Claude Desktop で Antigravity を起動
2. 以下のプロンプトを1つずつコピー&ペースト
3. 生成された画像を確認
4. 品質が良ければ残りも生成、調整が必要なら `IMPLEMENTATION_PLAN.md` を参照

---

## サンプル1: ネコ (Cat)

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

**保存先**: `public/images/animals/cat.png`

---

## サンプル2: イヌ (Dog)

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

**保存先**: `public/images/animals/dog.png`

---

## サンプル3: ライオン (Lion)

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

The Lion should look:
リーダーシップ, 勇敢, 強い

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/lion.png`

---

## サンプル4: パンダ (Panda)

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
のんびり, 可愛い, マイペース

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/panda.png`

---

## サンプル5: ペンギン (Penguin)

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
社交的, 協力的, 愛嬌がある

Keep it simple, charming, and instantly recognizable.
```

**保存先**: `public/images/animals/penguin.png`

---

## 品質チェックリスト

生成された画像を以下の観点で確認：

- [ ] **統一感**: 5つのイラストがMBTIライクなスタイルで統一されているか
- [ ] **識別性**: それぞれの動物が一目で分かるか
- [ ] **色の適用**: 背景色が指定した色になっているか
- [ ] **可愛さ**: 親しみやすく、可愛いデザインか
- [ ] **サイズ感**: キャラクターが大きすぎず小さすぎないか
- [ ] **シンプルさ**: 不要な装飾がなく、シンプルか

---

## 次のステップ

### ✅ 品質が良い場合
→ `image-prompts.json` の全100個を順次生成

### ⚠️ 調整が必要な場合

**もっとシンプルにしたい**
```diff
- Kawaii/cute aesthetic similar to Japanese character design
+ Ultra minimalist, geometric design with basic shapes only
```

**もっと可愛くしたい**
```diff
- Kawaii/cute aesthetic similar to Japanese character design
+ Super kawaii, chibi character style with large head and small body
```

**背景色を薄くしたい**
```diff
- Solid color background matching #FFB6C1
+ Soft pastel background with subtle gradient using #FFB6C1
```

**キャラクターを大きくしたい**
```diff
- Character should be centered and take up 70% of canvas
+ Character should be centered and take up 80% of canvas
```

調整後、再度5個生成して確認してください。

---

## 本番生成の準備

試作で問題なければ、以下のファイルを使って全100個を生成：
- `scripts/image-prompts.json` - プログラムで読み込む用
- `scripts/image-prompts.csv` - スプレッドシートで管理する用

**推奨**: 10個ずつバッチで生成し、途中で品質を確認しながら進める
