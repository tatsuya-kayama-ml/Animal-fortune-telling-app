import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoColorEmoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  variable: "--font-noto-emoji",
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoColorEmoji.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
