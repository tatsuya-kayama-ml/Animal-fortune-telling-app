/**
 * 動物アイコンコンポーネント
 * イラストがあればイラスト、なければ絵文字を表示
 */

import Image from 'next/image';
import { Animal } from '@/lib/animals';

interface AnimalIconProps {
  animal: Animal;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16 text-4xl',
  md: 'w-24 h-24 text-6xl',
  lg: 'w-40 h-40 text-7xl',
  xl: 'w-48 h-48 text-8xl',
};

export function AnimalIcon({ animal, size = 'xl', className = '' }: AnimalIconProps) {
  const baseClass = sizeClasses[size];

  if (animal.imagePath) {
    // イラストがある場合
    const sizeMap = {
      sm: 64,
      md: 96,
      lg: 160,
      xl: 192,
    };
    const pixelSize = sizeMap[size];

    return (
      <div
        className={`${baseClass} rounded-full flex items-center justify-center shadow-lg overflow-hidden ${className}`}
        style={{ backgroundColor: `${animal.color}20` }}
      >
        <Image
          src={animal.imagePath}
          alt={animal.name}
          width={pixelSize}
          height={pixelSize}
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // 絵文字フォールバック（Noto Color Emojiフォントを使用）
  return (
    <div
      className={`${baseClass} rounded-full flex items-center justify-center shadow-lg noto-emoji ${className}`}
      style={{ backgroundColor: `${animal.color}20` }}
    >
      {animal.emoji}
    </div>
  );
}
