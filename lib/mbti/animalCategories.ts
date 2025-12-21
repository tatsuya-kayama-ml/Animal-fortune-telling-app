import { AnimalCategory } from './types';

// 動物→カテゴリマッピング
// 各動物に最も適切なカテゴリを1つ割り当て
export const animalCategoryMap: Record<string, AnimalCategory> = {
  // 独立型 (independent) - 自立心が強い、一匹狼タイプ
  cat: 'independent',
  owl: 'independent',
  hedgehog: 'independent',
  bat: 'independent',
  snake: 'independent',
  lynx: 'independent',
  scorpion: 'independent',
  anglerfish: 'independent',
  mole: 'independent',
  stoat: 'independent',

  // 社交型 (social) - 人懐っこい、仲間思い
  dog: 'social',
  dolphin: 'social',
  monkey: 'social',
  parrot: 'social',
  meerkat: 'social',
  quokka: 'social',
  chipmunk: 'social',
  hamster: 'social',
  clownfish: 'social',
  puffin: 'social',

  // 穏やか型 (calm) - のんびり、癒し系
  panda: 'calm',
  koala: 'calm',
  sloth: 'calm',
  turtle: 'calm',
  hippo: 'calm',
  whale: 'calm',
  manatee: 'calm',
  capybara: 'calm',
  alpaca: 'calm',
  wombat: 'calm',
  jellyfish: 'calm',
  starfish: 'calm',

  // リーダー型 (leader) - 統率力、カリスマ
  lion: 'leader',
  tiger: 'leader',
  wolf: 'leader',
  gorilla: 'leader',
  eagle: 'leader',
  rooster: 'leader',
  bison: 'leader',
  rhino: 'leader',
  moose: 'leader',

  // 分析型 (analytical) - 知的、観察力
  fox: 'analytical',
  elephant: 'analytical',
  octopus: 'analytical',
  mantis: 'analytical',
  spider: 'analytical',
  crocodile: 'analytical',
  badger: 'analytical',
  weasel: 'analytical',

  // 創造型 (creative) - 独創的、芸術的
  peacock: 'creative',
  flamingo: 'creative',
  butterfly: 'creative',
  hummingbird: 'creative',
  swan: 'creative',
  dragonfly: 'creative',
  firefly: 'creative',
  seahorse: 'creative',
  toucan: 'creative',
  chameleon: 'creative',

  // 保護型 (protective) - 守る、世話好き
  bear: 'protective',
  kangaroo: 'protective',
  penguin: 'protective',
  seal: 'protective',
  deer: 'protective',
  sheep: 'protective',
  rabbit: 'protective',
  duck: 'protective',
  ladybug: 'protective',
  reindeer: 'protective',
  llama: 'protective',
  donkey: 'protective',
  mouse: 'protective',

  // 適応型 (adaptable) - 柔軟、機転が利く
  raccoon: 'adaptable',
  squirrel: 'adaptable',
  otter: 'adaptable',
  frog: 'adaptable',
  crab: 'adaptable',
  cheetah: 'adaptable',
  zebra: 'adaptable',
  raccoondog: 'adaptable',
  lemur: 'adaptable',
  armadillo: 'adaptable',
  porcupine: 'adaptable',
  platypus: 'adaptable',
  cricket: 'adaptable',
  stingray: 'adaptable',
  camel: 'adaptable',
  hyena: 'adaptable',
  opossum: 'adaptable',
  ferret: 'adaptable',
  pelican: 'adaptable',
  kiwi: 'adaptable',
  horse: 'adaptable',
  giraffe: 'adaptable',
  bee: 'adaptable',
  ant: 'adaptable',
};

// カテゴリの日本語名
export const categoryNames: Record<AnimalCategory, string> = {
  independent: '独立型',
  social: '社交型',
  calm: '穏やか型',
  leader: 'リーダー型',
  analytical: '分析型',
  creative: '創造型',
  protective: '保護型',
  adaptable: '適応型',
};

// カテゴリの説明
export const categoryDescriptions: Record<AnimalCategory, string> = {
  independent: '自分の世界を大切にし、独自の道を歩む',
  social: '人との繋がりを大切にし、コミュニケーションが得意',
  calm: 'おおらかで穏やか、周りを癒す存在',
  leader: '周囲を引っ張る力とカリスマ性を持つ',
  analytical: '物事を深く分析し、本質を見抜く',
  creative: '独創的な発想と表現力を持つ',
  protective: '大切なものを守り、思いやりに溢れる',
  adaptable: '状況に応じて柔軟に対応できる',
};

export function getAnimalCategory(animalId: string): AnimalCategory {
  return animalCategoryMap[animalId] || 'adaptable';
}
