/* eslint-disable react/no-children-prop */
import { useAppForm } from "@/components/shadcn-form";
import { createUserSchema } from "shared";

const SimpleUserForm = () => {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
      alert(JSON.stringify(value, null, 2));
    },
    validators: {
      onSubmit: createUserSchema,
    },
  });
  const { AppField } = form;
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <AppField
        name="name"
        children={(field) => <field.TextField label="שם" />}
      />
      <AppField
        name="email"
        children={(field) => <field.TextField type="email" label="דואל" />}
      />
      <AppField
        name="password"
        children={(field) => (
          <field.PasswordInput showStrengthIndicator label="סיסמה" />
        )}
      />
      <AppField
        name="confirmPassword"
        children={(field) => <field.PasswordInput label="אימות סיסמה" />}
      />

      <form.AppForm>
        <form.SubmitButton>שלח</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
export default SimpleUserForm;
