import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    code: z.string().min(1, "Reset code is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
