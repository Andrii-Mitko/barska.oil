# Барська Олія — інтернет-магазин

Інтернет-магазин соняшникової та ріпакової олії власного виробництва (м. Бар, Вінницька обл.). Каталог товарів, кошик з гуртовими цінами, оформлення заявки з надсиланням у Telegram та збереженням у MongoDB, і власна адмін-панель.

**Продакшн:** https://barskaoil.vercel.app

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
- Сторінка товару з гуртовими ціновими порогами (чим більше кількість — тим нижча ціна за штуку)
- Кошик (localStorage, без бекенд-сесій) з автоматичним перерахунком за ціновими порогами
- Оформлення заявки (ФІО, телефон, адреса доставки) — без онлайн-оплати
- При оформленні: запис у MongoDB + компактне сповіщення в Telegram-групу

### Адмін-панель (`/admin`)

- Проста автентифікація (логін/пароль з `.env`, сесія в httpOnly cookie)
- Перегляд заявок, зміна статусу (нова / оброблена / скасована)
- Перегляд і редагування товарів: ціна, наявність, опис, фото (завантаження в Cloudinary)

## Ціноутворення

Гуртові ціни задані вручну по кожному товару в `src/lib/pricing/priceTiers.ts` — фіксовані ціни за штуку залежно від кількості в замовленні (а не відсоткові знижки). Приклад для олії 1 л рафінованої:

| Кількість | Ціна за шт |
| --------- | ---------- |
| 1 шт      | 95 ₴       |
| від 10 шт | 90 ₴       |
| від 20 шт | 85 ₴       |
| від 30 шт | 80 ₴       |

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
    layout/           # Header, Footer
    sections/         # HeroSection, AboutSection, ProductsSection
    product/          # ProductCard, AddToCart
    ui/               # BuyButton, BackButton
    admin/            # OrderStatusSelect, ProductEditForm
  models/             # Mongoose-схеми (Product, Category, Order)
  types/              # TypeScript-інтерфейси
  validations/        # Zod-схеми
  lib/
    db/               # підключення до MongoDB
    pricing/          # цінові пороги
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


