// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

const TAGS = ["Research brief", "Logistic regression", "Reentry support", "Policy writing"];

export default function OverviewPage() {
  return (
    <div className="relative">
      {/* Background: grid + soft gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        <div
          className="absolute -top-32 -right-40 h-[620px] w-[620px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.45), rgba(16,185,129,0.18), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[680px] w-[680px] rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.38), rgba(59,130,246,0.12), transparent 62%)",
          }}
        />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-14 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Hero */}
            <div className="lg:col-span-7">
              <Kicker>{SITE.overview.subtitle}</Kicker>
              <H1>{SITE.overview.title}</H1>

              <div className="mt-4 max-w-2xl">
                <P className="text-[15px] sm:text-base">{SITE.overview.lead}</P>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/research" variant="primary">
                  Read the research
                </ButtonLink>

                <ButtonLink href="/policy" variant="secondary">
                  Policy briefs
                </ButtonLink>

                <ButtonLink href="/stats" variant="ghost">
                  Stats Lab
                </ButtonLink>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-black/10 text-black/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Credibility strip */}
              <div className="mt-10 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                <div className="text-xs uppercase tracking-widest text-black/50">
                  What you are looking at
                </div>

                <div className="mt-3 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                    <div className="text-sm font-semibold text-black/90">Clarity</div>
                    <div className="mt-1 text-sm text-black/65">
                      Research written like a brief so it reads fast and clean.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                    <div className="text-sm font-semibold text-black/90">Verification</div>
                    <div className="mt-1 text-sm text-black/65">
                      Stats and links are centralized so anyone can check sources.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                    <div className="text-sm font-semibold text-black/90">Real implications</div>
                    <div className="mt-1 text-sm text-black/65">
                      Policy briefs connect outcomes to decisions people argue about.
                    </div>
                  </div>
                </div>

                {/* Explore row */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/sources"
                    className="rounded-2xl px-4 py-2.5 text-sm font-semibold bg-black/5 border border-black/10 text-black/80 hover:bg-black/10 transition"
                  >
                    Sources
                  </Link>

                  <Link
                    href="/injustice"
                    className="rounded-2xl px-4 py-2.5 text-sm font-semibold bg-black/5 border border-black/10 text-black/80 hover:bg-black/10 transition"
                  >
                    Topics
                  </Link>

                  <Link
                    href="/stack"
                    className="rounded-2xl px-4 py-2.5 text-sm font-semibold bg-black/5 border border-black/10 text-black/80 hover:bg-black/10 transition"
                  >
                    Build
                  </Link>
                </div>
              </div>

              {/* Visual media section */}
              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="text-xs uppercase tracking-widest text-black/50">
                    Slide preview
                  </div>
                  <div className="mt-3 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 bg-black/5">
                    <Image
                      src="/assets/slide_01.png"
                      alt="Project slide preview"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-3 text-sm text-black/65">
                    Quick preview of the deck. Full walkthrough is on the Research page.
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="text-xs uppercase tracking-widest text-black/50">
                    Analysis vibe
                  </div>
                  <div className="mt-3 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 bg-black/5">
                    {/* You can swap this image anytime.
                        If you don’t have it, keep slide_02 as a second visual. */}
                    <Image
                      src="/assets/slide_02.png"
                      alt="Analysis slide preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 text-sm text-black/65">
                    The goal is readable work that still holds up when someone checks the receipts.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: At a glance */}
            <div className="lg:col-span-5">
              <Card className="border border-black/10 bg-white/70 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <H2>At a glance</H2>
                  <span className="text-xs font-semibold text-black/55 rounded-full px-3 py-1 border border-black/10 bg-white/70">
                    Overview
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {SITE.overview.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl bg-white/70 border border-black/10 p-4"
                    >
                      <div className="text-[11px] uppercase tracking-widest text-black/50">
                        {s.label}
                      </div>
                      <div className="mt-2 text-base font-semibold text-black/90">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm text-black/65">{s.note}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                    View analysis repo
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="ghost">
                    Go to Stats Lab
                  </ButtonLink>
                </div>

                <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-widest text-black/50">
                    Intent
                  </div>
                  <div className="mt-2 text-sm text-black/65 leading-relaxed">
                    This website is not advocating for crime. It focuses on documented system failures,
                    measurable outcomes, and how reentry conditions affect what happens after release.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
