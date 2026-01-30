import { Container, Card, Kicker, H1, P, ButtonLink, Badge } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function OverviewPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <Kicker>{SITE.overview.subtitle}</Kicker>
            <H1>{SITE.overview.title}</H1>

            <P className="mt-5 text-base sm:text-lg">
              {SITE.overview.lead}
            </P>

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

            <div className="mt-10 flex flex-wrap gap-2">
              <Badge>Research brief</Badge>
              <Badge>Logistic regression</Badge>
              <Badge>Reentry support</Badge>
              <Badge>Policy writing</Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card>
              <div className="text-sm font-semibold text-[rgb(var(--fg))]">
                At a glance
              </div>

              <div className="mt-5 grid gap-3">
                {SITE.overview.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[rgb(var(--line))] bg-white p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                      {s.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[rgb(var(--fg))]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs text-[rgb(var(--muted))]">
                      {s.note}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[rgb(var(--line))] bg-neutral-50 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                  Materials
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                    View analysis repo
                  </ButtonLink>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
