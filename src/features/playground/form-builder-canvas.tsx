import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFormBuilder } from "./hooks/useFormBuilder";
import {
  Plus,
  Text,
  Hash,
  CheckSquare,
  ChevronDown,
  Mail,
  GripVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FormBuilderCanvas() {
  const { fields, selectedFieldId, addField, removeField, selectField } =
    useFormBuilder();

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>שדות הטופס</CardTitle>
            <CardDescription>בחר סוג שדה להוסיף לטופס</CardDescription>
          </div>
          <Badge variant="outline">{fields.length} שדות</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full flex items-center gap-2">
              <Plus size={16} />
              הוסף שדה
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => addField({ type: "text", label: "שדה טקסט" })}
              className="cursor-pointer flex items-center gap-2"
            >
              <Text size={16} /> שדה טקסט
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => addField({ type: "email", label: "אימייל" })}
              className="cursor-pointer flex items-center gap-2"
            >
              <Mail size={16} /> אימייל
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => addField({ type: "number", label: "מספר" })}
              className="cursor-pointer flex items-center gap-2"
            >
              <Hash size={16} /> מספר
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => addField({ type: "select", label: "בחירה" })}
              className="cursor-pointer flex items-center gap-2"
            >
              <ChevronDown size={16} /> רשימת בחירה
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => addField({ type: "checkbox", label: "אישור" })}
              className="cursor-pointer flex items-center gap-2"
            >
              <CheckSquare size={16} /> תיבת סימון
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {fields.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-muted/20">
            <p className="text-muted-foreground">
              אין שדות בטופס עדיין. הוסף שדה מהתפריט למעלה
            </p>
          </div>
        )}

        <ul className="space-y-2">
          {fields.map((field) => (
            <li
              key={field.id}
              className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-all ${
                selectedFieldId === field.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-gray-200 hover:border-primary/50"
              }`}
              onClick={() => selectField(field.id)}
            >
              <div className="flex-shrink-0 text-gray-400">
                <GripVertical size={16} />
              </div>
              <div className="flex-grow">
                <div className="font-medium">{field.label}</div>
                <div className="text-xs text-muted-foreground">
                  {field.name} · {field.type}
                  {field.required && " · חובה"}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
              >
                הסר
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
