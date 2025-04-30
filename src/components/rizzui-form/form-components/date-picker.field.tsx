import { Input } from "rizzui";
import { useFieldContext } from "..";
import { ComponentProps } from "react";

type DatePickerFieldProps = {
  label: string;
  description?: string;
  type?: "date" | "datetime-local" | "time" | "month" | "week";
} & Omit<
  ComponentProps<typeof Input>,
  "label" | "value" | "onChange" | "id" | "onBlur" | "error" | "type"
>;

const DatePickerField = ({
  label,
  description,
  type = "date",
  ...props
}: DatePickerFieldProps) => {
  const field = useFieldContext<Date>();

  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      field.handleChange(undefined as any);
      return;
    }

    const dateObject = new Date(dateString);
    field.handleChange(dateObject);
  };

  const getInputValue = () => {
    if (!field.state.value) return "";

    if (field.state.value instanceof Date) {
      return field.state.value.toISOString().split("T")[0];
    }

    return "";
  };

  return (
    <div className="space-y-2">
      <Input
        helperText={description}
        type={type}
        label={label}
        id={field.name}
        value={getInputValue()}
        onBlur={field.handleBlur}
        onChange={(e) => handleDateChange(e.target.value)}
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

export default DatePickerField;
