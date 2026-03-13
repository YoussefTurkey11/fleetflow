"use client";
import FieldInputForm from "@/components/shared/FieldInputForm";
import { Button } from "@/components/ui/button";
import { useLoginService } from "@/services/auth/login.service";
import { LoginFormSchema, loginSchema } from "@/validation/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { loginUser } = useLoginService();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      await loginUser(data);
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
        label="username or email"
        id="identifier"
        type="text"
        placeholder="Enter your Username or Email"
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
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
