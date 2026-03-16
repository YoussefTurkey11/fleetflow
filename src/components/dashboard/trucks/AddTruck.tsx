"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import FieldInputForm from "../../shared/FieldInputForm";
import FieldSelectForm from "../../shared/FieldSelectForm";
import { toast } from "sonner";
import { useState } from "react";
import { useCreateTruckMutation } from "@/redux/apis/truckApi";
import {
  AddTruckFormSchema,
  addTruckScheme,
} from "@/validation/truck/truck.schema";

export function AddTruck() {
  const [createTruck, { isLoading }] = useCreateTruckMutation();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<AddTruckFormSchema>({
    resolver: zodResolver(addTruckScheme),
    mode: "onSubmit",
    defaultValues: {
      FuelPerMile: "",
      TotalMileage: "",
      Available: true,
    },
  });

  const onSubmit = async (data: AddTruckFormSchema) => {
    try {
      await createTruck(data).unwrap();
      reset();
      toast.success("Truck Added Successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create truck:", error);
      toast.error("Truck Added Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Box className="mr-2 h-4 w-4" />
            Add Truck
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b border-ring/30 pb-4">
          <DialogTitle className="flex items-center gap-1.5">
            <CirclePlus size={16} />
            <span>Add new truck</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Fuel Per Mile"
            id="FuelPerMile"
            type="text"
            placeholder="e.g. 25"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Total Mileage"
            id="TotalMileage"
            type="text"
            placeholder="e.g. 2541"
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
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? "Adding..." : "Add Truck"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
