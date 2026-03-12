import { useResetPasswordMutation } from "@/redux/apis/authApi";
import { ResetPasswordFormSchema } from "@/validation/auth/resetPassword.schema";
import { toast } from "sonner";

export const useResetPasswordService = () => {
  const [reset] = useResetPasswordMutation();

  const resetPassword = async (data: ResetPasswordFormSchema) => {
    try {
      const res = await reset({
        code: data.code,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }).unwrap();

      toast.success("Password Reset Successfully");
      return res;
    } catch (error: any) {
      toast.error(error?.data?.error?.message ?? "Password Reset failed");
      throw error;
    }
  };

  return {
    resetPassword,
  };
};
