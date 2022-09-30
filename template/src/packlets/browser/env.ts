import { z } from 'zod';

export const browserEnv = z
  .object({
    CHROME_PATH: z.string().optional(),

    CAPTCHA_PROVIDER_ID: z.string().default('2captcha'),
    /**
     * The 2captcha API key
     */
    CAPTCHA_PROVIDER_KEY: z
      .string()
      .optional()
      .default('52dcb47b063c981a87fdcb24414f0929'),

    CONTAINER_PRIVILEGED: z
      .string()
      .transform((v) => v === 'true')
      .optional(),
    CONTAINER_DEV_SHM_ENABLED: z
      .string()
      .transform((v) => v === 'true')
      .optional(),
  })
  .parse(process.env);
