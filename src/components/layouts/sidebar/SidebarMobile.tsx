"use client";

import Logo from "@/components/shared/Logo";
import ItemSidebar from "./ItemSidebar";
import Logout from "@/components/shared/Logout";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { closeSidebarMobile } from "@/redux/slices/uiSlice";
import { motion } from "framer-motion";

const SidebarMobile = () => {
  const dispatch = useAppDispatch();

  const { sidebarMobile } = useAppSelector((state: RootState) => state.uiSlice);

  return (
    <>
      {sidebarMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebarMobile())}
        />
      )}

      <motion.aside
        initial={{ x: -350 }}
        animate={{ x: sidebarMobile ? 0 : -350 }}
        transition={{ duration: 0.25 }}
        className="
            fixed
            lg:hidden
            z-50
            w-87.5
            h-screen
            p-5
            border-r
            border-ring/30
            bg-background
            flex
            flex-col
            justify-between
        "
      >
        <div>
          <Logo collapsed={false} />
          <ItemSidebar collapsed={false} />
        </div>

        <div className="pt-5 border-t border-ring/30">
          <Logout collapsed={false} />
        </div>
      </motion.aside>
    </>
  );
};

export default SidebarMobile;
