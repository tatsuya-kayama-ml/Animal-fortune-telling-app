/**
 * 全96種類の動物に相性の悪い動物を手動で追加
 * 各動物の性格特性に基づいて3つずつ設定
 */

import * as fs from 'fs';
import * as path from 'path';

// 各動物IDと相性の悪い動物名のマッピング
const incompatibilityData: Record<string, string[]> = {
  // 既に設定済み (5種類)
  cat: ['ビーバー', 'アリ', 'ミツバチ'],
  dog: ['ヘビ', 'カメレオン', 'ワニ'],
  rabbit: ['トラ', 'ワシ', 'サメ'],
  fox: ['イヌ', 'ウサギ', 'ヒツジ'],
  owl: ['イルカ', 'サル', 'オウム'],

  // 残り91種類（パンダから）
  panda: ['チーター', 'ビーバー', 'アリ'],
  penguin: ['ヘビ', 'シャチ', 'サメ'],
  lion: ['ヒツジ', 'ウサギ', 'ハイエナ'],
  dolphin: ['サメ', 'シャチ', 'ワニ'],
  koala: ['サル', 'チーター', 'ハイエナ'],
  tiger: ['ヒツジ', 'ウサギ', 'カモ'],
  bear: ['キツネ', 'ヘビ', 'ワシ'],
  elephant: ['ネズミ', 'リス', 'ハムスター'],
  monkey: ['フクロウ', 'カメ', 'ナマケモノ'],
  horse: ['ヘビ', 'カメレオン', 'ワニ'],
  sheep: ['オオカミ', 'トラ', 'ライオン'],
  duck: ['キツネ', 'ワニ', 'カメ'],
  hedgehog: ['サル', 'ヘビ', 'キツネ'],
  wolf: ['ヒツジ', 'ウサギ', 'カモ'],
  deer: ['オオカミ', 'トラ', 'ライオン'],
  giraffe: ['ライオン', 'ハイエナ', 'ヒョウ'],
  squirrel: ['ヘビ', 'フクロウ', 'ネコ'],
  flamingo: ['ワニ', 'ハイエナ', 'ヘビ'],
  peacock: ['コウモリ', 'ネズミ', 'ヘビ'],
  bat: ['ワシ', 'フクロウ', 'ネコ'],
  otter: ['ヘビ', 'ワニ', 'サメ'],
  sloth: ['サル', 'チーター', 'ビーバー'],
  raccoon: ['イヌ', 'オオカミ', 'ワシ'],
  chameleon: ['イヌ', 'イルカ', 'サル'],
  turtle: ['ワニ', 'サメ', 'ハイエナ'],
  snake: ['イヌ', 'ウサギ', 'イルカ'],
  cheetah: ['カメ', 'ナマケモノ', 'パンダ'],
  zebra: ['ライオン', 'ハイエナ', 'ワニ'],
  hippo: ['ワニ', 'ライオン', 'ハイエナ'],
  rhino: ['ハイエナ', 'ライオン', 'トラ'],
  kangaroo: ['ヘビ', 'ワニ', 'イヌ'],
  parrot: ['ヘビ', 'ワシ', 'ネコ'],
  seal: ['シャチ', 'サメ', 'ホッキョクグマ'],
  whale: ['シャチ', 'サメ', 'イカ'],
  octopus: ['サメ', 'イルカ', 'ワシ'],
  butterfly: ['クモ', 'カマキリ', 'トカゲ'],
  bee: ['クマ', 'スズメバチ', 'カマキリ'],
  ant: ['アリクイ', 'カマキリ', 'クモ'],
  ladybug: ['カマキリ', 'クモ', 'トカゲ'],
  frog: ['ヘビ', 'ワシ', 'コウノトリ'],
  crab: ['タコ', 'カモメ', 'ワシ'],
  swan: ['キツネ', 'ワニ', 'ワシ'],
  rooster: ['キツネ', 'ワシ', 'ヘビ'],
  hummingbird: ['ワシ', 'ヘビ', 'カマキリ'],
  eagle: ['ヘビ', 'ワシ', 'ライオン'],
  raccoondog: ['オオカミ', 'キツネ', 'クマ'],
  gorilla: ['ヒョウ', 'ワニ', 'ヘビ'],
  meerkat: ['ワシ', 'ヘビ', 'ジャッカル'],
  crocodile: ['カバ', 'ライオン', 'ゾウ'],
  lemur: ['ヘビ', 'ワシ', 'フォッサ'],
  armadillo: ['ジャガー', 'ワシ', 'ヘビ'],
  porcupine: ['ライオン', 'ヒョウ', 'ワシ'],
  badger: ['クマ', 'オオカミ', 'ワシ'],
  platypus: ['ヘビ', 'ワニ', 'ワシ'],
  lynx: ['ヘビ', 'クマ', 'オオカミ'],
  bison: ['オオカミ', 'クマ', 'ライオン'],
  mantis: ['カマキリ', 'トカゲ', 'カエル'],
  dragonfly: ['クモ', 'カエル', 'トカゲ'],
  cricket: ['カマキリ', 'クモ', 'トカゲ'],
  firefly: ['クモ', 'カエル', 'コウモリ'],
  spider: ['ハチ', 'トカゲ', 'ワシ'],
  scorpion: ['トカゲ', 'ヘビ', 'ワシ'],
  jellyfish: ['ウミガメ', 'マンボウ', 'サメ'],
  starfish: ['カモメ', 'カニ', 'タコ'],
  seahorse: ['カニ', 'タコ', 'マグロ'],
  stingray: ['サメ', 'シャチ', 'タコ'],
  clownfish: ['タコ', 'ウツボ', 'サメ'],
  anglerfish: ['サメ', 'シャチ', 'イカ'],
  moose: ['オオカミ', 'クマ', 'ワシ'],
  reindeer: ['オオカミ', 'クマ', 'ワシ'],
  alpaca: ['ピューマ', 'ワシ', 'ヘビ'],
  llama: ['ピューマ', 'ワシ', 'ヘビ'],
  donkey: ['ライオン', 'ハイエナ', 'ワニ'],
  camel: ['ライオン', 'ハイエナ', 'ヘビ'],
  hyena: ['ライオン', 'ゾウ', 'サイ'],
  wombat: ['ディンゴ', 'ワシ', 'ヘビ'],
  quokka: ['ヘビ', 'ディンゴ', 'ワシ'],
  opossum: ['ワシ', 'キツネ', 'ヘビ'],
  chipmunk: ['ヘビ', 'ワシ', 'キツネ'],
  hamster: ['ヘビ', 'フクロウ', 'ネコ'],
  mouse: ['ネコ', 'フクロウ', 'ヘビ'],
  mole: ['キツネ', 'イタチ', 'ワシ'],
  stoat: ['ワシ', 'キツネ', 'オオカミ'],
  weasel: ['ワシ', 'キツネ', 'フクロウ'],
  ferret: ['ワシ', 'ヘビ', 'キツネ'],
  capybara: ['ジャガー', 'ワニ', 'アナコンダ'],
  puffin: ['ワシ', 'キツネ', 'カモメ'],
  toucan: ['ワシ', 'ヘビ', 'サル'],
  pelican: ['ワシ', 'サメ', 'ワニ'],
  kiwi: ['イタチ', 'ネコ', 'ワシ'],
  shark: ['シャチ', 'イルカ', 'ワニ'],
};

function addIncompatibilityToAnimals() {
  const filePath = path.join(process.cwd(), 'lib/animals.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  let addedCount = 0;
  let skippedCount = 0;

  // 各動物に対してincompatibilityを追加
  Object.entries(incompatibilityData).forEach(([animalId, incompatibleAnimals]) => {
    // すでにincompatibilityが設定されているかチェック
    const alreadyHasIncompat = new RegExp(
      `id: '${animalId}',[\\s\\S]*?incompatibility: \\[`,
      'g'
    ).test(content);

    if (alreadyHasIncompat) {
      console.log(`⏭️  ${animalId}: すでに設定済み`);
      skippedCount++;
      return;
    }

    // compatibilityの行を見つけてその後にincompatibilityを挿入
    const pattern = new RegExp(
      `(id: '${animalId}',[\\s\\S]*?compatibility: \\[[^\\]]+\\]),(?!\\s*incompatibility:)`,
      'g'
    );

    if (pattern.test(content)) {
      content = content.replace(
        pattern,
        `$1\n    incompatibility: ['${incompatibleAnimals.join("', '")}'],`
      );
      console.log(`✅ ${animalId}: ${incompatibleAnimals.join(', ')}`);
      addedCount++;
    }
  });

  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ 完了: ${addedCount}個の動物に相性の悪い動物を追加`);
  console.log(`⏭️  スキップ: ${skippedCount}個（すでに設定済み）`);
  console.log('='.repeat(60));
}

addIncompatibilityToAnimals();
