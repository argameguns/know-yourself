export type Category = "personality" | "career" | "strengths" | "relationships";

export const categoryColor: Record<Category, "pine" | "ochre"> = {
  personality: "pine",
  career: "ochre",
  strengths: "pine",
  relationships: "ochre",
};

export interface TestMeta {
  slug: string;
  category: Category;
}

export const tests: TestMeta[] = [
  { slug: "big-five", category: "personality" },
  { slug: "hexaco", category: "personality" },
  { slug: "jungian-type", category: "personality" },
  { slug: "four-temperaments", category: "personality" },
  { slug: "type-ab", category: "personality" },
  { slug: "holland-codes", category: "career" },
  { slug: "work-values", category: "career" },
  { slug: "locus-of-control", category: "career" },
  { slug: "via-strengths", category: "strengths" },
  { slug: "grit", category: "strengths" },
  { slug: "self-esteem", category: "strengths" },
  { slug: "emotional-intelligence", category: "strengths" },
  { slug: "attachment-style", category: "relationships" },
  { slug: "panas", category: "relationships" },
  { slug: "hsp", category: "relationships" },
];

export const categoryIds: Category[] = ["personality", "career", "strengths", "relationships"];
