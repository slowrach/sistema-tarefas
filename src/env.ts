import { z } from "zod"

const envSchema = z.object({
   DATABASE_URL: z.string().url(),
   JWT_SECRET: z.string(),
   PORT: z.coerce.number().default(3333),
   ADMIN_EMAIL: z.string().email(),
   ADMIN_PASSWORD: z.string()
})

export const env = envSchema.parse(process.env)