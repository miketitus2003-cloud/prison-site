// app/about/page.tsx
import { Card, SectionHeader } from "@/components/ui";
import { ExternalLink } from "lucide-react";

const LINKS = {
  repo: "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <SectionHeader
        eyebrow="About"
        title="About this project"
        subtitle="A short research brief + policy notes, built to be readable and easy to verify."
      />

      <div className="mt-8 grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-6">
          <Card>
            <div className="text-sm text-white/60">Project focus</div>
            <h2 className="mt-2 text-xl font-semibold">What I’m studying</h2>
            <p className="mt-3 text-white/75 leading-relaxed">
              This site centers on one question: how strongly do reentry supports relate to recidivism?
              Because many public datasets don’t track prison education program participation in a clean way,
              I use post-release employment as a measurable proxy for education/reentry support and test how
              it relates to returning to prison.
            </p>
          </Card>

          <Card>
            <div className="text-sm text-white/60">How to read the site</div>
            <h2 className="mt-2 text-xl font-semibold">What’s where</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed">
              <li>• <span className="text-white">Research</span>: question → method → findings → slides</li>
              <li>• <span className="text-white">Policy</span>: short, strong points tied to youth sentencing and solitary confinement</li>
              <li>• <span className="text-white">Sources</span>: direct links to the core references used for framing</li>
            </ul>
          </Card>
        </div>

        <div className="md:col-span-5 space-y-6">
          <Card>
            <div className="text-sm text-white/60">Methods note</div>
            <h2 className="mt-2 text-xl font-semibold">Scope and limits</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed">
              <li>• The model shown here demonstrates relationships, not causation.</li>
              <li>• Employment is a proxy — it’s measurable, but not the same as direct program completion.</li>
              <li>• Stronger versions would add administrative education records and more controls.</li>
            </ul>
          </Card>

          <Card>
            <div className="text-sm text-white/60">Transparency</div>
            <h2 className="mt-2 text-xl font-semibold">Code and materials</h2>
            <p className="mt-3 text-white/75 leading-relaxed">
              The analysis repo contains the model setup and supporting materials.
            </p>
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90"
            >
              View analysis repo <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
