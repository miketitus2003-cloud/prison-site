export type Slide = { src: string; caption: string };

export const SITE = {
  author: "Michael Parham",

  brand: {
    title: "Prison Policy Data Platform",
    subtitle: "Dashboards • Policy briefs • Source-verified insights",
    mission:
      "I turn justice system data into public-facing insights: dashboards, short briefs, and source-verified claims.",
  },

  links: {
    analysisRepo:
      "https://github.com/miketitus2003-cloud/prison-education-recidivism-analysis-standalone",
  },

  glossary: {
    recidivism: {
      term: "Recidivism",
      plain:
        "Recidivism usually means a return to criminal behavior after release. In practice, it is measured using outcomes like rearrest, reconviction, or reincarceration depending on the study.",
      whyItMatters:
        "It matters because most people in prison return home. If reentry supports reduce repeat contact with the system, that improves safety, stability, and long-run outcomes for communities.",
    },
  },

  overview: {
    title: "Prison Policy Data Platform",
    subtitle: "Dashboards • Policy briefs • Source-verified insights",
    lead:
      "This project turns recidivism reporting into fast, verifiable insights. It pairs a dashboard built from primary justice statistics with brief-style research notes and decision-memo policy briefs.",
    proofBullets: [
      "Dashboards: BJS-derived visuals with simple filters and clear method notes",
      "Writing: decision-memo policy briefs with implementable levers and success metrics",
      "Trust: claim → source mapping and consistent association-not-causation language",
    ],
    guidedPath: [
      { label: "Start with results (2 min)", href: "/stats" },
      { label: "Deep dive (8 min)", href: "/research" },
      { label: "Policy only (3 min)", href: "/policy" },
    ],
  },

  research: {
    title: "Insights",
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
    modelCard: {
      goal: "Explain directional relationships, not causal impact",
      data: "Synthetic demo calibrated to public aggregates and reported patterns",
      evaluation: "Transparency-first: focus on clarity, limits, and correct interpretation",
      doNotConclude: [
        "Causality",
        "Generalization to every state or time period",
        "That a single factor explains the full outcome",
      ],
    },
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
      memo: {
        owner: "State legislatures, courts, corrections leadership",
        cost: "Medium (legal process, alternatives, services)",
        timeline: "3–12 months for policy changes, longer for system adoption",
        risks: [
          "Political resistance",
          "Variation across states",
          "Implementation gaps between policy and practice",
        ],
        successMetrics: [
          "Reduced extreme sentencing for youth",
          "Lower error risk in high-stakes cases",
          "Improved due process protections for juveniles",
        ],
      },
    },
    {
      title: "What solitary does to kids",
      oneLine:
        "Solitary confinement can mean 22–24 hours alone per day. For youth, isolation can cause serious psychological harm and raises self harm risk.",
      bullets: [
        "Linked to anxiety, depression, panic, and paranoia",
        "Higher risk of self harm and suicide",
        "Long-term damage and trauma symptoms can persist after release",
        "Often used for staffing or rules rather than youth wellbeing",
      ],
      bottomLine:
        "Isolation becomes punishment for a system’s lack of safer alternatives.",
      memo: {
        owner: "Corrections agencies, juvenile facilities, oversight bodies",
        cost: "Medium (staff training, step-down programs, clinical care)",
        timeline: "0–6 months for limits and oversight, 6–12 months for alternatives",
        risks: [
          "Staffing constraints",
          "Facilities not designed for step-down programs",
          "Weak enforcement without oversight",
        ],
        successMetrics: [
          "Reduced youth isolation hours",
          "Lower self harm incidents",
          "Increased access to services and programming",
        ],
      },
    },
    {
      title: "Why solitary should not be used",
      oneLine:
        "Solitary may control a moment, but long term isolation can make reentry harder and increase instability, hurting both rehabilitation and public safety.",
      bullets: [
        "Public safety: most people return home, and isolation can worsen stability",
        "Rehabilitation: practices that damage mental health fight the goal of reducing harm",
        "Better path: strict limits, oversight, clinical care, and step-down programming",
      ],
      bottomLine:
        "If a punishment increases risk after release, it is not real safety.",
      memo: {
        owner: "Corrections leadership, state oversight, facility administrators",
        cost: "Medium (programs, clinical coverage, training)",
        timeline: "3–12 months to scale alternatives",
        risks: [
          "Inconsistent standards across sites",
          "Data quality issues in reporting isolation",
          "Short-term disruption if transition is rushed",
        ],
        successMetrics: [
          "Reduced long stays in isolation",
          "Improved mental health screening and care access",
          "Better reentry stability indicators post-release",
        ],
      },
    },
  ],

  sources: {
    primaryLinks: [
      {
        label:
          "BJS PDF — Recidivism of Prisoners Released in 34 States in 2012",
        href: "https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf",
        quality: "Primary government data (BJS)",
        usedFor:
          "Dashboard charts (time series, sex, race/ethnicity, prior arrests, age at first arrest, offense mix)",
      },
      {
        label:
          "BJS (2018) — Update on Prisoner Recidivism: 9-year follow-up (2005–2014)",
        href: "https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014",
        quality: "Primary government data (BJS)",
        usedFor:
          "Longer follow-up framing (how the story changes over 9 years)",
      },
      {
        label:
          "RAND — How Effective Is Correctional Education (summary page)",
        href: "https://www.rand.org/pubs/research_reports/RR564.html",
        quality: "Research synthesis (RAND)",
        usedFor:
          "Education and recidivism evidence framing (directional support for the mechanism)",
      },
    ],

    claimMap: [
      {
        claim:
          "Cumulative rearrest rises quickly after release and continues increasing across years of follow-up.",
        sources: [
          "BJS 34 states 2012 PDF (tables used for 1–5 year cumulative arrest)",
          "BJS 2018 update page (3 vs 9 year comparison)",
        ],
      },
      {
        claim:
          "Recidivism measures vary; studies often track outcomes like rearrest and other follow-up outcomes.",
        sources: [
          "BJS publications (measurement framing across reporting)",
        ],
      },
      {
        claim:
          "Correctional education is linked in research syntheses to improved outcomes such as reduced recidivism and improved employment.",
        sources: [
          "RAND RR564 summary",
        ],
      },
    ],

    imageCredits: [
      {
        label: "Background photos",
        note:
          "Photos used for visual context are from Unsplash and are credited here to keep usage transparent.",
      },
    ],
  },
};
