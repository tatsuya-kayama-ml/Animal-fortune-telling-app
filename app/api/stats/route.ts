import { NextRequest, NextResponse } from 'next/server';

// メモリ上に診断数を保存（サーバーレス環境では各インスタンスごとに初期化される）
// 本番環境ではVercel KVやデータベースを使うことを推奨
let dailyCount = 0;
let animalCounts: Record<string, number> = {};
let lastResetDate = new Date().toISOString().split('T')[0];

function resetIfNeeded() {
  const today = new Date().toISOString().split('T')[0];
  if (today !== lastResetDate) {
    dailyCount = 0;
    animalCounts = {};
    lastResetDate = today;
  }
}

export async function GET(request: NextRequest) {
  resetIfNeeded();

  const { searchParams } = new URL(request.url);
  const animalId = searchParams.get('animal');

  if (animalId) {
    // 特定の動物の統計を取得
    const animalCount = animalCounts[animalId] || 0;
    const percentage = dailyCount > 0 ? (animalCount / dailyCount) * 100 : 0;

    return NextResponse.json({
      animal: animalId,
      count: animalCount,
      totalCount: dailyCount,
      percentage: Math.round(percentage * 10) / 10,
      date: lastResetDate,
    });
  }

  // 全体の統計を取得
  return NextResponse.json({
    totalCount: dailyCount,
    animalCounts,
    date: lastResetDate,
  });
}

export async function POST(request: NextRequest) {
  resetIfNeeded();

  const body = await request.json().catch(() => ({}));
  const animalId = body.animal;

  // 全体のカウントを増加
  dailyCount++;

  // 動物ごとのカウントを増加
  if (animalId) {
    animalCounts[animalId] = (animalCounts[animalId] || 0) + 1;
  }

  return NextResponse.json({
    totalCount: dailyCount,
    animalCount: animalCounts[animalId] || 0,
    date: lastResetDate,
  });
}
