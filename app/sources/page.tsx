import { Container, Kicker, H1, Surface, P } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function SourcesPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Sources</Kicker>
        <H1>Core references</H1>
        <div className="mt-4 max-w-3xl">
          <P>
            Direct links to the main sources used for the research framing. Kept short on purpose.
          </P>
        </div>

        <div className="mt-10">
          <Surface>
            <div className="grid gap-3">
              {SITE.sources.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                >
                  <div className="text-sm font-semibold text-white/90">{s.label}</div>
                  <div className="text-xs text-white/55 mt-1 break-all">{s.href}</div>
                </a>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </Container>
  );
}
