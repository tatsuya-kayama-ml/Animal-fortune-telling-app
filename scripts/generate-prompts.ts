import { animals } from '../lib/animals';
import * as fs from 'fs';

// イラスト生成用のプロンプトを生成
const basePrompt = `Create a cute, minimalist illustration of a {animal_name} in MBTI personality test style.
Style requirements:
- Simple, flat design with rounded shapes
- Friendly and approachable character
- Clean lines, no complex details
- Solid color background matching {color}
- Character should be centered and take up 70% of canvas
- Kawaii/cute aesthetic similar to Japanese character design
- No text or labels
- Square format (1:1 aspect ratio)

The {animal_name} should look:
{traits}

Keep it simple, charming, and instantly recognizable.`;

interface PromptData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  traits: string;
  prompt: string;
}

const prompts: PromptData[] = animals.map(animal => {
  const traitsText = animal.traits.slice(0, 3).join(', ');
  const prompt = basePrompt
    .replace(/{animal_name}/g, animal.nameEn)
    .replace(/{color}/g, animal.color)
    .replace(/{traits}/g, traitsText);

  return {
    id: animal.id,
    name: animal.name,
    nameEn: animal.nameEn,
    color: animal.color,
    traits: traitsText,
    prompt: prompt
  };
});

// JSON形式で出力
fs.writeFileSync(
  'scripts/image-prompts.json',
  JSON.stringify(prompts, null, 2)
);

// CSV形式でも出力（Googleスプレッドシート用）
const csvLines = [
  'id,name,nameEn,color,traits,prompt'
];

prompts.forEach(p => {
  const escapedPrompt = `"${p.prompt.replace(/"/g, '""')}"`;
  csvLines.push(`${p.id},${p.name},${p.nameEn},${p.color},"${p.traits}",${escapedPrompt}`);
});

fs.writeFileSync(
  'scripts/image-prompts.csv',
  csvLines.join('\n')
);

console.log(`✅ Generated prompts for ${prompts.length} animals`);
console.log('📄 Files created:');
console.log('  - scripts/image-prompts.json');
console.log('  - scripts/image-prompts.csv');
