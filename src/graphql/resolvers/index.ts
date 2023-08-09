import { DayOfWeek, Resolvers } from "../types/types";

export const resolvers: Resolvers = {
  Query: {
    test: () => Promise.resolve('hello world!'),
    teeTimeChanges: async (root, args, context) => {
      const { minReservationTime, maxReservationTime } = args.input;
      const { db } = context;

      let query = db.selectFrom('tee_time_changes')
        .selectAll();

      if (minReservationTime) {
        query = query.where('reservation_time', '>=', minReservationTime);
      }
      if (maxReservationTime) {
        query = query.where('reservation_time', '<=', maxReservationTime);
      }

      const result = await query.execute();


      return {
        teeTimeChanges: result.map(({id, course, price_dollars, reservation_date, reservation_day_of_week, reservation_time, players_available, update_date_time}) => ({
          id: id,
          courseName: course,
          priceDollars: price_dollars,
          reservationDate: reservation_date,
          reservationDayOfWeek: reservation_day_of_week as DayOfWeek,
          reservationTime: reservation_time,
          playersAvailable: players_available,
          updateDateTime: update_date_time,
        }))
      };
    }
  },
  Mutation: {
    testMutation: (root, args, context) => {
      return {
        message: `Echo ${args.testInput}`,
      };
    },
    addTeeTimeChange: async (root, args, context) => {
      const { 
        courseName, 
        reservationDate, 
        reservationTime, 
        reservationDayOfWeek, 
        priceDollars, 
        playersAvailable 
      } = args.input;
      const { db } = context;

      const result = await db.insertInto('tee_time_changes')
        .values({
          course: courseName,
          reservation_date: reservationDate,
          reservation_time: reservationTime,
          reservation_day_of_week: reservationDayOfWeek,
          players_available: playersAvailable,
          price_dollars: priceDollars
        })
        .executeTakeFirst();

      console.log(result);

      return {
        courseName,
      }
    }
  }
};