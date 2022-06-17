import { z } from 'zod';

export const env = z
  .object({
    // add your environment variables here
  })
  .parse(process.env);
