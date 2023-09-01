import { monarchBayScraper } from "./monarchBay";

import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";
import { futureDay } from "@/util";
import { findTeeTimeChanges, selectLastAddedTeeTimes, sortTeeTimes } from "@/util/findTeeTimeChanges";
import { AddTeeTimeChangesMutation, AddTeeTimeChangesMutationVariables, TeeTimeChangesByDateQuery, TeeTimeChangesByDateQueryVariables } from "@/graphql/types/types";


const teeTimeChangesByDateQuery = gql(`
  query teeTimeChangesByDate($input: TeeTimeChangesInput!) {
    teeTimeChanges(input: $input) {
      teeTimeChanges {
        priceDollars
        playersAvailable
        reservationTime
        courseName
        reservationDate
        reservationDayOfWeek
        updateDateTime
      }
    }
  }
`);

const addTeeTimeChanges = gql`
  mutation addTeeTimeChanges($teeTimes: [AddTeeTimeInput!]!) {
    addTeeTimeChanges(teeTimes: $teeTimes) { 
      id
    }
  }
`;


async function scrape() {
  await waitSeconds(30);

  const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000', fetch }),
    cache: new InMemoryCache(),
  });

  while (true) {
    for (let i = 0; i < 30; i++) {
      await waitSeconds(1); // To avoid throttling
      const date = futureDay(i);
      const teeTimes = await monarchBayScraper(date);

      console.log(`TEE TIMES for ${date}: ${teeTimes.length}`);

      if (teeTimes.length === 0 && i > 5) {
        break; // Early terminate because the tee time site probably doesn't let you book this far in advance
      }

      const existingTeeTimes = (await client.query<TeeTimeChangesByDateQuery, TeeTimeChangesByDateQueryVariables>({
        query: teeTimeChangesByDateQuery,
        fetchPolicy: 'no-cache',
        variables: {
          input: {
            minReservationDate: date,
            maxReservationDate: date,
          }
        }
      })).data.teeTimeChanges.teeTimeChanges;

      console.log(`EXISTING TEE TIMES: ${existingTeeTimes.length}`);

      const sortedTeeTimes = sortTeeTimes(teeTimes);
      const sortedExistingTeeTimes = sortTeeTimes(existingTeeTimes);
      const dedupedExistingTeeTimes = selectLastAddedTeeTimes(sortedExistingTeeTimes);

      const teeTimeChanges = findTeeTimeChanges(dedupedExistingTeeTimes, sortedTeeTimes);

      console.log(`TEE TIME CHANGES: ${teeTimeChanges.length}`);

      const result = await client.mutate<AddTeeTimeChangesMutation, AddTeeTimeChangesMutationVariables>({
        mutation: addTeeTimeChanges,
        fetchPolicy: 'no-cache',
        variables: {
          teeTimes: teeTimeChanges.map((teeTime) => ({
            priceDollars: teeTime.priceDollars,
            playersAvailable: teeTime.playersAvailable,
            reservationDate: teeTime.reservationDate,
            reservationDayOfWeek: teeTime.reservationDayOfWeek,
            reservationTime: teeTime.reservationTime,
            courseName: teeTime.courseName,
          })),
        },
      });
    }

    await waitSeconds(300); // 5 min polling interval should be good enough resolution
  }
}

async function waitSeconds(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

try {
  scrape();
} catch (e) {
  console.log(e);
}