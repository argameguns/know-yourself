const ANON_ID_KEY = "know-yourself-anon-id";

export function getAnonId(): string {
  if (typeof window === "undefined") {
    throw new Error("getAnonId can only be called in the browser");
  }

  const existing = localStorage.getItem(ANON_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem(ANON_ID_KEY, id);
  return id;
}
