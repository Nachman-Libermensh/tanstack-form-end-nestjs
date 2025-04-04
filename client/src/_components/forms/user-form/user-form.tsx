/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { useState, useEffect } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import {
  Button,
  Input,
  Text,
  Avatar,
  Badge,
  Alert,
  Tooltip,
  Password,
} from "rizzui";
import { createUserSchema, UserResponse } from "shared";
import usersService from "@/services/users.service";

// Password strength indicator component
function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;

    // Length check
    if (pass.length >= 8) strength += 1;

    // Uppercase check
    if (/[A-Z]/.test(pass)) strength += 1;

    // Lowercase check
    if (/[a-z]/.test(pass)) strength += 1;

    // Number check
    if (/[0-9]/.test(pass)) strength += 1;

    // Special character check
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    return strength;
  };

  const strength = getStrength(password);
  const percentage = (strength / 5) * 100;

  const getColor = () => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getLabel = () => {
    if (strength < 2) return "חלשה";
    if (strength < 4) return "בינונית";
    return "חזקה";
  };

  if (!password) return null;

  return (
    <div className="mt-2 mb-3">
      <div className="flex justify-between items-center mb-1">
        <Text className="text-xs text-gray-500">עוצמת סיסמה</Text>
        <Text
          className={`text-xs font-medium ${
            strength < 2
              ? "text-red-500"
              : strength < 4
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {getLabel()}
        </Text>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Field info component with improved design
function FieldInfo({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isTouched && field.state.meta.errors.length) {
    // Extract the message property from each error object
    const errorMessages = field.state.meta.errors.map((err) =>
      typeof err === "object" && err !== null && "message" in err
        ? err.message
        : String(err)
    );

    return (
      <div className="flex items-start mt-1.5 text-red-500 animate-fadeIn">
        <FiX className="mt-0.5 mr-1 flex-shrink-0" />
        <Text className="text-sm font-medium">{errorMessages.join(", ")}</Text>
      </div>
    );
  }

  if (field.state.meta.isValidating) {
    return (
      <div className="flex items-center mt-1.5 text-blue-500 animate-pulse">
        <FiInfo className="mr-1 flex-shrink-0" />
        <Text className="text-sm">בודק...</Text>
      </div>
    );
  }

  // Show success icon when field is valid and has been touched
  if (
    field.state.meta.isTouched &&
    !field.state.meta.errors.length &&
    field.state.value
  ) {
    return (
      <div className="flex items-center mt-1.5 text-green-500 animate-fadeIn">
        <FiCheck className="mr-1 flex-shrink-0" />
        <Text className="text-sm">תקין</Text>
      </div>
    );
  }

  return null;
}

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

interface UserFormProps {
  onSuccess?: (data: UserResponse) => void;
  onClose?: () => void;
  showHeader?: boolean;
}

export default function UserForm({
  onSuccess,
  onClose,
  showHeader = true,
}: UserFormProps) {
  const [response, setResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        setError(null);

        const data = await usersService.create(value);

        setResponse(data);
        setSuccess(true);

        // קריאה לפונקציית ההצלחה אם הועברה
        if (onSuccess) {
          onSuccess(data);
        }
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
  // console.log("createUserSchema", createUserSchema);

  return (
    <div className="w-full">
      {showHeader && (
        <>
          <div className="flex justify-center mb-6">
            <Avatar name="טופס משתמש" size="xl" className="bg-blue-500" />
          </div>

          <Text className="text-2xl font-bold text-center mb-2">
            רישום משתמש חדש
          </Text>

          <Text className="text-gray-500 text-center mb-6">
            מלא את הפרטים הבאים כדי ליצור חשבון חדש
          </Text>
        </>
      )}

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
        className="space-y-4"
      >
        <form.Field
          name="name"
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
          children={(field) => (
            <>
              <Input
                label="כתובת אימייל"
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="your@email.com"
                dir="ltr"
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <>
              <Password
                label="סיסמה"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="הזן סיסמה"
                dir="ltr"
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <>
              <Password
                label="אימות סיסמה"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="הזן את הסיסמה שוב"
                dir="ltr"
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1"
            size="lg"
            variant="solid"
            disabled={loading}
            isLoading={loading}
          >
            שלח
          </Button>

          {onClose && (
            <Button
              type="button"
              className="flex-1"
              size="lg"
              variant="outline"
              onClick={onClose}
            >
              ביטול
            </Button>
          )}
        </div>
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
                    form.reset();
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
  );
}
