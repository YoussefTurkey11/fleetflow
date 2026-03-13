"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { removeAuthCookie } from "@/utils/cookies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { RootState, useAppSelector } from "@/redux/store";

const UserAvatar = () => {
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={"ghost"}
            className="flex items-center gap-3 cursor-pointer hover:bg-transparent"
          >
            <div className="hidden sm:flex flex-col items-end gap-1">
              <p className="text-sm font-semibold">
                {user?.username ?? "Username"}
              </p>
              <span className="text-xs text-muted-foreground">
                {user?.email ?? "admin"}
              </span>
            </div>

            <Image
              src="/images/driver.png"
              width={40}
              height={40}
              alt="user"
              className="rounded-full"
            />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className={"cursor-pointer"}>
            <Link href={"/profile"} className="flex items-center gap-2 w-full">
              <BadgeCheckIcon />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={"cursor-pointer"}
          onClick={() => {
            removeAuthCookie();
            toast.success("Logout Successfully");
            router.push("/login");
          }}
        >
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
