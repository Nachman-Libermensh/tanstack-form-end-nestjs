import { ReactNode } from "react";
import { useFormContext } from "./GenericForm";

interface FormFieldProps<T = any> {
  name: string;
  children: (fieldProps: {
    value: T;
    onChange: (value: T) => void;
    onBlur: () => void;
    error?: string;
  }) => ReactNode;
}

export function FormField<T = any>({ name, children }: FormFieldProps<T>) {
  const { form } = useFormContext();

  return form.Field({
    name: name,
    children: ({ value, error, onChange, onBlur }) => {
      return children({
        value,
        onChange,
        onBlur,
        error: error?.message,
      });
    },
  });
}
