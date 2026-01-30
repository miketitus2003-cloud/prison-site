import { Container, Card, Kicker, H1, H2, P, Divider, Bullets, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function SourcesPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Sources</Kicker>
        <H1>Sources & references</H1>

        <div className="mt-5 max-w-3xl">
          <P className="text-base sm:text-lg">
            Primary links and citations used to frame the research and policy briefs. This page is the
            “verification center” for the project.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <H2>Primary / official links</H2>
              <P className="mt-2">
                These are the main public references (government/major research orgs) used for framing.
              </P>

              <div className="mt-5 grid gap-3">
                {SITE.sources.primaryLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-[rgb(var(--line))] bg-white p-4 hover:bg-neutral-50 transition"
                  >
                    <div className="text-sm font-semibold text-[rgb(var(--fg))]">{s.label}</div>
                    <div className="mt-1 text-xs text-[rgb(var(--muted))] break-words">{s.href}</div>
                  </a>
                ))}
              </div>

              <Divider />

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                  Analysis repo
                </ButtonLink>
                <ButtonLink href="/research" variant="ghost">
                  Back to research
                </ButtonLink>
              </div>
            </Card>

            <Card>
              <H2>Policy citations (solitary / youth punishment)</H2>
              <P className="mt-2">
                Citations used in the policy briefs and related writing.
              </P>

              <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted))] leading-relaxed">
                {SITE.sources.articlesAndReads.map((c) => (
                  <div key={c} className="rounded-2xl border border-[rgb(var(--line))] bg-white p-4">
                    {c}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card>
              <H2>Key legal reference</H2>
              <P className="mt-2">
                Core case law cited for youth sentencing standards.
              </P>
              <Bullets items={SITE.sources.legalCases} />
            </Card>

            <Card>
              <H2>How I use sources</H2>
              <P className="mt-2">
                Research framing prioritizes official statistics and meta-analyses. Policy writing uses
                that foundation plus legal standards and documented reporting.
              </P>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
