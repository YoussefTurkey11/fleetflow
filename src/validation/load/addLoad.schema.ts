import { z } from "zod";

export const addLoadScheme = z.object({
  Route: z.string().min(1, "This field is required"),
  Distance: z.string().min(1, "This field is required"),
  PricePerMile: z.string().min(1, "This field is required"),
  Total: z.string().min(1, "This field is required"),
  driver: z.number().min(1),
  truck: z.number().min(1),
  Available: z.boolean(),
});

export type AddLoadFormSchema = z.infer<typeof addLoadScheme>;
