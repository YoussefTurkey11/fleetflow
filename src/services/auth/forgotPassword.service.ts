import { useForgotPasswordMutation } from "@/redux/apis/authApi";
import { ForgotPasswordFormSchema } from "@/validation/auth/forgotPassword.schema";
import { toast } from "sonner";

export const useForgotPasswordService = () => {
  const [email] = useForgotPasswordMutation();

  const emailUser = async (data: ForgotPasswordFormSchema) => {
    try {
      const res = await email({
        email: data.email,
      }).unwrap();

      toast.success("Email Checked Successfully");
      return res;
    } catch (error: any) {
      toast.error(error?.data?.error?.message ?? "Email Checked failed");
      throw error;
    }
  };

  return {
    emailUser,
  };
};
