import { Kysely } from "kysely";
import { Resolvers } from "../types/types";

export const resolvers: Resolvers = {
  Query: {
    test: () => Promise.resolve('hello world!'),
  },
  Mutation: {
    testMutation: (root, args, context) => {
      return {
        message: `Echo ${args.testInput}`,
      };
    },
    addTeeTimeChange: async (root, args, context) => {
      const { courseName } = args;
      const { db } = context;

      const result = await db.insertInto('tee_time_changes')
        .values({
          course: courseName,
          reservation_date: '7/29/2023',
          reservation_time: '9:00',
          reservation_day_of_week: 'Saturday',
          update_date_time: '7/29/2023',
          players_available: 4,
          price_dollars: 50
        })
        .executeTakeFirst();

      console.log(result);

      return {
        courseName,
      }
    }
  }
};