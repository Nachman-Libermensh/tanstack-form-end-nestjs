import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
import FieldErrors, { ErrorPlacement } from "./field-errors";
import { cn } from "@/lib/utils";

// טיפוס מותאם עבור פרופס של קומפוננט Checkbox
type CheckboxProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  "checked" | "onCheckedChange" | "onBlur" | "id" | "value" | "name"
>;

type CheckboxFieldProps = {
  label: string;
  description?: string;
  dir?: "ltr" | "rtl";
  errorPlacement?: ErrorPlacement;
  className?: string;
} & CheckboxProps;

const CheckboxField = ({
  label,
  description,
  dir = "rtl",
  errorPlacement = "bottom",
  className,
  disabled,
  ...restProps
}: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2" dir={dir}>
      {errorPlacement === "top" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}

      <div
        className={cn(
          "flex items-center gap-2",
          dir === "rtl" ? "space-x-reverse" : "space-x-2",
          className
        )}
      >
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          onBlur={field.handleBlur}
          disabled={disabled}
          {...restProps}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={field.name} className="cursor-pointer">
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {errorPlacement === "bottom" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}
    </div>
  );
};

export default CheckboxField;
