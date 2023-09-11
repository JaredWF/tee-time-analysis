
type TeeTime = {
  reservationDate: string;
  reservationTime: string;
};

/**
 * @param arr Array of objects containing 'reservationDate' and 'reservationTime'
 * @returns The input array sorted by earliest date/time first
 */
export function sortTeeTimes<T extends TeeTime>(arr: T[]) {
  return [...arr].sort((a, b) => {
    if (a.reservationDate < b.reservationDate) {
      return -1;
    }
    if (a.reservationDate > b.reservationDate) {
      return 1;
    }

    if (a.reservationTime < b.reservationTime) {
      return -1;
    }
    if (a.reservationTime > b.reservationTime) {
      return 1;
    }

    return 0;
  })
}

type PlayerCount = {
  playersAvailable: number;
};

/**
 * Merges duplicate tee times to a single tee time with the lowest player count
 * @param arr Array of tee times pre-sorted by reservation date/time
 */
export function reduceToLowestPlayerCount<T extends TeeTime & PlayerCount>(arr: T[]) {
  if (arr.length < 1) return [];

  const uniqueArr: T[] = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const last = uniqueArr.length - 1;
    if (uniqueArr[last].reservationDate === arr[i].reservationDate && uniqueArr[last].reservationTime === arr[i].reservationTime) {
      uniqueArr[last].playersAvailable = Math.min(uniqueArr[last].playersAvailable, arr[i].playersAvailable);
    } else {
      uniqueArr.push(arr[i]);
    }
  }

  return uniqueArr;
}

type UpdateTime = {
  updateDateTime: string;
};

/**
 * Returns the most recently updated tee time 
 * @param arr Array of tee times pre-sorted by reservation date/time
 */
export function selectLastAddedTeeTimes<T extends TeeTime & UpdateTime>(arr: T[]) {
  if (arr.length < 1) return [];

  const uniqueArr: T[] = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const last = uniqueArr.length - 1;
    const previousUpdateDate = new Date(uniqueArr[last].updateDateTime);
    const currDateTime = new Date(arr[i].updateDateTime);
    if (uniqueArr[last].reservationDate !== arr[i].reservationDate || uniqueArr[last].reservationTime !== arr[i].reservationTime) {
      uniqueArr.push(arr[i]);
    } else if (currDateTime > previousUpdateDate) {
      // console.log('replacing with last added');
      // console.log(uniqueArr[last]);
      // console.log(arr[i]);
      uniqueArr[last] = arr[i];
    }
  }

  return uniqueArr;
}

/**
 * Finds which tee times need updates committed to the db.
 * Existing tee times and current tee times need to be sorted by reservation date/time
 */
export function findTeeTimeChanges<T extends TeeTime & PlayerCount, U extends TeeTime & PlayerCount>(existingTeeTimes: T[], currentTeeTimes: U[]) {
  const out: (T|U)[] = [];
  let i0 = 0;
  let i1 = 0;

  while (i0 < existingTeeTimes.length && i1 < currentTeeTimes.length) {
    const t0 = existingTeeTimes[i0];
    const t1 = currentTeeTimes[i1];

    if (t0.reservationDate === t1.reservationDate && t0.reservationTime === t1.reservationTime) {
      if (t0.playersAvailable !== t1.playersAvailable) {
        out.push(t1);
      }
      i0++;
      i1++;
    } else if (t1.reservationDate < t0.reservationDate || (t1.reservationDate === t0.reservationDate && t1.reservationTime < t0.reservationTime)) {
      out.push(t1);
      i1++;
    } else {
      if (t0.playersAvailable > 0) {
        out.push({ ...t0, playersAvailable: 0 });
      }
      i0++;
    }
  }

  if (i0 < existingTeeTimes.length) {
    out.push(...(existingTeeTimes.slice(i0).filter((teeTime) => teeTime.playersAvailable > 0).map((teeTime) => ({ ...teeTime, playersAvailable: 0 }))));
  }

  if (i1 < currentTeeTimes.length) {
    out.push(...currentTeeTimes.slice(i1));
  }

  return out;
}