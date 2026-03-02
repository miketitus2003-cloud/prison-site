// app/sources/page.tsx
import { Container, Card, Kicker, H1, H2, P, Divider } from "@/components/ui";
import PageFade from "@/components/PageFade";

// Primary BJS/government data sources (used for Dashboard charts)
const PRIMARY_SOURCES = [
  {
    label: "BJS (2017) — Recidivism of Prisoners Released in 34 States in 2012",
    quality: "Primary government data (BJS)",
    usedFor: "All Dashboard time-series and breakdown charts — cumulative arrest by year, sex, race/ethnicity, prior arrests, age at first arrest, offense type.",
    href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
    claims: [
      "70.8% cumulative arrest within 5 years of release (34 states, any offense).",
      "Year 1 arrest: 36.8%; Year 2: 52.9%; Year 3: 61.5%; Year 4: 67.0%; Year 5: 70.8%.",
      "Male 71.7% vs Female 63.1% at 5 years.",
      "White 69.5%, Black 74.0%, Hispanic 66.9% at 5 years.",
    ],
  },
  {
    label: "BJS (2018) — 9-Year Follow-Up Update (2005 cohort)",
    quality: "Primary government data (BJS)",
    usedFor: "Headline stats showing how longer follow-up changes the picture. 3 / 6 / 9-year comparisons.",
    href: "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
    claims: [
      "68% arrested within 3 years (2005 release cohort).",
      "79% arrested within 6 years.",
      "83% arrested within 9 years — showing the curve is still rising.",
    ],
  },
];

// Education / policy sources
const SECONDARY_SOURCES = [
  {
    label: "BJS — Education and Correctional Populations (2003)",
    quality: "Primary government statistics (BJS)",
    usedFor:
      "Education attainment comparisons (state/federal prisons vs general population), GED and postsecondary participation estimates.",
    href: "https://bjs.ojp.gov/content/pub/pdf/ecp.pdf",
    claims: [
      "~40% of state prison inmates had not completed high school vs ~18% in the general population.",
      "~24% of federal inmates attended some college/postsecondary vs ~48% in the general population.",
    ],
  },
  {
    label: "US Sentencing Commission — Recidivism Overview (2016)",
    quality: "Primary federal research (USSC)",
    usedFor:
      "Rearrest patterns over follow-up period, including rearrest rates by educational attainment.",
    href: "https://www.ussc.gov/sites/default/files/pdf/research-and-publications/research-publications/2016/recidivism_overview.pdf",
    claims: [
      "Rearrest rates differ sharply by education: 60.4% without high school completion vs 19.1% with a college degree (directional association — not causal).",
    ],
  },
  {
    label: "RAND — How Effective Is Correctional Education (2013)",
    quality: "Research synthesis (RAND Corporation)",
    usedFor:
      "Education and recidivism evidence framing. Directional support for correctional education as a policy lever.",
    href: "https://www.rand.org/pubs/research_reports/RR564.html",
    claims: [
      "Participation in correctional education programs was associated with reduced recidivism and improved employment outcomes in the meta-analysis (directional association).",
    ],
  },
  {
    label: "Prison Policy Initiative — Prison opportunities (2022)",
    quality: "Advocacy / analysis (clearly labeled as secondary source)",
    usedFor:
      "State prison programming participation rates drawn from survey findings.",
    href: "https://www.prisonpolicy.org/blog/2022/09/02/prison_opportunities/",
    claims: [
      "~68% any programming; ~43% education; ~33% job training (survey-based).",
      "A share report never being offered education programming or facing eligibility/waitlist barriers.",
    ],
  },
];

export default function SourcesPage() {
  return (
    <PageFade>
      <Container>
        <div className="pt-12 md:pt-16 pb-12">
          <Kicker>Sources</Kicker>
          <H1>Claim → source mapping</H1>

          {/* TL;DR */}
          <div className="mt-5 rounded-3xl bg-white/6 ring-1 ring-white/10 p-5 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">TL;DR</div>
            <div className="text-sm text-white/80 leading-relaxed">
              Every major claim on this site links to a primary government source (BJS or USSC).
              Secondary sources are clearly labeled. All statistics are descriptive — no causal language is used.
            </div>
          </div>

          {/* Primary BJS sources */}
          <div className="mt-10">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Primary data sources — used in Dashboard charts</div>
            <div className="grid lg:grid-cols-2 gap-5">
              {PRIMARY_SOURCES.map((s) => (
                <Card key={s.label}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-white leading-snug">{s.label}</div>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 flex-shrink-0 whitespace-nowrap">
                      Primary
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/50">{s.quality}</div>
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">{s.usedFor}</div>

                  <Divider />

                  <div className="text-xs uppercase tracking-widest text-white/50">Key figures</div>
                  <ul className="mt-3 space-y-2">
                    {s.claims.map((c) => (
                      <li key={c} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4 transition"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source ↗
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* Education / policy sources */}
          <div className="mt-10">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Education & policy sources</div>
            <div className="grid lg:grid-cols-2 gap-5">
              {SECONDARY_SOURCES.map((s) => (
                <Card key={s.label}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-white leading-snug">{s.label}</div>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap ring-1 ${
                      s.quality.includes("Primary")
                        ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25"
                        : s.quality.includes("RAND") || s.quality.includes("Research")
                        ? "bg-sky-500/15 text-sky-400 ring-sky-500/25"
                        : "bg-amber-500/15 text-amber-400 ring-amber-500/25"
                    }`}>
                      {s.quality.includes("Primary") ? "Primary" : s.quality.includes("Advocacy") ? "Secondary" : "Synthesis"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/50">{s.quality}</div>
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">{s.usedFor}</div>

                  <Divider />

                  <div className="text-xs uppercase tracking-widest text-white/50">Claims supported</div>
                  <ul className="mt-3 space-y-2">
                    {s.claims.map((c) => (
                      <li key={c} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4 transition"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source ↗
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* Verification standard */}
          <div className="mt-10 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
            <H2>Verification standard used on this site</H2>
            <div className="mt-4 space-y-3 text-sm text-white/70 leading-relaxed">
              <div>
                <span className="font-semibold text-white">1. Prefer primary sources.</span>{" "}
                Government statistics (BJS, USSC) are used when available. They are labeled "Primary" above.
              </div>
              <div>
                <span className="font-semibold text-white">2. Label secondary sources.</span>{" "}
                Advocacy organizations and commentary are allowed but clearly marked as secondary. Treat them as context, not proof.
              </div>
              <div>
                <span className="font-semibold text-white">3. Association ≠ causation.</span>{" "}
                Every chart and claim on this site uses association language. No causal claims are made unless a causal research design is explicitly cited.
              </div>
              <div>
                <span className="font-semibold text-white">4. Measure definitions vary.</span>{" "}
                "Recidivism" is measured differently across studies (rearrest vs reconviction vs reincarceration). This site labels the measure near each chart and claim.
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-white/35 leading-relaxed">
            Disclaimer: Statistics presented here are drawn from published government reports and research syntheses.
            This site is a portfolio project — not a peer-reviewed publication. Always verify claims against the
            primary sources linked above before citing in academic or policy work.
          </div>
        </div>
      </Container>
    </PageFade>
  );
}
