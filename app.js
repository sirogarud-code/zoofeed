
/* =========================
   ZooFeed — app.js (магазин)
   ========================= */

const PAGE_SIZE = 8;
const REVIEWS_PER_PAGE = 3;

const LS_CART      = "zf_cart";
const LS_FAV       = "zf_fav";
const LS_CMP       = "zf_cmp";
const LS_USER      = "zf_user";      // поточний користувач
const LS_USERS     = "zf_users";     // список усіх користувачів
const LS_LANG      = "zf_lang";
const LS_REVIEWS   = "zf_reviews";
const LS_PCOMMENTS = "zf_pcomments"; // коментарі до товарів
const LS_ORDERS   = "zf_orders";     // список оформлених замовлень

// ---------- Налаштування контактів / соцмереж (footer) ----------

const LS_SETTINGS = "zf_settings";

const DEFAULT_SETTINGS = {
  phone: "+38 (000) 000-00-00",
  email: "support@zoofeed.demo",
  delivery: "Доставка по Україні (демо)",
  card: "",
  socials: {
    instagram: "",
    facebook: "",
    telegram: "",
    viber: ""
  }
};

function loadFooterSettings() {
  try {
    const raw = localStorage.getItem(LS_SETTINGS);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const data = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...data,
      socials: { ...DEFAULT_SETTINGS.socials, ...(data.socials || {}) }
    };
  } catch (e) {
    console.warn("Cannot load footer settings", e);
    return { ...DEFAULT_SETTINGS };
  }
}

/* ---------- i18n ---------- */

const I18N = {
  uk: {
    nav_shop: "Магазин",
    nav_about: "Про нас",
    nav_reviews: "Відгуки",
    nav_faq: "FAQ",
    nav_contacts: "Контакти",

    hero_badge: "Найкращий зоомагазин України",
    hero_title: "Щасливі тварини починаються з правильного харчування",
    hero_subtitle: "Підбір кормів для собак, котів, птахів та гризунів з доставкою протягом 24 годин.",
    hero_cta_shop: "До каталогу",
    hero_cta_help: "Підібрати корм",
    hero_b1: "100% натуральні інгредієнти",
    hero_b2: "Офіційні постачальники",
    hero_b3: "Бонуси за кожне замовлення",

    benefits_title: "Чому ZooFeed?",
    benefits_sub: "Невеликий магазин з великим досвідом у кормі для тварин.",
    benefit_fast: "Доставка за 24 години",
    benefit_fast_text: "Відправляємо замовлення в той самий або наступний робочий день.",
    benefit_vet: "Рекомендації ветеринарів",
    benefit_vet_text: "Обираємо корми з перевіреним складом та репутацією.",
    benefit_bonus: "Бонуси за покупки",
    benefit_bonus_text: "Нараховуємо внутрішні бонуси, які можна використати при наступному замовленні.",

    catalog_title: "Каталог кормів",
    catalog_sub: "Оберіть категорію, бренд або скористайтеся пошуком.",
    filter_cat_all: "Усі категорії",
    filter_cat_dogs: "Для собак",
    filter_cat_cats: "Для котів",
    filter_cat_birds: "Для птахів",
    filter_cat_rodents: "Для гризунів",
    filter_brand_all: "Усі бренди",
    filter_search: "Пошук...",
    sort_popular: "За популярністю",
    sort_price_asc: "Спочатку дешевші",
    sort_price_desc: "Спочатку дорожчі",

    about_title: "Про ZooFeed",
    about_text: "ZooFeed — демо-інтернет-магазин кормів для тварин.",

    about_card1_title: "Для кого магазин?",
    about_card1_text: "Для власників собак, котів, птахів та гризунів, які хочуть швидко підібрати якісний корм.",
    about_card2_title: "Що всередині демо?",
    about_card2_text: "Каталог товарів, кошик, обране, порівняння, відгуки, базова авторизація та форма контактів.",
    about_card3_title: "Навіщо це все?",
    about_card3_text: "Щоб попрактикуватися у верстці, JavaScript та роботі з localStorage у реалістичному проєкті.",

    reviews_title: "Відгуки покупців",
    reviews_text: "Для спрощення демо ми показуємо кілька історій від покупців, а також даємо змогу додати свій відгук.",

    reviews_prev_btn: "Попередні",
    reviews_next_btn: "Наступні",
    reviews_toggle_btn: "Залишити відгук",
    review_form_title: "Залишити відгук",
    review_name_label: "Ваше ім’я",
    review_pet_label: "Улюбленець / порода",
    review_city_label: "Місто",
    review_rating_label: "Оцінка",
    review_text_label: "Ваш відгук",
    review_placeholder_name: "Олена",
    review_placeholder_pet: "Собака, мопс; кіт, британський тощо",
    review_placeholder_city: "Київ",
    review_placeholder_text: "Розкажіть, як вам сервіс та корм 😊",
    review_submit_btn: "Надіслати відгук",
    review_hint_text: "Дякуємо за відгук! Він збережений у вашому браузері.",
    reviews_empty_text: "Ще немає відгуків. Будьте першим!",

    faq_title: "Поширені запитання",
    faq_q1: "Чи справжній це магазин?",
    faq_a1: "Це демо-сайт для навчання фронтенду.",
    faq_q2: "Де зберігаються кошик та обране?",
    faq_a2: "Дані зберігаються у вашому браузері в localStorage.",

    contacts_title: "Контакти",
    contacts_text: "Маєте питання щодо корму, доставки або сайту? Напишіть нам – відповімо протягом робочого дня.",

    contacts_strip_title: "Будьте на зв’язку із ZooFeed",
    contacts_strip_sub: "Задайте питання про замовлення, доставку або сайт — відповімо протягом робочого дня.",
    contacts_name_placeholder: "Ім’я",
    contacts_email_placeholder: "E-mail",
    contacts_topic_placeholder: "Про що питання?",
    contacts_topic_order: "Замовлення та доставка",
    contacts_topic_food: "Підбір корму",
    contacts_topic_payment: "Оплата",
    contacts_topic_other: "Інше питання",
    contacts_send_btn: "Надіслати повідомлення",

    cart_title: "Кошик",
    cart_total: "Всього:",
    cart_checkout: "Оформити замовлення",

    auth_title: "Особистий кабінет",
    auth_subtitle: "Увійдіть або зареєструйтесь (демо).",
    auth_password: "Пароль",
    auth_login_btn: "Увійти",

    support_label: "Підтримка",
    support_title: "Служба підтримки",
    support_status: "Онлайн • відповімо за кілька хвилин",
    support_tip: "Напишіть нам запитання щодо замовлення, доставки чи роботи сайту.",
    support_hello: "Вітаю! Я Оля з підтримки ZooFeed 🐾 Чим можу допомогти?",
    support_placeholder: "Опишіть коротко ваше питання…",
    support_send_btn: "Надіслати",
    support_footnote: "Це демо-чат. Повідомлення зберігаються тільки у вашому браузері.",

    comments_title: "Коментарі покупців",
    comments_toggle_show: "Показати коментарі",
    comments_toggle_hide: "Сховати коментарі",
    comments_empty: "Ще немає коментарів. Будьте першим!",
    comments_name_label: "Ваше ім’я",
    comments_name_placeholder: "Ім’я",
    comments_text_label: "Ваш коментар",
    comments_text_placeholder: "Поділіться враженнями про цей товар",
    comments_submit: "Надіслати коментар",
    comments_saved_hint: "Дякуємо за коментар! Він збережений у вашому браузері.",
    product_desc_fallback: "Опис цього товару тимчасово відсутній. Незабаром ми його додамо 🙂",

    footer_note: "© 2025 ZooFeed Demo. Дані зберігаються лише у вашому браузері.",
    footer_col_shop: "Покупцям",
    footer_col_info: "Інформація",
    footer_col_social: "Ми в соцмережах",
    footer_col_pay: "Оплата",
    footer_link_catalog: "Каталог товарів",
    footer_link_reviews: "Відгуки",
    footer_link_faq: "Поширені запитання",
    footer_link_contacts: "Контакти",
    footer_rating_label: "Рейтинг магазину:",
    footer_rating_source: "на основі демо-оцінок",
    footer_made_by: "Створено для навчання фронтенду"
  },

  ru: {
    nav_shop: "Магазин",
    nav_about: "О нас",
    nav_reviews: "Отзывы",
    nav_faq: "FAQ",
    nav_contacts: "Контакты",

    hero_badge: "Лучший зоомагазин Украины",
    hero_title: "Счастливые питомцы начинаются с правильного питания",
    hero_subtitle: "Подбор кормов с доставкой в течение 24 часов.",
    hero_cta_shop: "К каталогу",
    hero_cta_help: "Подобрать корм",
    hero_b1: "100% натуральные ингредиенты",
    hero_b2: "Официальные поставщики",
    hero_b3: "Бонусы за каждый заказ",

    benefits_title: "Почему ZooFeed?",
    benefits_sub: "Небольшой магазин с большим опытом в кормах для животных.",
    benefit_fast: "Доставка за 24 часа",
    benefit_fast_text: "Отправляем заказ в тот же или следующий рабочий день.",
    benefit_vet: "Рекомендации ветеринаров",
    benefit_vet_text: "Выбираем корма с проверенным составом и репутацией.",
    benefit_bonus: "Бонусы за покупки",
    benefit_bonus_text: "Начисляем внутренние бонусы для следующих заказов.",

    catalog_title: "Каталог кормов",
    catalog_sub: "Выберите категорию, бренд или используйте поиск.",
    filter_cat_all: "Все категории",
    filter_cat_dogs: "Для собак",
    filter_cat_cats: "Для котов",
    filter_cat_birds: "Для птиц",
    filter_cat_rodents: "Для грызунов",
    filter_brand_all: "Все бренды",
    filter_search: "Поиск...",
    sort_popular: "По популярности",
    sort_price_asc: "Сначала дешевле",
    sort_price_desc: "Сначала дороже",

    about_title: "О ZooFeed",
    about_text: "ZooFeed — демо-интернет-магазин кормов для животных.",

    about_card1_title: "Для кого магазин?",
    about_card1_text: "Для владельцев собак, кошек, птиц и грызунов, которые хотят быстро подобрать качественный корм.",
    about_card2_title: "Что внутри демо?",
    about_card2_text: "Каталог товаров, корзина, избранное, сравнение, отзывы, базовая авторизация и форма контактов.",
    about_card3_title: "Зачем всё это?",
    about_card3_text: "Чтобы попрактиковаться в вёрстке, JavaScript и работе с localStorage на реалистичном проекте.",

    reviews_title: "Отзывы покупателей",
    reviews_text: "Для простоты показываем несколько историй и даём оставить свой отзыв.",

    reviews_prev_btn: "Предыдущие",
    reviews_next_btn: "Следующие",
    reviews_toggle_btn: "Оставить отзыв",
    review_form_title: "Оставить отзыв",
    review_name_label: "Ваше имя",
    review_pet_label: "Питомец / порода",
    review_city_label: "Город",
    review_rating_label: "Оценка",
    review_text_label: "Ваш отзыв",
    review_placeholder_name: "Елена",
    review_placeholder_pet: "Собака, мопс; кот, британец и т.п.",
    review_placeholder_city: "Киев",
    review_placeholder_text: "Расскажите, как вам сервис и корм 😊",
    review_submit_btn: "Отправить отзыв",
    review_hint_text: "Спасибо за отзыв! Он сохранён в вашем браузере.",
    reviews_empty_text: "Пока нет отзывов. Будьте первым!",

    faq_title: "Частые вопросы",
    faq_q1: "Это настоящий магазин?",
    faq_a1: "Это демо-сайт для обучения фронтенду.",
    faq_q2: "Где хранятся корзина и избранное?",
    faq_a2: "Данные хранятся в вашем браузере в localStorage.",

    contacts_title: "Контакты",
    contacts_text: "Есть вопрос по корму, доставке или сайту? Напишите нам — ответим в рабочее время.",

    contacts_strip_title: "Будьте на связи с ZooFeed",
    contacts_strip_sub: "Задайте вопрос о заказе, доставке или сайте — ответим в рабочее время.",
    contacts_name_placeholder: "Имя",
    contacts_email_placeholder: "E-mail",
    contacts_topic_placeholder: "О чём вопрос?",
    contacts_topic_order: "Заказ и доставка",
    contacts_topic_food: "Подбор корма",
    contacts_topic_payment: "Оплата",
    contacts_topic_other: "Другой вопрос",
    contacts_send_btn: "Отправить сообщение",

    cart_title: "Корзина",
    cart_total: "Итого:",
    cart_checkout: "Оформить заказ",

    auth_title: "Личный кабинет",
    auth_subtitle: "Войдите или зарегистрируйтесь (демо).",
    auth_password: "Пароль",
    auth_login_btn: "Войти",

    support_label: "Поддержка",
    support_title: "Служба поддержки",
    support_status: "Онлайн • ответим за несколько минут",
    support_tip: "Напишите нам вопрос по заказу, доставке или работе сайта.",
    support_hello: "Здравствуйте! Я Оля из поддержки ZooFeed 🐾 Чем могу помочь?",
    support_placeholder: "Кратко опишите ваш вопрос…",
    support_send_btn: "Отправить",
    support_footnote: "Это демо-чат. Сообщения хранятся только в вашем браузере.",

    comments_title: "Комментарии покупателей",
    comments_toggle_show: "Показать комментарии",
    comments_toggle_hide: "Скрыть комментарии",
    comments_empty: "Пока нет комментариев. Будьте первым!",
    comments_name_label: "Ваше имя",
    comments_name_placeholder: "Имя",
    comments_text_label: "Ваш комментарий",
    comments_text_placeholder: "Поделитесь впечатлениями о товаре",
    comments_submit: "Отправить комментарий",
    comments_saved_hint: "Спасибо за комментарий! Он сохранён в вашем браузере.",
    product_desc_fallback: "Описание этого товара временно отсутствует. Мы скоро его добавим 🙂",

    footer_note: "© 2025 ZooFeed Demo. Данные хранятся только в вашем браузере.",
    footer_col_shop: "Покупателям",
    footer_col_info: "Информация",
    footer_col_social: "Мы в соцсетях",
    footer_col_pay: "Оплата",
    footer_link_catalog: "Каталог товаров",
    footer_link_reviews: "Отзывы",
    footer_link_faq: "Частые вопросы",
    footer_link_contacts: "Контакты",
    footer_rating_label: "Рейтинг магазина:",
    footer_rating_source: "на основе демо-оценок",
    footer_made_by: "Создано для обучения фронтенду"
  },

  en: {
    nav_shop: "Shop",
    nav_about: "About",
    nav_reviews: "Reviews",
    nav_faq: "FAQ",
    nav_contacts: "Contacts",

    hero_badge: "Best pet shop in Ukraine (demo)",
    hero_title: "Pet food store",
    hero_subtitle: "Choose quality food for dogs, cats, birds, and rodents.",
    hero_cta_shop: "Go to catalog",
    hero_cta_help: "Help me choose food",
    hero_b1: "100% natural ingredients",
    hero_b2: "Official suppliers",
    hero_b3: "Bonus points for each order",

    benefits_title: "Why ZooFeed?",
    benefits_sub: "A small shop with big experience in pet nutrition.",
    benefit_fast: "Delivery within 24h",
    benefit_fast_text: "We ship the same or the next business day.",
    benefit_vet: "Vet recommended",
    benefit_vet_text: "We pick foods with proven formulas and reputation.",
    benefit_bonus: "Loyalty bonuses",
    benefit_bonus_text: "Earn internal bonuses you can use on the next order.",

    catalog_title: "Product catalog",
    catalog_sub: "Choose a category, brand or use search.",
    filter_cat_all: "All categories",
    filter_cat_dogs: "For dogs",
    filter_cat_cats: "For cats",
    filter_cat_birds: "For birds",
    filter_cat_rodents: "For rodents",
    filter_brand_all: "All brands",
    filter_search: "Search...",
    sort_popular: "By popularity",
    sort_price_asc: "Cheaper first",
    sort_price_desc: "More expensive first",

    about_title: "About ZooFeed",
    about_text: "ZooFeed is a demo pet food e-commerce site.",

    about_card1_title: "Who is the store for?",
    about_card1_text: "For owners of dogs, cats, birds and rodents who want to quickly choose quality food.",
    about_card2_title: "What's inside the demo?",
    about_card2_text: "Product catalog, cart, favorites, comparison, reviews, basic auth and contact form.",
    about_card3_title: "Why build this?",
    about_card3_text: "To practice layout, JavaScript and localStorage in a realistic project.",

    reviews_title: "Customer reviews",
    reviews_text: "We show a few demo stories and let you add your own review.",
    reviews_prev_btn: "Previous",
    reviews_next_btn: "Next",
    reviews_toggle_btn: "Leave a review",
    review_form_title: "Leave a review",
    review_name_label: "Your name",
    review_pet_label: "Pet / breed",
    review_city_label: "City",
    review_rating_label: "Rating",
    review_text_label: "Your review",
    review_placeholder_name: "Name",
    review_placeholder_pet: "Dog, pug; cat, british etc.",
    review_placeholder_city: "City",
    review_placeholder_text: "Tell us what you think about our service and food 😊",
    review_submit_btn: "Send review",
    review_hint_text: "Thanks for your review! It is stored in your browser.",
    reviews_empty_text: "No reviews yet. Be the first!",

    faq_title: "Frequently Asked Questions",
    faq_q1: "Is this a real store?",
    faq_a1: "This is a demo site for learning frontend.",
    faq_q2: "Where are cart and favorites stored?",
    faq_a2: "They are stored in your browser (localStorage).",

    contacts_title: "Contacts",
    contacts_text: "Have a question about food, delivery or the site? Write to us — we’ll answer within a working day.",

    contacts_strip_title: "Stay in touch with ZooFeed",
    contacts_strip_sub: "Ask about orders, delivery or the site — we’ll answer on a working day.",
    contacts_name_placeholder: "Name",
    contacts_email_placeholder: "E-mail",
    contacts_topic_placeholder: "What is your question about?",
    contacts_topic_order: "Order & delivery",
    contacts_topic_food: "Food selection",
    contacts_topic_payment: "Payment",
    contacts_topic_other: "Other question",
    contacts_send_btn: "Send message",

    cart_title: "Cart",
    cart_total: "Total:",
    cart_checkout: "Checkout (demo)",

    auth_title: "Account",
    auth_subtitle: "Log in or register (demo).",
    auth_password: "Password",
    auth_login_btn: "Login",

    support_label: "Support",
    support_title: "Support service",
    support_status: "Online • we reply in a few minutes",
    support_tip: "Write us a question about your order, delivery or the website.",
    support_hello: "Hello! I’m Olha from ZooFeed support 🐾 How can I help you?",
    support_placeholder: "Briefly describe your question…",
    support_send_btn: "Send",
    support_footnote: "This is a demo chat. Messages are stored only in your browser.",

    comments_title: "Customer comments",
    comments_toggle_show: "Show comments",
    comments_toggle_hide: "Hide comments",
    comments_empty: "No comments yet. Be the first!",
    comments_name_label: "Your name",
    comments_name_placeholder: "Name",
    comments_text_label: "Your comment",
    comments_text_placeholder: "Share your thoughts about this product",
    comments_submit: "Send comment",
    comments_saved_hint: "Thanks! Your comment is stored in your browser.",
    product_desc_fallback: "The description of this product is temporarily unavailable. We’ll add it soon 🙂",

    footer_note: "© 2025 ZooFeed Demo. Data is stored only in your browser.",
    footer_col_shop: "For customers",
    footer_col_info: "Information",
    footer_col_social: "We are on social media",
    footer_col_pay: "Payment",
    footer_link_catalog: "Product catalog",
    footer_link_reviews: "Reviews",
    footer_link_faq: "FAQ",
    footer_link_contacts: "Contacts",
    footer_rating_label: "Store rating:",
    footer_rating_source: "based on demo ratings",
    footer_made_by: "Built for learning frontend"
  }
};


/* ---------- описи товарів для різних мов ---------- */

const PRODUCT_DESCRIPTIONS = {
  // DOGS
  d1: {
    uk: "Сухий повнораціонний корм для дорослих собак середніх порід. Підтримує м’язовий тонус, здоров’я суглобів та травлення. Велика упаковка 15 кг зручна для регулярного годування.",
    ru: "Сухой полнорационный корм для взрослых собак средних пород. Поддерживает мышечный тонус, здоровье суставов и пищеварения. Большая упаковка 15 кг удобна для регулярного кормления.",
    en: "Complete dry food for adult medium-breed dogs. Supports muscle tone, joint and digestive health. Large 15 kg bag is convenient for everyday feeding."
  },
  d2: {
    uk: "Сухий корм для цуценят та молодих собак середніх порід. Рецептура з легкою куркою й рисом без пшениці підходить для чутливого травлення та рівномірного зростання.",
    ru: "Сухой корм для щенков и молодых собак средних пород. Формула с курицей и рисом без пшеницы подходит для чувствительного пищеварения и равномерного роста.",
    en: "Dry food for puppies and young medium-breed dogs. Wheat-free recipe with chicken and rice, gentle on digestion and supporting healthy growth."
  },
  d3: {
    uk: "Повнораціонний корм для дорослих собак середніх порід. Містить пребіотики та збалансований вміст білків і жирів для здорового травлення та блискучої шерсті.",
    ru: "Полнорационный корм для взрослых собак средних пород. Содержит пребиотики и сбалансированное количество белков и жиров для здорового пищеварения и блестящей шерсти.",
    en: "Complete food for adult medium-breed dogs. Contains prebiotics and a balanced level of protein and fat for healthy digestion and a shiny coat."
  },
  d4: {
    uk: "Гіпоалергенний корм для дорослих собак середніх порід. Підходить тваринам з чутливою шкірою та травленням, підтримує імунітет і гарний стан шерсті.",
    ru: "Гипоаллергенный корм для взрослых собак средних пород. Подходит животным с чувствительной кожей и пищеварением, поддерживает иммунитет и состояние шерсти.",
    en: "Hypoallergenic food for adult medium-breed dogs. Suitable for dogs with sensitive skin and digestion, supports immunity and coat condition."
  },
  d5: {
    uk: "Багатий на м’ясо сухий корм для активних дорослих собак. Високий вміст білка підтримує м’язи, а натуральні інгредієнти сприяють чудовому самопочуттю.",
    ru: "Мясной сухой корм для активных взрослых собак. Высокое содержание белка поддерживает мышцы, а натуральные ингредиенты улучшают общее самочувствие.",
    en: "Meat-rich dry food for active adult dogs. High protein level supports strong muscles, while natural ingredients help keep your dog in great condition."
  },
  d6: {
    uk: "Сухий корм для дорослих собак середніх порід із чутливим травленням. Містить пробіотики, антиоксиданти та якісні білки для здоров’я кишківника.",
    ru: "Сухой корм для взрослых собак средних пород с чувствительным пищеварением. Содержит пробиотики, антиоксиданты и качественные белки для здоровья кишечника.",
    en: "Dry food for adult medium-breed dogs with sensitive digestion. Contains probiotics, antioxidants and high-quality proteins for gut health."
  },
  d7: {
    uk: "Щоденний збалансований корм для дорослих собак. Підходить більшості порід, містить вітаміни та мінерали для міцного імунітету та здорової шерсті.",
    ru: "Ежедневный сбалансированный корм для взрослых собак. Подходит большинству пород, содержит витамины и минералы для крепкого иммунитета и здоровой шерсти.",
    en: "Everyday balanced food for adult dogs of most breeds. Enriched with vitamins and minerals to support strong immunity and a healthy coat."
  },
  d8: {
    uk: "Корм супер-преміум класу для дорослих собак. Поєднує якісні білки, корисні жири та фітодобавки для підтримки суглобів, травлення та блиску шерсті.",
    ru: "Корм супер-премиум класса для взрослых собак. Сочетает качественные белки, полезные жиры и фитодобавки для поддержки суставов, пищеварения и блеска шерсти.",
    en: "Super-premium food for adult dogs. Combines high-quality proteins, healthy fats and herbal additives to support joints, digestion and a shiny coat."
  },

  // CATS
  c1: {
    uk: "Сухий корм для дорослих котів. Підтримує здоров’я сечовидільної системи та красиву шерсть, підходить для щоденного годування.",
    ru: "Сухой корм для взрослых кошек. Поддерживает здоровье мочевыделительной системы и красивую шерсть, подходит для ежедневного кормления.",
    en: "Dry food for adult cats. Supports urinary tract health and a shiny coat, suitable for daily feeding."
  },
  c2: {
    uk: "Спеціальний корм для домашніх котів, які живуть у приміщенні. Зменшує запах випорожнень і допомагає підтримувати нормальну вагу.",
    ru: "Специальный корм для домашних котов, живущих в помещении. Уменьшает запах испражнений и помогает поддерживать нормальный вес.",
    en: "Special food for indoor cats. Helps reduce stool odour and supports healthy weight management."
  },
  c3: {
    uk: "Корм для стерилізованих котів. Контролює калорійність раціону, підтримує сечовидільну систему та оптимальну вагу.",
    ru: "Корм для стерилизованных кошек. Контролирует калорийность рациона, поддерживает мочевыделительную систему и оптимальный вес.",
    en: "Food for sterilised cats. Controlled calories support urinary health and help maintain ideal weight."
  },
  c4: {
    uk: "Ніжні консерви для котів з відбірними інгредієнтами. Добре підходять як ласощі або доповнення до сухого корму.",
    ru: "Нежные консервы для кошек из отборных ингредиентов. Подходят как лакомство или дополнение к сухому корму.",
    en: "Tender wet food for cats made from selected ingredients. Perfect as a treat or complement to dry food."
  },
  c5: {
    uk: "Апетитні вологі паучі для котів у соусі. Допомагають урізноманітнити раціон і підвищити поїдання корму.",
    ru: "Аппетитные влажные паучи для кошек в соусе. Помогают разнообразить рацион и улучшить поедаемость.",
    en: "Tasty wet pouches for cats in sauce. Help diversify the diet and improve palatability."
  },
  c6: {
    uk: "Сухий корм для дорослих котів із урахуванням потреб домашніх тварин. Містить вітаміни та мінерали для здорових зубів і шерсті.",
    ru: "Сухой корм для взрослых кошек с учётом потребностей домашних питомцев. Содержит витамины и минералы для здоровых зубов и шерсти.",
    en: "Dry food for adult indoor cats. Enriched with vitamins and minerals for healthy teeth and coat."
  },
  c7: {
    uk: "Корм для котів, що живуть у приміщенні. Сприяє м’якому травленню та зменшує утворення грудок шерсті.",
    ru: "Корм для кошек, живущих в помещении. Способствует мягкому пищеварению и снижает образование комков шерсти.",
    en: "Food for indoor cats. Supports gentle digestion and helps reduce hairball formation."
  },
  c8: {
    uk: "М’ясний корм супер-преміум класу для котів. Підходить для вибагливих тварин, сприяє блиску шерсті та відмінному самопочуттю.",
    ru: "Мясной корм супер-премиум класса для кошек. Подходит для привередливых животных, улучшает состояние шерсти и общее самочувствие.",
    en: "Meat-rich super-premium food for cats. Suitable for fussy eaters, supports a glossy coat and excellent well-being."
  },

  // BIRDS
  b1: {
    uk: "Збалансований корм для канарок із сумішшю зерен і вітамінами для щоденного годування.",
    ru: "Сбалансированный корм для канареек с зерновой смесью и витаминами для ежедневного кормления.",
    en: "Balanced seed mix for canaries with added vitamins for everyday feeding."
  },
  b2: {
    uk: "Зернова суміш для папуг. Підтримує енергійність птахів та гарний стан оперення.",
    ru: "Зерновая смесь для попугаев. Поддерживает активность птиц и хорошее состояние оперения.",
    en: "Seed mixture for parrots. Supports energetic birds and healthy plumage."
  },
  b3: {
    uk: "Преміальна зернова суміш для папуг із додатковими вітамінами та мінералами.",
    ru: "Премиальная зерновая смесь для попугаев с дополнительными витаминами и минералами.",
    en: "Premium seed mixture for parrots enriched with extra vitamins and minerals."
  },
  b4: {
    uk: "Корм для хвилястих папуг із підібраною сумішшю зерна для щоденного раціону.",
    ru: "Корм для волнистых попугаев с подобранной смесью зерна для ежедневного рациона.",
    en: "Daily food mix for budgerigars with a carefully selected grain blend."
  },
  b5: {
    uk: "Корм для хвилястих папуг з дрібною зерновою сумішшю, яку легко поїдати.",
    ru: "Корм для волнистых попугаев с мелкой зерновой смесью, которую легко поедать.",
    en: "Fine seed mix for budgerigars that is easy to eat."
  },
  b6: {
    uk: "Меню для великих папуг з різними видами зерна та корисними добавками.",
    ru: "Меню для крупных попугаев с разными видами зерна и полезными добавками.",
    en: "Menu mixture for large parrots with various seeds and beneficial ingredients."
  },
  b7: {
    uk: "Корм для канарок із дрібною сумішшю насіння та вітамінів.",
    ru: "Корм для канареек с мелкой смесью семян и витаминов.",
    en: "Seed mix for canaries with small seeds and added vitamins."
  },
  b8: {
    uk: "Преміум-суміш для хвилястих папуг, підходить для щоденного годування.",
    ru: "Премиум-смесь для волнистых попугаев, подходит для ежедневного кормления.",
    en: "Premium mix for budgerigars suitable for daily feeding."
  },

  // RODENTS
  r1: {
    uk: "Сухий корм для дорослих кроликів. Збалансований склад підтримує зуби, шерсть та здорове травлення.",
    ru: "Сухой корм для взрослых кроликов. Сбалансированный состав поддерживает зубы, шерсть и здоровое пищеварение.",
    en: "Dry food for adult rabbits. Balanced formula supports teeth, coat and healthy digestion."
  },
  r2: {
    uk: "Кормова суміш для хом’ячків з різними видами зерна та хрусткими шматочками.",
    ru: "Кормовая смесь для хомяков с разными видами зерна и хрустящими кусочками.",
    en: "Food mix for hamsters with various grains and crunchy pieces."
  },
  r3: {
    uk: "Меню для хом’яків з зерном, овочами та вітамінами для щоденного годування.",
    ru: "Меню для хомяков с зерном, овощами и витаминами для ежедневного кормления.",
    en: "Daily menu for hamsters with grains, vegetables and vitamins."
  },
  r4: {
    uk: "Корм для морських свинок із підвищеним вмістом клітковини та вітаміну C.",
    ru: "Корм для морских свинок с повышенным содержанием клетчатки и витамина C.",
    en: "Food for guinea pigs with extra fibre and vitamin C."
  },
  r5: {
    uk: "Хрустка мюслі-суміш для дрібних гризунів. Підходить хом’якам і щурам.",
    ru: "Хрустящая мюсли-смесь для мелких грызунов. Подходит хомякам и крысам.",
    en: "Crunchy muesli mix for small rodents such as hamsters and rats."
  },
  r6: {
    uk: "Корм для морських свинок із травами та овочами. Підтримує здоров’я травлення.",
    ru: "Корм для морских свинок с травами и овощами. Поддерживает здоровье пищеварения.",
    en: "Food for guinea pigs with herbs and vegetables to support digestion."
  },
  r7: {
    uk: "Сухий корм для кроликів супер-преміум класу з високим вмістом клітковини.",
    ru: "Сухой корм для кроликов супер-премиум класса с высоким содержанием клетчатки.",
    en: "Super-premium dry food for rabbits with a high fibre content."
  },
  r8: {
    uk: "Повнораціонний корм для хом’яків. Містить зерно, овочі та хрусткі гранули.",
    ru: "Полнорационный корм для хомяков. Содержит зерно, овощи и хрустящие гранулы.",
    en: "Complete food for hamsters with grains, vegetables and crunchy pellets."
  }
};

let currentLang = localStorage.getItem(LS_LANG) || "uk";
window.currentLang = currentLang; // щоб labelCat() з data.js знав поточну мову

function getProductDescription(prod) {
  const lang = currentLang || "uk";
  const entry = PRODUCT_DESCRIPTIONS[prod.id];
  if (entry) {
    return entry[lang] || entry.uk;
  }
  const dict = I18N[lang] || I18N.uk;
  return dict.product_desc_fallback || I18N.uk.product_desc_fallback;
}

function applyI18n() {
  const dict = I18N[currentLang] || I18N.uk;
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });

  // плейсхолдери полів коментаря до товару
  const pmCN = $("#pmCommentName");
  if (pmCN && dict.comments_name_placeholder) {
    pmCN.placeholder = dict.comments_name_placeholder;
  }
  const pmCT = $("#pmCommentText");
  if (pmCT && dict.comments_text_placeholder) {
    pmCT.placeholder = dict.comments_text_placeholder;
  }
}

/* ---------- reviews (як раніше) ---------- */

const DEFAULT_REVIEWS = [
  {
    id: "r1",
    rating: 5,
    name_uk: "Олена",
    name_ru: "Елена",
    name_en: "Olena",
    pet_uk: "Собака, 3 роки • Royal Canin",
    pet_ru: "Собака, 3 года • Royal Canin",
    pet_en: "Dog, 3 y.o. • Royal Canin",
    city_uk: "Київ • постійний клієнт",
    city_ru: "Киев • постоянный клиент",
    city_en: "Kyiv • regular customer",
    text_uk: "Замовляю корм для собаки вже пів року — все чітко, доставляють за день, зручно слідкувати за ціною та акціями. Пес задоволений 🙂",
    text_ru: "Заказываю корм для собаки уже полгода — всё чётко, доставляют за день, удобно следить за ценой и акциями. Пёс доволен 🙂",
    text_en: "I’ve been ordering dog food here for half a year — delivery takes one day and it’s easy to track prices and promos. My dog is happy 🙂"
  },
  {
    id: "r2",
    rating: 4,
    name_uk: "Ігор",
    name_ru: "Игорь",
    name_en: "Ihor",
    pet_uk: "Кіт, 5 років • Josera",
    pet_ru: "Кот, 5 лет • Josera",
    pet_en: "Cat, 5 y.o. • Josera",
    city_uk: "Львів • зроблено 4 замовлення",
    city_ru: "Львов • сделано 4 заказа",
    city_en: "Lviv • 4 orders made",
    text_uk: "Дуже подобається, що можна порівняти корми різних брендів і додати в обране. Кошик зберігається навіть після перезавантаження сторінки.",
    text_ru: "Очень нравится, что можно сравнить корма разных брендов и добавить в избранное. Корзина сохраняется даже после перезагрузки страницы.",
    text_en: "I like that you can compare different brands and add items to favorites. The cart stays even after reloading the page."
  },
  {
    id: "r3",
    rating: 5,
    name_uk: "Марина",
    name_ru: "Марина",
    name_en: "Maryna",
    pet_uk: "Папуга та хом’як • Vitakraft",
    pet_ru: "Попугай и хомяк • Vitakraft",
    pet_en: "Parrot & hamster • Vitakraft",
    city_uk: "Одеса • нова клієнтка",
    city_ru: "Одесса • новая клиентка",
    city_en: "Odesa • new customer",
    text_uk: "Зручно, що в одному місці є корми і для птахів, і для гризунів. Інтерфейс простий, фільтри працюють як треба, замовлення оформлюється за пару кліків.",
    text_ru: "Удобно, что в одном месте есть корма и для птиц, и для грызунов. Интерфейс простой, фильтры работают как надо, заказ оформляется за пару кликов.",
    text_en: "I like that I can buy food for both birds and rodents in one place. Filters work great and the order takes just a few clicks."
  }
];

function getDefaultsForLang() {
  const lang = currentLang;
  return DEFAULT_REVIEWS.map(r => ({
    name: r["name_" + lang] || r.name_uk,
    pet: r["pet_" + lang] || r.pet_uk,
    city: r["city_" + lang] || r.city_uk,
    rating: r.rating,
    text: r["text_" + lang] || r.text_uk,
    isDefault: true
  }));
}

/* ---------- state ---------- */

let state = {
  page: 1,
  cat: "all",
  brand: "all",
  search: "",
  sort: "popular"
};

let cart = [];
let fav  = [];
let cmp  = [];
let currentUser = null;
let userReviews = [];
let reviewsPage = 1;

// коментарі до конкретних товарів
let productComments = {}; // { productId: [ { name, text, createdAt } ] }
let currentProductId = null;

/* ---------- LS helpers ---------- */

function loadLS() {
  cart = JSON.parse(localStorage.getItem(LS_CART) || "[]");
  fav  = JSON.parse(localStorage.getItem(LS_FAV)  || "[]" );
  cmp  = JSON.parse(localStorage.getItem(LS_CMP)  || "[]");
  currentUser = JSON.parse(localStorage.getItem(LS_USER) || "null");

  // якщо користувач є, але ще без id – додаємо йому id
  if (currentUser && !currentUser.id) {
    currentUser.id = generateUserId();
    localStorage.setItem(LS_USER, JSON.stringify(currentUser));
  }

  const savedReviews = localStorage.getItem(LS_REVIEWS);
  if (savedReviews) {
    try {
      userReviews = JSON.parse(savedReviews);
    } catch {
      userReviews = [];
    }
  } else {
    userReviews = [];
  }

  const savedPComments = localStorage.getItem(LS_PCOMMENTS);
  if (savedPComments) {
    try {
      productComments = JSON.parse(savedPComments) || {};
    } catch {
      productComments = {};
    }
  } else {
    productComments = {};
  }
}

function saveLS() {
  localStorage.setItem(LS_CART, JSON.stringify(cart));
  localStorage.setItem(LS_FAV,  JSON.stringify(fav));
  localStorage.setItem(LS_CMP,  JSON.stringify(cmp));
  if (currentUser) {
    localStorage.setItem(LS_USER, JSON.stringify(currentUser));
  }
  localStorage.setItem(LS_REVIEWS, JSON.stringify(userReviews));
  localStorage.setItem(LS_PCOMMENTS, JSON.stringify(productComments));
}
function generateUserId() {
  // простий унікальний id для демо
  return "u_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

/* ---------- каталог ---------- */

function getFilteredProducts() {
  let items = [...PRODUCTS];

  if (state.cat !== "all")   items = items.filter(p => p.cat === state.cat);
  if (state.brand !== "all") items = items.filter(p => p.brand === state.brand);

  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    items = items.filter(p => p.title.toLowerCase().includes(q));
  }

  if (state.sort === "price_asc")       items.sort((a,b) => a.price - b.price);
  else if (state.sort === "price_desc") items.sort((a,b) => b.price - a.price);

  return items;
}

function renderBrandFilter() {
  const brands = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
  const select = $("#brandFilter");
  if (!select) return;
  select.innerHTML =
    `<option value="all" data-i18n="filter_brand_all">Усі бренди</option>` +
    brands.map(b => `<option value="${b}">${b}</option>`).join("");
}

function renderPager(totalPages) {
  const pager = $("#pager");
  if (!pager) return;
  if (totalPages <= 1) { pager.innerHTML = ""; return; }
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<button type="button" data-page="${i}" class="${i===state.page ? "active" : ""}">${i}</button>`;
  }
  pager.innerHTML = html;
}

// псевдо-склад
function getStockInfo(p) {
  const code = (p.id.charCodeAt(0) + p.id.charCodeAt(p.id.length - 1)) % 4;
  if (code === 0) return { label: "В наявності", state: "ok" };
  if (code === 1) return { label: "Залишилось мало", state: "low" };
  if (code === 2) return { label: "Передзамовлення", state: "pre" };
  return { label: "Тимчасово немає", state: "out" };
}

// псевдо-рейтинг
function getRatingInfo(p) {
  const base = (p.price % 40) / 100;
  const rating = 4.2 + base;
  const count = 18 + (p.price % 60);
  return {
    rating: rating.toFixed(1),
    count
  };
}

// ціна за кг, якщо у вазі є "кг"
function getPricePerKg(p) {
  const m = /([\d.,]+)\s*кг/i.exec(p.weight || "");
  if (!m) return null;
  const kg = parseFloat(m[1].replace(",", "."));
  if (!kg || !isFinite(kg)) return null;
  return Math.round(p.price / kg);
}

function labelCat(cat) {
  const lang = window.currentLang || "uk";
  const dict = {
    dogs:    {uk:"Для собак",   ru:"Для собак",   en:"For dogs"},
    cats:    {uk:"Для котів",   ru:"Для котов",   en:"For cats"},
    birds:   {uk:"Для птахів",  ru:"Для птиц",    en:"For birds"},
    rodents: {uk:"Для гризунів",ru:"Для грызунов",en:"For rodents"}
  };
  return (dict[cat] && dict[cat][lang]) || cat;
}

function renderGrid() {
  const grid = $("#grid");
  if (!grid) return;
  const items = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;

  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  grid.innerHTML = pageItems.map(p => {
    const inFav = fav.includes(p.id);
    const inCmp = cmp.includes(p.id);
    const emoji = (function(cat) {
      switch (cat) {
        case "dogs": return "🐶";
        case "cats": return "🐱";
        case "birds": return "🦜";
        case "rodents": return "🐹";
        default: return "🐾";
      }
    })(p.cat);
    const thumbHtml = p.img
      ? `<img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">`
      : emoji;

    return `
      <article class="card" data-id="${p.id}">
        <div class="card-thumb">${thumbHtml}</div>
        <div class="card-title">${escapeHtml(p.title)}</div>
        <div class="card-meta">
          <span>${escapeHtml(p.weight)}</span>
          <span>${escapeHtml(p.brand)}</span>
        </div>
        <div class="card-meta">
          <span>${escapeHtml(labelCat(p.cat))}</span>
          <span class="card-price">${moneyUAH(p.price)}</span>
        </div>
        <div class="card-actions">
          <div class="card-icon-row">
            <button class="card-icon js-fav ${inFav ? "active" : ""}" title="Обране">❤️</button>
            <button class="card-icon js-cmp ${inCmp ? "active" : ""}" title="Порівняти">⚖️</button>
          </div>
          <button class="btn primary card-btn js-add" type="button">У кошик</button>
        </div>
      </article>
    `;
  }).join("");

  renderPager(totalPages);
  updateBadges();
}

/* ---------- reviews ---------- */

function ratingToStars(rating) {
  const r = Math.max(1, Math.min(5, Number(rating) || 5));
  const full = "★★★★★".slice(0, r);
  const empty = "☆☆☆☆☆".slice(0, 5 - r);
  return full + empty;
}

function getAllReviewsForCurrentLang() {
  const defaults = getDefaultsForLang();
  return [...defaults, ...userReviews];
}

function makeAvatarLetter(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "🙂";
  return trimmed[0].toUpperCase();
}

function renderReviews() {
  const grid = $("#reviewsGrid");
  if (!grid) return;

  const all = getAllReviewsForCurrentLang();
  const dict = I18N[currentLang] || I18N.uk;

  if (!all.length) {
    const msg = dict.reviews_empty_text || "Ще немає відгуків. Будьте першим!";
    grid.innerHTML =
      `<p style="font-size:13px;color:#9ca3af">${escapeHtml(msg)}</p>`;
    const ind = $("#reviewsPageIndicator");
    if (ind) ind.textContent = "1 / 1";
    return;
  }

  const totalPages = Math.max(1, Math.ceil(all.length / REVIEWS_PER_PAGE));
  if (reviewsPage > totalPages) reviewsPage = totalPages;
  const start = (reviewsPage - 1) * REVIEWS_PER_PAGE;
  const pageItems = all.slice(start, start + REVIEWS_PER_PAGE);

  grid.innerHTML = pageItems.map(r => `
    <article class="review-card">
      <div class="review-header">
        <div class="review-header-left">
          <div class="review-avatar">${escapeHtml(makeAvatarLetter(r.name))}</div>
          <div>
            <div class="review-name">${escapeHtml(r.name || "Клієнт")}</div>
            ${r.pet ? `<div class="review-pet">${escapeHtml(r.pet)}</div>` : ""}
          </div>
        </div>
        <div class="review-rating" aria-label="${r.rating || 5} з 5">
          ${ratingToStars(r.rating)}
        </div>
      </div>
      <p class="review-text">
        ${escapeHtml(r.text || "")}
      </p>
      ${r.city ? `<div class="review-meta">${escapeHtml(r.city)}</div>` : ""}
    </article>
  `).join("");

  requestAnimationFrame(() => {
    $$(".review-card", grid).forEach(card => {
      card.classList.add("is-visible");
    });
  });

  const ind = $("#reviewsPageIndicator");
  if (ind) ind.textContent = `${reviewsPage} / ${totalPages}`;
  const prevBtn = $("#reviewsPrev");
  const nextBtn = $("#reviewsNext");
  if (prevBtn) prevBtn.disabled = reviewsPage <= 1;
  if (nextBtn) nextBtn.disabled = reviewsPage >= totalPages;
}


/* ---------- fav / cmp / cart ---------- */

function getFavProducts() {
  return PRODUCTS.filter(p => fav.includes(p.id));
}

function openFav() {
  closeCart();
  closeCmp();
  const drawer = $("#favDrawer");
  if (!drawer) return;
  drawer.classList.add("is-open");
  renderFav();
}

function closeFav() {
  const drawer = $("#favDrawer");
  if (!drawer) return;
  drawer.classList.remove("is-open");
}

function renderFav() {
  const list = $("#favList");
  if (!list) return;
  const items = getFavProducts();

  if (!items.length) {
    list.innerHTML = `<p style="font-size:13px;color:#9ca3af">Список обраного порожній.</p>`;
    return;
  }

  list.innerHTML = items.map(p => {
    const emoji = (function(cat) {
      switch (cat) {
        case "dogs": return "🐶";
        case "cats": return "🐱";
        case "birds": return "🦜";
        case "rodents": return "🐹";
        default: return "🐾";
      }
    })(p.cat);
    const thumbHtml = p.img
      ? `<img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">`
      : emoji;

    return `
      <div class="fav-item" data-id="${p.id}">
        <div class="fav-thumb">${thumbHtml}</div>
        <div class="fav-info">
          <div class="fav-title">${escapeHtml(p.title)}</div>
          <div class="fav-meta">
            <span>${escapeHtml(p.brand)}</span>
            <span>${moneyUAH(p.price)}</span>
          </div>
        </div>
        <div class="fav-actions">
          <button type="button" class="btn-sm js-fav-add">У кошик</button>
          <button type="button" class="btn-icon js-fav-remove" title="Прибрати">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

function getCmpProducts() {
  return PRODUCTS.filter(p => cmp.includes(p.id));
}

function openCmp() {
  closeCart();
  closeFav();
  const drawer = $("#cmpDrawer");
  if (!drawer) return;
  drawer.classList.add("is-open");
  renderCmp();
}

function closeCmp() {
  const drawer = $("#cmpDrawer");
  if (!drawer) return;
  drawer.classList.remove("is-open");
}

function renderCmp() {
  const list = $("#cmpList");
  if (!list) return;
  const items = getCmpProducts();

  if (!items.length) {
    list.innerHTML = `<p style="font-size:13px;color:#9ca3af">Список порівняння порожній.</p>`;
    return;
  }

  list.innerHTML = items.map(p => {
    const emoji = (function(cat) {
      switch (cat) {
        case "dogs": return "🐶";
        case "cats": return "🐱";
        case "birds": return "🦜";
        case "rodents": return "🐹";
        default: return "🐾";
      }
    })(p.cat);
    const thumbHtml = p.img
      ? `<img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">`
      : emoji;

    return `
      <div class="fav-item cmp-item" data-id="${p.id}">
        <div class="fav-thumb">${thumbHtml}</div>
        <div class="fav-info">
          <div class="fav-title">${escapeHtml(p.title)}</div>
          <div class="fav-meta">
            <span>${escapeHtml(p.brand)}</span>
            <span>${moneyUAH(p.price)}</span>
          </div>
        </div>
        <div class="fav-actions">
          <button type="button" class="btn-sm js-cmp-add">У кошик</button>
          <button type="button" class="btn-icon js-cmp-remove" title="Прибрати">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

function updateBadges() {
  const cartCount = cart.reduce((s,i)=>s + i.qty, 0);
  const cartEl = $("#cartCount");
  const favEl  = $("#favCount");
  const cmpEl  = $("#cmpCount");
  if (cartEl) cartEl.textContent = cartCount;
  if (favEl)  favEl.textContent  = fav.length;
  if (cmpEl)  cmpEl.textContent  = cmp.length;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({id:p.id, title:p.title, price:p.price, qty:1});
  saveLS();
  updateBadges();
  renderCart();
  openCart();
}

function renderCart() {
  const list = $("#cartList");
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = `<p style="font-size:13px;color:#9ca3af">Кошик порожній.</p>`;
    const tot = $("#cartTotal");
    if (tot) tot.textContent = moneyUAH(0);
    return;
  }
  let total = 0;
  list.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item" data-id="${item.id}">
        <div>
          <div class="cart-item-title">${escapeHtml(item.title)}</div>
          <div class="cart-item-meta">${moneyUAH(item.price)}</div>
        </div>
        <div class="cart-item-qty">
          <button type="button" class="js-dec">−</button>
          <span>${item.qty}</span>
          <button type="button" class="js-inc">+</button>
        </div>
      </div>
    `;
  }).join("");
  const tot = $("#cartTotal");
  if (tot) tot.textContent = moneyUAH(total);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveLS();
  updateBadges();
  renderCart();
}

/* ---------- cart drawer ---------- */

function openCart() {
  closeFav();
  closeCmp();
  const drawer = $("#cartDrawer");
  if (!drawer) return;
  drawer.classList.add("is-open");
}

function closeCart() {
  const drawer = $("#cartDrawer");
  if (!drawer) return;
  drawer.classList.remove("is-open");
}

/* ---------- auth ---------- */

// зберігаємо список користувачів у localStorage
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

// дуже просте "хешування" пароля (для демо)
function hashPassword(pwd) {
  return btoa(pwd); // не безпечно, але для навчального проєкту ок
}

// генерація унікального ID користувача
function generateUserId() {
  const part = () => Math.random().toString(16).slice(2, 6).toUpperCase();
  return `ZOO-${part()}-${part()}`;
}

// поточний користувач береться з змінної currentUser (її ми вже завантажуємо в loadLS())
function setCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem(LS_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(LS_USER);
  }
  updateAccountTitle();
}

function openAuth() {
  const modal = document.getElementById("authModal");
  const form  = document.getElementById("authForm");
  const emailInput = document.getElementById("authEmail");
  const passInput  = document.getElementById("authPassword");
  const hint = document.getElementById("authHint");

  if (!modal || !form || !emailInput || !passInput) return;

  if (currentUser && currentUser.email) {
    emailInput.value = currentUser.email;
  } else {
    emailInput.value = "";
  }

  passInput.value = "";
  if (hint) hint.textContent = "";

  // ГОЛОВНЕ: показуємо модалку тільки класом
  modal.classList.add("is-open");
}

function closeAuth() {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  modal.classList.remove("is-open");
}


  function updateAccountTitle() {
    const btn = document.getElementById("accountBtn");
    if (!btn) return;

    if (currentUser) {
      const title = currentUser.id
        ? `${currentUser.email} • ID: ${currentUser.id}`
        : currentUser.email;
      btn.setAttribute("title", title);
      btn.setAttribute("aria-label", "Особистий кабінет");
    } else {
      btn.setAttribute("title", "Вхід / Кабінет");
      btn.setAttribute("aria-label", "Вхід / Кабінет");
    }
  }



/* ---------- nav scroll ---------- */
const NAV_OFFSET = 80;

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

function initNavScroll() {
  const links = $$("[data-nav]");
  const sections = $$("[data-section]");

  links.forEach(link => {
    const id = link.dataset.nav;
    const target = document.getElementById(id);
    if (!target) return;
    link.addEventListener("click", e => {
      e.preventDefault();
      scrollToSection(id);
    });
  });

  function updateActiveLink() {
    const scrollPos = window.scrollY + NAV_OFFSET + 1;
    let currentId = null;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentId = sec.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle("is-active", link.dataset.nav === currentId);
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
}

/* ---------- product modal + comments ---------- */

function renderProductComments(productId) {
  const listEl  = $("#pmCommentsList");
  const emptyEl = $("#pmCommentsEmptyText");
  if (!listEl || !emptyEl) return;

  const dict = I18N[currentLang] || I18N.uk;
  const items = productComments[productId] || [];

  if (!items.length) {
    emptyEl.style.display = "block";
    emptyEl.textContent = dict.comments_empty || "Ще немає коментарів. Будьте першим!";
    listEl.innerHTML = "";
    return;
  }

  emptyEl.style.display = "none";
  listEl.innerHTML = items.map(c => `
    <div class="pm-comment-item">
      <div class="pm-comment-name">${escapeHtml(c.name || "Анонім")}</div>
      <div class="pm-comment-text">${escapeHtml(c.text || "")}</div>
    </div>
  `).join("");
}

function openProductModalById(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProductId = id;

  const modal       = $("#productModal");
  const imgEl       = $("#pmImg");
  const brandEl     = $("#pmBrand");
  const catEl       = $("#pmCategory");
  const weightEl    = $("#pmWeight");
  const titleEl     = $("#pmTitle");
  const priceEl     = $("#pmPrice");
  const priceKgEl   = $("#pmPricePerKg");
  const stockBadge  = $("#pmStockBadge");
  const ratingBadge = $("#pmRatingBadge");
  const descEl      = $("#pmDesc");

  if (!modal) return;

  if (imgEl) {
    if (p.img) {
      imgEl.src = p.img;
      imgEl.alt = p.title;
    } else {
      imgEl.src = "";
      imgEl.alt = "";
    }
  }

  if (brandEl)  brandEl.textContent  = p.brand;
  if (catEl)    catEl.textContent    = labelCat(p.cat);
  if (weightEl) weightEl.textContent = p.weight;
  if (titleEl)  titleEl.textContent  = p.title;
  if (priceEl)  priceEl.textContent  = moneyUAH(p.price);

  const ppk = getPricePerKg(p);
  if (priceKgEl) {
    priceKgEl.textContent = ppk ? `~ ${ppk} ₴ / кг` : "";
  }

  const stock = getStockInfo(p);
  if (stockBadge) {
    stockBadge.textContent = stock.label;
    stockBadge.dataset.state = stock.state;
  }

  const rating = getRatingInfo(p);
  if (ratingBadge) {
    ratingBadge.textContent = `${rating.rating} ★ (${rating.count}+)`;
  }

  if (descEl) {
    descEl.textContent = getProductDescription(p);
  }

  // переклад кнопки "показати/сховати коментарі"
  const pmCommentsBody = $("#pmCommentsBody");
  const pmCommentsToggleBtn = $("#pmCommentsToggleBtn");
  const dict = I18N[currentLang] || I18N.uk;
  if (pmCommentsBody && pmCommentsToggleBtn) {
    pmCommentsBody.classList.remove("is-hidden");
    pmCommentsToggleBtn.textContent =
      dict.comments_toggle_hide || "Сховати коментарі";
  }

  renderProductComments(id);
  modal.classList.add("is-open");
}

function closeProductModal() {
  const modal = $("#productModal");
  if (!modal) return;
  modal.classList.remove("is-open");
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // товари з data.js
  // якщо loadProductsFromLS є – викликаємо, якщо ні – не ламаємо скрипт
  if (typeof loadProductsFromLS === "function") {
    loadProductsFromLS();
  }
// збережені замовлення (тільки для демо)
function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
}

  loadLS();

  const langSel = $("#langSel");
  if (langSel) {
    langSel.value = currentLang;
    langSel.addEventListener("change", () => {
      currentLang = langSel.value;
      window.currentLang = currentLang;
      localStorage.setItem(LS_LANG, currentLang);
      applyI18n();
      renderGrid();
      renderReviews();

      // якщо модалка відкрита – оновити опис та тексти
      const modal = $("#productModal");
      if (modal && modal.classList.contains("is-open") && currentProductId) {
        openProductModalById(currentProductId);
      }
    });
  }

  applyI18n();
  renderBrandFilter();
  renderGrid();
  renderCart();
  renderReviews();

  // Фільтри
  const catFilter = $("#catFilter");
  if (catFilter) {
    catFilter.addEventListener("change", e => {
      state.cat = e.target.value;
      state.page = 1;
      renderGrid();
    });
  }

  const brandFilter = $("#brandFilter");
  if (brandFilter) {
    brandFilter.addEventListener("change", e => {
      state.brand = e.target.value;
      state.page = 1;
      renderGrid();
    });
  }

  const searchInput = $("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.search = e.target.value;
      state.page = 1;
      renderGrid();
    });
  }

  const sortSelect = $("#sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      state.sort = e.target.value;
      state.page = 1;
      renderGrid();
    });
  }

  const pager = $("#pager");
  if (pager) {
    pager.addEventListener("click", e => {
      const btn = e.target.closest("button[data-page]");
      if (!btn) return;
      state.page = Number(btn.dataset.page) || 1;
      renderGrid();
    });
  }

  // клік по картках
  const grid = $("#grid");
  if (grid) {
    grid.addEventListener("click", e => {
      const card = e.target.closest(".card");
      if (!card) return;
      const id = card.dataset.id;

      if (e.target.closest(".js-add")) {
        addToCart(id);
      } else if (e.target.closest(".js-fav")) {
        if (fav.includes(id)) fav = fav.filter(x => x !== id);
        else fav.push(id);
        saveLS();
        renderGrid();
        renderFav();
        updateBadges();
      } else if (e.target.closest(".js-cmp")) {
        if (cmp.includes(id)) cmp = cmp.filter(x => x !== id);
        else cmp.push(id);
        saveLS();
        renderGrid();
        renderCmp();
        updateBadges();
      } else {
        // клікнули по картці, але не по кнопках — відкриваємо модалку
        openProductModalById(id);
      }
    });
  }

  // Обране
  const favBtn = $("#favBtn");
  if (favBtn) favBtn.addEventListener("click", openFav);

  const favClose = $("#favClose");
  if (favClose) favClose.addEventListener("click", closeFav);

  const favDrawer = $("#favDrawer");
  if (favDrawer) {
    favDrawer.addEventListener("click", e => {
      if (e.target === favDrawer) closeFav();
    });
  }

  const favList = $("#favList");
  if (favList) {
    favList.addEventListener("click", e => {
      const row = e.target.closest(".fav-item");
      if (!row) return;
      const id = row.dataset.id;

      if (e.target.closest(".js-fav-add")) {
        addToCart(id);
      }
      if (e.target.closest(".js-fav-remove")) {
        fav = fav.filter(x => x !== id);
        saveLS();
        renderFav();
        renderGrid();
        updateBadges();
      }
    });
  }

  // Порівняння
  const cmpBtn = $("#cmpBtn");
  if (cmpBtn) cmpBtn.addEventListener("click", openCmp);

  const cmpClose = $("#cmpClose");
  if (cmpClose) cmpClose.addEventListener("click", closeCmp);

  const cmpDrawer = $("#cmpDrawer");
  if (cmpDrawer) {
    cmpDrawer.addEventListener("click", e => {
      if (e.target === cmpDrawer) closeCmp();
    });
  }

  const cmpList = $("#cmpList");
  if (cmpList) {
    cmpList.addEventListener("click", e => {
      const row = e.target.closest(".cmp-item");
      if (!row) return;
      const id = row.dataset.id;

      if (e.target.closest(".js-cmp-add")) {
        addToCart(id);
      }
      if (e.target.closest(".js-cmp-remove")) {
        cmp = cmp.filter(x => x !== id);
        saveLS();
        updateBadges();
        renderCmp();
        renderGrid();
      }
    });
  }

  // Кошик
  const cartBtn = $("#cartBtn");
  if (cartBtn) cartBtn.addEventListener("click", openCart);

  const cartClose = $("#cartClose");
  if (cartClose) cartClose.addEventListener("click", closeCart);

  const cartDrawer = $("#cartDrawer");
  if (cartDrawer) {
    cartDrawer.addEventListener("click", e => {
      if (e.target === cartDrawer) closeCart();
    });
  }

  const cartList = $("#cartList");
  if (cartList) {
    cartList.addEventListener("click", e => {
      const row = e.target.closest(".cart-item");
      if (!row) return;
      const id = row.dataset.id;
      if (e.target.closest(".js-inc")) changeQty(id, +1);
      if (e.target.closest(".js-dec")) changeQty(id, -1);
    });
  }

   const cartCheckoutBtn = $("#cartCheckoutBtn");
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", () => {
      if (!cart.length) return;

      // простий "чекаут" через prompt'и (для демо)
      const name = prompt("Введіть, будь ласка, ваше ім’я:", currentUser?.email || "");
      if (name === null || !name.trim()) return;

      const phone = prompt("Введіть номер телефону для зв’язку:", "");
      if (phone === null || !phone.trim()) return;

      const comment = prompt("Коментар до замовлення (адреса, зручний час тощо):", "") || "";

      // рахуємо суму
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

      // створюємо об’єкт замовлення
      const orderId = "ZF-" + Date.now().toString(36).toUpperCase();

      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        name: name.trim(),
        phone: phone.trim(),
        comment: comment.trim(),
        items: cart.map(i => ({
          id: i.id,
          title: i.title,
          price: i.price,
          qty: i.qty
        })),
        total
      };

      // зберігаємо в localStorage
      const orders = loadOrders();
      orders.push(order);
      saveOrders(orders);

      // очищаємо кошик
      cart = [];
      saveLS();
      renderCart();
      updateBadges();
      closeCart();

      alert(
        `Дякуємо, ${name.trim()}!\n\n` +
        `Ваше замовлення №${orderId} оформлено (демо).\n` +
        `Сума: ${moneyUAH(total)}.\n\n` +
        `У реальному магазині менеджер зв’язався б з вами за телефоном ${phone.trim()}.`
      );
    });
  }
  // ---------- CHECKOUT MODAL ----------

  const checkoutModal   = $("#checkoutModal");
  const checkoutForm    = $("#checkoutForm");
  const checkoutName    = $("#checkoutName");
  const checkoutPhone   = $("#checkoutPhone");
  const checkoutComment = $("#checkoutComment");
  const checkoutSummary = $("#checkoutSummary");
  const checkoutHint    = $("#checkoutHint");
  const checkoutClose   = $("#checkoutClose");
  const checkoutCancel  = $("#checkoutCancel");

  function updateCheckoutSummary() {
    if (!checkoutSummary) return;
    const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const total      = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    checkoutSummary.textContent =
      `Товарів: ${itemsCount} • Сума: ${moneyUAH(total)}`;
  }

  function openCheckoutModal() {
    if (!checkoutModal || !cart.length) return;
    updateCheckoutSummary();

    if (checkoutName) {
      checkoutName.value = currentUser?.email || "";
    }
    if (checkoutPhone)  checkoutPhone.value  = "";
    if (checkoutComment) checkoutComment.value = "";
    if (checkoutHint)   checkoutHint.textContent = "";

    checkoutModal.classList.add("is-open");
  }

  function closeCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.remove("is-open");
  }

      // акаунт / авторизація
  updateAccountTitle(); // оновити підпис на кнопці при завантаженні

  const accountBtn = document.getElementById('accountBtn');
const authModal = document.getElementById('authModal');
const authCloseBtns = document.querySelectorAll('[data-auth-close]');

accountBtn.addEventListener('click', () => {
  authModal.classList.add('is-open');
});

authCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    authModal.classList.remove('is-open');
  });
});

// закриття по кліку по фону
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('is-open');
  }
});


    const authForm = document.getElementById("authForm");
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("authEmail").value.trim();
      const pass  = document.getElementById("authPassword").value.trim();
      if (!email || !pass) return;

      // якщо вже є користувач з таким email – залишаємо його id
      let id = currentUser && currentUser.email === email && currentUser.id
        ? currentUser.id
        : generateUserId();

      currentUser = { id, email };
      saveLS();
      updateAccountTitle();

      const hint = document.getElementById("authHint");
      if (hint) {
        hint.textContent = "Ви увійшли як " + email + " (ID: " + id + ", демо, без сервера).";
        setTimeout(() => {
          hint.textContent = "";
          closeAuth();
        }, 900);
      }
    });
  }


  // форма відгуку (глобальні)

  const reviewForm = $("#reviewForm");
  const reviewFormWrapper = $("#reviewFormWrapper");
  const reviewToggleBtn = $("#reviewToggleBtn");

  if (reviewToggleBtn && reviewFormWrapper) {
    reviewToggleBtn.addEventListener("click", () => {
      reviewFormWrapper.classList.toggle("is-hidden");
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", e => {
      e.preventDefault();
      const name  = $("#reviewName").value.trim() || "Анонім";
      const pet   = $("#reviewPet").value.trim();
      const city  = $("#reviewCity").value.trim();
      const rating = Number($("#reviewRating").value || 5);
      const text  = $("#reviewText").value.trim();
      if (!text) return;

      userReviews.unshift({
        name,
        pet,
        city,
        rating,
        text,
        createdAt: Date.now()
      });

      if (userReviews.length > 20) {
        userReviews = userReviews.slice(0, 20);
      }

      saveLS();
      reviewsPage = 1;
      renderReviews();
      reviewForm.reset();
      const ratingSel = $("#reviewRating");
      if (ratingSel) ratingSel.value = "5";

           const dict = I18N[currentLang] || I18N.uk;
      const hint = $("#reviewHint");
      if (hint) {
        const msg = dict.review_hint_text ||
          "Дякуємо за відгук! Він збережений у вашому браузері.";
        hint.textContent = msg;
        setTimeout(() => { hint.textContent = ""; }, 3000);
      }
    });
  }

  // пагінація відгуків
  const reviewsPrev = $("#reviewsPrev");
  const reviewsNext = $("#reviewsNext");
  if (reviewsPrev) {
    reviewsPrev.addEventListener("click", () => {
      if (reviewsPage > 1) {
        reviewsPage--;
        renderReviews();
      }
    });
  }
  if (reviewsNext) {
    reviewsNext.addEventListener("click", () => {
      reviewsPage++;
      renderReviews();
    });
  }

  // форма контактів (демо) — ВАЖЛИВО: id="contactsForm"
  const contactsForm = $("#contactsForm");
  if (contactsForm) {
    contactsForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Дякуємо! У демо-версії повідомлення нікуди не відправляються 🙂");
      contactsForm.reset();
    });
  }

  /* ---------- support widget ---------- */

  const supportToggle = document.getElementById("supportToggle");
  const supportPanel  = document.getElementById("supportPanel");
  const supportClose  = document.querySelector(".support-close");
  const supportForm   = document.getElementById("supportForm");
  const supportText   = document.getElementById("supportText");
  const supportBody   = document.querySelector(".support-body");

  function openSupport() {
    if (!supportPanel) return;
    supportPanel.classList.add("is-open");
  }

  function closeSupport() {
    if (!supportPanel) return;
    supportPanel.classList.remove("is-open");
  }

  if (supportToggle && supportPanel) {
    supportToggle.addEventListener("click", () => {
      if (supportPanel.classList.contains("is-open")) {
        closeSupport();
      } else {
        openSupport();
      }
    });
  }

  if (supportClose) {
    supportClose.addEventListener("click", closeSupport);
  }

  if (supportForm && supportText && supportBody) {
    supportForm.addEventListener("submit", e => {
      e.preventDefault();
      const text = supportText.value.trim();
      if (!text) return;

      const bubble = document.createElement("div");
      bubble.className = "support-msg";
      bubble.textContent = text;
      supportBody.appendChild(bubble);
      supportBody.scrollTop = supportBody.scrollHeight;

      supportText.value = "";
    });
  }

  // product modal close / backdrop
  const productModal = $("#productModal");
  const pmCloseBtn   = $("#pmCloseBtn");
  if (pmCloseBtn) {
    pmCloseBtn.addEventListener("click", closeProductModal);
  }
  if (productModal) {
    productModal.addEventListener("click", e => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // toggle коментарів (показати/сховати)
  const pmCommentsToggleBtn = $("#pmCommentsToggleBtn");
  const pmCommentsBody = $("#pmCommentsBody");
  if (pmCommentsToggleBtn && pmCommentsBody) {
    pmCommentsToggleBtn.addEventListener("click", () => {
      const dict = I18N[currentLang] || I18N.uk;
      const showTxt = dict.comments_toggle_show || "Показати коментарі";
      const hideTxt = dict.comments_toggle_hide || "Сховати коментарі";

      const isHidden = pmCommentsBody.classList.toggle("is-hidden");
      pmCommentsToggleBtn.textContent = isHidden ? showTxt : hideTxt;
    });
  }

  // форма коментаря у товарі
  const pmCommentForm = $("#pmCommentForm");
  const pmCommentName = $("#pmCommentName");
  const pmCommentText = $("#pmCommentText");
  const pmCommentHint = $("#pmCommentHint");

  if (pmCommentForm && pmCommentText) {
    pmCommentForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!currentProductId) return;

      const name = (pmCommentName && pmCommentName.value.trim()) || "Анонім";
      const text = pmCommentText.value.trim();
      if (!text) return;

      const list = productComments[currentProductId] || [];
      list.unshift({
        name,
        text,
        createdAt: Date.now()
      });
      productComments[currentProductId] = list;
      saveLS();
      renderProductComments(currentProductId);

      pmCommentForm.reset();
      const dict = I18N[currentLang] || I18N.uk;
      const msg =
        dict.comments_saved_hint ||
        "Дякуємо за коментар! Він збережений у вашому браузері.";
      if (pmCommentHint) {
        pmCommentHint.textContent = msg;
        setTimeout(() => { pmCommentHint.textContent = ""; }, 3000);
      }
    });
  }

  updateBadges();
  initNavScroll();

  // кнопки в hero
  const heroShopBtn = $("#heroShopBtn");
  if (heroShopBtn) {
    heroShopBtn.addEventListener("click", () => scrollToSection("store"));
  }

  const heroHelpBtn = $("#heroHelpBtn");
  if (heroHelpBtn) {
    heroHelpBtn.addEventListener("click", () => scrollToSection("contacts"));
  }

  // Escape для модалок
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCart();
      closeFav();
      closeCmp();
      closeAuth();
      closeProductModal();
      if (typeof closeSupport === "function") {
        closeSupport();
      }
    }
  });
});

/* ---------- Соцмережі та оплата у футері ---------- */

const SOCIAL_URLS = {
  instagram: "https://instagram.com/",
  facebook:  "https://facebook.com/",
  telegram:  "https://t.me/",
  viber:     "viber://chat"
};

document.querySelectorAll("[data-social]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.social;
    const url = SOCIAL_URLS[key];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });
});

document.querySelectorAll("[data-payment]").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.payment;
    alert(`У демо-версії це просто позначка.
У реальному магазині тут була б оплата через ${name}. 🙂`);
  });
});
// ===== LOGOUT =====
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // очищаємо поточного користувача
    currentUser = null;
    localStorage.removeItem(LS_USER);

    alert("Ви успішно вийшли з акаунту!");

    // оновлюємо стан кнопки акаунту
    updateAccountTitle();

    const accountBtn = document.getElementById('accountBtn');
    if (accountBtn) {
      accountBtn.classList.remove('active');
    }

    // закриваємо модалку
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.classList.remove('is-open');
    }
  });
}

