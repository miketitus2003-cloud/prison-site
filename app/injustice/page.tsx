// app/injustice/page.tsx
import { Container, Kicker, H1, P, Surface, ButtonLink } from "@/components/ui";
import { FACTS } from "@/data/facts";

const TOPICS = [
  {
    title: "Mass incarceration",
    body:
      "This section focuses on incentives, outcomes, and the long tail impact of criminal records on work, housing, and family stability.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 55%)",
  },
  {
    title: "Solitary confinement",
    body:
      "Long isolation can damage mental health and make reentry harder. Youth isolation is especially high risk.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35), transparent 55%)",
  },
  {
    title: "Wrongful convictions",
    body:
      "The goal is verification and accountability. When the system is wrong, the cost is measured in years and lives.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.35), transparent 55%)",
  },
  {
    title: "Youth sentencing",
    body:
      "Youth are more vulnerable to pressure and have higher rehabilitation potential. Punishments that cannot be undone raise the stakes.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.30), transparent 55%)",
  },
  {
    title: "Racial disparities and profiling",
    body:
      "This is about measurable disparities and documented patterns, not slogans. Evidence matters and so does lived impact.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(239,68,68,0.28), transparent 55%)",
  },
  {
    title: "Reentry barriers",
    body:
      "Employment, housing, treatment access, and supervision conditions shape outcomes after release.",
    accent:
      "radial-gradient(circle at 20% 20%, rgba(14,165,233,0.30), transparent 55%)",
  },
];

export default function InjusticePage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      <Container>
        <div className="pt-12 md:pt-16 pb-12">
          <Kicker>Topics</Kicker>
          <H1>Where injustice shows up</H1>

          <div className="mt-4 max-w-3xl">
            <P className="text-black/70">
              This site is not making excuses for harm. It is focused on outcomes, evidence, and the places where systems fail people who cannot afford mistakes.
            </P>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/stats" variant="primary">
              Stats Lab
            </ButtonLink>
            <ButtonLink href="/sources" variant="secondary">
              Sources
            </ButtonLink>
            <ButtonLink href="/policy" variant="ghost">
              Policy briefs
            </ButtonLink>
          </div>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TOPICS.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)] relative overflow-hidden"
              >
                <div className="absolute inset-0" style={{ background: t.accent }} />
                <div className="relative">
                  <div className="text-lg font-semibold text-black/90">
                    {t.title}
                  </div>
                  <div className="mt-3 text-sm text-black/65 leading-relaxed">
                    {t.body}
                  </div>

                  <div className="mt-5 text-xs text-black/55">
                    Sources live on the Sources page.
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
            <div className="text-sm font-semibold text-black/85">
              References for this topic hub
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {FACTS.references.primaryLinks.slice(0, 3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1.5 text-xs font-semibold bg-black/5 border border-black/10 text-black/70 hover:bg-black/10 transition"
                >
                  {l.label}
                </a>
              ))}
              {FACTS.references.policyAndJustice.slice(0, 3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1.5 text-xs font-semibold bg-black/5 border border-black/10 text-black/70 hover:bg-black/10 transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
