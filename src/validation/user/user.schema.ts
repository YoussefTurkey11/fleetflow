import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Email invalid"),
  Phone: z.string().optional(),
  confirmed: z.boolean().optional(),
  blocked: z.boolean().optional(),
});

export type UserFormSchema = z.infer<typeof userSchema>;
