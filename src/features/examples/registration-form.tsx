"use client";

import { useAppForm } from "@/components/shadcn-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useDirection } from "@/i18n/direction";

// טווח גילאים תקין
const MIN_AGE = 16;
const MAX_AGE = 120;

// תאריכי לידה מינימלי ומקסימלי
const MIN_BIRTH_YEAR = new Date().getFullYear() - MAX_AGE;
const MAX_BIRTH_YEAR = new Date().getFullYear() - MIN_AGE;

export default function RegistrationForm() {
  const t = useTranslations("examples.registration.form");
  const dir = useDirection();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // סכמה לוולידציה
  const schema = z
    .object({
      fullName: z.string().min(2, t("errors.fullNameRequired")),
      email: z.string().email(t("errors.emailInvalid")),
      birthDate: z.string(),
      password: z.string().min(8, t("errors.passwordLength")),
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val, t("errors.termsRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordMatch"),
      path: ["confirmPassword"],
    });

  // הגדרת הטופס
  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);

      setTimeout(() => {
        toast.success(t("submitSuccess"), {
          description: t("checkEmail"),
        });
        setIsSubmitted(true);
      }, 1000);
    },
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
  });

  if (isSubmitted) {
    return (
      <Alert className="bg-primary/10 border-primary/20">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription>{t("registrationComplete")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(e);
      }}
    >
      <form.FormLayout dir={dir} className="max-w-md">
        {/* שם מלא */}
        <form.AppField name="fullName">
          {(field) => (
            <field.TextField
              label={t("fields.fullName")}
              placeholder={t("placeholders.fullName")}
              required
              autoComplete="name"
              dir={dir}
              errorPlacement="bottom"
            />
          )}
        </form.AppField>

        {/* דוא"ל */}
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label={t("fields.email")}
              placeholder={t("placeholders.email")}
              type="email"
              required
              autoComplete="email"
              // כיוון LTR לכתובות דוא"ל תמיד
              dir="ltr"
              errorPlacement="bottom"
            />
          )}
        </form.AppField>

        {/* תאריך לידה במקום גיל - שימוש בדייטפיקר החדש */}
        <form.AppField name="birthDate">
          {(field) => (
            <field.DatePickerField
              label={t("fields.birthDate") || "תאריך לידה"}
              helperText={
                t("helpers.birthDate") || "יש לבחור את תאריך הלידה שלך"
              }
              fromYear={MIN_BIRTH_YEAR}
              toYear={MAX_BIRTH_YEAR}
              formatString="dd/MM/yyyy"
              dir={dir}
              errorPlacement="bottom"
            />
          )}
        </form.AppField>

        {/* סיסמה */}
        <form.AppField name="password">
          {(field) => (
            <field.PasswordInput
              label={t("fields.password")}
              placeholder={t("placeholders.password")}
              required
              autoComplete="new-password"
              // כיוון LTR לסיסמאות
              dir="ltr"
              showStrengthIndicator
              errorPlacement="bottom"
              helperText={
                t("helpers.passwordRequirements") ||
                "לפחות 8 תווים, אות גדולה, קטנה ומספר"
              }
              className="font-mono tracking-wide"
            />
          )}
        </form.AppField>

        {/* אימות סיסמה */}
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.PasswordInput
              label={t("fields.confirmPassword")}
              placeholder={t("placeholders.confirmPassword")}
              required
              autoComplete="new-password"
              dir="ltr"
              errorPlacement="bottom"
              className="font-mono tracking-wide"
            />
          )}
        </form.AppField>

        {/* תנאי שימוש */}
        <form.AppField name="terms">
          {(field) => (
            <field.CheckboxField
              label={t("fields.terms")}
              description={t("helpers.termsDetail")}
              dir={dir}
              errorPlacement="bottom"
            />
          )}
        </form.AppField>

        {/* כפתור שליחה */}
        <form.AppForm>
          <form.SubmitButton>{t("submit")}</form.SubmitButton>
        </form.AppForm>
      </form.FormLayout>
    </form>
  );
}
