/**
 * Vertex AI Imagen 3を使って動物イラストを自動生成するスクリプト
 *
 * セットアップ:
 * 1. Google Cloud Projectを作成
 * 2. Vertex AI APIを有効化
 * 3. サービスアカウントキーを取得
 * 4. .env.local に設定を追加
 *
 * 使い方:
 * npx tsx scripts/batch-generate-imagen.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

interface PromptData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  traits: string;
  prompt: string;
}

async function generateImageWithImagen(promptData: PromptData): Promise<boolean> {
  if (!PROJECT_ID) {
    console.error('❌ GOOGLE_CLOUD_PROJECT_ID not set');
    return false;
  }

  const outputDir = 'public/images/animals';
  const imagePath = path.join(outputDir, `${promptData.id}.png`);

  try {
    console.log(`🎨 Generating ${promptData.name} (${promptData.nameEn})...`);

    // Vertex AI Imagen 3 API呼び出し
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;

    const requestBody = {
      instances: [
        {
          prompt: promptData.prompt
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: '1:1',
        negativePrompt: 'text, watermark, signature, blurry, distorted',
        safetyFilterLevel: 'block_some',
        personGeneration: 'dont_allow'
      }
    };

    // Google Cloud認証が必要
    // この例では、gcloud CLI経由でアクセストークンを取得
    const { execSync } = require('child_process');
    const accessToken = execSync('gcloud auth print-access-token').toString().trim();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    const imageData = result.predictions[0].bytesBase64Encoded;

    // Base64画像をデコードして保存
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(imagePath, buffer);

    console.log(`   ✅ Saved: ${imagePath}`);
    return true;

  } catch (error) {
    console.error(`   ❌ Failed: ${error}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting batch image generation with Imagen 3\n');

  // 設定チェック
  if (!PROJECT_ID) {
    console.error('❌ Error: Google Cloud Project ID not configured\n');
    console.error('📝 Setup instructions:');
    console.error('1. Create Google Cloud Project: https://console.cloud.google.com/');
    console.error('2. Enable Vertex AI API');
    console.error('3. Install gcloud CLI: https://cloud.google.com/sdk/docs/install');
    console.error('4. Authenticate: gcloud auth login');
    console.error('5. Add to .env.local:');
    console.error('   GOOGLE_CLOUD_PROJECT_ID=your-project-id');
    console.error('   GOOGLE_CLOUD_LOCATION=us-central1');
    process.exit(1);
  }

  // gcloud CLI の確認
  try {
    const { execSync } = require('child_process');
    execSync('gcloud --version', { stdio: 'ignore' });
  } catch {
    console.error('❌ Error: gcloud CLI not found');
    console.error('   Install from: https://cloud.google.com/sdk/docs/install');
    process.exit(1);
  }

  const promptsPath = 'scripts/image-prompts.json';
  const prompts: PromptData[] = JSON.parse(fs.readFileSync(promptsPath, 'utf-8'));

  const outputDir = 'public/images/animals';
  fs.mkdirSync(outputDir, { recursive: true });

  let successCount = 0;
  let failCount = 0;

  // 既存の画像をスキップ
  const existingImages = new Set(fs.readdirSync(outputDir).map(f => f.replace('.png', '')));

  for (let i = 0; i < prompts.length; i++) {
    const promptData = prompts[i];

    if (existingImages.has(promptData.id)) {
      console.log(`⏭️  Skipping ${promptData.name} - already exists`);
      continue;
    }

    const success = await generateImageWithImagen(promptData);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    console.log(`   Progress: ${i + 1}/${prompts.length}\n`);

    // レート制限対策（6秒間隔）
    if (i < prompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
