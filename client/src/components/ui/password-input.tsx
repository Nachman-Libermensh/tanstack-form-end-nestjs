import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  dir?: "rtl" | "ltr";
  showStrengthIndicator?: boolean;
  passwordValue?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      dir = "rtl",
      showStrengthIndicator = false,
      passwordValue = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isRTL = dir === "rtl";
    const buttonPosition = isRTL ? "left-0" : "right-0";
    const inputPadding = isRTL ? "pl-10" : "pr-10";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            dir={dir}
            className={cn(inputPadding, className)}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground",
              buttonPosition
            )}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {showStrengthIndicator && passwordValue && (
          <PasswordStrengthIndicator password={passwordValue} />
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const percentage = (strength / 5) * 100;

  const strengthConfig = [
    { label: "חלשה", color: "red-500" },
    { label: "בינונית", color: "amber-500" },
    { label: "חזקה", color: "green-500" },
  ];

  const getStrengthDetails = () => {
    if (strength < 2) return strengthConfig[0];
    if (strength < 4) return strengthConfig[1];
    return strengthConfig[2];
  };

  const { label, color } = getStrengthDetails();

  return (
    <div className="mt-2 mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-muted-foreground">עוצמת סיסמה</span>
        <span className={`text-xs font-medium text-${color}`}>{label}</span>
      </div>
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
