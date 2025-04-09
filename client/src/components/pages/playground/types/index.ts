export type FieldType =
  | "text"
  | "password"
  | "checkbox"
  | "number"
  | "email"
  | "select"
  | "textarea";

export type FieldEditorProps = {
  field: FormFieldConfig;
  onChange: (updated: FormFieldConfig) => void;
};

// אפשרויות ייחודיות לשדה סיסמה
export type PasswordOptions = {
  showToggle: boolean;
  showStrengthIndicator: boolean;
  strengthIndicatorType: "basic" | "advanced";
};

export type FormFieldConfig = {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
  options?: { label: string; value: string }[];
  validations?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
  passwordOptions?: PasswordOptions; // הוספת האפשרויות הייחודיות לסיסמה
};
