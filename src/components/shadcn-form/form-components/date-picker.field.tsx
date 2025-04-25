"use client";

import * as React from "react";
import { useFieldContext } from "..";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import FieldErrors, { ErrorPlacement } from "./field-errors";
import { cn } from "@/lib/utils";
import { he, Locale } from "date-fns/locale";
import { isValid } from "date-fns";

type DatePickerFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
  errorPlacement?: ErrorPlacement;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number; // שנה מינימלית בבורר
  toYear?: number; // שנה מקסימלית בבורר
  locale?: Locale;
  formatString?: string; // פורמט תצוגת התאריך (מועבר לקומפוננט הבסיסי)
  shouldDisableDate?: (date: Date) => boolean; // פונקציה להגבלת תאריכים
  footer?: React.ReactNode; // תוכן תחתון אופציונלי לפופאפ
};

export function DatePickerField({
  label,
  placeholder = "בחר תאריך",
  helperText,
  dir = "rtl",
  className,
  required,
  disabled,
  errorPlacement = "bottom",
  minDate: initialMinDate,
  maxDate: initialMaxDate,
  fromYear,
  toYear,
  locale = he,

  shouldDisableDate,
  footer,
}: DatePickerFieldProps) {
  const field = useFieldContext<string | undefined>();

  // שימוש ב-useState לשמירה נכונה של minDate ו-maxDate
  const [effectiveMinDate, setEffectiveMinDate] = React.useState<
    Date | undefined
  >(initialMinDate);
  const [effectiveMaxDate, setEffectiveMaxDate] = React.useState<
    Date | undefined
  >(initialMaxDate);

  // המרה מערך מחרוזת ISO לאובייקט תאריך
  const selectedDate = React.useMemo(() => {
    if (!field.state.value) return undefined;

    try {
      const date = new Date(field.state.value);
      return isValid(date) ? date : undefined;
    } catch {
      // לא צריך לעשות כלום עם השגיאה, פשוט להחזיר undefined
      return undefined;
    }
  }, [field.state.value]);

  // הגדרת תאריכי מינימום ומקסימום לפי השנים שהועברו
  React.useEffect(() => {
    // עדכון תאריך מינימלי אם נמסרה שנת התחלה
    if (fromYear && !initialMinDate) {
      setEffectiveMinDate(new Date(fromYear, 0, 1));
    }

    // עדכון תאריך מקסימלי אם נמסרה שנת סיום
    if (toYear && !initialMaxDate) {
      setEffectiveMaxDate(new Date(toYear, 11, 31));
    }
  }, [fromYear, toYear, initialMinDate, initialMaxDate]);

  // טיפול בשינוי תאריך מהבוחר
  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      field.handleChange(undefined);
      return;
    }

    field.handleChange(date.toISOString());
  };

  return (
    <div className="space-y-2" dir={dir}>
      {errorPlacement === "top" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}

      <div className="space-y-1">
        <Label htmlFor={field.name} className="block mb-1">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>

        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          onSelect={(date) => {
            handleDateChange(date);
            // סמן את השדה כנגוע כדי שהשגיאות יופיעו אם יש
            if (!field.state.meta.isTouched) {
              field.handleBlur();
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            field.state.meta.errors?.length ? "border-destructive" : "",
            className
          )}
          minDate={effectiveMinDate}
          maxDate={effectiveMaxDate}
          locale={locale}
          footer={footer}
          shouldDisableDate={shouldDisableDate}
          // העברת formatString לקומפוננט הבסיסי אם הוא תומך בזה
        />
      </div>

      {helperText && !field.state.meta.errors?.length && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}

      {errorPlacement === "bottom" && (
        <FieldErrors meta={field.state.meta} placement={errorPlacement} />
      )}
    </div>
  );
}

export default DatePickerField;
