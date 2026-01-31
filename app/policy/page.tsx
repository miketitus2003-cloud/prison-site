// app/policy/page.tsx
import { Container, Kicker, H1, P, Badge, Callout } from "@/components/ui";
import { SITE } from "@/components/siteData";
import PolicyBriefCard from "@/components/PolicyBriefCard";

export default function PolicyPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Policy</Badge>
          <Badge tone="neutral">Actionable briefs</Badge>
        </div>

        <H1>Policy briefs</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            These briefs are intentionally short and focused. They connect the research context to practical levers and measurable outcomes.
          </P>
        </div>

        <div className="mt-6">
          <Callout title="Positioning" tone="neutral">
            This website is not advocating for crime. It focuses on documented injustice, evidence, and practical policy discussion.
          </Callout>
        </div>

        <div className="mt-8 space-y-6">
          {SITE.policy.map((b) => (
            <PolicyBriefCard
              key={b.title}
              title={b.title}
              oneLine={b.oneLine}
              bullets={b.bullets}
              bottomLine={b.bottomLine}
              owner="State corrections leadership, facility administrators, and independent oversight"
              cost="Low to medium depending on staffing and clinical capacity"
              timeline="3 to 12 months for policy change and implementation"
              risks={[
                "Staffing constraints and facility culture",
                "Political resistance and weak oversight",
                "Implementation drift without audits",
              ]}
              success={[
                "Reduced isolation hours for youth",
                "Lower self harm incidents",
                "Improved reentry stability measures and program access",
              ]}
            />
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-6">
          <div className="text-sm font-semibold text-black">Sources under each brief</div>
          <div className="mt-2 text-sm text-black/70">
            Each brief links back to Sources so claims can be verified quickly.
          </div>
        </div>
      </div>
    </Container>
  );
}
