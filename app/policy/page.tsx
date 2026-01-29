import { Container, Kicker, H1, P, Surface, Bullets } from "@/components/ui";
import { SITE } from "@/components/siteData";

function PdfButton({ href }: { href: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-sm font-semibold transition"
    >
      Read full PDF
    </a>
  );
}

export default function PolicyPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Policy</Kicker>
        <H1>Policy notes</H1>
        <div className="mt-4 max-w-3xl">
          <P>
            Short arguments with the strongest points only. Built for readability, not essay format.
          </P>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {SITE.policy.map((p) => (
            <Surface key={p.title}>
              <div className="text-lg font-semibold">{p.title}</div>
              <div className="mt-3">
                <P>{p.oneLine}</P>
              </div>

              <Bullets items={p.bullets} />

              <div className="mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/75 leading-relaxed">
                <span className="text-white font-semibold">Bottom line: </span>
                {p.bottomLine}
              </div>

              <PdfButton href={p.pdfHref} />
            </Surface>
          ))}
        </div>
      </div>
    </Container>
  );
}
