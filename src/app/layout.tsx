import {
  PT_Serif,
  Source_Sans_3,
  Roboto_Mono,
  Bad_Script,
} from "next/font/google";
import "./globals.css";

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
