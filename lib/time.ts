/**
 * Converts milliseconds into greater time units as possible
 * @param {int} ms - Amount of time measured in milliseconds
 * @return {Object} Reallocated time units. NULL on failure.
 * @todo Define return value with Typescript
 * @link  https://stackoverflow.com/a/68673714
 */
export function timeUnits(ms: number): {
  hours: number
  minutes: number
  seconds: number
} {
  let remainder = ms

  /**
   * Takes as many whole units from the time pool (ms) as possible
   * @param {int} msUnit - Size of a single unit in milliseconds
   * @return {int} Number of units taken from the time pool
   */
  const allocate = (msUnit: number): number => {
    const units = Math.trunc(remainder / msUnit)
    remainder -= units * msUnit
    return units
  }
  // Property order is important here.
  // These arguments are the respective units in ms.
  return {
    // weeks: (604800000), // Uncomment for weeks
    // days: allocate(86400000),
    hours: allocate(3600000),
    minutes: allocate(60000),
    seconds: allocate(1000),
    // ms: remainder, // remainder
  }
}
