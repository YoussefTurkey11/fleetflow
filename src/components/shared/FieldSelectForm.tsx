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

type FieldSelectFormProps<T extends FieldValues> = {
  label: string;
  go: string;
  goNot: string;
  id: Path<T>;
  errors: FieldErrors<T>;
  field: {
    value: boolean | undefined;
    onChange: (value: boolean) => void;
  };
};

const FieldSelectForm = <T extends FieldValues>({
  label,
  go,
  goNot,
  id,
  errors,
  field,
}: FieldSelectFormProps<T> & {
  field: {
    value: boolean | undefined;
    onChange: (value: boolean) => void;
    name: string;
  };
}) => {
  const selectedValue =
    field.value === true ? "true" : field.value === false ? "false" : undefined;

  return (
    <Field>
      <FieldLabel
        htmlFor={id}
        className={`capitalize cursor-pointer ${errors[id] ? "text-destructive" : ""}`}
      >
        {label}
      </FieldLabel>

      <Select
        name={field.name}
        value={selectedValue}
        onValueChange={(val) => field.onChange(val === "true")}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="true">{go}</SelectItem>
            <SelectItem value="false">{goNot}</SelectItem>
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

export default FieldSelectForm;
