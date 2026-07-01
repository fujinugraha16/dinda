import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Happy Birthday, Dinda",
  description:
    "A heartfelt birthday greeting for Dinda — wishing you joy, love, and a beautiful year ahead.",
  metadataBase: new URL("https://dinda-birthday.vercel.app"),
  openGraph: {
    title: "Happy Birthday, Dinda",
    description:
      "A heartfelt birthday greeting for Dinda — wishing you joy, love, and a beautiful year ahead.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
