"use client";

import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useState } from "react";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TFieldInputForm<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  type: "email" | "text" | "password" | "number" | "phone" | "search";
  placeholder?: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  disabled?: boolean;
  onFocus?: () => void;
};

const FieldInputForm = <T extends FieldValues>({
  label,
  id,
  type,
  placeholder,
  errors,
  register,
  disabled,
  onFocus,
}: TFieldInputForm<T>) => {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const loginPage = pathname.startsWith("/login");

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel
          htmlFor={id}
          className={`capitalize cursor-pointer ${errors[id] ? "text-destructive" : ""}`}
        >
          {label}
        </FieldLabel>
        {loginPage && isPassword ? (
          <Link
            href={"/forgotPassword"}
            className="text-muted-foreground font-bold hover:underline hover:text-primary text-xs"
          >
            Forgot Password?
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(id)}
          className={errors[id] ? "border-destructive/90 text-destructive" : ""}
          disabled={disabled ? disabled : false}
          onFocus={onFocus}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errors[id] ? (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{errors[id]?.message as string}</AlertTitle>
        </Alert>
      ) : null}
    </Field>
  );
};

export default FieldInputForm;
