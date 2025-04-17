import { useFieldContext } from "..";
import { Checkbox } from "rizzui";
import FieldErrors from "./field-errors";
type CheckboxFieldProps = {
  label: string;
  description?: string;
};

const CheckboxField = ({ label, description }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          label={label}
          id={field.name}
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
          onBlur={field.handleBlur}
        />
        <div className="grid gap-1.5 leading-none">
        
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
export default CheckboxField;
