/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useDirection } from "@/i18n/direction";
import {
  Plus,
  Text,
  Mail,
  Hash,
  ChevronDown,
  CheckSquare,
  GripVertical,
  Trash,
} from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// מרכיב סמן מיקום - סטטי ללא אנימציות
function DropIndicator({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`h-0.5 bg-primary rounded-full mx-4 ${
        position === "top" ? "-mt-[1px] mb-1" : "mt-1 -mb-[1px]"
      }`}
    />
  );
}

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

interface SortableFieldItemProps {
  field: FieldItem;
  selectedFieldId: string | null;
  selectField: (id: string) => void;
  removeField: (id: string) => void;
  isDragOverlay?: boolean;
  isDragTarget?: boolean;
  dragPosition?: "top" | "bottom" | null;
}

function SortableFieldItem({
  field,
  selectedFieldId,
  selectField,
  removeField,
  isDragOverlay = false,
  isDragTarget = false,
  dragPosition = null,
}: SortableFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div className="relative">
      {isDragTarget && dragPosition === "top" && (
        <DropIndicator position="top" />
      )}

      <li
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm 
          transition-all duration-200 cursor-pointer ${
            selectedFieldId === field.id
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
          } ${isDragging ? "opacity-40 border-dashed border-primary" : ""} ${
          isDragOverlay
            ? "shadow-xl ring-2 ring-primary border-primary scale-[1.03] dark:bg-gray-800"
            : ""
        }`}
        onClick={() => !isDragging && selectField(field.id)}
      >
        <div
          className={`flex-shrink-0 text-muted-foreground 
            ${
              isDragOverlay
                ? "cursor-grabbing text-primary"
                : "cursor-grab hover:text-primary"
            }`}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={isDragOverlay ? 20 : 18} />
        </div>

        <div className="flex flex-col flex-1">
          <span className="font-medium text-base">{field.label}</span>
          <span className="text-sm text-muted-foreground">
            {field.name} · {field.type}
            {field.required && " · חובה"}
          </span>
        </div>

        <div
          className={`transition-opacity duration-200 ${
            selectedFieldId === field.id || isDragOverlay
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              removeField(field.id);
            }}
          >
            <Trash size={16} />
          </Button>
        </div>
      </li>

      {isDragTarget && dragPosition === "bottom" && (
        <DropIndicator position="bottom" />
      )}
    </div>
  );
}

export default function FormBuilderCanvas() {
  const {
    fields,
    selectedFieldId,
    addField,
    removeField,
    selectField,
    reorderFields,
  } = useFormBuilder();

  const dir = useDirection();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<"top" | "bottom" | null>(
    null
  );

  // מצא את השדה הפעיל שנגרר כרגע
  const activeField = useMemo(
    () => fields.find((field) => field.id === activeId),
    [activeId, fields]
  );

  // חיישני גרירה עם הגדרות אופטימליות
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // טיפול בתחילת הגרירה
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // ניסיון להפעלת רטט במכשירים תומכים

    // window.navigator.vibrate?.(50);
  };

  // טיפול במצב גרירה מעל אלמנט אחר
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      setOverId(null);
      setDragPosition(null);
      return;
    }

    // מציאת האינדקסים המתאימים לקביעת מיקום האינדיקטור
    const activeIndex = fields.findIndex((f) => f.id === active.id);
    const overIndex = fields.findIndex((f) => f.id === over.id);

    setOverId(over.id as string);

    if (activeIndex < overIndex) {
      setDragPosition("bottom");
    } else {
      setDragPosition("top");
    }
  };

  // טיפול בסיום הגרירה
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderFields(active.id as string, over.id as string);

      // ניסיון להפעלת רטט בסיום פעולה מוצלחת

      // window.navigator.vibrate?.([40, 30, 80]);
    }

    // ניקוי מצב גרירה
    setActiveId(null);
    setOverId(null);
    setDragPosition(null);
  };

  // הוספת שדה חדש
  const handleAddField = (fieldConfig: any) => {
    addField(fieldConfig);

    // גלילה חלקה אל השדה החדש
    setTimeout(() => {
      const element = document.getElementById("fields-container");
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <Card className="border-muted shadow-lg">
      <CardHeader className="flex flex-col gap-3 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">בונה טפסים</CardTitle>
            <CardDescription className="text-sm mt-1">
              גרור שדות, סדר ונהל את טופסך בקלות
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`transition-colors ${
              fields.length > 0 ? "bg-primary/10 text-primary" : ""
            }`}
          >
            {fields.length} שדות
          </Badge>
        </div>

        <div className="transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]">
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger>
              <Button className="w-full justify-center gap-2 font-medium shadow-sm">
                <Plus size={16} /> הוסף שדה חדש
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-72 p-1">
              <div className="grid grid-cols-1 gap-0.5 p-1">
                {/* שדות בסיסיים */}
                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "text", label: "שדה טקסט" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <Text size={18} className="text-primary/80" /> שדה טקסט
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "email", label: "אימייל" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <Mail size={18} className="text-primary/80" /> אימייל
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "password", label: "סיסמה" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">🔒</i> סיסמה
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "number", label: "מספר" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <Hash size={18} className="text-primary/80" /> מספר
                </DropdownMenuItem>

                {/* שדות מתקדמים */}
                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({
                      type: "textarea",
                      label: "טקסט מרובה שורות",
                    })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">📝</i> טקסט מרובה שורות
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({
                      type: "select",
                      label: "רשימת בחירה",
                      options: [
                        { label: "אפשרות 1", value: "option1" },
                        { label: "אפשרות 2", value: "option2" },
                      ],
                    })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <ChevronDown size={18} className="text-primary/80" /> רשימת
                  בחירה
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "checkbox", label: "תיבת סימון" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <CheckSquare size={18} className="text-primary/80" /> תיבת
                  סימון
                </DropdownMenuItem>

                {/* שדות תאריך וזמן */}
                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "date", label: "תאריך" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">📅</i> תאריך
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleAddField({ type: "time", label: "שעה" })}
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">🕒</i> שעה
                </DropdownMenuItem>

                {/* שדות נוספים */}
                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({ type: "file", label: "העלאת קובץ" })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">📎</i> העלאת קובץ
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleAddField({
                      type: "range",
                      label: "מחוון טווח",
                      validations: { min: 0, max: 100 },
                    })
                  }
                  className="cursor-pointer flex items-center gap-3 p-2.5 rounded-md hover:bg-primary/10 transition-colors"
                >
                  <i className="text-primary/80">⚖️</i> מחוון טווח
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-5">
        {fields.length === 0 ? (
          <div className="text-center py-12 px-6 border-2 border-dashed rounded-xl bg-muted/10 transition-all">
            <p className="text-muted-foreground">
              אין שדות בטופס. השתמש בכפתור להוספת שדות חדשים.
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                id="fields-container"
                className="max-h-[60vh] overflow-y-auto pr-2 py-1"
              >
                <ul className="space-y-3 my-1 pb-1">
                  {fields.map((field) => (
                    <SortableFieldItem
                      key={field.id}
                      field={field}
                      selectedFieldId={selectedFieldId}
                      selectField={selectField}
                      removeField={removeField}
                      isDragTarget={overId === field.id}
                      dragPosition={overId === field.id ? dragPosition : null}
                    />
                  ))}
                </ul>
              </div>
            </SortableContext>

            <DragOverlay adjustScale={false}>
              {activeId && activeField && (
                <SortableFieldItem
                  field={activeField}
                  selectedFieldId={selectedFieldId}
                  selectField={selectField}
                  removeField={removeField}
                  isDragOverlay={true}
                />
              )}
            </DragOverlay>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}
