// app/policy/page.tsx
import { Container, Surface, Kicker, H1, P, Bullets } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function PolicyPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Policy</Kicker>
        <H1>Policy briefs</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            Short, evidence-based briefs connected to youth sentencing and solitary confinement.
            Each section states the claim, the key supporting points, and the takeaway.
          </P>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {SITE.policy.map((p) => (
            <Surface key={p.title} className="flex flex-col">
              <div className="text-lg font-semibold">{p.title}</div>

              <div className="mt-3">
                <P>{p.oneLine}</P>
              </div>

              <div className="mt-6 text-xs uppercase tracking-widest text-white/60">
                Key points
              </div>
              <Bullets items={p.bullets} />

              {/* cleaner bottom line (no “Note”, no extra blocks) */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Takeaway
                </div>
                <div className="mt-2 text-sm text-white/80 leading-relaxed">
                  {p.bottomLine}
                </div>

                {/* Optional: only show if you actually set a pdfHref */}
                {p.pdfHref ? (
                  <a
                    href={p.pdfHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-sm font-semibold transition"
                  >
                    Full brief (PDF)
                  </a>
                ) : null}
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Container>
  );
}
