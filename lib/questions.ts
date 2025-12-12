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
      { text: '趣味に没頭する', traits: ['focused', 'independent', 'passionate'] },
      { text: 'スポーツや運動をする', traits: ['energetic', 'active', 'strong'] },
      { text: '学びや自己啓発に時間を使う', traits: ['intelligent', 'ambitious', 'thoughtful'] }
    ]
  },
  {
    id: 2,
    text: '困っている人を見かけたら？',
    options: [
      { text: 'すぐに声をかけて助ける', traits: ['kind', 'active', 'helpful'] },
      { text: '様子を見てから助ける', traits: ['thoughtful', 'careful', 'observant'] },
      { text: '誰かに助けを求める', traits: ['cooperative', 'thoughtful', 'peaceful'] },
      { text: '見守る', traits: ['calm', 'independent', 'observant'] },
      { text: '専門家や適切な人に繋ぐ', traits: ['intelligent', 'helpful', 'careful'] },
      { text: '一緒に解決方法を考える', traits: ['cooperative', 'active', 'kind'] }
    ]
  },
  {
    id: 3,
    text: 'ストレスを感じた時は？',
    options: [
      { text: '誰かに話を聞いてもらう', traits: ['social', 'cooperative', 'emotional'] },
      { text: '一人で解決する', traits: ['independent', 'strong', 'calm'] },
      { text: '体を動かす', traits: ['active', 'energetic', 'passionate'] },
      { text: '寝る', traits: ['calm', 'peaceful', 'easygoing'] },
      { text: '好きなことに没頭する', traits: ['passionate', 'independent', 'focused'] },
      { text: '原因を分析して対策を立てる', traits: ['intelligent', 'thoughtful', 'careful'] }
    ]
  },
  {
    id: 4,
    text: 'グループでの役割は？',
    options: [
      { text: 'リーダー', traits: ['leadership', 'confident', 'strong'] },
      { text: 'サポート役', traits: ['helpful', 'cooperative', 'kind'] },
      { text: 'ムードメーカー', traits: ['cheerful', 'social', 'energetic'] },
      { text: 'バランス調整役', traits: ['balanced', 'observant', 'flexible'] },
      { text: '戦略・企画担当', traits: ['intelligent', 'thoughtful', 'ambitious'] },
      { text: '自由に動く実行役', traits: ['independent', 'active', 'brave'] }
    ]
  },
  {
    id: 5,
    text: '新しいことに挑戦する時は？',
    options: [
      { text: 'すぐに飛び込む', traits: ['brave', 'adventurous', 'active'] },
      { text: 'よく考えてから行動', traits: ['thoughtful', 'careful', 'intelligent'] },
      { text: '誰かと一緒なら挑戦する', traits: ['cooperative', 'social', 'careful'] },
      { text: 'なるべく避ける', traits: ['calm', 'peaceful', 'cautious'] },
      { text: '情報を集めてから判断', traits: ['intelligent', 'observant', 'thoughtful'] },
      { text: '面白そうなら試してみる', traits: ['curious', 'flexible', 'adventurous'] }
    ]
  },
  {
    id: 6,
    text: '理想の環境は？',
    options: [
      { text: 'にぎやかで活気がある', traits: ['social', 'energetic', 'cheerful'] },
      { text: '静かで落ち着いている', traits: ['calm', 'peaceful', 'thoughtful'] },
      { text: '刺激的で変化がある', traits: ['adventurous', 'flexible', 'curious'] },
      { text: '自由で縛られない', traits: ['independent', 'free', 'easygoing'] },
      { text: '協力的でサポートし合える', traits: ['cooperative', 'kind', 'loyal'] },
      { text: '競争があり成長できる', traits: ['ambitious', 'strong', 'passionate'] }
    ]
  },
  {
    id: 7,
    text: '失敗した時の反応は？',
    options: [
      { text: 'すぐに立ち直る', traits: ['strong', 'positive', 'energetic'] },
      { text: 'じっくり反省する', traits: ['thoughtful', 'careful', 'intelligent'] },
      { text: '誰かに慰めてもらう', traits: ['social', 'emotional', 'cooperative'] },
      { text: 'あまり気にしない', traits: ['easygoing', 'calm', 'flexible'] },
      { text: '原因を分析して次に活かす', traits: ['intelligent', 'ambitious', 'thoughtful'] },
      { text: '別の方法をすぐ試す', traits: ['active', 'brave', 'flexible'] }
    ]
  },
  {
    id: 8,
    text: '意思決定のスタイルは？',
    options: [
      { text: '直感を信じる', traits: ['confident', 'brave', 'independent'] },
      { text: '論理的に考える', traits: ['intelligent', 'thoughtful', 'careful'] },
      { text: '周りの意見を聞く', traits: ['cooperative', 'thoughtful', 'peaceful'] },
      { text: 'なんとなく決める', traits: ['easygoing', 'flexible', 'calm'] },
      { text: 'データや情報を集めて判断', traits: ['intelligent', 'careful', 'observant'] },
      { text: '経験や前例を参考にする', traits: ['thoughtful', 'careful', 'balanced'] }
    ]
  },
  {
    id: 9,
    text: '人との距離感は？',
    options: [
      { text: 'すぐに仲良くなる', traits: ['social', 'cheerful', 'friendly'] },
      { text: '少しずつ距離を縮める', traits: ['careful', 'thoughtful', 'observant'] },
      { text: '深い関係を築く', traits: ['loyal', 'emotional', 'kind'] },
      { text: '適度な距離を保つ', traits: ['independent', 'calm', 'free'] },
      { text: '相手に合わせて柔軟に対応', traits: ['flexible', 'observant', 'balanced'] },
      { text: '少数の人と深く付き合う', traits: ['loyal', 'careful', 'thoughtful'] }
    ]
  },
  {
    id: 10,
    text: '最も大切にしているものは？',
    options: [
      { text: '自由', traits: ['independent', 'free', 'adventurous'] },
      { text: '絆', traits: ['loyal', 'cooperative', 'kind'] },
      { text: '成長', traits: ['passionate', 'ambitious', 'active'] },
      { text: '平穏', traits: ['peaceful', 'calm', 'easygoing'] },
      { text: '知識や探求心', traits: ['intelligent', 'curious', 'thoughtful'] },
      { text: '信頼や誠実さ', traits: ['loyal', 'kind', 'careful'] }
    ]
  },
  {
    id: 11,
    text: '大切な人が傷ついた時は？',
    options: [
      { text: '全力で守る', traits: ['protective', 'strong', 'loyal'] },
      { text: '話を聞いて支える', traits: ['kind', 'thoughtful', 'cooperative'] },
      { text: '解決策を提案する', traits: ['intelligent', 'helpful', 'active'] },
      { text: 'そっと見守る', traits: ['calm', 'observant', 'gentle'] },
      { text: '一緒に行動して気を紛らわせる', traits: ['active', 'cheerful', 'helpful'] },
      { text: '寄り添って一緒に乗り越える', traits: ['loyal', 'kind', 'cooperative'] }
    ]
  }
];

// 特性からスコアを計算するヘルパー関数（改善版 v2 - 多様な結果が出やすくなるよう調整）
export const calculateAnimalScore = (userTraits: string[], randomSeed?: number) => {
  const traitMapping: Record<string, string[]> = {
    // 哺乳類
    cat: ['independent', 'calm', 'curious', 'free'],
    dog: ['loyal', 'social', 'active', 'friendly'],
    rabbit: ['kind', 'peaceful', 'thoughtful', 'gentle'],
    fox: ['intelligent', 'flexible', 'observant', 'clever'],
    owl: ['intelligent', 'thoughtful', 'careful', 'focused'],
    panda: ['calm', 'easygoing', 'peaceful', 'gentle'],
    penguin: ['cooperative', 'thoughtful', 'loyal', 'careful'],
    lion: ['leadership', 'confident', 'strong', 'ambitious'],
    dolphin: ['cheerful', 'social', 'energetic', 'friendly'],
    koala: ['calm', 'easygoing', 'peaceful', 'independent'],
    tiger: ['strong', 'passionate', 'active', 'brave'],
    bear: ['kind', 'strong', 'protective', 'helpful'],
    elephant: ['intelligent', 'thoughtful', 'loyal', 'emotional'],
    monkey: ['curious', 'energetic', 'flexible', 'adventurous'],
    horse: ['free', 'energetic', 'active', 'adventurous'],
    sheep: ['kind', 'peaceful', 'gentle', 'cooperative'],
    duck: ['flexible', 'calm', 'cooperative', 'balanced'],
    hedgehog: ['careful', 'observant', 'independent', 'cautious'],
    wolf: ['loyal', 'independent', 'strong', 'focused'],
    deer: ['gentle', 'peaceful', 'calm', 'cautious'],
    giraffe: ['calm', 'observant', 'independent', 'thoughtful'],
    squirrel: ['energetic', 'careful', 'active', 'curious'],
    flamingo: ['social', 'cheerful', 'balanced', 'friendly'],
    peacock: ['confident', 'cheerful', 'strong', 'ambitious'],
    bat: ['independent', 'observant', 'calm', 'curious'],
    otter: ['social', 'energetic', 'cheerful', 'playful'],
    sloth: ['calm', 'easygoing', 'peaceful', 'independent'],
    raccoon: ['curious', 'flexible', 'intelligent', 'active'],
    chameleon: ['flexible', 'observant', 'calm', 'adaptable'],
    turtle: ['careful', 'calm', 'thoughtful', 'patient'],
    snake: ['intelligent', 'observant', 'calm', 'careful'],
    cheetah: ['active', 'strong', 'energetic', 'quick'],
    zebra: ['independent', 'cooperative', 'strong', 'balanced'],
    hippo: ['strong', 'calm', 'protective', 'emotional'],
    rhino: ['strong', 'brave', 'independent', 'passionate'],
    kangaroo: ['energetic', 'strong', 'loyal', 'active'],
    parrot: ['social', 'cheerful', 'intelligent', 'friendly'],
    seal: ['calm', 'cheerful', 'gentle', 'playful'],
    whale: ['calm', 'intelligent', 'gentle', 'emotional'],
    octopus: ['intelligent', 'flexible', 'curious', 'adaptable'],
    butterfly: ['cheerful', 'free', 'flexible', 'gentle'],
    bee: ['cooperative', 'active', 'loyal', 'focused'],
    ant: ['cooperative', 'careful', 'active', 'ambitious'],
    ladybug: ['cheerful', 'gentle', 'kind', 'positive'],
    frog: ['flexible', 'active', 'curious', 'adaptable'],
    crab: ['protective', 'careful', 'loyal', 'cautious'],
    swan: ['calm', 'strong', 'gentle', 'confident'],
    rooster: ['active', 'confident', 'loyal', 'brave'],
    hummingbird: ['energetic', 'active', 'cheerful', 'quick'],
    eagle: ['brave', 'strong', 'independent', 'ambitious'],
    raccoondog: ['flexible', 'clever', 'cooperative', 'adaptable'],
    gorilla: ['strong', 'protective', 'thoughtful', 'leadership'],
    meerkat: ['cooperative', 'observant', 'social', 'helpful'],
    crocodile: ['strong', 'patient', 'calm', 'focused'],
    lemur: ['social', 'energetic', 'curious', 'playful'],
    armadillo: ['protective', 'careful', 'independent', 'cautious'],
    porcupine: ['protective', 'independent', 'careful', 'cautious'],
    badger: ['brave', 'independent', 'strong', 'passionate'],
    platypus: ['curious', 'flexible', 'independent', 'adaptable'],
    lynx: ['observant', 'independent', 'calm', 'patient'],
    bison: ['strong', 'calm', 'cooperative', 'protective'],
    mantis: ['patient', 'observant', 'careful', 'focused'],
    dragonfly: ['active', 'flexible', 'energetic', 'quick'],
    cricket: ['peaceful', 'calm', 'thoughtful', 'patient'],
    firefly: ['cheerful', 'gentle', 'cooperative', 'positive'],
    spider: ['patient', 'careful', 'independent', 'intelligent'],
    scorpion: ['protective', 'independent', 'strong', 'cautious'],
    jellyfish: ['calm', 'flexible', 'peaceful', 'adaptable'],
    starfish: ['calm', 'flexible', 'peaceful', 'cooperative'],
    seahorse: ['gentle', 'thoughtful', 'calm', 'loyal'],
    stingray: ['calm', 'flexible', 'intelligent', 'peaceful'],
    clownfish: ['social', 'cheerful', 'loyal', 'playful'],
    anglerfish: ['independent', 'patient', 'intelligent', 'focused'],
    moose: ['strong', 'independent', 'calm', 'protective'],
    reindeer: ['cooperative', 'strong', 'loyal', 'helpful'],
    alpaca: ['gentle', 'calm', 'cooperative', 'kind'],
    llama: ['independent', 'strong', 'protective', 'confident'],
    donkey: ['strong', 'loyal', 'patient', 'helpful'],
    camel: ['patient', 'strong', 'independent', 'calm'],
    hyena: ['social', 'flexible', 'energetic', 'cooperative'],
    wombat: ['calm', 'independent', 'strong', 'peaceful'],
    quokka: ['cheerful', 'friendly', 'social', 'positive'],
    opossum: ['flexible', 'calm', 'independent', 'adaptable'],
    chipmunk: ['energetic', 'curious', 'active', 'quick'],
    hamster: ['energetic', 'curious', 'active', 'playful'],
    mouse: ['careful', 'curious', 'flexible', 'quick'],
    mole: ['independent', 'careful', 'thoughtful', 'focused'],
    stoat: ['energetic', 'brave', 'active', 'adventurous'],
    weasel: ['energetic', 'curious', 'active', 'clever'],
    ferret: ['curious', 'energetic', 'playful', 'social'],
    capybara: ['calm', 'social', 'peaceful', 'friendly'],
    puffin: ['social', 'cooperative', 'loyal', 'cheerful'],
    toucan: ['social', 'cheerful', 'energetic', 'positive'],
    pelican: ['cooperative', 'calm', 'patient', 'helpful'],
    kiwi: ['independent', 'curious', 'thoughtful', 'calm']
  };

  // 各特性の希少性を計算（出現回数が少ないほど価値が高い）
  const traitRarity: Record<string, number> = {};
  Object.values(traitMapping).forEach(traits => {
    traits.forEach(trait => {
      traitRarity[trait] = (traitRarity[trait] || 0) + 1;
    });
  });

  const scores: Record<string, number> = {};
  const animalCount = Object.keys(traitMapping).length;

  // 乱数シードを使用（同じ特性でも多様な結果が出るように）
  const seed = randomSeed ?? Date.now();
  const pseudoRandom = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  let animalIndex = 0;
  Object.keys(traitMapping).forEach(animal => {
    let baseScore = 0;
    let matchedTraits = 0;
    let rarityBonus = 0;

    // 各特性のマッチング
    traitMapping[animal].forEach(trait => {
      const matchCount = userTraits.filter(t => t === trait).length;
      if (matchCount > 0) {
        matchedTraits++;
        // 基本スコア（出現回数）
        baseScore += matchCount * 10;

        // 希少性ボーナス（その特性を持つ動物が少ないほど高い）
        // 上限を設けて極端な偏りを防ぐ（最大5倍まで）
        const rarityMultiplier = Math.min(animalCount / traitRarity[trait], 5);
        rarityBonus += rarityMultiplier * matchCount * 3;
      }
    });

    // 完全一致ボーナス（全ての特性がマッチした場合）
    const perfectMatchBonus = matchedTraits === 4 ? 40 : 0;

    // 部分一致ボーナス（3つ以上マッチした場合）
    const partialMatchBonus = matchedTraits >= 3 ? 15 : 0;

    // ランダム要素を追加（同点の場合に異なる結果が出やすくなる）
    const randomBonus = pseudoRandom(animalIndex) * 5;

    // 最終スコア
    scores[animal] = baseScore + rarityBonus + perfectMatchBonus + partialMatchBonus + randomBonus;
    animalIndex++;
  });

  return scores;
};
