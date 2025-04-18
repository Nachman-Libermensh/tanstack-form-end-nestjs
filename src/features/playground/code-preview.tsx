import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

interface CodePreviewProps {
  code: string;
}

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock filename="" code={code} language="tsx" />
      </CardContent>
    </Card>
  );
}
