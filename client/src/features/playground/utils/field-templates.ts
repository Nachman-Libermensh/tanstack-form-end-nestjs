import { FormFieldConfig, FieldType } from "../types";
import { nanoid } from "./nanoid";

export const createFieldTemplate = (
  type: FieldType,
  index: number
): FormFieldConfig => {
  const baseField: FormFieldConfig = {
    id: nanoid(),
    type,
    name: `field_${index}`,
    label: "",
    required: false,
    placeholder: "",
  };

  switch (type) {
    case "text":
      return {
        ...baseField,
        label: "טקסט חדש",
        placeholder: "הכנס טקסט",
      };

    case "password":
      return {
        ...baseField,
        label: "סיסמה",
        placeholder: "הכנס סיסמה",
        validations: {
          minLength: 8,
          pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
          message: "סיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר",
        },
        passwordOptions: {
          showToggle: true,
          showStrengthIndicator: true,
          strengthIndicatorType: "basic",
        },
      };

    case "checkbox":
      return {
        ...baseField,
        label: "תיבת סימון",
        placeholder: "",
      };

    case "email":
      return {
        ...baseField,
        label: "אימייל",
        placeholder: "הכנס כתובת אימייל",
        validations: {
          pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          message: "כתובת אימייל לא תקינה",
        },
      };

    case "number":
      return {
        ...baseField,
        label: "מספר",
        placeholder: "הכנס מספר",
      };

    case "select":
      return {
        ...baseField,
        label: "בחירה",
        placeholder: "בחר אפשרות",
        options: [
          { label: "אפשרות 1", value: "option1" },
          { label: "אפשרות 2", value: "option2" },
          { label: "אפשרות 3", value: "option3" },
        ],
      };

    case "textarea":
      return {
        ...baseField,
        label: "טקסט ארוך",
        placeholder: "הכנס טקסט ארוך",
      };

    default:
      return baseField;
  }
};
