'use client';

import { useSearchParams } from 'next/navigation';
import { animals } from '@/lib/animals';
import { Suspense } from 'react';

function AnimalContent() {
  const searchParams = useSearchParams();
  const animalId = searchParams.get('id');

  const animal = animals.find((a) => a.id === animalId);

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
            {/* 動物イラスト（絵文字） */}
            <div
              className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full flex items-center justify-center text-7xl sm:text-8xl shadow-lg"
              style={{ backgroundColor: `${animal.color}20` }}
            >
              {animal.emoji}
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
          </div>
        </div>

        {/* トップに戻る */}
        <div className="text-center pb-2">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg font-bold py-4 sm:py-4 px-10 sm:px-12 rounded-full active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
          >
            診断する
          </a>
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
