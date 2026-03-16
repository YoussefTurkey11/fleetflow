"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FieldInputForm from "../../shared/FieldInputForm";
import FieldSelectForm from "../../shared/FieldSelectForm";
import { toast } from "sonner";
import { useEffect } from "react";
import { User } from "@/types/authType";
import { useUpdateUserMutation } from "@/redux/apis/userApi";
import { UserFormSchema, userSchema } from "@/validation/user/user.schema";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
};

export function EditUserDialog({ open, setOpen, user }: Props) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        Phone: user.Phone,
        confirmed: user.confirmed,
        blocked: user.blocked,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormSchema) => {
    try {
      await updateUser({
        id: user.id,
        body: data,
      }).unwrap();

      toast.success("User updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="username"
            id="username"
            type="text"
            placeholder="Enter your Username"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your Email"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Phone"
            id="Phone"
            type="phone"
            placeholder="Enter your Phone"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="confirmed"
              control={control}
              key="confirmed-controller"
              render={({ field }) => (
                <FieldSelectForm
                  label="Confirmation"
                  go="Confirmed"
                  goNot="Unconfirmed"
                  id="confirmed"
                  errors={errors}
                  field={field}
                />
              )}
            />

            <Controller
              name="blocked"
              control={control}
              key="blocked-controller"
              render={({ field }) => (
                <FieldSelectForm
                  label="Blocking"
                  go="blocked"
                  goNot="Unblocked"
                  id="blocked"
                  errors={errors}
                  field={field}
                />
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
