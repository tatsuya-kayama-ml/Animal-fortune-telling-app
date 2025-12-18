import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// 週キーを生成（ISO週番号ベース）
function getWeekKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  // ISO週番号を計算
  const firstDayOfYear = new Date(year, 0, 1);
  const pastDaysOfYear = (now.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

// Neonが利用可能かどうかをチェック
function isNeonAvailable(): boolean {
  return !!process.env.DATABASE_URL;
}

// SQLクライアントを取得
function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(process.env.DATABASE_URL);
}

// テーブル初期化（必要に応じて作成）
async function initializeTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS diagnosis_stats (
      id SERIAL PRIMARY KEY,
      week_key VARCHAR(10) NOT NULL,
      animal_id VARCHAR(50),
      count INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(week_key, animal_id)
    )
  `;
  // インデックス作成
  await sql`
    CREATE INDEX IF NOT EXISTS idx_stats_week ON diagnosis_stats(week_key)
  `;
}

// フォールバック用のメモリストレージ（開発環境用）
let memoryStorage: {
  weeklyCount: number;
  animalCounts: Record<string, number>;
  week: string;
} = {
  weeklyCount: 0,
  animalCounts: {},
  week: getWeekKey(),
};

function resetMemoryIfNeeded() {
  const currentWeek = getWeekKey();
  if (currentWeek !== memoryStorage.week) {
    memoryStorage = {
      weeklyCount: 0,
      animalCounts: {},
      week: currentWeek,
    };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const animalId = searchParams.get('animal');
  const currentWeek = getWeekKey();

  try {
    if (isNeonAvailable()) {
      const sql = getSql();

      // 週間の総診断数を取得
      const totalResult = await sql`
        SELECT COALESCE(SUM(count), 0) as total
        FROM diagnosis_stats
        WHERE week_key = ${currentWeek}
      `;
      const weeklyCount = Number(totalResult[0]?.total) || 0;

      if (animalId) {
        // 特定の動物の統計を取得
        const animalResult = await sql`
          SELECT COALESCE(count, 0) as count
          FROM diagnosis_stats
          WHERE week_key = ${currentWeek} AND animal_id = ${animalId}
        `;
        const animalCount = Number(animalResult[0]?.count) || 0;
        const percentage = weeklyCount > 0 ? (animalCount / weeklyCount) * 100 : 0;

        return NextResponse.json({
          animal: animalId,
          count: animalCount,
          totalCount: weeklyCount,
          percentage: Math.round(percentage * 10) / 10,
          week: currentWeek,
        });
      }

      // 全動物の統計を取得
      const allStats = await sql`
        SELECT animal_id, count
        FROM diagnosis_stats
        WHERE week_key = ${currentWeek} AND animal_id IS NOT NULL
      `;

      const animalCounts: Record<string, number> = {};
      for (const row of allStats) {
        if (row.animal_id) {
          animalCounts[row.animal_id] = Number(row.count);
        }
      }

      return NextResponse.json({
        totalCount: weeklyCount,
        animalCounts,
        week: currentWeek,
      });
    } else {
      // フォールバック: メモリストレージ（開発環境）
      resetMemoryIfNeeded();

      if (animalId) {
        const animalCount = memoryStorage.animalCounts[animalId] || 0;
        const percentage = memoryStorage.weeklyCount > 0
          ? (animalCount / memoryStorage.weeklyCount) * 100
          : 0;

        return NextResponse.json({
          animal: animalId,
          count: animalCount,
          totalCount: memoryStorage.weeklyCount,
          percentage: Math.round(percentage * 10) / 10,
          week: memoryStorage.week,
        });
      }

      return NextResponse.json({
        totalCount: memoryStorage.weeklyCount,
        animalCounts: memoryStorage.animalCounts,
        week: memoryStorage.week,
      });
    }
  } catch (error) {
    console.error('Stats GET error:', error);
    return NextResponse.json(
      { error: '統計情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const currentWeek = getWeekKey();

  try {
    const body = await request.json().catch(() => ({}));
    const animalId = typeof body.animal === 'string' ? body.animal : null;

    if (isNeonAvailable()) {
      const sql = getSql();

      // テーブルが存在しない場合は作成
      await initializeTable();

      if (animalId) {
        // 動物IDがある場合はUPSERT
        await sql`
          INSERT INTO diagnosis_stats (week_key, animal_id, count)
          VALUES (${currentWeek}, ${animalId}, 1)
          ON CONFLICT (week_key, animal_id)
          DO UPDATE SET count = diagnosis_stats.count + 1, updated_at = CURRENT_TIMESTAMP
        `;
      } else {
        // 動物IDがない場合は総カウント用（animal_id = NULL）
        await sql`
          INSERT INTO diagnosis_stats (week_key, animal_id, count)
          VALUES (${currentWeek}, NULL, 1)
          ON CONFLICT (week_key, animal_id)
          DO UPDATE SET count = diagnosis_stats.count + 1, updated_at = CURRENT_TIMESTAMP
        `;
      }

      // 更新後のカウントを取得
      const totalResult = await sql`
        SELECT COALESCE(SUM(count), 0) as total
        FROM diagnosis_stats
        WHERE week_key = ${currentWeek}
      `;
      const newTotal = Number(totalResult[0]?.total) || 0;

      let animalCount = 0;
      if (animalId) {
        const animalResult = await sql`
          SELECT count FROM diagnosis_stats
          WHERE week_key = ${currentWeek} AND animal_id = ${animalId}
        `;
        animalCount = Number(animalResult[0]?.count) || 0;
      }

      return NextResponse.json({
        totalCount: newTotal,
        animalCount,
        week: currentWeek,
      });
    } else {
      // フォールバック: メモリストレージ（開発環境）
      resetMemoryIfNeeded();
      memoryStorage.weeklyCount++;

      if (animalId) {
        memoryStorage.animalCounts[animalId] =
          (memoryStorage.animalCounts[animalId] || 0) + 1;
      }

      return NextResponse.json({
        totalCount: memoryStorage.weeklyCount,
        animalCount: animalId ? memoryStorage.animalCounts[animalId] : 0,
        week: memoryStorage.week,
      });
    }
  } catch (error) {
    console.error('Stats POST error:', error);
    return NextResponse.json(
      { error: '統計情報の記録に失敗しました' },
      { status: 500 }
    );
  }
}
