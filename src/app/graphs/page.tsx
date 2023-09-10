'use client'

import { useEffect } from 'react';
import styles from './page.module.css'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { TeeTimeChangesForGraphQuery, TeeTimeChangesForGraphQueryVariables } from "@/graphql/types/types";

const teeTimeChangesForGraph = gql(`
  query teeTimeChangesForGraph($input: TeeTimeChangesInput!) {
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

const getData = async () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://golf.local:4000', fetch }),
    cache: new InMemoryCache(),
  });

  const existingTeeTimes = (await client.query<TeeTimeChangesForGraphQuery, TeeTimeChangesForGraphQueryVariables>({
    query: teeTimeChangesForGraph,
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        minReservationDate: '2023-09-06',
        maxReservationDate: '2023-09-06',
      }
    }
  })).data.teeTimeChanges.teeTimeChanges;

  const byTime: { [time: string]: ((typeof existingTeeTimes)[0])[]} = {};

  existingTeeTimes.forEach((time) => {
    if (byTime[time.reservationTime] === undefined) {
      byTime[time.reservationTime] = [time];
    } else {
      byTime[time.reservationTime].push(time);
    }
  });

  console.log(byTime);
  console.log(existingTeeTimes.filter((teeTime) => teeTime.playersAvailable === 0));
}

export default function Graphs() {
  console.log('Graphs');

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%" minHeight={600}>
          <BarChart width={800} height={600} data={[ { name: 'Monday', value: '3' }, { name: 'Tuesday', value: '5' }, { name: 'Wednesday', value: '6' } ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit=" hr" />
            <Tooltip />
            <Bar dataKey="value" fill="#A7CDBD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}
