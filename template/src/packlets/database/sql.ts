import postgres from 'postgres';
import { dbEnv } from './env';

export const sql: postgres.Sql<{}> = postgres({
  user: dbEnv.POSTGRES_USER,
  password: dbEnv.POSTGRES_PASSWORD,
  hostname: dbEnv.POSTGRES_HOSTNAME,
  port: dbEnv.POSTGRES_PORT,
  database: dbEnv.POSTGRES_DATABASE,
});
