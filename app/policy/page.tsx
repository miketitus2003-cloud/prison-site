import { Container, Kicker, H1, P, Surface, Bullets } from "@/components/ui";
import { SITE } from "@/components/siteData";
import { FileText, ExternalLink } from "lucide-react";

function PdfButton({ href }: { href?: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-5 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-neutral-950 font-semibold hover:opacity-90 transition"
    >
      <FileText className="h-4 w-4" />
      Read full PDF
      <ExternalLink className="h-4 w-4 opacity-70" />
    </a>
  );
}

export default function PolicyPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <div className="max-w-3xl">
          <Kicker>Policy</Kicker>
          <H1>Policy notes</H1>
          <div className="mt-4">
            <P>
              The strongest points only. No essay walls. Each section is meant to be scanned in under a minute.
            </P>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {SITE.policy.map((p) => (
            <Surface key={p.title}>
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-semibold leading-tight">{p.title}</div>
              </div>

              <div className="mt-3">
                <P>{p.oneLine}</P>
              </div>

              <div className="mt-5">
                <div className="text-xs uppercase tracking-widest text-white/60">Key points</div>
                <Bullets items={p.bullets} />
              </div>

              <div className="mt-5 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/75 leading-relaxed">
                <span className="text-white font-semibold">Bottom line: </span>
                {p.bottomLine}
              </div>

              <PdfButton href={p.pdfHref} />
            </Surface>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="text-sm font-semibold">Note</div>
            <div className="mt-2 text-sm text-white/70 leading-relaxed">
              If you upload PDFs later, put them in <span className="text-white">public/docs</span> and set{" "}
              <span className="text-white">pdfHref</span> in <span className="text-white">SITE.policy</span> to something
              like <span className="text-white">/docs/your-file.pdf</span>.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
