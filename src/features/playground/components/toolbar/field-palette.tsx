"use client";
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FIELD_TYPES, FieldType } from "../../types";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { nanoid } from "nanoid";

// אייקונים לכל סוג שדה
const fieldIcons: Record<FieldType, React.ReactNode> = {
  text: <span>Aa</span>,
  email: <span>@</span>,
  password: <span>***</span>,
  number: <span>123</span>,
  date: <span>📅</span>,
  select: <span>▼</span>,
  checkbox: <span>☑</span>,
  textarea: <span>¶</span>,
  radio: <span>○</span>,
  file: <span>📎</span>,
};

// תוויות לכל סוג שדה
const fieldLabels: Record<FieldType, string> = {
  text: "טקסט",
  email: "דוא״ל",
  password: "סיסמה",
  number: "מספר",
  date: "תאריך",
  select: "בחירה",
  checkbox: "תיבת סימון",
  textarea: "אזור טקסט",
  radio: "רדיו",
  file: "קובץ",
};

export default function FieldPalette() {
  const { addField } = useFormBuilder();

  const handleAddField = (type: FieldType) => {
    // יצירת שדה חדש עם מזהה ייחודי
    const newField = {
      id: nanoid(6),
      type,
      name: `field_${type}_${nanoid(4)}`,
      label: `שדה ${fieldLabels[type]}`,
      placeholder: `הזן ${fieldLabels[type]}`,
      // הוספת מאפיינים ספציפיים לסוג השדה
      ...(type === "select" && {
        options: [
          { label: "אפשרות 1", value: "option1" },
          { label: "אפשרות 2", value: "option2" },
        ],
      }),
    };

    addField(newField);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-2">הוסף שדות לטופס</h3>
      <div className="grid grid-cols-5 gap-2">
        {FIELD_TYPES.map((type) => (
          <Button
            key={type}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 p-1"
            onClick={() => handleAddField(type)}
          >
            <div className="text-xl">{fieldIcons[type]}</div>
            <span className="text-xs">{fieldLabels[type]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
