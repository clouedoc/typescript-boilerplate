import { z } from 'zod';

export const browserEnv = z
  .object({
    CHROME_PATH: z.string().optional(),
  })
  .parse(process.env);
