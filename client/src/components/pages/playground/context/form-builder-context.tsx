"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { FormFieldConfig, FieldType } from '../types';
import { createFieldTemplate } from '../utils/field-templates';

type FormBuilderContextType = {
  fields: FormFieldConfig[];
  selectedFieldId: string | null;
  addField: (type: FieldType) => void;
  updateField: (updated: FormFieldConfig) => void;
  deleteField: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
  selectField: (id: string | null) => void;
  selectedField: FormFieldConfig | null;
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<FormFieldConfig[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = (type: FieldType) => {
    const newField = createFieldTemplate(type, fields.length + 1);
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (updated: FormFieldConfig) => {
    setFields((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const newFields = [...fields];
    const draggedField = newFields[dragIndex];
    
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    
    setFields(newFields);
  };

  const selectField = (id: string | null) => {
    setSelectedFieldId(id);
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  const value = {
    fields,
    selectedFieldId,
    addField,
    updateField,
    deleteField,
    moveField,
    selectField,
    selectedField,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};