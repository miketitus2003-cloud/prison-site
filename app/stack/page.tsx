// app/stack/page.tsx
import { Container, Kicker, H1, P, Surface, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

const SECTIONS = [
  {
    title: "Architecture",
    body:
      "Next.js app router with static pages for speed and clean navigation. Data is centralized in siteData and facts so content stays consistent across pages.",
  },
  {
    title: "Research content design",
    body:
      "Research is presented as a brief that recruiters can scan. Method, results, and limits are separated on purpose to avoid overclaiming.",
  },
  {
    title: "Visual system",
    body:
      "Light theme with soft gradients, glass surfaces, and a grid texture. It is designed to look modern without drowning the content.",
  },
  {
    title: "AI assistant",
    body:
      "The on page assistant answers using the same structured facts used in Stats Lab. It stays evidence first and avoids pretending to know what is not sourced.",
  },
];

export default function StackPage() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.18), transparent 50%), radial-gradient(circle at 30% 90%, rgba(168,85,247,0.18), transparent 55%)",
        }}
      />
      <Container>
        <div className="pt-12 md:pt-16 pb-12 relative">
          <Kicker>Build</Kicker>
          <H1>How this site is built</H1>

          <div className="mt-4 max-w-3xl">
            <P className="text-black/70">
              This page exists for employers. It shows how I structure research, ship clean UI, and build systems that stay verifiable.
            </P>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={SITE.links.analysisRepo} external variant="primary">
              Analysis repo
            </ButtonLink>
            <ButtonLink href="/stats" variant="secondary">
              Stats Lab
            </ButtonLink>
            <ButtonLink href="/research" variant="ghost">
              Research
            </ButtonLink>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {SECTIONS.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
              >
                <div className="text-lg font-semibold text-black/90">
                  {s.title}
                </div>
                <div className="mt-3 text-sm text-black/65 leading-relaxed">
                  {s.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
            <div className="text-sm font-semibold text-black/85">
              Next upgrades
            </div>
            <div className="mt-3 text-sm text-black/65 leading-relaxed">
              Replace the concept chart with real outputs, add a real dataset summary table, and connect the assistant to a structured stats store so it can answer with citations.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
