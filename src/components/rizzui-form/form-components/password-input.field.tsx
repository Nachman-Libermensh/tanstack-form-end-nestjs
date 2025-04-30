import { useFieldContext } from "..";
import { Password } from "rizzui";
import { ComponentProps } from "react";

type PasswordInputProps = {
  label: string;
  description?: string;
  showStrengthIndicator?: boolean;
  dir?: "ltr" | "rtl";
} & Omit<
  ComponentProps<typeof Password>,
  "label" | "value" | "onChange" | "id" | "onBlur" | "error"
>;

const PasswordInput = ({
  label,
  description,
  dir = "rtl",
  showStrengthIndicator = false,
  ...props
}: PasswordInputProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <Password
        label={label}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        dir={dir}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors.join(", ")
            : undefined
        }
        {...props}
      />
      {showStrengthIndicator && (
        <PasswordStrengthIndicator password={field.state.value} />
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

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

export default PasswordInput;
