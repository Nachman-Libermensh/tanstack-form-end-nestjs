import { Input } from "rizzui";
import { useFieldContext } from "..";
import FieldErrors from "./field-errors";
type TextFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const TextField = ({ label }: TextFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <div className="space-y-1">
      <Input
        label={label}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
export default TextField;
