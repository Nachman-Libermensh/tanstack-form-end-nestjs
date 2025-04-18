import { generateFieldCode } from "./generate-field-code";
import { FieldConfig } from "../../types";
import { generateZodSchema } from "./generate-zod-schema";

export function generateFormCode(fields: FieldConfig[]) {
  const defaultValues = fields.map((f) => `${f.name}: ""`).join(", ");
  const fieldsCode = fields
    .map((f) => generateFieldCode(f.name, f.label, f.placeholder, f.required))
    .join("\n");

  // Generate Zod schema
  const { imports: zodImports, schemaCode } = generateZodSchema(fields);

  return `/* eslint-disable react/no-children-prop */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
${zodImports}

${schemaCode}

const Page = () => {
  const form = useForm({
    defaultValues: { ${defaultValues} },
    onSubmit: async ({ value }) => console.log(value),
    validators: {
      // Connect Zod validation
      onChange: formSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
${fieldsCode}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Page;`;
}
