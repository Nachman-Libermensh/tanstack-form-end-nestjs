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
  locale,
  footer,
  shouldDisableDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // State for current view (month/year shown in calendar)
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(value || today);

  // Update viewDate when value changes
  useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  // Handle both onChange and onSelect callbacks
  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      onSelect?.(date);
      setViewDate(date);
      setIsOpen(false);
    }
  };

  // Handle year change
  const handleYearChange = (yearStr: string) => {
    const year = parseInt(yearStr);
    const newDate = setYear(viewDate, year);
    setViewDate(newDate);
  };

  // Handle month change
  const handleMonthChange = (monthStr: string) => {
    const month = parseInt(monthStr);
    const newDate = setMonth(viewDate, month);
    setViewDate(newDate);
  };

  // Jump to today
  const handleTodayClick = () => {
    const today = new Date();
    handleSelect(today);
  };

  // Handle blur event
  const handleBlur = (e: FocusEvent<HTMLButtonElement | HTMLDivElement>) => {
    onBlur?.(e);
  };

  // Generate years for dropdown (10 years before and after current year)
  const currentYear = getYear(today);
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Months in Hebrew
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
        <div className="relative w-full">
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-right font-normal",
              "transition-colors duration-200",
              "hover:bg-accent hover:text-accent-foreground",
              !value && "text-muted-foreground",
              className
            )}
            aria-label="בחר תאריך"
            onClick={() => setIsOpen(true)}
            onBlur={handleBlur}
          >
            {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
            <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 z-[100]"
        align="start"
        side="bottom"
        sideOffset={5}
        avoidCollisions={true}
      >
        <div className="p-3 border-b bg-muted/50">
          <div className="flex items-center gap-2 justify-between" dir="rtl">
            <Select
              value={getMonth(viewDate).toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[110px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={5}
                className="z-[110]"
              >
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
              <SelectTrigger className="w-[80px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={5}
                className="z-[110]"
              >
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="ml-auto h-9"
              onClick={handleTodayClick}
              size="sm"
            >
              היום
            </Button>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={shouldDisableDate}
          fromDate={minDate}
          toDate={maxDate}
          locale={locale ?? he}
          showOutsideDays={true}
          dir="rtl"
          month={viewDate}
          onMonthChange={setViewDate}
          initialFocus
          className="border-0"
        />

        {footer && <div className="p-3 border-t">{footer}</div>}
      </PopoverContent>
    </Popover>
  );
}
