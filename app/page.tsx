'use client';

import { useState } from 'react';
import { questions, calculateAnimalScore } from '@/lib/questions';
import { animals } from '@/lib/animals';
import Link from 'next/link';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [name, setName] = useState('');

  const handleAnswer = (traits: string[]) => {
    const newAnswers = [...answers, traits];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断完了 - 結果を計算してリダイレクト
      const allTraits = newAnswers.flat();
      const scores = calculateAnimalScore(allTraits);
      const resultAnimalId = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );

      // 結果ページへ遷移（名前を含める）
      const encodedName = encodeURIComponent(name || 'あなた');
      window.location.href = `/result?animal=${resultAnimalId}&name=${encodedName}`;
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              動物診断
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              あなたはどんな動物？
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {questions.length}個の質問に答えて、<br />
              あなたの性格を動物で診断します
            </p>

            <div className="space-y-4">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  お名前・ニックネーム
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: たろう、太郎、Taro"
                  maxLength={20}
                  className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  ※ 入力は任意です。入力しない場合は「あなた」と表示されます
                </p>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg sm:text-xl font-bold py-5 sm:py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 active:scale-95 sm:hover:scale-105 touch-manipulation"
              >
                診断スタート
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            所要時間：約2分
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
        {/* プログレスバー */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 font-medium">
            <span>質問 {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 sm:h-2 bg-white rounded-full overflow-hidden shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center leading-tight">
            {question.text}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.traits)}
                className="w-full bg-gray-50 active:bg-gradient-to-r active:from-pink-100 active:to-purple-100 sm:hover:bg-gradient-to-r sm:hover:from-pink-100 sm:hover:to-purple-100 text-gray-800 text-base sm:text-lg font-medium py-4 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-200 active:shadow-md active:scale-98 sm:hover:shadow-md sm:hover:scale-105 text-left touch-manipulation"
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-9 h-9 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="leading-snug">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 戻るボタン */}
        {currentQuestion > 0 && (
          <button
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
              setAnswers(answers.slice(0, -1));
            }}
            className="w-full text-gray-600 hover:text-gray-800 py-3 sm:py-2 transition-colors text-sm sm:text-base font-medium touch-manipulation"
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </div>
  );
}
