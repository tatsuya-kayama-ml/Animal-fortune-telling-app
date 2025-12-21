import { MBTIType, AnimalMBTIInsight } from './types';
import { animals, Animal } from '../animals';
import { getMBTIProfile } from './profiles';
import { getAnimalCategory } from './animalCategories';
import { nicknameTemplates, descriptionTemplates } from './templates';

/**
 * 動物とMBTIの組み合わせから解説を生成する
 */
export function generateAnimalMBTIInsight(
  animalId: string,
  mbtiType: MBTIType
): AnimalMBTIInsight | null {
  const animal = animals.find((a) => a.id === animalId);
  if (!animal) return null;

  const mbtiProfile = getMBTIProfile(mbtiType);
  const category = getAnimalCategory(animalId);

  // ニックネームを取得
  const nickname = nicknameTemplates[mbtiType][category];

  // 解説テンプレートを取得して置換
  const descriptionTemplate = descriptionTemplates[mbtiType][category];
  const description = descriptionTemplate
    .replace(/{animal}/g, animal.name)
    .replace(/{mbti}/g, mbtiProfile.name);

  // 特別な特徴を生成（動物の特性とMBTIの特性を組み合わせ）
  const specialTraits = generateSpecialTraits(animal, mbtiProfile.traits);

  return {
    nickname,
    description,
    specialTraits,
  };
}

/**
 * 動物の特性とMBTIの特性を組み合わせて特別な特徴を生成
 */
function generateSpecialTraits(animal: Animal, mbtiTraits: string[]): string[] {
  const traits: string[] = [];

  // 動物の最初の特徴とMBTIの最初の特徴を組み合わせ
  if (animal.traits.length > 0 && mbtiTraits.length > 0) {
    traits.push(`${animal.traits[0]}な${mbtiTraits[0]}の持ち主`);
  }

  // 動物の強みがあれば追加
  if (animal.strengths && animal.strengths.length > 0) {
    traits.push(animal.strengths[0]);
  }

  // MBTIの2番目の特徴があれば追加
  if (mbtiTraits.length > 1) {
    traits.push(mbtiTraits[1]);
  }

  return traits.slice(0, 3); // 最大3つ
}

/**
 * 動物名からIDを取得
 */
export function getAnimalIdByName(name: string): string | null {
  const animal = animals.find((a) => a.name === name);
  return animal ? animal.id : null;
}
