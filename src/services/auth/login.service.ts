import { useLoginMutation } from "@/redux/apis/authApi";
import { setAuthCookie } from "@/utils/cookies";
import { LoginFormSchema } from "@/validation/auth/login.schema";
import { toast } from "sonner";

export const useLoginService = () => {
  const [login] = useLoginMutation();

  const loginUser = async (data: LoginFormSchema) => {
    try {
      const res = await login({
        identifier: data.identifier,
        password: data.password,
      }).unwrap();

      const token = res.jwt;
      toast.success("Login Successfully");
      setAuthCookie(token);
      return res;
    } catch (error: any) {
      toast.error(error?.data?.error?.message ?? "Login failed");
      throw error;
    }
  };

  return {
    loginUser,
  };
};
