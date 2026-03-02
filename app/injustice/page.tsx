// app/injustice/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink, Divider } from "@/components/ui";
import PageFade from "@/components/PageFade";

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
    <PageFade>
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Context</Kicker>
        <H1>Injustice and policy context</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            These pages give context for the research and policy briefs. The goal is evidence-first discussion.
            For numbers, see Dashboard. For citations, see Sources.
          </P>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {TOPICS.map((t) => (
            <Card key={t.title}>
              <H2>{t.title}</H2>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Divider />
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/stats" variant="secondary">
                  Dashboard
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
          <div className="text-sm font-semibold text-white">Context note</div>
          <div className="mt-2 text-sm text-white/70">
            This section provides framing for the quantitative work on other pages.
            All statistical claims should be verified via Sources and linked primary documents.
          </div>
        </div>
      </div>
    </Container>
    </PageFade>
  );
}
