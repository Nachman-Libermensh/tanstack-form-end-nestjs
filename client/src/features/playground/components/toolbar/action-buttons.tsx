"use client";
import { useFormBuilder } from "../../context/form-builder-context";
import { Button } from "@/components/ui/button";
import { Download, FileDown, Code, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TanstackCodeViewer from "../code-generation/tanstack-code-viewer";

export default function ActionButtons() {
  const { fields } = useFormBuilder();
  const [showCode, setShowCode] = useState(false);

  const exportForm = () => {
    if (fields.length === 0) return;

    const formData = JSON.stringify(fields, null, 2);
    const blob = new Blob([formData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={exportForm}
          disabled={fields.length === 0}
          className="flex items-center gap-1"
        >
          <FileDown size={16} />
          <span>ייצא טופס</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(true)}
          disabled={fields.length === 0}
          className="flex items-center gap-1"
        >
          <Code size={16} />
          <span>הצג קוד</span>
        </Button>
      </div>

      <Dialog open={showCode} onOpenChange={setShowCode}>
        <DialogContent className=" w-max min-w-5xl max-w-full">
          <DialogHeader>
            <DialogTitle>קוד מחולל</DialogTitle>
          </DialogHeader>
          <TanstackCodeViewer />
        </DialogContent>
      </Dialog>
    </>
  );
}
