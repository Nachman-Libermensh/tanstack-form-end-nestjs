import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TextFieldConfig } from "../../types";

interface TextFieldProps {
  field: TextFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TextField({ field, value, onChange, error }: TextFieldProps) {
  const {
    id,
    name,
    label,
    placeholder,
    helperText,
    disabled,
    required,
    type = "text",
  } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            required && "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          {label}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={cn(error && "border-red-500 focus-visible:ring-red-500")}
        aria-invalid={!!error}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
