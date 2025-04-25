import { Label } from "@/components/ui/label";
import { useFieldContext } from "..";
import FieldErrors, { ErrorPlacement } from "./field-errors";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  dir?: "ltr" | "rtl";
  errorPlacement?: ErrorPlacement;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
};

export const SelectField = ({
  label,
  options,
  placeholder,
  dir = "rtl",
  errorPlacement = "bottom",
  className,
  required,
  disabled,
  helperText,
}: SelectFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2" dir={dir}>
      {errorPlacement === "top" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}

      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Select
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        disabled={disabled}
      >
        <SelectTrigger
          id={field.name}
          onBlur={field.handleBlur}
          className={cn(className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}

      {errorPlacement === "bottom" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}
    </div>
  );
};
