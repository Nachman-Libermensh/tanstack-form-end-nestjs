import { UserSelect } from "@/components/global/select/select-users";
import { useFieldContext } from "..";

import FieldErrors from "./field-errors";

type SelectUserFieldProps = {
  disabled?: boolean;
};

export const SelectUserField = ({ disabled = false }: SelectUserFieldProps) => {
  const field = useFieldContext<number>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <UserSelect
          disabled={disabled}
          onChange={(val: any) => field.handleChange(val?.id ?? null)}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
