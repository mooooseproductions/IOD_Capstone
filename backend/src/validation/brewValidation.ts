import { z } from "zod";

export const brewSchema = z.object({
    name: z.string().trim().min(1, "Brew name is required"),

    status: z
        .enum(["planning", "brewing", "fermenting", "finished"])
        .optional(),

    styleId: z.coerce.number().int().positive().optional(),

    batchSize: z.coerce
        .number()
        .positive("Batch size must be greater than zero"),
    
    batchUnit: z.string().trim(),

    temperature: z.coerce.number().positive().optional(),

    temperatureUnit: z.string().optional(),

    originalGravity: z.preprocess(
        (value) => value === "" || value === null ? undefined : value,

        z.coerce
            .number()
            .min(0.9)
            .max(2)
            .optional()
    ),

    finalGravity: z.preprocess(
        (value) => value === "" || value === null ? undefined : value,

        z.coerce
            .number()
            .min(0.9)
            .max(2)
            .optional()
    ),

    ingredients: z.array(
        z.object({
            name: z.string().trim().min(1, "Ingredient name is required"),
            type: z.string().trim().min(1, "Ingredient type is required"),
            timing: z.string().trim().min(1, "Timing is required"),
            amount: z.coerce
                .number()
                .positive("Ingredient amount must be greater than zero"),
            unit: z.enum(["g", "kg", "ml", "l", "oz", "lb", "fl_oz", "gal"])
        })
    ).min(1, "At least one ingredient is required"),

    notes: z.array(
        z.object({
            content: z.string().trim().min(1, "Note cannot be empty")
        })
    ).optional()
});

export type CreateBrewInput = z.infer<typeof brewSchema>;