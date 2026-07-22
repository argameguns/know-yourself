import type { Dictionary } from "./types";

const uk: Dictionary = {
  meta: {
    title: "Know Yourself — Бібліотека психологічних тестів",
    description:
      "15 наукових психологічних тестів про особистість, кар'єру, сильні сторони і стосунки. Без реєстрації і без оплати.",
  },
  common: {
    tagline: "Бібліотека тестів · безкоштовно",
    footer: (year) =>
      `© ${year} Know Yourself. Тести створено в освітніх цілях і не замінюють консультацію фахівця.`,
  },
  categories: {
    personality: { name: "Особистість", description: "Риси характеру і темперамент" },
    career: { name: "Кар'єра", description: "Інтереси, цінності та мотивація" },
    strengths: { name: "Сильні сторони", description: "Чесноти, стійкість і ресурси" },
    relationships: { name: "Стосунки", description: "Прив'язаність і емоційна чутливість" },
  },
  testNames: {
    "big-five": "Big Five",
    hexaco: "HEXACO",
    "jungian-type": "Юнгіанський тип",
    "four-temperaments": "Чотири темпераменти",
    "type-ab": "Type A/B Personality",
    "holland-codes": "Holland Codes",
    "work-values": "Робочі цінності",
    "locus-of-control": "Locus of Control",
    "via-strengths": "VIA Character Strengths",
    grit: "Grit Scale",
    "self-esteem": "Rosenberg Self-Esteem",
    "emotional-intelligence": "Emotional Intelligence",
    "attachment-style": "Attachment Style",
    panas: "PANAS",
    hsp: "Highly Sensitive Person",
  },
  home: {
    heroTitleBefore: "Дізнайся, з чого ти ",
    heroTitleEmphasis: "насправді",
    heroTitleAfter: " складаєшся",
    heroSubtitle:
      "15 наукових психологічних тестів про особистість, кар'єру, сильні сторони і стосунки. Без реєстрації, без оплати — результат одразу.",
    ctaStart: "Почати опитування",
    ctaBrowseAll: "Переглянути всі тести",
    radarCaption: "Приклад профілю · Big Five",
    radarAriaLabel: "Приклад радар-діаграми результатів тесту Big Five",
    radarLabels: {
      openness: "Відкр.",
      conscientiousness: "Сумлін.",
      extraversion: "Екстра.",
      agreeableness: "Доброз.",
      neuroticism: "Стабільн.",
    },
    categoriesHeading: "Категорії",
    testsHeading: "Тести",
  },
  testsPage: {
    title: "Усі тести",
    backHome: "← На головну",
    allFilter: "Усі",
    emptyCategory: "У цій категорії поки немає тестів.",
  },
  onboarding: {
    comingSoon: "Скоро",
    description:
      "Ми готуємо коротке вступне опитування, яке підбере тести під твої цілі. А поки що можеш обрати тест зі списку самостійно.",
    browseAll: "Переглянути всі тести",
  },
  quiz: {
    closeAria: "Вийти з тесту",
    exitConfirm: "Прогрес не буде збережено. Вийти?",
    questionOfTemplate: "Питання {current} з {total}",
    disagree: "Не погоджуюсь",
    agree: "Повністю погоджуюсь",
    calculating: "Рахуємо результат…",
    genericError: "Щось пішло не так",
    saveError: "Не вдалося зберегти результат",
    noQuestions: "Для цього тесту ще не додано питань.",
  },
  result: {
    notFoundTitle: "Результат не знайдено",
    notFoundText: "Схоже, це посилання застаріло або результат ще не збережено.",
    retakeTest: "Пройти тест ще раз",
    allTests: "← Усі тести",
    portraitLabel: "Портрет",
    takeAnother: "Пройти інший тест",
  },
};

export default uk;
