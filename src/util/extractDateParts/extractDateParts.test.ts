import { DayOfWeek } from "@/graphql/types/types";
import { extractDateParts } from "./extractDateParts";

test('works for times early in the day', () => {
  expect(extractDateParts('2023-08-20T03:18:00.000Z')).toEqual({
    date: '2023-08-20',
    time: '03:18:00',
    dayOfWeek: DayOfWeek.Sunday,
  });
});

test('works for times mid day', () => {
  expect(extractDateParts('2023-08-20T13:27:00.000Z')).toEqual({
    date: '2023-08-20',
    time: '13:27:00',
    dayOfWeek: DayOfWeek.Sunday,
  });
});

test('works for times late in day', () => {
  expect(extractDateParts('2023-08-25T21:58:00.000Z')).toEqual({
    date: '2023-08-25',
    time: '21:58:00',
    dayOfWeek: DayOfWeek.Friday,
  });
});