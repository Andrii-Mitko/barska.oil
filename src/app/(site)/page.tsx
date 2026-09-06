import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection/ProductsSection";
import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION } from "@/lib/seo/config";
import TrustBar from "@/components/sections/TrustBar/TrustBar";
import ProductShowcase from "@/components/sections/ProductShowcase/ProductShowcase";
import FarmSupply from "@/components/sections/FarmSupply/FarmSupply";

export const metadata: Metadata = {
  title: "Головна",
  description: DEFAULT_DESCRIPTION,
};

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <TrustBar />
      <ProductShowcase />
      <AboutSection />
      <FarmSupply />
      <ProductsSection />
    </div>
  );
}
