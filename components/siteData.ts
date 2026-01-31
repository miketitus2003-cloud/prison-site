export type Slide = { src: string; caption: string };

export const SITE = {
  author: "Michael Parham",

  links: {
    analysisRepo:
      "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
  },

  overview: {
    title: "Prison Education & Recidivism",
    subtitle: "Research brief + policy briefs",
    lead:
      "This project summarizes my recidivism analysis using post-release employment as a measurable proxy for reentry support, paired with short policy briefs on youth sentencing and solitary confinement.",
    stats: [
      {
        label: "National context",
        value: "High recidivism rates",
        note: "BJS follow up studies show many are rearrested after release.",
      },
      {
        label: "Education link",
        value: "Lower reoffending",
        note: "Prior research connects correctional education to improved outcomes.",
      },
      {
        label: "Proxy used here",
        value: "Employment after release",
        note: "Used when direct program participation data is missing.",
      },
    ],
  },

  research: {
    title: "Research brief",
    question:
      "What is the relationship between post release employment (proxy), offense type, time served, and recidivism?",
    methodBullets: [
      "Outcome: recidivism (1 = reoffended, 0 = did not)",
      "Predictors: employed (yes/no), offense type (violent vs drug), time served (years)",
      "Model: logistic regression (statsmodels Logit) in Python",
      "Interpretation: directional evidence, not a causal estimate",
    ],
    resultsBullets: [
      "Employment after release was associated with a lower likelihood of reoffending",
      "Violent offense type was associated with a higher likelihood of return",
      "Time served was not statistically significant in this run",
    ],
    limitationsBullets: [
      "Employment is a proxy, not direct education completion",
      "Public datasets often miss program type and dosage",
      "Stronger versions would add administrative education records and richer controls",
    ],
    slides: [
      { src: "/assets/slide_01.png", caption: "Project title and framing" },
      { src: "/assets/slide_02.png", caption: "Why recidivism needs a closer look" },
      { src: "/assets/slide_03.png", caption: "Research question and variables" },
      { src: "/assets/slide_04.png", caption: "Method overview (logit model)" },
      { src: "/assets/slide_05.png", caption: "Results summary" },
      { src: "/assets/slide_06.png", caption: "Implications and next steps" },
      { src: "/assets/slide_07.png", caption: "Closing / additional figure" },
    ] as Slide[],
  },

  policy: [
    {
      title: "Teens and extreme punishment",
      oneLine:
        "Teenagers should not face punishments as final as the death penalty. Youth are more vulnerable to pressure, the system can be wrong, and the harm is irreversible.",
      bullets: [
        "Wrongful convictions and false confessions are real risks",
        "Unequal application increases the chance of irreversible injustice",
        "Execution methods are not reliably humane, and the outcome cannot be undone",
      ],
      bottomLine:
        "A system that can be wrong should not have the power to permanently end a child’s life.",
      pdfHref: "", // optional later: "/docs/teens-death-penalty.pdf"
    },
    {
      title: "What solitary does to kids",
      oneLine:
        "Solitary confinement can mean 22–24 hours alone per day. For youth, isolation can cause serious psychological harm and raises self harm risk.",
      bullets: [
        "Linked to anxiety, depression, panic, and paranoia",
        "Higher risk of self harm and suicide",
        "Long-term damage and trauma symptoms can persist after release",
        "Often used for staffing/rules rather than youth wellbeing",
      ],
      bottomLine:
        "Isolation becomes punishment for a system’s lack of safer alternatives.",
      pdfHref: "", // optional later: "/docs/kids-solitary.pdf"
    },
    {
      title: "Why solitary should not be used",
      oneLine:
        "Solitary may control a moment, but long term isolation can make reentry harder and increase instability hurting both rehabilitation and public safety.",
      bullets: [
        "Public safety: most people return home, and isolation can worsen stability",
        "Rehabilitation: practices that damage mental health fight the goal of reducing harm",
        "Better path: strict limits, oversight, clinical care, and step-down programming",
      ],
      bottomLine:
        "If a punishment increases risk after release, it is not real safety.",
      pdfHref: "", // optional later: "/docs/solitary-confinement.pdf"
    },
  ],

  sources: {
    primaryLinks: [
      {
        label:
          "BJS (2018) — Update on Prisoner Recidivism: 9-year follow-up (2005–2014)",
        href: "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
      },
      {
        label:
          "BJS PDF — Recidivism of prisoners released in 34 states in 2012",
        href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
      },
      {
        label: "RAND (2013) — Correctional Education meta-analysis",
        href: "https://www.rand.org/pubs/research_reports/RR266.html",
      },
      {
        label: "Death Penalty Information Center",
        href: "https://deathpenaltyinfo.org/",
      },
      {
        label: "Innocence Project",
        href: "https://innocenceproject.org/",
      },
      {
        label: "National Registry of Exonerations",
        href: "https://www.law.umich.edu/special/exoneration/Pages/about.aspx",
      },
      {
        label: "Human Rights Watch",
        href: "https://www.hrw.org/",
      },
    ],

    legalCases: [
      "Roper v. Simmons, 543 U.S. 551 (2005)",
    ],

    articlesAndReads: [
      "Bulman, Philip. “The Psychological Effects of Solitary Confinement.” Corrections Today, vol. 74, no. 3, 2012, pp. 58–59. ProQuest.",
      "Lord, Rich. “In ‘the Hole’: Pa. Prisons’ Solitary Confinement Policy.” McClatchy – Tribune Business News, Jun 10, 2012. ProQuest.",
      "Curtis, Abigail. “Is Solitary Confinement Torture?: Proposed Bill Would Place Limits on Use of Solitary Confinement in State Prison.” McClatchy – Tribune Business News, Oct 24, 2009. ProQuest.",
      "Will, George. “Solitary; Confinement’s Toll.” St. Louis Post-Dispatch, Feb 21, 2013. ProQuest.",
      "The Guardian (2014) — Clayton Lockett execution (background reading).",
      "Equal Justice Initiative — George Stinney case (background reading).",
    ],
  },
};
