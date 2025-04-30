import { useFieldContext } from "..";
import SelectMultiLookup from "@/components/global/select/SelectMultiLookup";
import { ComponentProps } from "react";

type SelectMultiLookupFieldProps = {
  label: string;
  lookupName: string;
  placeholder?: string;
  description?: string;
} & Omit<
  ComponentProps<typeof SelectMultiLookup>,
  "label" | "value" | "onSelect" | "lookupName" | "error"
>;

const SelectMultiLookupField = ({
  label,
  lookupName,
  placeholder,
  description,
  ...props
}: SelectMultiLookupFieldProps) => {
  const field = useFieldContext<number[]>();

  return (
    <div className="space-y-2">
      <SelectMultiLookup
        value={field.state.value || []}
        label={label}
        onSelect={(selectedOptions) => {
          // המרת אופציות למספרים
          const numericIds = selectedOptions
            ? selectedOptions
                .map((option) =>
                  typeof option === "object" ? option.value : option
                )
                .map((id) => (typeof id === "string" ? parseInt(id, 10) : id))
            : [];
          field.handleChange(numericIds);
        }}
        onBlur={field.handleBlur}
        lookupName={lookupName}
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

export default SelectMultiLookupField;
