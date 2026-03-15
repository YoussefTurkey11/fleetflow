import { useUpdateUserMutation } from "@/redux/apis/userApi";
import { setUser } from "@/redux/slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setAuthCookie } from "@/utils/cookies";
import { UserFormSchema } from "@/validation/user/user.schema";
import { toast } from "sonner";

export const useUpdateMeService = () => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const myInfo = async (data: UserFormSchema) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    try {
      const res = await updateUser({
        id: user.id,
        body: {
          username: data.username,
          email: data.email,
        },
      }).unwrap();

      if ("jwt" in res) {
        const token = res.jwt;
        setAuthCookie(token as string);
      }
      dispatch(setUser(res ?? user));
      toast.success("Profile updated successfully");
      return res;
    } catch (error: any) {
      toast.error(error?.data?.error?.message ?? "Profile updating failed");
      throw error;
    }
  };

  return {
    myInfo,
  };
};
