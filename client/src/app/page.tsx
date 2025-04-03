/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { useState, useEffect } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button, Input, Text, Avatar, Badge, Alert, Tooltip } from "rizzui";

const Divider = ({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) => (
  <div className={`relative flex items-center ${className}`}>
    <div className="flex-grow border-t border-gray-200"></div>
    {label && <span className="flex-shrink mx-4 text-gray-400">{label}</span>}
    <div className="flex-grow border-t border-gray-200"></div>
  </div>
);

// יצירת קומפוננטת שגיאות לשדה
function FieldInfo({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isTouched && field.state.meta.errors.length) {
    return (
      <Text className="text-red-500 text-sm mt-1 transition-all duration-300">
        {field.state.meta.errors.join(", ")}
      </Text>
    );
  }

  if (field.state.meta.isValidating) {
    return (
      <Text className="text-blue-500 text-sm mt-1 transition-all duration-300">
        בודק...
      </Text>
    );
  }

  return null;
}

// ממשק לתגובת השרת
interface ServerResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function App() {
  const [response, setResponse] = useState<ServerResponse | null>(null);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        setError(null);

        // לשם הדגמה, לוקחים רק את שדות האימייל והשם בהתאם לשרת
        const dataToSend = {
          name: value.name,
          email: value.email,
        };
        console.log("dataToSend", dataToSend);

        // שליחת הנתונים לשרת NestJS
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || `שגיאת שרת: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
        setSuccess(true);

        // גלילה לתחתית העמוד כדי לראות את תגובת ההצלחה
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "אירעה שגיאה בשליחת הטופס"
        );
        console.error("שגיאה בשליחת הטופס:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  // איפוס התראת ההצלחה לאחר 5 שניות
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-6 shadow-lg">
        <div className="flex justify-center mb-6">
          <Avatar name="טופס משתמש" size="xl" className="bg-blue-500" />
        </div>

        <Text className="text-2xl font-bold text-center mb-2">
          רישום משתמש חדש
        </Text>

        <Text className="text-gray-500 text-center mb-6">
          מלא את הפרטים הבאים כדי ליצור חשבון חדש
        </Text>

        {success && (
          <Alert
            color={"success"}
            variant="flat"
            className="mb-6 transition-all duration-300"
          >
            הטופס נשלח בהצלחה!
          </Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          dir="rtl"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "שם הוא שדה חובה"
                  : value.length < 2
                  ? "שם חייב להכיל לפחות 2 תווים"
                  : undefined,
            }}
            children={(field) => (
              <>
                <Input
                  label="שם מלא"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="הכנס את שמך המלא"
                  dir="rtl"
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "אימייל הוא שדה חובה"
                  : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "אימייל לא תקין"
                  : undefined,
            }}
            children={(field) => (
              <>
                <Input
                  label="כתובת אימייל"
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  size="lg"
                  // onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="your@email.com"
                  dir="ltr"
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <Button type="submit" className="w-full" size="lg" variant="solid">
            שלח
          </Button>
        </form>

        {error && (
          <Alert color={"danger"} variant="flat" className="mt-6">
            <Text className="text-red-600 font-medium">{error}</Text>
          </Alert>
        )}

        {response && (
          <div className="mt-6 bg-green-50 border border-green-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Text className="text-green-600 font-medium text-lg">
                  {response.message}
                </Text>
                <Badge variant="flat">נשלח בהצלחה</Badge>
              </div>
              <Divider label="פרטי המשתמש" className="my-3" />
              <div className="mt-2 bg-white p-4 rounded-md shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  <Text className="font-medium">מזהה:</Text>
                  <Text>{response.user.id}</Text>
                  <Text className="font-medium">שם:</Text>
                  <Text>{response.user.name}</Text>
                  <Text className="font-medium">אימייל:</Text>
                  <Text dir="ltr">{response.user.email}</Text>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Tooltip content="נקה תוצאות">
                  <Button
                    type="button"
                    variant="text"
                    size="sm"
                    onClick={() => {
                      setResponse(null);
                      setSuccess(false);
                    }}
                  >
                    סגור
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
