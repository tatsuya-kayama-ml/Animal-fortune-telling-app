export interface Animal {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  traits: string[];
  color: string;
  emoji: string;
}

export const animals: Animal[] = [
  {
    id: 'cat',
    name: 'ネコ',
    nameEn: 'Cat',
    description: 'マイペースで自由を愛するあなた。周りに流されず、自分の道を進む独立心の持ち主です。',
    traits: ['独立心が強い', 'マイペース', '気まぐれ', '好奇心旺盛'],
    color: '#FFB6C1',
    emoji: '🐱'
  },
  {
    id: 'dog',
    name: 'イヌ',
    nameEn: 'Dog',
    description: '誠実で仲間思いなあなた。人との繋がりを大切にし、信頼される存在です。',
    traits: ['忠実', '社交的', 'ポジティブ', '行動的'],
    color: '#DEB887',
    emoji: '🐶'
  },
  {
    id: 'rabbit',
    name: 'ウサギ',
    nameEn: 'Rabbit',
    description: '優しく繊細なあなた。周囲の気持ちを察する力があり、穏やかな雰囲気を作ります。',
    traits: ['優しい', '繊細', '平和主義', '思いやりがある'],
    color: '#F0E68C',
    emoji: '🐰'
  },
  {
    id: 'fox',
    name: 'キツネ',
    nameEn: 'Fox',
    description: '賢く機転が利くあなた。柔軟な思考で困難な状況も上手に乗り越えます。',
    traits: ['賢い', '機転が利く', '適応力が高い', '観察力がある'],
    color: '#FF8C00',
    emoji: '🦊'
  },
  {
    id: 'owl',
    name: 'フクロウ',
    nameEn: 'Owl',
    description: '知的で冷静なあなた。物事を深く考え、的確な判断を下すことができます。',
    traits: ['知的', '冷静', '洞察力がある', '慎重'],
    color: '#8B7355',
    emoji: '🦉'
  },
  {
    id: 'panda',
    name: 'パンダ',
    nameEn: 'Panda',
    description: 'のんびりマイペースなあなた。癒し系で周りをリラックスさせる存在です。',
    traits: ['のんびり', 'マイペース', '癒し系', '温厚'],
    color: '#000000',
    emoji: '🐼'
  },
  {
    id: 'penguin',
    name: 'ペンギン',
    nameEn: 'Penguin',
    description: 'チームワークを大切にするあなた。協調性があり、集団での活動が得意です。',
    traits: ['協調性がある', 'チームプレイヤー', '真面目', '努力家'],
    color: '#4169E1',
    emoji: '🐧'
  },
  {
    id: 'lion',
    name: 'ライオン',
    nameEn: 'Lion',
    description: 'リーダーシップのあるあなた。堂々としていて、周りを引っ張る力があります。',
    traits: ['リーダーシップがある', '自信がある', '情熱的', '勇敢'],
    color: '#DAA520',
    emoji: '🦁'
  },
  {
    id: 'dolphin',
    name: 'イルカ',
    nameEn: 'Dolphin',
    description: '明るく社交的なあなた。人を楽しませることが好きで、ムードメーカーです。',
    traits: ['明るい', '社交的', 'ムードメーカー', '楽天的'],
    color: '#00BFFF',
    emoji: '🐬'
  },
  {
    id: 'koala',
    name: 'コアラ',
    nameEn: 'Koala',
    description: 'のんびり穏やかなあなた。ストレスを感じにくく、自分のペースを大切にします。',
    traits: ['のんびり', '穏やか', 'マイペース', '落ち着いている'],
    color: '#808080',
    emoji: '🐨'
  },
  {
    id: 'tiger',
    name: 'トラ',
    nameEn: 'Tiger',
    description: '力強く行動的なあなた。目標に向かって突き進む情熱を持っています。',
    traits: ['力強い', '行動的', '情熱的', '意志が強い'],
    color: '#FF6347',
    emoji: '🐯'
  },
  {
    id: 'bear',
    name: 'クマ',
    nameEn: 'Bear',
    description: '包容力のあるあなた。頼りがいがあり、周りを守る優しさを持っています。',
    traits: ['包容力がある', '頼りがいがある', '優しい', '温厚'],
    color: '#8B4513',
    emoji: '🐻'
  },
  {
    id: 'elephant',
    name: 'ゾウ',
    nameEn: 'Elephant',
    description: '記憶力が良く、思慮深いあなた。経験を活かして判断する賢さがあります。',
    traits: ['記憶力が良い', '思慮深い', '賢い', '家族思い'],
    color: '#696969',
    emoji: '🐘'
  },
  {
    id: 'monkey',
    name: 'サル',
    nameEn: 'Monkey',
    description: '好奇心旺盛で活発なあなた。新しいことに挑戦するのが好きで、柔軟性があります。',
    traits: ['好奇心旺盛', '活発', '柔軟', '器用'],
    color: '#CD853F',
    emoji: '🐵'
  },
  {
    id: 'horse',
    name: 'ウマ',
    nameEn: 'Horse',
    description: '自由を愛し、エネルギッシュなあなた。行動力があり、前向きな性格です。',
    traits: ['自由を愛する', 'エネルギッシュ', '行動的', '前向き'],
    color: '#A0522D',
    emoji: '🐴'
  },
  {
    id: 'sheep',
    name: 'ヒツジ',
    nameEn: 'Sheep',
    description: '優しく従順なあなた。平和を好み、争いを避ける穏やかな性格です。',
    traits: ['優しい', '従順', '平和主義', '穏やか'],
    color: '#F5F5DC',
    emoji: '🐑'
  }
];
