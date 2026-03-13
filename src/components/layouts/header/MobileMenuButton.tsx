"use client";

import { Menu } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { toggleSidebarMobile } from "@/redux/slices/uiSlice";

const MobileMenuButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="lg:hidden p-2"
      onClick={() => dispatch(toggleSidebarMobile())}
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileMenuButton;
