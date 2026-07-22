export type Category = "personality" | "career" | "strengths" | "relationships";

export const categoryLabel: Record<Category, string> = {
  personality: "Особистість",
  career: "Кар'єра",
  strengths: "Сильні сторони",
  relationships: "Стосунки",
};

export const categoryColor: Record<Category, "pine" | "ochre"> = {
  personality: "pine",
  career: "ochre",
  strengths: "pine",
  relationships: "ochre",
};

export interface TestMeta {
  slug: string;
  name: string;
  category: Category;
}

export const tests: TestMeta[] = [
  { slug: "big-five", name: "Big Five", category: "personality" },
  { slug: "hexaco", name: "HEXACO", category: "personality" },
  { slug: "jungian-type", name: "Юнгіанський тип", category: "personality" },
  { slug: "four-temperaments", name: "Чотири темпераменти", category: "personality" },
  { slug: "type-ab", name: "Type A/B Personality", category: "personality" },
  { slug: "holland-codes", name: "Holland Codes", category: "career" },
  { slug: "work-values", name: "Робочі цінності", category: "career" },
  { slug: "locus-of-control", name: "Locus of Control", category: "career" },
  { slug: "via-strengths", name: "VIA Character Strengths", category: "strengths" },
  { slug: "grit", name: "Grit Scale", category: "strengths" },
  { slug: "self-esteem", name: "Rosenberg Self-Esteem", category: "strengths" },
  { slug: "emotional-intelligence", name: "Emotional Intelligence", category: "strengths" },
  { slug: "attachment-style", name: "Attachment Style", category: "relationships" },
  { slug: "panas", name: "PANAS", category: "relationships" },
  { slug: "hsp", name: "Highly Sensitive Person", category: "relationships" },
];

export interface CategoryMeta {
  id: Category;
  name: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  { id: "personality", name: "Особистість", description: "Риси характеру і темперамент" },
  { id: "career", name: "Кар'єра", description: "Інтереси, цінності та мотивація" },
  { id: "strengths", name: "Сильні сторони", description: "Чесноти, стійкість і ресурси" },
  {
    id: "relationships",
    name: "Стосунки",
    description: "Прив'язаність і емоційна чутливість",
  },
];
