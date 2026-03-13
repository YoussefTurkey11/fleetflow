"use client";
import { removeAuthCookie } from "@/utils/cookies";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Logout = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();
  return (
    <Button
      className={"w-full py-5"}
      onClick={() => {
        removeAuthCookie();
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
