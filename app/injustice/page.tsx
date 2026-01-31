// app/injustice/page.tsx
import { Container, Surface, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";

const TOPICS = [
  {
    title: "Mass incarceration and reentry barriers",
    desc:
      "Collateral consequences, employment barriers, and unstable housing can keep people stuck in a cycle after release.",
    links: [
      { label: "BJS Recidivism reporting (PDF)", href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf" },
      { label: "BJS 9-year follow-up update", href: "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014" },
    ],
    tone: "from-indigo-50 via-white to-sky-50",
  },
  {
    title: "Solitary confinement and harm",
    desc:
      "Solitary can intensify mental health symptoms and raise self-harm risk, especially for youth.",
    links: [
      { label: "Human Rights Watch", href: "https://www.hrw.org/" },
      { label: "Policy references are listed on Sources", href: "/sources" },
    ],
    tone: "from-rose-50 via-white to-amber-50",
  },
  {
    title: "Wrongful convictions and exonerations",
    desc:
      "Verified registries and innocence organizations show how errors happen and why accuracy matters in high-stakes punishment.",
    links: [
      { label: "National Registry of Exonerations", href: "https://www.law.umich.edu/special/exoneration/Pages/about.aspx" },
      { label: "Innocence Project", href: "https://innocenceproject.org/" },
    ],
    tone: "from-emerald-50 via-white to-sky-50",
  },
  {
    title: "Youth sentencing",
    desc:
      "Youth are more vulnerable to pressure and error. Supreme Court limits reflect developmental differences.",
    links: [
      { label: "Roper v. Simmons (2005)", href: "https://supreme.justia.com/cases/federal/us/543/551/" },
      { label: "Death Penalty Information Center", href: "https://deathpenaltyinfo.org/" },
    ],
    tone: "from-sky-50 via-white to-indigo-50",
  },
];

export default function TopicsPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Topics</Kicker>
        <H1>Issues this project connects to</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This site is not advocating for crime. It focuses on documented injustice, system failure, and the people whose experiences are ignored.
            Research and stats live in Research and Stats Lab. Sources are centralized on Sources.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {TOPICS.map((t) => (
              <Surface key={t.title} className={`bg-gradient-to-br ${t.tone}`}>
                <H2>{t.title}</H2>
                <div className="mt-2">
                  <P>{t.desc}</P>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {t.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return external ? (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl bg-white ring-1 ring-black/10 p-4 hover:bg-neutral-50 transition"
                      >
                        <div className="text-sm font-semibold text-black">{l.label}</div>
                        <div className="mt-1 text-xs text-black/55 break-all">{l.href}</div>
                      </a>
                    ) : (
                      <a
                        key={l.href}
                        href={l.href}
                        className="block rounded-2xl bg-white ring-1 ring-black/10 p-4 hover:bg-neutral-50 transition"
                      >
                        <div className="text-sm font-semibold text-black">{l.label}</div>
                        <div className="mt-1 text-xs text-black/55 break-all">{l.href}</div>
                      </a>
                    );
                  })}
                </div>
              </Surface>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Surface>
              <H2>Fast navigation</H2>
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/stats" variant="primary">
                  Open Stats Lab
                </ButtonLink>
                <ButtonLink href="/research" variant="secondary">
                  Research brief
                </ButtonLink>
                <ButtonLink href="/policy" variant="ghost">
                  Policy briefs
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </Surface>

            <Surface className="bg-neutral-900 text-white">
              <div className="text-xs uppercase tracking-widest text-white/60">Promise</div>
              <div className="mt-2 text-lg font-semibold text-white">
                Evidence first.
              </div>
              <div className="mt-2 text-sm text-white/75 leading-relaxed">
                Claims on this site are tied to citations. If a point needs proof, it goes on the Sources page.
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
