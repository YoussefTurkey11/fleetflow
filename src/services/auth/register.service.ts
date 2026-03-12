import { useRegisterMutation } from "@/redux/apis/authApi";
import { setAuthCookie } from "@/utils/cookies";
import { RegisterFormSchema } from "@/validation/auth/register.schema";
import { toast } from "sonner";

export const useRegisterService = () => {
  const [register] = useRegisterMutation();

  const registerUser = async (data: RegisterFormSchema) => {
    try {
      const res = await register({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();

      const token = res.jwt;
      toast.success("Register Successfully");
      setAuthCookie(token);
      return res;
    } catch (error: any) {
      toast.error(error?.data?.error?.message ?? "Register failed");
      throw error;
    }
  };

  return {
    registerUser,
  };
};
