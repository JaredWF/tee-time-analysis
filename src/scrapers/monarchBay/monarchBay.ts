import axios from 'axios';
import { Scraper } from '../types';
import { APIResponse } from './types';
import { extractDateParts } from '@/util';

const URL = 'https://sg-membership20-portalapi-production.azurewebsites.net/api/courses/reservations_group';
const STATIC_QUERY_PARAMS = {
  'allCartSelected': true,
  'allRatesSelected': true,
  'max_hour': 21,
  'max_price': 500,
  'min_hour': 5,
  'min_price': 0,
  'slug': 'monarch-bay-golf-club-lema-1st-tee-california-1',
  'programId': 37,
}

// Expects date in YYYY-MM-DD format
function buildQueryParams(date: string) {
  return {
    ...STATIC_QUERY_PARAMS,
    date
  }
}

function buildURL(queryObject: Record<any, any>) {
  return `${URL}?${new URLSearchParams(queryObject).toString()}`
}

export const monarchBayScraper: Scraper = async (date: string) => {
  const url = buildURL(buildQueryParams(date));
  const response = (await axios.get<APIResponse>(url)).data;

  return response.tee_time_groups.map(({ max_regular_rate, players, tee_off_at_local }) => { 
    const { date, time, dayOfWeek } = extractDateParts(tee_off_at_local);

    return({
      courseName: 'Monarch Bay',
      playersAvailable: Math.max(...players),
      priceDollars: max_regular_rate,
      reservationDate: date,
      reservationTime: time,
      reservationDayOfWeek: dayOfWeek,
    });
  });
};