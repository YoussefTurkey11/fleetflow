import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "This field is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be less than 30 characters"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
