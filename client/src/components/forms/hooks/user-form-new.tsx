import { z } from "zod";
import { useCreateForm } from "./form-hook";

// סכמת הולידציה של הטופס
const userFormSchema = z.object({
  fullName: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  age: z.number().min(18, "גיל מינימלי הוא 18").max(120, "גיל מקסימלי הוא 120"),
  bio: z.string().optional(),
  receiveNewsletter: z.boolean().optional(),
  role: z.enum(["user", "admin", "editor"]),
  verificationCode: z.string().min(6, "קוד האימות חייב להיות באורך 6 תווים"),
});

// טיפוס הנגזר מהסכמה
type UserFormValues = z.infer<typeof userFormSchema>;

// ערכי ברירת מחדל
const defaultValues: UserFormValues = {
  fullName: "",
  email: "",
  age: 18,
  bio: "",
  receiveNewsletter: false,
  role: "user",
  verificationCode: "",
};

export const UserForm = () => {
  const { useForm } = useCreateForm();

  const form = useForm({
    defaultValues,
    schema: userFormSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      // כאן תוכל לשלוח את הנתונים לשרת
      await new Promise((resolve) => setTimeout(resolve, 1000)); // סימולציה של פעולה אסינכרונית
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.FormContainer
          title="פרטי משתמש"
          description="אנא מלא את הפרטים הבאים"
        >
          <form.AppField name="fullName">
            {(field) => (
              <field.TextField
                label="שם מלא"
                placeholder="הזן שם מלא"
                required
              />
            )}
          </form.AppField>

          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="אימייל"
                placeholder="you@example.com"
                type="email"
                required
              />
            )}
          </form.AppField>

          <form.AppField name="age">
            {(field) => <field.TextField label="גיל" type="number" required />}
          </form.AppField>

          <form.AppField name="bio">
            {(field) => (
              <field.TextAreaField
                label="ביוגרפיה"
                placeholder="ספר לנו קצת על עצמך..."
              />
            )}
          </form.AppField>

          <form.AppField name="role">
            {(field) => (
              <field.SelectField
                label="תפקיד"
                required
                options={[
                  { value: "user", label: "משתמש" },
                  { value: "editor", label: "עורך" },
                  { value: "admin", label: "מנהל" },
                ]}
              />
            )}
          </form.AppField>

          <form.AppField name="verificationCode">
            {(field) => (
              <field.OTPField label="קוד אימות" required length={6} />
            )}
          </form.AppField>

          <form.AppField name="receiveNewsletter">
            {(field) => (
              <field.CheckboxField label="אני מעוניין לקבל עדכונים במייל" />
            )}
          </form.AppField>

          <div className="flex gap-2 justify-end">
            <form.ResetButton>איפוס</form.ResetButton>
            <form.SubmitButton>שליחה</form.SubmitButton>
          </div>
        </form.FormContainer>
      </form.AppForm>
    </form>
  );
};
