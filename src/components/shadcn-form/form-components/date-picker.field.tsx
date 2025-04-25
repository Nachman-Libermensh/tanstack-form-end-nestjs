import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
import FieldErrors, { ErrorPlacement } from "./field-errors";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

type DateFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
  errorPlacement?: ErrorPlacement;
  minDate?: Date;
  maxDate?: Date;
  shouldDisableDate?: (date: Date) => boolean;
  footer?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const DateField = ({
  label,
  placeholder,
  helperText,
  dir = "rtl",
  errorPlacement = "bottom",
  minDate,
  maxDate,
  shouldDisableDate,
  footer,
  required,
  disabled,
  className,
}: DateFieldProps) => {
  const field = useFieldContext<Date | null>();

  // פונקציית עטיפה שמתאימה את הטיפוסים
  const handleDateChange = (date: Date | undefined) => {
    field.handleChange(date === undefined ? null : date);
  };

  return (
    <div className="space-y-2" dir={dir}>
      {errorPlacement === "top" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}

      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <DatePicker
        value={field.state.value || undefined}
        onChange={handleDateChange}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
        footer={footer}
        className={cn(className)}
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

export default DateField;
