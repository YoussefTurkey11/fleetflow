"use client";
import FieldInputForm from "@/components/shared/FieldInputForm";
import { Button } from "@/components/ui/button";
import { useResetPasswordService } from "@/services/auth/resetPassword.service";
import {
  ResetPasswordFormSchema,
  resetPasswordSchema,
} from "@/validation/auth/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const { resetPassword } = useResetPasswordService();
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get("code");

  if (!codeFromUrl) {
    return (
      <div className="text-center text-red-600 p-8">
        <h2 className="text-2xl font-bold mb-4">
          Invalid or missing reset code
        </h2>
        <p>Please use the link sent to your email.</p>
        <Button onClick={() => router.push("/forgotPassword")} className="mt-6">
          Request new reset link
        </Button>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      code: codeFromUrl,
    },
  });

  const onSubmit = async (data: ResetPasswordFormSchema & { code: string }) => {
    try {
      await resetPassword({
        ...data,
        code: codeFromUrl,
      });
      return router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-ring/30 rounded-lg p-7 space-y-5"
    >
      <FieldInputForm
        label="New Password"
        id="password"
        type="password"
        placeholder="Enter New Password"
        register={register}
        errors={errors}
      />

      <FieldInputForm
        label="Confirm Password"
        id="passwordConfirmation"
        type="password"
        placeholder="Confirm Your New Password"
        register={register}
        errors={errors}
      />

      <Button type="submit" className={"w-full"} disabled={isSubmitting}>
        Create
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
