import { Input } from "@/components/ui/input";
import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
import FieldErrors, { ErrorPlacement } from "./field-errors";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
  errorPlacement?: ErrorPlacement;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onBlur" | "name" | "id"
>;

const TextField = ({
  label,
  placeholder,
  helperText,
  dir = "rtl",
  className,
  required,
  disabled,
  errorPlacement = "bottom",
  ...restProps // אוסף שאר הפרופס
}: TextFieldProps) => {
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

      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(className)}
        {...restProps} // העברת כל הפרופס הנוספים
      />

      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}

      {errorPlacement === "bottom" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}
    </div>
  );
};

export default TextField;
