'use client'

import styles from './page.module.css'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

export default function Graphs() {
  console.log('Graphs');

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
