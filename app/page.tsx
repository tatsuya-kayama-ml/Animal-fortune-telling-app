'use client';

import { useState } from 'react';
import { questions, calculateAnimalScore } from '@/lib/questions';
import { animals } from '@/lib/animals';
import Link from 'next/link';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);

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

      // 結果ページへ遷移
      window.location.href = `/result?animal=${resultAnimalId}`;
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
              動物診断
            </h1>
            <p className="text-xl text-gray-600">
              あなたはどんな動物？
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <p className="text-lg text-gray-700">
              {questions.length}個の質問に答えて、<br />
              あなたの性格を動物で診断します
            </p>

            <button
              onClick={() => setStarted(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              診断スタート
            </button>
          </div>

          <p className="text-sm text-gray-500">
            所要時間：約2分
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* プログレスバー */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>質問 {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.traits)}
                className="w-full bg-gray-50 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 text-gray-800 text-lg font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-md hover:scale-105 text-left"
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option.text}</span>
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
            className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </div>
  );
}
