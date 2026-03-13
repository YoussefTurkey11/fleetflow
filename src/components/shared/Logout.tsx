"use client";
import { removeAuthCookie } from "@/utils/cookies";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/store";
import { clearAuth } from "@/redux/slices/authSlice";

const Logout = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Button
      className={"w-full py-5"}
      onClick={() => {
        removeAuthCookie();
        dispatch(clearAuth());
        toast.success("Logout Successfully");
        router.push("/login");
      }}
    >
      {collapsed ? (
        <LogOut size={30} />
      ) : (
        <>
          <span>Logout</span>
          <LogOut size={20} />
        </>
      )}
    </Button>
  );
};

export default Logout;
