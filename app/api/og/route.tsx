import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animalName = searchParams.get('animal') || '動物';
    const description = searchParams.get('description') || '100種類の動物からあなたにピッタリの動物を診断します';

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
              padding: '60px 80px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              border: '4px solid #a855f7',
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #9333ea, #c026d3)',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '20px',
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
                fontWeight: 'bold',
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
      }
    );
  } catch (e: unknown) {
    console.log(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
