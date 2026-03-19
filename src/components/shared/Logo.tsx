"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ collapsed }: { collapsed?: boolean }) => {
  const { theme } = useTheme();

  return (
    <Link
      href={"/admin"}
      className={`flex items-center gap-2 ${collapsed ? "" : "px-5"} pb-5 border-b border-ring/30`}
    >
      <Image
        src={theme === "dark" ? "/images/logo2.svg" : "/images/logo1.svg"}
        width={40}
        height={40}
        alt="logo"
        loading="eager"
      />
      {!collapsed && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">FleetFlow</h3>
          <p className="text-sm text-muted-foreground">Logistics SaaS</p>
        </div>
      )}
    </Link>
  );
};

export default Logo;
