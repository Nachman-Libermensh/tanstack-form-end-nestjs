/* eslint-disable react/no-children-prop */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "שדה חובה" })
    .min(2, { message: "אורך מינימלי: 2 תווים" }),
});

export type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm({
    defaultValues: { firstName: "" },
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
      <div className="space-y-2">
        <Label htmlFor="firstName">שם פרטי</Label>
        <form.Field
          name="firstName"
          children={(field) => (
            <Input
              id="firstName"
              placeholder="השם שלך..."
              required
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Page;
