import { useFieldContext } from "..";
import { Select, type SelectOption } from "rizzui";
import { ComponentProps } from "react";

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  displayValue?: (selected: string | number) => string;
} & Omit<
  ComponentProps<typeof Select>,
  | "label"
  | "value"
  | "onChange"
  | "options"
  | "onBlur"
  | "error"
  | "helperText"
  | "displayValue"
>;

const SelectField = ({
  label,
  options,
  placeholder,
  description,
  displayValue,
  ...props
}: SelectFieldProps) => {
  const field = useFieldContext<string | number>();

  // יצירת פונקציית displayValue ברירת מחדל אם לא סופקה כזו
  const defaultDisplayValue = (selected: string | number) => {
    return options?.find((option) => option.value === selected)?.label ?? "";
  };

  return (
    <div className="space-y-2">
      <Select
        label={label}
        helperText={description}
        options={options}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(selectedOption: SelectOption) =>
          field.handleChange(selectedOption.value)
        }
        onBlur={field.handleBlur}
        displayValue={displayValue || defaultDisplayValue}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors.join(", ")
            : undefined
        }
        {...props}
      />
    </div>
  );
};

export default SelectField;
