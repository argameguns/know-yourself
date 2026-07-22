type Category = "personality" | "career" | "strengths" | "relationships";

const categoryLabel: Record<Category, string> = {
  personality: "Особистість",
  career: "Кар'єра",
  strengths: "Сильні сторони",
  relationships: "Стосунки",
};

const categoryColor: Record<Category, "pine" | "ochre"> = {
  personality: "pine",
  career: "ochre",
  strengths: "pine",
  relationships: "ochre",
};

const tests: { slug: string; name: string; category: Category }[] = [
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

const categories: {
  id: Category;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "personality",
    name: "Особистість",
    description: "Риси характеру і темперамент",
    icon: <PersonalityIcon />,
  },
  {
    id: "career",
    name: "Кар'єра",
    description: "Інтереси, цінності та мотивація",
    icon: <CareerIcon />,
  },
  {
    id: "strengths",
    name: "Сильні сторони",
    description: "Чесноти, стійкість і ресурси",
    icon: <StrengthsIcon />,
  },
  {
    id: "relationships",
    name: "Стосунки",
    description: "Прив'язаність і емоційна чутливість",
    icon: <RelationshipsIcon />,
  },
];

const radarExample = [
  { label: "Відкр.", value: 78 },
  { label: "Сумлін.", value: 62 },
  { label: "Екстра.", value: 45 },
  { label: "Доброз.", value: 70 },
  { label: "Стабільн.", value: 55 },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <circle cx="12" cy="12" r="7" fill="none" stroke="#A9803F" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="2.2" fill="#A9803F" />
    </svg>
  );
}

function PersonalityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 7 10v1a3 3 0 0 0 1 5.6V17a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-.4A3 3 0 0 0 17 11v-1a3 3 0 0 0-2-2.8V7a3 3 0 0 0-3-3Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 4v16" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

function StrengthsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3.5 14.2 9l5.8.5-4.4 3.8L17 19l-5-3-5 3 1.4-5.7L4 9.5l5.8-.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RelationshipsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const size = 260;
  const center = size / 2;
  const maxRadius = 90;
  const axisCount = data.length;

  const angleFor = (i: number) => -90 + i * (360 / axisCount);

  const point = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
  };

  const ringLevels = [0.2, 0.4, 0.6, 0.8, 1];

  const ringPoints = (fraction: number) =>
    Array.from({ length: axisCount }, (_, i) => {
      const { x, y } = point(angleFor(i), maxRadius * fraction);
      return `${x},${y}`;
    }).join(" ");

  const dataPolygon = data
    .map((d, i) => {
      const { x, y } = point(angleFor(i), (d.value / 100) * maxRadius);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-56 w-56 overflow-visible desktop:h-64 desktop:w-64"
      role="img"
      aria-label="Приклад радар-діаграми результатів тесту Big Five"
    >
      <circle cx={center} cy={center} r={maxRadius} fill="var(--color-pine-soft)" opacity={0.5} />

      {ringLevels.map((level) => (
        <polygon
          key={level}
          points={ringPoints(level)}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={1}
        />
      ))}

      {data.map((_, i) => {
        const { x, y } = point(angleFor(i), maxRadius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="var(--color-line)"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={dataPolygon}
        fill="var(--color-pine)"
        fillOpacity={0.22}
        stroke="var(--color-pine)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {data.map((d, i) => {
        const { x, y } = point(angleFor(i), (d.value / 100) * maxRadius);
        return <circle key={i} cx={x} cy={y} r={3.5} fill="var(--color-ochre)" />;
      })}

      {data.map((d, i) => {
        const { x, y } = point(angleFor(i), maxRadius * 1.26);
        const dx = x - center;
        const dy = y - center;
        const textAnchor = dx > 15 ? "start" : dx < -15 ? "end" : "middle";
        const dominantBaseline = dy > 15 ? "hanging" : dy < -15 ? "auto" : "middle";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={textAnchor}
            dominantBaseline={dominantBaseline}
            className="fill-ink-soft"
            style={{ fontSize: 10 }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-5 desktop:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-pine">
            <LogoMark />
          </div>
          <span className="font-fraunces text-lg font-medium text-ink">Know Yourself</span>
        </div>
        <p className="text-right text-[11px] text-ink-soft desktop:text-sm">
          Бібліотека тестів · безкоштовно
        </p>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 pb-16 pt-4 desktop:flex-row desktop:items-center desktop:gap-16 desktop:px-8 desktop:pb-24 desktop:pt-10">
        <div className="flex flex-col gap-6 desktop:flex-1">
          <h1 className="font-fraunces text-4xl leading-[1.15] text-ink desktop:text-5xl">
            Дізнайся, з чого ти <span className="italic text-pine">насправді</span> складаєшся
          </h1>
          <p className="max-w-md text-base text-ink-soft desktop:text-lg">
            15 наукових психологічних тестів про особистість, кар&apos;єру, сильні сторони і
            стосунки. Без реєстрації, без оплати — результат одразу.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#tests"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine"
            >
              Почати опитування
            </a>
            <a
              href="#tests"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Переглянути всі тести
            </a>
          </div>
        </div>

        <div className="flex justify-center desktop:flex-1 desktop:justify-end">
          <div className="flex flex-col items-center gap-2">
            <RadarChart data={radarExample} />
            <p className="text-xs text-ink-soft">Приклад профілю · Big Five</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-12 desktop:px-8">
        <h2 className="mb-6 font-fraunces text-2xl text-ink">Категорії</h2>
        <div className="grid grid-cols-2 gap-4 desktop:grid-cols-4">
          {categories.map((cat) => {
            const color = categoryColor[cat.id];
            return (
              <div
                key={cat.id}
                className={`rounded-2xl p-5 ${color === "pine" ? "bg-pine-soft" : "bg-ochre-soft"}`}
              >
                <div
                  className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${
                    color === "pine" ? "bg-pine text-paper" : "bg-ochre text-paper"
                  }`}
                >
                  {cat.icon}
                </div>
                <p className="font-fraunces text-base text-ink">{cat.name}</p>
                <p className="mt-1 text-xs text-ink-soft">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="tests" className="mx-auto w-full max-w-5xl px-5 py-12 desktop:px-8">
        <h2 className="mb-6 font-fraunces text-2xl text-ink">Тести</h2>
        <ol className="divide-y divide-line border-y border-line">
          {tests.map((test, index) => {
            const color = categoryColor[test.category];
            return (
              <li key={test.slug} className="flex items-center gap-4 py-4">
                <span className="w-8 shrink-0 font-fraunces text-sm text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-fraunces text-base text-ink">{test.name}</span>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    color === "pine" ? "bg-pine-soft text-pine" : "bg-ochre-soft text-ochre"
                  }`}
                >
                  {categoryLabel[test.category]}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <footer className="mt-auto border-t border-line px-5 py-6 text-center text-xs text-ink-soft desktop:px-8">
        © {new Date().getFullYear()} Know Yourself. Тести створено в освітніх цілях і не замінюють
        консультацію фахівця.
      </footer>
    </div>
  );
}
