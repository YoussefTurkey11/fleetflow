"use client";
import { removeAuthCookie } from "@/utils/cookies";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Logout = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Button className={"w-full py-5"} onClick={removeAuthCookie}>
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
