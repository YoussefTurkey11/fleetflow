import { FieldErrors, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Option = {
  label: string;
  value: number;
};

type FieldSelectRelationFormProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  errors: FieldErrors<T>;
  options: Option[];
  field: {
    value: number | undefined;
    onChange: (value: number) => void;
    name: string;
  };
};

const FieldSelectRelationForm = <T extends FieldValues>({
  label,
  id,
  errors,
  options,
  field,
}: FieldSelectRelationFormProps<T>) => {
  return (
    <Field>
      <FieldLabel
        htmlFor={id}
        className={`capitalize cursor-pointer ${
          errors[id] ? "text-destructive" : ""
        }`}
      >
        {label}
      </FieldLabel>

      <Select
        name={field.name}
        value={field.value?.toString()}
        onValueChange={(val) => field.onChange(Number(val))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value.toString()}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {errors[id] && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{errors[id]?.message as string}</AlertTitle>
        </Alert>
      )}
    </Field>
  );
};

export default FieldSelectRelationForm;
