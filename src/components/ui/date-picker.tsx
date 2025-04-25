"use client";

import { format, getYear, getMonth, Locale } from "date-fns";
import { he } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useMemo, useState } from "react";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onSelect?: (date: Date) => void;
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
  placeholder = "בחר תאריך",
  disabled,
  className,
  minDate,
  maxDate,
  locale,
  footer,
  shouldDisableDate,
}: DatePickerProps) {
  // הוספת ניהול מצב הפופאפ - חדש!
  const [isOpen, setIsOpen] = useState(false);
  console.log("DatePicker rendered", { value, isOpen });

  const [month, setMonth] = useState<number>(
    value ? getMonth(value) : getMonth(new Date())
  );

  const [year, setYear] = useState<number>(
    value ? getYear(value) : getYear(new Date())
  );

  const years = useMemo(() => {
    const start = minDate ? getYear(minDate) : 2020;
    const end = maxDate ? getYear(maxDate) : 2030;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [minDate, maxDate]);

  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
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
        >
          {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
        </Button>
        </div>
      </PopoverTrigger>


      <PopoverContent
        className="w-auto p-0  z-[9999]"
        align="start"
        side="bottom"
        sideOffset={5}
        avoidCollisions={true}
      >
        <div className="p-3">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              if (date) {
                onSelect?.(date);
                setIsOpen(false); // סגירת הפופאפ אחרי בחירה
              }
            }}
            disabled={shouldDisableDate}
            month={new Date(year, month)}
            onMonthChange={(date) => {
              setMonth(getMonth(date));
              setYear(getYear(date));
            }}
            fromMonth={minDate}
            toMonth={maxDate}
            locale={locale ?? he}
            hidden={(date) => {
              if (!date) return false;
              const beforeMin = minDate ? date < minDate : false;
              const afterMax = maxDate ? date > maxDate : false;
              return beforeMin || afterMax;
            }}
            initialFocus
            dir="rtl"
            captionLayout="dropdown-buttons"
            classNames={{
              caption: "flex items-center justify-center w-full",
              caption_label: "hidden",
              nav_button_previous: "absolute h-9 w-[30px] right-5",
              nav_button_next: "absolute h-9 w-[30px] left-3",
              caption_dropdowns: "flex items-center justify-between gap-1",
              dropdown: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 bg-transparent"
              ),
            }}
            components={{
              Dropdown: ({ name }) => {
                if (name === "months") {
                  return (
                    <Select
                      value={month.toString()}
                      onValueChange={(v) => setMonth(parseInt(v))}
                    >
                      <SelectTrigger
                        dir="rtl"
                        className="h-9 w-[110px] transition-colors hover:bg-accent"
                        aria-label="בחר חודש"
                      >
                        <SelectValue>{months[month]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent dir="rtl" align="end">
                        {months.map((month, index) => (
                          <SelectItem key={month} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }
                return (
                  <Select
                    value={year.toString()}
                    onValueChange={(v) => setYear(parseInt(v))}
                  >
                    <SelectTrigger
                      dir="rtl"
                      className="h-9 w-[80px] transition-colors hover:bg-accent"
                      aria-label="בחר שנה"
                    >
                      <SelectValue>{year}</SelectValue>
                    </SelectTrigger>
                    <SelectContent dir="rtl" align="end">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              },
              IconLeft: ({ className, ...props }) => (
                <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
              ),
              IconRight: ({ className, ...props }) => (
                <ChevronRight className={cn("h-4 w-4", className)} {...props} />
              ),
            }}
          />
        </div>
        {footer && <div className="border-t p-3">{footer}</div>}
      </PopoverContent>
    </Popover>
  );
}
