/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { FieldType } from "./form";

// פרופס משותפים לכל רכיב UI
export interface BaseComponentProps {
  id: string;
  name: string;
  label?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
}

// פרופס ספציפיים לרכיב קלט
export interface InputComponentProps extends BaseComponentProps {
  type: "text" | "email" | "password" | "number" | "date";
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}

// פרופס ספציפיים לרכיב בחירה
export interface SelectComponentProps extends BaseComponentProps {
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

// פרופס ספציפיים לרכיב צ'קבוקס
export interface CheckboxComponentProps extends BaseComponentProps {
  checked?: boolean;
  checkboxLabel?: string;
}

// פרופס ספציפיים לרכיב טקסטאריה
export interface TextareaComponentProps extends BaseComponentProps {
  rows?: number;
  cols?: number;
}

// ממשק לפונקציית רנדור רכיב
export interface ComponentRenderer {
  renderField: (
    props: BaseComponentProps,
    fieldType: FieldType
  ) => ReactElement;
}

// טיפוס לממפה של מתאמים לפי סוג שדה
export type ComponentAdapters = {
  [key in FieldType]?: React.ComponentType<any>;
};
