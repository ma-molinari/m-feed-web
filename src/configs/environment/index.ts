import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url(`NEXT_PUBLIC_API_URL must be a valid URL`),
  NEXT_PUBLIC_WEB_URL: z
    .union([z.string().url(), z.literal(``)])
    .optional()
    .transform((v) => v ?? ``),
  NEXT_PUBLIC_IMAGE_URL: z
    .string()
    .url(`NEXT_PUBLIC_IMAGE_URL must be a valid URL`),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
});

if (!parsed.success) {
  const err = parsed.error.flatten().fieldErrors;
  throw new Error(
    `Invalid client environment variables: ${JSON.stringify(err)}`,
  );
}

const env = parsed.data;

export const API_URL = env.NEXT_PUBLIC_API_URL;
export const WEB_URL = env.NEXT_PUBLIC_WEB_URL;
export const IMAGE_URL = env.NEXT_PUBLIC_IMAGE_URL;
