// app/injustice/page.tsx
import { Container, Kicker, H1, P, Badge, ButtonLink, Callout } from "@/components/ui";

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
      "Step down programming and clinical care are practical alternatives",
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
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Topics</Badge>
          <Badge tone="neutral">Context pages</Badge>
        </div>

        <H1>Injustice and policy context</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            These pages give context for the research and policy briefs. The goal is evidence first discussion, not advocacy for crime.
          </P>
        </div>

        <div className="mt-6">
          <Callout title="How to use this section" tone="neutral">
            If you want numbers, go to Stats Lab. If you want citations, go to Sources. This page is context and framing.
          </Callout>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
              <div className="text-lg font-semibold text-black">{t.title}</div>
              <ul className="mt-3 text-sm text-black/70 space-y-2">
                {t.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/stats" variant="secondary">
                  Stats Lab
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
          <div className="text-sm font-semibold text-black">Next upgrade</div>
          <div className="mt-2 text-sm text-black/70">
            If you want, we can add a separate page per topic with one verified stat card and 2 to 3 sources each.
          </div>
        </div>
      </div>
    </Container>
  );
}
