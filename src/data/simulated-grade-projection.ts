// SIMULATED DATA. Not a real student, and not real model output.
//
// Illustrates the kind of projection Subject's predictive model produces:
// quantile gradient-boosted trees calibrated with conformalized quantile
// regression, giving p10 / p50 / p90 predictions. Every number below is fixed
// and the rules are simple, so the chart is identical on every build.
//
// Course: a 10-unit physics course over the 2025–26 school year. Each unit has
// a homework (1.5% of the course grade), a problem set (1.5%) and a lab (3%),
// so assignments total 60%. Midterm 15% (January), final 25% (June).
// "Cumulative grade" = percent of total course points earned so far: it only
// goes up, and it ends at the final course grade.
//
// The student: strong start, a missed problem set in Unit 3 that is turned in
// late for partial credit, then a slump through momentum and rotation that
// carries into a weaker midterm. Actual data stops at the midterm ("today").
//
// Projection, per remaining item: expected score = the student's recent level
// (last two units plus midterm) adjusted for how hard that unit usually is.
// Uncertainty combines item-to-item noise with a drift in the student's level
// that grows with time from today, and is wider on the downside, mirroring the
// model's asymmetric calibration. The final exam, the heaviest item, adds the
// biggest jump in both the grade and the range.

export interface GradePoint {
  date: string; // ISO date the item was graded
  item: string; // e.g. "Unit 3 · Problem set (late)", "Midterm"
  topic?: string; // unit topic
  graded: number; // % of the course graded by this date (0–100)
  actual?: number; // cumulative grade, % of course points (real data); unrounded,
  // so the chart can round once after converting to an average
  p10?: number; // pessimistic projection
  p50?: number; // realistic projection
  p90?: number; // optimistic projection
}

type Kind = 'Homework' | 'Problem set' | 'Lab';
const WEIGHT: Record<Kind, number> = { Homework: 1.5, 'Problem set': 1.5, Lab: 3 };
const MIDTERM_WEIGHT = 15;
const FINAL_WEIGHT = 25;

const UNITS = [
  { unit: 1, topic: 'Kinematics', due: ['2025-09-08', '2025-09-15', '2025-09-22'], difficulty: 0.0 },
  { unit: 2, topic: 'Forces', due: ['2025-09-29', '2025-10-06', '2025-10-13'], difficulty: -0.02 },
  { unit: 3, topic: 'Work & energy', due: ['2025-10-20', '2025-10-27', '2025-11-03'], difficulty: 0.01 },
  { unit: 4, topic: 'Momentum', due: ['2025-11-10', '2025-11-17', '2025-12-01'], difficulty: -0.03 }, // Thanksgiving week off
  { unit: 5, topic: 'Rotation', due: ['2025-12-08', '2025-12-15', '2026-01-08'], difficulty: -0.08 }, // winter break
  { unit: 6, topic: 'Gravitation', due: ['2026-01-26', '2026-02-02', '2026-02-09'], difficulty: 0.04 },
  { unit: 7, topic: 'Oscillations & waves', due: ['2026-02-17', '2026-02-24', '2026-03-03'], difficulty: 0.0 },
  { unit: 8, topic: 'Electrostatics', due: ['2026-03-11', '2026-03-18', '2026-03-27'], difficulty: -0.06 }, // spring break after
  { unit: 9, topic: 'Circuits', due: ['2026-04-13', '2026-04-20', '2026-04-27'], difficulty: -0.02 },
  { unit: 10, topic: 'Magnetism', due: ['2026-05-05', '2026-05-12', '2026-05-22'], difficulty: -0.05 },
];
const KINDS: Kind[] = ['Homework', 'Problem set', 'Lab'];
const MIDTERM_DATE = '2026-01-16';
const FINAL_DATE = '2026-06-05';

// Actual scores through the midterm (fraction of each item's points).
const ACTUAL: Record<number, [number, number, number]> = {
  1: [0.92, 0.88, 0.9],
  2: [0.85, 0.8, 0.86],
  3: [0.9, 0, 0.84], // problem set missed on its due date (see LATE)
  4: [0.78, 0.72, 0.8],
  5: [0.66, 0.61, 0.74],
};
const LATE = { unit: 3, kind: 'Problem set' as Kind, date: '2025-11-06', score: 0.75 }; // late, capped
const MIDTERM_SCORE = 0.73;

// Graded events up to and including the midterm, in date order.
// `weight` is the course weight newly graded by the event. A missed item is
// graded (weight counts, 0 points); its late submission adds points but no weight.
type Event = { date: string; item: string; topic?: string; points: number; weight: number };
const events: Event[] = [];
for (const u of UNITS.filter((u) => u.unit <= 5)) {
  KINDS.forEach((kind, k) => {
    const score = ACTUAL[u.unit][k];
    const missed = u.unit === LATE.unit && kind === LATE.kind;
    events.push({
      date: u.due[k],
      item: `Unit ${u.unit} · ${kind}${missed ? ' (missed)' : ''}`,
      topic: u.topic,
      points: WEIGHT[kind] * score,
      weight: WEIGHT[kind],
    });
  });
}
events.push({ date: LATE.date, item: `Unit ${LATE.unit} · ${LATE.kind} (late)`, topic: UNITS[LATE.unit - 1].topic, points: WEIGHT[LATE.kind] * LATE.score, weight: 0 });
events.push({ date: MIDTERM_DATE, item: 'Midterm', points: MIDTERM_WEIGHT * MIDTERM_SCORE, weight: MIDTERM_WEIGHT });
events.sort((a, b) => a.date.localeCompare(b.date));

const points: GradePoint[] = [{ date: '2025-09-02', item: 'Course start', graded: 0, actual: 0 }];
let cumulative = 0;
let graded = 0;
for (const e of events) {
  cumulative += e.points;
  graded += e.weight;
  points.push({ date: e.date, item: e.item, topic: e.topic, graded, actual: cumulative });
}

// Projections start from today's actual value so the dashed lines join the solid one.
const today = points[points.length - 1];
today.p10 = today.p50 = today.p90 = today.actual;

// The student's recent level: last two units' assignments plus the midterm.
const recent = [4, 5].flatMap((unit) => KINDS.map((kind, k) => ({ w: WEIGHT[kind], s: ACTUAL[unit][k] })));
recent.push({ w: MIDTERM_WEIGHT, s: MIDTERM_SCORE });
const level = recent.reduce((a, r) => a + r.w * r.s, 0) / recent.reduce((a, r) => a + r.w, 0);

const ITEM_SD = 0.12; // spread of a single item's score
const DRIFT_SD_PER_SQRT_WEEK = 0.015; // the student's level can move as time passes
const Z = 1.2816; // p90 / p10 of a normal distribution
const UP = 0.85; // asymmetric calibration: narrower above...
const DOWN = 1.25; // ...wider below

const remaining = [
  ...UNITS.filter((u) => u.unit > 5).flatMap((u) =>
    KINDS.map((kind, k) => ({ date: u.due[k], item: `Unit ${u.unit} · ${kind}`, topic: u.topic, w: WEIGHT[kind], expected: level + u.difficulty })),
  ),
  { date: FINAL_DATE, item: 'Final', topic: undefined, w: FINAL_WEIGHT, expected: level - 0.01 },
];

let p50 = cumulative;
let itemVariance = 0;
let weightSoFar = 0;
for (const r of remaining) {
  p50 += r.w * r.expected;
  itemVariance += (r.w * ITEM_SD) ** 2;
  weightSoFar += r.w;
  const weeks = (Date.parse(r.date) - Date.parse(MIDTERM_DATE)) / (7 * 86400000);
  const drift = DRIFT_SD_PER_SQRT_WEEK * Math.sqrt(weeks) * weightSoFar;
  const sd = Math.sqrt(itemVariance + drift ** 2);
  points.push({
    date: r.date,
    item: r.item,
    topic: r.topic,
    graded: graded + weightSoFar,
    p50,
    p90: p50 + Z * sd * UP,
    p10: p50 - Z * sd * DOWN,
  });
}

export const gradeProjection = points;
export const todayDate = MIDTERM_DATE;
