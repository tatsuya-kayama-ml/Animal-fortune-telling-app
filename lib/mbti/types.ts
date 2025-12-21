// MBTI 16タイプの型定義

export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIProfile {
  type: MBTIType;
  name: string;           // 日本語名（建築家、論理学者など）
  group: MBTIGroup;       // グループ（分析家、外交官など）
  traits: string[];       // 特徴
  keywords: string[];     // 解説生成用キーワード
}

export type MBTIGroup = 'analyst' | 'diplomat' | 'sentinel' | 'explorer';

export interface MBTIGroupInfo {
  id: MBTIGroup;
  name: string;
  color: string;
  types: MBTIType[];
}

// 動物カテゴリ（性格傾向でグループ化）
export type AnimalCategory =
  | 'independent'   // 独立型
  | 'social'        // 社交型
  | 'calm'          // 穏やか型
  | 'leader'        // リーダー型
  | 'analytical'    // 分析型
  | 'creative'      // 創造型
  | 'protective'    // 保護型
  | 'adaptable';    // 適応型

// MBTI×動物の解説結果
export interface AnimalMBTIInsight {
  nickname: string;           // ニックネーム（孤高の軍師など）
  description: string;        // 組み合わせ解説
  specialTraits: string[];    // 特別な特徴
}

export function isValidMBTIType(value: string): value is MBTIType {
  const validTypes: MBTIType[] = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];
  return validTypes.includes(value as MBTIType);
}
