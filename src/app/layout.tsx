import {
  PT_Serif,
  Source_Sans_3,
  Roboto_Mono,
  Bad_Script,
} from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo/config";

const headingFont = PT_Serif({
  variable: "--font-heading",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const numberFont = Roboto_Mono({
  variable: "--font-number",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const navFont = Bad_Script({
  variable: "--font-nav",
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — соняшникова та ріпакова олія власного виробництва`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${numberFont.variable} ${navFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
