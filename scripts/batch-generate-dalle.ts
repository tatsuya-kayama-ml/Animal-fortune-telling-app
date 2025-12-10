/**
 * DALL-E 3を使って動物イラストを自動生成するスクリプト
 *
 * セットアップ（最も簡単）:
 * 1. OpenAI API keyを取得: https://platform.openai.com/api-keys
 * 2. .env.local に追加:
 *    OPENAI_API_KEY=sk-...
 *
 * 使い方:
 * npx tsx scripts/batch-generate-dalle.ts
 *
 * オプション:
 * --start 0 --end 10   # 0-10番目まで生成
 * --skip-existing      # 既存の画像をスキップ
 *
 * コスト: $0.040/画像 (1024x1024)
 * 100枚で約$4.00
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
  console.error('📝 Setup:');
  console.error('1. Get API key: https://platform.openai.com/api-keys');
  console.error('2. Create .env.local:');
  console.error('   echo "OPENAI_API_KEY=sk-..." > .env.local\n');
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
      quality: 'standard',
      style: 'natural'
    });

    const imageUrl = response.data?.[0]?.url;
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
  console.log('🚀 Starting batch image generation with DALL-E 3\n');

  const promptsPath = 'scripts/image-prompts.json';
  if (!fs.existsSync(promptsPath)) {
    console.error(`❌ ${promptsPath} not found`);
    console.error('   Run: npx tsx scripts/generate-prompts.ts');
    process.exit(1);
  }

  const allPrompts: PromptData[] = JSON.parse(fs.readFileSync(promptsPath, 'utf-8'));
  const prompts = allPrompts.slice(startIdx, endIdx);

  console.log(`📊 Generation plan:`);
  console.log(`   Total: ${prompts.length} animals`);
  console.log(`   Range: ${startIdx} to ${endIdx || allPrompts.length}`);
  console.log(`   Skip existing: ${skipExisting}`);
  console.log(`   Cost estimate: $${(prompts.length * 0.04).toFixed(2)}\n`);

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

    // レート制限対策（DALL-E 3は5 req/min）
    // 安全のため12秒間隔で実行
    if (i < prompts.length - 1) {
      console.log('   ⏳ Waiting 12 seconds (rate limit)...\n');
      await new Promise(resolve => setTimeout(resolve, 12000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Generation Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Successfully generated: ${successCount}`);
  console.log(`⏭️  Skipped (existing): ${skippedCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`💰 Actual cost: $${(successCount * 0.04).toFixed(2)}`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Check generated images in public/images/animals/');
    console.log('2. Run: npx tsx scripts/add-image-paths.ts');
    console.log('3. Test: npm run dev');
  }
}

main().catch(console.error);
