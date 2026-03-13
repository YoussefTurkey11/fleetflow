"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toggleSidebar, toggleSidebarMobile } from "@/redux/slices/uiSlice";
import { useAppDispatch } from "@/redux/store";
import { Bell, Menu, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      dispatch(toggleSidebarMobile());
    } else {
      dispatch(toggleSidebar());
    }
  };

  return (
    <header className="p-5 border-b border-ring/30 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Button variant="ghost" onClick={handleMenuClick}>
          <Menu size={24} />
        </Button>

        {/* Search */}
        <InputGroup className="hidden md:flex w-87.5">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <Button variant="ghost" className="rounded-full" size="icon-lg">
          <Bell size={22} />
        </Button>

        <div className="w-px h-8 bg-ring/40 hidden sm:block"></div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <p className="text-sm font-semibold">Youssef Turkey</p>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>

          <Image
            src="/images/driver.png"
            width={40}
            height={40}
            alt="user"
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
