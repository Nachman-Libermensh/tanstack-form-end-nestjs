import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFieldContext } from "./form-core";
import { BaseFieldProps, SelectOption } from "./form-core";

// רכיב שדה טקסט
export const TextField = ({
  label,
  placeholder,
  helperText,
  required,
  disabled,
  type = "text",
  className,
}: BaseFieldProps & { type?: string }) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={field.name}
          className={
            required ? "after:content-['*'] after:text-red-500 after:mr-1" : ""
          }
        >
          {label}
        </Label>
      )}
      <Input
        id={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value || ""}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={disabled || field.state.meta.isBlurred}
        className={className}
        aria-invalid={!!field.state.meta.errors?.length}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {field.state.meta.errors?.length ? (
        <p className="text-sm text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
};

// רכיב תיבת סימון
export const CheckboxField = ({
  label,
  helperText,
  //   disabled,
  className,
}: BaseFieldProps) => {
  const field = useFieldContext<boolean>();
  console.log(field);

  return (
    <div className={cn("flex items-start space-x-2 space-y-0", className)}>
      <Checkbox
        id={field.name}
        checked={field.state.value || false}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
        //   disabled={disabled || field.state.isSubmitting}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <Label
            htmlFor={field.name}
            className="text-sm font-medium leading-none"
          >
            {label}
          </Label>
        )}
        {helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {field.state.meta.errors?.length ? (
          <p className="text-sm text-destructive">
            {field.state.meta.errors.join(", ")}
          </p>
        ) : null}
      </div>
    </div>
  );
};

// רכיב בחירה (Select)
export const SelectField = ({
  label,
  placeholder = "בחר...",
  helperText,
  required,
  //   disabled,
  className,
  options = [],
}: BaseFieldProps & { options: SelectOption[] }) => {
  const field = useFieldContext<string | number>();

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={field.name}
          className={
            required ? "after:content-['*'] after:text-red-500 after:mr-1" : ""
          }
        >
          {label}
        </Label>
      )}
      <Select
        value={field.state.value?.toString()}
        onValueChange={(value) => field.handleChange(value)}
        //   disabled={disabled || field.state.isSubmitting}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {field.state.meta.errors?.length ? (
        <p className="text-sm text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
};

// רכיב אזור טקסט
export const TextAreaField = ({
  label,
  placeholder,
  helperText,
  required,
  //   disabled,
  className,
}: BaseFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={field.name}
          className={
            required ? "after:content-['*'] after:text-red-500 after:mr-1" : ""
          }
        >
          {label}
        </Label>
      )}
      <Textarea
        id={field.name}
        placeholder={placeholder}
        value={field.state.value || ""}
        onChange={(e) => field.handleChange(e.target.value)}
        //   disabled={disabled || field.state.isSubmitting}
        className={className}
        aria-invalid={!!field.state.meta.errors?.length}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {field.state.meta.errors?.length ? (
        <p className="text-sm text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
};

// רכיב OTP
export const OTPField = ({
  label,
  helperText,
  required,
  //   disabled,
  className,
  length = 6,
}: BaseFieldProps & { length?: number }) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={field.name}
          className={
            required ? "after:content-['*'] after:text-red-500 after:mr-1" : ""
          }
        >
          {label}
        </Label>
      )}
      <InputOTP
        maxLength={length}
        value={field.state.value || ""}
        onChange={(value) => field.handleChange(value)}
      >
        <Input
          id={field.name}
          //     disabled={disabled || field.state.isSubmitting}
          className={className}
        />
      </InputOTP>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {field.state.meta.errors?.length ? (
        <p className="text-sm text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
};
