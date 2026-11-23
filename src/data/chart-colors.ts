// Colors for the project charts, shared by each full chart and its small
// preview on the project cards, so the two always match. Each has a light-mode
// and a dark-mode value. (The COVID chart's colors live with its series in
// covid.ts.)

// Subject grade projection: the actual line and the realistic projection are
// blue; optimistic is green and pessimistic red. Checked with the chart
// palette validator; the red/green pair relies on labels and position too.
export const gradeColors = {
  light: { actual: '#2a78d6', optimistic: '#008300', pessimistic: '#e34948' },
  dark: { actual: '#3987e5', optimistic: '#008300', pessimistic: '#e66767' },
};

// Felony murder split bars: the site's ink for White (the Felony Murder
// Reporting Project uses black) and the project's orange for Black.
export const felonyColors = {
  light: { base: '#0D0F10', compare: '#FF6752' },
  dark: { base: '#F2F0EF', compare: '#FF6752' },
};
