"use client";

import React from "react";
import { useFormBuilder } from "./hooks/useFormBuilder";

import { generateFormCode } from "./utils/code-generators/generate-form-code";

import FormBuilderCanvas from "./form-builder-canvas";
import FieldEditor from "./field-editor";
import FormPreview from "./form-preview";
import CodePreview from "./code-preview";

export default function FormBuilderAndLa() {
  const { fields, addField, removeField, selectedFieldId, selectField } =
    useFormBuilder();
  useFormBuilder();

  const codeString = generateFormCode(
    fields.map((f) => ({ name: f.name, label: f.label }))
  );

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      <FormBuilderCanvas
        fields={fields}
        selectedFieldId={selectedFieldId}
        addField={addField}
        removeField={removeField}
        selectField={selectField}
      />

      <FieldEditor selectedField={selectedField} />

      <FormPreview fields={fields} />

      <CodePreview code={codeString} />
    </div>
  );
}
