import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";


export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
     
    </div>
  );
}
