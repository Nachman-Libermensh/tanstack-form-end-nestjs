import { FieldConfig } from "../../types";

export function generateZodSchema(fields: FieldConfig[]) {
  // Generate imports
  const imports = `import { z } from "zod";`;

  // Generate field validations
  const fieldValidations = fields.map((field) => {
    const validations = [];

    // Base validation
    validations.push(`z.string()`);

    // Required validation
    if (field.required) {
      validations.push(`.min(1, { message: "שדה חובה" })`);
    }

    // Min length validation
    if (field.validations?.minLength) {
      validations.push(
        `.min(${field.validations.minLength}, { message: "אורך מינימלי: ${field.validations.minLength} תווים" })`
      );
    }

    // Max length validation
    if (field.validations?.maxLength) {
      validations.push(
        `.max(${field.validations.maxLength}, { message: "אורך מקסימלי: ${field.validations.maxLength} תווים" })`
      );
    }

    // Email validation
    if (field.type === "email") {
      validations.push(`.email({ message: "אימייל לא תקין" })`);
    }

    // Optional flag (must be last)
    if (!field.required) {
      validations.push(`.optional()`);
    }

    return `  ${field.name}: ${validations.join("")}`;
  });

  // Generate full schema
  const schemaCode = `
export const formSchema = z.object({
${fieldValidations.join(",\n")}
});

export type FormValues = z.infer<typeof formSchema>;
`;

  return {
    imports,
    schemaCode,
  };
}
