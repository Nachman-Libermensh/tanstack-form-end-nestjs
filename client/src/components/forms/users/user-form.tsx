"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import usersService from "@/services/users.service";
import { GenericForm } from "../GenericForm";
import { FormField } from "../FormField";
import { CheckIcon, XIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { createUserSchema, UserResponse } from "shared";

// Password input component
function PasswordInput({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  dir = "ltr",
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          dir={dir}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-900"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

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
    if (strength < 4) return "bg-amber-500";
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
        <p className="text-xs text-gray-500">עוצמת סיסמה</p>
        <p
          className={`text-xs font-medium ${
            strength < 2
              ? "text-red-500"
              : strength < 4
              ? "text-amber-500"
              : "text-green-500"
          }`}
        >
          {getLabel()}
        </p>
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

// Field info component - simplified for the generic form
function FieldInfo({
  error,
  value,
  touched,
}: {
  error?: string;
  value: string;
  touched?: boolean;
}) {
  if (touched && error) {
    return (
      <div className="flex items-start mt-1.5 text-red-500 animate-fade-in">
        <XIcon className="mt-0.5 mr-1 flex-shrink-0 h-4 w-4" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  // Show success icon when field is valid and has been touched
  if (touched && !error && value) {
    return (
      <div className="flex items-center mt-1.5 text-green-500 animate-fade-in">
        <CheckIcon className="mr-1 flex-shrink-0 h-4 w-4" />
        <p className="text-sm">תקין</p>
      </div>
    );
  }

  return null;
}

interface UserFormProps {
  onSuccess?: (data: UserResponse) => void;
  onClose?: () => void;
  showHeader?: boolean;
}

// טייפ עבור ערכי הטופס
type UserFormValues = z.infer<typeof createUserSchema>;

export default function UserForm({
  onSuccess,
  onClose,
  showHeader = true,
}: UserFormProps) {
  const [response, setResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // איפוס התראת ההצלחה לאחר 5 שניות
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      setLoading(true);
      setError(null);

      const data = await usersService.create(values);

      setResponse(data);
      setSuccess(true);

      // קריאה לפונקציית ההצלחה אם הועברה
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה בשליחת הטופס");
      console.error("שגיאה בשליחת הטופס:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="w-full">
      {showHeader && (
        <>
          <div className="flex justify-center mb-6">
            <Avatar className="h-16 w-16 bg-blue-500 text-white">
              <AvatarFallback>טמ</AvatarFallback>
            </Avatar>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            רישום משתמש חדש
          </h2>

          <p className="text-gray-500 text-center mb-6">
            מלא את הפרטים הבאים כדי ליצור חשבון חדש
          </p>
        </>
      )}

      {success && (
        <Alert variant="default" className="mb-6 bg-green-50 border-green-200">
          <AlertDescription>הטופס נשלח בהצלחה!</AlertDescription>
        </Alert>
      )}

      <GenericForm
        schema={createUserSchema}
        defaultValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        <FormField<string> name="name">
          {({ value, onChange, onBlur, error }) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="name">שם מלא</Label>
                <Input
                  id="name"
                  name="name"
                  value={value}
                  onBlur={() => {
                    onBlur();
                    handleFieldBlur("name");
                  }}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="הכנס את שמך המלא"
                  dir="rtl"
                />
                <FieldInfo
                  error={error}
                  value={value}
                  touched={touchedFields["name"]}
                />
              </div>
            );
          }}
        </FormField>

        <FormField<string> name="email">
          {({ value, onChange, onBlur, error }) => (
            <div className="space-y-2">
              <Label htmlFor="email">כתובת אימייל</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={value}
                onBlur={() => {
                  onBlur();
                  handleFieldBlur("email");
                }}
                onChange={(e) => onChange(e.target.value)}
                placeholder="your@email.com"
                dir="ltr"
              />
              <FieldInfo
                error={error}
                value={value}
                touched={touchedFields["email"]}
              />
            </div>
          )}
        </FormField>

        <FormField<string> name="password">
          {({ value, onChange, onBlur, error }) => (
            <div className="space-y-2">
              <PasswordInput
                label="סיסמה"
                id="password"
                name="password"
                value={value}
                onBlur={() => {
                  onBlur();
                  handleFieldBlur("password");
                }}
                onChange={(e) => onChange(e.target.value)}
                placeholder="הזן סיסמה"
                dir="ltr"
              />
              <PasswordStrengthIndicator password={value} />
              <FieldInfo
                error={error}
                value={value}
                touched={touchedFields["password"]}
              />
            </div>
          )}
        </FormField>

        <FormField<string> name="confirmPassword">
          {({ value, onChange, onBlur, error }) => (
            <div className="space-y-2">
              <PasswordInput
                label="אימות סיסמה"
                id="confirmPassword"
                name="confirmPassword"
                value={value}
                onBlur={() => {
                  onBlur();
                  handleFieldBlur("confirmPassword");
                }}
                onChange={(e) => onChange(e.target.value)}
                placeholder="הזן את הסיסמה שוב"
                dir="ltr"
              />
              <FieldInfo
                error={error}
                value={value}
                touched={touchedFields["confirmPassword"]}
              />
            </div>
          )}
        </FormField>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1" size="lg" disabled={loading}>
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span> שולח...
              </>
            ) : (
              "שלח"
            )}
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
      </GenericForm>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-green-600 font-medium text-lg">
                {response.message}
              </p>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                נשלח בהצלחה
              </Badge>
            </div>
            <Separator className="my-3" />
            <p className="text-sm text-gray-500 mb-2">פרטי המשתמש</p>
            <div className="mt-2 bg-white p-4 rounded-md shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <p className="font-medium">מזהה:</p>
                <p>{response.user.id}</p>
                <p className="font-medium">שם:</p>
                <p>{response.user.name}</p>
                <p className="font-medium">אימייל:</p>
                <p dir="ltr">{response.user.email}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setResponse(null);
                      setSuccess(false);
                      window.location.reload();
                    }}
                  >
                    סגור
                  </Button>
                </TooltipTrigger>
                <TooltipContent>נקה תוצאות</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
