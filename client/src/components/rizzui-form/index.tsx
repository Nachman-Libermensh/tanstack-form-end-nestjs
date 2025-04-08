import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./form-components/text-field.field";
import CheckboxField from "./form-components/checkbox-field";
import { SubmitButton } from "./form-components/submit-button";
import { PasswordInput } from "./form-components/password-input.field";
import TextAreaField from "./form-components/text-area-field";
import FormLayout from "./form-components/form-layout";
import { FormSection } from "./form-components/FormSection";
import DatePickerField from "./form-components/date-picker.field";
import FileUploadField from "./form-components/file-upload.field";

// יצירת Context עבור השדות והטופס
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CheckboxField,

    PasswordInput,
    TextAreaField,
    DatePickerField,
    FileUploadField,
  },
  formComponents: {
    FormLayout,
    FormSection,
    SubmitButton,
  },
});
