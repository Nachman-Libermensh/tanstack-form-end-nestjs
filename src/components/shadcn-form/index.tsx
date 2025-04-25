import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./form-components/text.field";
import CheckboxField from "./form-components/checkbox.field";
import { SelectField } from "./form-components/select.field";
import { SubmitButton } from "./form-components/submit-button";
import { PasswordInput } from "./form-components/password-input.field";
import FormLayout from "./form-components/form-layout";
import { FormSection } from "./form-components/form-section";
import { DatePickerField } from "./form-components/date-picker.field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CheckboxField,
    SelectField,
    PasswordInput,
    DatePickerField,
  },
  formComponents: {
    SubmitButton,
    FormLayout,
    FormSection,
  },
});
