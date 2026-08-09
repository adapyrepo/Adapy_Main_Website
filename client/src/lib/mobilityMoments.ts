// Single source of truth for the "Mobility Moments" counter.
// Starts at 244,264 on Aug 9, 2026 and increases by 15 per day.
// Deterministic from the clock, so it is monotonic — it only ever goes up.

const BASE_COUNT = 244_264;
const BASE_DATE = Date.UTC(2026, 7, 9); // August 9, 2026
const DAILY_INCREMENT = 15;
const MS_PER_DAY = 86_400_000;

export function computeMomentCount(now: number): number {
  const elapsed = Math.max(0, now - BASE_DATE);
  const wholeDays = Math.floor(elapsed / MS_PER_DAY);
  // Accumulate today's +15 smoothly across the day (still monotonic).
  const todayFraction = (elapsed % MS_PER_DAY) / MS_PER_DAY;
  return BASE_COUNT + wholeDays * DAILY_INCREMENT + Math.floor(DAILY_INCREMENT * todayFraction);
}
