import Link from "next/link";
import { Container, Surface, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function OverviewPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Kicker>{SITE.subtitle}</Kicker>
            <H1>{SITE.title}</H1>
            <div className="mt-4">
              <P>{SITE.intro}</P>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
<ButtonLink href="/research" variant="primary">
                Read the research
              </ButtonLink>
              <ButtonLink href="/policy" variant="ghost">
                Policy notes
              </ButtonLink>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-3">
              {SITE.highlights.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                  <div className="text-xs text-white/60">{s.label}</div>
                  <div className="text-sm font-semibold mt-1">{s.value}</div>
                  <div className="text-xs text-white/55 mt-1">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <Surface>
              <H2>Site map</H2>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/research"
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                >
                  <div className="font-semibold">Research</div>
                  <div className="text-sm text-white/70 mt-1">
                    Question, method, findings, and figures
                  </div>
                </Link>

                <Link
                  href="/policy"
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                >
                  <div className="font-semibold">Policy notes</div>
                  <div className="text-sm text-white/70 mt-1">
                    Short, readable arguments tied to evidence and ethics
                  </div>
                </Link>

                <Link
                  href="/sources"
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                >
                  <div className="font-semibold">Sources</div>
                  <div className="text-sm text-white/70 mt-1">
                    Direct links to core references
                  </div>
                </Link>

                <Link
                  href="/about"
                  className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                >
                  <div className="font-semibold">About</div>
                  <div className="text-sm text-white/70 mt-1">
                    Scope, limitations, and next improvements
                  </div>
                </Link>
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
