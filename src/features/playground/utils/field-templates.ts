import { FormFieldConfig, FieldType } from "../types";
import { nanoid } from "./nanoid";

export const createFieldTemplate = (
  type: FieldType,
  index: number
): FormFieldConfig => {
  const baseField: FormFieldConfig = {
    id: nanoid(),
    type,
    name: `field_${type}_${index}`,
    label: "",
    required: false,
    placeholder: "",
  };

  switch (type) {
    case "text":
      return {
        ...baseField,
        label: "שדה טקסט",
        placeholder: "הכנס טקסט",
      };

    case "email":
      return {
        ...baseField,
        label: "כתובת אימייל",
        placeholder: "הכנס כתובת אימייל",
        validations: {
          pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
          message: "כתובת אימייל לא תקינה",
        },
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

    case "number":
      return {
        ...baseField,
        label: "מספר",
        placeholder: "הכנס מספר",
        validations: {
          min: 0,
          max: 100,
        },
      };

    case "textarea":
      return {
        ...baseField,
        label: "טקסט מרובה שורות",
        placeholder: "הכנס טקסט מרובה שורות",
        rows: 4,
      };

    case "select":
      return {
        ...baseField,
        label: "רשימת בחירה",
        placeholder: "בחר אפשרות",
        options: [
          { label: "אפשרות ראשונה", value: "option1" },
          { label: "אפשרות שנייה", value: "option2" },
          { label: "אפשרות שלישית", value: "option3" },
        ],
      };

    case "checkbox":
      return {
        ...baseField,
        label: "תיבת סימון",
        checkboxLabel: "אני מסכים לתנאים",
      };

    case "radio":
      return {
        ...baseField,
        label: "כפתורי רדיו",
        options: [
          { label: "אפשרות א", value: "a" },
          { label: "אפשרות ב", value: "b" },
          { label: "אפשרות ג", value: "c" },
        ],
      };

    case "date":
      return {
        ...baseField,
        label: "תאריך",
        placeholder: "בחר תאריך",
      };

    case "time":
      return {
        ...baseField,
        label: "שעה",
        placeholder: "בחר שעה",
      };

    case "datetime":
      return {
        ...baseField,
        label: "תאריך ושעה",
        placeholder: "בחר תאריך ושעה",
      };

    case "file":
      return {
        ...baseField,
        label: "העלאת קובץ",
        placeholder: "בחר קובץ להעלאה",
        validations: {
          maxLength: 5, // Max 5MB
          pattern: "image/*,application/pdf", // Accepted file types
        },
      };

    case "url":
      return {
        ...baseField,
        label: "כתובת אתר",
        placeholder: "https://example.com",
        validations: {
          pattern: "^https?:\\/\\/.+",
          message: "כתובת אתר לא תקינה",
        },
      };

    case "tel":
      return {
        ...baseField,
        label: "מספר טלפון",
        placeholder: "050-1234567",
        validations: {
          pattern: "^[0-9\\-\\+\\s\\(\\)]+$",
          message: "מספר טלפון לא תקין",
        },
      };

    case "range":
      return {
        ...baseField,
        label: "מחוון טווח",
        validations: {
          min: 0,
          max: 100,
        },
        defaultValue: "50",
      };

    case "color":
      return {
        ...baseField,
        label: "בוחר צבע",
        defaultValue: "#3B82F6",
      };

    default:
      return baseField;
  }
};
