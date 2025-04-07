import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./form-components/text-field";
import CheckboxField from "./form-components/checkbox-field";
import { SelectField } from "./form-components/select-field";
import { SubmitButton } from "./form-components/submit-button";

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
