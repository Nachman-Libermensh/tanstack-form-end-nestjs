import { useFieldContext } from "..";
import { Checkbox } from "rizzui";
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
          {/* <Label htmlFor={field.name} className="cursor-pointer">
            {label}
          </Label> */}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CheckboxField;
