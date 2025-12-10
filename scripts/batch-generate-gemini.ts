/**
 * Gemini APIを使って動物イラストを自動生成するスクリプト
 *
 * 使い方:
 * 1. .env.local に GEMINI_API_KEY を設定
 * 2. npx tsx scripts/batch-generate-gemini.ts
 *
 * オプション:
 * - npx tsx scripts/batch-generate-gemini.ts --all       全100個生成
 * - npx tsx scripts/batch-generate-gemini.ts --start 0 --end 10   0-10番目まで生成
 * - npx tsx scripts/batch-generate-gemini.ts --skip-existing      既存をスキップ
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// .env.local を読み込み
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not found in .env.local');
  console.error('\n📝 To fix this:');
  console.error('1. Get API key from: https://aistudio.google.com/app/apikey');
  console.error('2. Create .env.local file:');
  console.error('   echo "GEMINI_API_KEY=your_api_key_here" > .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

interface PromptData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  traits: string;
  prompt: string;
}

// コマンドライン引数の解析
const args = process.argv.slice(2);
const isAll = args.includes('--all');
const skipExisting = args.includes('--skip-existing');
const startIdx = args.includes('--start') ? parseInt(args[args.indexOf('--start') + 1]) : 0;
const endIdx = args.includes('--end') ? parseInt(args[args.indexOf('--end') + 1]) : undefined;

async function generateImage(promptData: PromptData): Promise<boolean> {
  const outputDir = 'public/images/animals';
  const imagePath = path.join(outputDir, `${promptData.id}.png`);

  // 既存ファイルをスキップ
  if (skipExisting && fs.existsSync(imagePath)) {
    console.log(`⏭️  Skipping ${promptData.name} (${promptData.id}) - already exists`);
    return true;
  }

  try {
    console.log(`🎨 Generating ${promptData.name} (${promptData.nameEn})...`);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp'
    });

    const result = await model.generateContent([promptData.prompt]);
    const response = await result.response;
    const text = response.text();

    // 注意: Gemini Flash 2.0は直接画像生成できないため、
    // Imagen 3 APIを使用する必要があります
    // 現在のGemini APIではテキスト生成のみサポート

    console.log(`⚠️  ${promptData.name}: Gemini response received, but image generation not yet implemented`);
    console.log(`   Response: ${text.substring(0, 100)}...`);

    return false;
  } catch (error) {
    console.error(`❌ Failed to generate ${promptData.name}:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting batch image generation with Gemini API\n');

  // プロンプトファイルを読み込み
  const promptsPath = 'scripts/image-prompts.json';
  if (!fs.existsSync(promptsPath)) {
    console.error(`❌ Error: ${promptsPath} not found`);
    console.error('   Run: npx tsx scripts/generate-prompts.ts');
    process.exit(1);
  }

  const allPrompts: PromptData[] = JSON.parse(fs.readFileSync(promptsPath, 'utf-8'));

  // 生成範囲を決定
  const prompts = isAll
    ? allPrompts
    : allPrompts.slice(startIdx, endIdx);

  console.log(`📊 Total animals to generate: ${prompts.length}`);
  console.log(`   Start index: ${startIdx}`);
  console.log(`   End index: ${endIdx || allPrompts.length}`);
  console.log(`   Skip existing: ${skipExisting}\n`);

  // 出力ディレクトリを作成
  const outputDir = 'public/images/animals';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < prompts.length; i++) {
    const promptData = prompts[i];
    const success = await generateImage(promptData);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // 進捗表示
    console.log(`   Progress: ${i + 1}/${prompts.length} (✅ ${successCount} | ❌ ${failCount})\n`);

    // レート制限を避けるため1秒待機
    if (i < prompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully generated: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Images saved to: ${outputDir}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Run: npx tsx scripts/add-image-paths.ts');
    console.log('2. Test: npm run dev');
  }
}

main().catch(console.error);
