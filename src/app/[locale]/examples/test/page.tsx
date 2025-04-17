/* eslint-disable react/no-children-prop */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

const Page = () => {
  const form = useForm({
    defaultValues: { field_text_gLNU: "", field_text_Ke0H: "" },
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
      <form.Field
        name="field_text_gLNU"
        children={(field) => (
          <div className="space-y-1">
            <Label htmlFor="field_text_gLNU">New Field</Label>
            <Input
              id="field_text_gLNU"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.map((message, index) => (
                <p key={index} className="text-sm font-medium text-destructive">
                  {message}
                </p>
              ))}
          </div>
        )}
      />
      <form.Field
        name="field_text_Ke0H"
        children={(field) => (
          <div className="space-y-1">
            <Label htmlFor="field_text_Ke0H">New Field</Label>
            <Input
              id="field_text_Ke0H"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.map((message, index) => (
                <p key={index} className="text-sm font-medium text-destructive">
                  {message}
                </p>
              ))}
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Page;
