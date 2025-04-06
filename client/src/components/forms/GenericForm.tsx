import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
} from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

// טייפ למה שאנחנו צריכים מהפורם
interface FormApi<TValues extends Record<string, any>> {
  Field: (props: {
    name: string;
    children: (props: {
      value: any;
      error: { message?: string } | undefined;
      onChange: (value: any) => void;
      onBlur: () => void;
    }) => ReactNode;
  }) => ReactElement;
  handleSubmit: () => Promise<void>;
  // ניתן להוסיף כאן עוד מתודות שנדרשות
}

// הגדרת טייפ ספציפי עבור הקונטקסט
interface FormContextType<TValues extends Record<string, any>> {
  form: FormApi<TValues>;
}

// יצירת הקונטקסט עם הטייפ החדש
const FormContext = createContext<FormContextType<any> | null>(null);

export function useFormContext<TValues extends Record<string, any>>() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a GenericForm");
  }
  return context as FormContextType<TValues>;
}

interface GenericFormProps<TValues extends Record<string, any>> {
  schema: z.ZodType<TValues>;
  defaultValues: TValues;
  onSubmit: (values: TValues) => void | Promise<void>;
  children: ReactNode;
}

export function GenericForm<TValues extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: GenericFormProps<TValues>) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
    validators: { onChange: schema },
  });
  const {} = form;
  console.log(form);

  return (
    <FormContext.Provider value={{ form: form as unknown as FormApi<TValues> }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
