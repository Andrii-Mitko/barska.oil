import Image from "next/image";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/production.webp"
              alt="Виробництво Барської Олії у місті Бар"
              width={800}
              height={600}
              className={styles.image}
            />
          </div>

          <div>
            <span className={styles.eyebrow}>Про нас</span>
            <h2 className={styles.title}>Власне виробництво в місті Бар</h2>
            <p className={styles.text}>
              Ми переробляємо соняшник на соняшникову олію на власних
              потужностях у м. Бар, Вінницька область. Пропонуємо рафіновану та
              сиру (холодного віджиму) олію, а також макуху. Співпрацюємо з
              фермерами та посередниками, щоб забезпечити стабільну якість та
              обсяг продукції. Наша мета — забезпечити наших клієнтів
              високоякісною соняшниковою олією та іншими продуктами,
              виготовленими з любов`ю та турботою про здоров`я.
            </p>

            <div className={styles.facts}>
              <div>
                <div className={styles.factLabel}>Тип компанії</div>
                <div className={styles.factValue}>Виробник</div>
              </div>
              <div>
                <div className={styles.factLabel}>Форма власності</div>
                <div className={styles.factValue}>Приватне підприємство</div>
              </div>
              <div>
                <div className={styles.factLabel}>Розташування</div>
                <div className={styles.factValue}>
                  м. Бар, вул. Бони Сфорци 8
                </div>
              </div>
              <div>
                <div className={styles.factLabel}>Графік роботи</div>
                <div className={styles.factValue}>Пн–Пт, 10:00–18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
