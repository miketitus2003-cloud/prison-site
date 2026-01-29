export type Slide = { src: string; caption: string };

export const SITE = {
  title: "Prison Education and Recidivism",
  subtitle: "Research brief and policy notes",
  author: "Michael Parham",

  intro:
    "I studied how post-release employment (a proxy for education and reentry support) relates to recidivism, then wrote short policy notes on youth sentencing and solitary confinement.",

  highlights: [
    { label: "Re-arrest rate", value: "62% within 3 years", note: "34 states, 2012 cohort" },
    { label: "Education link", value: "43% lower odds", note: "reported in prior research" },
    { label: "Proxy used", value: "Employment after release", note: "measurable reentry signal" },
  ],

  research: {
    oneLine:
      "Using post-release employment as a proxy for education and reentry support, I tested how employment, offense type, and time served relate to recidivism.",
    whyBullets: [
      "Recidivism is not just a statistic. It impacts families and community safety.",
      "Education programs are linked to lower reoffending, but public datasets often miss program type and dosage.",
      "Employment after release is measurable and connected to education and reentry support in prior research.",
    ],
    question:
      "What is the relationship between employment (proxy), offense type, time served, and recidivism?",
    methodBullets: [
      "Outcome: recidivism (1 = reoffended, 0 = did not)",
      "Predictors: employed (yes/no), offense type (violent vs drug), time served (years)",
      "Model: logistic regression (statsmodels Logit) in Python",
      "Data: simulated dataset based on national patterns (directional illustration, not causal estimate)",
    ],
    resultsBullets: [
      "Employed after release was associated with a much lower likelihood of reoffending",
      "Violent offense type was associated with a higher likelihood of return",
      "Time served was not statistically significant in this run",
    ],
    implicationsBullets: [
      "Shift focus from sentence length to in-prison programs and reentry support",
      "Programs that lead to jobs can reduce returns and improve safety",
    ],
    nextStepsBullets: [
      "Add real education participation data",
      "Test with state or local records",
      "Include parole, demographics, and support systems",
    ],
  },

  slides: [
    { src: "/assets/slide_01.png", caption: "Project title" },
    { src: "/assets/slide_02.png", caption: "Why recidivism needs a closer look" },
    { src: "/assets/slide_03.png", caption: "Research question and variables" },
    { src: "/assets/slide_04.png", caption: "Method overview (Logit model)" },
    { src: "/assets/slide_05.png", caption: "Results summary" },
    { src: "/assets/slide_06.png", caption: "Implications and next steps" },
    { src: "/assets/slide_07.png", caption: "Update this caption to match slide 7" },
  ] as Slide[],

  policy: [
    {
      title: "Teens and extreme punishment",
      oneLine:
        "Teenagers should not face punishments as final as the death penalty because the system is flawed, youth are easier to pressure, and the risk of irreversible harm is too high.",
      bullets: [
        "The system gets it wrong: wrongful convictions and false confessions happen",
        "Bias raises the risk: extreme sentencing has not been applied equally",
        "The punishment itself can be cruel and irreversible",
      ],
      bottomLine: "If a system can be wrong, it should never permanently end a child's life.",
      pdfHref: "", // optional: "/docs/teens-death-penalty.pdf"
    },
    {
      title: "What solitary does to kids",
      oneLine:
        "Solitary can mean 22 to 24 hours a day alone. For youth, isolation hits harder and can cause serious harm.",
      bullets: [
        "Linked to anxiety, depression, panic, and paranoia",
        "Higher risk of self-harm and suicide",
        "Long-term psychological damage and trauma symptoms",
        "Often used for staffing, rules, or so-called protection",
      ],
      bottomLine: "Kids end up paying for a system that lacks safe alternatives.",
      pdfHref: "", // optional: "/docs/kids-solitary.pdf"
    },
    {
      title: "Why solitary should not be used",
      oneLine:
        "Solitary may control a situation short term, but long-term isolation can cause damage and make reentry harder.",
      bullets: [
        "Public safety problem: most people return home, and isolation can increase instability after release",
        "Rehabilitation problem: if a practice worsens mental health, it works against reducing future harm",
        "Better path: step-down programs, clinical care, strict limits, oversight, and transparency",
      ],
      bottomLine: "If a punishment increases risk after release, it is not real safety.",
      pdfHref: "", // optional: "/docs/solitary-confinement.pdf"
    },
  ],

  sources: [
    {
      label: "BJS - Recidivism topic page",
      href: "https://bjs.ojp.gov/topics/recidivism",
    },
    {
      label: "RAND (2013) - Correctional Education report",
      href: "https://www.rand.org/pubs/research_reports/RR266.html",
    },
    {
      label: "BJS publications search - recidivism",
      href: "https://bjs.ojp.gov/library/publications/list?field_keywords_target_id%5B0%5D=Recidivism",
    },
  ],

  // Optional, keep subtle:
  links: {
    githubProfile: "", // put your github if you want: "https://github.com/miketitus2003-cloud"
    repo: "", // put repo if you want
  },
};
