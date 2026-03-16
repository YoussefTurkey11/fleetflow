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
import { User } from "@/types/authType";
import { useDeleteUserMutation } from "@/redux/apis/userApi";
import { EditUserDialog } from "./EditUserDialog";

const ActionUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(user?.id).unwrap();
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
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

      <EditUserDialog open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export default ActionUser;
