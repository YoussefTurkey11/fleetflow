"use client";
import { menuItem } from "@/data/sidebar/menuItem";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubMenu from "./SubMenu";
import { useAppDispatch } from "@/redux/store";
import { closeSidebarMobile } from "@/redux/slices/uiSlice";

const ItemSidebar = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const toggleMenu = (id: string) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };
  const isActive = (link?: string) => {
    if (!link) return false;
    return pathname.startsWith(`/${link}`);
  };

  return (
    <ul className="flex flex-col gap-5 my-5 w-full">
      {menuItem.map((item) => (
        <li key={item.id}>
          {item.nested ? (
            <>
              <div
                className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-between px-5"
                } py-3 cursor-pointer hover:bg-secondary hover:rounded-md transition-colors`}
                onClick={() => {
                  toggleMenu(item.id);
                }}
              >
                <p
                  className={`flex items-center ${
                    collapsed ? "justify-center w-full" : "gap-3"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`capitalize transition-all ${
                      collapsed ? "hidden" : "block"
                    }`}
                  >
                    {item.name}
                  </span>
                </p>
                {!collapsed && (
                  <motion.div
                    animate={{ rotate: openMenu === item.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                )}
              </div>
              <AnimatePresence initial={false}>
                {openMenu === item.id && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex flex-col gap-3 my-3 mx-5 ${collapsed ? "" : "border-l border-secondary"} overflow-hidden`}
                    onClick={() => {
                      if (!collapsed) return dispatch(closeSidebarMobile());
                    }}
                  >
                    {item.nested.map((sub) => (
                      <SubMenu key={sub.id} sub={sub} isActive={isActive} />
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={`/${item.link}`}
              className={`flex items-center ${
                collapsed ? "justify-center px-0" : "gap-3 px-5"
              } py-3 transition-colors
              ${
                isActive(item.link)
                  ? "bg-secondary rounded-md"
                  : "hover:bg-secondary hover:rounded-md"
              }`}
            >
              {item.icon}

              <span
                className={`capitalize transition-all ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                {item.name}
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemSidebar;
