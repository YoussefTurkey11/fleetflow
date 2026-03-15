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
import FieldInputForm from "../shared/FieldInputForm";
import FieldSelectForm from "../shared/FieldSelectForm";
import { toast } from "sonner";
import { useState } from "react";
import {
  AddDriverFormSchema,
  addDriverScheme,
} from "@/validation/driver/addDriver.schema";
import { useCreateDriverMutation } from "@/redux/apis/driverApi";
import { DatePickerInput } from "../shared/DatePickerInput";

export function AddDriver() {
  const [createDriver, { isLoading }] = useCreateDriverMutation();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<AddDriverFormSchema>({
    resolver: zodResolver(addDriverScheme),
    mode: "onSubmit",
    defaultValues: {
      DriverDetails: "",
      PhoneNumber: "",
      License: "",
      PricePerMile: "",
      HireDate: "",
      Available: true,
    },
  });

  const onSubmit = async (data: AddDriverFormSchema) => {
    try {
      await createDriver(data).unwrap();
      reset();
      toast.success("Driver Added Successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create driver:", error);
      toast.error("Driver Added Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Box className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b border-ring/30 pb-4">
          <DialogTitle className="flex items-center gap-1.5">
            <CirclePlus size={16} />
            <span>Add new driver</span>
          </DialogTitle>
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
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? "Adding..." : "Add Driver"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
