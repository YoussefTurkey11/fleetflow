"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteDriverMutation } from "@/redux/apis/driverApi";
import { Driver } from "@/types/driverType";
import { EditDriverDialog } from "./EditDriverDialog";

const ActionDriver = ({ driver }: { driver: Driver }) => {
  const [open, setOpen] = useState(false);
  const [deleteDriver, { isLoading }] = useDeleteDriverMutation();

  const handleDelete = async () => {
    try {
      await deleteDriver(driver?.documentId as string).unwrap();
      toast.success("Driver deleted successfully");
    } catch {
      toast.error("Failed to delete driver");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive cursor-pointer"
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDriverDialog open={open} setOpen={setOpen} driver={driver} />
    </>
  );
};

export default ActionDriver;
