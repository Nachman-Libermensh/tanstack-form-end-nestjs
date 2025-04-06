/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldApi } from "@tanstack/react-form";
import { useFieldContext } from "./form-context";
import { fieldContext } from "./form-context";
export const FormField = ({
  field: field2,
}: {
  field: FieldApi<
    any,
    string,
    unknown,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
}) => {
  const field = useFieldContext();
  console.log("FormField form2", field);
  console.log("FormField field2", field2);

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
