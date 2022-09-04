import { z } from 'zod';

export const dbEnv = z
  .object({
    POSTGRES_URL: z
      .string()
      .default('postgres://postgres:postgres@localhost:5432/postgres'),
  })
  .parse(process.env);
