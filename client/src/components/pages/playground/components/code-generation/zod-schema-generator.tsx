import { FormFieldConfig } from "../../types";

// יוצר את קוד הטייפסקריפט לזוד סכמה
export const generateZodSchema = (fields: FormFieldConfig[]) => {
  if (fields.length === 0) return "// אין שדות בטופס";

  const imports = `import { z } from 'zod';\n\n`;

  let schema = `export const formSchema = z.object({\n`;

  fields.forEach((field) => {
    let fieldSchema = "";

    switch (field.type) {
      case "text":
        fieldSchema = `z.string()`;
        break;
      case "email":
        fieldSchema = `z.string().email()`;
        break;
      case "password":
        fieldSchema = `z.string()`;
        break;
      case "number":
        fieldSchema = `z.number()`;
        break;
      case "checkbox":
        fieldSchema = `z.boolean()`;
        break;
      case "select":
        fieldSchema = `z.string()`;
        break;
      case "textarea":
        fieldSchema = `z.string()`;
        break;
      default:
        fieldSchema = `z.string()`;
    }

    // הוספת אימותים
    if (field.validations) {
      if (
        field.type === "text" ||
        field.type === "password" ||
        field.type === "email" ||
        field.type === "textarea"
      ) {
        if (field.validations.minLength) {
          fieldSchema += `.min(${field.validations.minLength})`;
        }
        if (field.validations.maxLength) {
          fieldSchema += `.max(${field.validations.maxLength})`;
        }
        if (field.validations.pattern) {
          fieldSchema += `.regex(new RegExp("${field.validations.pattern}"))`;
        }
      }

      if (field.type === "number") {
        if (field.validations.min !== undefined) {
          fieldSchema += `.min(${field.validations.min})`;
        }
        if (field.validations.max !== undefined) {
          fieldSchema += `.max(${field.validations.max})`;
        }
      }

      // הוספת הודעת שגיאה מותאמת
      if (field.validations.message) {
        fieldSchema += `.message("${field.validations.message}")`;
      }
    }

    // אם השדה הוא לא חובה, נוסיף אופציונלי
    if (!field.required) {
      fieldSchema += `.optional()`;
    }

    schema += `  ${field.name}: ${fieldSchema},\n`;
  });

  schema += `});\n\n`;
  schema += `export type FormValues = z.infer<typeof formSchema>;`;

  return imports + schema;
};
