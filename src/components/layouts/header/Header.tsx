"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toggleSidebar } from "@/redux/slices/uiSlice";
import { useAppDispatch } from "@/redux/store";
import { Bell, Menu, SearchIcon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className="p-5 border-b border-ring/30 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Button variant={"ghost"} onClick={() => dispatch(toggleSidebar())}>
          <Menu size={25} />
        </Button>
        <InputGroup className="w-100">
          <InputGroupInput id="inline-start-input" placeholder="Search..." />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center gap-5">
        <div>
          <Button variant={"ghost"} className={"rounded-full"} size={"icon-lg"}>
            <Bell size={40} />
          </Button>
        </div>
        <div className="w-px h-10 bg-ring/50"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col items-end gap-1">
            <p className="text-md font-semibold">Youssef Turkey</p>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <Image
            src={"/images/driver.png"}
            width={40}
            height={40}
            alt="user"
            loading="lazy"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
