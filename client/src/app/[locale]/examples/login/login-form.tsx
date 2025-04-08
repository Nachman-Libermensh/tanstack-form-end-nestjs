/* eslint-disable react/no-children-prop */
"use client";

import { useAppForm } from "@/components/shadcn-form";
import { Button } from "@/components/ui/button";
import { useDirection } from "@/hooks/use-direction";
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
  const dir = useDirection();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.FormLayout dir={dir}>
        {/* פרטים אישיים */}
        <form.FormSection title={t("personalDetails")}>
          <div className="flex flex-col space-y-4 max-w-md mx-auto w-full">
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  type="email"
                  dir={dir}
                />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.PasswordInput
                  dir={dir}
                  label={t("passwordLabel")}
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="current-password"
                />
              )}
            />
          </div>
        </form.FormSection>

        <div className="flex justify-end gap-3 mt-6">
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
