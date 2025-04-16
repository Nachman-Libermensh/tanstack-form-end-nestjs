import { FieldConfig } from "./fields";

// הגדרת מבנה הטופס השלם
export interface FormSchema {
  id: string;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  settings?: {
    layout?: "vertical" | "horizontal" | "inline";
    submitLabel?: string;
    resetLabel?: string;
    showReset?: boolean;
  };
}
