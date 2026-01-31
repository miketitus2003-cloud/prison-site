// data/facts.ts

export type FactLink = { label: string; href: string };
export type StatCard = {
  id: string;
  label: string;
  value: string;
  context: string;
  sourceLabel: string;
  sourceHref: string;
};

export type ChartPoint = { label: string; value: number };

export const FACTS = {
  disclaimers: {
    intent:
      "This site is not defending crime. It is focused on measurable outcomes and documented injustices, especially where systems fail people who have the least power.",
    caution:
      "Numbers can vary by cohort, state, and measurement method. Each stat here links to its source so readers can verify context.",
  },

  quickStats: [
    {
      id: "bjs-2012-rearrest",
      label: "Rearrest within 3 years",
      value: "62%",
      context: "34 states, 2012 release cohort (BJS PDF).",
      sourceLabel: "BJS PDF",
      sourceHref:
        "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
    },
    {
      id: "rand-education",
      label: "Education link",
      value: "Lower recidivism",
      context:
        "RAND meta-analysis reports correctional education is associated with improved outcomes.",
      sourceLabel: "RAND RR-266",
      sourceHref: "https://www.rand.org/pubs/research_reports/RR266.html",
    },
    {
      id: "exonerations-registry",
      label: "Exonerations tracked",
      value: "Thousands",
      context:
        "The National Registry of Exonerations tracks U.S. exonerations with case details.",
      sourceLabel: "National Registry of Exonerations",
      sourceHref:
        "https://www.law.umich.edu/special/exoneration/Pages/about.aspx",
    },
    {
      id: "deathpenaltyinfo",
      label: "Death penalty facts",
      value: "Primary reference",
      context:
        "Central hub for death penalty data, reports, and state level updates.",
      sourceLabel: "Death Penalty Information Center",
      sourceHref: "https://deathpenaltyinfo.org/",
    },
  ] as StatCard[],

  // A small chart dataset for visual punch (not claiming your model values)
  // This is a simple “concept” visualization for the site.
  // You can replace with your real numbers later.
  demoCharts: {
    recidivismConcept: {
      title: "Concept view: risk factors and outcomes",
      subtitle:
        "This chart is a visual concept to explain relationships. It is not your model output.",
      sourceLabel: "BJS topic + RAND framing",
      sourceHref: "https://bjs.ojp.gov/topics/recidivism",
      points: [
        { label: "Reentry support", value: 18 },
        { label: "Employment", value: 22 },
        { label: "Stable housing", value: 26 },
        { label: "Treatment access", value: 30 },
        { label: "Recidivism risk", value: 62 },
      ] as ChartPoint[],
    },
  },

  // Sources you already use, plus your additional policy references
  references: {
    primaryLinks: [
      {
        label:
          "BJS (2018) Update on Prisoner Recidivism: 9 year follow up (2005 to 2014)",
        href: "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
      },
      {
        label: "BJS PDF Recidivism of prisoners released in 34 states in 2012",
        href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
      },
      {
        label: "RAND (2013) Correctional Education meta analysis",
        href: "https://www.rand.org/pubs/research_reports/RR266.html",
      },
      {
        label: "BJS recidivism topic page",
        href: "https://bjs.ojp.gov/topics/recidivism",
      },
    ] as FactLink[],

    policyAndJustice: [
      { label: "Death Penalty Information Center", href: "https://deathpenaltyinfo.org/" },
      { label: "Innocence Project", href: "https://innocenceproject.org/" },
      { label: "Human Rights Watch", href: "https://www.hrw.org/" },
      {
        label: "National Registry of Exonerations",
        href: "https://www.law.umich.edu/special/exoneration/Pages/about.aspx",
      },
    ] as FactLink[],

    legalCases: ["Roper v. Simmons, 543 U.S. 551 (2005)"],

    articlesAndReads: [
      "Bulman, Philip. The Psychological Effects of Solitary Confinement. Corrections Today, 74(3), 2012, 58 to 59. ProQuest.",
      "Lord, Rich. In the Hole: Pa. Prisons Solitary Confinement Policy. McClatchy Tribune Business News, Jun 10, 2012. ProQuest.",
      "Curtis, Abigail. Is Solitary Confinement Torture? Proposed Bill Would Place Limits on Use of Solitary in State Prison. McClatchy Tribune Business News, Oct 24, 2009. ProQuest.",
      "Will, George. Solitary: Confinement’s Toll. St. Louis Post Dispatch, Feb 21, 2013. ProQuest.",
      "The Guardian (2014) Clayton Lockett execution background reading.",
      "Equal Justice Initiative George Stinney case background reading.",
    ],
  },
};
