"use client";
import { useFormBuilder } from "../../context/form-builder-context";
import { CodeBlock } from "@/components/ui/code-block";
import { generateZodSchema } from "./zod-schema-generator";
import { generateNestJSSchema } from "./nestjs-dto-viewer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";

export default function TanstackCodeViewer() {
  const { fields } = useFormBuilder();
  //   const [activeTab, setActiveTab] = useState("zod");

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

  //   // פונקציה לקבלת שם הקובץ המתאים לכל לשונית
  //   const getFilename = (tab: string) => {
  //     switch (tab) {
  //       case "zod":
  //         return "schema.ts";
  //       case "tanstack":
  //         return "MyForm.tsx";
  //       case "nestjs":
  //         return "form.dto.ts";
  //       default:
  //         return "code.ts";
  //     }
  //   };

  // מערך טאבים עבור CodeBlock
  const tabs = [
    {
      name: "schema.ts",
      code: generateZodSchema(fields),
      language: "typescript",
    },
    {
      name: "MyForm.tsx",
      code: generateTanstackForm(),
      language: "tsx",
    },
    {
      name: "form.dto.ts",
      code: generateNestJSSchema(fields),
      language: "typescript",
    },
  ];

  return <CodeBlock filename="" language="ts" tabs={tabs} />;
}
