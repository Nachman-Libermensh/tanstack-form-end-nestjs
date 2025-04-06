/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFormHook } from "@tanstack/react-form";
import { z } from "zod";
import { fieldContext, formContext, FieldType } from "./form-core";
import {
  TextField,
  CheckboxField,
  SelectField,
  TextAreaField,
  OTPField,
} from "./form-fields";
import { SubmitButton, ResetButton, FormContainer } from "./form-components";

// יצירת הוק טופס מתקדם
export const useAppForm = <TValues extends Record<string, any>>() => {
  const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TextField,
      CheckboxField,
      SelectField,
      TextAreaField,
      OTPField,
    },
    formComponents: {
      SubmitButton,
      ResetButton,
      FormContainer,
    },
  });

  return {
    useForm: <
      TSchema extends z.ZodType<any, any> = z.ZodType<TValues, any>
    >(options: {
      defaultValues: TValues;
      schema: TSchema;
      onSubmit: (values: TValues) => Promise<void> | void;
    }) => {
      return useAppForm({
        defaultValues: options.defaultValues,
        validators: {
          //     onChange: options.schema,
          onSubmit: options.schema,
        },
        onSubmit: async ({ value }) => {
          try {
            await options.onSubmit(value as TValues);
          } catch (error) {
            console.error("Form submission error:", error);
            throw error;
          }
        },
      });
    },
  };
};

// עטיפה נוחה לפונקציית useAppForm
export const useCreateForm = () => {
  return useAppForm();
};
