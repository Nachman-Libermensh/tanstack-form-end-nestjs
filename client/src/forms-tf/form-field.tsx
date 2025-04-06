import { useFieldContext } from "./form-context";
import { fieldContext } from "./form-context";
export const FormField = ({ children }: { children?: React.ReactNode }) => {
  const field = useFieldContext();
  console.log("FormField form2", field);

  return (
    <fieldContext.Provider value={field}>{children}</fieldContext.Provider>
  );
};
export const FormField2 = () => {
  const field = useFieldContext();
  console.log("FormField2 form2", field);

  return (
    <FormField>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={field.state.value as string}
          onChange={field.handleChange}
        />
      </div>
    </FormField>
  );
};
