'use client';

import { useSearchParams } from 'next/navigation';
import { animals } from '@/lib/animals';
import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { AnimalIcon } from '@/components/AnimalIcon';
import { MBTISelector } from '@/components/MBTISelector';
import { MBTIInsightCard } from '@/components/MBTIInsightCard';
import { MBTIType, isValidMBTIType, AnimalMBTIInsight } from '@/lib/mbti/types';
import { generateAnimalMBTIInsight } from '@/lib/mbti/generator';
import html2canvas from 'html2canvas';

function ResultContent() {
  const searchParams = useSearchParams();
  const animalId = searchParams.get('animal');
  const userName = searchParams.get('name') || 'あなた';
  const [copied, setCopied] = useState(false);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [mbtiInsight, setMbtiInsight] = useState<AnimalMBTIInsight | null>(null);
  const [showMBTISelector, setShowMBTISelector] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const animal = animals.find((a) => a.id === animalId);

  // 画像として保存
  const handleSaveImage = useCallback(async () => {
    if (!resultCardRef.current || !animal) return;

    setIsSavingImage(true);

    try {
      // 少し待ってからキャプチャ（フォント読み込み完了を確実にする）
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        // 絵文字の問題を回避するため、SVGレンダリングを使用
        foreignObjectRendering: true,
        imageTimeout: 0,
        removeContainer: true,
      });

      // Canvas to Blob に変換してダウンロード
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `動物診断_${animal.name}_${userName}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // メモリリーク防止
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png');

    } catch (error) {
      console.error('画像保存エラー:', error);

      // エラーメッセージを詳細に表示
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      alert(`画像の保存に失敗しました。\n\nエラー: ${errorMessage}\n\n代わりにスクリーンショット機能をお使いください。`);
    } finally {
      setIsSavingImage(false);
    }
  }, [animal, userName]);

  // 診断結果をlocalStorageに保存（他の動物を見た後に戻れるように）
  useEffect(() => {
    if (animalId && userName) {
      try {
        localStorage.setItem('myAnimalResult', JSON.stringify({ animalId, userName }));
      } catch {
        // localStorage が使えない環境では無視
      }
    }
  }, [animalId, userName]);

  // 統計情報を取得
  useEffect(() => {
    if (animalId) {
      fetch(`/api/stats?animal=${animalId}`)
        .then(res => {
          if (!res.ok) throw new Error('API error');
          return res.json();
        })
        .then(data => {
          if (typeof data.percentage === 'number') {
            setPercentage(data.percentage);
          }
        })
        .catch(() => {
          // 統計取得失敗時は表示しない
          setPercentage(null);
        });
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
          <h1 className="text-2xl font-bold text-gray-800">エラーが発生しました</h1>
          <a href="/" className="mt-4 text-blue-600 hover:underline">
            トップに戻る
          </a>
        </div>
      </div>
    );
  }

  // シェア用のURLを生成（OG画像が正しく表示される/share/[animal]を使用）
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/share/${animalId}${userName && userName !== 'あなた' ? `?name=${encodeURIComponent(userName)}` : ''}`
    : '';
  const displayName = userName === 'あなた' ? '私' : userName;
  const shareText = `${displayName}は「${animal.name}」タイプでした！\n\n${animal.description}\n\n＃動物100診断`;

  const handleShare = (platform: 'twitter' | 'line' | 'copy') => {
    switch (platform) {
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
        break;
      case 'line':
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(lineUrl, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
        {/* 結果カード */}
        <div ref={resultCardRef} data-result-card className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* 動物表示 */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl text-gray-600">
              {userName === 'あなた' ? 'あなたは...' : `${userName}さんは...`}
            </h2>

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
              {/* 統計情報 */}
              {percentage !== null && (
                <div className="flex justify-center mt-3">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-5 py-2 border-2 border-purple-300">
                    <p className="text-sm sm:text-base text-purple-700 font-bold">
                      📊 今週<span className="text-lg sm:text-xl mx-1">{percentage}%</span>の人がこの動物でした！
                    </p>
                  </div>
                </div>
              )}
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
                <h3 className="text-lg sm:text-xl font-bold text-green-700">💪 あなたの強み</h3>
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
                <p className="text-xs sm:text-sm text-purple-600 text-center">
                  クリックすると詳細を見られます
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {animal.compatibility.map((compat, index) => {
                    const compatAnimal = animals.find((a) => a.name === compat);
                    if (compatAnimal) {
                      return (
                        <a
                          key={index}
                          href={`/animal?id=${compatAnimal.id}`}
                          className="bg-purple-50 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-purple-700 font-medium border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
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

            {/* 相性が悪い動物 */}
            {animal.incompatibility && animal.incompatibility.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-orange-700">⚠️ 相性が悪い動物</h3>
                <p className="text-xs sm:text-sm text-orange-600 text-center">
                  クリックすると詳細を見られます
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {animal.incompatibility.map((incompat, index) => {
                    const incompatAnimal = animals.find((a) => a.name === incompat);
                    if (incompatAnimal) {
                      return (
                        <a
                          key={index}
                          href={`/animal?id=${incompatAnimal.id}`}
                          className="bg-orange-50 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-orange-700 font-medium border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer"
                        >
                          {incompat}
                        </a>
                      );
                    }
                    return (
                      <div
                        key={index}
                        className="bg-orange-50 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base text-orange-700 font-medium border border-orange-200"
                      >
                        {incompat}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* アドバイス */}
            {animal.advice && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-yellow-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">✨ あなたへのアドバイス</h3>
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
                  あなたのMBTIタイプを選ぶと、より詳しい性格分析が見られます
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

        {/* SNSシェアボタン */}
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">結果をシェアする</h3>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {/* Twitter */}
            <button
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl py-4 sm:py-4 active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">X</span>
            </button>

            {/* LINE */}
            <button
              onClick={() => handleShare('line')}
              className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 bg-gradient-to-br from-green-400 to-green-500 text-white rounded-2xl py-4 sm:py-4 active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">LINE</span>
            </button>

            {/* コピー */}
            <button
              onClick={() => handleShare('copy')}
              className={`flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 ${
                copied
                  ? 'bg-gradient-to-br from-green-400 to-green-500'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500'
              } text-white rounded-2xl py-4 sm:py-4 active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation`}
            >
              {copied ? (
                <>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">コピー済み</span>
                </>
              ) : (
                <>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">コピー</span>
                </>
              )}
            </button>

            {/* 画像保存 */}
            <button
              onClick={handleSaveImage}
              disabled={isSavingImage}
              className={`flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 ${
                isSavingImage
                  ? 'bg-gradient-to-br from-purple-300 to-pink-300 cursor-wait'
                  : 'bg-gradient-to-br from-purple-400 to-pink-500'
              } text-white rounded-2xl py-4 sm:py-4 active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation`}
            >
              {isSavingImage ? (
                <>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">保存中...</span>
                </>
              ) : (
                <>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">画像保存</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 他の動物を見る */}
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">他の動物を見る</h3>
          <p className="text-sm text-gray-600 text-center">気になる動物をクリックして詳細を見てみよう！</p>


          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 max-h-96 overflow-y-auto p-2">
            {animals.map((a) => (
              <a
                key={a.id}
                href={`/animal?id=${a.id}`}
                className="flex flex-col items-center space-y-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                title={a.name}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-sm noto-emoji"
                  style={{ backgroundColor: `${a.color}20` }}
                >
                  {a.emoji}
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight">{a.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* もう一度診断 */}
        <div className="text-center pb-2">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg font-bold py-4 sm:py-4 px-10 sm:px-12 rounded-full active:shadow-lg active:scale-95 sm:hover:shadow-lg transition-all duration-200 sm:hover:scale-105 touch-manipulation"
          >
            もう一度診断する
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
