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
  title: "動物100診断 - 100種類の動物からあなたにピッタリの動物を診断",
  description: "100種類の動物からあなたにピッタリの動物を診断します。11個の質問に答えて、あなたの性格にマッチする動物を見つけよう！",
  keywords: ["動物診断", "動物100診断", "性格診断", "診断テスト", "心理テスト", "100種類"],
  openGraph: {
    title: "動物100診断 - 100種類の動物からあなたにピッタリの動物を診断",
    description: "100種類の動物からあなたにピッタリの動物を診断します",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "動物100診断 - 100種類の動物からあなたにピッタリの動物を診断",
    description: "100種類の動物からあなたにピッタリの動物を診断します",
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
