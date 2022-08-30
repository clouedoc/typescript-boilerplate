import { z } from 'zod';

export const dbEnv = z
  .object({
    POSTGRES_USER: z.string().default('postgres'),
    POSTGRES_PASSWORD: z.string().optional(),
    POSTGRES_HOSTNAME: z.string().default('localhost'),
    POSTGRES_DATABASE: z.string().default('postgres'),
    POSTGRES_PORT: z
      .string()
      .transform((v) => parseInt(v, 10))
      .default('5432'),
  })
  .parse(process.env);
