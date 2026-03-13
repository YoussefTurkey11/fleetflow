import Image from "next/image";

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div
      className={`flex items-center gap-2 ${collapsed ? "" : "px-5"} pb-5 border-b border-ring/30`}
    >
      <Image
        src={"/images/logo1.svg"}
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
    </div>
  );
};

export default Logo;
