import { DayOfWeek, Resolvers } from "../types/types";

export const resolvers: Resolvers = {
  Query: {
    test: () => Promise.resolve('hello world!'),
    teeTimeChanges: async (root, args, context) => {
      const { 
        minReservationTime, 
        maxReservationTime, 
        reservationDayOfWeek, 
        minReservationDate,
        maxReservationDate,
        courseName
      } = args.input;
      const { db } = context;

      let query = db.selectFrom('tee_time_changes')
        .selectAll();

      if (minReservationTime) {
        query = query.where('reservation_time', '>=', minReservationTime);
      }
      if (maxReservationTime) {
        query = query.where('reservation_time', '<=', maxReservationTime);
      }
      if (reservationDayOfWeek) {
        query = query.where('reservation_day_of_week', '==', reservationDayOfWeek);
      }
      if (minReservationDate) {
        query = query.where('reservation_date', '>=', minReservationDate);
      }
      if (maxReservationDate) {
        query = query.where('reservation_date', '<=', maxReservationDate);
      }
      if (courseName) {
        query = query.where('course', '==', courseName);
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
    addTeeTimeChanges: async (root, args, context) => {
      if (args.teeTimes.length === 0) {
        return [];
      }

      const { db } = context;

      const result = await db.insertInto('tee_time_changes')
        .values(args.teeTimes.map(({ 
          courseName, 
          reservationDate, 
          reservationTime, 
          reservationDayOfWeek, 
          priceDollars, 
          playersAvailable 
        }) => ({
          course: courseName,
          reservation_date: reservationDate,
          reservation_time: reservationTime,
          reservation_day_of_week: dayOfWeekStringToEnum(reservationDayOfWeek),
          players_available: playersAvailable,
          price_dollars: priceDollars
        })))
        .returningAll()
        .execute();

      return result.map((res) => ({
        id: res.id,
        courseName: res.course,
        priceDollars: res.price_dollars,
        reservationDate: res.reservation_date,
        reservationDayOfWeek: res.reservation_day_of_week as DayOfWeek,
        reservationTime: res.reservation_time,
        playersAvailable: res.players_available,
        updateDateTime: res.update_date_time,
      }));
    }
  }
};

function dayOfWeekStringToEnum(dayOfWeek: string): DayOfWeek {
  switch (dayOfWeek) {
    case 'MONDAY':
      return DayOfWeek.Monday;
    case 'TUESDAY':
      return DayOfWeek.Tuesday;
    case 'WEDNESDAY':
      return DayOfWeek.Wednesday;
    case 'THURSDAY':
      return DayOfWeek.Thursday;
    case 'FRIDAY':
      return DayOfWeek.Friday;
    case 'SATURDAY':
      return DayOfWeek.Saturday;
    case 'SUNDAY':
      return DayOfWeek.Sunday;
    default: 
      return DayOfWeek.Monday;
  }
}

const dayOfWeekConversion = [
  DayOfWeek.Sunday, 
  DayOfWeek.Monday, 
  DayOfWeek.Tuesday, 
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday
];