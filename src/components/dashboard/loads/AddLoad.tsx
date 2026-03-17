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
import {
  AddLoadFormSchema,
  addLoadScheme,
} from "@/validation/load/addLoad.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import FieldInputForm from "../../shared/FieldInputForm";
import FieldSelectForm from "../../shared/FieldSelectForm";
import { useCreateLoadMutation } from "@/redux/apis/loadApi";
import { toast } from "sonner";
import { useState } from "react";
import FieldSelectRelationForm from "@/components/shared/FieldSelectRelationForm";
import { useAllDriversQuery } from "@/redux/apis/driverApi";
import { useAllTrucksQuery } from "@/redux/apis/truckApi";

export function AddLoad() {
  const [createLoad, { isLoading }] = useCreateLoadMutation();
  const [open, setOpen] = useState(false);
  const { data: driversData } = useAllDriversQuery();
  const { data: trucksData } = useAllTrucksQuery();

  const driverOptions =
    driversData?.data?.map((driver) => ({
      label: driver.DriverDetails,
      value: driver.id,
    })) || [];

  const truckOptions =
    trucksData?.data?.map((truck) => ({
      label: `Truck ${truck.TotalMileage}`,
      value: truck.id,
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<AddLoadFormSchema>({
    resolver: zodResolver(addLoadScheme),
    mode: "onSubmit",
    defaultValues: {
      Origin: "",
      Pickup: "",
      Delivery: "",
      Distance: "",
      PricePerMile: "",
      Total: "",
      driver: 0,
      truck: 0,
      Available: true,
    },
  });

  const onSubmit = async (data: AddLoadFormSchema) => {
    try {
      const payload = {
        data: {
          Origin: data.Origin,
          Pickup: data.Pickup,
          Delivery: data.Delivery,
          Distance: Number(data.Distance),
          PricePerMile: Number(data.PricePerMile),
          Total: Number(data.Total),
          Available: data.Available,
          driver: {
            connect: [data.driver],
          },
          truck: {
            connect: [data.truck],
          },
        },
      };

      await createLoad(payload).unwrap();
      reset();
      toast.success("Load Added Successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create load:", error);
      toast.error("Load Added Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Box className="mr-2 h-4 w-4" />
            Add Load
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b border-ring/30 pb-4">
          <DialogTitle className="flex items-center gap-1.5">
            <CirclePlus size={16} />
            <span>Add new load</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Origin"
            id="Origin"
            type="search"
            placeholder="e.g. Cairo → Alexandria"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Pickup"
            id="Pickup"
            type="search"
            placeholder="e.g. Cairo → Alexandria"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Delivery"
            id="Delivery"
            type="search"
            placeholder="e.g. Cairo → Alexandria"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Distance"
            id="Distance"
            type="number"
            placeholder="e.g. 220"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Price Per Mile"
            id="PricePerMile"
            type="number"
            placeholder="e.g. 2.15"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Total"
            id="Total"
            type="number"
            placeholder="Will be calculated or entered"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="driver"
              control={control}
              key="driver-controller"
              render={({ field }) => (
                <FieldSelectRelationForm
                  label="Driver"
                  id="driver"
                  field={field}
                  errors={errors}
                  options={driverOptions}
                />
              )}
            />

            <Controller
              name="truck"
              control={control}
              key="truck-controller"
              render={({ field }) => (
                <FieldSelectRelationForm
                  label="Truck"
                  id="truck"
                  field={field}
                  errors={errors}
                  options={truckOptions}
                />
              )}
            />
          </div>

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
              {isLoading ? "Adding..." : "Add Load"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
