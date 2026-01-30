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
            Short briefs connected to my recidivism and reentry research. Each one focuses on the strongest points
            and is written to be scanned quickly.
          </P>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SITE.policy.map((p) => (
            <Surface key={p.title} className="flex h-full flex-col">
              <div className="text-lg font-semibold">{p.title}</div>

              <div className="mt-3">
                <P>{p.oneLine}</P>
              </div>

              <div className="mt-5 text-xs uppercase tracking-widest text-white/60">
                Key points
              </div>
              <Bullets items={p.bullets} />

              {/* Footer */}
              <div className="mt-auto pt-5">
                <div className="h-px bg-white/10" />
                <div className="mt-4">
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Bottom line
                  </div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    {p.bottomLine}
                  </p>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Container>
  );
}
