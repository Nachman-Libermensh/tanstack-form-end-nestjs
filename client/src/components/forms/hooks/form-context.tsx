import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { z } from "zod";

// יצירת הקשרים עבור השדות והטופס
const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
// יצירת ה-Hook המותאם אישית

export const Examples = () => {
  const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      Input,
      InputOTP,
      CustomInput,
    },
    formComponents: {
      SubscribeButton,
    },
  });

  const form = useAppForm({
    defaultValues: {
      username: "",
      age: 0,
    },
    validators: {
      onChange: z.object({
        username: z.string().min(3),
        age: z.number().min(0).max(120),
      }),
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);

      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h1>Personal Information</h1>
      <form.AppField name="username">
        {(field) => <field.CustomInput label="Full Name" />}
      </form.AppField>
      <form.AppField name="age">
        {(field) => <field.Input type="number" />}
      </form.AppField>
      <form.AppForm>
        <form.SubscribeButton label="שלח" />
      </form.AppForm>
    </form>
  );
};
const CustomInput = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();
  return (
    <Label>
      <span>{label}</span>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </Label>
  );
};
function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
}
