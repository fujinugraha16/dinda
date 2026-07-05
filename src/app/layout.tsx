import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full text-navy">{children}</body>
    </html>
  );
}
