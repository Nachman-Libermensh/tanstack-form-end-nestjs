"use client";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { useCallback } from "react";
import { PlusCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FormBuilderCanvas() {
  const { fields, removeField } = useFormBuilder();

  const handleFieldRemove = useCallback(
    (fieldId: string) => {
      removeField(fieldId);
    },
    [removeField]
  );

  if (fields.length === 0) {
    return (
      <div className="py-8">
        <Alert variant="default" className="bg-muted border-dashed">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>הטופס ריק</AlertTitle>
          <AlertDescription>
            בחר שדות מהפלטה למעלה כדי להתחיל לבנות את הטופס שלך.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      {fields.map((field) => (
        <FormField key={field.id} field={field} onRemove={handleFieldRemove} />
      ))}

      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          className="border-dashed w-full max-w-sm"
          size="sm"
          onClick={() =>
            document
              .getElementById("field-palette")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          הוסף שדה
        </Button>
      </div>
    </div>
  );
}
