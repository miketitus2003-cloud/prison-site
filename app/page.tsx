// app/page.tsx
import { Container, Surface, Kicker, H1, P, ButtonLink } from "@/components/ui";

export default function OverviewPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-14">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: hero */}
          <div className="lg:col-span-7">
            <Kicker>Research brief + policy briefs</Kicker>

            <H1>Prison Education &amp; Recidivism</H1>

            <div className="mt-4 max-w-2xl">
              <P className="text-base md:text-lg">
                This project summarizes my recidivism analysis using post-release employment as a measurable
                proxy for reentry support, paired with short policy briefs on youth sentencing and solitary
                confinement.
              </P>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Fix: force readable label on the dark primary button */}
              <ButtonLink href="/research" variant="primary">
                <span className="text-white">Research brief</span>
              </ButtonLink>

              <ButtonLink href="/policy" variant="secondary">
                Policy briefs
              </ButtonLink>

              <ButtonLink href="/sources" variant="ghost">
                Sources
              </ButtonLink>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Research brief", "Logistic regression", "Reentry support", "Policy writing"].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full bg-black/5 ring-1 ring-black/10 text-black/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: At a glance */}
          <div className="lg:col-span-5">
            <Surface className="bg-white/70">
              <div className="text-sm font-semibold text-black/85">At a glance</div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                  <div className="text-[11px] uppercase tracking-widest text-black/50">
                    National context
                  </div>
                  <div className="mt-2 font-semibold text-black/85">High recidivism rates</div>
                  <div className="mt-1 text-sm text-black/65">
                    BJS follow-up studies show many are rearrested after release.
                  </div>
                </div>

                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                  <div className="text-[11px] uppercase tracking-widest text-black/50">
                    Education link
                  </div>
                  <div className="mt-2 font-semibold text-black/85">Lower reoffending</div>
                  <div className="mt-1 text-sm text-black/65">
                    Prior research connects correctional education to improved outcomes.
                  </div>
                </div>

                <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                  <div className="text-[11px] uppercase tracking-widest text-black/50">
                    Proxy used here
                  </div>
                  <div className="mt-2 font-semibold text-black/85">Employment after release</div>
                  <div className="mt-1 text-sm text-black/65">
                    Used when direct program participation data is missing.
                  </div>
                </div>

                <div className="rounded-2xl bg-black/[0.03] ring-1 ring-black/10 p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-black/50">Materials</div>
                    <div className="mt-2 font-semibold text-black/85">View analysis repo</div>
                  </div>

                  {/* If you want this to link to GitHub, swap href to your repo URL + set external */}
                  <ButtonLink href="/research" variant="ghost">
                    Open
                  </ButtonLink>
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
