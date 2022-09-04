import postgres from 'postgres';
import { dbEnv } from './env';

export const sql: postgres.Sql<{}> = postgres(dbEnv.POSTGRES_URL, {
  prepare: false, // note: this is needed when using pgBouncer in 'transaction' mode
  types: {
    bigint: postgres.BigInt,
  },
});
