import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { config } from 'dotenv';
import { animals } from '../lib/animals';

// .env.localを読み込む
config({ path: path.join(process.cwd(), '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 画像が必要な動物のIDリスト
const animalsNeedingImages = [
  'hedgehog', 'bat', 'otter', 'sloth', 'seal', 'meerkat',
  'armadillo', 'porcupine', 'badger', 'bison', 'mantis', 'cricket',
  'firefly', 'scorpion', 'jellyfish', 'starfish', 'alpaca', 'llama',
  'donkey', 'wombat', 'opossum', 'mole', 'stoat', 'weasel',
  'ferret', 'capybara', 'kiwi'
];

async function generateNotoStyleImage(animal: typeof animals[0]) {
  console.log(`\n🎨 ${animal.name} (${animal.nameEn}) の画像を生成中...`);

  const prompt = `A cute ${animal.nameEn} in the style of Google Noto Color Emoji or Android emoji.
The image should be:
- Simple, flat design with clean lines
- Bright, cheerful colors
- Minimalist style like Android/Google emoji
- Centered on a transparent or white background
- Friendly and approachable appearance
- Round, soft shapes
- No text or labels

Create a single ${animal.nameEn} character that looks like it could be an Android emoji.`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error('画像URLが取得できませんでした');
    }

    // 画像をダウンロード
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 保存先ディレクトリを確保
    const publicDir = path.join(process.cwd(), 'public', 'images', 'animals');
    await fs.mkdir(publicDir, { recursive: true });

    // ファイル名を生成
    const filename = `${animal.id}-noto.png`;
    const filepath = path.join(publicDir, filename);

    // 画像を保存
    await fs.writeFile(filepath, buffer);

    console.log(`✅ 保存完了: ${filename}`);
    return `/images/animals/${filename}`;
  } catch (error) {
    console.error(`❌ エラー: ${animal.name}`, error);
    return null;
  }
}

async function main() {
  console.log('=== Notoスタイル画像生成開始 ===');
  console.log(`生成対象: ${animalsNeedingImages.length}種類の動物\n`);

  const results: Record<string, string | null> = {};

  for (const animalId of animalsNeedingImages) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) {
      console.log(`⚠️ 動物が見つかりません: ${animalId}`);
      continue;
    }

    const imagePath = await generateNotoStyleImage(animal);
    results[animalId] = imagePath;

    // API制限を避けるため、少し待機
    if (imagePath) {
      console.log('⏳ 3秒待機中...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // 結果をまとめて表示
  console.log('\n=== 生成結果サマリー ===');
  const successful = Object.values(results).filter(r => r !== null).length;
  console.log(`成功: ${successful} / ${animalsNeedingImages.length}`);

  // 結果をJSONファイルに保存
  const resultPath = path.join(process.cwd(), 'scripts', 'noto-image-paths.json');
  await fs.writeFile(resultPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 結果を保存しました: ${resultPath}`);
}

main().catch(console.error);
