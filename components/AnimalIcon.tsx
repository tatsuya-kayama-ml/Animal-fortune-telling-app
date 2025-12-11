/**
 * 動物アイコンコンポーネント
 * Noto Color Emojiフォントで絵文字を表示
 */

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

  return (
    <div
      className={`${baseClass} rounded-full flex items-center justify-center shadow-lg noto-emoji ${className}`}
      style={{ backgroundColor: `${animal.color}20` }}
    >
      {animal.emoji}
    </div>
  );
}
