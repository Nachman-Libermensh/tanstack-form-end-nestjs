/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "rizzui";
import { useFieldContext } from "..";
import FieldErrors from "./field-errors";

type RizzuiInputType =
  | "number"
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

type DatePickerFieldProps = {
  label: string;
  placeholder?: string;
  type?: RizzuiInputType;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // componentProps?: React.InputHTMLAttributes<HTMLInputElement> & {
  //   className?: string;
  //   style?: React.CSSProperties;
  // };
};

const DatePickerField = ({
  label,
  placeholder,
  // componentProps,
  type = "date",
}: DatePickerFieldProps) => {
  // Change to Date type since that's what validation expects
  const field = useFieldContext<Date>();

  // Convert the date string to a Date object for internal handling
  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      field.handleChange(undefined as any);
      return;
    }

    // Create a proper Date object from the input string
    const dateObject = new Date(dateString);
    field.handleChange(dateObject);
  };

  // Format Date object back to string for the input
  const getInputValue = () => {
    if (!field.state.value) return "";

    // Format date as YYYY-MM-DD for the input element
    if (field.state.value instanceof Date) {
      return field.state.value.toISOString().split("T")[0];
    }

    return "";
  };

  return (
    <div className="space-y-1">
      <Input
        type={type}
        label={label}
        id={field.name}
        placeholder={placeholder}
        value={getInputValue()}
        onBlur={field.handleBlur}
        onChange={(e) => handleDateChange(e.target.value)}
        // {...componentProps}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};

export default DatePickerField;
