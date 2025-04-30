import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

// יצירת Context עבור השדות והטופס
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

/**
 * קומפוננטות מבנה טופס
 */
const FormLayout = lazy(() => import("./form-components/form-layout"));
const FormSection = lazy(() => import("./form-components/FormSection"));
const SubmitButton = lazy(() => import("./form-components/submit-button"));

/**
 * שדות קלט בסיסיים
 */
const TextField = lazy(() => import("./form-components/text.field"));
const TextAreaField = lazy(() => import("./form-components/text-area.field"));
const CheckboxField = lazy(() => import("./form-components/checkbox.field"));
const PasswordInputField = lazy(
  () => import("./form-components/password-input.field")
);
const DatePickerField = lazy(
  () => import("./form-components/date-picker.field")
);
const FileUploadField = lazy(
  () => import("./form-components/file-upload.field")
);

/**
 * שדות בחירה
 */
const SelectField = lazy(() => import("./form-components/select.field"));

/**
 * יצירת והגדרת ה-hook של הטופס
 */
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,

  // קומפוננטות מבנה
  formComponents: {
    FormLayout,
    FormSection,
    SubmitButton,
  },

  // קומפוננטות שדות
  fieldComponents: {
    // שדות קלט בסיסיים
    TextField,
    TextAreaField,
    CheckboxField,
    PasswordInputField,
    DatePickerField,
    FileUploadField,

    // שדות בחירה
    SelectField,
  },
});
