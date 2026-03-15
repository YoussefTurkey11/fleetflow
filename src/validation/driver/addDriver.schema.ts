import { z } from "zod";

export const addDriverScheme = z.object({
  DriverDetails: z.string().min(1, "This field is required"),
  PhoneNumber: z.string().min(1, "This field is required"),
  License: z.string().min(1, "This field is required"),
  PricePerMile: z.string().min(1, "This field is required"),
  HireDate: z.string().min(1, "This field is required"),
  Available: z.boolean(),
});

export type AddDriverFormSchema = z.infer<typeof addDriverScheme>;
