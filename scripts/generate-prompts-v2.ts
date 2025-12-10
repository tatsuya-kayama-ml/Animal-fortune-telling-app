import { animals } from '../lib/animals';
import * as fs from 'fs';

// 改善版プロンプト - cat/dogのスタイルに統一
const improvedPrompt = `A single {animal_name}, centered in the frame, illustrated in a cute minimalist style.

CRITICAL REQUIREMENTS:
- ONLY ONE {animal_name} - no duplicates, no multiple animals
- Animal must be CENTERED and take up 60-70% of the image
- Front-facing view, looking directly at viewer
- Sitting or standing pose - simple and clear

STYLE (match the reference style exactly):
- Soft, rounded shapes with gentle curves
- Smooth gradients and soft shading
- Pastel-like colors with subtle highlights
- Kawaii aesthetic - big eyes, friendly expression
- Clean, simple design without excessive details
- Professional digital illustration quality

BACKGROUND:
- Solid color with subtle radial gradient
- Primary color: {color}
- Lighter in center, slightly darker at edges
- No patterns, no decorations, no text

CHARACTER DESIGN:
- Clearly recognizable as a {animal_name}
- Friendly, approachable facial expression
- Soft, rounded body proportions
- {traits}

TECHNICAL:
- Square format (1:1 ratio)
- High resolution, clean edges
- No watermarks, no text, no signatures
- Consistent lighting from above
- Soft drop shadow beneath the character

This should look like a professional character illustration for a personality test app, similar to MBTI or 16Personalities style.`;

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
  const prompt = improvedPrompt
    .replace(/{animal_name}/g, animal.nameEn)
    .replace(/{color}/g, animal.color)
    .replace(/{traits}/g, `Should look ${traitsText}`);

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
  'scripts/image-prompts-v2.json',
  JSON.stringify(prompts, null, 2)
);

// CSV形式でも出力
const csvLines = [
  'id,name,nameEn,color,traits,prompt'
];

prompts.forEach(p => {
  const escapedPrompt = `"${p.prompt.replace(/"/g, '""')}"`;
  csvLines.push(`${p.id},${p.name},${p.nameEn},${p.color},"${p.traits}",${escapedPrompt}`);
});

fs.writeFileSync(
  'scripts/image-prompts-v2.csv',
  csvLines.join('\n')
);

console.log(`✅ Generated improved prompts for ${prompts.length} animals`);
console.log('📄 Files created:');
console.log('  - scripts/image-prompts-v2.json');
console.log('  - scripts/image-prompts-v2.csv');
console.log('\n📝 Key improvements:');
console.log('  - Emphasized "ONLY ONE animal" to prevent duplicates');
console.log('  - Specified centered, front-facing composition');
console.log('  - Detailed style matching (soft gradients, kawaii aesthetic)');
console.log('  - Clearer background requirements');
console.log('  - Professional illustration quality specs');
