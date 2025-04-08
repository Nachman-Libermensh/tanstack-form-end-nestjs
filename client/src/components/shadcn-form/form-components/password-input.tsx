"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useFieldContext } from "..";
import { InputHTMLAttributes } from "react";
import FieldErrors from "./field-errors";
import { cn } from "@/lib/utils";

// הרחבת הפרופס עם תכונות HTML סטנדרטיות
type PasswordInputProps = {
  label: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  showStrengthIndicator?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "onBlur" | "name" | "id"
>;

export function PasswordInput({
  label,
  placeholder,
  dir = "rtl",
  showStrengthIndicator = false,
  className,
  required,
  ...restProps // אוסף שאר הפרופס
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const field = useFieldContext<string>();

  // קובע את המיקום והסגנון של הכפתור לפי כיוון הטקסט
  const buttonPosition = dir === "rtl" ? "left-0" : "right-0";
  const inputPadding = dir === "rtl" ? "pl-10" : "pr-10";

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <Input
          name={field.name}
          type={showPassword ? "text" : "password"}
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          dir={dir}
          className={cn(`${inputPadding} ${className || ""}`)}
          required={required}
          {...restProps} // העברת כל הפרופס הנוספים
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`absolute ${buttonPosition} top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-300`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {showStrengthIndicator && (
        <PasswordStrengthIndicator password={field.state.value} />
      )}
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}

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
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
