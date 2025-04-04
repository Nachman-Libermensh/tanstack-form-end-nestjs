"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/forms/users/user-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UserResponse } from "shared";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);

  const handleSuccess = (data: UserResponse) => {
    // ניתן לשמור את תגובת השרת או לבצע פעולות נוספות
    setUserResponse(data);

    // סגירת הדיאלוג לאחר שליחה מוצלחת
    setTimeout(() => {
      setOpen(false);
    }, 3000); // מחכה 3 שניות כדי שהמשתמש יוכל לראות את הודעת ההצלחה
  };

  return (
    <main className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">מערכת ניהול משתמשים</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <p className="text-center text-gray-500 mb-4">
            לחץ על הכפתור למטה כדי להוסיף משתמש חדש למערכת
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg">הוספת משתמש חדש</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>הוספת משתמש חדש</DialogTitle>
              </DialogHeader>
              <UserForm
                onSuccess={handleSuccess}
                onClose={() => setOpen(false)}
                showHeader={false}
              />
            </DialogContent>
          </Dialog>

          {userResponse && (
            <div className="mt-8 w-full">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-600 text-lg">
                    המשתמש נוסף בהצלחה!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="font-medium">מזהה:</p>
                    <p>{userResponse.user.id}</p>
                    <p className="font-medium">שם:</p>
                    <p>{userResponse.user.name}</p>
                    <p className="font-medium">אימייל:</p>
                    <p dir="ltr">{userResponse.user.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
