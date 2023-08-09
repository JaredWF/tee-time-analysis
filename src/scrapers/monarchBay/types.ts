export type APIResponse = {
  auth_token: string;
  summary: {
    availability: any;
  }
  tee_time_groups: TeeTimeGroup[];
};

type TeeTimeGroup = {
  amenity_codes: string[];
  currency: string;
  full_amenities: any[];
  hot_deals: boolean;
  max_member_rate: number;
  max_regular_rate: number;
  min_member_rate: number;
  players: number[];
  rate_types: string[];
  rates_available_count: number;
  starting_rate: number;
  symbol: string;
  tee_off_at_local: string; //"2023-08-12T12:09:00.000Z"
  tee_times_ids: number[];
};