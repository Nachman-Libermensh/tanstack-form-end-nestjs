import { generateFieldCode } from "./generate-field-code";

export function generateFormCode(fields: { name: string; label: string }[]) {
  const defaultValues = fields.map((f) => `${f.name}: ""`).join(", ");
  const fieldsCode = fields
    .map((f) => generateFieldCode(f.name, f.label))
    .join("\n");

  return `/* eslint-disable react/no-children-prop */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

const Page = () => {
  const form = useForm({
    defaultValues: { ${defaultValues} },
    onSubmit: async ({ value }) => console.log(value),
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
