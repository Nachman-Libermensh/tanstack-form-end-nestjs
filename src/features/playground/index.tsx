"use client";

import FormBuilderCanvas from "./form-builder-canvas";
import FieldEditor from "./field-editor";
import FormPreview from "./form-preview";
import CodePreview from "./code-preview";

export default function FormBuilderLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      <FormBuilderCanvas />

      <FieldEditor />

      <FormPreview />

      <CodePreview />
    </div>
  );
}
