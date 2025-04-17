import { Input } from "@/components/ui/input";
import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
import FieldErrors from "./field-errors";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
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
  ...restProps // אוסף שאר הפרופס
}: TextFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <div className="space-y-2">
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
        dir={dir}
        disabled={disabled}
        required={required}
        className={className}
        {...restProps} // העברת כל הפרופס הנוספים
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};

export default TextField;
