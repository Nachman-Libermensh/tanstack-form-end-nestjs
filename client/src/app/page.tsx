/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import UserForm from "@/components/forms/users/user-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UserResponse } from "shared";
import { GithubIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Examples } from "@/components/forms/hooks/form-context";
import { UserForm } from "@/components/forms/hooks/user-form-new";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const { theme, setTheme } = useTheme();

  // const handleSuccess = (data: UserResponse) => {
  //   setUserResponse(data);
  //   setTimeout(() => setOpen(false), 3000);
  // };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">TanStack Form + NestJS</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה"}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">החלף ערכת נושא</span>
            </Button>
            <Link
              href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              מחקר ולימוד אינטגרציית TanStack Form עם NestJS
            </CardTitle>
            <CardDescription className="text-center">
              גיבוש אסטרטגיה מקיפה לניהול טפסים מתקדמים באמצעות שילוב טכנולוגיות
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                פרויקט זה עוסק במחקר ופיתוח שיטות עבודה מתקדמות לניהול טפסים,
                תוך שילוב:
              </p>
              <ul>
                <li>
                  <strong>TanStack Form</strong> - ספריית ניהול טפסים מודרנית
                  וקלה
                </li>
                <li>
                  <strong>NestJS</strong> - מסגרת עבודה לפיתוח שרת צד שרת חזקה
                  ומודולרית
                </li>
                <li>
                  <strong>TypeScript</strong> - לבטיחות טיפוסים מלאה בין צד לקוח
                  לשרת
                </li>
                <li>
                  <strong>Zod</strong> - לאימות נתונים עקבי בכל שכבות האפליקציה
                </li>
              </ul>

              <h3>מטרות המחקר</h3>
              <ol>
                <li>יצירת API אחיד וגנרי לעבודה עם טפסים</li>
                <li>אימות נתונים עקבי בצד הלקוח והשרת</li>
                <li>יצירת קומפוננטות טופס מתקדמות וגנריות</li>
                <li>
                  שיתוף קוד והגדרות בין צד הלקוח לשרת (באמצעות חבילת shared)
                </li>
              </ol>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">דוגמה חיה</h3>
              <div className="flex justify-center">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>צפה בדוגמת טופס משתמש</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>טופס משתמש עם TanStack Form</DialogTitle>
                    </DialogHeader>
                    <UserForm />
                    {/* <Examples /> */}
                    {/* <UserForm
                      onSuccess={handleSuccess}
                      onClose={() => setOpen(false)}
                      showHeader={false}
                    /> */}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {userResponse && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300 text-lg">
                הבקשה נשלחה בהצלחה!
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
              <p className="mt-4 text-sm text-muted-foreground">
                הנתונים נשלחו לשרת NestJS ונשמרו בהצלחה
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} פרויקט מחקר TanStack Form + NestJS
          </p>
        </div>
      </footer>
    </div>
  );
}
