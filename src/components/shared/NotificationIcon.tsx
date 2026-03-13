import { Bell, Car, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const NotificationIcon = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="rounded-full" size="icon-lg">
            <Bell size={22} />
          </Button>
        }
      />
      <DropdownMenuContent className={"w-full p-3"} align="end">
        <div className="flex flex-col gap-5">
          <h4 className="border-b border-ring/30 pb-2">Notifications</h4>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={"flex items-start gap-2 cursor-pointer"}
            >
              <div className="border border-ring/30 rounded-sm p-1">
                <Car size={18} />
              </div>
              <p className="w-70 line-clamp-2">
                Alert: Car must fix, Car must fix, Car must fix, Car must fix,
                Car must fix, Car must fix, Car must fix, Car must fix, Car must
                fix, Car must fix, Car must fix, Car must fix, Car must fix, Car
                must fix, Car must fix, Car must fix, Car must fix, Car must
                fix, Car must fix, Car must fix, Car must fix, Car must fix
              </p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <div className="border-t border-ring/30 pt-2">
            <Link
              href={"/notification"}
              className="text-xs text-muted-foreground hover:text-primary hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIcon;
