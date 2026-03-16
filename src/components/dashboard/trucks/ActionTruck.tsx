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
import { Truck } from "@/types/truckType";
import { useDeleteTruckMutation } from "@/redux/apis/truckApi";
import { EditTruckDialog } from "./EditTruckDialog";

const ActionTruck = ({ truck }: { truck: Truck }) => {
  const [open, setOpen] = useState(false);
  const [deleteTruck, { isLoading }] = useDeleteTruckMutation();

  const handleDelete = async () => {
    try {
      await deleteTruck(truck?.documentId as string).unwrap();
      toast.success("Truck deleted successfully");
    } catch {
      toast.error("Failed to delete truck");
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

      <EditTruckDialog open={open} setOpen={setOpen} truck={truck} />
    </>
  );
};

export default ActionTruck;
