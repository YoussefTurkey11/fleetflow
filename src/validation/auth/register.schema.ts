import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be less than 30 characters"),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;
