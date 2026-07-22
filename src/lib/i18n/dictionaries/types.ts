import type { Category } from "@/lib/testsCatalog";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  common: {
    tagline: string;
    footer: (year: number) => string;
  };
  categories: Record<Category, { name: string; description: string }>;
  testNames: Record<string, string>;
  home: {
    heroTitleBefore: string;
    heroTitleEmphasis: string;
    heroTitleAfter: string;
    heroSubtitle: string;
    ctaStart: string;
    ctaBrowseAll: string;
    radarCaption: string;
    radarAriaLabel: string;
    radarLabels: {
      openness: string;
      conscientiousness: string;
      extraversion: string;
      agreeableness: string;
      neuroticism: string;
    };
    categoriesHeading: string;
    testsHeading: string;
  };
  testsPage: {
    title: string;
    backHome: string;
    allFilter: string;
    emptyCategory: string;
  };
  onboarding: {
    comingSoon: string;
    description: string;
    browseAll: string;
  };
  quiz: {
    closeAria: string;
    exitConfirm: string;
    questionOfTemplate: string;
    disagree: string;
    agree: string;
    calculating: string;
    genericError: string;
    saveError: string;
    noQuestions: string;
  };
  result: {
    notFoundTitle: string;
    notFoundText: string;
    retakeTest: string;
    allTests: string;
    portraitLabel: string;
    takeAnother: string;
  };
}
