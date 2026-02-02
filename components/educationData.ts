// components/educationData.ts

export const EDUCATION_EVIDENCE = {
  highlights: [
    {
      label: "State prison education access (participation)",
      value: "43%",
      note:
        "Share of people in state prison who report participating in education programming (Survey of Prison Inmates).",
      href: "https://www.prisonpolicy.org/blog/2022/09/02/prison_opportunities/",
      sourceLabel: "Prison Policy Initiative (2022)",
    },
    {
      label: "State prison job training access (participation)",
      value: "33%",
      note:
        "Share of people in state prison who report participating in job training.",
      href: "https://www.prisonpolicy.org/blog/2022/09/02/prison_opportunities/",
      sourceLabel: "Prison Policy Initiative (2022)",
    },
    {
      label: "Education gap (state prisons vs general population)",
      value: "40% vs 18%",
      note:
        "Estimated share who had not completed high school (state prison inmates) vs general population (BJS).",
      href: "https://bjs.ojp.gov/content/pub/pdf/ecp.pdf",
      sourceLabel: "BJS (Education and Correctional Populations)",
    },
    {
      label: "Postsecondary exposure (federal prisons vs general population)",
      value: "24% vs 48%",
      note:
        "Estimated share who attended some college or other postsecondary education (federal inmates) vs general population (BJS).",
      href: "https://bjs.ojp.gov/content/pub/pdf/ecp.pdf",
      sourceLabel: "BJS (Education and Correctional Populations)",
    },
    {
      label: "Rearrest rates by education (federal)",
      value: "60.4% vs 19.1%",
      note:
        "USSC reports higher rearrest among people without high school completion and lower rearrest among those with a college degree (8-year follow-up).",
      href: "https://www.ussc.gov/sites/default/files/pdf/research-and-publications/research-publications/2016/recidivism_overview.pdf",
      sourceLabel: "USSC (Recidivism Overview, 2016)",
    },
  ],

  plainLanguageTakeaway:
    "Across multiple official datasets, incarcerated populations have substantially lower education levels than the general population — and federal rearrest rates vary sharply by educational attainment. This supports a practical policy hypothesis: expanding access to education and job training is a credible lever to reduce reoffending risk (while improving post-release stability).",

  disclaimers: [
    "These are descriptive statistics and reported associations. They do not prove causality on their own.",
    "Different studies define “recidivism” differently (rearrest vs reconviction vs reincarceration). This site labels measures clearly.",
  ],
};
