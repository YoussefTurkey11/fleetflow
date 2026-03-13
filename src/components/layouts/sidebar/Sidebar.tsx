"use client";
import Logo from "@/components/shared/Logo";
import ItemSidebar from "./ItemSidebar";
import Logout from "@/components/shared/Logout";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { setSidebarHover } from "@/redux/slices/uiSlice";
import { motion } from "framer-motion";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, sidebarHover } = useAppSelector(
    (state: RootState) => state.uiSlice,
  );

  const expanded = sidebarOpen || sidebarHover;

  return (
    <motion.aside
      animate={{ width: expanded ? 350 : 80 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => dispatch(setSidebarHover(true))}
      onMouseLeave={() => dispatch(setSidebarHover(false))}
      className="p-5 min-h-screen border-r border-ring/30 bg-background flex flex-col justify-between"
    >
      <div className="w-full">
        <Logo collapsed={!expanded} />
        <ItemSidebar collapsed={!expanded} />
      </div>
      <div className="pt-5 border-t border-ring/30 w-full">
        <Logout collapsed={!expanded} />
      </div>
    </motion.aside>
  );
};

export default Sidebar;
