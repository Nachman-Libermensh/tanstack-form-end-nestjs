import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { generateFormCode } from "./utils/code-generators/generate-form-code";
import { useFormBuilder } from "./hooks/useFormBuilder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";

type CodeFormat = "react" | "next" | "form-only";

export default function CodePreview() {
  const { fields } = useFormBuilder();
  const [format, setFormat] = useState<CodeFormat>("react");
  const [copied, setCopied] = useState(false);

  const codeString = generateFormCode(fields /*, format*/);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    toast.success("הקוד הועתק ללוח");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([codeString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-${format}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("הקוד הורד בהצלחה");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">קוד מוכן</h2>
        <div className="flex items-center gap-2">
          <Select
            value={format}
            onValueChange={(value) => setFormat(value as CodeFormat)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="פורמט קוד" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="form-only">טופס בלבד</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="aspect-square"
          >
            {copied ? (
              <Check className="text-green-600" size={16} />
            ) : (
              <Copy size={16} />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={downloadCode}
            className="aspect-square"
          >
            <Download size={16} />
          </Button>
        </div>
      </div>

      <Card className="border-2">
        <CardContent className="p-0">
          <CodeBlock
            filename={`form.${format}.tsx`}
            code={codeString}
            language="tsx"
          />
        </CardContent>
      </Card>
    </div>
  );
}
