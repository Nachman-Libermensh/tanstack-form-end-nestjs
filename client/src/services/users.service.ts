/* eslint-disable import/no-anonymous-default-export */
import http from "./http";
import { CreateUser, UpdateUser, User, UserResponse } from "shared"; // ייבוא מהחבילה המשותפת

// נתיב ה-API
const USERS_API = "/users";

// שירות משתמשים
export default {
  // קבלת כל המשתמשים
  async getAll(): Promise<User[]> {
    try {
      const response = await http.get(USERS_API);
      return response;
    } catch (error) {
      console.error("שגיאה בקבלת משתמשים:", error);
      throw error;
    }
  },

  // קבלת משתמש לפי מזהה
  async getById(id: string): Promise<User> {
    try {
      const response = await http.get(`${USERS_API}/${id}`);
      return response;
    } catch (error) {
      console.error(`שגיאה בקבלת משתמש עם מזהה ${id}:`, error);
      throw error;
    }
  },

  // יצירת משתמש חדש
  async create(userData: CreateUser): Promise<UserResponse> {
    try {
      const response = await http.post(USERS_API, userData);
      return response;
    } catch (error) {
      console.error("שגיאה ביצירת משתמש:", error);
      throw error;
    }
  },

  // עדכון משתמש קיים
  async update(id: string, userData: UpdateUser): Promise<UserResponse> {
    try {
      const response = await http.put(`${USERS_API}/${id}`, userData);
      return response;
    } catch (error) {
      console.error(`שגיאה בעדכון משתמש עם מזהה ${id}:`, error);
      throw error;
    }
  },

  // מחיקת משתמש
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await http.delete(`${USERS_API}/${id}`);
      return response;
    } catch (error) {
      console.error(`שגיאה במחיקת משתמש עם מזהה ${id}:`, error);
      throw error;
    }
  },

  // ולידציית אימייל (בדיקה אם אימייל כבר קיים במערכת)
};
