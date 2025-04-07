/* eslint-disable react/no-children-prop */
import { createUserSchema } from "shared";
import { useAppForm } from ".";

const UserForm = () => {
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
  return (
    <form
      className="flex flex-col gap-2 w-[400px]"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="name"
        children={(field) => <field.TextField label="שם" />}
      />
      <form.AppField
        name="email"
        children={(field) => <field.TextField type="email" label="דואל" />}
      />
      <form.AppField
        name="password"
        children={(field) => <field.TextField type="password" label="סיסמה" />}
      />
      <form.AppField
        name="confirmPassword"
        children={(field) => (
          <field.TextField type="password" label="אימות סיסמה" />
        )}
      />

      <form.AppForm>
        <form.SubmitButton>שלח</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};
export default UserForm;
