'use client';

import { useSearchParams } from 'next/navigation';
import { animals } from '@/lib/animals';
import { Suspense, useState, useEffect } from 'react';
import { AnimalIcon } from '@/components/AnimalIcon';
import { MBTISelector } from '@/components/MBTISelector';
import { MBTIInsightCard } from '@/components/MBTIInsightCard';
import { MBTIType, isValidMBTIType, AnimalMBTIInsight } from '@/lib/mbti/types';
import { generateAnimalMBTIInsight } from '@/lib/mbti/generator';

type MyResult = {
  animalId: string;
  userName: string;
} | null;

function AnimalContent() {
  const searchParams = useSearchParams();
  const animalId = searchParams.get('id');
  const [myResult, setMyResult] = useState<MyResult>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [mbtiInsight, setMbtiInsight] = useState<AnimalMBTIInsight | null>(null);
  const [showMBTISelector, setShowMBTISelector] = useState(false);

  const animal = animals.find((a) => a.id === animalId);

  // localStorageから自分の診断結果を取得
  useEffect(() => {
    const saved = localStorage.getItem('myAnimalResult');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 現在表示中の動物と自分の診断結果が異なる場合のみ表示
        if (parsed.animalId && parsed.animalId !== animalId) {
          setMyResult(parsed);
        }
      } catch {
        // パースエラーは無視
      }
    }
  }, [animalId]);

  // localStorageからMBTIを読み込む
  useEffect(() => {
    try {
      const savedMBTI = localStorage.getItem('userMBTI');
      if (savedMBTI && isValidMBTIType(savedMBTI)) {
        setSelectedMBTI(savedMBTI);
      }
    } catch {
      // localStorage が使えない環境では無視
    }
  }, []);

  // MBTI選択時の処理
  useEffect(() => {
    if (selectedMBTI && animalId) {
      const insight = generateAnimalMBTIInsight(animalId, selectedMBTI);
      setMbtiInsight(insight);
      try {
        localStorage.setItem('userMBTI', selectedMBTI);
      } catch {
        // localStorage が使えない環境では無視
      }
    }
  }, [selectedMBTI, animalId]);

  const handleMBTISelect = (type: MBTIType) => {
    setSelectedMBTI(type);
    setShowMBTISelector(false);
  };

  if (!animal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">動物が見つかりませんでした</h1>
          <a href="/" className="mt-4 text-blue-600 hover:underline">
            トップに戻る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
        {/* 動物詳細カード */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* 動物表示 */}
          <div className="text-center space-y-3 sm:space-y-4">
            {/* 動物イラスト */}
            <div className="flex justify-center">
              <AnimalIcon animal={animal} size="xl" />
            </div>

            {/* 動物名 */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                {animal.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-500">{animal.nameEn}</p>
            </div>
          </div>

          {/* 説明 */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-5 sm:p-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {animal.description}
              </p>
            </div>

            {/* 詳細説明 */}
            {animal.detailedDescription && (
              <div className="bg-blue-50 rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">性格の詳細</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {animal.detailedDescription}
                </p>
              </div>
            )}

            {/* 特徴 */}
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">基本的な特徴</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {animal.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center text-sm sm:text-base text-gray-700 font-medium"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </div>

            {/* 強み */}
            {animal.strengths && animal.strengths.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-green-700">💪 強み</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {animal.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="bg-green-50 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center text-sm sm:text-base text-green-700 font-medium border border-green-200"
                    >
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 弱み */}
            {animal.weaknesses && animal.weaknesses.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-orange-700">⚠️ 注意したいこと</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {animal.weaknesses.map((weakness, index) => (
                    <div
                      key={index}
                      className="bg-orange-50 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center text-sm sm:text-base text-orange-700 font-medium border border-orange-200"
                    >
                      {weakness}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 相性 */}
            {animal.compatibility && animal.compatibility.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-purple-700">💕 相性の良い動物</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {animal.compatibility.map((compat, index) => {
                    const compatAnimal = animals.find((a) => a.name === compat);
                    if (compatAnimal) {
                      return (
                        <a
                          key={index}
                          href={`/animal?id=${compatAnimal.id}`}
                          className="bg-purple-50 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-purple-700 font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                        >
                          {compat}
                        </a>
                      );
                    }
                    return (
                      <div
                        key={index}
                        className="bg-purple-50 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-purple-700 font-medium border border-purple-200"
                      >
                        {compat}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* アドバイス */}
            {animal.advice && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-yellow-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">✨ アドバイス</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {animal.advice}
                </p>
              </div>
            )}

            {/* MBTI連携セクション */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  🧠 MBTIでさらに詳しく
                </h3>
                <p className="text-sm text-gray-600">
                  MBTIタイプを選ぶと、この動物との組み合わせ分析が見られます
                </p>
              </div>

              {/* MBTI解説カード（選択済みの場合） */}
              {selectedMBTI && mbtiInsight && (
                <MBTIInsightCard
                  mbtiType={selectedMBTI}
                  animalName={animal.name}
                  insight={mbtiInsight}
                />
              )}

              {/* MBTI選択ボタン */}
              {!showMBTISelector && (
                <div className="text-center">
                  <button
                    onClick={() => setShowMBTISelector(true)}
                    className={`
                      px-6 py-3 rounded-full font-medium transition-all duration-200
                      ${selectedMBTI
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                      }
                    `}
                  >
                    {selectedMBTI ? `${selectedMBTI} を変更する` : 'MBTIタイプを選ぶ'}
                  </button>
                </div>
              )}

              {/* MBTIセレクター */}
              {showMBTISelector && (
                <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-800">MBTIタイプを選択</h4>
                    <button
                      onClick={() => setShowMBTISelector(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <MBTISelector
                    selectedMBTI={selectedMBTI}
                    onSelect={handleMBTISelect}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="text-center pb-2 space-y-3">
          {/* 自分の結果に戻るボタン */}
          {myResult && (
            <a
              href={`/result?animal=${myResult.animalId}&name=${encodeURIComponent(myResult.userName)}`}
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-base sm:text-lg font-bold py-4 sm:py-4 px-10 sm:px-12 rounded-full active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
            >
              自分の結果に戻る
            </a>
          )}
          {/* 診断するボタン */}
          <div>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg font-bold py-4 sm:py-4 px-10 sm:px-12 rounded-full active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
            >
              診断する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnimalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    }>
      <AnimalContent />
    </Suspense>
  );
}
