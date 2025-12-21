import { MBTIType, MBTIProfile, MBTIGroup, MBTIGroupInfo } from './types';

// MBTIグループ情報
export const mbtiGroups: MBTIGroupInfo[] = [
  {
    id: 'analyst',
    name: '分析家',
    color: 'purple',
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  },
  {
    id: 'diplomat',
    name: '外交官',
    color: 'green',
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  },
  {
    id: 'sentinel',
    name: '番人',
    color: 'blue',
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  },
  {
    id: 'explorer',
    name: '探検家',
    color: 'yellow',
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
  },
];

// 16タイプの詳細プロファイル
export const mbtiProfiles: Record<MBTIType, MBTIProfile> = {
  // 分析家グループ
  INTJ: {
    type: 'INTJ',
    name: '建築家',
    group: 'analyst',
    traits: ['戦略的思考', '独立心', '高い基準', '長期的視野'],
    keywords: ['戦略', '効率', '改善', '独自路線', '完璧主義'],
  },
  INTP: {
    type: 'INTP',
    name: '論理学者',
    group: 'analyst',
    traits: ['論理的分析', '知的好奇心', '革新的発想', '客観性'],
    keywords: ['分析', '理論', '探求', '独創性', '内省'],
  },
  ENTJ: {
    type: 'ENTJ',
    name: '指揮官',
    group: 'analyst',
    traits: ['決断力', 'リーダーシップ', '効率追求', '野心'],
    keywords: ['指揮', '目標達成', '組織化', '自信', '挑戦'],
  },
  ENTP: {
    type: 'ENTP',
    name: '討論者',
    group: 'analyst',
    traits: ['機知', '柔軟な発想', '議論好き', '起業家精神'],
    keywords: ['革新', '議論', '可能性', 'アイデア', '挑発'],
  },

  // 外交官グループ
  INFJ: {
    type: 'INFJ',
    name: '提唱者',
    group: 'diplomat',
    traits: ['洞察力', '理想主義', '共感力', '献身'],
    keywords: ['直感', '意味', '調和', '導き', '深い理解'],
  },
  INFP: {
    type: 'INFP',
    name: '仲介者',
    group: 'diplomat',
    traits: ['創造性', '共感力', '誠実さ', '理想追求'],
    keywords: ['価値観', '自己表現', '癒し', '純粋', '内面世界'],
  },
  ENFJ: {
    type: 'ENFJ',
    name: '主人公',
    group: 'diplomat',
    traits: ['カリスマ性', '利他主義', '影響力', '情熱'],
    keywords: ['導く', '鼓舞', '成長支援', '調和', '使命感'],
  },
  ENFP: {
    type: 'ENFP',
    name: '広報運動家',
    group: 'diplomat',
    traits: ['熱意', '創造性', '社交性', '楽観主義'],
    keywords: ['可能性', '自由', '情熱', 'つながり', '冒険'],
  },

  // 番人グループ
  ISTJ: {
    type: 'ISTJ',
    name: '管理者',
    group: 'sentinel',
    traits: ['責任感', '誠実さ', '実直さ', '組織力'],
    keywords: ['義務', '伝統', '信頼', '秩序', '継続'],
  },
  ISFJ: {
    type: 'ISFJ',
    name: '擁護者',
    group: 'sentinel',
    traits: ['献身', '思いやり', '忍耐力', '観察力'],
    keywords: ['守る', '支える', '記憶', '安定', '奉仕'],
  },
  ESTJ: {
    type: 'ESTJ',
    name: '幹部',
    group: 'sentinel',
    traits: ['組織力', '実行力', '正義感', '伝統尊重'],
    keywords: ['管理', '秩序', 'ルール', '責任', '効率'],
  },
  ESFJ: {
    type: 'ESFJ',
    name: '領事官',
    group: 'sentinel',
    traits: ['社交性', '協調性', '思いやり', '実務能力'],
    keywords: ['調和', 'おもてなし', '協力', '気配り', '伝統'],
  },

  // 探検家グループ
  ISTP: {
    type: 'ISTP',
    name: '巨匠',
    group: 'explorer',
    traits: ['実践力', '冷静さ', '柔軟性', '問題解決力'],
    keywords: ['技術', '分析', '即興', '自由', '効率'],
  },
  ISFP: {
    type: 'ISFP',
    name: '冒険家',
    group: 'explorer',
    traits: ['芸術性', '感受性', '柔軟性', '優しさ'],
    keywords: ['美', '今を生きる', '調和', '自由', '表現'],
  },
  ESTP: {
    type: 'ESTP',
    name: '起業家',
    group: 'explorer',
    traits: ['行動力', 'エネルギッシュ', '現実主義', '適応力'],
    keywords: ['行動', 'スリル', '影響力', '交渉', '今この瞬間'],
  },
  ESFP: {
    type: 'ESFP',
    name: 'エンターテイナー',
    group: 'explorer',
    traits: ['陽気さ', '社交性', '自発性', '楽観主義'],
    keywords: ['楽しさ', '注目', '即興', '仲間', 'パフォーマンス'],
  },
};

export function getMBTIProfile(type: MBTIType): MBTIProfile {
  return mbtiProfiles[type];
}

export function getMBTIGroup(type: MBTIType): MBTIGroupInfo {
  const profile = mbtiProfiles[type];
  return mbtiGroups.find(g => g.id === profile.group)!;
}
