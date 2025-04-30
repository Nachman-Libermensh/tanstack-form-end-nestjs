import { Input } from "rizzui";
import { useFieldContext } from "..";
import { ComponentProps } from "react";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  description?: string;
} & Omit<
  ComponentProps<typeof Input>,
  "label" | "value" | "onChange" | "id" | "onBlur" | "error" | "helperText"
>;

const TextField = ({
  label,
  placeholder,
  description,
  ...props
}: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <Input
        label={label}
        helperText={description}
        id={field.name}
        placeholder={placeholder}
        value={field.state.value || ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
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

export default TextField;
