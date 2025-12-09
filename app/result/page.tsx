'use client';

import { useSearchParams } from 'next/navigation';
import { animals } from '@/lib/animals';
import { Suspense, useState } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const animalId = searchParams.get('animal');
  const [copied, setCopied] = useState(false);

  const animal = animals.find((a) => a.id === animalId);

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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `私は「${animal.name}」タイプでした！\n\n${animal.description}\n\n#動物診断`;

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* 結果カード */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {/* 動物表示 */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl text-gray-600">あなたは...</h2>

            {/* 動物イラスト（絵文字） */}
            <div
              className="w-48 h-48 mx-auto rounded-full flex items-center justify-center text-8xl shadow-lg"
              style={{ backgroundColor: `${animal.color}20` }}
            >
              {animal.emoji}
            </div>

            {/* 動物名 */}
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-800">
                {animal.name}
              </h1>
              <p className="text-xl text-gray-500">{animal.nameEn}</p>
            </div>
          </div>

          {/* 説明 */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {animal.description}
              </p>
            </div>

            {/* 特徴 */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">あなたの特徴</h3>
              <div className="grid grid-cols-2 gap-3">
                {animal.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl px-4 py-3 text-center text-gray-700 font-medium"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SNSシェアボタン */}
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 text-center">結果をシェアする</h3>

          <div className="grid grid-cols-3 gap-4">
            {/* Twitter */}
            <button
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl py-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">X</span>
            </button>

            {/* LINE */}
            <button
              onClick={() => handleShare('line')}
              className="flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-green-400 to-green-500 text-white rounded-2xl py-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span className="text-sm font-medium">LINE</span>
            </button>

            {/* コピー */}
            <button
              onClick={() => handleShare('copy')}
              className={`flex flex-col items-center justify-center space-y-2 ${
                copied
                  ? 'bg-gradient-to-br from-green-400 to-green-500'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500'
              } text-white rounded-2xl py-4 hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              {copied ? (
                <>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">コピー済み</span>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">コピー</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* もう一度診断 */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold py-4 px-12 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
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
