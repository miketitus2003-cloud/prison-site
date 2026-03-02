// app/injustice/page.tsx
import { Container, Kicker, H1, ButtonLink } from "@/components/ui";

const TOPICS = [
  {
    title: "Mass incarceration",
    points: [
      "Focus on measurable outcomes: recidivism, employment, and stability after release",
      "Policy levers differ by state systems and funding structures",
      "Evidence should be tied to primary reporting wherever possible",
    ],
  },
  {
    title: "Solitary confinement",
    points: [
      "Isolation is linked to serious psychological harm, especially for youth",
      "Oversight and strict limits are common best practice recommendations",
      "Step-down programming and clinical care are practical alternatives",
    ],
  },
  {
    title: "Exonerations and wrongful convictions",
    points: [
      "Wrongful conviction risk is why irreversible punishments carry ethical and legal weight",
      "Verification matters: use registries, court records, and primary reporting",
      "Systems improvement needs audits, transparency, and accountability mechanisms",
    ],
  },
  {
    title: "Collateral consequences after prison",
    points: [
      "Employment barriers can create a trap after release",
      "Stable work is tied to stability and reduced risk in many frameworks",
      "Reentry supports often matter more than harsher punishment",
    ],
  },
];

export default function TopicsPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Context</Kicker>
        <H1>Injustice and policy context</H1>

        <div className="mt-4 max-w-3xl">
          <p className="text-[15px] text-black/70 leading-relaxed">
            These pages give context for the research and policy briefs. The goal is evidence-first discussion.
            If you want numbers, go to Dashboard. If you want citations, go to Sources.
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-3xl bg-white ring-1 ring-black/10 p-6">
              <div className="text-lg font-semibold text-black">{t.title}</div>
              <ul className="mt-3 text-sm text-black/70 space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/30 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/stats" variant="secondary">
                  Dashboard
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
          <div className="text-sm font-semibold text-black">Context note</div>
          <div className="mt-2 text-sm text-black/70">
            This section provides framing for the quantitative work on other pages.
            All statistical claims should be verified via Sources and linked primary documents.
          </div>
        </div>
      </div>
    </Container>
  );
}
