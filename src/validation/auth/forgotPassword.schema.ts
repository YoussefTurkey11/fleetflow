import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalid"),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;
