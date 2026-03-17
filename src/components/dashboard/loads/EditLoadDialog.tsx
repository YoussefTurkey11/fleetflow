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
import FieldInputForm from "../../shared/FieldInputForm";
import FieldSelectForm from "../../shared/FieldSelectForm";
import { toast } from "sonner";
import { useEffect } from "react";
import FieldSelectRelationForm from "@/components/shared/FieldSelectRelationForm";
import { useAllDriversQuery } from "@/redux/apis/driverApi";
import { useAllTrucksQuery } from "@/redux/apis/truckApi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  load: any;
};

export function EditLoadDialog({ open, setOpen, load }: Props) {
  const [updateLoad, { isLoading }] = useUpdateLoadMutation();
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
    formState: { errors },
    reset,
    control,
  } = useForm<AddLoadFormSchema>({
    resolver: zodResolver(addLoadScheme),
    defaultValues: {
      Origin: "",
      Pickup: "",
      Delivery: "",
      Distance: "",
      PricePerMile: "",
      Total: "",
      Available: true,
      driver: undefined,
      truck: undefined,
    },
  });

  useEffect(() => {
    if (load) {
      reset({
        Origin: load.Origin,
        Pickup: load.Pickup,
        Delivery: load.Delivery,
        Distance: String(load.Distance),
        PricePerMile: String(load.PricePerMile),
        Total: String(load.Total),
        driver: load.driver?.id ?? undefined,
        truck: load.truck?.id ?? undefined,
        Available: load.Available,
      });
    }
  }, [load, reset]);

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
          driver: {
            connect: [data.driver],
          },
          truck: {
            connect: [data.truck],
          },
          Available: data.Available,
        },
      };

      await updateLoad({
        documentId: load.documentId,
        body: payload,
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
            label="Origin"
            id="Origin"
            type="search"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Pickup"
            id="Pickup"
            type="search"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Delivery"
            id="Delivery"
            type="search"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="driver"
              control={control}
              key="driver-controller"
              render={({ field }) => (
                <FieldSelectRelationForm
                  label="Driver"
                  id="driver"
                  field={{
                    ...field,
                    value: field.value ?? "",
                  }}
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
                  field={{
                    ...field,
                    value: field.value ?? "",
                  }}
                  errors={errors}
                  options={truckOptions}
                />
              )}
            />
          </div>

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
