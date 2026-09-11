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
              fill
              className={styles.image}
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </div>

          <div>
            <span className={styles.eyebrow}>Про нас</span>
            <h2 className={styles.title}>Власне виробництво в місті Бар</h2>
            <p className={styles.text}>
              «Барська Олія» — це сучасне приватне підприємство з власним
              виробництвом у місті Бар на Вінниччині. Ми спеціалізуємося на
              переробці соняшника та ріпаку, виготовляючи натуральну олію
              найвищої якості за стандартом ДСТУ 4492:2005.
            </p>
            <p className={styles.listIntro}>Наш асортимент включає:</p>{" "}
            <ul className={styles.list}>
              {" "}
              <li>
                {" "}
                Рафіновану соняшникову олію — ідеально очищену для щоденного
                приготування страв та смаження.{" "}
              </li>{" "}
              <li>
                {" "}
                Нерафіновану олію холодного віджиму (Extra Virgin) —
                зберігаються природні вітаміни, аромат і насичений смак.{" "}
              </li>{" "}
              <li>
                {" "}
                Соняшникову макуху — високобілковий корм для тваринництва.{" "}
              </li>{" "}
            </ul>
            <p className={styles.text}>
              Ми дбаємо про повний цикл виробництва: від суворого відбору
              якісної сировини без ГМО до ретельного контролю готової продукції.
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
                <ul className={styles.factValue}>
                  <li>Пн–Нд: 08:00–17:00</li>
                  <li>Без вихідних та перерв</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
