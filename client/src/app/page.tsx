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
import UserForm from "@/components/forms/yt/user-form";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - מתוח מקצה לקצה */}
      <header className="w-full bg-background border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">TanStack Form + NestJS</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">החלף ערכת נושא</span>
            </Button>
            <Link
              href="https://github.com"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - מתוח מקצה לקצה */}
      <main className="flex-1 w-full">
        <div className="w-full px-0">
          <Card className="rounded-none border-x-0">
            <CardHeader className="px-4 md:px-6">
              <CardTitle className="text-center text-2xl sm:text-3xl">
                מחקר ולימוד אינטגרציית TanStack Form עם NestJS
              </CardTitle>
              <CardDescription className="text-center text-base sm:text-lg">
                גיבוש אסטרטגיה מקיפה לניהול טפסים מתקדמים באמצעות שילוב
                טכנולוגיות
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-base">
                  פרויקט זה עוסק במחקר ופיתוח שיטות עבודה מתקדמות לניהול טפסים,
                  תוך שילוב:
                </p>

                {/* רשימה מסודרת */}
                <ul className="my-6 list-disc pl-6 space-y-2">
                  <li>
                    <strong>TanStack Form</strong> - ספריית ניהול טפסים מודרנית
                    וקלה
                  </li>
                  <li>
                    <strong>NestJS</strong> - מסגרת עבודה לפיתוח שרת צד שרת חזקה
                    ומודולרית
                  </li>
                  <li>
                    <strong>TypeScript</strong> - לבטיחות טיפוסים מלאה בין צד
                    לקוח לשרת
                  </li>
                  <li>
                    <strong>Zod</strong> - לאימות נתונים עקבי בכל שכבות
                    האפליקציה
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">מטרות המחקר</h3>

                {/* רשימה מסודרת עם מספרים */}
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>API אחיד וגנרי</strong> - יצירת ממשק עבודה אחיד
                    לטפסים שונים
                  </li>
                  <li>
                    <strong>אימות נתונים עקבי</strong> - שימוש באותו מנגנון
                    אימות בצד הלקוח והשרת
                  </li>
                  <li>
                    <strong>קומפוננטות גנריות</strong> - יצירת קומפוננטות טופס
                    מתקדמות וגנריות
                  </li>
                  <li>
                    <strong>שיתוף קוד</strong> - שיתוף הגדרות בין צד הלקוח לשרת
                  </li>
                </ol>
              </div>

              <div className="mt-10 pb-4 text-center">
                <h3 className="text-xl font-semibold mb-6">דוגמה חיה</h3>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="px-8">
                      צפה בדוגמת טופס משתמש
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>טופס משתמש עם TanStack Form</DialogTitle>
                    </DialogHeader>
                    <UserForm />
                    {/* <Exam /> */}
                    {/* <UserForm /> */}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {userResponse && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 rounded-none border-x-0 mt-6">
              <CardHeader className="px-4 md:px-6">
                <CardTitle className="text-green-700 dark:text-green-300 text-lg">
                  הבקשה נשלחה בהצלחה!
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <div className="flex flex-col gap-3">
                  <div className="flex border-b pb-2">
                    <div className="w-1/4 font-medium">מזהה:</div>
                    <div>{userResponse.user.id}</div>
                  </div>
                  <div className="flex border-b pb-2">
                    <div className="w-1/4 font-medium">שם:</div>
                    <div>{userResponse.user.name}</div>
                  </div>
                  <div className="flex border-b pb-2">
                    <div className="w-1/4 font-medium">אימייל:</div>
                    <div dir="ltr">{userResponse.user.email}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  הנתונים נשלחו לשרת NestJS ונשמרו בהצלחה
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer - מתוח מקצה לקצה */}
      <footer className="w-full border-t py-6 bg-muted/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} פרויקט מחקר TanStack Form + NestJS
          </p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              תיעוד
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              תרומה
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              רישיון
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
