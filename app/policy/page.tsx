import { Container, Card, Kicker, H1, P, Bullets } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function PolicyPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Policy</Kicker>
        <H1>Policy briefs</H1>

        <div className="mt-5 max-w-3xl">
          <P className="text-base sm:text-lg">
            Short briefs tied to the research themes above. Each one is claim → key support → bottom line.
          </P>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {SITE.policy.map((p) => (
            <Card key={p.title} className="p-6 sm:p-7">
              <div className="text-lg font-semibold text-[rgb(var(--fg))]">{p.title}</div>

              <div className="mt-3">
                <P>{p.oneLine}</P>
              </div>

              <div className="mt-5 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                Key points
              </div>
              <Bullets items={p.bullets} />

              <div className="mt-5 rounded-2xl border border-[rgb(var(--line))] bg-neutral-50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                  Bottom line
                </div>
                <div className="mt-2 text-sm text-[rgb(var(--fg))] leading-relaxed">
                  {p.bottomLine}
                </div>
              </div>

              {/* Optional: if you later add PDFs, enable by setting pdfHref in siteData */}
              {p.pdfHref ? (
                <a
                  href={p.pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-[rgb(var(--line))] bg-white hover:bg-neutral-50 text-sm font-semibold"
                >
                  Open PDF
                </a>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
