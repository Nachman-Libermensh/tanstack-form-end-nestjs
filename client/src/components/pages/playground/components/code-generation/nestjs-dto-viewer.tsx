import { FormFieldConfig } from "../../types";

export const generateNestJSSchema = (fields: FormFieldConfig[]) => {
  if (fields.length === 0) return "// אין שדות בטופס";

  const imports = `import { ApiProperty } from '@nestjs/swagger';\n`;
  const classValidatorImport = `import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber, Min, Max, MinLength, MaxLength, Matches } from 'class-validator';\n\n`;

  let dtoCode = `export class FormDto {\n`;

  fields.forEach((field) => {
    dtoCode += `  @ApiProperty({ description: '${
      field.label || field.name
    }' })\n`;

    // הוספת אימותים מ-class-validator
    switch (field.type) {
      case "email":
        dtoCode += `  @IsEmail()\n`;
        break;
      case "text":
      case "password":
      case "textarea":
        dtoCode += `  @IsString()\n`;
        if (field.validations?.minLength) {
          dtoCode += `  @MinLength(${field.validations.minLength})\n`;
        }
        if (field.validations?.maxLength) {
          dtoCode += `  @MaxLength(${field.validations.maxLength})\n`;
        }
        if (field.validations?.pattern) {
          dtoCode += `  @Matches(/${field.validations.pattern}/)\n`;
        }
        break;

      case "number":
        dtoCode += `  @IsNumber()\n`;
        if (field.validations?.min !== undefined) {
          dtoCode += `  @Min(${field.validations.min})\n`;
        }
        if (field.validations?.max !== undefined) {
          dtoCode += `  @Max(${field.validations.max})\n`;
        }
        break;
      case "checkbox":
        dtoCode += `  @IsBoolean()\n`;
        break;
      case "select":
        dtoCode += `  @IsString()\n`;
        break;
    }

    if (!field.required) {
      dtoCode += `  @IsOptional()\n`;
    }

    // הגדר את הטיפוס הנכון
    let fieldType;
    switch (field.type) {
      case "number":
        fieldType = "number";
        break;
      case "checkbox":
        fieldType = "boolean";
        break;
      default:
        fieldType = "string";
    }

    dtoCode += `  ${field.name}: ${fieldType};\n\n`;
  });

  dtoCode += `}\n\n`;

  return imports + classValidatorImport + dtoCode;
};
