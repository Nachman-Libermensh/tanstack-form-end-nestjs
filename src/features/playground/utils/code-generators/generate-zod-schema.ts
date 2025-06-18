import { FieldConfig } from "../../types";

export function generateZodSchema(fields: FieldConfig[]) {
  // Generate imports
  const imports = `import { z } from "zod";`;

  // Generate field validations with improved type safety
  const fieldValidations = fields.map((field) => {
    const validations = [];
    let baseType = "z.string()";

    // Determine base type
    switch (field.type) {
      case "number":
      case "range":
        baseType = "z.coerce.number()";
        break;
      case "checkbox":
        baseType = "z.boolean()";
        break;
      case "date":
      case "time":
      case "datetime":
        baseType = "z.coerce.date()";
        break;
      case "email":
        baseType = "z.string().email()";
        break;
      case "url":
        baseType = "z.string().url()";
        break;
      case "file":
        baseType = "z.instanceof(File).or(z.string())";
        break;
      default:
        baseType = "z.string()";
    }

    validations.push(baseType);

    // Add type-specific validations
    if (field.type === "number" || field.type === "range") {
      if (field.validations?.min !== undefined) {
        validations.push(`.min(${field.validations.min})`);
      }
      if (field.validations?.max !== undefined) {
        validations.push(`.max(${field.validations.max})`);
      }
    }

    // String length validations
    if (
      ["text", "textarea", "password", "email", "url", "tel"].includes(
        field.type
      )
    ) {
      if (field.validations?.minLength) {
        validations.push(
          `.min(${field.validations.minLength}, { message: "אורך מינימלי: ${field.validations.minLength} תווים" })`
        );
      }
      if (field.validations?.maxLength) {
        validations.push(
          `.max(${field.validations.maxLength}, { message: "אורך מקסימלי: ${field.validations.maxLength} תווים" })`
        );
      }
    }

    // Pattern validation
    if (
      field.validations?.pattern &&
      field.type !== "email" &&
      field.type !== "url"
    ) {
      const message = field.validations.message || "פורמט לא תקין";
      validations.push(
        `.regex(/${field.validations.pattern}/, { message: "${message}" })`
      );
    }

    // Custom message for email validation
    if (field.type === "email" && field.validations?.message) {
      validations.push(
        `/* Custom email message: ${field.validations.message} */`
      );
    }

    // Required validation (must be last before optional)
    if (field.required && field.type !== "checkbox") {
      validations.push(`.min(1, { message: "שדה חובה" })`);
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

// Helper function for form validation
export const validateForm = (data: unknown) => {
  try {
    return { success: true, data: formSchema.parse(data) };
  } catch (error) {
    return { success: false, error };
  }
};
`;

  return {
    imports,
    schemaCode,
  };
}
