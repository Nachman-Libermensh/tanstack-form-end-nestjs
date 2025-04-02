/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button, Input, Text, Avatar } from "rizzui";

// יצירת קומפוננטת שגיאות לשדה
function FieldInfo({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isTouched && field.state.meta.errors.length) {
    return (
      <Text className="text-red-500 text-sm mt-1">
        {field.state.meta.errors.join(", ")}
      </Text>
    );
  }

  if (field.state.meta.isValidating) {
    return <Text className="text-blue-500 text-sm mt-1">בודק...</Text>;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        setError(null);

        // שליחת הנתונים לשרת NestJS
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!res.ok) {
          throw new Error(`שגיאת שרת: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6">
        <div className="flex justify-center mb-6">
          <Avatar name="טופס משתמש" size="xl" className="bg-blue-500" />
        </div>

        <Text className="text-2xl font-bold text-center mb-6">
          רישום משתמש חדש
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
          dir="rtl"
        >
          <div>
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
                <div>
                  {/* <Label htmlFor={field.name} className="mb-1.5 block">
                    שם מלא
                  </Label> */}
                  <Input
                    label="שם מלא"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    size="lg"
                    placeholder="הכנס את שמך המלא"
                    className="w-full"
                    dir="rtl"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div>
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
                <div>
                  {/* <Label htmlFor={field.name} className="mb-1.5 block">
                    כתובת אימייל
                  </Label> */}
                  <Input
                    label="כתובת אימייל"
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    size="lg"
                    placeholder="your@email.com"
                    className="w-full"
                    dir="ltr"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="w-full"
                  size="lg"
                  variant="solid"
                  isLoading={loading || isSubmitting}
                >
                  {loading || isSubmitting ? "שולח..." : "שלח טופס"}
                </Button>

                <Button
                  type="reset"
                  onClick={() => {
                    form.reset();
                    setResponse(null);
                    setError(null);
                  }}
                  className="w-full"
                  size="lg"
                  variant="outline"
                >
                  נקה טופס
                </Button>
              </div>
            )}
          />
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200">
            <div className="p-4">
              <Text className="text-red-600 font-medium">{error}</Text>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-6 bg-green-50 border border-green-200">
            <div className="p-4">
              <Text className="text-green-600 font-medium">
                {response.message}
              </Text>
              <div className="mt-2 bg-white p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <Text className="font-medium">מזהה:</Text>
                  <Text>{response.user.id}</Text>
                  <Text className="font-medium">שם:</Text>
                  <Text>{response.user.name}</Text>
                  <Text className="font-medium">אימייל:</Text>
                  <Text>{response.user.email}</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
