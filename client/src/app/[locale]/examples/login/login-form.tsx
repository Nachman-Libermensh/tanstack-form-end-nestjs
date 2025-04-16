/* eslint-disable react/no-children-prop */
"use client";

import FormLayout from "@/components/shadcn-form/form-components/form-layout";
import { FormSection } from "@/components/shadcn-form/form-components/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDirection } from "@/i18n/direction";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/password-input";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});
type ILoginData = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (data: ILoginData) => {
    // Handle login logic here
    console.log("Login data:", data);
  };
  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });
  const t = useTranslations("examples.login.form");
  const dir = useDirection();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormLayout dir={dir}>
        {/* פרטים אישיים */}
        <FormSection title={t("personalDetails")}>
          <div className="flex flex-col space-y-4 max-w-md mx-auto w-full">
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>
                    {t("emailLabel")}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Input
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    dir={dir}
                  />
                </>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>
                    {t("passwordLabel")}
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <PasswordInput
                    dir={dir}
                    placeholder={t("passwordPlaceholder")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="current-password"
                    showStrengthIndicator={true}
                  />
                </>
              )}
            />
          </div>
        </FormSection>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="min-w-[100px]">
            {t("cancel")}
          </Button>
          <Button type="submit" className="min-w-[100px]">
            {t("submit")}
          </Button>
        </div>
      </FormLayout>
    </form>
  );
}
