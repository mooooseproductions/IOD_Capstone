import { z } from 'zod';

export const userRegistrationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least two characters"),
    
    handle: z
        .string()
        .trim()
        .min(4, "Handle must contain at least four characters")
        .max(20, "Handle cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contains letters, numbers, and underscores"),
    
    email: z
        .string()
        .trim()
        .email("Enter a valid email address"),
    
    password: z
        .string()
        .min(6, "Password must contain at least six characters"),
});