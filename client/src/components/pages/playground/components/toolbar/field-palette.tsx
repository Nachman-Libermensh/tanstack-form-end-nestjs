"use client";
import { useFormBuilder } from "../../context/form-builder-context";
import { Button } from "@/components/ui/button";
import {
  Type,
  KeyRound,
  CheckSquare,
  Hash,
  AtSign,
  Menu,
  AlignLeft,
} from "lucide-react";
import { FieldType } from "../../types";

type FieldOption = {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
};

const fieldOptions: FieldOption[] = [
  { type: "text", label: "טקסט", icon: <Type size={16} /> },
  { type: "password", label: "סיסמה", icon: <KeyRound size={16} /> },
  { type: "checkbox", label: "תיבת סימון", icon: <CheckSquare size={16} /> },
  { type: "number", label: "מספר", icon: <Hash size={16} /> },
  { type: "email", label: "אימייל", icon: <AtSign size={16} /> },
  { type: "select", label: "בחירה", icon: <Menu size={16} /> },
  { type: "textarea", label: "טקסט ארוך", icon: <AlignLeft size={16} /> },
];

export default function FieldPalette() {
  const { addField } = useFormBuilder();

  return (
    <div className="flex flex-wrap gap-2">
      {fieldOptions.map((option) => (
        <Button
          key={option.type}
          variant="outline"
          size="sm"
          onClick={() => addField(option.type)}
          className="flex items-center gap-1"
        >
          {option.icon}
          <span>{option.label}</span>
        </Button>
      ))}
    </div>
  );
}
