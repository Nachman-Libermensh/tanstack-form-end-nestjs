import { ReactNode } from "react";
import { useFormContext } from "./form-core";
import { BaseFieldProps, SelectOption } from "./form-core";

export type FormFieldProps = BaseFieldProps & {
  name: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "textarea"
    | "checkbox"
    | "select"
    | "otp"
    | "custom";
  options?: SelectOption[];
  length?: number;
  render?: (field: any, props: FormFieldProps) => ReactNode;
} & Record<string, any>;

export const FormField = ({
  name,
  type,
  label,
  placeholder,
  helperText,
  required,
  disabled,
  className,
  options,
  length,
  render,
  ...rest
}: FormFieldProps) => {
  const form = useFormContext();

  if (!form) {
    throw new Error("FormField must be used within a Form component");
  }

  return (
    <form.AppField name={name}>
      {(field) => {
        // אם סוג השדה הוא "custom" והרכיב render קיים
        if (type === "custom" && render) {
          return render(field, {
            name,
            type,
            label,
            placeholder,
            helperText,
            required,
            disabled,
            className,
            ...rest,
          });
        }

        switch (type) {
          case "textarea":
            return (
              <field.TextAreaField
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                required={required}
                disabled={disabled}
                className={className}
                {...rest}
              />
            );
          case "checkbox":
            return (
              <field.CheckboxField
                label={label}
                helperText={helperText}
                disabled={disabled}
                className={className}
                {...rest}
              />
            );
          case "select":
            return (
              <field.SelectField
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                required={required}
                disabled={disabled}
                className={className}
                options={options || []}
                {...rest}
              />
            );
          case "otp":
            return (
              <field.OTPField
                label={label}
                helperText={helperText}
                required={required}
                disabled={disabled}
                className={className}
                length={length || 6}
                {...rest}
              />
            );
          default:
            return (
              <field.TextField
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                required={required}
                disabled={disabled}
                type={type}
                className={className}
                {...rest}
              />
            );
        }
      }}
    </form.AppField>
  );
};
