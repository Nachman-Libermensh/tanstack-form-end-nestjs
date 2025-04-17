/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldType, PasswordOptions, ValidationRules } from './form';

// הגדרת שדה בסיסית - משותפת לכל סוגי השדות
export interface BaseFieldConfig {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: any;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  validations?: ValidationRules;
}

// הגדרות ספציפיות לשדה טקסט
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password';
  passwordOptions?: PasswordOptions;
}

// הגדרות ספציפיות לשדה מספרי
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// הגדרות ספציפיות לשדה בחירה
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

// הגדרות ספציפיות לשדה צ'קבוקס
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  checkboxLabel?: string;
}

// הגדרות ספציפיות לשדה טקסטאריה
export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  cols?: number;
}

// איחוד כל סוגי השדות
export type FieldConfig = 
  | TextFieldConfig 
  | NumberFieldConfig 
  | SelectFieldConfig 
  | CheckboxFieldConfig 
  | TextareaFieldConfig;