import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { generateFormCode } from "./utils/code-generators/generate-form-code";
import { useFormBuilder } from "./hooks/useFormBuilder";

// interface CodePreviewProps {
// }

export default function CodePreview() {
  const { fields } = useFormBuilder();
  const codeString = generateFormCode(
    fields.map((f) => ({ name: f.name, label: f.label }))
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock filename="" code={codeString} language="tsx" />
      </CardContent>
    </Card>
  );
}
