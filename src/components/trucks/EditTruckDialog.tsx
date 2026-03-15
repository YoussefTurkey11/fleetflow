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
import FieldInputForm from "../shared/FieldInputForm";
import FieldSelectForm from "../shared/FieldSelectForm";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  AddTruckFormSchema,
  addTruckScheme,
} from "@/validation/truck/truck.schema";
import { useUpdateTruckMutation } from "@/redux/apis/truckApi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  truck: any;
};

export function EditTruckDialog({ open, setOpen, truck }: Props) {
  const [updateTruck, { isLoading }] = useUpdateTruckMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddTruckFormSchema>({
    resolver: zodResolver(addTruckScheme),
  });

  useEffect(() => {
    if (truck) {
      reset({
        FuelPerMile: String(truck.FuelPerMile),
        TotalMileage: String(truck.TotalMileage),
        Available: truck.Available,
      });
    }
  }, [truck, reset]);

  const onSubmit = async (data: AddTruckFormSchema) => {
    try {
      await updateTruck({
        documentId: truck.documentId,
        body: data,
      }).unwrap();

      toast.success("Truck updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update truck");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Truck</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Fuel Per Mile"
            id="FuelPerMile"
            type="text"
            placeholder="e.g. 26"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Total Mileage"
            id="TotalMileage"
            type="text"
            placeholder="e.g. 2454"
            register={register}
            errors={errors}
          />

          <Controller
            name="Available"
            control={control}
            key="available-controller"
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
              {isLoading ? "Updating..." : "Update Truck"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
