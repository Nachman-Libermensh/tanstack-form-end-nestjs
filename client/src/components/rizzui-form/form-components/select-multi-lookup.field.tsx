import { useFieldContext } from "..";
import FieldErrors from "./field-errors";
import SelectMultiLookup from "@/components/global/select/SelectMultiLookup";

type SelectMultiLookupFieldProps = {
  label: string;
  lookupName: string;
  placeholder?: string;
  className?: string;
};

export const SelectMultiLookupField = ({
  label,
  lookupName,
  placeholder,
  className = "w-full",
}: SelectMultiLookupFieldProps) => {
  const field = useFieldContext<number[]>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <SelectMultiLookup
          value={field.state.value || []}
          label={label}
          onSelect={(selectedOptions) => {
            // Convert options to numeric IDs
            const numericIds = selectedOptions
              ? selectedOptions
                  .map((option) =>
                    typeof option === "object" ? option.value : option
                  )
                  .map((id) => (typeof id === "string" ? parseInt(id, 10) : id))
              : [];
            field.handleChange(numericIds);
          }}
          lookupName={lookupName}
          placeholder={placeholder}
          className={className}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};

export default SelectMultiLookupField;
