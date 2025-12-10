# 🎨 Gemini画像生成バッチ - 進捗管理

## 📊 全体進捗

**完了: 14 / 96 (14.6%)**
**残り: 82 / 96 (85.4%)**

---

## 📁 バッチファイル一覧

### ✅ Batch 1: 完了
**動物 1-14**
- Cat, Dog, Rabbit, Fox, Owl, Panda, Penguin, Lion, Dolphin, Koala, Tiger, Bear, Elephant, Monkey
- ✅ すべて生成済み

---

### ⏳ Batch 2: 次のバッチ
**動物 15-34 (20種類)**

📄 **ファイル**: [GEMINI_BATCH_2.md](./GEMINI_BATCH_2.md)

含まれる動物:
- Horse (ウマ)
- Sheep (ヒツジ)
- Duck (カモ)
- Hedgehog (ハリネズミ)
- Wolf (オオカミ)
- Deer (シカ)
- Giraffe (キリン)
- Squirrel (リス)
- Flamingo (フラミンゴ)
- Peacock (クジャク)
- Parrot (オウム)
- Snake (ヘビ)
- Crocodile (ワニ)
- Turtle (カメ)
- Frog (カエル)
- Butterfly (チョウ)
- Bee (ミツバチ)
- Ladybug (テントウムシ)
- Spider (クモ)
- Ant (アリ)

---

### ⏳ Batch 3
**動物 35-54 (20種類)**

📄 **ファイル**: [GEMINI_BATCH_3.md](./GEMINI_BATCH_3.md)

含まれる動物:
- Dragonfly (トンボ)
- Octopus (タコ)
- Squid (イカ)
- Crab (カニ)
- Lobster (ロブスター)
- Shrimp (エビ)
- Whale (クジラ)
- Shark (サメ)
- Jellyfish (クラゲ)
- Seal (アザラシ)
- Otter (カワウソ)
- Beaver (ビーバー)
- Platypus (カモノハシ)
- Sloth (ナマケモノ)
- Armadillo (アルマジロ)
- Kangaroo (カンガルー)
- Bat (コウモリ)
- Raccoon (アライグマ)
- Skunk (スカンク)
- Badger (アナグマ)

---

### ⏳ Batch 4
**動物 55-74 (20種類)**

📄 **ファイル**: [GEMINI_BATCH_4.md](./GEMINI_BATCH_4.md)

含まれる動物:
- Porcupine (ヤマアラシ)
- Swan (ハクチョウ)
- Eagle (ワシ)
- Hawk (タカ)
- Crow (カラス)
- Pigeon (ハト)
- Sparrow (スズメ)
- Woodpecker (キツツキ)
- Hummingbird (ハチドリ)
- Ostrich (ダチョウ)
- Emu (エミュー)
- Chicken (ニワトリ)
- Rooster (オンドリ)
- Turkey (七面鳥)
- Goose (ガチョウ)
- Seagull (カモメ)
- Stork (コウノトリ)
- Crane (ツル)
- Heron (サギ)
- Vulture (ハゲワシ)

---

### ⏳ Batch 5: 最終バッチ
**動物 75-96 (22種類)**

📄 **ファイル**: [GEMINI_BATCH_5.md](./GEMINI_BATCH_5.md)

含まれる動物:
- Rhino (サイ)
- Hippo (カバ)
- Buffalo (バッファロー)
- Bison (バイソン)
- Cheetah (チーター)
- Leopard (ヒョウ)
- Jaguar (ジャガー)
- Lynx (オオヤマネコ)
- Starfish (ヒトデ)
- Seahorse (タツノオトシゴ)
- Stingray (エイ)
- Clownfish (カクレクマノミ)
- Anglerfish (チョウチンアンコウ)
- Moose (ヘラジカ)
- Reindeer (トナカイ)
- Alpaca (アルパカ)
- Llama (リャマ)
- Donkey (ロバ)
- Camel (ラクダ)
- Hyena (ハイエナ)
- Wombat (ウォンバット)
- Quokka (クオッカ)
... (残り)

---

## 🚀 使い方

### 1. バッチファイルを開く
例: `docs/GEMINI_BATCH_2.md`

### 2. Geminiで生成
1. https://aistudio.google.com/ を開く
2. 「Imagen」を選択
3. プロンプトをコピー&ペースト
4. 生成ボタンをクリック

### 3. 画像を保存
生成された画像を `public/images/animals/` に保存
- ファイル名は各プロンプトに記載（例: `horse.png`）

### 4. 進捗確認
```bash
npx tsx scripts/check-progress.ts
```

### 5. コードに反映（10個ごと推奨）
```bash
npx tsx scripts/add-image-paths.ts
npm run dev  # 確認
```

---

## 📝 推奨ワークフロー

1. **Batch 2 の 20個を生成**（1-2時間）
2. **保存・確認**
3. **Batch 3 の 20個を生成**
4. **保存・確認**
5. **以下同様に続ける**

---

## ✅ 完了時

全96種類の画像が揃ったら：

```bash
# 最終確認
npx tsx scripts/check-progress.ts

# コードに反映
npx tsx scripts/add-image-paths.ts

# テスト
npm run dev

# コミット
git add public/images/animals/
git commit -m "Add all 96 animal illustrations"

# プッシュ
git push
```

---

## 💡 Tips

- **10-20個ずつ生成**することで、品質を確認しながら進められます
- **バッチごとにコミット**すると、問題があっても戻しやすい
- **進捗確認コマンド**を使って、どこまで完了したか把握できます

頑張ってください！🎉
