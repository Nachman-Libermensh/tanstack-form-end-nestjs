/* eslint-disable react/no-children-prop */
"use client";

import { useAppForm } from "@/components/shadcn-form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { z } from "zod";

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
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });
  const t = useTranslations("examples.login.form");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.FormLayout>
        {/* פרטים אישיים */}
        <form.FormSection title={t("personalDetails")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  type="email"
                />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.PasswordInput
                  label={t("passwordLabel")}
                  placeholder={t("passwordPlaceholder")}
                  // autoComplete="current-password"
                />
              )}
            />
          </div>
        </form.FormSection>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="outline" className="min-w-[100px]">
            {t("cancel")}
          </Button>
          <Button type="submit" className="min-w-[100px]">
            {t("submit")}
          </Button>
        </div>
      </form.FormLayout>
    </form>
  );
}
