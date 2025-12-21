'use client';

import { AnimalMBTIInsight, MBTIType } from '@/lib/mbti/types';
import { getMBTIProfile, getMBTIGroup } from '@/lib/mbti/profiles';

interface MBTIInsightCardProps {
  mbtiType: MBTIType;
  animalName: string;
  insight: AnimalMBTIInsight;
}

const groupColors: Record<string, { gradient: string; border: string; badge: string }> = {
  analyst: {
    gradient: 'from-purple-50 to-purple-100',
    border: 'border-purple-300',
    badge: 'bg-purple-500',
  },
  diplomat: {
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-300',
    badge: 'bg-green-500',
  },
  sentinel: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-300',
    badge: 'bg-blue-500',
  },
  explorer: {
    gradient: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-300',
    badge: 'bg-yellow-500',
  },
};

export function MBTIInsightCard({ mbtiType, animalName, insight }: MBTIInsightCardProps) {
  const profile = getMBTIProfile(mbtiType);
  const group = getMBTIGroup(mbtiType);
  const colors = groupColors[group.id];

  return (
    <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-5 sm:p-6 border-2 ${colors.border}`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`${colors.badge} text-white text-xs font-bold px-2 py-1 rounded-full`}>
            {mbtiType}
          </span>
          <span className="text-sm text-gray-600">{profile.name}</span>
        </div>
        <span className="text-sm text-gray-500">{group.name}</span>
      </div>

      {/* ニックネーム */}
      <div className="text-center mb-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
          「{insight.nickname}」
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {mbtiType} × {animalName}
        </p>
      </div>

      {/* 解説 */}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
        {insight.description}
      </p>

      {/* 特別な特徴 */}
      {insight.specialTraits.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-gray-700">特別な特徴:</h4>
          <div className="flex flex-wrap gap-2">
            {insight.specialTraits.map((trait, index) => (
              <span
                key={index}
                className="bg-white/70 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-700 border border-gray-200"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
