import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Know Yourself — A Library of Psychological Tests",
    description:
      "15 science-based psychological tests about personality, career, strengths, and relationships. No sign-up, no payment.",
  },
  common: {
    tagline: "Test library · free",
    footer: (year) =>
      `© ${year} Know Yourself. These tests were made for educational purposes and are not a substitute for professional advice.`,
  },
  categories: {
    personality: { name: "Personality", description: "Character traits and temperament" },
    career: { name: "Career", description: "Interests, values, and motivation" },
    strengths: { name: "Strengths", description: "Virtues, resilience, and resources" },
    relationships: { name: "Relationships", description: "Attachment and emotional sensitivity" },
  },
  testNames: {
    "big-five": "Big Five",
    hexaco: "HEXACO",
    "jungian-type": "Jungian Type",
    "four-temperaments": "Four Temperaments",
    "type-ab": "Type A/B Personality",
    "holland-codes": "Holland Codes",
    "work-values": "Work Values",
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
    heroTitleBefore: "Discover what you're ",
    heroTitleEmphasis: "actually",
    heroTitleAfter: " made of",
    heroSubtitle:
      "15 science-based psychological tests about personality, career, strengths, and relationships. No sign-up, no payment — instant results.",
    ctaStart: "Start the survey",
    ctaBrowseAll: "Browse all tests",
    radarCaption: "Example profile · Big Five",
    radarAriaLabel: "Example radar chart of Big Five test results",
    radarLabels: {
      openness: "Open.",
      conscientiousness: "Consc.",
      extraversion: "Extra.",
      agreeableness: "Agree.",
      neuroticism: "Stabil.",
    },
    categoriesHeading: "Categories",
    testsHeading: "Tests",
  },
  testsPage: {
    title: "All tests",
    backHome: "← Home",
    allFilter: "All",
    emptyCategory: "There are no tests in this category yet.",
  },
  onboarding: {
    comingSoon: "Coming soon",
    description:
      "We're building a short intro survey that will match tests to your goals. For now, you can pick a test from the list yourself.",
    browseAll: "Browse all tests",
  },
  quiz: {
    closeAria: "Exit the test",
    exitConfirm: "Your progress won't be saved. Exit?",
    questionOfTemplate: "Question {current} of {total}",
    disagree: "Disagree",
    agree: "Strongly agree",
    calculating: "Calculating your result…",
    genericError: "Something went wrong",
    saveError: "Failed to save the result",
    noQuestions: "This test doesn't have any questions yet.",
  },
  result: {
    notFoundTitle: "Result not found",
    notFoundText: "This link seems to be outdated, or the result hasn't been saved yet.",
    retakeTest: "Take the test again",
    allTests: "← All tests",
    portraitLabel: "Portrait",
    takeAnother: "Take another test",
  },
};

export default en;
