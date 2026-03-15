"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateLoadMutation } from "@/redux/apis/loadApi";
import {
  AddLoadFormSchema,
  addLoadScheme,
} from "@/validation/load/addLoad.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FieldInputForm from "../shared/FieldInputForm";
import FieldSelectForm from "../shared/FieldSelectForm";
import { toast } from "sonner";
import { useEffect } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  load: any;
};

export function EditLoadDialog({ open, setOpen, load }: Props) {
  const [updateLoad, { isLoading }] = useUpdateLoadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddLoadFormSchema>({
    resolver: zodResolver(addLoadScheme),
  });

  useEffect(() => {
    if (load) {
      reset({
        Route: load.Route,
        Distance: String(load.Distance),
        PricePerMile: String(load.PricePerMile),
        Total: String(load.Total),
        Available: load.Available,
      });
    }
  }, [load, reset]);

  const onSubmit = async (data: AddLoadFormSchema) => {
    try {
      await updateLoad({
        documentId: load.documentId,
        body: data,
      }).unwrap();

      toast.success("Load updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update load");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Load</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Route"
            id="Route"
            type="text"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Distance"
            id="Distance"
            type="text"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Price Per Mile"
            id="PricePerMile"
            type="text"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Total"
            id="Total"
            type="text"
            register={register}
            errors={errors}
          />

          <Controller
            name="Available"
            control={control}
            render={({ field }) => (
              <FieldSelectForm
                label="Availability"
                go="Available"
                goNot="Unavailable"
                id="Available"
                errors={errors}
                field={field}
              />
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Load"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
