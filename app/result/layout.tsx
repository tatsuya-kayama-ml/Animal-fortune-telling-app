import { Metadata } from 'next';
import { animals } from '@/lib/animals';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const animalId = typeof searchParams.animal === 'string' ? searchParams.animal : undefined;
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return {
      title: '動物100診断 - 結果',
      description: '100種類の動物からあなたにピッタリの動物を診断します',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImageUrl = `${baseUrl}/api/og?animal=${encodeURIComponent(animal.name)}&description=${encodeURIComponent(animal.description)}`;

  return {
    title: `${animal.name}タイプ - 動物100診断`,
    description: animal.description,
    openGraph: {
      title: `${animal.name}タイプ - 動物100診断`,
      description: animal.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${animal.name}タイプの診断結果`,
        },
      ],
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${animal.name}タイプ - 動物100診断`,
      description: animal.description,
      images: [ogImageUrl],
    },
  };
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
