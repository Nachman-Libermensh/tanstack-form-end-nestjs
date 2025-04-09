"use client";
import { useFormBuilder } from "../../context/form-builder-context";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function TanstackCodeViewer() {
  const { fields } = useFormBuilder();
  const [activeTab, setActiveTab] = useState("zod");

  // יוצר את קוד הטייפסקריפט לזוד סכמה
  const generateZodSchema = () => {
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

  // יוצר את קוד ריאקט לטנסטק פורם
  const generateTanstackForm = () => {
    if (fields.length === 0) return "// אין שדות בטופס";

    const imports = `import { useForm } from '@tanstack/react-form';\n`;
    const zodImport = `import { formSchema, FormValues } from './schema';\n`;
    const zodResolver = `import { zodValidator } from '@tanstack/zod-form-adapter';\n\n`;

    let formCode = `export default function MyForm() {\n`;
    formCode += `  const form = useForm<FormValues>({\n`;
    formCode += `    defaultValues: {\n`;

    fields.forEach((field) => {
      let defaultValue;
      switch (field.type) {
        case "checkbox":
          defaultValue = "false";
          break;
        case "number":
          defaultValue = "0";
          break;
        default:
          defaultValue = "''";
      }
      formCode += `      ${field.name}: ${defaultValue},\n`;
    });

    formCode += `    },\n`;
    formCode += `    onSubmit: async ({ value }) => {\n`;
    formCode += `      // כאן תוכל לשלוח את הנתונים לשרת\n`;
    formCode += `      console.log('ערכים שנשלחו:', value);\n`;
    formCode += `    },\n`;
    formCode += `    validatorAdapter: zodValidator,\n`;
    formCode += `  });\n\n`;

    formCode += `  return (\n`;
    formCode += `    <form.Provider>\n`;
    formCode += `      <form\n`;
    formCode += `        onSubmit={(e) => {\n`;
    formCode += `          e.preventDefault();\n`;
    formCode += `          e.stopPropagation();\n`;
    formCode += `          form.handleSubmit();\n`;
    formCode += `        }}\n`;
    formCode += `        className="space-y-4"\n`;
    formCode += `      >\n`;

    fields.forEach((field) => {
      formCode += `        <form.Field\n`;
      formCode += `          name="${field.name}"\n`;
      formCode += `          validators={{\n`;
      formCode += `            onChange: formSchema.shape.${field.name},\n`;
      formCode += `          }}\n`;
      formCode += `        >\n`;
      formCode += `          {({ value, setValue, errors, isValid }) => (\n`;
      formCode += `            <div>\n`;

      if (field.type !== "checkbox") {
        formCode += `              <label htmlFor="${field.id}">${field.label}</label>\n`;
      }

      switch (field.type) {
        case "checkbox":
          formCode += `              <div className="flex items-center gap-2">\n`;
          formCode += `                <input\n`;
          formCode += `                  type="checkbox"\n`;
          formCode += `                  id="${field.id}"\n`;
          formCode += `                  checked={value}\n`;
          formCode += `                  onChange={(e) => setValue(e.target.checked)}\n`;
          formCode += `                />\n`;
          formCode += `                <label htmlFor="${field.id}">${field.label}</label>\n`;
          formCode += `              </div>\n`;
          break;

        case "select":
          formCode += `              <select\n`;
          formCode += `                id="${field.id}"\n`;
          formCode += `                value={value}\n`;
          formCode += `                onChange={(e) => setValue(e.target.value)}\n`;
          formCode += `                className="w-full p-2 border rounded"\n`;
          formCode += `              >\n`;
          if (field.placeholder) {
            formCode += `                <option value="">${field.placeholder}</option>\n`;
          }

          field.options?.forEach((option) => {
            formCode += `                <option value="${option.value}">${option.label}</option>\n`;
          });

          formCode += `              </select>\n`;
          break;

        case "textarea":
          formCode += `              <textarea\n`;
          formCode += `                id="${field.id}"\n`;
          formCode += `                value={value}\n`;
          formCode += `                onChange={(e) => setValue(e.target.value)}\n`;
          formCode += `                placeholder="${
            field.placeholder || ""
          }"\n`;
          formCode += `                className="w-full p-2 border rounded"\n`;
          formCode += `              />\n`;
          break;

        case "password":
          formCode += `              <div className="relative">\n`;
          formCode += `                <input\n`;
          formCode += `                  type="password"\n`;
          formCode += `                  id="${field.id}"\n`;
          formCode += `                  value={value}\n`;
          formCode += `                  onChange={(e) => setValue(e.target.value)}\n`;
          formCode += `                  placeholder="${
            field.placeholder || ""
          }"\n`;
          formCode += `                  className="w-full p-2 border rounded${
            field.passwordOptions?.showToggle ? " pr-10" : ""
          }"\n`;
          formCode += `                />\n`;

          if (field.passwordOptions?.showToggle) {
            formCode += `                <button\n`;
            formCode += `                  type="button"\n`;
            formCode += `                  className="absolute inset-y-0 right-0 px-3 py-1"\n`;
            formCode += `                  onClick={() => { /* טוגל תצוגת סיסמה */ }}\n`;
            formCode += `                >\n`;
            formCode += `                  👁️\n`;
            formCode += `                </button>\n`;
          }

          if (field.passwordOptions?.showStrengthIndicator) {
            formCode += `                {value && <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">\n`;
            formCode += `                  <div\n`;
            formCode += `                    className={\`h-full \${getPasswordStrengthColor(value)}\`}\n`;
            formCode += `                    style={{ width: \`\${calculatePasswordStrength(value)}%\` }}\n`;
            formCode += `                  ></div>\n`;
            formCode += `                </div>}\n`;
          }

          formCode += `              </div>\n`;
          break;

        default:
          formCode += `              <input\n`;
          formCode += `                type="${field.type}"\n`;
          formCode += `                id="${field.id}"\n`;
          formCode += `                value={value}\n`;
          formCode += `                onChange={(e) => setValue(e.target.value)}\n`;
          formCode += `                placeholder="${
            field.placeholder || ""
          }"\n`;
          formCode += `                className="w-full p-2 border rounded"\n`;
          formCode += `              />\n`;
      }

      formCode += `              {!isValid && errors.length > 0 && (\n`;
      formCode += `                <div className="text-red-500 text-sm mt-1">{errors[0]}</div>\n`;
      formCode += `              )}\n`;
      formCode += `            </div>\n`;
      formCode += `          )}\n`;
      formCode += `        </form.Field>\n\n`;
    });

    formCode += `        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">שלח</button>\n`;
    formCode += `      </form>\n`;
    formCode += `    </form.Provider>\n`;
    formCode += `  );\n`;
    formCode += `}\n`;

    return imports + zodImport + zodResolver + formCode;
  };

  const generateNestJSSchema = () => {
    if (fields.length === 0) return "// אין שדות בטופס";

    const imports = `import { ApiProperty } from '@nestjs/swagger';\n`;
    const zodImport = `import { z } from 'zod';\n`;
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

    // הוסף גם סכימת Zod ל-NestJS מבוססת Zod
    dtoCode += `export const formZodSchema = z.object({\n`;
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

        if (field.validations.message) {
          fieldSchema += `.message("${field.validations.message}")`;
        }
      }

      if (!field.required) {
        fieldSchema += `.optional()`;
      }

      dtoCode += `  ${field.name}: ${fieldSchema},\n`;
    });
    dtoCode += `});\n`;

    return imports + zodImport + classValidatorImport + dtoCode;
  };

  // פונקציה לקבלת שם הקובץ המתאים לכל לשונית
  const getFilename = (tab: string) => {
    switch (tab) {
      case "zod":
        return "schema.ts";
      case "tanstack":
        return "MyForm.tsx";
      case "nestjs":
        return "form.dto.ts";
      default:
        return "code.ts";
    }
  };

  // מערך טאבים עבור CodeBlock
  const tabs = [
    {
      name: "Zod Schema",
      code: generateZodSchema(),
      language: "typescript",
    },
    {
      name: "TanStack Form",
      code: generateTanstackForm(),
      language: "tsx",
    },
    {
      name: "NestJS DTO",
      code: generateNestJSSchema(),
      language: "typescript",
    },
  ];

  return (
    <Tabs defaultValue="zod" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-2">
        <TabsTrigger value="zod">Zod סכמה</TabsTrigger>
        <TabsTrigger value="tanstack">TanStack טופס</TabsTrigger>
        <TabsTrigger value="nestjs">NestJS DTO</TabsTrigger>
      </TabsList>

      <TabsContent value="zod">
        <CodeBlock
          language="typescript"
          code={generateZodSchema()}
          filename={getFilename("zod")}
        />
      </TabsContent>

      <TabsContent value="tanstack">
        <CodeBlock
          language="tsx"
          code={generateTanstackForm()}
          filename={getFilename("tanstack")}
        />
      </TabsContent>

      <TabsContent value="nestjs">
        <CodeBlock
          language="typescript"
          code={generateNestJSSchema()}
          filename={getFilename("nestjs")}
        />
      </TabsContent>
    </Tabs>
  );
}
