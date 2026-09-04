import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection/ProductsSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
    </div>
  );
}
