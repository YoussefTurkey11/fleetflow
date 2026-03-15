import { z } from "zod";

export const addTruckScheme = z.object({
  FuelPerMile: z.string().min(1, "This field is required"),
  TotalMileage: z.string().min(1, "This field is required"),
  Available: z.boolean(),
});

export type AddTruckFormSchema = z.infer<typeof addTruckScheme>;
