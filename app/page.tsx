// app/page.tsx
import Link from "next/link";
import {
  Container,
  Card,
  Kicker,
  H1,
  P,
  ButtonLink,
} from "@/components/ui";
import { SITE } from "@/components/siteData";

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-[11px] uppercase tracking-widest text-black/50">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-black">{value}</div>
      <div className="mt-1 text-sm text-black/70 leading-relaxed">{note}</div>
    </Card>
  );
}

export default function OverviewPage() {
  return (
    <div className="bg-white">
      <Container>
        <div className="pt-14 md:pt-20 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: hero */}
            <div className="lg:col-span-7">
              <Kicker>{SITE.overview.subtitle}</Kicker>
              <H1>{SITE.overview.title}</H1>

              <div className="mt-4 max-w-2xl">
                <P className="text-base md:text-lg text-black/70">
                  {SITE.overview.lead}
                </P>
              </div>

              {/* FIX: no blank button, hard-coded labels */}
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

              {/* Small tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Research brief", "Logistic regression", "Reentry support", "Policy writing"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs text-black/70"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right: glance cards */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-black">At a glance</div>

                <div className="mt-4 grid gap-3">
                  {SITE.overview.stats.map((s) => (
                    <StatCard
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      note={s.note}
                    />
                  ))}
                </div>

                {/* Optional: repo link */}
                <div className="mt-5">
                  <Link
                    href={SITE.links.analysisRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-black/[0.03] transition"
                  >
                    View analysis repo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* soft footer spacer */}
          <div className="mt-14 border-t border-black/10 pt-8 text-xs text-black/40">
            © {new Date().getFullYear()} {SITE.author}
          </div>
        </div>
      </Container>
    </div>
  );
}
