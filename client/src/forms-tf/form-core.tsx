/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFormHook, useForm } from "@tanstack/react-form";
import { formContext, fieldContext } from "./form-context";
import { FormField } from "./form-field";

type FormProviderProps = {
  children?: React.ReactNode;
  defaultValues?: Record<string, any>;
  validators?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
};

export const FormProvider = ({
  children,
  defaultValues = {},
  validators = {},
  onSubmit = async (values) => {
    console.log("Form submitted:", values);
    console.log("עליך למלא את הפונקציה הזו כדי לשלוח את הטופס");
  },
}: FormProviderProps) => {
  const {} = createFormHook({
    formContext,
    fieldContext,
    fieldComponents: [FormField],
    formComponents: [],
  });
  const form = useForm({
    defaultValues,
    validators,
    onSubmit,
  });

  return (
    <formContext.Provider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {children}
      </form>
    </formContext.Provider>
  );
};
