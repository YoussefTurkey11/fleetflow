import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Email invalid"),
});

export type UserFormSchema = z.infer<typeof userSchema>;
