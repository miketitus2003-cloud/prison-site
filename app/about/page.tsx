import { Container, Kicker, H1, Surface, H2, P, Bullets } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>About</Kicker>
        <H1>About this site</H1>

        <div className="mt-10 grid md:grid-cols-12 gap-4">
          <div className="md:col-span-8 space-y-4">
            <Surface>
              <H2>Purpose</H2>
              <div className="mt-3 max-w-3xl">
                <P>
                  This site is designed like a research brief: clear question, clean method, key findings, and
                  policy notes that people can actually read.
                </P>
              </div>
              <Bullets
                items={[
                  "Research section is the main project",
                  "Policy notes are short summaries, not full essays",
                  "Sources page keeps citations easy to verify",
                ]}
              />
            </Surface>

            <Surface>
              <H2>Scope and limits</H2>
              <Bullets
                items={[
                  "The model run shown here uses simulated data based on national patterns",
                  "Employment is used as a proxy for education and reentry support due to missing program data",
                  "Future versions can add administrative records and richer controls",
                ]}
              />
            </Surface>
          </div>

          <div className="md:col-span-4">
            <Surface>
              <H2>Next upgrades</H2>
              <Bullets
                items={[
                  "Upload PDFs to public/docs and add the pdfHref fields in siteData",
                  "Rename slide 7 caption to match what the figure shows",
                  "Add 1 interactive chart later (optional)",
                ]}
              />
              <div className="mt-4 text-xs text-white/55">
                Tip: You can keep GitHub links off the UI entirely. The code can live on GitHub without showing GitHub anywhere on the site.
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
