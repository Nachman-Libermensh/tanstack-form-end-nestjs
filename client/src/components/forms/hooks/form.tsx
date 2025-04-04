import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";
import { Input } from "@/components/ui/input";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    // כאן אנו מגדירים את רכיב הקלט הבסיסי לשדות – לדוגמה, TextField
    Input,
  },
  formComponents: {
    // לדוגמה, נוכל להגדיר SubscribeButton או AppForm אם נרצה
  },
  fieldContext,
  formContext,
});
