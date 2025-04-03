import { z } from "zod";
import {
  userBaseSchema,
  createUserSchema,
  updateUserSchema,
  userSchema,
  userResponseSchema,
} from "./user.schema";

// ממשק בסיסי למשתמש
export type UserBase = z.infer<typeof userBaseSchema>;

// ממשק ליצירת משתמש (כולל אימות סיסמה)
export type CreateUser = z.infer<typeof createUserSchema>;

// ממשק לעדכון משתמש
export type UpdateUser = z.infer<typeof updateUserSchema>;

// ממשק למשתמש מלא
export type User = z.infer<typeof userSchema>;

// ממשק לתגובת השרת
export type UserResponse = z.infer<typeof userResponseSchema>;
