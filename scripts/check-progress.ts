/**
 * 画像生成の進捗を確認するスクリプト
 */

import * as fs from 'fs';
import * as path from 'path';
import { animals } from '../lib/animals';

const outputDir = 'public/images/animals';

// 既存の画像を確認
const existingImages = new Set<string>();
if (fs.existsSync(outputDir)) {
  const files = fs.readdirSync(outputDir);
  files.forEach(file => {
    if (file.endsWith('.png')) {
      existingImages.add(file.replace('.png', ''));
    }
  });
}

console.log('📊 画像生成の進捗状況\n');
console.log(`✅ 完了: ${existingImages.size} / ${animals.length}`);
console.log(`⏳ 残り: ${animals.length - existingImages.size}\n`);

// 完了リスト
console.log('✅ 生成済み:');
const completed = animals.filter(a => existingImages.has(a.id));
completed.forEach((a, i) => {
  console.log(`   ${i + 1}. ${a.name} (${a.id})`);
});

console.log('\n⏳ 未生成:');
const remaining = animals.filter(a => !existingImages.has(a.id));
remaining.slice(0, 10).forEach((a, i) => {
  console.log(`   ${i + 1}. ${a.name} (${a.id})`);
});

if (remaining.length > 10) {
  console.log(`   ... and ${remaining.length - 10} more`);
}

console.log('\n📝 次のアクション:');
if (existingImages.size === animals.length) {
  console.log('✅ 全画像生成完了！');
  console.log('   実行: npx tsx scripts/add-image-paths.ts');
} else {
  console.log('⏳ 引き続き画像を生成してください');
  console.log(`   次の動物: ${remaining[0]?.name} (${remaining[0]?.id})`);
}
