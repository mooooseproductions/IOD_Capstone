import { z } from "zod/v4";

export const createUserSchema = z.object({
    
});

export type CreateUserInput = z.infer<typeof createUserSchema>;