"use client";
import FieldInputForm from "@/components/shared/FieldInputForm";
import { Button } from "@/components/ui/button";
import { useForgotPasswordService } from "@/services/auth/forgotPassword.service";
import {
  ForgotPasswordFormSchema,
  forgotPasswordSchema,
} from "@/validation/auth/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const { emailUser } = useForgotPasswordService();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    try {
      await emailUser(data);
      return toast.success("Please check your email!");
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
        label="email"
        id="email"
        type="email"
        placeholder="Enter Email"
        register={register}
        errors={errors}
      />

      <Button type="submit" className={"w-full"} disabled={isSubmitting}>
        Send Code
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
