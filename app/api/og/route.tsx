import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// フォントデータをキャッシュ
let cachedFont: ArrayBuffer | null = null;

async function loadFont(baseUrl: string): Promise<ArrayBuffer | null> {
  if (cachedFont) return cachedFont;

  try {
    const res = await fetch(`${baseUrl}/fonts/NotoSansJP-Bold.otf`);
    if (!res.ok) return null;
    cachedFont = await res.arrayBuffer();
    return cachedFont;
  } catch {
    return null;
  }
}

// 入力をサニタイズ（XSS対策）
function sanitize(input: string, maxLength: number): string {
  return input
    .replace(/[<>"'&]/g, '') // HTML特殊文字を除去
    .slice(0, maxLength)
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // パラメータを取得しサニタイズ
    const rawAnimalName = searchParams.get('animal') || '動物';
    const rawEmoji = searchParams.get('emoji') || '🐾';
    const rawDescription = searchParams.get('description') || '100種類の動物からあなたにピッタリの動物を診断します';

    const animalName = sanitize(rawAnimalName, 20);
    const emoji = sanitize(rawEmoji, 10);
    const description = sanitize(rawDescription, 200);

    // ベースURLを取得
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : request.nextUrl.origin;

    // Noto Sans JPフォントを取得
    const fontData = await loadFont(baseUrl);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#faf5ff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #e9d5ff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e9d5ff 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: '"Noto Sans JP", sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '30px',
              padding: '50px 80px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              border: '4px solid #a855f7',
            }}
          >
            <div
              style={{
                fontSize: 100,
                marginBottom: '10px',
              }}
            >
              {emoji}
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                background: 'linear-gradient(to right, #9333ea, #c026d3)',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '15px',
              }}
            >
              {animalName}
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#6b7280',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.4,
                marginBottom: '30px',
              }}
            >
              {description.length > 80 ? description.substring(0, 80) + '...' : description}
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#9333ea',
                fontWeight: 700,
                padding: '15px 40px',
                backgroundColor: '#f3e8ff',
                borderRadius: '15px',
              }}
            >
              ＃動物100診断
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: fontData
          ? [
              {
                name: 'Noto Sans JP',
                data: fontData,
                style: 'normal' as const,
                weight: 400,
              },
            ]
          : undefined,
      }
    );
  } catch (e: unknown) {
    console.log(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
