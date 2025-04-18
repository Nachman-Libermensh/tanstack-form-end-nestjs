import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { toast } from "sonner";
import { useAppForm } from "@/components/shadcn-form";
import { useFormBuilder } from "./hooks/useFormBuilder";

// interface FormPreviewProps {
// }
interface FormValues {
  [key: string]: string;
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  canSubmit: boolean;
  submissionAttempts: number;
}
export default function FormPreview() {
  const { fields } = useFormBuilder();
  const handleFormSubmit = (value: FormValues, formState: FormState) => {
    console.log("Submitted:", value);

    toast.success("הטופס נשלח בהצלחה ✅", {
      description: (
        <CodeBlock
          filename="form-summary.json"
          language="json"
          code={JSON.stringify(
            {
              values: value,
              status: {
                isValid: formState.isValid,
                isDirty: formState.isDirty,
                canSubmit: formState.canSubmit,
                submissionAttempts: formState.submissionAttempts,
              },
            },
            null,
            2
          )}
        />
      ),
      duration: 6000,
    });
  };

  const form = useAppForm({
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
    onSubmit: ({ value }) => {
      handleFormSubmit(value, form.store.state);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {fields.map((f) => (
            <form.AppField key={f.id} name={f.name as never}>
              {(field) => <field.TextField label={f.label} />}
            </form.AppField>
          ))}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
