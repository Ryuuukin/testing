let currentLang = "ru";

const translations = {
  ru: {
    chooseFlowers: "Выберите цветы",
    chooseWrap: "Выберите упаковку",
    order: "Заказать через WhatsApp",
    delivery: "Хотите бесплатную доставку?",
    total: "Итого",
    wrap: "Упаковка",
    greeting: "Здравствуйте! Я хочу заказать букет:\n",
    alertEmpty: "Пожалуйста, выберите хотя бы один цветок.",
    bouquetPreview: "Предпросмотр букета",
    resetBouquet: "Собрать заново"
  },
  kk: {
    chooseFlowers: "Гүлдерді таңдаңыз",
    chooseWrap: "Қаптаманы таңдаңыз",
    order: "WhatsApp арқылы тапсырыс беру",
    delivery: "Тегін жеткізуді қалайсыз ба?",
    total: "Барлығы",
    wrap: "Қаптама",
    greeting: "Сәлеметсіз бе! Мен гүл шоғын тапсырыс бергім келеді:\n",
    alertEmpty: "Кем дегенде бір гүл таңдаңыз.",
    bouquetPreview: "Гүл шоғының алдын ала көрінісі",
    resetBouquet: "Қайта жинау"
  }
};

function setLanguage(lang) {
  currentLang = lang;
  updateUIText();
}
