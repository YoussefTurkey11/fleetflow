"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useDeleteLoadMutation } from "@/redux/apis/loadApi";
import { toast } from "sonner";
import { useState } from "react";
import { EditLoadDialog } from "./EditLoadDialog";
import { Load } from "@/types/loadType";

const ActionLoad = ({ load }: { load: Load }) => {
  const [open, setOpen] = useState(false);
  const [deleteLoad, { isLoading }] = useDeleteLoadMutation();

  const handleDelete = async () => {
    try {
      await deleteLoad(load.documentId).unwrap();
      toast.success("Load deleted successfully");
    } catch {
      toast.error("Failed to delete load");
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

      <EditLoadDialog open={open} setOpen={setOpen} load={load} />
    </>
  );
};

export default ActionLoad;
