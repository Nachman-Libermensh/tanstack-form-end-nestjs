import { Textarea } from "rizzui";
import { useFieldContext } from "..";
import FieldErrors from "./field-errors";

type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  componentProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
    style?: React.CSSProperties;
  };
};

const TextAreaField = ({ label, placeholder, componentProps }: TextAreaFieldProps) => {
  const field = useFieldContext<string>();
  
  return (
    <div className="space-y-1">
      <Textarea
        label={label}
        id={field.name}
        placeholder={placeholder}
        value={field.state.value || ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...componentProps}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};

export default TextAreaField;