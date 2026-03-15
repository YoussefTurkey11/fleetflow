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
import { useUpdateDriverMutation } from "@/redux/apis/driverApi";
import {
  AddDriverFormSchema,
  addDriverScheme,
} from "@/validation/driver/addDriver.schema";
import { DatePickerInput } from "../shared/DatePickerInput";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  driver: any;
};

export function EditDriverDialog({ open, setOpen, driver }: Props) {
  const [updateDriver, { isLoading }] = useUpdateDriverMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddDriverFormSchema>({
    resolver: zodResolver(addDriverScheme),
  });

  useEffect(() => {
    if (driver) {
      reset({
        DriverDetails: driver.DriverDetails,
        PhoneNumber: driver.PhoneNumber,
        License: driver.License,
        PricePerMile: String(driver.PricePerMile),
        HireDate: driver.HireDate,
        Available: driver.Available,
      });
    }
  }, [driver, reset]);

  const onSubmit = async (data: AddDriverFormSchema) => {
    try {
      await updateDriver({
        documentId: driver.documentId,
        body: data,
      }).unwrap();

      toast.success("Driver updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update driver");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Driver Details"
            id="DriverDetails"
            type="text"
            placeholder="e.g. Youssef"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="Phone Number"
            id="PhoneNumber"
            type="text"
            placeholder="e.g. +201234567897"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="License"
            id="License"
            type="text"
            placeholder="e.g. Abc1234"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="PricePerMile"
            id="PricePerMile"
            type="text"
            placeholder="Will be calculated or entered"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="HireDate"
              control={control}
              key="hireDate-controller"
              render={({ field }) => (
                <DatePickerInput errors={errors} field={field} />
              )}
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
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Driver"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
