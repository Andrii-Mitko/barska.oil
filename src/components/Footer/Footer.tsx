import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h3 className={styles.title}>Барська Олія</h3>
          <p className={styles.description}>
            Виробник соняшникової та ріпакової олії. м. Бар, Вінницька обл.
          </p>
        </div>

        <div>
          <h4 className={styles.subtitle}>Контакти</h4>
          <ul className={styles.list}>
            <li>Микола Мітько</li>
            <li>
              <a href="tel:+380677407135">+380 (67) 740-71-35</a>
            </li>
            <li>
              <a href="mailto:barskaolia@gmail.com">barskaolia@gmail.com</a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=%D0%91%D0%BE%D0%BD%D0%B8+%D0%A1%D1%84%D0%BE%D1%80%D1%86%D0%B8+8%2C+%D0%91%D0%B0%D1%80%2C+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0&hl=uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                вул. Бони Сфорци 8, Бар, Україна
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.subtitle}>Графік роботи</h4>
          <ul className={styles.list}>
            <li>Пн–Нд: 08:00–17:00</li>
            <li>Без вихідних та перерв</li>
          </ul>

          <h4 className={`${styles.subtitle} ${styles.listSecond}`}>
            Доставка та оплата
          </h4>
          <ul className={styles.list}>
            <li>Нова Пошта</li>
            <li>Післяплата / оплата на рахунок</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Барська Олія. Усі права захищено.
      </div>
    </footer>
  );
}
