import { FormProvider } from "./form-core";
import { FormField } from "./form-field";

export const Exam = () => {
  return (
    <div>
      <h1>Exam</h1>
      <FormProvider>
        <h2>Form Provider</h2>

        <p>Use this component to wrap your form fields and submit button.</p>
        <p>It provides the context for the form.</p>
        <p>It also handles the form submission.</p>
      </FormProvider>
      <h2>Form Context</h2>
      <p>Use this component to wrap your form fields and submit button.</p>
      <p>It provides the context for the form.</p>
      <p>It also handles the form submission.</p>
    </div>
  );
};
