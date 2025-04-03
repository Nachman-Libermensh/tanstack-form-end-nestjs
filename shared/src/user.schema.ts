import { z } from "zod";

// סכמת בסיס למשתמש
export const userBaseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "השם חייב להכיל לפחות 2 תווים" })
    .max(50, { message: "השם יכול להכיל עד 50 תווים" }),

  email: z
    .string()
    .email({ message: "כתובת האימייל אינה תקינה" })
    .min(5, { message: "כתובת האימייל קצרה מדי" })
    .max(100, { message: "כתובת האימייל ארוכה מדי" }),

  password: z
    .string()
    .min(8, { message: "הסיסמה חייבת להכיל לפחות 8 תווים" })
    .regex(/[A-Z]/, { message: "הסיסמה חייבת להכיל לפחות אות גדולה אחת" })
    .regex(/[0-9]/, { message: "הסיסמה חייבת להכיל לפחות ספרה אחת" }),
});

// סכמה ליצירת משתמש עם אימות סיסמה
export const createUserSchema = userBaseSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "הסיסמאות אינן תואמות",
    path: ["confirmPassword"],
  });

// סכמה לעדכון משתמש (כל השדות אופציונליים)
export const updateUserSchema = userBaseSchema.partial();

// סכמה למשתמש מלא כולל ID
export const userSchema = userBaseSchema.extend({
  id: z.string(),
});

// סכמה לתשובת שרת
export const userResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
});
