import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(2),
  handle: z
    .string()
    .trim()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().trim().email(),
  password: z.string().min(6),
});