/**
 * @param daysInFuture Integer days from now. Today would be 0.
 * @returns The date formatted as YYYY-MM-DD
 */
export function futureDay(daysInFuture: number) {
  let date = new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000) + (daysInFuture*1000*60*60*24));
  return date.toISOString().split('T')[0];
}
