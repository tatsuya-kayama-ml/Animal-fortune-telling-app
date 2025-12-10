/**
 * animals.tsにimagePath プロパティを追加するスクリプト
 *
 * 使い方:
 * 1. public/images/animals/ に画像を配置
 * 2. npx tsx scripts/add-image-paths.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const animalsFilePath = path.join(__dirname, '../lib/animals.ts');
const imagesDir = path.join(__dirname, '../public/images/animals');

// 存在する画像ファイルを確認
function getAvailableImages(): Set<string> {
  const available = new Set<string>();

  if (!fs.existsSync(imagesDir)) {
    console.log(`⚠️  Images directory not found: ${imagesDir}`);
    console.log('Creating directory...');
    fs.mkdirSync(imagesDir, { recursive: true });
    return available;
  }

  const files = fs.readdirSync(imagesDir);
  files.forEach(file => {
    if (file.match(/\.(png|jpg|jpeg|webp|svg)$/i)) {
      const id = file.replace(/\.(png|jpg|jpeg|webp|svg)$/i, '');
      available.add(id);
    }
  });

  return available;
}

// animals.ts を読み込んで更新
function updateAnimalsFile() {
  const availableImages = getAvailableImages();

  console.log(`\n📊 Found ${availableImages.size} image files in ${imagesDir}`);

  if (availableImages.size === 0) {
    console.log('\n💡 Tip: Add images to public/images/animals/ first');
    console.log('   Example: public/images/animals/lion.png');
    return;
  }

  let content = fs.readFileSync(animalsFilePath, 'utf-8');

  // Animal インターフェースに imagePath を追加
  if (!content.includes('imagePath?:')) {
    content = content.replace(
      /export interface Animal \{[^}]+\}/s,
      (match) => {
        if (!match.includes('imagePath')) {
          return match.replace(
            'emoji: string;',
            'emoji: string;\n  imagePath?: string;'
          );
        }
        return match;
      }
    );
  }

  // 各動物オブジェクトに imagePath を追加
  let updatedCount = 0;
  availableImages.forEach(id => {
    // id: 'lion' の形式を探して、その動物オブジェクトに imagePath を追加
    const regex = new RegExp(
      `(\\{\\s*id:\\s*'${id}'[^}]+emoji:\\s*'[^']+')`,
      'g'
    );

    const newContent = content.replace(regex, (match) => {
      if (!match.includes('imagePath')) {
        updatedCount++;
        return match + `,\n    imagePath: '/images/animals/${id}.png'`;
      }
      return match;
    });

    if (newContent !== content) {
      content = newContent;
    }
  });

  // ファイルに書き込み
  fs.writeFileSync(animalsFilePath, content);

  console.log(`\n✅ Updated ${updatedCount} animals with image paths`);
  console.log(`📝 Modified: ${animalsFilePath}`);

  // 未対応の動物をリスト
  const allAnimals = content.match(/id:\s*'([^']+)'/g)?.map(m =>
    m.match(/id:\s*'([^']+)'/)?.[1]
  ).filter(Boolean) || [];

  const missing = allAnimals.filter(id => !availableImages.has(id || ''));

  if (missing.length > 0) {
    console.log(`\n⏳ Still need images for ${missing.length} animals:`);
    console.log(missing.slice(0, 10).join(', '));
    if (missing.length > 10) {
      console.log(`   ... and ${missing.length - 10} more`);
    }
  }
}

updateAnimalsFile();
