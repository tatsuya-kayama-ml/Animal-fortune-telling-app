import { NextRequest, NextResponse } from 'next/server';

// メモリ上に診断数を保存（サーバーレス環境では各インスタンスごとに初期化される）
// 本番環境ではVercel KVやデータベースを使うことを推奨
let dailyCount = 0;
let lastResetDate = new Date().toISOString().split('T')[0];

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  // 日付が変わったらリセット
  if (today !== lastResetDate) {
    dailyCount = 0;
    lastResetDate = today;
  }

  return NextResponse.json({ count: dailyCount, date: lastResetDate });
}

export async function POST(request: NextRequest) {
  const today = new Date().toISOString().split('T')[0];

  // 日付が変わったらリセット
  if (today !== lastResetDate) {
    dailyCount = 0;
    lastResetDate = today;
  }

  // カウントを増加
  dailyCount++;

  return NextResponse.json({ count: dailyCount, date: lastResetDate });
}
