"use client";

import { format, Locale, setMonth, setYear, getMonth, getYear } from "date-fns";
import { he } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect, FocusEvent } from "react";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onSelect?: (date: Date) => void;
  onBlur?: (e: FocusEvent<HTMLButtonElement | HTMLDivElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  footer?: React.ReactNode;
  shouldDisableDate?: (date: Date) => boolean;
  dir?: "rtl" | "ltr";
}

export function DatePicker({
  value,
  onChange,
  onSelect,
  onBlur,
  placeholder = "בחר תאריך",
  disabled,
  className,
  minDate,
  maxDate,
  locale = he,
  footer,
  shouldDisableDate,
  dir = "rtl",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(value || today);

  useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      onSelect?.(date);
      setViewDate(date);
      setIsOpen(false);
    }
  };

  const handleYearChange = (yearStr: string) => {
    const year = parseInt(yearStr);
    setViewDate(setYear(viewDate, year));
  };

  const handleMonthChange = (monthStr: string) => {
    const month = parseInt(monthStr);
    setViewDate(setMonth(viewDate, month));
  };

  const handleTodayClick = () => {
    const today = new Date();
    handleSelect(today);
  };

  const handleBlur = (e: FocusEvent<HTMLButtonElement | HTMLDivElement>) => {
    onBlur?.(e);
  };

  const currentYear = getYear(today);
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const months = [
    { value: "0", label: "ינואר" },
    { value: "1", label: "פברואר" },
    { value: "2", label: "מרץ" },
    { value: "3", label: "אפריל" },
    { value: "4", label: "מאי" },
    { value: "5", label: "יוני" },
    { value: "6", label: "יולי" },
    { value: "7", label: "אוגוסט" },
    { value: "8", label: "ספטמבר" },
    { value: "9", label: "אוקטובר" },
    { value: "10", label: "נובמבר" },
    { value: "11", label: "דצמבר" },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full cursor-pointer">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onBlur={handleBlur}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3 py-2 text-sm rounded-md border bg-background text-right",
              "border-input shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "flex items-center justify-between",
              !value && "text-muted-foreground",
              className
            )}
            aria-label="בחר תאריך"
          >
            {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
            <CalendarIcon className="w-4 h-4 opacity-50 ml-2" />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="z-50 p-0 w-auto rounded-xl border bg-background shadow-xl"
        align="start"
        side="bottom"
        sideOffset={5}
        dir={dir}
      >
        {/* אזור ניווט */}
        <div className="p-3 bg-muted/50 border-b rounded-t-xl">
          <div className="flex items-center justify-between gap-2" dir={dir}>
            <Select
              value={getMonth(viewDate).toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="h-9 w-[110px] text-sm rounded-lg border bg-background shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[120] rounded-lg shadow-md">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={getYear(viewDate).toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="h-9 w-[80px] text-sm rounded-lg border bg-background shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[120] rounded-lg shadow-md">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="h-9 px-3 text-sm rounded-lg bg-white hover:bg-muted"
              onClick={handleTodayClick}
            >
              היום
            </Button>
          </div>
        </div>

        {/* לוח שנה */}
        <div className="p-3 bg-background">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={shouldDisableDate}
            fromDate={minDate}
            toDate={maxDate}
            locale={locale}
            showOutsideDays
            classNames={{
              nav_button_previous:
                dir === "rtl" ? "absolute right-1" : "absolute left-1",
              nav_button_next:
                dir === "rtl" ? "absolute left-1" : "absolute right-1",
            }}
            dir={dir}
            month={viewDate}
            onMonthChange={setViewDate}
            initialFocus
            className="border-0" // מבטל גבול של calendar
          />
        </div>

        {/* רגל תחתון אם קיים */}
        {footer && (
          <div className="p-3 border-t bg-muted/30 rounded-b-xl">{footer}</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
