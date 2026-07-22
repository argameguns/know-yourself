import type { Dictionary } from "./types";

const ru: Dictionary = {
  meta: {
    title: "Know Yourself — Библиотека психологических тестов",
    description:
      "15 научных психологических тестов о личности, карьере, сильных сторонах и отношениях. Без регистрации и без оплаты.",
  },
  common: {
    tagline: "Библиотека тестов · бесплатно",
    footer: (year) =>
      `© ${year} Know Yourself. Тесты созданы в образовательных целях и не заменяют консультацию специалиста.`,
  },
  categories: {
    personality: { name: "Личность", description: "Черты характера и темперамент" },
    career: { name: "Карьера", description: "Интересы, ценности и мотивация" },
    strengths: { name: "Сильные стороны", description: "Добродетели, устойчивость и ресурсы" },
    relationships: { name: "Отношения", description: "Привязанность и эмоциональная чувствительность" },
  },
  testNames: {
    "big-five": "Big Five",
    hexaco: "HEXACO",
    "jungian-type": "Юнгианский тип",
    "four-temperaments": "Четыре темперамента",
    "type-ab": "Type A/B Personality",
    "holland-codes": "Holland Codes",
    "work-values": "Рабочие ценности",
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
    heroTitleBefore: "Узнай, из чего ты ",
    heroTitleEmphasis: "на самом деле",
    heroTitleAfter: " состоишь",
    heroSubtitle:
      "15 научных психологических тестов о личности, карьере, сильных сторонах и отношениях. Без регистрации, без оплаты — результат сразу.",
    ctaStart: "Начать опрос",
    ctaBrowseAll: "Посмотреть все тесты",
    radarCaption: "Пример профиля · Big Five",
    radarAriaLabel: "Пример радар-диаграммы результатов теста Big Five",
    radarLabels: {
      openness: "Откр.",
      conscientiousness: "Добросов.",
      extraversion: "Экстра.",
      agreeableness: "Доброж.",
      neuroticism: "Стабильн.",
    },
    categoriesHeading: "Категории",
    testsHeading: "Тесты",
  },
  testsPage: {
    title: "Все тесты",
    backHome: "← На главную",
    allFilter: "Все",
    emptyCategory: "В этой категории пока нет тестов.",
  },
  onboarding: {
    comingSoon: "Скоро",
    description:
      "Мы готовим короткий вводный опрос, который подберёт тесты под твои цели. А пока можешь выбрать тест из списка самостоятельно.",
    browseAll: "Посмотреть все тесты",
  },
  quiz: {
    closeAria: "Выйти из теста",
    exitConfirm: "Прогресс не будет сохранён. Выйти?",
    questionOfTemplate: "Вопрос {current} из {total}",
    disagree: "Не согласен(-на)",
    agree: "Полностью согласен(-на)",
    calculating: "Считаем результат…",
    genericError: "Что-то пошло не так",
    saveError: "Не удалось сохранить результат",
    noQuestions: "Для этого теста пока не добавлено вопросов.",
  },
  result: {
    notFoundTitle: "Результат не найден",
    notFoundText: "Похоже, эта ссылка устарела или результат ещё не сохранён.",
    retakeTest: "Пройти тест ещё раз",
    allTests: "← Все тесты",
    portraitLabel: "Портрет",
    takeAnother: "Пройти другой тест",
  },
};

export default ru;
