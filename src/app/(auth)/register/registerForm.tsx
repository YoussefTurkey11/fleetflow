"use client";
import FieldInputForm from "@/components/shared/FieldInputForm";
import { Button } from "@/components/ui/button";
import { useRegisterService } from "@/services/auth/register.service";
import {
  RegisterFormSchema,
  registerSchema,
} from "@/validation/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { registerUser } = useRegisterService();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await registerUser(data);
      return router.push("/admin");
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
        label="username"
        id="username"
        type="text"
        placeholder="Enter your Username"
        register={register}
        errors={errors}
      />

      <FieldInputForm
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your Email"
        register={register}
        errors={errors}
      />

      <FieldInputForm
        label="Password"
        id="password"
        type="password"
        placeholder="*******"
        register={register}
        errors={errors}
      />

      <Button type="submit" className={"w-full"} disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
