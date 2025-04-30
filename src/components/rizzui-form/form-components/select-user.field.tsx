import { UserSelect } from "@/components/global/select/select-users";
import { useFieldContext } from "..";
import { ComponentProps } from "react";

type SelectUserFieldProps = {
  disabled?: boolean;
} & Omit<
  ComponentProps<typeof UserSelect>,
  "onChange" | "value" | "onBlur" | "error"
>;

export default function SelectUserField({
  disabled = false,
  ...props
}: SelectUserFieldProps) {
  const field = useFieldContext<number>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <UserSelect
          disabled={disabled}
          onChange={(val: any) => field.handleChange(val?.id ?? null)}
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
}
