/**
 * 改善版プロンプトでDALL-E 3画像生成
 * 猫/犬のスタイルに統一
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as https from 'https';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in .env.local\n');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: API_KEY });

interface PromptData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  traits: string;
  prompt: string;
}

// コマンドライン引数
const args = process.argv.slice(2);
const skipExisting = args.includes('--skip-existing');
const startIdx = args.includes('--start') ? parseInt(args[args.indexOf('--start') + 1]) : 0;
const endIdx = args.includes('--end') ? parseInt(args[args.indexOf('--end') + 1]) : undefined;
const testMode = args.includes('--test'); // テストモード: 最初の3枚だけ

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generateImage(promptData: PromptData): Promise<boolean> {
  const outputDir = 'public/images/animals';
  const imagePath = path.join(outputDir, `${promptData.id}.png`);

  if (skipExisting && fs.existsSync(imagePath)) {
    console.log(`⏭️  Skipping ${promptData.name} - already exists`);
    return true;
  }

  try {
    console.log(`🎨 Generating ${promptData.name} (${promptData.nameEn})...`);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: promptData.prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd', // 高品質モード
      style: 'natural' // ナチュラルスタイル
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL returned');
    }

    await downloadImage(imageUrl, imagePath);

    console.log(`   ✅ Saved: ${imagePath}`);
    return true;

  } catch (error: any) {
    console.error(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting batch image generation with DALL-E 3 (Improved Prompts)\n');

  // 改善版プロンプトファイルを使用
  const promptsPath = 'scripts/image-prompts-v2.json';
  if (!fs.existsSync(promptsPath)) {
    console.error(`❌ ${promptsPath} not found`);
    console.error('   Run: npx tsx scripts/generate-prompts-v2.ts');
    process.exit(1);
  }

  const allPrompts: PromptData[] = JSON.parse(fs.readFileSync(promptsPath, 'utf-8'));

  // テストモードなら最初の3枚だけ
  let prompts: PromptData[];
  if (testMode) {
    prompts = allPrompts.slice(0, 3);
    console.log('🧪 TEST MODE: Generating first 3 animals only\n');
  } else {
    prompts = allPrompts.slice(startIdx, endIdx);
  }

  console.log(`📊 Generation plan:`);
  console.log(`   Total: ${prompts.length} animals`);
  console.log(`   Range: ${startIdx} to ${endIdx || allPrompts.length}`);
  console.log(`   Skip existing: ${skipExisting}`);
  console.log(`   Quality: HD (high detail)`);
  console.log(`   Cost estimate: $${(prompts.length * 0.08).toFixed(2)} (HD quality)\n`);

  const outputDir = 'public/images/animals';
  fs.mkdirSync(outputDir, { recursive: true });

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < prompts.length; i++) {
    const promptData = prompts[i];

    // 既存チェック
    const imagePath = path.join(outputDir, `${promptData.id}.png`);
    if (skipExisting && fs.existsSync(imagePath)) {
      console.log(`⏭️  Skipping ${promptData.name} - already exists`);
      skippedCount++;
      continue;
    }

    const success = await generateImage(promptData);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    console.log(`   Progress: ${i + 1}/${prompts.length} (✅${successCount} ⏭️${skippedCount} ❌${failCount})\n`);

    // レート制限対策（DALL-E 3 HDは5 req/min）
    if (i < prompts.length - 1) {
      console.log('   ⏳ Waiting 13 seconds (rate limit)...\n');
      await new Promise(resolve => setTimeout(resolve, 13000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Generation Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Successfully generated: ${successCount}`);
  console.log(`⏭️  Skipped (existing): ${skippedCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`💰 Actual cost: $${(successCount * 0.08).toFixed(2)} (HD quality)`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('='.repeat(60));

  if (testMode && successCount > 0) {
    console.log('\n🧪 TEST COMPLETE!');
    console.log('📝 Next steps:');
    console.log('1. Check the quality of generated images');
    console.log('2. If good, run: npx tsx scripts/batch-generate-dalle-v2.ts --skip-existing');
    console.log('3. If not, adjust prompts in generate-prompts-v2.ts and regenerate');
  } else if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Run: npx tsx scripts/add-image-paths.ts');
    console.log('2. Test: npm run dev');
  }
}

main().catch(console.error);
