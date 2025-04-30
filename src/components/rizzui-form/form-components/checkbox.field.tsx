import { useFieldContext } from "..";
import { Checkbox } from "rizzui";

import { ComponentProps } from "react";

type CheckboxFieldProps = {
  label: string;
  description?: string;
} & Omit<
  ComponentProps<typeof Checkbox>,
  "label" | "checked" | "onChange" | "id" | "onBlur" | "error"
>;

const CheckboxField = ({
  label,
  description,
  ...props
}: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          helperText={description}
          label={label}
          id={field.name}
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
          onBlur={field.handleBlur}
          error={
            field.state.meta.isTouched && field.state.meta.errors.length > 0
              ? field.state.meta.errors.join(", ")
              : undefined
          }
          {...props}
        />
      </div>
    </div>
  );
};
export default CheckboxField;
