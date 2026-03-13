"use client";
import dynamic from "next/dynamic";
const SidebarDesktop = dynamic(() => import("./SidebarDesktop"), {
  ssr: false,
});
const SidebarMobile = dynamic(() => import("./SidebarMobile"), {
  ssr: false,
});

const Sidebar = () => {
  return (
    <>
      <SidebarDesktop />
      <SidebarMobile />
    </>
  );
};

export default Sidebar;
