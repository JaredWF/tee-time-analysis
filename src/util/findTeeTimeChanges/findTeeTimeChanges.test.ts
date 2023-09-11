import { findTeeTimeChanges, reduceToLowestPlayerCount, selectLastAddedTeeTimes, sortTeeTimes } from "./findTeeTimeChanges";

describe('sortTeeTimes', () => {
  test('handles all different days', () => {
    const input = [
      { reservationDate: '2023-08-20', reservationTime: '08:00:00' },
      { reservationDate: '2023-08-22', reservationTime: '08:00:00' },
      { reservationDate: '2023-08-21', reservationTime: '08:00:00' },
    ];
    expect(sortTeeTimes(input)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '08:00:00' },
      { reservationDate: '2023-08-21', reservationTime: '08:00:00' },
      { reservationDate: '2023-08-22', reservationTime: '08:00:00' },
    ]);
  });
  
  test('handles all different times', () => {
    const input = [
      { reservationDate: '2023-08-20', reservationTime: '10:00:00' },
      { reservationDate: '2023-08-20', reservationTime: '09:55:00' },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00' },
    ];
    expect(sortTeeTimes(input)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '09:55:00' },
      { reservationDate: '2023-08-20', reservationTime: '10:00:00' },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00' },
    ]);
  });
  
  test('handles a mix of dates and times', () => {
    const input = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00' },
      { reservationDate: '2023-08-20', reservationTime: '10:00:00' },
      { reservationDate: '2023-08-21', reservationTime: '09:55:00' },
    ];
    expect(sortTeeTimes(input)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:00:00' },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00' },
      { reservationDate: '2023-08-21', reservationTime: '09:55:00' },
    ]);
  });
});


describe('reduceToLowestPlayerCount', () => {
  test('returns min player count for each tee time', () => {
    const input = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 4 },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 4 },
    ];
    expect(reduceToLowestPlayerCount(input)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
    ]);
  });
});


describe('selectLastAddedTeeTimes', () => {
  test('returns the tee times that were added last', () => {
    const input = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 2, updateDateTime: '2023-08-20 03:59:49' },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 4, updateDateTime: '2023-08-20 03:57:49' },
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1, updateDateTime: '2023-08-20 03:58:49' },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2, updateDateTime: '2023-08-21 05:35:49' },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 4, updateDateTime: '2023-08-21 05:32:49' },
    ];
    expect(selectLastAddedTeeTimes(input)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 2, updateDateTime: '2023-08-20 03:59:49' },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2, updateDateTime: '2023-08-21 05:35:49' },
    ]);
  });
});



describe('findTeeTimeChanges', () => {
  test('finds when player count changes and ignores tee times with the same player count', () => {
    const existingTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '13:10:00', playersAvailable: 4 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 0 },
    ];
    const newTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 2 },
    ];
    expect(findTeeTimeChanges(existingTeeTimes, newTeeTimes)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '13:10:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 2 },
    ]);
  });

  test('adds all tee times when no existing tee times exist', () => {
    const existingTeeTimes: any[] = [];
    const newTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 2 },
    ];
    expect(findTeeTimeChanges(existingTeeTimes, newTeeTimes)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 2 },
    ]);
  });

  test('adds 0 player tee times when no tee times exist', () => {
    const existingTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 1 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 2 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 2 },
    ];
    const newTeeTimes: any[] = [];
    expect(findTeeTimeChanges(existingTeeTimes, newTeeTimes)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 0 },
    ]);
  });

  test('handles adding a tee time where new tee time is after existing tee time', () => {
    const existingTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 0 },
    ];
    const newTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:35:00', playersAvailable: 1 },
    ];
    expect(findTeeTimeChanges(existingTeeTimes, newTeeTimes)).toEqual([
      { reservationDate: '2023-08-20', reservationTime: '10:35:00', playersAvailable: 1 },
    ]);
  });

  test('Does not add duplicate 0 count existing tee times', () => {
    const existingTeeTimes = [
      { reservationDate: '2023-08-20', reservationTime: '10:30:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '12:50:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '13:10:00', playersAvailable: 0 },
      { reservationDate: '2023-08-20', reservationTime: '14:20:00', playersAvailable: 0 },
    ];
    expect(findTeeTimeChanges(existingTeeTimes, [])).toEqual([]);
  });
});