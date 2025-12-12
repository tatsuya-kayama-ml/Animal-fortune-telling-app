import { animals } from '@/lib/animals';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ animal: string }>;
  searchParams: Promise<{ name?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animal: animalId } = await params;
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return {
      title: '動物100診断',
    };
  }

  const baseUrl = 'https://animal-fortune-telling-app.vercel.app';
  const ogImageUrl = `${baseUrl}/api/og?animal=${encodeURIComponent(animal.name)}&emoji=${encodeURIComponent(animal.emoji)}&description=${encodeURIComponent(animal.description)}`;

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

export default async function SharePage({ params, searchParams }: Props) {
  const { animal: animalId } = await params;
  const { name } = await searchParams;

  //  実際の結果ページにリダイレクト
  const resultUrl = `/result?animal=${animalId}${name ? `&name=${encodeURIComponent(name)}` : ''}`;
  redirect(resultUrl);
}
