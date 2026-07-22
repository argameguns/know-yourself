import type { Metadata } from "next";
import { Alegreya, Fraunces, Inter } from "next/font/google";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/getLocale";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces-latin",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Fraunces has no cyrillic glyphs on Google Fonts. Alegreya is a warm,
// humanist serif with a similar editorial character and full weight/italic
// range, used as the Cyrillic stand-in — CSS font-family fallback then
// picks it per-glyph, so Latin text still renders in Fraunces.
const alegreyaCyrillic = Alegreya({
  variable: "--font-fraunces-cyrillic",
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${alegreyaCyrillic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <LanguageSwitcher currentLocale={locale} />
        {children}
      </body>
    </html>
  );
}
