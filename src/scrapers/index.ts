import { MutationAddTeeTimeChangeArgs, TeeTimeChangeResponse } from "@/graphql/types/types";
import { monarchBayScraper } from "./monarchBay";

import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

function futureDay(daysInFuture: number) {
  let date = new Date()
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000) + (daysInFuture*1000*60*60*24));
  return date.toISOString().split('T')[0];
}

async function scrape() {
  const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000', fetch }),
    cache: new InMemoryCache(),
  });

  for (let i = 0; i < 2; i++) {
    const teeTimes = await monarchBayScraper(futureDay(i))
    console.log(teeTimes);
    teeTimes.forEach((teeTime) => {
      client.mutate<TeeTimeChangeResponse, MutationAddTeeTimeChangeArgs>({
        mutation: gql`
          mutation addTeeTimeChange($input: AddTeeTimeInput!) {
            addTeeTimeChange(input: $input) {
              courseName
            }
          }
        `,
        variables: {
          input: {
            ...teeTime
          }
        }
      })
      .then(result => console.log(result));
    })
  }
}

scrape();