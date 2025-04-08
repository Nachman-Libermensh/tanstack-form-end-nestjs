import { useFieldContext } from "..";

import FieldErrors from "./field-errors";
import SelectLookup from "@/components/global/select/SelectLookup";


type SelectFieldProps = {
  label: string;
  lookupName: string;
  placeholder?: string;
};

export const SelectLookupField = ({ label, lookupName }: SelectFieldProps) => {
  const field = useFieldContext<number>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <SelectLookup
          value={field.state.value}
          onSelect={(value: any) => field.handleChange(value)}
          lookupName={lookupName}
          label={label}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
