import Link from "next/link";
import { motion } from "framer-motion";
import { SidebarItem } from "@/data/sidebar/menuItem";

const SubMenu = ({
  sub,
  isActive,
}: {
  sub: SidebarItem;
  isActive: (link?: string) => boolean;
}) => {
  return (
    <motion.li
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/${sub.link}`}
        className={`flex items-center gap-3 px-5 py-3 transition-colors
        ${
          isActive(sub.link)
            ? "bg-secondary rounded-md"
            : "hover:bg-secondary hover:rounded-r-md"
        }`}
      >
        {sub.icon}
        <span className="capitalize">{sub.name}</span>
      </Link>
    </motion.li>
  );
};

export default SubMenu;
