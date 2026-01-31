// app/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function OverviewPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-14">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Hero */}
          <div className="lg:col-span-7">
            <Kicker>Research brief + policy briefs</Kicker>
            <H1>{SITE.overview.title}</H1>

            <div className="mt-4 max-w-2xl">
              <P className="text-[15px] sm:text-base">
                {SITE.overview.lead}
              </P>
            </div>

            {/* Fixed: the missing label button */}
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/research" variant="primary">
                Read the research
              </ButtonLink>

              <ButtonLink href="/policy" variant="secondary">
                Policy briefs
              </ButtonLink>

              <ButtonLink href="/sources" variant="ghost">
                Sources
              </ButtonLink>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Research brief", "Logistic regression", "Reentry support", "Policy writing"].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full bg-white ring-1 ring-black/10 text-black/70"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Visual strip to make it feel less blank */}
            <div className="mt-10">
              <div className="rounded-3xl p-6 ring-1 ring-black/10 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
                <div className="text-xs uppercase tracking-widest text-black/50">
                  What this site is doing
                </div>
                <div className="mt-3 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Clarity</div>
                    <div className="mt-1 text-sm text-black/70">
                      Research written like a brief, not a thesis dump.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Evidence</div>
                    <div className="mt-1 text-sm text-black/70">
                      Sources are centralized so people can verify fast.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Policy</div>
                    <div className="mt-1 text-sm text-black/70">
                      Short briefs tied to real debates and implications.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: At a glance */}
          <div className="lg:col-span-5">
            <Card className="bg-white ring-1 ring-black/10">
              <div className="flex items-center justify-between gap-3">
                <H2>At a glance</H2>
              </div>

              <div className="mt-5 space-y-4">
                {SITE.overview.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-[11px] uppercase tracking-widest text-black/50">
                      {s.label}
                    </div>
                    <div className="mt-2 text-base font-semibold text-black">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-black/70">
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                  View analysis repo
                </ButtonLink>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
