import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
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
