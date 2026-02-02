// app/sources/page.tsx
import { Container, Card, Kicker, H1, H2, P, Divider } from "@/components/ui";

const SOURCES = [
  {
    label: "BJS — Education and Correctional Populations (2003)",
    quality: "Primary government statistics (BJS)",
    usedFor:
      "Education attainment comparisons (state/federal prisons vs general population), GED and postsecondary participation estimates.",
    href: "https://bjs.ojp.gov/content/pub/pdf/ecp.pdf",
    claims: [
      "Education attainment gap: ~40% of state prison inmates had not completed high school vs ~18% in the general population.",
      "Postsecondary exposure: ~24% of federal inmates attended some college/postsecondary vs ~48% in the general population.",
    ],
  },
  {
    label: "US Sentencing Commission — Recidivism Overview (2016)",
    quality: "Primary federal research (USSC)",
    usedFor:
      "Rearrest patterns over follow-up period, including rearrest rates by educational attainment.",
    href: "https://www.ussc.gov/sites/default/files/pdf/research-and-publications/research-publications/2016/recidivism_overview.pdf",
    claims: [
      "Rearrest rates differ by education: highest among people without high school completion and lowest among those with a college degree (reported as 60.4% vs 19.1%).",
    ],
  },
  {
    label: "Prison Policy Initiative — Prison opportunities (2022)",
    quality: "Advocacy / analysis (clearly labeled)",
    usedFor:
      "State prison programming participation rates (education, job training, other classes) drawn from survey findings.",
    href: "https://www.prisonpolicy.org/blog/2022/09/02/prison_opportunities/",
    claims: [
      "Programming participation in state prison: ~68% any programming; ~43% education; ~33% job training (survey-based reporting).",
      "Access barriers: a share report never being offered education programming or facing eligibility/waitlist constraints (survey-based reporting).",
    ],
  },
];

export default function SourcesPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Sources</Kicker>
        <H1>Claim → source mapping</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This page is the credibility engine. Every major claim on the site has a link to a primary source
            (preferred) or a clearly labeled secondary source. Measures are described as descriptive summaries unless
            explicitly stated otherwise.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {SOURCES.map((s) => (
            <Card key={s.label}>
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="mt-1 text-xs text-white/55">{s.quality}</div>
              <div className="mt-3 text-sm text-white/70">{s.usedFor}</div>

              <Divider />

              <div className="text-xs uppercase tracking-widest text-white/55">Claims supported</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
                {s.claims.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <a
                className="mt-5 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:opacity-90"
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                Open source
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
          <H2>Verification standard used on this site</H2>
          <div className="mt-3 space-y-2 text-sm text-white/70 leading-relaxed">
            <div>
              <span className="font-semibold text-white">1) Prefer primary sources.</span> Government statistics (BJS, USSC) are
              used when available.
            </div>
            <div>
              <span className="font-semibold text-white">2) Label secondary sources.</span> Advocacy and commentary are allowed,
              but clearly marked.
            </div>
            <div>
              <span className="font-semibold text-white">3) Association ≠ causation.</span> Charts and text avoid causal claims
              unless supported by a causal design.
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/45">
          Note: Some sources may define “recidivism” differently (rearrest vs reconviction vs reincarceration). This platform
          labels measures near each chart and claim.
        </div>
      </div>
    </Container>
  );
}
