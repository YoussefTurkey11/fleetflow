import {
  CircleUserRound,
  Container,
  LayoutDashboard,
  ShieldUser,
  Truck,
  Van,
} from "lucide-react";

export type SidebarItem = {
  id: string;
  name: string;
  link?: string;
  icon: React.ReactNode;
  nested?: SidebarItem[];
};

export const menuItem: SidebarItem[] = [
  {
    id: "dashboard",
    name: "dashboard",
    link: "admin",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "loads",
    name: "loads",
    link: "loads",
    icon: <Container size={20} />,
  },
  {
    id: "drivers",
    name: "drivers",
    link: "drivers",
    icon: <ShieldUser size={20} />,
  },
  {
    id: "users",
    name: "users",
    link: "users",
    icon: <CircleUserRound size={20} />,
  },
  {
    id: "trucksOperation",
    name: "trucks Operation",
    icon: <Truck size={20} />,
    nested: [
      {
        id: "trucks",
        name: "trucks",
        link: "trucks",
        icon: <Van size={20} />,
      },
    ],
  },
];
