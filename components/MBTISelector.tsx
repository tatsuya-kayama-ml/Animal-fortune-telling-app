'use client';

import { MBTIType } from '@/lib/mbti/types';
import { mbtiGroups, mbtiProfiles } from '@/lib/mbti/profiles';

interface MBTISelectorProps {
  selectedMBTI: MBTIType | null;
  onSelect: (type: MBTIType) => void;
}

const groupColors: Record<string, { bg: string; selected: string; text: string; border: string }> = {
  analyst: {
    bg: 'bg-purple-50',
    selected: 'bg-purple-500',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  diplomat: {
    bg: 'bg-green-50',
    selected: 'bg-green-500',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  sentinel: {
    bg: 'bg-blue-50',
    selected: 'bg-blue-500',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  explorer: {
    bg: 'bg-yellow-50',
    selected: 'bg-yellow-500',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
};

export function MBTISelector({ selectedMBTI, onSelect }: MBTISelectorProps) {
  return (
    <div className="space-y-4">
      {mbtiGroups.map((group) => {
        const colors = groupColors[group.id];
        return (
          <div key={group.id} className="space-y-2">
            <span className={`text-sm font-medium ${colors.text}`}>{group.name}</span>
            <div className="grid grid-cols-4 gap-2">
              {group.types.map((type) => {
                const isSelected = selectedMBTI === type;
                const profile = mbtiProfiles[type];
                return (
                  <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className={`
                      px-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                      ${isSelected
                        ? `${colors.selected} text-white shadow-md scale-105`
                        : `${colors.bg} ${colors.text} border ${colors.border} hover:scale-105 active:scale-95`
                      }
                    `}
                    title={profile.name}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
