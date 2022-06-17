import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/typedef
export const env = z
  .object({
    LOKI_URL: z.string().optional(),
    LOKI_BASIC_AUTH: z.string().optional(),
  })
  .parse(process.env);
