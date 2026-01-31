// components/statsData.ts

/**
 * Data extracted from:
 * BJS "Recidivism of Prisoners Released in 34 States in 2012" PDF
 * https://bjs.ojp.gov/sites/g/files/xyckuh236/files/media/document/rpr34s125yfup1217.pdf
 *
 * Cumulative arrest any offense (%), Table 5:
 * Year 1 36.8, Year 2 52.9, Year 3 61.5, Year 4 67.0, Year 5 70.8
 *
 * Cumulative arrest any offense at 5 years (%), Table 4:
 * Male 71.7, Female 63.1
 * White 69.5, Black 74.0, Hispanic 66.9
 *
 * Prior arrests (counts) and age of first arrest (counts), Table 6:
 * Total released 408,300
 * Prior arrests: 10+ (176,600), 5–9 (126,800), 4 or fewer (104,900)
 * Age first arrest: <=17 (123,600), 18–19 (131,600), 20–24 (92,600),
 * 25–29 (33,600), 30–34 (12,700), 35+ (10,200)
 *
 * Commitment offense distribution (%), Table 1:
 * Violent 27.5, Property 28.3, Drug 25.5, Public order 18.7
 */

export const BJS2012 = {
  cumulativeArrestOverTime: [
    { year: 1, pct: 36.8 },
    { year: 2, pct: 52.9 },
    { year: 3, pct: 61.5 },
    { year: 4, pct: 67.0 },
    { year: 5, pct: 70.8 },
  ],
  cumulativeArrest5yrBySex: [
    { label: "Male", pct: 71.7 },
    { label: "Female", pct: 63.1 },
  ],
  cumulativeArrest5yrByRace: [
    { label: "White", pct: 69.5 },
    { label: "Black", pct: 74.0 },
    { label: "Hispanic", pct: 66.9 },
  ],
  priorArrestsCounts: [
    { label: "10+ prior arrests", count: 176_600 },
    { label: "5–9 prior arrests", count: 126_800 },
    { label: "4 or fewer", count: 104_900 },
  ],
  ageFirstArrestCounts: [
    { label: "17 or younger", count: 123_600 },
    { label: "18–19", count: 131_600 },
    { label: "20–24", count: 92_600 },
    { label: "25–29", count: 33_600 },
    { label: "30–34", count: 12_700 },
    { label: "35+", count: 10_200 },
  ],
  commitmentOffensePct: [
    { label: "Violent", pct: 27.5 },
    { label: "Property", pct: 28.3 },
    { label: "Drug", pct: 25.5 },
    { label: "Public order", pct: 18.7 },
  ],
  totalReleased: 408_300,
};

export const BJS2018 = {
  /**
   * From BJS 2018 update page (Highlights):
   * Released in 2005 (401,288). Arrested within:
   * 3 years 68%, 6 years 79%, 9 years 83%
   * https://bjs.ojp.gov/library/publications/2018-update-prisoner-recidivism-9-year-follow-period-2005-2014
   */
  arrestedWithin: [
    { years: 3, pct: 68 },
    { years: 6, pct: 79 },
    { years: 9, pct: 83 },
  ],
  cohortReleased2005: 401_288,
};
