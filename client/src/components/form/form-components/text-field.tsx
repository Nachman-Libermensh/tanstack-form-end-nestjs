import { Input } from "@/components/ui/input";
import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
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
      <Label htmlFor={field.name}>{label}</Label>
      <Input
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
