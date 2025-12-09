export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    traits: string[];
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: '休日の過ごし方は？',
    options: [
      { text: '友達と遊びに出かける', traits: ['social', 'active', 'cheerful'] },
      { text: '家でのんびり過ごす', traits: ['calm', 'independent', 'peaceful'] },
      { text: '新しい場所を探検する', traits: ['curious', 'adventurous', 'flexible'] },
      { text: '趣味に没頭する', traits: ['focused', 'independent', 'passionate'] }
    ]
  },
  {
    id: 2,
    text: '困っている人を見かけたら？',
    options: [
      { text: 'すぐに声をかけて助ける', traits: ['kind', 'active', 'helpful'] },
      { text: '様子を見てから助ける', traits: ['thoughtful', 'careful', 'observant'] },
      { text: '誰かに助けを求める', traits: ['cooperative', 'thoughtful', 'peaceful'] },
      { text: '見守る', traits: ['calm', 'independent', 'observant'] }
    ]
  },
  {
    id: 3,
    text: 'ストレスを感じた時は？',
    options: [
      { text: '誰かに話を聞いてもらう', traits: ['social', 'cooperative', 'emotional'] },
      { text: '一人で解決する', traits: ['independent', 'strong', 'calm'] },
      { text: '体を動かす', traits: ['active', 'energetic', 'passionate'] },
      { text: '寝る', traits: ['calm', 'peaceful', 'easygoing'] }
    ]
  },
  {
    id: 4,
    text: 'グループでの役割は？',
    options: [
      { text: 'リーダー', traits: ['leadership', 'confident', 'strong'] },
      { text: 'サポート役', traits: ['helpful', 'cooperative', 'kind'] },
      { text: 'ムードメーカー', traits: ['cheerful', 'social', 'energetic'] },
      { text: 'バランス調整役', traits: ['balanced', 'observant', 'flexible'] }
    ]
  },
  {
    id: 5,
    text: '新しいことに挑戦する時は？',
    options: [
      { text: 'すぐに飛び込む', traits: ['brave', 'adventurous', 'active'] },
      { text: 'よく考えてから行動', traits: ['thoughtful', 'careful', 'intelligent'] },
      { text: '誰かと一緒なら挑戦する', traits: ['cooperative', 'social', 'careful'] },
      { text: 'なるべく避ける', traits: ['calm', 'peaceful', 'cautious'] }
    ]
  },
  {
    id: 6,
    text: '理想の環境は？',
    options: [
      { text: 'にぎやかで活気がある', traits: ['social', 'energetic', 'cheerful'] },
      { text: '静かで落ち着いている', traits: ['calm', 'peaceful', 'thoughtful'] },
      { text: '刺激的で変化がある', traits: ['adventurous', 'flexible', 'curious'] },
      { text: '自由で縛られない', traits: ['independent', 'free', 'easygoing'] }
    ]
  },
  {
    id: 7,
    text: '失敗した時の反応は？',
    options: [
      { text: 'すぐに立ち直る', traits: ['strong', 'positive', 'energetic'] },
      { text: 'じっくり反省する', traits: ['thoughtful', 'careful', 'intelligent'] },
      { text: '誰かに慰めてもらう', traits: ['social', 'emotional', 'cooperative'] },
      { text: 'あまり気にしない', traits: ['easygoing', 'calm', 'flexible'] }
    ]
  },
  {
    id: 8,
    text: '意思決定のスタイルは？',
    options: [
      { text: '直感を信じる', traits: ['confident', 'brave', 'independent'] },
      { text: '論理的に考える', traits: ['intelligent', 'thoughtful', 'careful'] },
      { text: '周りの意見を聞く', traits: ['cooperative', 'thoughtful', 'peaceful'] },
      { text: 'なんとなく決める', traits: ['easygoing', 'flexible', 'calm'] }
    ]
  },
  {
    id: 9,
    text: '人との距離感は？',
    options: [
      { text: 'すぐに仲良くなる', traits: ['social', 'cheerful', 'friendly'] },
      { text: '少しずつ距離を縮める', traits: ['careful', 'thoughtful', 'observant'] },
      { text: '深い関係を築く', traits: ['loyal', 'emotional', 'kind'] },
      { text: '適度な距離を保つ', traits: ['independent', 'calm', 'free'] }
    ]
  },
  {
    id: 10,
    text: '最も大切にしているものは？',
    options: [
      { text: '自由', traits: ['independent', 'free', 'adventurous'] },
      { text: '絆', traits: ['loyal', 'cooperative', 'kind'] },
      { text: '成長', traits: ['passionate', 'ambitious', 'active'] },
      { text: '平穏', traits: ['peaceful', 'calm', 'easygoing'] }
    ]
  },
  {
    id: 11,
    text: '大切な人が傷ついた時は？',
    options: [
      { text: '全力で守る', traits: ['protective', 'strong', 'loyal'] },
      { text: '話を聞いて支える', traits: ['kind', 'thoughtful', 'cooperative'] },
      { text: '解決策を提案する', traits: ['intelligent', 'helpful', 'active'] },
      { text: 'そっと見守る', traits: ['calm', 'observant', 'gentle'] }
    ]
  }
];

// 特性からスコアを計算するヘルパー関数
export const calculateAnimalScore = (userTraits: string[]) => {
  const traitMapping: Record<string, string[]> = {
    cat: ['independent', 'calm', 'curious', 'free'],
    dog: ['loyal', 'social', 'active', 'friendly'],
    rabbit: ['kind', 'peaceful', 'thoughtful', 'gentle'],
    fox: ['intelligent', 'flexible', 'observant', 'clever'],
    owl: ['intelligent', 'thoughtful', 'careful', 'calm'],
    panda: ['calm', 'easygoing', 'peaceful', 'gentle'],
    penguin: ['cooperative', 'thoughtful', 'loyal', 'careful'],
    lion: ['leadership', 'confident', 'strong', 'brave'],
    dolphin: ['cheerful', 'social', 'energetic', 'friendly'],
    koala: ['calm', 'easygoing', 'peaceful', 'independent'],
    tiger: ['strong', 'passionate', 'active', 'brave'],
    bear: ['kind', 'strong', 'protective', 'gentle'],
    elephant: ['intelligent', 'thoughtful', 'loyal', 'careful'],
    monkey: ['curious', 'energetic', 'flexible', 'adventurous'],
    horse: ['free', 'energetic', 'active', 'adventurous'],
    sheep: ['kind', 'peaceful', 'gentle', 'cooperative'],
    duck: ['flexible', 'calm', 'cooperative', 'balanced'],
    hedgehog: ['careful', 'observant', 'independent', 'protective'],
    wolf: ['loyal', 'independent', 'strong', 'observant'],
    deer: ['gentle', 'peaceful', 'calm', 'thoughtful'],
    giraffe: ['calm', 'observant', 'independent', 'thoughtful'],
    squirrel: ['energetic', 'careful', 'active', 'curious'],
    flamingo: ['social', 'cheerful', 'balanced', 'friendly'],
    peacock: ['confident', 'cheerful', 'strong', 'leadership'],
    bat: ['independent', 'observant', 'calm', 'curious'],
    otter: ['social', 'energetic', 'cheerful', 'flexible'],
    sloth: ['calm', 'easygoing', 'peaceful', 'independent'],
    raccoon: ['curious', 'flexible', 'intelligent', 'active'],
    chameleon: ['flexible', 'observant', 'calm', 'intelligent'],
    turtle: ['careful', 'calm', 'thoughtful', 'peaceful'],
    snake: ['intelligent', 'observant', 'calm', 'careful'],
    cheetah: ['active', 'strong', 'energetic', 'brave'],
    zebra: ['independent', 'cooperative', 'strong', 'balanced'],
    hippo: ['strong', 'calm', 'protective', 'loyal'],
    rhino: ['strong', 'brave', 'independent', 'passionate'],
    kangaroo: ['energetic', 'strong', 'loyal', 'active'],
    parrot: ['social', 'cheerful', 'intelligent', 'friendly'],
    seal: ['calm', 'cheerful', 'gentle', 'cooperative'],
    whale: ['calm', 'intelligent', 'gentle', 'protective'],
    octopus: ['intelligent', 'flexible', 'curious', 'active'],
    butterfly: ['cheerful', 'free', 'flexible', 'gentle'],
    bee: ['cooperative', 'active', 'loyal', 'thoughtful'],
    ant: ['cooperative', 'careful', 'active', 'thoughtful'],
    ladybug: ['cheerful', 'gentle', 'kind', 'peaceful'],
    frog: ['flexible', 'active', 'curious', 'energetic'],
    crab: ['protective', 'careful', 'loyal', 'independent'],
    swan: ['calm', 'strong', 'gentle', 'confident'],
    rooster: ['active', 'confident', 'loyal', 'brave'],
    hummingbird: ['energetic', 'active', 'cheerful', 'curious']
  };

  const scores: Record<string, number> = {};

  Object.keys(traitMapping).forEach(animal => {
    scores[animal] = traitMapping[animal].reduce((score, trait) => {
      return score + userTraits.filter(t => t === trait).length;
    }, 0);
  });

  return scores;
};
