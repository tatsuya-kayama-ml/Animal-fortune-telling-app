/**
 * 全ての動物に相性の悪い動物を自動追加するスクリプト
 *
 * 相性の悪い動物の選定基準:
 * - 性格が正反対の動物
 * - 行動パターンが合わない動物
 * - ストレス要因となりそうな動物
 */

import * as fs from 'fs';
import { animals } from '../lib/animals';

// 性格タイプ別の相性が悪い動物マッピング
const incompatibilityMap: Record<string, string[]> = {
  // マイペース・自由系 → 規律重視・集団行動系
  'マイペース': ['ビーバー', 'アリ', 'ミツバチ', 'ペンギン'],
  '自由': ['ビーバー', 'アリ', 'ミツバチ'],
  '独立': ['イヌ', 'イルカ', 'ゾウ'],

  // 社交的・活発系 → 孤独・静か系
  '社交的': ['ヘビ', 'カメレオン', 'フクロウ', 'ナマケモノ'],
  '明るい': ['コウモリ', 'フクロウ', 'カメレオン'],
  'ポジティブ': ['サソリ', 'ワニ', 'ヘビ'],

  // 繊細・優しい系 → 強引・攻撃的系
  '繊細': ['トラ', 'ワシ', 'サメ', 'ライオン'],
  '優しい': ['ハイエナ', 'ワニ', 'サソリ'],
  '平和': ['オオカミ', 'チーター', 'ヘビ'],

  // 知的・冷静系 → 感情的・直感系
  '知的': ['イルカ', 'サル', 'オウム'],
  '冷静': ['サル', 'リス', 'ハチドリ'],
  '論理的': ['チョウ', 'カワウソ', 'イルカ'],

  // 計画的・慎重系 → 衝動的・大雑把系
  '慎重': ['サル', 'カワウソ', 'チーター'],
  '完璧主義': ['ナマケモノ', 'パンダ', 'カピバラ'],

  // リーダー系 → 協調性なし系
  'リーダー': ['ネコ', 'キツネ', 'カメレオン'],
  '統率力': ['タヌキ', 'キツネ', 'アライグマ'],

  // のんびり系 → せっかち・効率系
  'のんびり': ['チーター', 'ビーバー', 'アリ'],
};

// 動物名から性格キーワードを抽出して相性の悪い動物を提案
function suggestIncompatibility(animal: typeof animals[0]): string[] {
  const incompatible = new Set<string>();

  // 既存のincompatibilityがあればそれを使用
  if (animal.incompatibility && animal.incompatibility.length > 0) {
    return animal.incompatibility;
  }

  // traitsから相性の悪い動物を探す
  animal.traits.forEach(trait => {
    Object.entries(incompatibilityMap).forEach(([key, values]) => {
      if (trait.includes(key)) {
        values.forEach(v => incompatible.add(v));
      }
    });
  });

  // weaknessesから相性の悪い動物を追加
  if (animal.weaknesses) {
    animal.weaknesses.forEach(weakness => {
      if (weakness.includes('孤立') || weakness.includes('孤独')) {
        incompatible.add('ネコ');
        incompatible.add('フクロウ');
      }
      if (weakness.includes('依存')) {
        incompatible.add('ヘビ');
        incompatible.add('カメレオン');
      }
      if (weakness.includes('傷つき')) {
        incompatible.add('トラ');
        incompatible.add('ワシ');
      }
    });
  }

  // 自分自身を除外
  incompatible.delete(animal.name);

  // compatibilityとの重複を除外
  if (animal.compatibility) {
    animal.compatibility.forEach(c => incompatible.delete(c));
  }

  // 3つに絞る
  const result = Array.from(incompatible).slice(0, 3);

  // 足りない場合はデフォルト値を追加
  while (result.length < 3) {
    const defaults = ['ヘビ', 'ワニ', 'サソリ', 'ハイエナ', 'カメレオン', 'サメ'];
    for (const def of defaults) {
      if (!result.includes(def) && def !== animal.name) {
        result.push(def);
        if (result.length === 3) break;
      }
    }
  }

  return result;
}

// animals.tsファイルを更新
function updateAnimalsFile() {
  console.log('🚀 全ての動物に相性の悪い動物を追加中...\n');

  const filePath = 'lib/animals.ts';
  let content = fs.readFileSync(filePath, 'utf-8');

  let updatedCount = 0;

  animals.forEach((animal, index) => {
    // 既にincompatibilityがある場合はスキップ
    if (animal.incompatibility && animal.incompatibility.length > 0) {
      console.log(`⏭️  ${animal.name}: すでに設定済み`);
      return;
    }

    const incompatibility = suggestIncompatibility(animal);
    console.log(`✅ ${animal.name}: ${incompatibility.join(', ')}`);

    // compatibilityの後に incompatibility を挿入
    const compatibilityPattern = new RegExp(
      `(id: '${animal.id}',[\\s\\S]*?compatibility: \\[[^\\]]+\\],)(?!\\s*incompatibility:)`,
      'g'
    );

    const replacement = `$1\n    incompatibility: ['${incompatibility.join("', '")}'],`;

    if (compatibilityPattern.test(content)) {
      content = content.replace(compatibilityPattern, replacement);
      updatedCount++;
    }
  });

  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`\n✅ 完了: ${updatedCount}個の動物に相性の悪い動物を追加しました`);
}

updateAnimalsFile();
