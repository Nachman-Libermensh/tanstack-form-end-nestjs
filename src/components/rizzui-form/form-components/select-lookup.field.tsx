import { useFieldContext } from "..";
import SelectLookup from "@/components/global/select/SelectLookup";
import { ComponentProps } from "react";

type SelectLookupFieldProps = {
  label: string;
  lookupName: string;
  placeholder?: string;
  description?: string;
} & Omit<
  ComponentProps<typeof SelectLookup>,
  "label" | "value" | "onSelect" | "lookupName" | "error"
>;

const SelectLookupField = ({
  label,
  lookupName,
  placeholder,
  description,
  ...props
}: SelectLookupFieldProps) => {
  const field = useFieldContext<number>();

  return (
    <div className="space-y-2">
      <SelectLookup
        value={field.state.value}
        onSelect={(value: any) => field.handleChange(value)}
        onBlur={field.handleBlur}
        lookupName={lookupName}
        label={label}
        placeholder={placeholder}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors.join(", ")
            : undefined
        }
        {...props}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SelectLookupField;
