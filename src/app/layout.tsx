import { PT_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
