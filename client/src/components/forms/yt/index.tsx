import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./text-field";
import CheckboxField from "./checkbox-field";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";

// יצירת Context עבור השדות והטופס
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CheckboxField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
});
