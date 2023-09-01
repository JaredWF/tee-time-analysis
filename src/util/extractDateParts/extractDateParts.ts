import { DayOfWeek } from "@/graphql/types/types";

/**
 * @param dateString date formatted as 2023-08-20T12:18:00.000Z
 */
export function extractDateParts(dateString: string) {
  // Need to shift our current timezone offset because getDay()
  // will return day in UTC
  let teeOffDate = new Date(dateString);
  const timezoneOffset = teeOffDate.getTimezoneOffset() * 60000;
  teeOffDate = new Date(teeOffDate.getTime() + timezoneOffset);

  const [date, time] = dateString.split('T');
  const cleanedTime = time.split('.')[0];

  return {
    date: date,
    time: cleanedTime,
    dayOfWeek: dayOfWeekConversion[teeOffDate.getDay()],
  };
}

const dayOfWeekConversion = [
  DayOfWeek.Sunday, 
  DayOfWeek.Monday, 
  DayOfWeek.Tuesday, 
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday
];