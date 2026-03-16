"use client";
import FieldInputForm from "@/components/shared/FieldInputForm";
import { Button } from "@/components/ui/button";
import { RootState, useAppSelector } from "@/redux/store";
import { useUpdateMeService } from "@/services/user/updateMe.service";
import { UserFormSchema, userSchema } from "@/validation/user/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { myInfo } = useUpdateMeService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormSchema) => {
    try {
      await myInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-81px)]">
      <div className="bg-background rounded-lg p-5 flex items-center justify-center flex-col gap-5 w-70">
        <div>
          <Image
            src={"/images/driver.png"}
            width={100}
            height={100}
            alt=""
            loading="lazy"
            className="mx-auto rounded-full"
          />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FieldInputForm
            label="username"
            id="username"
            type="text"
            placeholder="Enter your Username"
            register={register}
            errors={errors}
          />

          <FieldInputForm
            label="email"
            id="email"
            type="email"
            placeholder="Enter your Email"
            register={register}
            errors={errors}
          />

          <Button type="submit" className={"w-full"} disabled={isSubmitting}>
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
