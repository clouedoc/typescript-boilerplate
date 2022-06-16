import { z } from 'zod';

export const env = z
  .object({
    LOKI_URL: z.string().optional(),
    LOKI_BASIC_AUTH: z.string().optional(),
  })
  .parse(process.env);
