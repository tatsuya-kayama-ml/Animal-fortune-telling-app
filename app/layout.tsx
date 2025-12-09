import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "動物診断 - あなたはどんな動物？",
  description: "10個の質問に答えて、あなたの性格を動物で診断します。16種類の動物タイプから、あなたにぴったりの動物を見つけよう！",
  keywords: ["動物診断", "性格診断", "診断テスト", "MBTI", "心理テスト"],
  openGraph: {
    title: "動物診断 - あなたはどんな動物？",
    description: "10個の質問に答えて、あなたの性格を動物で診断します",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "動物診断 - あなたはどんな動物？",
    description: "10個の質問に答えて、あなたの性格を動物で診断します",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
