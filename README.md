# Барська Олія — інтернет-магазин

Інтернет-магазин соняшникової та ріпакової олії власного виробництва (м. Бар, Вінницька обл.). Каталог товарів, кошик з замовленням ящиками, оформлення заявки з надсиланням у Telegram та збереженням у MongoDB, і власна адмін-панель.

**Продакшн:** https://barskaoil.com.ua

## Стек

- **Next.js 15** (App Router) + **TypeScript**
- **MongoDB** + **Mongoose** — без CMS, власна логіка
- **Zod** — валідація форм і API
- **CSS Modules** — стилі (без Tailwind)
- **React Hook Form** — форма оформлення замовлення
- **Cloudinary** — зберігання фото товарів, завантаження з адмінки
- **Telegram Bot API** — сповіщення про нові заявки
- Шрифти через `next/font/google`: PT Serif (заголовки), Source Sans 3 (текст), Roboto Mono (числа/ціни), Bad Script (навігація)

## Основний функціонал

### Публічна частина

- Головна сторінка з інформацією про виробництво
- Каталог з фільтром за категоріями (рафінована / холодного пресування / ріпакова)
- Сторінка товару з єдиною ціною за одиницю (без прив'язки до кількості)
- Кошик (localStorage, без бекенд-сесій), замовлення оформлюється ящиками (`unitsPerBox` для кожного товару)
- Оформлення заявки (ФІО, телефон, адреса доставки) — без онлайн-оплати
- При оформленні: запис у MongoDB + компактне сповіщення в Telegram-групу

### Адмін-панель (`/admin`)

- Проста автентифікація (логін/пароль з `.env`, сесія в httpOnly cookie)
- Перегляд заявок, зміна статусу (нова / оброблена / скасована)
- Перегляд, створення і редагування товарів: ціна, наявність, опис, фото (завантаження в Cloudinary)

### SEO

- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `apple-icon.tsx`, `icon.tsx`, `favicon.ico`
- Метадані сторінки товару генеруються динамічно (`generateMetadata`)
- `SITE_URL` у `src/lib/seo/config.ts` — оновити при переїзді на постійний домен

## Ціноутворення

Єдина ціна за одиницю товару (поле `price` у моделі `Product`), без знижок за кількість. Замовлення оформлюється ящиками — кількість штук у ящику задається на товар полем `unitsPerBox` (наприклад, 1 л = 15 шт/ящ, 3 л = 4 шт/ящ, 4.5 л і 5 л = 3 шт/ящ, 10 л = 2 шт/ящ).

## Структура проєкту

```
src/
  app/
    (site)/          # публічна частина (Header/Footer/CartProvider)
      page.tsx
      catalog/
      product/[slug]/
      cart/
    (private)/
      admin/          # адмінка (свій layout, без Header/Footer сайту)
        login/
        orders/
        products/[id]/
    api/
      orders/
      products/
      admin/
  components/
    layout/           # Header (з бургер-меню), Footer
    sections/         # HeroSection, AboutSection, ProductsSection, ProductShowcase, TrustBar, FarmSupply
    product/          # ProductCard, AddToCart
    ui/               # BuyButton, BackButton
    admin/            # OrderStatusSelect, ProductCreateForm, ProductEditForm, DeleteProductButton
  models/             # Mongoose-схеми (Product, Category, Order)
  types/              # TypeScript-інтерфейси
  validations/        # Zod-схеми
  lib/
    db/               # підключення до MongoDB
    cart/             # cartStore (логіка кошика)
    seo/              # конфіг SEO (SITE_URL, назва, опис)
    cloudinary/        # конфіг Cloudinary
    telegram/         # відправка сповіщень
  context/            # CartContext (React Context + useSyncExternalStore)
  middleware.ts       # захист /admin і /api/admin
```

## Змінні середовища

Створи `.env.local` у корені проєкту:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

ADMIN_LOGIN=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

`ADMIN_SESSION_SECRET` згенерувати командою:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

На Vercel ці ж змінні треба додати окремо в **Settings → Environment Variables** — `.env.local` не деплоїться разом із сайтом.

## Встановлення та запуск

```bash
npm install
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000).

## Дані товарів і категорій

Товари та категорії керуються напряму через MongoDB Atlas (вручну або через адмінку `/admin/products`). Категорії: `sunflower-refined`, `sunflower-cold-pressed`, `rapeseed`.

## Деплой

Проєкт задеплоєний на [Vercel](https://vercel.com). Пуш у `main` гілку автоматично запускає новий деплой.

## Author

**Andrii Mitko** — Full Stack JavaScript Developer

Building modern, scalable, and user-friendly web applications with React, Next.js, TypeScript, Node.js, and MongoDB.

- Portfolio: [andrii-mitko-brand.vercel.app](https://andrii-mitko-brand.vercel.app/)
- GitHub: [@Andrii-Mitko](https://github.com/Andrii-Mitko)
- LinkedIn: [andrii-mitko](https://www.linkedin.com/in/andrii-mitko/)
- Email: [andreymit123@gmail.com](mailto:andreymit123@gmail.com)

---
